import numpy as np
import pytest

from voxvector.diarization_pyannote import PyannoteDiarizationProvider
from voxvector.diarization_pyannote_api import PyannoteAPIDiarizationProvider
from voxvector.evidence_acquisition import DiarizationResult, SpeakerSegment, TranscriptResult
from voxvector.speech_providers import FallbackDiarizationProvider, get_diarization_provider, get_transcription_provider
from voxvector.transcription_faster_whisper import FasterWhisperProvider


def test_provider_selection_is_disabled_by_default(monkeypatch):
    monkeypatch.delenv("VOXVECTOR_TRANSCRIPTION_PROVIDER", raising=False)
    monkeypatch.delenv("VOXVECTOR_DIARIZATION_PROVIDER", raising=False)
    assert get_transcription_provider() is None
    assert get_diarization_provider() is None


def test_unknown_provider_is_rejected(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_TRANSCRIPTION_PROVIDER", "unknown")
    with pytest.raises(ValueError, match="Unsupported VoxVector transcription provider"):
        get_transcription_provider()


def test_faster_whisper_adapter_serializes_wav_without_loading_model():
    stream = FasterWhisperProvider._wav_bytes(np.zeros(1600, dtype=np.float32), 16000)
    assert stream.read(4) == b"RIFF"
    assert stream.getvalue()[8:12] == b"WAVE"


def test_faster_whisper_defaults_bound_cpu_and_process_lifetime(monkeypatch):
    for key in (
        "VOXVECTOR_WHISPER_BEAM_SIZE",
        "VOXVECTOR_WHISPER_CPU_THREADS",
        "VOXVECTOR_WHISPER_NUM_WORKERS",
        "VOXVECTOR_WHISPER_TIMEOUT_SECONDS",
        "VOXVECTOR_WHISPER_ISOLATED_PROCESS",
    ):
        monkeypatch.delenv(key, raising=False)

    provider = FasterWhisperProvider()
    config = provider._isolated_config(183.3)

    assert provider.beam_size == 1
    assert provider.cpu_threads == 1
    assert provider.num_workers == 1
    assert provider.timeout_seconds == 165.0
    assert provider.isolate_process is True
    assert config["beam_size"] == 1
    assert config["cpu_threads"] == 1
    assert config["num_workers"] == 1
    assert config["audio_duration_seconds"] == 183.3


def test_faster_whisper_process_isolation_can_be_disabled_explicitly(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_WHISPER_ISOLATED_PROCESS", "false")
    provider = FasterWhisperProvider()
    assert provider.isolate_process is False


def test_cached_whisper_models_can_be_released():
    FasterWhisperProvider.release_models()
    assert FasterWhisperProvider._model.cache_info().currsize == 0


def test_pyannote_provider_requires_token_before_model_load(monkeypatch):
    monkeypatch.delenv("HF_TOKEN", raising=False)
    monkeypatch.delenv("HUGGINGFACE_TOKEN", raising=False)
    with pytest.raises(RuntimeError, match="Hugging Face access token"):
        PyannoteDiarizationProvider().diarize(np.zeros(1600), 16000)


def test_pyannote_api_provider_requires_key(monkeypatch):
    monkeypatch.delenv("PYANNOTE_KEY", raising=False)
    monkeypatch.delenv("PYANNOTE_API_KEY", raising=False)
    with pytest.raises(RuntimeError, match="pyannoteAI API key"):
        PyannoteAPIDiarizationProvider().diarize(np.zeros(1600), 16000)


def test_pyannote_api_provider_selection(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_DIARIZATION_PROVIDER", "pyannote_api")
    monkeypatch.setenv("PYANNOTE_KEY", "test-key")
    provider = get_diarization_provider()
    assert isinstance(provider, PyannoteAPIDiarizationProvider)


def test_explicit_local_fallback_is_wrapped(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_DIARIZATION_PROVIDER", "pyannote_api")
    monkeypatch.setenv("VOXVECTOR_DIARIZATION_FALLBACK", "pyannote_local")
    monkeypatch.setenv("VOXVECTOR_DIARIZATION_FALLBACK_ENABLED", "true")
    provider = get_diarization_provider()
    assert isinstance(provider, FallbackDiarizationProvider)


def test_fallback_records_provenance():
    class Primary:
        provider_id = "primary"
        def diarize(self, signal, sample_rate):
            raise RuntimeError("primary unavailable")
        def release(self):
            return None

    class Secondary:
        provider_id = "secondary"
        def diarize(self, signal, sample_rate):
            return DiarizationResult(
                provider_id=self.provider_id,
                speakers=("SPEAKER_00",),
                segments=(SpeakerSegment("SPEAKER_00", 0.0, 1.0),),
                provenance={"provider": self.provider_id, "fallback_used": False},
            )
        def release(self):
            return None

    result = FallbackDiarizationProvider(Primary(), Secondary()).diarize(np.zeros(1600), 16000)
    assert result.provenance["fallback_used"] is True
    assert result.provenance["primary_provider"] == "primary"
    assert result.provenance["fallback_provider"] == "secondary"


def test_cached_pyannote_pipelines_can_be_released():
    PyannoteDiarizationProvider.release_models()
    assert PyannoteDiarizationProvider._pipeline.cache_info().currsize == 0
