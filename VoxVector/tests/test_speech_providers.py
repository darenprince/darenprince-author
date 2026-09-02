import os

import numpy as np
import pytest

from voxvector.diarization_pyannote import PyannoteDiarizationProvider
from voxvector.evidence_acquisition import DiarizationResult, SpeakerSegment, TranscriptResult, TranscriptWord
from voxvector.speech_providers import get_diarization_provider, get_transcription_provider
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


def test_faster_whisper_adapter_serializes_wav_without_loading_model(monkeypatch):
    stream = FasterWhisperProvider._wav_bytes(np.zeros(1600, dtype=np.float32), 16000)
    assert stream.read(4) == b"RIFF"
    assert stream.getvalue()[8:12] == b"WAVE"


def test_cached_whisper_models_can_be_released():
    FasterWhisperProvider.release_models()
    assert FasterWhisperProvider._model.cache_info().currsize == 0


def test_pyannote_provider_requires_token_before_model_load(monkeypatch):
    monkeypatch.delenv("HF_TOKEN", raising=False)
    monkeypatch.delenv("HUGGINGFACE_TOKEN", raising=False)
    with pytest.raises(RuntimeError, match="Hugging Face access token"):
        PyannoteDiarizationProvider().diarize(np.zeros(1600), 16000)


def test_cached_pyannote_pipelines_can_be_released():
    PyannoteDiarizationProvider.release_models()
    assert PyannoteDiarizationProvider._pipeline.cache_info().currsize == 0
