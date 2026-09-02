from __future__ import annotations

import io
import os
import time
import wave
from functools import lru_cache

import numpy as np

from .evidence_acquisition import TranscriptResult, TranscriptSegment, TranscriptWord
from .speech_runtime_logging import speech_log


class FasterWhisperProvider:
    """Provider adapter for local faster-whisper inference."""

    provider_id = "faster_whisper"

    def __init__(
        self,
        *,
        model_size: str | None = None,
        device: str | None = None,
        compute_type: str | None = None,
        language: str | None = None,
        beam_size: int | None = None,
    ) -> None:
        self.model_size = model_size or os.getenv("VOXVECTOR_WHISPER_MODEL", "small")
        self.device = device or os.getenv("VOXVECTOR_WHISPER_DEVICE", "cpu")
        self.compute_type = compute_type or os.getenv("VOXVECTOR_WHISPER_COMPUTE_TYPE", "int8")
        self.language = language or os.getenv("VOXVECTOR_WHISPER_LANGUAGE") or None
        self.beam_size = int(beam_size or os.getenv("VOXVECTOR_WHISPER_BEAM_SIZE", "5"))

    @staticmethod
    def _wav_bytes(signal: np.ndarray, sample_rate: int) -> io.BytesIO:
        pcm = np.clip(np.asarray(signal, dtype=np.float32), -1.0, 1.0)
        pcm16 = (pcm * 32767.0).astype("<i2", copy=False)
        stream = io.BytesIO()
        with wave.open(stream, "wb") as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(sample_rate)
            wav.writeframes(pcm16.tobytes())
        stream.seek(0)
        return stream

    @staticmethod
    @lru_cache(maxsize=4)
    def _model(model_size: str, device: str, compute_type: str):
        try:
            from faster_whisper import WhisperModel
        except ImportError as exc:
            raise RuntimeError(
                "faster-whisper is not installed; enable the VoxVector speech runtime"
            ) from exc
        speech_log("transcription.model_loaded", model_size=model_size, device=device, compute_type=compute_type)
        return WhisperModel(model_size, device=device, compute_type=compute_type)

    @classmethod
    def release_models(cls) -> None:
        """Release cached Whisper model references between heavy provider phases."""
        cls._model.cache_clear()

    def release(self) -> None:
        self.release_models()

    def transcribe(self, signal: np.ndarray, sample_rate: int) -> TranscriptResult:
        if sample_rate <= 0:
            raise ValueError("sample_rate must be positive")
        if signal.size == 0:
            return TranscriptResult(
                provider_id=self.provider_id,
                language=None,
                text="",
                segments=(),
                words=(),
                limitations=("Input audio is empty.",),
            )

        started = time.perf_counter()
        speech_log(
            "transcription.started",
            started=started,
            model_size=self.model_size,
            device=self.device,
            compute_type=self.compute_type,
            audio_duration_seconds=round(signal.size / sample_rate, 3),
        )
        try:
            stream = self._wav_bytes(signal, sample_rate)
            model = self._model(self.model_size, self.device, self.compute_type)
            segments, info = model.transcribe(
                stream,
                language=self.language,
                beam_size=self.beam_size,
                word_timestamps=True,
                vad_filter=True,
            )

            normalized_segments: list[TranscriptSegment] = []
            normalized_words: list[TranscriptWord] = []
            text_parts: list[str] = []
            segment_count = 0
            for segment in segments:
                segment_count += 1
                segment_text = str(getattr(segment, "text", "") or "").strip()
                start = getattr(segment, "start", None)
                end = getattr(segment, "end", None)
                normalized_segments.append(
                    TranscriptSegment(
                        start_s=float(start) if start is not None else None,
                        end_s=float(end) if end is not None else None,
                        text=segment_text,
                        confidence=None,
                    )
                )
                if segment_text:
                    text_parts.append(segment_text)
                for word in getattr(segment, "words", ()) or ():
                    word_text = str(getattr(word, "word", "") or "").strip()
                    if not word_text:
                        continue
                    word_start = getattr(word, "start", None)
                    word_end = getattr(word, "end", None)
                    probability = getattr(word, "probability", None)
                    normalized_words.append(
                        TranscriptWord(
                            text=word_text,
                            start_s=float(word_start) if word_start is not None else None,
                            end_s=float(word_end) if word_end is not None else None,
                            confidence=float(np.clip(float(probability), 0.0, 1.0)) if probability is not None else None,
                        )
                    )
                if segment_count == 1 or segment_count % 10 == 0:
                    speech_log(
                        "transcription.progress",
                        started=started,
                        segments=segment_count,
                        words=len(normalized_words),
                        last_segment_end_s=float(end) if end is not None else None,
                    )

            result = TranscriptResult(
                provider_id=self.provider_id,
                language=getattr(info, "language", None),
                text=" ".join(text_parts),
                segments=tuple(normalized_segments),
                words=tuple(normalized_words),
                limitations=(
                    "Transcription output is model-generated and requires provider/task-specific quality evaluation before inferential use.",
                ),
            )
            speech_log(
                "transcription.completed",
                started=started,
                segments=len(result.segments),
                words=len(result.words),
                language=result.language,
            )
            return result
        except Exception as exc:
            speech_log(
                "transcription.failed",
                started=started,
                error_type=type(exc).__name__,
                error_message=str(exc),
            )
            raise
