from __future__ import annotations

import numpy as np


def harmonic_to_noise_ratio(harmonicity: np.ndarray) -> np.ndarray:
    """Convert normalized autocorrelation harmonicity to HNR dB.

    Values outside the physically useful open interval are returned as NaN.
    This is a voice-quality observation, not a deception measure.
    """
    r = np.asarray(harmonicity, dtype=float)
    result = np.full(r.shape, np.nan, dtype=float)
    valid = np.isfinite(r) & (r > 0.0) & (r < 1.0)
    result[valid] = 10.0 * np.log10(r[valid] / (1.0 - r[valid]))
    result[np.isfinite(r) & (r >= 1.0)] = np.inf
    return result
