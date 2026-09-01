from voxvector.alignment import align_transcript_to_speakers
from voxvector.evidence_acquisition import DiarizationResult, SpeakerSegment, TranscriptResult, TranscriptWord


def test_alignment_assigns_word_to_speaker_by_maximum_time_overlap():
    transcript = TranscriptResult(
        provider_id="test",
        language="en",
        text="hello world",
        segments=(),
        words=(
            TranscriptWord("hello", 0.0, 0.5, 0.9),
            TranscriptWord("world", 0.6, 1.0, 0.9),
        ),
    )
    diarization = DiarizationResult(
        provider_id="test",
        speakers=("SPEAKER_00", "SPEAKER_01"),
        segments=(
            SpeakerSegment("SPEAKER_00", 0.0, 0.55, 0.9),
            SpeakerSegment("SPEAKER_01", 0.55, 1.1, 0.9),
        ),
    )
    result = align_transcript_to_speakers(transcript, diarization)
    assert result.words[0].speaker_id == "SPEAKER_00"
    assert result.words[1].speaker_id == "SPEAKER_01"
    assert result.words[0].speaker_overlap == 1.0


def test_alignment_preserves_unattributed_word_when_no_speaker_overlaps():
    transcript = TranscriptResult(
        provider_id="test",
        language="en",
        text="hello",
        segments=(),
        words=(TranscriptWord("hello", 2.0, 2.2, 0.9),),
    )
    diarization = DiarizationResult(
        provider_id="test",
        speakers=("SPEAKER_00",),
        segments=(SpeakerSegment("SPEAKER_00", 0.0, 1.0, 0.9),),
    )
    result = align_transcript_to_speakers(transcript, diarization)
    assert result.words[0].speaker_id is None
    assert result.words[0].speaker_overlap == 0.0
