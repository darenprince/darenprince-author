from __future__ import annotations

import os
from functools import lru_cache

import numpy as np

from .evidence_acquisition import DiarizationResult, SpeakerSegment


class PyannoteDiarizationProvider:
    """Optional local pyannote speaker-diarization provider."""

    provider_id = "pyannote.community-1"
    model_id = "pyannote/speaker-diarization-community-1"

    def __init__(self, *, token: str | None = None, model_id: str | None = None) -> None:
        self.token = token or os.getenv("HF_TOKEN") or os.getenv("HUGGINGFACE_TOKEN")
        self.model_id = model_id or os.getenv("VOXVECTOR_DIARIZATION_MODEL", self.model_id)

    @staticmethod
    @lru_cache(maxsize=2)
    def _pipeline(model_id: str, token: str):
        try:
            from pyannote.audio import Pipeline
        except ImportError as exc:
            raise RuntimeError(
                "pyannote.audio is not installed; enable the VoxVector speech runtime"
            ) from exc
        return Pipeline.from_pretrained(model_id, token=token)

    def diarize(self, signal: np.ndarray, sample_rate: int) -> DiarizationResult:
        if not self.token:
            raise RuntimeError(
                "Hugging Face access token is required for the configured pyannote model"
            )
        if sample_rate <= 0:
            raise ValueError("sample_rate must be positive")
        waveform = np.asarray(signal, dtype=np.float32).reshape(1, -1)
        pipeline = self._pipeline(self.model_id, self.token)
        output = pipeline({"waveform": waveform, "sample_rate": sample_rate})
        annotation = getattr(output, "speaker_diarization", output)
        rows: list[SpeakerSegment] = []
        speakers: set[str] = set()
        for turn, _, speaker in annotation.itertracks(yield_label=True):
            speaker_id = str(speaker)
            speakers.add(speaker_id)
            rows.append(
                SpeakerSegment(
                    speaker_id=speaker_id,
                    start_s=float(turn.start),
                    end_s=float(turn.end),
                    confidence=None,
                )
            )
        return DiarizationResult(
            provider_id=self.provider_id,
            speakers=tuple(sorted(speakers)),
            segments=tuple(rows),
            limitations=(
                "Speaker labels identify diarization clusters, not verified real-world identities.",
                "Diarization quality is recording- and task-dependent and requires evaluation on VoxVector target conditions.",
            ),
        )
