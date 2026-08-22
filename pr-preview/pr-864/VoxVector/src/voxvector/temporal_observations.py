from __future__ import annotations

import numpy as np

from .observations import make_observation
from .schemas import Observation
from .temporal import pause_durations, voiced_fraction

def extract_temporal_observations(energy: np.ndarray, voiced: np.ndarray, hop_seconds: float, quality: float) -> tuple[Observation, ...]:
    energy = np.asarray(energy, dtype=float).reshape(-1)
    voiced = np.asarray(voiced, dtype=bool).reshape(-1)
    if energy.size != voiced.size:
        raise ValueError("energy and voiced arrays must have equal length")
    if hop_seconds <= 0:
        raise ValueError("hop_seconds must be positive")
    duration = energy.size * hop_seconds
    pauses = pause_durations(energy, hop_seconds)
    return (
        make_observation(method_id="temporal.voiced_fraction", feature="voiced_fraction", value=voiced_fraction(voiced), unit="ratio", segment=(0.0, duration), quality=quality),
        make_observation(method_id="temporal.pause_count", feature="pause_count", value=float(pauses.size), unit="count", segment=(0.0, duration), quality=quality),
        make_observation(method_id="temporal.pause_duration_mean", feature="pause_duration_mean", value=float(np.mean(pauses)) if pauses.size else None, unit="seconds", segment=(0.0, duration), quality=quality),
        make_observation(method_id="temporal.pause_duration_total", feature="pause_duration_total", value=float(np.sum(pauses)) if pauses.size else 0.0, unit="seconds", segment=(0.0, duration), quality=quality),
    )
