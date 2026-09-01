from __future__ import annotations

import json
import os
import time
from datetime import datetime, timezone
from typing import Any

from .runtime_context import analysis_run_id as current_analysis_run_id
from .runtime_context import request_id as current_request_id
from .runtime_context import trace_id as current_trace_id


def speech_log(
    event: str,
    *,
    started: float | None = None,
    request_id: str | None = None,
    trace_id: str | None = None,
    analysis_run_id: str | None = None,
    **fields: Any,
) -> None:
    run_id = analysis_run_id or current_analysis_run_id()
    record = {
        "schema": "voxvector.speech_runtime.v1",
        "event": event,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "request_id": request_id or current_request_id(),
        "trace_id": trace_id or current_trace_id(),
        "source_revision": os.getenv("RENDER_GIT_COMMIT", "unknown"),
        "pipeline_version": os.getenv("VOXVECTOR_PIPELINE_VERSION", "unknown"),
        **({"analysis_run_id": run_id} if run_id else {}),
        **fields,
    }
    if started is not None:
        record["elapsed_ms"] = round((time.perf_counter() - started) * 1000.0, 2)
    print("VOXVECTOR_SPEECH " + json.dumps(record, separators=(",", ":"), sort_keys=True), flush=True)
