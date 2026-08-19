from __future__ import annotations

import numpy as np


def _finite(values: np.ndarray) -> np.ndarray:
    values = np.asarray(values, dtype=float).reshape(-1)
    return values[np.isfinite(values)]


def contour_dynamics(values: np.ndarray, times_s: np.ndarray | None = None) -> dict[str, float]:
    values = np.asarray(values, dtype=float).reshape(-1)
    finite_mask = np.isfinite(values)
    clean = values[finite_mask]
    if clean.size == 0:
        return {"mean": np.nan, "median": np.nan, "std": np.nan, "range": np.nan, "p10": np.nan, "p90": np.nan, "slope": np.nan}
    result = {"mean": float(np.mean(clean)), "median": float(np.median(clean)), "std": float(np.std(clean)), "range": float(np.ptp(clean)), "p10": float(np.percentile(clean, 10)), "p90": float(np.percentile(clean, 90)), "slope": np.nan}
    x = np.arange(values.size, dtype=float) if times_s is None else np.asarray(times_s, dtype=float).reshape(-1)
    if x.size != values.size:
        raise ValueError("times_s must match values length")
    mask = finite_mask & np.isfinite(x)
    if np.count_nonzero(mask) >= 2:
        xv, yv = x[mask], values[mask]
        if np.ptp(xv) > 0:
            result["slope"] = float(np.polyfit(xv, yv, 1)[0])
    return result


def contour_delta(values: np.ndarray) -> float:
    clean = _finite(values)
    return np.nan if clean.size < 2 else float(clean[-1] - clean[0])


def intensity_dynamics(intensity_db: np.ndarray, times_s: np.ndarray | None = None) -> dict[str, float]:
    return contour_dynamics(intensity_db, times_s)


def f0_dynamics(f0_hz: np.ndarray, times_s: np.ndarray | None = None) -> dict[str, float]:
    return contour_dynamics(f0_hz, times_s)
