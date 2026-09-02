from __future__ import annotations

import os
import tempfile
import time
import wave
from functools import lru_cache

import numpy as np

from .evidence_acquisition import DiarizationResult, SpeakerSegment
from .speech_runtime_logging import speech_log


class PyannoteDiarizationProvider:
    """Optional local pyannote Community-1 speaker-diarization provider."""

    provider_id = "pyannote.community-1"
    model_id = "pyannote/speaker-diarization-community-1"

    def __init__(self, *, token: str | None = None, model_id: str | None = None) -> None:
        self.token = token or os.getenv("HF_TOKEN") or os.getenv("HUGGINGFACE_TOKEN")
        self.model_id = model_id or os.getenv("VOXVECTOR_DIARIZATION_MODEL", self.model_id)

    @staticmethod
    @lru_cache(maxsize=1)
    def _pipeline(model_id: str, token: str):
        try:
            from pyannote.audio import Pipeline
        except ImportError as exc:
            raise RuntimeError(
                "pyannote.audio is not installed; enable the VoxVector speech runtime"
            ) from exc
        pipeline = Pipeline.from_pretrained(model_id, token=token)
        speech_log("diarization.model_loaded", model_id=model_id)
        return pipeline

    @classmethod
    def release_models(cls) -> None:
        """Release cached diarization pipeline references between heavy provider phases."""
        cls._pipeline.cache_clear()

    def release(self) -> None:
        self.release_models()

    @staticmethod
    def _wav_bytes(signal: np.ndarray, sample_rate: int) -> bytes:
        pcm = np.clip(np.asarray(signal, dtype=np.float32).reshape(-1), -1.0, 1.0)
        pcm16 = (pcm * 32767.0).astype("<i2", copy=False)
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

        started = time.perf_counter()
        speech_log(
            "diarization.started",
            started=started,
            model_id=self.model_id,
            audio_duration_seconds=round(signal.size / sample_rate, 3),
        )
        try:
            pipeline = self._pipeline(self.model_id, self.token)
            pcm = np.asarray(signal, dtype=np.float32).reshape(-1)
            waveform = torch.from_numpy(pcm).unsqueeze(0)
            output = pipeline({"waveform": waveform, "sample_rate": sample_rate})
            annotation = getattr(output, "exclusive_speaker_diarization", None)
            if annotation is None:
                annotation = getattr(output, "speaker_diarization", output)

            rows: list[SpeakerSegment] = []
            speakers: set[str] = set()
            turn_count = 0
            for turn, _, speaker in annotation.itertracks(yield_label=True):
                turn_count += 1
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
                if turn_count == 1 or turn_count % 10 == 0:
                    speech_log(
                        "diarization.progress",
                        started=started,
                        turns=turn_count,
                        speakers=len(speakers),
                        last_turn_end_s=float(turn.end),
                    )

            result = DiarizationResult(
                provider_id=self.provider_id,
                speakers=tuple(sorted(speakers)),
                segments=tuple(rows),
                limitations=(
                    "Speaker labels identify diarization clusters, not verified real-world identities.",
                    "Diarization confidence is not supplied by this provider adapter; segment confidence remains null.",
                    "Diarization quality is recording- and task-dependent and requires evaluation on VoxVector target conditions.",
                ),
            )
            speech_log(
                "diarization.completed",
                started=started,
                speakers=len(result.speakers),
                turns=len(result.segments),
            )
            return result
        except Exception as exc:
            speech_log(
                "diarization.failed",
                started=started,
                error_type=type(exc).__name__,
                error_message=str(exc),
            )
            raise
