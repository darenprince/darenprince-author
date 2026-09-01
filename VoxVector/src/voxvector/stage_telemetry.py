from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from time import perf_counter
from typing import Iterable, Mapping


RUNNING = {"running", "processing", "in_progress"}
TERMINAL = {"complete", "completed", "success", "succeeded", "failed", "error", "not_run"}


@dataclass
class _StageTimer:
    number: int
    stage_id: str
    name: str
    started_at: str | None = None
    completed_at: str | None = None
    duration_ms: float | None = None
    status: str = "pending"
    outcome: str | None = None
    error: str | None = None
    _started_clock: float | None = field(default=None, repr=False)


class StageTelemetry:
    """Record real lifecycle timing for pipeline stages.

    The recorder is intentionally independent of persistence. Callers can snapshot
    the current state and attach it to a run, diagnostic event, or other durable
    record without coupling the analysis engine to a storage implementation.
    """

    def __init__(self, definitions: Iterable[tuple[int, str, str]]):
        self._stages = {
            stage_id: _StageTimer(number, stage_id, name)
            for number, stage_id, name in definitions
        }

    @staticmethod
    def _now() -> str:
        return datetime.now(timezone.utc).isoformat()

    def _get(self, stage_id: str) -> _StageTimer:
        try:
            return self._stages[stage_id]
        except KeyError as exc:
            raise KeyError(f"Unknown pipeline stage: {stage_id}") from exc

    def start(self, stage_id: str) -> dict:
        stage = self._get(stage_id)
        if stage.status in RUNNING:
            raise RuntimeError(f"Stage already running: {stage_id}")
        if stage.status in TERMINAL and stage.status != "pending":
            raise RuntimeError(f"Stage already finalized: {stage_id}")
        stage.started_at = self._now()
        stage.completed_at = None
        stage.duration_ms = None
        stage.status = "running"
        stage.outcome = None
        stage.error = None
        stage._started_clock = perf_counter()
        return self._as_dict(stage)

    def complete(self, stage_id: str, *, outcome: str | None = None) -> dict:
        stage = self._get(stage_id)
        if stage.status not in RUNNING:
            raise RuntimeError(f"Stage is not running: {stage_id}")
        stage.completed_at = self._now()
        stage.duration_ms = max(0.0, (perf_counter() - (stage._started_clock or perf_counter())) * 1000.0)
        stage.status = "complete"
        stage.outcome = outcome
        stage.error = None
        return self._as_dict(stage)

    def fail(self, stage_id: str, *, error: str, outcome: str | None = None) -> dict:
        stage = self._get(stage_id)
        if stage.status not in RUNNING:
            raise RuntimeError(f"Stage is not running: {stage_id}")
        stage.completed_at = self._now()
        stage.duration_ms = max(0.0, (perf_counter() - (stage._started_clock or perf_counter())) * 1000.0)
        stage.status = "failed"
        stage.outcome = outcome
        stage.error = str(error)
        return self._as_dict(stage)

    def mark_not_run(self, stage_id: str, *, outcome: str | None = None) -> dict:
        stage = self._get(stage_id)
        if stage.status in RUNNING:
            raise RuntimeError(f"Cannot mark running stage not_run: {stage_id}")
        stage.status = "not_run"
        stage.outcome = outcome
        stage.error = None
        stage.started_at = None
        stage.completed_at = None
        stage.duration_ms = None
        return self._as_dict(stage)

    def mark_pending(self, stage_id: str, *, outcome: str | None = None) -> dict:
        stage = self._get(stage_id)
        if stage.status in RUNNING:
            raise RuntimeError(f"Cannot reset running stage to pending: {stage_id}")
        stage.status = "pending"
        stage.outcome = outcome
        stage.error = None
        stage.started_at = None
        stage.completed_at = None
        stage.duration_ms = None
        return self._as_dict(stage)

    def snapshot(self) -> list[dict]:
        return [self._as_dict(stage) for stage in sorted(self._stages.values(), key=lambda item: item.number)]

    def stage(self, stage_id: str) -> Mapping[str, object]:
        return self._as_dict(self._get(stage_id))

    @staticmethod
    def _as_dict(stage: _StageTimer) -> dict:
        return {
            "number": stage.number,
            "id": stage.stage_id,
            "name": stage.name,
            "status": stage.status,
            "started_at": stage.started_at,
            "completed_at": stage.completed_at,
            "duration_ms": stage.duration_ms,
            "outcome": stage.outcome,
            "error": stage.error,
        }
