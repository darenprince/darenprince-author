from __future__ import annotations

import numpy as np


def spectral_flux(spectra: np.ndarray, normalize: bool = True) -> np.ndarray:
    """Frame-to-frame spectral change from nonnegative magnitude spectra."""
    x = np.asarray(spectra, dtype=float)
    if x.ndim != 2:
        raise ValueError("spectra must be a 2D array")
    if np.any(~np.isfinite(x)) or np.any(x < 0):
        raise ValueError("spectra must contain finite nonnegative values")
    if x.shape[0] < 2:
        return np.empty(0, dtype=float)
    current = x[1:]
    previous = x[:-1]
    if normalize:
        current = current / np.maximum(current.sum(axis=1, keepdims=True), np.finfo(float).tiny)
        previous = previous / np.maximum(previous.sum(axis=1, keepdims=True), np.finfo(float).tiny)
    return np.sqrt(np.sum((current - previous) ** 2, axis=1))


def spectral_rolloff(spectra: np.ndarray, frequencies_hz: np.ndarray, fraction: float = 0.85) -> np.ndarray:
    x = np.asarray(spectra, dtype=float)
    f = np.asarray(frequencies_hz, dtype=float).reshape(-1)
    if x.ndim != 2 or f.size != x.shape[1]:
        raise ValueError("spectra and frequencies have incompatible shapes")
    if np.any(~np.isfinite(x)) or np.any(x < 0) or np.any(~np.isfinite(f)):
        raise ValueError("inputs must be finite; spectra must be nonnegative")
    if not 0 < fraction <= 1:
        raise ValueError("fraction must be in (0, 1]")
    cumulative = np.cumsum(x, axis=1)
    threshold = cumulative[:, -1:] * fraction
    indices = np.argmax(cumulative >= threshold, axis=1)
    return f[indices]
