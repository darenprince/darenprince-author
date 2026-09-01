import asyncio

import pytest

from voxvector.execution_trace import AnalysisExecutionTrace


STAGES = [
    (1, "stage_a", "Stage A"),
    (2, "stage_b", "Stage B"),
]


@pytest.mark.parametrize("failing", [False, True])
def test_execution_trace_lifecycle(monkeypatch, failing):
    emitted = []

    async def fake_emit(event, **fields):
        emitted.append((event, fields))
        return None

    monkeypatch.setattr("voxvector.execution_trace.DIAGNOSTICS.emit", fake_emit)
    trace = AnalysisExecutionTrace(STAGES, request_id="req", run_id="run")

    async def scenario():
        await trace.run_started()
        await trace.start("stage_a")
        if failing:
            await trace.fail("stage_a", RuntimeError("boom"))
        else:
            await trace.complete("stage_a", outcome="ok")
        await trace.run_completed(status="failed" if failing else "completed")

    asyncio.run(scenario())
    names = [name for name, _ in emitted]
    assert names[0] == "analysis.run_started"
    assert "analysis.stage_started" in names
    assert "analysis.stage_failed" in names if failing else "analysis.stage_completed" in names
    assert names[-1] == "analysis.run_completed"
    assert all(fields["trace_id"] for _, fields in emitted)
    assert all(fields["analysis_run_id"] == "run" for _, fields in emitted)
