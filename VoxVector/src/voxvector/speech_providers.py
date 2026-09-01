from __future__ import annotations

import os

from .diarization_pyannote import PyannoteDiarizationProvider
from .transcription_faster_whisper import FasterWhisperProvider


def get_transcription_provider():
    provider = os.getenv("VOXVECTOR_TRANSCRIPTION_PROVIDER", "").strip().lower()
    if provider in {"", "none", "disabled", "off"}:
        return None
    if provider in {"faster_whisper", "faster-whisper", "whisper"}:
        return FasterWhisperProvider()
    raise ValueError(f"Unsupported VoxVector transcription provider: {provider}")


def get_diarization_provider():
    provider = os.getenv("VOXVECTOR_DIARIZATION_PROVIDER", "").strip().lower()
    if provider in {"", "none", "disabled", "off"}:
        return None
    if provider in {"pyannote", "pyannote.community-1", "community-1"}:
        return PyannoteDiarizationProvider()
    raise ValueError(f"Unsupported VoxVector diarization provider: {provider}")
