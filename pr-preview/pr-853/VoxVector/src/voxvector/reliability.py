from __future__ import annotations

from dataclasses import dataclass
import numpy as np

@dataclass(frozen=True)
class ReliabilityAssessment:
    status: str
    score: float
    reasons: tuple[str, ...]

def assess_signal(signal: np.ndarray, sample_rate: int, min_duration: float = 1.0) -> ReliabilityAssessment:
    signal = np.asarray(signal, dtype=float).reshape(-1)
    reasons: list[str] = []
    if sample_rate <= 0:
        return ReliabilityAssessment("ineligible", 0.0, ("invalid_sample_rate",))
    if signal.size == 0:
        return ReliabilityAssessment("ineligible", 0.0, ("empty_audio",))
    duration = signal.size / sample_rate
    if duration < min_duration:
        reasons.append("insufficient_duration")
    clipping = float(np.mean(np.abs(signal) >= 0.999))
    if clipping > 0.01:
        reasons.append("excessive_clipping")
    finite_ratio = float(np.mean(np.isfinite(signal)))
    if finite_ratio < 1.0:
        reasons.append("non_finite_samples")
    score = max(0.0, min(1.0, finite_ratio - min(clipping * 5.0, 0.5)))
    return ReliabilityAssessment("degraded" if reasons else "eligible", score, tuple(reasons))
