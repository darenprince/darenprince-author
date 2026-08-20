from __future__ import annotations

import asyncio
import contextvars
import json
import os
import time
import uuid
from datetime import datetime, timezone
from typing import Any

from .storage import StorageError, SupabaseStorage


_request_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_request_id", default="")
_BLOCKED_FIELDS = {"audio", "audio_bytes", "raw_audio", "transcript", "raw_transcript", "file_content", "request_body", "data"}


def new_request_id() -> str:
    value = uuid.uuid4().hex
    _request_id.set(value)
    return value


def request_id() -> str:
    return _request_id.get() or new_request_id()


def _safe_text(value: Any, limit: int = 600) -> str:
    text = str(value).replace("\x00", " ").strip()
    return text[:limit]


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

        # Render captures stdout as the live process log stream. Emit the same
        # sanitized record to stdout before the durable write so diagnostics
        # remain visible even when storage is slow or unavailable.
        print(
            "VOXVECTOR_DIAGNOSTIC "
            + json.dumps(record, separators=(",", ":"), sort_keys=True),
            flush=True,
        )

        date_path = now.strftime("%Y/%m/%d")
        object_path = f"events/{date_path}/{rid}/{event.replace('.', '_')}_{now.strftime('%H%M%S_%f')}.json"
        try:
            return await asyncio.to_thread(self.storage.put_json, object_path, record)
        except StorageError as exc:
            # Storage must never become a second availability dependency.
            print(
                f"VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE request_id={rid} "
                f"event={event} error={_safe_text(exc)}",
                flush=True,
            )
            return None


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
