from __future__ import annotations

import os

from .diarization_pyannote import PyannoteDiarizationProvider
from .diarization_pyannote_api import PyannoteAPIDiarizationProvider
from .evidence_acquisition import DiarizationResult
from .transcription_faster_whisper import FasterWhisperProvider


class FallbackDiarizationProvider:
    """Explicit primary/fallback provider wrapper that preserves runtime provenance."""

    def __init__(self, primary, fallback) -> None:
        self.primary = primary
        self.fallback = fallback
        self.provider_id = f"{primary.provider_id}->fallback:{fallback.provider_id}"

    def release(self) -> None:
        for provider in (self.primary, self.fallback):
            release = getattr(provider, "release", None)
            if callable(release):
                release()

    def diarize(self, signal, sample_rate) -> DiarizationResult:
        try:
            return self.primary.diarize(signal, sample_rate)
        except Exception as primary_error:
            result = self.fallback.diarize(signal, sample_rate)
            return DiarizationResult(
                provider_id=result.provider_id,
                speakers=result.speakers,
                segments=result.segments,
                limitations=tuple(result.limitations) + (
                    f"Primary diarization provider {self.primary.provider_id} failed; explicit fallback {self.fallback.provider_id} was used.",
                ),
                provenance={
                    **dict(getattr(result, "provenance", {}) or {}),
                    "primary_provider": self.primary.provider_id,
                    "fallback_provider": self.fallback.provider_id,
                    "fallback_used": True,
                    "fallback_reason": type(primary_error).__name__,
                },
            )


def get_transcription_provider():
    provider = os.getenv("VOXVECTOR_TRANSCRIPTION_PROVIDER", "").strip().lower()
    if provider in {"", "none", "disabled", "off"}:
        return None
    if provider in {"faster_whisper", "faster-whisper", "whisper"}:
        return FasterWhisperProvider()
    raise ValueError(f"Unsupported VoxVector transcription provider: {provider}")


def _diarization_provider_from_name(provider: str):
    if provider in {"pyannote_api", "pyannote.api", "pyannoteai"}:
        return PyannoteAPIDiarizationProvider()
    if provider in {"pyannote", "pyannote_local", "pyannote.community-1", "community-1"}:
        return PyannoteDiarizationProvider()
    raise ValueError(f"Unsupported VoxVector diarization provider: {provider}")


def get_diarization_provider():
    provider = os.getenv("VOXVECTOR_DIARIZATION_PROVIDER", "").strip().lower()
    if provider in {"", "none", "disabled", "off"}:
        return None

    primary = _diarization_provider_from_name(provider)
    fallback_name = os.getenv("VOXVECTOR_DIARIZATION_FALLBACK", "").strip().lower()
    fallback_enabled = os.getenv("VOXVECTOR_DIARIZATION_FALLBACK_ENABLED", "false").strip().lower() in {"1", "true", "yes", "on"}
    if fallback_enabled and fallback_name not in {"", "none", "disabled", "off", provider}:
        return FallbackDiarizationProvider(primary, _diarization_provider_from_name(fallback_name))
    return primary
