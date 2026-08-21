from __future__ import annotations

from dataclasses import asdict
from hashlib import sha256
import json
from typing import Any

from .schemas import Observation

def observation_id(observation: Observation) -> str:
    payload = json.dumps(asdict(observation), sort_keys=True, separators=(",", ":"), default=str)
    return sha256(payload.encode("utf-8")).hexdigest()[:16]

def make_observation(*, method_id: str, feature: str, value: float | None, unit: str, segment: tuple[float, float], quality: float, provenance: dict[str, Any] | None = None) -> Observation:
    if not method_id or not feature or not unit:
        raise ValueError("method_id, feature, and unit are required")
    if len(segment) != 2 or segment[0] < 0 or segment[1] <= segment[0]:
        raise ValueError("segment must be a positive time interval")
    if not 0.0 <= quality <= 1.0:
        raise ValueError("quality must be between 0 and 1")
    return Observation(method_id, feature, None if value is None else float(value), unit, (float(segment[0]), float(segment[1])), float(quality), dict(provenance or {}))

def observations_from_series(*, method_id: str, feature: str, values: list[float | None], unit: str, hop_seconds: float, quality: float, provenance: dict[str, Any] | None = None) -> tuple[Observation, ...]:
    if hop_seconds <= 0:
        raise ValueError("hop_seconds must be positive")
    return tuple(make_observation(method_id=method_id, feature=feature, value=value, unit=unit, segment=(i * hop_seconds, (i + 1) * hop_seconds), quality=quality, provenance=provenance) for i, value in enumerate(values))
