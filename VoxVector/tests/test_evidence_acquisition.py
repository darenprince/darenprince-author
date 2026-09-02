import numpy as np

from voxvector.evidence_acquisition import (
    DiarizationResult,
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


class StubDiarizationProvider:
    provider_id = "test.diarization"

    def diarize(self, signal, sample_rate):
        return DiarizationResult(
            provider_id=self.provider_id,
            speakers=("SPEAKER_00",),
            segments=(),
        )


class FailingProvider:
    provider_id = "test.failing"

    def transcribe(self, signal, sample_rate):
        raise RuntimeError("model unavailable")

    def diarize(self, signal, sample_rate):
        raise RuntimeError("diarization unavailable")


def test_build_evidence_acquisition_profiles_audio_and_timeline(monkeypatch):
    monkeypatch.delenv("VOXVECTOR_TRANSCRIPTION_PROVIDER", raising=False)
    monkeypatch.delenv("VOXVECTOR_DIARIZATION_PROVIDER", raising=False)
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
    assert result.diarization is None
    assert result.provider_timings_ms == {}
    assert result.speech_timeline.method_id == "evidence_acquisition.energy_activity"


def test_transcription_provider_contract_is_optional_and_explicit():
    result = build_evidence_acquisition(
        np.ones(1600) * 0.1, 8000, transcript_provider=StubProvider()
    )
    assert result.transcription_state == "completed"
    assert result.transcript is not None
    assert result.transcript.text == "test transcript"
    assert result.provider_timings_ms["transcription"] >= 0


def test_explicit_diarization_provider_is_recorded():
    result = build_evidence_acquisition(
        np.ones(1600) * 0.1, 8000, diarization_provider=StubDiarizationProvider()
    )
    assert result.diarization_state == "completed"
    assert result.diarization is not None
    assert result.diarization.speakers == ("SPEAKER_00",)
    assert result.provider_timings_ms["diarization"] >= 0


def test_environment_provider_selection_is_used(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_TRANSCRIPTION_PROVIDER", "faster_whisper")
    monkeypatch.setenv("VOXVECTOR_DIARIZATION_PROVIDER", "none")
    import voxvector.speech_providers as providers

    monkeypatch.setattr(
        providers,
        "get_transcription_provider",
        lambda: StubProvider(),
    )
    result = build_evidence_acquisition(np.ones(1600) * 0.1, 8000)
    assert result.transcription_state == "completed"
    assert result.transcript.text == "test transcript"
    assert result.provider_timings_ms["transcription"] >= 0


def test_provider_failures_are_explicit_and_non_fatal():
    result = build_evidence_acquisition(
        np.ones(1600) * 0.1,
        8000,
        transcript_provider=FailingProvider(),
        diarization_provider=FailingProvider(),
    )
    assert result.transcription_state == "unavailable"
    assert result.diarization_state == "unavailable"
    assert result.transcript is None
    assert result.diarization is None
    assert result.provider_timings_ms["transcription"] >= 0
    assert result.provider_timings_ms["diarization"] >= 0
    assert len(result.limitations) == 2
