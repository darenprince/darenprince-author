from __future__ import annotations

import numpy as np


def robust_baseline(values: np.ndarray) -> dict[str, float]:
    """Summarize an independently collected speaker baseline."""
    x = np.asarray(values, dtype=float).reshape(-1)
    x = x[np.isfinite(x)]
    if x.size == 0:
        return {"median": np.nan, "mad": np.nan, "count": 0.0}
    median = float(np.median(x))
    mad = float(np.median(np.abs(x - median)))
    return {"median": median, "mad": mad, "count": float(x.size)}


def baseline_deviation(value: float, baseline: dict[str, float], min_mad: float = 1e-9) -> float:
    if not np.isfinite(value):
        return np.nan
    median = float(baseline.get("median", np.nan))
    mad = float(baseline.get("mad", np.nan))
    if not np.isfinite(median) or not np.isfinite(mad):
        return np.nan
    scale = max(1.4826 * mad, min_mad)
    return float((value - median) / scale)
