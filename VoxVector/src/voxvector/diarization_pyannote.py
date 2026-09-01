from __future__ import annotations

import os
import tempfile
import wave
from functools import lru_cache

import numpy as np

from .evidence_acquisition import DiarizationResult, SpeakerSegment


class PyannoteDiarizationProvider:
    """Optional local pyannote Community-1 speaker-diarization provider."""

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

    @staticmethod
    def _wav_bytes(signal: np.ndarray, sample_rate: int) -> bytes:
        pcm = np.clip(np.asarray(signal, dtype=np.float32).reshape(-1), -1.0, 1.0)
        pcm16 = (pcm * 32767.0).astype("<i2", copy=False)
        # pyannote accepts an audio path reliably across supported 4.x I/O paths.
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as handle:
            path = handle.name
        try:
            with wave.open(path, "wb") as wav:
                wav.setnchannels(1)
                wav.setsampwidth(2)
                wav.setframerate(sample_rate)
                wav.writeframes(pcm16.tobytes())
            with open(path, "rb") as handle:
                return handle.read()
        finally:
            try:
                os.remove(path)
            except OSError:
                pass

    def diarize(self, signal: np.ndarray, sample_rate: int) -> DiarizationResult:
        if not self.token:
            raise RuntimeError(
                "Hugging Face access token is required for the configured pyannote model"
            )
        if sample_rate <= 0:
            raise ValueError("sample_rate must be positive")
        try:
            import torch
        except ImportError as exc:
            raise RuntimeError(
                "PyTorch is not installed; enable the VoxVector speech runtime"
            ) from exc

        pipeline = self._pipeline(self.model_id, self.token)
        pcm = np.asarray(signal, dtype=np.float32).reshape(-1)
        waveform = torch.from_numpy(pcm).unsqueeze(0)
        output = pipeline({"waveform": waveform, "sample_rate": sample_rate})
        annotation = getattr(output, "exclusive_speaker_diarization", None)
        if annotation is None:
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
                "Diarization confidence is not supplied by this provider adapter; segment confidence remains null.",
                "Diarization quality is recording- and task-dependent and requires evaluation on VoxVector target conditions.",
            ),
        )
