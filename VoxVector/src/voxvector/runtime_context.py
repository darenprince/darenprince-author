from __future__ import annotations

import contextvars
import uuid

_request_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_request_id", default="")
_trace_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_trace_id", default="")
_analysis_run_id: contextvars.ContextVar[str] = contextvars.ContextVar("voxvector_analysis_run_id", default="")


def new_request_id(value: str | None = None) -> str:
    value = str(value or "").strip() or uuid.uuid4().hex
    _request_id.set(value)
    return value


def request_id() -> str:
    return _request_id.get() or new_request_id()


def new_trace_id(value: str | None = None) -> str:
    value = str(value or "").strip() or uuid.uuid4().hex
    _trace_id.set(value)
    return value


def set_trace_id(value: str | None = None) -> str:
    value = str(value or "").strip() or uuid.uuid4().hex
    _trace_id.set(value)
    return value


def trace_id() -> str:
    return _trace_id.get() or new_trace_id()


def set_analysis_run_id(value: str | None) -> str:
    run_id = str(value or "").strip()
    _analysis_run_id.set(run_id)
    return run_id


def analysis_run_id() -> str | None:
    value = _analysis_run_id.get()
    return value or None
