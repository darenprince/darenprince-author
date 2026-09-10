from __future__ import annotations

import asyncio
import hashlib
import json
import os
import sys
import time
from datetime import datetime, timezone
from typing import Any

from .storage import StorageError, SupabaseStorage
from voxvector.runtime_context import new_request_id, new_trace_id, request_id, trace_id

_BLOCKED_FIELDS = {
    "audio",
    "audio_bytes",
    "raw_audio",
    "transcript",
    "raw_transcript",
    "file_content",
    "request_body",
    "data",
    "password",
    "authorization",
    "cookie",
    "access_token",
    "refresh_token",
    "service_role_key",
    "signed_url",
    "deploy_hook_url",
    "api_key",
    "render_api_key",
}
_ERROR_EVENTS = {
    "request.rejected",
    "request.analysis_error",
    "request.unhandled_exception",
    "request.server_error",
    "case.source_upload_rejected",
    "case.source_upload_failed",
    "case.source_upload_prehandler_rejected",
    "case.analysis_failed",
    "analysis.stage_failed",
}
_CASE_SOURCE_PREHANDLER_STATUSES = {400, 413, 415, 422}
_CASE_SOURCE_ROUTE_TTL_SECONDS = 15 * 60


def _safe_text(value: Any, limit: int = 600) -> str:
    text = str(value).replace("\x00", " ").strip()
    return text[:limit]


def _duration_ms_for_projection(value: Any) -> int | None:
    """Relational duration is integer typed; immutable events retain precise timing."""
    if value is None:
        return None
    try:
        return int(round(float(value)))
    except (TypeError, ValueError):
        return None


def _safe_fields(fields: dict[str, Any]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in fields.items():
        if key.lower() in _BLOCKED_FIELDS:
            continue
        if value is None or isinstance(value, (str, int, float, bool)):
            result[key] = _safe_text(value) if isinstance(value, str) else value
        else:
            result[key] = _safe_text(value)
    return result


def _is_error_event(event: str) -> bool:
    normalized = str(event or "").strip().lower()
    return normalized in _ERROR_EVENTS or normalized.endswith((".failed", ".timeout", ".timed_out"))


def _is_case_source_upload(method: Any, path: Any) -> bool:
    if str(method or "").upper() != "POST":
        return False
    parts = [part for part in str(path or "").split("/") if part]
    return len(parts) == 4 and parts[0] == "v1" and parts[1] == "cases" and parts[3] == "sources"


def _status_code(value: Any) -> int | None:
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _event_datetime(value: Any) -> datetime:
    text = str(value or "").strip()
    if text:
        try:
            parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
            if parsed.tzinfo is None:
                parsed = parsed.replace(tzinfo=timezone.utc)
            return parsed.astimezone(timezone.utc)
        except ValueError:
            pass
    return datetime.now(timezone.utc)


class DiagnosticStore:
    """Sanitized diagnostics written to stdout and durable observability storage."""

    def __init__(self, storage: SupabaseStorage | None = None):
        self.storage = storage or SupabaseStorage()
        self.enabled = os.getenv("VOXVECTOR_DIAGNOSTICS_ENABLED", "true").lower() not in {"0", "false", "no"}
        self._case_source_route_started: dict[str, float] = {}

    def status(self) -> str:
        if not self.enabled:
            return "disabled"
        return self.storage.status()

    def _prune_case_source_route_state(self) -> None:
        cutoff = time.monotonic() - _CASE_SOURCE_ROUTE_TTL_SECONDS
        expired = [rid for rid, started_at in self._case_source_route_started.items() if started_at < cutoff]
        for rid in expired:
            self._case_source_route_started.pop(rid, None)

    def persist_external_record(self, record: dict[str, Any]) -> str | None:
        """Persist one already-emitted sanitized event through the canonical Supabase path.

        This method intentionally does not write the normal event to stdout. Callers such as
        speech-runtime logging keep their native Render-visible stdout line and then use this
        method for the durable Supabase copy. Storage/database failures emit only bounded
        provider-visible fallback diagnostics.
        """
        if not self.enabled:
            return None

        safe_record = _safe_fields(dict(record))
        event = _safe_text(safe_record.get("event") or "runtime.event", 160)
        rid = _safe_text(safe_record.get("request_id") or new_request_id(), 160)
        tid = _safe_text(safe_record.get("trace_id") or new_trace_id(), 160)
        occurred = _event_datetime(safe_record.get("timestamp"))
        timestamp = occurred.isoformat()
        source_revision = safe_record.get("source_revision") or os.getenv("RENDER_GIT_COMMIT", "unknown")
        pipeline_version = safe_record.get("pipeline") or safe_record.get("pipeline_version") or os.getenv("VOXVECTOR_PIPELINE_VERSION", "unknown")
        safe_record.update(
            {
                "event": event,
                "request_id": rid,
                "trace_id": tid,
                "timestamp": timestamp,
                "source_revision": source_revision,
            }
        )
        if "pipeline" not in safe_record and "pipeline_version" not in safe_record:
            safe_record["pipeline_version"] = pipeline_version

        try:
            insert_row = getattr(self.storage, "insert_table_row", None)
            if not callable(insert_row):
                raise StorageError("Diagnostic relational projection is unavailable")
            request_row = {
                "occurred_at": timestamp,
                "request_id": rid,
                "route": safe_record.get("path"),
                "method": safe_record.get("method"),
                "status_code": safe_record.get("status_code"),
                "duration_ms": _duration_ms_for_projection(safe_record.get("duration_ms") or safe_record.get("elapsed_ms")),
                "source_revision": source_revision,
                "pipeline_version": pipeline_version,
                "metadata": {
                    "event": event,
                    "error_event": _is_error_event(event),
                    **{
                        k: v
                        for k, v in safe_record.items()
                        if k
                        not in {
                            "schema",
                            "timestamp",
                            "request_id",
                            "trace_id",
                            "path",
                            "method",
                            "status_code",
                            "duration_ms",
                            "source_revision",
                            "pipeline",
                            "pipeline_version",
                        }
                    },
                },
            }
            insert_row("api_request_logs", request_row)
        except StorageError as exc:
            print(
                f"VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE request_id={rid} trace_id={tid} event={event} table=api_request_logs error={_safe_text(exc)}",
                file=sys.stderr,
                flush=True,
            )

        if _is_error_event(event):
            try:
                insert_error = getattr(self.storage, "insert_table_row", None)
                if not callable(insert_error):
                    raise StorageError("Diagnostic relational projection is unavailable")
                error_row = {
                    "occurred_at": timestamp,
                    "severity": "error",
                    "status": "open",
                    "service": "voxvector-api",
                    "route": safe_record.get("path"),
                    "method": safe_record.get("method"),
                    "status_code": safe_record.get("status_code"),
                    "request_id": rid,
                    "source_revision": source_revision,
                    "pipeline_version": pipeline_version,
                    "error_type": safe_record.get("error_type"),
                    "message": safe_record.get("error_message") or safe_record.get("reason") or event,
                    "context": {
                        "event": event,
                        "trace_id": tid,
                        **{
                            k: v
                            for k, v in safe_record.items()
                            if k
                            not in {
                                "schema",
                                "timestamp",
                                "request_id",
                                "trace_id",
                                "error_type",
                                "error_message",
                                "path",
                                "method",
                                "status_code",
                                "source_revision",
                                "pipeline",
                                "pipeline_version",
                            }
                        },
                    },
                }
                insert_error("error_reports", error_row)
            except StorageError as exc:
                print(
                    f"VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE request_id={rid} trace_id={tid} event={event} table=error_reports error={_safe_text(exc)}",
                    file=sys.stderr,
                    flush=True,
                )

        serialized = json.dumps(safe_record, separators=(",", ":"), sort_keys=True, ensure_ascii=False)
        digest = hashlib.sha256(serialized.encode("utf-8")).hexdigest()[:20]
        date_path = occurred.strftime("%Y/%m/%d")
        object_name = f"{event.replace('.', '_')}_{digest}.json"
        object_path = f"events/{date_path}/{rid}/{object_name}"
        storage_result = None
        try:
            storage_result = self.storage.put_json(object_path, safe_record)
            if _is_error_event(event):
                index_path = f"error-index/{date_path}/{rid}_{event.replace('.', '_')}_{digest}.json"
                try:
                    self.storage.put_json(index_path, safe_record)
                except StorageError as exc:
                    print(
                        f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} trace_id={tid} event={event} index=error-index error={_safe_text(exc)}",
                        file=sys.stderr,
                        flush=True,
                    )
        except StorageError as exc:
            print(
                f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} trace_id={tid} event={event} error={_safe_text(exc)}",
                file=sys.stderr,
                flush=True,
            )
        return storage_result

    async def emit(self, event: str, **fields: Any) -> str | None:
        if not self.enabled:
            return None
        rid = fields.pop("request_id", None) or request_id()
        tid = fields.pop("trace_id", None) or trace_id()
        self._prune_case_source_route_state()
        if event == "case.source_upload_started":
            self._case_source_route_started[rid] = time.monotonic()

        prehandler_rejection: dict[str, Any] | None = None
        if event == "request.completed":
            status_code = _status_code(fields.get("status_code"))
            if (
                status_code in _CASE_SOURCE_PREHANDLER_STATUSES
                and _is_case_source_upload(fields.get("method"), fields.get("path"))
                and rid not in self._case_source_route_started
            ):
                prehandler_rejection = {
                    "method": fields.get("method"),
                    "path": fields.get("path"),
                    "status_code": status_code,
                    "duration_ms": fields.get("duration_ms"),
                    "reason": "route_handler_start_not_observed",
                    "boundary": "before_normal_upload_route_body",
                    "error_type": "PreHandlerHTTP4xx",
                    "error_message": f"Case source request returned HTTP {status_code} before the route-start diagnostic was observed.",
                    "observability_basis": "case.source_upload_started missing for the same request_id",
                }

        now = datetime.now(timezone.utc)
        record = {
            "schema": "voxvector.diagnostic.v2",
            "event": event,
            "request_id": rid,
            "trace_id": tid,
            "timestamp": now.isoformat(),
            "pipeline": os.getenv("VOXVECTOR_PIPELINE_VERSION", "unknown"),
            "source_revision": os.getenv("RENDER_GIT_COMMIT", "unknown"),
            **_safe_fields(fields),
        }
        print("VOXVECTOR_DIAGNOSTIC " + json.dumps(record, separators=(",", ":"), sort_keys=True), flush=True)
        storage_result = await asyncio.to_thread(self.persist_external_record, record)

        if prehandler_rejection is not None:
            await self.emit(
                "case.source_upload_prehandler_rejected",
                request_id=rid,
                trace_id=tid,
                **prehandler_rejection,
            )
        if event in {"request.completed", "request.unhandled_exception"}:
            self._case_source_route_started.pop(rid, None)
        return storage_result


DIAGNOSTICS = DiagnosticStore()


def timer() -> float:
    return time.perf_counter()


def elapsed_ms(start: float) -> float:
    return round((time.perf_counter() - start) * 1000.0, 2)


def safe_error(exc: Exception) -> dict[str, str]:
    return {"error_type": type(exc).__name__, "error_message": _safe_text(exc)}
