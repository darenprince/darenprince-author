from __future__ import annotations

import io
import multiprocessing as mp
import os
import tempfile
import time
import wave
from functools import lru_cache
from pathlib import Path
from typing import Any

import numpy as np

from .evidence_acquisition import TranscriptResult, TranscriptSegment, TranscriptWord
from .runtime_context import analysis_run_id as current_analysis_run_id
from .runtime_context import new_request_id, request_id as current_request_id
from .runtime_context import set_analysis_run_id, set_trace_id, trace_id as current_trace_id
from .speech_runtime_logging import speech_log


class FasterWhisperProvider:
    """Provider adapter for bounded local faster-whisper inference."""

    provider_id = "faster_whisper"

    def __init__(
        self,
        *,
        model_size: str | None = None,
        device: str | None = None,
        compute_type: str | None = None,
        language: str | None = None,
        beam_size: int | None = None,
        cpu_threads: int | None = None,
        num_workers: int | None = None,
        timeout_seconds: float | None = None,
        isolate_process: bool | None = None,
    ) -> None:
        self.model_size = model_size or os.getenv("VOXVECTOR_WHISPER_MODEL", "base")
        self.device = device or os.getenv("VOXVECTOR_WHISPER_DEVICE", "cpu")
        self.compute_type = compute_type or os.getenv("VOXVECTOR_WHISPER_COMPUTE_TYPE", "int8")
        self.language = language or os.getenv("VOXVECTOR_WHISPER_LANGUAGE") or None
        self.beam_size = int(beam_size or os.getenv("VOXVECTOR_WHISPER_BEAM_SIZE", "1"))
        self.cpu_threads = max(1, int(cpu_threads or os.getenv("VOXVECTOR_WHISPER_CPU_THREADS", "1")))
        self.num_workers = max(1, int(num_workers or os.getenv("VOXVECTOR_WHISPER_NUM_WORKERS", "1")))
        self.timeout_seconds = max(
            1.0,
            float(timeout_seconds or os.getenv("VOXVECTOR_WHISPER_TIMEOUT_SECONDS", "165")),
        )
        if isolate_process is None:
            isolate_process = os.getenv("VOXVECTOR_WHISPER_ISOLATED_PROCESS", "true").strip().lower() in {
                "1",
                "true",
                "yes",
                "on",
            }
        self.isolate_process = bool(isolate_process)

    @staticmethod
    def _wav_bytes(signal: np.ndarray, sample_rate: int) -> io.BytesIO:
        pcm = np.clip(np.asarray(signal, dtype=np.float32).reshape(-1), -1.0, 1.0)
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
    @lru_cache(maxsize=1)
    def _model(
        model_size: str,
        device: str,
        compute_type: str,
        cpu_threads: int,
        num_workers: int,
    ):
        try:
            from faster_whisper import WhisperModel
        except ImportError as exc:
            raise RuntimeError(
                "faster-whisper is not installed; enable the VoxVector speech runtime"
            ) from exc
        speech_log(
            "transcription.model_loaded",
            model_size=model_size,
            device=device,
            compute_type=compute_type,
            cpu_threads=cpu_threads,
            num_workers=num_workers,
        )
        return WhisperModel(
            model_size,
            device=device,
            compute_type=compute_type,
            cpu_threads=cpu_threads,
            num_workers=num_workers,
        )

    @classmethod
    def release_models(cls) -> None:
        cls._model.cache_clear()

    def release(self) -> None:
        self.release_models()

    def _transcribe_source(
        self,
        source: str | io.BytesIO,
        *,
        audio_duration_seconds: float,
        started: float,
    ) -> TranscriptResult:
        model = None
        try:
            model = self._model(
                self.model_size,
                self.device,
                self.compute_type,
                self.cpu_threads,
                self.num_workers,
            )
            segments, info = model.transcribe(
                source,
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
                            confidence=float(np.clip(float(probability), 0.0, 1.0))
                            if probability is not None
                            else None,
                        )
                    )
                if segment_count == 1 or segment_count % 10 == 0:
                    speech_log(
                        "transcription.progress",
                        started=started,
                        segments=segment_count,
                        words=len(normalized_words),
                        last_segment_end_s=float(end) if end is not None else None,
                        audio_duration_seconds=round(audio_duration_seconds, 3),
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
        finally:
            del model

    def _isolated_config(self, audio_duration_seconds: float) -> dict[str, Any]:
        return {
            "model_size": self.model_size,
            "device": self.device,
            "compute_type": self.compute_type,
            "language": self.language,
            "beam_size": self.beam_size,
            "cpu_threads": self.cpu_threads,
            "num_workers": self.num_workers,
            "timeout_seconds": self.timeout_seconds,
            "audio_duration_seconds": audio_duration_seconds,
            "request_id": current_request_id(),
            "trace_id": current_trace_id(),
            "analysis_run_id": current_analysis_run_id(),
        }

    def _transcribe_isolated(
        self,
        signal: np.ndarray,
        sample_rate: int,
        *,
        started: float,
    ) -> TranscriptResult:
        stream = self._wav_bytes(signal, sample_rate)
        temp_path: str | None = None
        parent_conn = None
        process = None
        try:
            with tempfile.NamedTemporaryFile(prefix="voxvector-transcribe-", suffix=".wav", delete=False) as handle:
                handle.write(stream.getbuffer())
                temp_path = handle.name

            context = mp.get_context("spawn")
            parent_conn, child_conn = context.Pipe(duplex=False)
            process = context.Process(
                target=_isolated_transcription_worker,
                args=(self._isolated_config(signal.size / sample_rate), temp_path, child_conn),
                name="voxvector-faster-whisper",
            )
            process.start()
            child_conn.close()
            process.join(self.timeout_seconds)
            if process.is_alive():
                process.terminate()
                process.join(5.0)
                if process.is_alive():
                    process.kill()
                    process.join(2.0)
                raise TimeoutError(
                    f"faster-whisper exceeded the {self.timeout_seconds:.0f}s process deadline"
                )

            if parent_conn.poll(1.0):
                state, payload = parent_conn.recv()
                if state == "ok" and isinstance(payload, TranscriptResult):
                    return payload
                if state == "error" and isinstance(payload, dict):
                    raise RuntimeError(
                        f"isolated faster-whisper failed: {payload.get('error_type', 'RuntimeError')}: "
                        f"{payload.get('error_message', 'unknown worker error')}"
                    )
            raise RuntimeError(
                f"isolated faster-whisper exited without a result (exit_code={process.exitcode})"
            )
        finally:
            stream.close()
            if parent_conn is not None:
                parent_conn.close()
            if process is not None and process.is_alive():
                process.terminate()
                process.join(2.0)
            if temp_path:
                try:
                    Path(temp_path).unlink(missing_ok=True)
                except OSError:
                    pass

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
            beam_size=self.beam_size,
            cpu_threads=self.cpu_threads,
            num_workers=self.num_workers,
            isolated_process=self.isolate_process,
            process_timeout_seconds=self.timeout_seconds,
            audio_duration_seconds=round(signal.size / sample_rate, 3),
        )
        try:
            if self.isolate_process:
                return self._transcribe_isolated(signal, sample_rate, started=started)

            stream = self._wav_bytes(signal, sample_rate)
            try:
                return self._transcribe_source(
                    stream,
                    audio_duration_seconds=signal.size / sample_rate,
                    started=started,
                )
            finally:
                stream.close()
        except Exception as exc:
            speech_log(
                "transcription.failed",
                started=started,
                error_type=type(exc).__name__,
                error_message=str(exc),
            )
            raise


def _isolated_transcription_worker(config: dict[str, Any], wav_path: str, connection) -> None:
    """Execute faster-whisper in a disposable process so timeout/OOM state is isolated."""
    try:
        new_request_id(config.get("request_id"))
        set_trace_id(config.get("trace_id"))
        set_analysis_run_id(config.get("analysis_run_id"))
        started = time.perf_counter()
        provider = FasterWhisperProvider(
            model_size=str(config["model_size"]),
            device=str(config["device"]),
            compute_type=str(config["compute_type"]),
            language=config.get("language"),
            beam_size=int(config["beam_size"]),
            cpu_threads=int(config["cpu_threads"]),
            num_workers=int(config["num_workers"]),
            timeout_seconds=float(config["timeout_seconds"]),
            isolate_process=False,
        )
        result = provider._transcribe_source(
            wav_path,
            audio_duration_seconds=float(config["audio_duration_seconds"]),
            started=started,
        )
        connection.send(("ok", result))
    except BaseException as exc:
        try:
            connection.send(
                (
                    "error",
                    {
                        "error_type": type(exc).__name__,
                        "error_message": str(exc)[:1200],
                    },
                )
            )
        except (BrokenPipeError, EOFError, OSError):
            pass
    finally:
        try:
            FasterWhisperProvider.release_models()
        finally:
            connection.close()
