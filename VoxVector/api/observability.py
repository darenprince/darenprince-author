from __future__ import annotations

import asyncio
import json
import os
import sys
import time
from datetime import datetime, timezone
from typing import Any

from .storage import StorageError, SupabaseStorage
from voxvector.runtime_context import new_request_id, new_trace_id, request_id, trace_id

_BLOCKED_FIELDS = {"audio", "audio_bytes", "raw_audio", "transcript", "raw_transcript", "file_content", "request_body", "data"}
_ERROR_EVENTS = {
    "request.rejected",
    "request.analysis_error",
    "request.unhandled_exception",
    "request.server_error",
    "case.source_upload_rejected",
    "case.source_upload_failed",
    "case.analysis_failed",
    "analysis.stage_failed",
}


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


class DiagnosticStore:
    """Sanitized diagnostics written to stdout and durable observability storage."""

    def __init__(self, storage: SupabaseStorage | None = None):
        self.storage = storage or SupabaseStorage()
        self.enabled = os.getenv("VOXVECTOR_DIAGNOSTICS_ENABLED", "true").lower() not in {"0", "false", "no"}

    def status(self) -> str:
        if not self.enabled:
            return "disabled"
        return self.storage.status()

    async def emit(self, event: str, **fields: Any) -> str | None:
        if not self.enabled:
            return None
        rid = fields.pop("request_id", None) or request_id()
        tid = fields.pop("trace_id", None) or trace_id()
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

        date_path = now.strftime("%Y/%m/%d")
        object_name = f"{event.replace('.', '_')}_{now.strftime('%H%M%S_%f')}.json"
        object_path = f"events/{date_path}/{rid}/{object_name}"
        try:
            insert_row = getattr(self.storage, "insert_table_row", None)
            if not callable(insert_row):
                raise StorageError("Diagnostic relational projection is unavailable")
            request_row = {
                "occurred_at": record["timestamp"],
                "request_id": rid,
                "route": record.get("path"),
                "method": record.get("method"),
                "status_code": record.get("status_code"),
                "duration_ms": _duration_ms_for_projection(record.get("duration_ms")),
                "source_revision": record.get("source_revision"),
                "pipeline_version": record.get("pipeline"),
                "metadata": {
                    "event": event,
                    "error_event": event in _ERROR_EVENTS,
                    **{k: v for k, v in record.items() if k not in {"schema", "timestamp", "request_id", "trace_id", "path", "method", "status_code", "duration_ms", "source_revision", "pipeline"}},
                },
            }
            await asyncio.to_thread(insert_row, "api_request_logs", request_row)
        except StorageError as exc:
            print(f"VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE request_id={rid} trace_id={tid} event={event} table=api_request_logs error={_safe_text(exc)}", file=sys.stderr, flush=True)

        if event in _ERROR_EVENTS:
            try:
                insert_error = getattr(self.storage, "insert_table_row", None)
                if not callable(insert_error):
                    raise StorageError("Diagnostic relational projection is unavailable")
                error_row = {
                    "occurred_at": record["timestamp"],
                    "severity": "error",
                    "status": "open",
                    "service": "voxvector-api",
                    "route": record.get("path"),
                    "method": record.get("method"),
                    "status_code": record.get("status_code"),
                    "request_id": rid,
                    "source_revision": record.get("source_revision"),
                    "pipeline_version": record.get("pipeline"),
                    "error_type": record.get("error_type"),
                    "message": record.get("error_message") or record.get("reason") or event,
                    "context": {
                        "event": event,
                        "trace_id": tid,
                        **{k: v for k, v in record.items() if k not in {"schema", "timestamp", "request_id", "trace_id", "error_type", "error_message", "path", "method", "status_code", "source_revision", "pipeline"}},
                    },
                }
                await asyncio.to_thread(insert_error, "error_reports", error_row)
            except StorageError as exc:
                print(f"VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE request_id={rid} trace_id={tid} event={event} table=error_reports error={_safe_text(exc)}", file=sys.stderr, flush=True)

        try:
            storage_result = await asyncio.to_thread(self.storage.put_json, object_path, record)
            if event in _ERROR_EVENTS:
                index_path = f"error-index/{date_path}/{rid}_{event.replace('.', '_')}_{now.strftime('%H%M%S_%f')}.json"
                try:
                    await asyncio.to_thread(self.storage.put_json, index_path, record)
                except StorageError as exc:
                    print(f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} trace_id={tid} event={event} index=error-index error={_safe_text(exc)}", flush=True)
        except StorageError as exc:
            print(f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} trace_id={tid} event={event} error={_safe_text(exc)}", flush=True)
        return storage_result


DIAGNOSTICS = DiagnosticStore()


def timer() -> float:
    return time.perf_counter()


def elapsed_ms(start: float) -> float:
    return round((time.perf_counter() - start) * 1000.0, 2)


def safe_error(exc: Exception) -> dict[str, str]:
    return {"error_type": type(exc).__name__, "error_message": _safe_text(exc)}
