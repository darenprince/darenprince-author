from api.app import (
    _analysis_failure_detail,
    _checkpoint_acquisition_run,
    _mark_downstream_memory_rejected,
    _merge_transcript_evidence,
    _new_stage_states,
    _pipeline_progress_summary,
)
from voxvector.evidence_acquisition import TranscriptResult, TranscriptSegment, TranscriptWord
from voxvector.transcript_evidence import build_transcript_evidence


def test_case_result_merges_acquired_transcript_evidence_without_changing_disposition():
    transcript = TranscriptResult(
        provider_id="test",
        language="en",
        text="I uh think I I can answer",
        segments=(TranscriptSegment(0.0, 2.0, "I uh think I I can answer"),),
        words=(
            TranscriptWord("I", 0.0, 0.2, 0.99),
            TranscriptWord("uh", 0.25, 0.4, 0.95),
            TranscriptWord("think", 0.45, 0.8, 0.98),
            TranscriptWord("I", 0.9, 1.0, 0.99),
            TranscriptWord("I", 1.05, 1.15, 0.99),
            TranscriptWord("can", 1.2, 1.45, 0.98),
            TranscriptWord("answer", 1.5, 1.9, 0.98),
        ),
    )
    result = {
        "candidate": "indeterminate",
        "disposition": "insufficient_evidence",
        "observations": [{"feature": "rms", "value": 0.2}],
        "evidence": [{"direction": "neutral", "method_id": "acoustic.rms"}],
        "provenance": {"input_sha256": "abc"},
    }

    merged, observation_count, evidence_count = _merge_transcript_evidence(
        result,
        build_transcript_evidence(transcript),
    )

    assert merged["candidate"] == "indeterminate"
    assert merged["disposition"] == "insufficient_evidence"
    assert observation_count > 0
    assert evidence_count > 0
    assert len(merged["observations"]) == 1 + observation_count
    assert len(merged["evidence"]) == 1 + evidence_count
    assert merged["provenance"]["input_sha256"] == "abc"
    assert merged["provenance"]["transcript_evidence"]["method_id"] == "linguistic.transcript_evidence"
    assert merged["provenance"]["transcript_evidence"]["metrics"]["token_count"] == 7


def test_case_result_can_persist_transcript_evidence_when_composite_result_is_unavailable():
    transcript = TranscriptResult(
        provider_id="test",
        language="en",
        text="hello world",
        segments=(TranscriptSegment(0.0, 1.0, "hello world"),),
        words=(),
    )

    merged, observation_count, evidence_count = _merge_transcript_evidence(
        None,
        build_transcript_evidence(transcript),
    )

    assert observation_count > 0
    assert evidence_count > 0
    assert merged["observations"]
    assert merged["evidence"]
    assert merged["provenance"]["transcript_evidence"]["metrics"]["token_count"] == 2


def test_upstream_acquisition_checkpoint_preserves_same_run_and_provider_artifacts(monkeypatch):
    from api import app as api_app

    monkeypatch.setattr(api_app, "RENDER_INSTANCE_ID", "render-instance-1")
    stages = _new_stage_states()
    for stage in stages:
        if stage["id"] in {"transcription_generation", "transcript_alignment"}:
            stage["status"] = "complete"
    live_run = {
        "run_id": "run-1",
        "analysis_id": "run-1",
        "status": "running",
        "process_instance_id": "process-1",
        "stages": stages,
    }
    acquisition = {
        "transcription_state": "completed",
        "diarization_state": "not_invoked",
        "transcript": {
            "segments": [{"start_s": 0.0, "end_s": 1.0, "text": "hello"}],
            "words": [{"text": "hello", "start_s": 0.0, "end_s": 0.4}],
        },
        "multimodal_timeline": {"words": [{"text": "hello", "start_s": 0.0, "end_s": 0.4}]},
        "diarization": {"speakers": []},
        "provider_timings_ms": {"transcription": 123.0},
    }

    checkpoint = _checkpoint_acquisition_run(live_run, acquisition, stages)

    assert checkpoint["run_id"] == "run-1"
    assert checkpoint["analysis_id"] == "run-1"
    assert checkpoint["acquisition"] is acquisition
    assert checkpoint["transcript"]["words"][0]["text"] == "hello"
    assert checkpoint["provider_timings_ms"] == {"transcription": 123.0}
    assert checkpoint["upstream_checkpoint"]["transcription_state"] == "completed"
    assert checkpoint["upstream_checkpoint"]["transcript_available"] is True
    assert checkpoint["upstream_checkpoint"]["alignment_available"] is True
    assert checkpoint["current_stage"]["status"] == "pending"
    assert checkpoint["render_instance_id"] == "render-instance-1"
    assert checkpoint["pipeline_build"] == {
        "total_stages": 21,
        "completed": 2,
        "pending": 19,
        "not_run": 0,
        "failed": 0,
    }


def test_downstream_memory_rejection_marks_composite_dependency_without_erasing_upstream_stages():
    stages = _new_stage_states()
    for stage in stages:
        if stage["id"] in {"speech_segmentation", "transcription_generation", "transcript_alignment"}:
            stage["status"] = "complete"

    message = _mark_downstream_memory_rejected(
        stages,
        RuntimeError("Insufficient memory headroom for pipeline:acoustic_feature_extraction"),
        "2026-09-10T12:00:00+00:00",
    )
    by_id = {stage["id"]: stage for stage in stages}
    summary = _pipeline_progress_summary(stages)

    assert message.startswith("RuntimeError: Insufficient memory headroom")
    assert by_id["speech_segmentation"]["status"] == "complete"
    assert by_id["transcription_generation"]["status"] == "complete"
    assert by_id["transcript_alignment"]["status"] == "complete"
    assert by_id["acoustic_feature_extraction"]["status"] == "failed"
    assert "upstream speech artifacts were preserved" in by_id["acoustic_feature_extraction"]["outcome"]
    assert by_id["eligibility_reliability"]["status"] == "not_run"
    assert by_id["final_disposition"]["status"] == "not_run"
    assert summary == {
        "total_stages": 21,
        "completed": 3,
        "pending": 9,
        "not_run": 8,
        "failed": 1,
    }


def test_analysis_failure_detail_does_not_expose_exception_message():
    secret = "sensitive stack/path/token-like detail"

    detail = _analysis_failure_detail(
        RuntimeError(secret),
        "request-1",
        "acoustic_feature_extraction",
    )

    assert detail["request_id"] == "request-1"
    assert detail["failed_stage"] == "acoustic_feature_extraction"
    assert detail["error_type"] == "RuntimeError"
    assert secret not in str(detail)
    assert "Use the request ID in diagnostics" in detail["message"]
