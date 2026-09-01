from __future__ import annotations

import json
import os
import time
from datetime import datetime, timezone
from typing import Any

from .observability import request_id, trace_id


def speech_log(event: str, *, started: float | None = None, **fields: Any) -> None:
    record = {
        "schema": "voxvector.speech_runtime.v1",
        "event": event,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "request_id": request_id(),
        "trace_id": trace_id(),
        "source_revision": os.getenv("RENDER_GIT_COMMIT", "unknown"),
        "pipeline_version": os.getenv("VOXVECTOR_PIPELINE_VERSION", "unknown"),
        **fields,
    }
    if started is not None:
        record["elapsed_ms"] = round((time.perf_counter() - started) * 1000.0, 2)
    print("VOXVECTOR_SPEECH " + json.dumps(record, separators=(",", ":"), sort_keys=True), flush=True)
