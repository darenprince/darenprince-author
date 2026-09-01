from __future__ import annotations

from dataclasses import asdict, dataclass
from hashlib import sha256
from typing import Any, Protocol, Sequence

import numpy as np

from .speech_segmentation import SpeechSegment as DetectedSpeechSegment
from .speech_segmentation import segment_speech


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
    provider_state: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def _speech_from_frames(
    signal: np.ndarray,
    sample_rate: int,
    *,
    frame_size: int,
    hop_size: int,
) -> tuple[DetectedSpeechSegment, ...]:
    if signal.size < frame_size:
        return ()
    starts = np.arange(0, signal.size - frame_size + 1, hop_size, dtype=int)
    frames = np.stack([signal[start : start + frame_size] for start in starts])
    rms_values = np.sqrt(np.mean(np.square(frames), axis=1))
    # Lightweight energy activity seed. The existing canonical pipeline has a
    # stronger voicing-aware implementation; this foundation intentionally
    # labels its method separately rather than pretending equivalence.
    positive = rms_values[np.isfinite(rms_values) & (rms_values > 0)]
    if positive.size == 0:
        return ()
    threshold = max(float(np.percentile(positive, 20)), float(np.percentile(positive, 75)) * 0.18)
    voiced = np.isfinite(rms_values) & (rms_values >= threshold)
    return segment_speech(rms_values, voiced, hop_size / sample_rate)


def build_evidence_acquisition(
    signal: np.ndarray,
    sample_rate: int,
    *,
    transcript_provider: TranscriptionProvider | None = None,
) -> EvidenceAcquisitionResult:
    signal = np.asarray(signal, dtype=float).reshape(-1)
    if sample_rate <= 0:
        raise ValueError("sample_rate must be positive")
    if signal.size and not np.all(np.isfinite(signal)):
        raise ValueError("signal contains non-finite samples")

    duration = signal.size / sample_rate
    peak = float(np.max(np.abs(signal))) if signal.size else 0.0
    clipping_ratio = float(np.mean(np.abs(signal) >= 0.999)) if signal.size else 0.0
    rms_value = float(np.sqrt(np.mean(np.square(signal)))) if signal.size else None

    frame_size = max(1, int(sample_rate * 0.025))
    hop_size = max(1, int(sample_rate * 0.010))
    detected = _speech_from_frames(
        signal, sample_rate, frame_size=frame_size, hop_size=hop_size
    )

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
    provider_state = "not_configured"
    if transcript_provider is not None:
        transcript = transcript_provider.transcribe(signal, sample_rate)
        provider_state = "completed"

    return EvidenceAcquisitionResult(
        media_profile=profile,
        speech_timeline=SpeechTimeline(
            speech=speech,
            silence=tuple(silence),
            method_id="evidence_acquisition.energy_activity",
        ),
        transcript=transcript,
        provider_state=provider_state,
    )
