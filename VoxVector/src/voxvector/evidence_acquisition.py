from __future__ import annotations

from dataclasses import asdict, dataclass
from hashlib import sha256
from typing import Any, Protocol

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
    positive = rms_values[np.isfinite(rms_values) & (rms_values > 0)]
    if positive.size == 0:
        return ()
    threshold = max(
        float(np.percentile(positive, 20)),
        float(np.percentile(positive, 75)) * 0.18,
    )
    voiced = np.isfinite(rms_values) & (rms_values >= threshold)
    return segment_speech(rms_values, voiced, hop_size / sample_rate)


def build_evidence_acquisition(
    signal: np.ndarray,
    sample_rate: int,
    *,
    transcript_provider: TranscriptionProvider | None = None,
    diarization_provider: DiarizationProvider | None = None,
) -> EvidenceAcquisitionResult:
    """Build normalized source evidence and optionally invoke configured providers.

    Providers are selected lazily from environment configuration when callers do
    not supply explicit provider instances. Provider failures are represented as
    unavailable acquisition states so an optional speech runtime cannot take down
    the base case-analysis path.
    """
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

    if transcript_provider is None and diarization_provider is None:
        from .speech_providers import get_diarization_provider, get_transcription_provider

        transcript_provider = get_transcription_provider()
        diarization_provider = get_diarization_provider()

    transcript = None
    transcription_state = "not_configured"
    limitations: list[str] = []
    if transcript_provider is not None:
        try:
            transcript = transcript_provider.transcribe(signal, sample_rate)
            transcription_state = "completed"
        except Exception as exc:
            transcription_state = "unavailable"
            limitations.append(
                f"Transcription provider {getattr(transcript_provider, 'provider_id', 'unknown')} unavailable: {type(exc).__name__}."
            )

    diarization = None
    diarization_state = "not_configured"
    if diarization_provider is not None:
        try:
            diarization = diarization_provider.diarize(signal, sample_rate)
            diarization_state = "completed"
        except Exception as exc:
            diarization_state = "unavailable"
            limitations.append(
                f"Diarization provider {getattr(diarization_provider, 'provider_id', 'unknown')} unavailable: {type(exc).__name__}."
            )

    multimodal_timeline = None
    if transcript is not None:
        from .alignment import align_transcript_to_speakers

        multimodal_timeline = asdict(
            align_transcript_to_speakers(transcript, diarization)
        )

    return EvidenceAcquisitionResult(
        media_profile=profile,
        speech_timeline=SpeechTimeline(
            speech=speech,
            silence=tuple(silence),
            method_id="evidence_acquisition.energy_activity",
        ),
        transcript=transcript,
        diarization=diarization,
        transcription_state=transcription_state,
        diarization_state=diarization_state,
        multimodal_timeline=multimodal_timeline,
        limitations=tuple(limitations),
    )
