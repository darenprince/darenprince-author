from __future__ import annotations

import numpy as np

def voiced_mask(frames: np.ndarray, f0: np.ndarray, energy: np.ndarray, energy_threshold: float = 1e-4) -> np.ndarray:
    frames = np.asarray(frames, dtype=float)
    f0 = np.asarray(f0, dtype=float).reshape(-1)
    energy = np.asarray(energy, dtype=float).reshape(-1)
    if frames.ndim != 2:
        raise ValueError("frames must be a 2D array")
    if f0.size != frames.shape[0] or energy.size != frames.shape[0]:
        raise ValueError("f0 and energy must match frame count")
    return np.isfinite(f0) & (energy > energy_threshold)

def pause_mask(energy: np.ndarray, threshold: float = 1e-4) -> np.ndarray:
    energy = np.asarray(energy, dtype=float).reshape(-1)
    if threshold < 0:
        raise ValueError("threshold must be non-negative")
    return energy <= threshold

def contiguous_runs(mask: np.ndarray) -> list[tuple[int, int]]:
    mask = np.asarray(mask, dtype=bool).reshape(-1)
    if mask.size == 0:
        return []
    padded = np.concatenate(([False], mask, [False]))
    starts = np.flatnonzero(padded[1:] & ~padded[:-1])
    ends = np.flatnonzero(~padded[1:] & padded[:-1])
    return [(int(start), int(end)) for start, end in zip(starts, ends)]

def pause_durations(energy: np.ndarray, hop_seconds: float, threshold: float = 1e-4, min_duration: float = 0.20) -> np.ndarray:
    if hop_seconds <= 0 or min_duration < 0:
        raise ValueError("hop_seconds must be positive and min_duration non-negative")
    runs = contiguous_runs(pause_mask(energy, threshold))
    durations = np.array([(end - start) * hop_seconds for start, end in runs], dtype=float)
    return durations[durations >= min_duration]

def voiced_fraction(voiced: np.ndarray) -> float:
    voiced = np.asarray(voiced, dtype=bool).reshape(-1)
    return float(np.mean(voiced)) if voiced.size else float("nan")
