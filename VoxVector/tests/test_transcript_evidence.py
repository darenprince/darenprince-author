from voxvector.evidence_acquisition import TranscriptResult, TranscriptSegment, TranscriptWord
from voxvector.transcript_evidence import build_transcript_evidence


def test_transcript_evidence_extracts_timestamp_and_disfluency_metrics():
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
    result = build_transcript_evidence(transcript)
    metrics = result["metrics"]
    assert metrics["token_count"] == 7
    assert metrics["filled_pause_count"] >= 1
    assert metrics["repetition_count"] >= 1
    assert metrics["timestamp_coverage"] == 1.0
    assert metrics["mean_word_confidence"] > 0.9
    assert result["observations"]
    assert result["evidence"]


def test_transcript_evidence_handles_empty_words_with_segment_text():
    transcript = TranscriptResult(
        provider_id="test",
        language="en",
        text="hello world",
        segments=(TranscriptSegment(0.0, 1.0, "hello world"),),
        words=(),
    )
    result = build_transcript_evidence(transcript)
    assert result["metrics"]["token_count"] == 2
    assert result["metrics"]["timestamp_coverage"] == 0.0
