import numpy as np

from voxvector.evidence_acquisition import (
    TranscriptResult,
    build_evidence_acquisition,
)


class StubProvider:
    provider_id = "test.stub"

    def transcribe(self, signal, sample_rate):
        return TranscriptResult(
            provider_id=self.provider_id,
            language="en",
            text="test transcript",
            segments=(),
            words=(),
        )


def test_build_evidence_acquisition_profiles_audio_and_timeline():
    signal = np.concatenate(
        [np.zeros(800), np.ones(2400) * 0.1, np.zeros(800)]
    )
    result = build_evidence_acquisition(signal, 8000)
    assert result.media_profile.sample_rate == 8000
    assert result.media_profile.duration_seconds == len(signal) / 8000
    assert result.media_profile.sha256
    assert result.transcription_state == "not_configured"
    assert result.diarization_state == "not_configured"
    assert result.transcript is None
    assert result.speech_timeline.method_id == "evidence_acquisition.energy_activity"


def test_transcription_provider_contract_is_optional_and_explicit():
    result = build_evidence_acquisition(
        np.ones(1600) * 0.1, 8000, transcript_provider=StubProvider()
    )
    assert result.transcription_state == "completed"
    assert result.transcript is not None
    assert result.transcript.text == "test transcript"
