from __future__ import annotations

import json
import os
import sys
import time
from datetime import datetime, timezone
from typing import Any

from .runtime_context import analysis_run_id as current_analysis_run_id
from .runtime_context import request_id as current_request_id
from .runtime_context import trace_id as current_trace_id


def _persist_durable(record: dict[str, Any]) -> None:
    """Mirror the Render-visible speech line into the canonical Supabase event archive."""
    try:
        from api.observability import DIAGNOSTICS

        if not DIAGNOSTICS.enabled or not DIAGNOSTICS.storage.config.configured:
            return
        DIAGNOSTICS.persist_external_record(record)
    except Exception as exc:
        # Last-resort provider telemetry only. Never include the record/body in this fallback.
        print(
            "VOXVECTOR_SPEECH_DURABLE_FAILURE "
            f"event={str(record.get('event') or 'unknown')[:120]} "
            f"request_id={str(record.get('request_id') or '')[:120]} "
            f"error_type={type(exc).__name__}",
            file=sys.stderr,
            flush=True,
        )


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
    _persist_durable(record)
