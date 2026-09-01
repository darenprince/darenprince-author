from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Awaitable, Callable
from uuid import uuid4

from .observability import DIAGNOSTICS, elapsed_ms, new_trace_id, timer


EmitFn = Callable[..., Awaitable[str | None]]


@dataclass
class StageTrace:
    stage_id: str
    number: int
    name: str
    status: str = "pending"
    started_at: str | None = None
    completed_at: str | None = None
    duration_ms: float | None = None
    progress_percent: float = 0.0
    outcome: str | None = None
    error: str | None = None


class AnalysisExecutionTrace:
    """Run-scoped execution telemetry that emits structured events and progress."""

    def __init__(self, stages: list[tuple[int, str, str]], *, request_id: str, run_id: str | None = None) -> None:
        self.request_id = request_id
        self.trace_id = new_trace_id()
        self.run_id = run_id or uuid4().hex
        self._stages = {stage_id: StageTrace(stage_id, number, name) for number, stage_id, name in stages}
        self._timers: dict[str, float] = {}
        self._overall_started = timer()

    def _progress(self, stage_number: int) -> float:
        if not self._stages:
            return 0.0
        return round(max(0.0, min(100.0, ((stage_number - 1) / len(self._stages)) * 100.0)), 2)

    async def start(self, stage_id: str, *, detail: str | None = None) -> None:
        stage = self._stages[stage_id]
        self._timers[stage_id] = timer()
        stage.status = "running"
        stage.started_at = datetime.now(timezone.utc).isoformat()
        stage.progress_percent = self._progress(stage.number)
        await DIAGNOSTICS.emit(
            "analysis.stage_started",
            request_id=self.request_id,
            trace_id=self.trace_id,
            analysis_run_id=self.run_id,
            stage_id=stage.stage_id,
            stage_number=stage.number,
            stage_name=stage.name,
            progress_percent=stage.progress_percent,
            detail=detail,
        )

    async def complete(self, stage_id: str, *, outcome: str | None = None, metadata: dict[str, Any] | None = None) -> None:
        stage = self._stages[stage_id]
        started = self._timers.pop(stage_id, None)
        stage.status = "complete"
        stage.completed_at = datetime.now(timezone.utc).isoformat()
        stage.duration_ms = elapsed_ms(started) if started is not None else None
        stage.outcome = outcome
        stage.progress_percent = round((stage.number / len(self._stages)) * 100.0, 2) if self._stages else 100.0
        await DIAGNOSTICS.emit(
            "analysis.stage_completed",
            request_id=self.request_id,
            trace_id=self.trace_id,
            analysis_run_id=self.run_id,
            stage_id=stage.stage_id,
            stage_number=stage.number,
            stage_name=stage.name,
            progress_percent=stage.progress_percent,
            duration_ms=stage.duration_ms,
            outcome=outcome,
            **(metadata or {}),
        )

    async def fail(self, stage_id: str, exc: Exception, *, detail: str | None = None) -> None:
        stage = self._stages[stage_id]
        started = self._timers.pop(stage_id, None)
        stage.status = "failed"
        stage.completed_at = datetime.now(timezone.utc).isoformat()
        stage.duration_ms = elapsed_ms(started) if started is not None else None
        stage.error = str(exc)
        await DIAGNOSTICS.emit(
            "analysis.stage_failed",
            request_id=self.request_id,
            trace_id=self.trace_id,
            analysis_run_id=self.run_id,
            stage_id=stage.stage_id,
            stage_number=stage.number,
            stage_name=stage.name,
            duration_ms=stage.duration_ms,
            detail=detail,
            error_type=type(exc).__name__,
            error_message=str(exc),
        )

    async def run_started(self) -> None:
        await DIAGNOSTICS.emit(
            "analysis.run_started",
            request_id=self.request_id,
            trace_id=self.trace_id,
            analysis_run_id=self.run_id,
            total_stages=len(self._stages),
            progress_percent=0,
        )

    async def run_completed(self, *, status: str = "completed", metadata: dict[str, Any] | None = None) -> None:
        await DIAGNOSTICS.emit(
            "analysis.run_completed",
            request_id=self.request_id,
            trace_id=self.trace_id,
            analysis_run_id=self.run_id,
            duration_ms=elapsed_ms(self._overall_started),
            status=status,
            progress_percent=100 if status == "completed" else None,
            **(metadata or {}),
        )

    def snapshot(self) -> list[dict[str, Any]]:
        return [stage.__dict__.copy() for stage in sorted(self._stages.values(), key=lambda item: item.number)]
