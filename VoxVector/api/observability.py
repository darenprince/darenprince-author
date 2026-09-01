from __future__ import annotations

import asyncio
import contextvars
import json
import os
import sys
import time
import uuid
from datetime import datetime, timezone
from typing import Any

from .storage import StorageError, SupabaseStorage


_request_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_request_id", default="")
_BLOCKED_FIELDS = {"audio", "audio_bytes", "raw_audio", "transcript", "raw_transcript", "file_content", "request_body", "data"}
_ERROR_EVENTS = {
    "request.rejected",
    "request.analysis_error",
    "request.unhandled_exception",
    "request.server_error",
    "case.source_upload_rejected",
    "case.source_upload_failed",
    "case.analysis_failed",
}


def new_request_id(value: str | None = None) -> str:
    request_value = str(value or "").strip() or uuid.uuid4().hex
    _request_id.set(request_value)
    return request_value


def request_id() -> str:
    return _request_id.get() or new_request_id()


def _safe_text(value: Any, limit: int = 600) -> str:
    text = str(value).replace("\x00", " ").strip()
    return text[:limit]


def _duration_ms_for_projection(value: Any) -> int | None:
    """Relational api_request_logs.duration_ms is an integer column; preserve console precision in the immutable event record."""
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
    """Sanitized diagnostics written to the Render console and durable storage."""

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
        now = datetime.now(timezone.utc)
        record = {
            "schema": "voxvector.diagnostic.v1",
            "event": event,
            "request_id": rid,
            "timestamp": now.isoformat(),
            "pipeline": os.getenv("VOXVECTOR_PIPELINE_VERSION", "unknown"),
            "source_revision": os.getenv("RENDER_GIT_COMMIT", "unknown"),
            **_safe_fields(fields),
        }

        print(
            "VOXVECTOR_DIAGNOSTIC "
            + json.dumps(record, separators=(",", ":"), sort_keys=True),
            flush=True,
        )

        date_path = now.strftime("%Y/%m/%d")
        object_name = f"{event.replace('.', '_')}_{now.strftime('%H%M%S_%f')}.json"
        object_path = f"events/{date_path}/{rid}/{object_name}"
        storage_result = None

        # Database projections make the Developer Console observable without relying on
        # nested object-list traversal. Storage remains the canonical immutable event archive.
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
                "metadata": {"event": event, "error_event": event in _ERROR_EVENTS, **{k: v for k, v in record.items() if k not in {"schema", "timestamp", "request_id", "path", "method", "status_code", "duration_ms", "source_revision", "pipeline"}}},
            }
            await asyncio.to_thread(insert_row, "api_request_logs", request_row)
        except StorageError as exc:
            print(f"VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE request_id={rid} event={event} table=api_request_logs error={_safe_text(exc)}", file=sys.stderr, flush=True)

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
                    "context": {"event": event, **{k: v for k, v in record.items() if k not in {"schema", "timestamp", "request_id", "error_type", "error_message", "path", "method", "status_code", "source_revision", "pipeline"}}},
                }
                await asyncio.to_thread(insert_error, "error_reports", error_row)
            except StorageError as exc:
                print(f"VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE request_id={rid} event={event} table=error_reports error={_safe_text(exc)}", file=sys.stderr, flush=True)

        try:
            storage_result = await asyncio.to_thread(self.storage.put_json, object_path, record)
            if event in _ERROR_EVENTS:
                index_path = f"error-index/{date_path}/{rid}_{event.replace('.', '_')}_{now.strftime('%H%M%S_%f')}.json"
                try:
                    await asyncio.to_thread(self.storage.put_json, index_path, record)
                except StorageError as exc:
                    print(f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} event={event} index=error-index error={_safe_text(exc)}", flush=True)
        except StorageError as exc:
            print(f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} event={event} error={_safe_text(exc)}", flush=True)
        return storage_result


DIAGNOSTICS = DiagnosticStore()


def timer() -> float:
    return time.perf_counter()


def elapsed_ms(start: float) -> float:
    return round((time.perf_counter() - start) * 1000.0, 2)


def safe_error(exc: Exception) -> dict[str, str]:
    return {
        "error_type": type(exc).__name__,
        "error_message": _safe_text(exc),
    }
