import time

import pytest

from voxvector.stage_telemetry import StageTelemetry


DEFINITIONS = [
    (1, "decode", "Decode"),
    (2, "analysis", "Analysis"),
    (3, "queued", "Queued"),
]


def test_stage_telemetry_records_real_elapsed_time_and_order():
    telemetry = StageTelemetry(DEFINITIONS)
    started = telemetry.start("decode")
    assert started["status"] == "running"
    assert started["started_at"]
    time.sleep(0.001)
    finished = telemetry.complete("decode", outcome="decoded")
    assert finished["status"] == "complete"
    assert finished["completed_at"]
    assert finished["duration_ms"] >= 0
    assert finished["outcome"] == "decoded"
    assert finished["error"] is None


def test_stage_telemetry_records_failures_without_losing_timing():
    telemetry = StageTelemetry(DEFINITIONS)
    telemetry.start("analysis")
    failed = telemetry.fail("analysis", error="decoder failed", outcome="analysis aborted")
    assert failed["status"] == "failed"
    assert failed["duration_ms"] >= 0
    assert failed["error"] == "decoder failed"
    assert failed["outcome"] == "analysis aborted"


def test_stage_telemetry_supports_explicit_non_execution_states():
    telemetry = StageTelemetry(DEFINITIONS)
    telemetry.mark_pending("queued", outcome="waiting for dependency")
    assert telemetry.stage("queued")["status"] == "pending"
    telemetry.mark_not_run("queued", outcome="dependency unavailable")
    assert telemetry.stage("queued")["status"] == "not_run"
    snapshot = telemetry.snapshot()
    assert [item["number"] for item in snapshot] == [1, 2, 3]


def test_stage_telemetry_rejects_invalid_transitions():
    telemetry = StageTelemetry(DEFINITIONS)
    with pytest.raises(KeyError):
        telemetry.start("missing")
    with pytest.raises(RuntimeError):
        telemetry.complete("decode")
    telemetry.start("decode")
    with pytest.raises(RuntimeError):
        telemetry.start("decode")
    telemetry.complete("decode")
    with pytest.raises(RuntimeError):
        telemetry.complete("decode")
