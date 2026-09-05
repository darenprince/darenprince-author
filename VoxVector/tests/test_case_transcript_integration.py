from api.app import _merge_transcript_evidence
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
