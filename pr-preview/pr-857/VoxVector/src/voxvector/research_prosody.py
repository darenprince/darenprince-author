from __future__ import annotations

import numpy as np

from .spectral import spectral_flux as _canonical_spectral_flux


def contour_summary(values: np.ndarray, times: np.ndarray | None = None) -> dict[str, float | None]:
    """Compatibility wrapper; contour statistics are maintained by advanced_prosody."""
    x = np.asarray(values, dtype=float).reshape(-1)
    t = np.arange(x.size, dtype=float) if times is None else np.asarray(times, dtype=float).reshape(-1)
    if t.size != x.size:
        raise ValueError("values and times must have equal length")
    mask = np.isfinite(x) & np.isfinite(t)
    x, t = x[mask], t[mask]
    if x.size == 0:
        return {"mean": None, "range": None, "std": None, "p10": None, "p90": None, "slope": None}
    slope = None if x.size < 2 or np.ptp(t) <= 0 else float(np.polyfit(t, x, 1)[0])
    return {"mean": float(np.mean(x)), "range": float(np.ptp(x)), "std": float(np.std(x)), "p10": float(np.percentile(x, 10)), "p90": float(np.percentile(x, 90)), "slope": slope}


def spectral_flux(magnitudes: np.ndarray) -> np.ndarray:
    """Compatibility wrapper delegating to the canonical spectral implementation."""
    return _canonical_spectral_flux(magnitudes, normalize=True)
