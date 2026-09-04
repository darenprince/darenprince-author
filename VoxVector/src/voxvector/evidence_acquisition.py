from __future__ import annotations

import time
from dataclasses import asdict, dataclass
from hashlib import sha256
from typing import Any, Protocol

import numpy as np

from .speech_segmentation import SpeechSegment as DetectedSpeechSegment
from .speech_segmentation import segment_speech
from .runtime_memory import measured_phase


@dataclass(frozen=True)
class MediaProfile:
    duration_seconds: float
    sample_rate: int
    channels: str
    sample_count: int
    peak_abs: float
    clipping_ratio: float
    rms: float | None
    silence_ratio: float | None
    sha256: str


@dataclass(frozen=True)
class TimelineSegment:
    kind: str
    start_s: float
    end_s: float
    confidence: float | None = None
    method_id: str | None = None


@dataclass(frozen=True)
class SpeechTimeline:
    speech: tuple[TimelineSegment, ...]
    silence: tuple[TimelineSegment, ...]
    method_id: str


@dataclass(frozen=True)
class SpeakerSegment:
    speaker_id: str
    start_s: float
    end_s: float
    confidence: float | None = None


@dataclass(frozen=True)
class DiarizationResult:
    provider_id: str
    speakers: tuple[str, ...]
    segments: tuple[SpeakerSegment, ...]
    limitations: tuple[str, ...] = ()


class DiarizationProvider(Protocol):
    provider_id: str

    def diarize(self, signal: np.ndarray, sample_rate: int) -> DiarizationResult: ...


@dataclass(frozen=True)
class TranscriptWord:
    text: str
    start_s: float | None
    end_s: float | None
    confidence: float | None = None
    speaker_id: str | None = None


@dataclass(frozen=True)
class TranscriptSegment:
    start_s: float | None
    end_s: float | None
    text: str
    confidence: float | None = None
    speaker_id: str | None = None


@dataclass(frozen=True)
class TranscriptResult:
    provider_id: str
    language: str | None
    text: str
    segments: tuple[TranscriptSegment, ...]
    words: tuple[TranscriptWord, ...]
    limitations: tuple[str, ...] = ()


class TranscriptionProvider(Protocol):
    provider_id: str

    def transcribe(self, signal: np.ndarray, sample_rate: int) -> TranscriptResult: ...


@dataclass(frozen=True)
class EvidenceAcquisitionResult:
    media_profile: MediaProfile
    speech_timeline: SpeechTimeline
    transcript: TranscriptResult | None
    diarization: DiarizationResult | None
    transcription_state: str
    diarization_state: str
    multimodal_timeline: dict[str, Any] | None = None
    limitations: tuple[str, ...] = ()
    provider_timings_ms: dict[str, float] | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def _speech_from_frames(
    signal: np.ndarray,
    sample_rate: int,
    *,
    frame_size: int,
    hop_size: int,
    chunk_frames: int = 256,
) -> tuple[DetectedSpeechSegment, ...]:
    """Compute frame RMS in bounded windows without materializing the full frame matrix."""
    signal = np.asarray(signal, dtype=np.float32).reshape(-1)
    if signal.size < frame_size:
        return ()
    frame_count = 1 + (signal.size - frame_size) // hop_size
    starts = np.arange(0, signal.size - frame_size + 1, hop_size, dtype=int)
    rms_parts: list[np.ndarray] = []
    for first in range(0, frame_count, chunk_frames):
        chunk_starts = starts[first : first + chunk_frames]
        frames = np.stack([signal[start : start + frame_size] for start in chunk_starts])
        rms_parts.append(np.sqrt(np.mean(np.square(frames), axis=1, dtype=np.float32)))
    rms_values = np.concatenate(rms_parts) if len(rms_parts) > 1 else rms_parts[0]
    positive = rms_values[np.isfinite(rms_values) & (rms_values > 0)]
    if positive.size == 0:
        return ()
    threshold = max(
        float(np.percentile(positive, 20)),
        float(np.percentile(positive, 75)) * 0.18,
    )
    voiced = np.isfinite(rms_values) & (rms_values >= threshold)
    return segment_speech(rms_values, voiced, hop_size / sample_rate)


def _release_provider(provider: Any) -> str | None:
    release = getattr(provider, "release", None)
    if not callable(release):
        return None
    try:
        release()
        return None
    except Exception as exc:
        return f"Provider {getattr(provider, 'provider_id', 'unknown')} release failed: {type(exc).__name__}."


def _run_provider_phase(
    phase: str,
    provider: Any,
    method_name: str,
    signal: np.ndarray,
    sample_rate: int,
    limitations: list[str],
) -> tuple[Any | None, str, float]:
    provider_id = getattr(provider, "provider_id", "unknown")
    started = time.perf_counter()
    result = None
    state = "unavailable"
    release_error: str | None = None
    try:
        with measured_phase(f"{phase}:{provider_id}"):
            try:
                result = getattr(provider, method_name)(signal, sample_rate)
                state = "completed"
            except Exception as exc:
                limitations.append(f"{phase.capitalize()} provider {provider_id} unavailable: {type(exc).__name__}.")
            finally:
                release_error = _release_provider(provider)
    finally:
        duration_ms = (time.perf_counter() - started) * 1000.0
    if release_error:
        limitations.append(release_error)
    return result, state, duration_ms


def build_evidence_acquisition(
    signal: np.ndarray,
    sample_rate: int,
    *,
    transcript_provider: TranscriptionProvider | None = None,
    diarization_provider: DiarizationProvider | None = None,
) -> EvidenceAcquisitionResult:
    """Build normalized source evidence and invoke providers only when explicitly supplied."""
    signal = np.asarray(signal, dtype=np.float32).reshape(-1)
    if sample_rate <= 0:
        raise ValueError("sample_rate must be positive")
    if signal.size and not np.all(np.isfinite(signal)):
        raise ValueError("signal contains non-finite samples")

    duration = signal.size / sample_rate
    peak = float(np.max(np.abs(signal))) if signal.size else 0.0
    clipping_ratio = float(np.mean(np.abs(signal) >= 0.999)) if signal.size else 0.0
    rms_value = float(np.sqrt(np.mean(np.square(signal, dtype=np.float32), dtype=np.float32))) if signal.size else None

    frame_size = max(1, int(sample_rate * 0.025))
    hop_size = max(1, int(sample_rate * 0.010))
    detected = _speech_from_frames(signal, sample_rate, frame_size=frame_size, hop_size=hop_size)

    speech = tuple(
        TimelineSegment(
            kind="speech",
            start_s=item.start_s,
            end_s=min(duration, item.end_s + frame_size / sample_rate),
            confidence=item.confidence,
            method_id="evidence_acquisition.energy_activity",
        )
        for item in detected
    )
    silence: list[TimelineSegment] = []
    cursor = 0.0
    for item in speech:
        if item.start_s > cursor:
            silence.append(TimelineSegment("silence", cursor, item.start_s))
        cursor = max(cursor, item.end_s)
    if cursor < duration:
        silence.append(TimelineSegment("silence", cursor, duration))

    silence_duration = sum(max(0.0, item.end_s - item.start_s) for item in silence)
    profile = MediaProfile(
        duration_seconds=duration,
        sample_rate=sample_rate,
        channels="mixed_to_mono",
        sample_count=int(signal.size),
        peak_abs=peak,
        clipping_ratio=clipping_ratio,
        rms=rms_value,
        silence_ratio=(silence_duration / duration) if duration > 0 else None,
        sha256=sha256(signal.tobytes()).hexdigest(),
    )

    transcript = None
    transcription_state = "not_invoked"
    diarization = None
    diarization_state = "not_invoked"
    limitations: list[str] = []
    provider_timings_ms: dict[str, float] = {}

    if transcript_provider is not None:
        transcript, transcription_state, provider_timings_ms["transcription"] = _run_provider_phase(
            "transcription", transcript_provider, "transcribe", signal, sample_rate, limitations
        )

    if diarization_provider is not None:
        diarization, diarization_state, provider_timings_ms["diarization"] = _run_provider_phase(
            "diarization", diarization_provider, "diarize", signal, sample_rate, limitations
        )

    multimodal_timeline = None
    if transcript is not None:
        from .alignment import align_transcript_to_speakers
        multimodal_timeline = asdict(align_transcript_to_speakers(transcript, diarization))

    return EvidenceAcquisitionResult(
        media_profile=profile,
        speech_timeline=SpeechTimeline(speech=speech, silence=tuple(silence), method_id="evidence_acquisition.energy_activity"),
        transcript=transcript,
        diarization=diarization,
        transcription_state=transcription_state,
        diarization_state=diarization_state,
        multimodal_timeline=multimodal_timeline,
        limitations=tuple(limitations),
        provider_timings_ms=provider_timings_ms,
    )
