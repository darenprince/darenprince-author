from __future__ import annotations

import contextvars
import json
import os
import time
import uuid
from datetime import datetime, timezone
from typing import Any

_request_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_speech_request_id", default="")
_trace_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_speech_trace_id", default="")


def set_request_id(value: str) -> str:
    value = str(value or "").strip() or uuid.uuid4().hex
    _request_id.set(value)
    return value


def set_trace_id(value: str) -> str:
    value = str(value or "").strip() or uuid.uuid4().hex
    _trace_id.set(value)
    return value


def speech_log(event: str, *, started: float | None = None, request_id: str | None = None, trace_id: str | None = None, analysis_run_id: str | None = None, **fields: Any) -> None:
    record = {
        "schema": "voxvector.speech_runtime.v1",
        "event": event,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "request_id": request_id or _request_id.get() or "unavailable",
        "trace_id": trace_id or _trace_id.get() or "unavailable",
        "source_revision": os.getenv("RENDER_GIT_COMMIT", "unknown"),
        "pipeline_version": os.getenv("VOXVECTOR_PIPELINE_VERSION", "unknown"),
        **({"analysis_run_id": analysis_run_id} if analysis_run_id else {}),
        **fields,
    }
    if started is not None:
        record["elapsed_ms"] = round((time.perf_counter() - started) * 1000.0, 2)
    print("VOXVECTOR_SPEECH " + json.dumps(record, separators=(",", ":"), sort_keys=True), flush=True)
