from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass(frozen=True)
class SpeechSegment:
    """A contiguous speech activity interval derived from frame-level energy and voicing."""

    start_s: float
    end_s: float
    confidence: float
    method_id: str = "speech_segmentation.energy_voicing"

    @property
    def duration_s(self) -> float:
        return max(0.0, self.end_s - self.start_s)


def segment_speech(
    rms_values: np.ndarray,
    voiced: np.ndarray,
    hop_s: float,
    *,
    threshold_ratio: float = 0.18,
    min_speech_s: float = 0.12,
    min_silence_s: float = 0.18,
) -> tuple[SpeechSegment, ...]:
    """Convert frame-level energy and voicing into stable speech intervals.

    The detector uses a robust relative RMS threshold plus voicing. Short gaps
    are bridged and very short active runs are removed. This is intentionally a
    segmentation primitive rather than speaker diarization or transcription.
    """
    rms_values = np.asarray(rms_values, dtype=float).reshape(-1)
    voiced = np.asarray(voiced, dtype=bool).reshape(-1)
    if rms_values.size == 0 or voiced.size == 0 or rms_values.size != voiced.size:
        return ()
    if hop_s <= 0:
        raise ValueError("hop_s must be positive")
    finite = np.isfinite(rms_values)
    if not np.any(finite):
        return ()

    positive = rms_values[finite & (rms_values > 0)]
    if positive.size == 0:
        return ()
    floor = float(np.percentile(positive, 20))
    reference = float(np.percentile(positive, 75))
    threshold = max(floor, reference * float(threshold_ratio))
    active = finite & (rms_values >= threshold) & voiced

    max_gap = max(0, int(round(min_silence_s / hop_s)))
    if max_gap:
        starts = np.flatnonzero(active[:-1] & ~active[1:])
        ends = np.flatnonzero(~active[:-1] & active[1:]) + 1
        for end in ends:
            following = starts[starts > end]
            if following.size and following[0] - end <= max_gap:
                active[end:following[0]] = True

    min_frames = max(1, int(round(min_speech_s / hop_s)))
    padded = np.concatenate(([False], active, [False]))
    transitions = np.diff(padded.astype(np.int8))
    starts = np.flatnonzero(transitions == 1)
    ends = np.flatnonzero(transitions == -1)

    segments: list[SpeechSegment] = []
    for start, end in zip(starts, ends):
        if end - start < min_frames:
            continue
        values = rms_values[start:end]
        confidence = float(np.mean(active[start:end]))
        segments.append(
            SpeechSegment(
                start_s=float(start * hop_s),
                end_s=float(end * hop_s),
                confidence=confidence,
            )
        )
    return tuple(segments)
