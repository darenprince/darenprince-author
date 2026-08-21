from __future__ import annotations

import numpy as np

def zero_crossing_rate(frames: np.ndarray) -> np.ndarray:
    frames = np.asarray(frames, dtype=float)
    if frames.ndim != 2:
        raise ValueError("frames must be a 2D array")
    if frames.shape[1] < 2:
        return np.zeros(frames.shape[0], dtype=float)
    return np.mean(np.signbit(frames[:, 1:]) != np.signbit(frames[:, :-1]), axis=1)

def jitter_local(periods: np.ndarray) -> float:
    periods = np.asarray(periods, dtype=float).reshape(-1)
    periods = periods[np.isfinite(periods) & (periods > 0)]
    if periods.size < 2:
        return float("nan")
    mean_period = float(np.mean(periods))
    return float(np.mean(np.abs(np.diff(periods))) / mean_period) if mean_period > 0 else float("nan")

def shimmer_local(amplitudes: np.ndarray) -> float:
    amplitudes = np.asarray(amplitudes, dtype=float).reshape(-1)
    amplitudes = amplitudes[np.isfinite(amplitudes) & (amplitudes > 0)]
    if amplitudes.size < 2:
        return float("nan")
    mean_amplitude = float(np.mean(amplitudes))
    return float(np.mean(np.abs(np.diff(amplitudes))) / mean_amplitude) if mean_amplitude > 0 else float("nan")

def clipping_ratio(signal: np.ndarray, threshold: float = 0.999) -> float:
    signal = np.asarray(signal, dtype=float).reshape(-1)
    if threshold <= 0:
        raise ValueError("threshold must be positive")
    return float(np.mean(np.abs(signal) >= threshold)) if signal.size else 1.0

def dc_offset(signal: np.ndarray) -> float:
    signal = np.asarray(signal, dtype=float).reshape(-1)
    return float(np.mean(signal)) if signal.size else float("nan")
