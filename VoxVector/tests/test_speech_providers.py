import re
from pathlib import Path

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


def test_render_profile_does_not_override_constrained_whisper_beam_size():
    render_yaml = (Path(__file__).resolve().parents[2] / "render.yaml").read_text(encoding="utf-8")
    match = re.search(
        r"- key: VOXVECTOR_WHISPER_BEAM_SIZE\s+value: [\"']?(\d+)[\"']?",
        render_yaml,
    )
    assert match is not None
    assert match.group(1) == "1"


def test_render_blueprint_matches_canonical_service_shape_and_manual_deploy_policy():
    render_yaml = (Path(__file__).resolve().parents[2] / "render.yaml").read_text(encoding="utf-8")

    assert "name: voxvector-api" in render_yaml
    assert "repo: https://github.com/darenprince/darenprince-author" in render_yaml
    assert "branch: main" in render_yaml
    assert "plan: free" in render_yaml
    assert "region: oregon" in render_yaml
    assert "rootDir: VoxVector" in render_yaml
    assert "buildCommand: pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt" in render_yaml
    assert "startCommand: uvicorn api.app:app --host 0.0.0.0 --port $PORT" in render_yaml
    assert "healthCheckPath: /health" in render_yaml
    assert "autoDeployTrigger: off" in render_yaml
    assert "- voxvector.crownlabs.tech" in render_yaml


def test_render_blueprint_uses_explicit_browser_cors_and_bounded_runtime_profile():
    render_yaml = (Path(__file__).resolve().parents[2] / "render.yaml").read_text(encoding="utf-8")

    cors_match = re.search(r"- key: CORS_ORIGINS\s+value: ([^\n]+)", render_yaml)
    assert cors_match is not None
    cors_origins = {origin.strip() for origin in cors_match.group(1).split(",")}
    assert cors_origins == {
        "https://darenprince.com",
        "https://www.darenprince.com",
        "https://voxvector.crownlabs.tech",
    }
    assert "*" not in cors_match.group(1)

    required_values = {
        "VOXVECTOR_TRANSCRIPTION_PROVIDER": "faster_whisper",
        "VOXVECTOR_WHISPER_MODEL": "base",
        "VOXVECTOR_WHISPER_DEVICE": "cpu",
        "VOXVECTOR_WHISPER_COMPUTE_TYPE": "int8",
        "VOXVECTOR_WHISPER_BEAM_SIZE": "1",
        "VOXVECTOR_WHISPER_CPU_THREADS": "1",
        "VOXVECTOR_WHISPER_NUM_WORKERS": "1",
        "VOXVECTOR_WHISPER_ISOLATED_PROCESS": "true",
        "VOXVECTOR_WHISPER_TIMEOUT_SECONDS": "165",
        "VOXVECTOR_MEMORY_LIMIT_MB": "512",
        "VOXVECTOR_MEMORY_HEADROOM_MB": "96",
        "VOXVECTOR_DIARIZATION_PROVIDER": "pyannote_api",
        "VOXVECTOR_DIARIZATION_FALLBACK": "none",
        "VOXVECTOR_DIARIZATION_FALLBACK_ENABLED": "false",
        "VOXVECTOR_ENABLE_DIARIZATION_RUNS": "false",
        "OMP_NUM_THREADS": "1",
        "MKL_NUM_THREADS": "1",
        "OPENBLAS_NUM_THREADS": "1",
        "MALLOC_ARENA_MAX": "2",
        "TOKENIZERS_PARALLELISM": "false",
    }
    for key, expected in required_values.items():
        match = re.search(rf"- key: {re.escape(key)}\s+value: [\"']?([^\"'\n]+)[\"']?", render_yaml)
        assert match is not None, key
        assert match.group(1).strip() == expected, key


def test_render_speech_manifest_excludes_optional_local_pyannote_runtime():
    api_dir = Path(__file__).resolve().parents[1] / "api"
    speech_requirements = (api_dir / "requirements-speech.txt").read_text(encoding="utf-8")
    transcription_requirements = (api_dir / "requirements-transcription.txt").read_text(encoding="utf-8")
    local_requirements = (api_dir / "requirements-diarization-local.txt").read_text(encoding="utf-8")

    active_speech_requirements = [
        line.strip()
        for line in speech_requirements.splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    ]
    assert active_speech_requirements == ["-r requirements-transcription.txt"]
    assert "faster-whisper" in transcription_requirements
    assert "pyannote.audio==4.0.7" in local_requirements


def test_container_preserves_explicit_local_diarization_fallback_dependency():
    dockerfile = (Path(__file__).resolve().parents[1] / "Dockerfile").read_text(encoding="utf-8")

    assert "requirements-diarization-local.txt" in dockerfile
    assert "python -m pip install -r /app/api/requirements-diarization-local.txt" in dockerfile


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
    assert result.provenance["primary_error_type"] == "RuntimeError"
    assert result.provenance["primary_error_message"] == "primary unavailable"


def test_fallback_failure_reports_both_provider_errors():
    class Primary:
        provider_id = "primary"
        def diarize(self, signal, sample_rate):
            raise TimeoutError("primary deadline")

    class Secondary:
        provider_id = "secondary"
        def diarize(self, signal, sample_rate):
            raise RuntimeError("fallback unavailable")

    with pytest.raises(RuntimeError, match="primary deadline.*fallback unavailable"):
        FallbackDiarizationProvider(Primary(), Secondary()).diarize(np.zeros(1600), 16000)


def test_cached_pyannote_pipelines_can_be_released():
    PyannoteDiarizationProvider.release_models()
    assert PyannoteDiarizationProvider._pipeline.cache_info().currsize == 0
