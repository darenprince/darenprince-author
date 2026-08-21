from __future__ import annotations
from dataclasses import dataclass
from hashlib import sha256
import json
from typing import Iterable
from .schemas import Evidence, Observation

@dataclass(frozen=True)
class EvidenceGroup:
    feature: str
    observations: tuple[Observation, ...]
    quality_mean: float
    coverage: int

def group_observations(observations: Iterable[Observation]) -> tuple[EvidenceGroup, ...]:
    groups: dict[str, list[Observation]] = {}
    for observation in observations:
        groups.setdefault(observation.feature, []).append(observation)
    return tuple(EvidenceGroup(f, tuple(items), sum(x.quality for x in items) / len(items), len(items)) for f, items in sorted(groups.items()))

def _observation_id(observation: Observation) -> str:
    payload = json.dumps({"method_id": observation.method_id, "feature": observation.feature, "value": observation.value, "unit": observation.unit, "segment": observation.segment, "quality": observation.quality, "provenance": observation.provenance}, sort_keys=True, separators=(",", ":"), default=str)
    return sha256(payload.encode("utf-8")).hexdigest()[:16]

def observations_to_evidence(observations: Iterable[Observation], minimum_quality: float = 0.5) -> tuple[Evidence, ...]:
    """Create neutral evidence records without assigning deception meaning."""
    if not 0.0 <= minimum_quality <= 1.0:
        raise ValueError("minimum_quality must be between 0 and 1")
    result: list[Evidence] = []
    for group in group_observations(observations):
        usable = tuple(x for x in group.observations if x.quality >= minimum_quality and x.value is not None)
        if usable:
            result.append(Evidence(observation_ids=tuple(_observation_id(x) for x in usable), direction="neutral", strength=group.quality_mean, confidence=group.quality_mean, alternative_explanations=("observational feature; no causal or deception interpretation assigned",)))
    return tuple(result)
