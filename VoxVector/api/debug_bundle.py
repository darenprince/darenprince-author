from __future__ import annotations

import hashlib
import io
import json
import re
import zipfile
from datetime import datetime, timedelta, timezone
from typing import Any
from urllib.parse import quote

from .storage import SupabaseStorage

_BLOCKED_KEYS = {
    "audio",
    "audio_bytes",
    "raw_audio",
    "transcript",
    "raw_transcript",
    "request_body",
    "file_content",
    "authorization",
    "cookie",
    "set_cookie",
    "password",
    "access_token",
    "refresh_token",
    "service_role_key",
    "supabase_service_role_key",
    "render_api_key",
    "api_key",
    "deploy_hook_url",
    "signed_url",
    "signedurl",
    "raw",
}
_SECRET_PATTERNS = (
    re.compile(r"(?i)(authorization\s*[:=]\s*bearer\s+)[^\s,;]+"),
    re.compile(r"(?i)(bearer\s+)[A-Za-z0-9._~+/=-]{12,}"),
    re.compile(r"(?i)(\b(?:access_token|refresh_token|apikey|api_key|service_role_key|token|password)\s*[:=]\s*)[^\s,;&]+"),
    re.compile(r"\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b"),
    re.compile(r"\bsk-[A-Za-z0-9_-]{12,}\b"),
)


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_time(value: Any) -> datetime | None:
    text = str(value or "").strip()
    if not text:
        return None
    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def redact_text(value: Any, limit: int = 4000) -> str:
    text = str(value or "").replace("\x00", " ")[:limit]
    for pattern in _SECRET_PATTERNS:
        text = pattern.sub(lambda match: (match.group(1) if match.groups() else "") + "[REDACTED]", text)
    return text


def sanitize(value: Any, *, depth: int = 0) -> Any:
    if depth > 8:
        return "[TRUNCATED]"
    if value is None or isinstance(value, (bool, int, float)):
        return value
    if isinstance(value, str):
        return redact_text(value)
    if isinstance(value, dict):
        clean: dict[str, Any] = {}
        for key, item in value.items():
            normalized = str(key).strip().lower()
            if normalized in _BLOCKED_KEYS:
                continue
            if any(part in normalized for part in ("secret", "credential")):
                continue
            clean[str(key)] = sanitize(item, depth=depth + 1)
        return clean
    if isinstance(value, (list, tuple, set)):
        return [sanitize(item, depth=depth + 1) for item in list(value)[:2000]]
    return redact_text(value)


def sanitize_render_logs(logs: list[dict]) -> list[dict]:
    result: list[dict] = []
    for row in logs[:1000]:
        if not isinstance(row, dict):
            continue
        result.append(
            {
                "timestamp": sanitize(row.get("timestamp")),
                "level": sanitize(row.get("level")),
                "type": sanitize(row.get("type")),
                "message": redact_text(row.get("message") or "Render log event", 4000),
            }
        )
    return result


def mirror_render_snapshot(
    storage: SupabaseStorage,
    *,
    service_id: str,
    owner_id: str | None,
    logs: list[dict],
    observed_at: str,
    context: dict[str, Any] | None = None,
) -> str | None:
    if not storage.configured:
        return None
    safe_logs = sanitize_render_logs(logs)
    safe_context = sanitize(context or {})
    observed = parse_time(observed_at) or utc_now()
    service_value = redact_text(service_id, 180)
    owner_value = redact_text(owner_id or "", 180) or None
    source_revision = redact_text((context or {}).get("source_revision") or "unknown", 180)
    payload = {
        "schema": "voxvector.render_log_snapshot.v1",
        "provider": "render",
        "service_id": service_value,
        "owner_id": owner_value,
        "observed_at": observed.isoformat(),
        "source_revision": source_revision,
        "correlation": safe_context,
        "log_count": len(safe_logs),
        "logs": safe_logs,
    }
    identity = {
        "schema": payload["schema"],
        "provider": payload["provider"],
        "service_id": service_value,
        "owner_id": owner_value,
        "source_revision": source_revision,
        "correlation": safe_context,
        "log_count": len(safe_logs),
        "logs": safe_logs,
    }
    serialized = json.dumps(identity, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    digest = hashlib.sha256(serialized.encode("utf-8")).hexdigest()[:24]
    log_times = [parsed for parsed in (parse_time(row.get("timestamp")) for row in safe_logs) if parsed is not None]
    snapshot_date = min(log_times) if log_times else observed
    service_slug = re.sub(r"[^A-Za-z0-9._-]+", "_", str(service_id))[:120] or "render"
    object_path = f"render-snapshots/{snapshot_date.strftime('%Y/%m/%d')}/{service_slug}/{digest}.json"
    return storage.put_json(object_path, payload)


def _table_window_query(start: datetime, end: datetime, *, limit: int = 1000) -> str:
    start_value = quote(start.astimezone(timezone.utc).isoformat(), safe=":+-T")
    end_value = quote(end.astimezone(timezone.utc).isoformat(), safe=":+-T")
    return f"occurred_at=gte.{start_value}&occurred_at=lte.{end_value}&order=occurred_at.asc&limit={max(1, min(limit, 2000))}"


def _event_from_request_row(row: dict[str, Any]) -> dict[str, Any]:
    metadata = row.get("metadata") if isinstance(row.get("metadata"), dict) else {}
    event = {
        "timestamp": row.get("occurred_at"),
        "request_id": row.get("request_id"),
        "path": row.get("route"),
        "method": row.get("method"),
        "status_code": row.get("status_code"),
        "duration_ms": row.get("duration_ms"),
        "source_revision": row.get("source_revision"),
        "pipeline_version": row.get("pipeline_version"),
        **metadata,
    }
    return sanitize(event)


def correlated_event_rows(
    storage: SupabaseStorage,
    *,
    start: datetime,
    end: datetime,
    request_id: str | None,
    case_id: str | None,
    run_id: str | None,
) -> tuple[list[dict], dict[str, int]]:
    rows = storage.select_table_rows("api_request_logs", _table_window_query(start, end))
    exact: list[dict] = []
    time_window_speech: list[dict] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        metadata = row.get("metadata") if isinstance(row.get("metadata"), dict) else {}
        event_name = str(metadata.get("event") or "")
        exact_match = bool(
            (request_id and str(row.get("request_id") or "") == request_id)
            or (case_id and str(metadata.get("case_id") or "") == case_id)
            or (run_id and str(metadata.get("run_id") or metadata.get("analysis_run_id") or "") == run_id)
        )
        if exact_match:
            record = _event_from_request_row(row)
            record["debug_correlation"] = "exact_identifier"
            exact.append(record)
        elif event_name.startswith(("transcription.", "diarization.")):
            record = _event_from_request_row(row)
            record["debug_correlation"] = "analysis_time_window"
            time_window_speech.append(record)
    combined = exact + time_window_speech
    combined.sort(key=lambda item: str(item.get("timestamp") or ""))
    return combined, {"exact": len(exact), "time_window_speech": len(time_window_speech)}


def correlated_error_rows(
    storage: SupabaseStorage,
    *,
    start: datetime,
    end: datetime,
    request_id: str | None,
) -> list[dict]:
    rows = storage.select_table_rows("error_reports", _table_window_query(start, end, limit=500))
    selected: list[dict] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        if request_id and str(row.get("request_id") or "") != request_id:
            context = row.get("context") if isinstance(row.get("context"), dict) else {}
            event_name = str(context.get("event") or "")
            if not event_name.startswith(("transcription.", "diarization.")):
                continue
        selected.append(sanitize(row))
    return selected


def run_window(run: dict[str, Any], *, buffer_seconds: int = 45) -> tuple[datetime, datetime]:
    start = parse_time(run.get("started_at")) or utc_now() - timedelta(minutes=10)
    end = parse_time(run.get("completed_at")) or utc_now()
    if end < start:
        end = utc_now()
    buffer = timedelta(seconds=max(0, min(int(buffer_seconds), 300)))
    return start - buffer, end + buffer


def run_debug_record(case: dict[str, Any], run: dict[str, Any]) -> dict[str, Any]:
    source = next(
        (
            item
            for item in case.get("sources", [])
            if isinstance(item, dict) and str(item.get("source_id") or "") == str(run.get("source_id") or "")
        ),
        {},
    )
    return sanitize(
        {
            "case": {
                "case_id": case.get("case_id"),
                "title": case.get("title"),
                "created_at": case.get("created_at"),
                "updated_at": case.get("updated_at"),
            },
            "source": {
                "source_id": source.get("source_id") or run.get("source_id"),
                "sha256": source.get("sha256"),
                "sample_rate": source.get("sample_rate"),
                "duration_seconds": source.get("duration_seconds"),
                "created_at": source.get("created_at"),
            },
            "run": {
                "run_id": run.get("run_id"),
                "analysis_id": run.get("analysis_id"),
                "request_id": run.get("request_id"),
                "status": run.get("status"),
                "started_at": run.get("started_at"),
                "completed_at": run.get("completed_at"),
                "elapsed_ms": run.get("elapsed_ms"),
                "pipeline_version": run.get("pipeline_version"),
                "source_revision": run.get("source_revision") or (run.get("testing") or {}).get("source_revision"),
                "process_instance_id": run.get("process_instance_id"),
                "render_instance_id": run.get("render_instance_id"),
                "current_stage": run.get("current_stage"),
                "pipeline_build": run.get("pipeline_build"),
                "provider_timings_ms": run.get("provider_timings_ms"),
                "stages": run.get("stages") or run.get("stage_states") or [],
                "upstream_checkpoint": run.get("upstream_checkpoint"),
                "error": run.get("error"),
                "run_report": run.get("run_report"),
                "failure_report": run.get("failure_report"),
            },
        }
    )


def _json_bytes(value: Any) -> bytes:
    return (json.dumps(sanitize(value), indent=2, ensure_ascii=False, sort_keys=True) + "\n").encode("utf-8")


def _jsonl_bytes(rows: list[dict]) -> bytes:
    return b"".join(
        (json.dumps(sanitize(row), ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n").encode("utf-8")
        for row in rows
    )


def build_debug_zip(
    *,
    case: dict[str, Any],
    run: dict[str, Any],
    events: list[dict],
    errors: list[dict],
    render_logs: list[dict],
    render_status: dict[str, Any] | None,
    runtime_health: dict[str, Any] | None,
    render_mirror_path: str | None,
    correlation_counts: dict[str, int],
    window_start: datetime,
    window_end: datetime,
) -> tuple[bytes, dict[str, Any]]:
    generated_at = utc_now()
    case_id = str(case.get("case_id") or "unknown")
    run_id = str(run.get("run_id") or run.get("analysis_id") or "unknown")
    events_available = bool(correlation_counts.get("events_available", 1))
    errors_available = bool(correlation_counts.get("errors_available", 1))
    render_logs_available = bool(correlation_counts.get("render_logs_available", 1))
    missing: list[str] = []
    if not events_available:
        missing.append("supabase_voxvector_events")
    if not errors_available:
        missing.append("correlated_error_reports")
    if not render_logs_available:
        missing.append("render_provider_logs")
    if not render_status:
        missing.append("render_status")
    if not runtime_health:
        missing.append("runtime_health")
    if not render_mirror_path:
        missing.append("supabase_render_log_mirror")

    manifest = sanitize(
        {
            "schema": "voxvector.debug_bundle.v1",
            "generated_at": generated_at.isoformat(),
            "case_id": case_id,
            "run_id": run_id,
            "request_id": run.get("request_id"),
            "source_id": run.get("source_id"),
            "source_revision": run.get("source_revision") or (run.get("testing") or {}).get("source_revision"),
            "pipeline_version": run.get("pipeline_version"),
            "time_window": {"start": window_start.isoformat(), "end": window_end.isoformat(), "buffer_basis": "run start/end plus bounded buffer"},
            "correlation": {
                "voxvector_events": correlation_counts,
                "render_logs": "analysis_time_window",
                "render_mirror_path": render_mirror_path,
            },
            "availability": {
                "voxvector_events": events_available,
                "correlated_error_reports": errors_available,
                "render_provider_logs": render_logs_available,
                "render_status": bool(render_status),
                "runtime_health": bool(runtime_health),
                "supabase_render_log_mirror": bool(render_mirror_path),
            },
            "included": {
                "case_run": True,
                "voxvector_events": len(events),
                "errors": len(errors),
                "render_logs": len(render_logs),
                "render_status": bool(render_status),
                "runtime_health": bool(runtime_health),
            },
            "missing_evidence": missing,
            "privacy": "No raw audio, transcript text, request bodies, passwords, tokens, cookies, signed URLs, service-role credentials, Render API keys, or deploy-hook URLs are included by default.",
        }
    )

    readme = (
        "VoxVector Debug Bundle\n"
        "======================\n\n"
        "This archive contains sanitized operational evidence for one analysis run.\n"
        "VoxVector application/diagnostic/speech events are read from the durable Supabase-backed observability path.\n"
        "Render provider logs are collected for the analysis time window, remain available in Render, and are mirrored to Supabase when possible.\n"
        "manifest.json distinguishes available-but-empty evidence from unavailable evidence and identifies exact versus time-window correlation.\n\n"
        "The archive intentionally excludes raw audio and transcript text and is an engineering debugging artifact, not scientific-validation evidence.\n"
    ).encode("utf-8")

    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        archive.writestr("manifest.json", _json_bytes(manifest))
        archive.writestr("case-run.json", _json_bytes(run_debug_record(case, run)))
        archive.writestr("voxvector-events.jsonl", _jsonl_bytes(events))
        archive.writestr("errors.jsonl", _jsonl_bytes(errors))
        archive.writestr("render-logs.jsonl", _jsonl_bytes(sanitize_render_logs(render_logs)))
        archive.writestr("render-status.json", _json_bytes(render_status or {}))
        archive.writestr("runtime-health.json", _json_bytes(runtime_health or {}))
        archive.writestr("README.txt", readme)
    return stream.getvalue(), manifest


def safe_bundle_filename(case_id: str, run_id: str, generated_at: datetime | None = None) -> str:
    stamp = (generated_at or utc_now()).strftime("%Y%m%dT%H%M%SZ")
    safe_case = re.sub(r"[^A-Za-z0-9._-]+", "_", str(case_id))[:80] or "case"
    safe_run = re.sub(r"[^A-Za-z0-9._-]+", "_", str(run_id))[:80] or "run"
    return f"voxvector-debug-{safe_case}-{safe_run}-{stamp}.zip"
