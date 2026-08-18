from __future__ import annotations

import numpy as np

def autocorrelation_periods(signal: np.ndarray, sample_rate: float, min_f0: float = 60.0, max_f0: float = 400.0) -> np.ndarray:
    x = np.asarray(signal, dtype=float).reshape(-1)
    if sample_rate <= 0 or min_f0 <= 0 or max_f0 <= min_f0:
        raise ValueError("invalid sample-rate or F0 bounds")
    x = x - np.mean(x) if x.size else x
    if x.size < 3:
        return np.array([], dtype=float)
    corr = np.correlate(x, x, mode="full")[x.size - 1 :]
    if corr[0] <= 0:
        return np.array([], dtype=float)
    corr = corr / corr[0]
    min_lag = max(1, int(sample_rate / max_f0))
    max_lag = min(len(corr) - 1, int(sample_rate / min_f0))
    if max_lag <= min_lag:
        return np.array([], dtype=float)
    segment = corr[min_lag : max_lag + 1]
    peak = min_lag + int(np.argmax(segment))
    if corr[peak] <= 0.2:
        return np.array([], dtype=float)
    return np.array([peak / sample_rate], dtype=float)

def period_from_f0(f0: np.ndarray) -> np.ndarray:
    values = np.asarray(f0, dtype=float).reshape(-1)
    valid = np.isfinite(values) & (values > 0)
    return 1.0 / values[valid]
