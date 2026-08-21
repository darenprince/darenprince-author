from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Literal

EligibilityStatus = Literal["eligible", "degraded", "ineligible"]
CandidateState = Literal["consistent", "inconsistent", "indeterminate"]
Disposition = Literal["supported", "not_supported", "insufficient_evidence", "abstain"]

@dataclass(frozen=True)
class Observation:
    method_id: str
    feature: str
    value: float | None
    unit: str
    segment: tuple[float, float]
    quality: float
    provenance: dict[str, Any] = field(default_factory=dict)

@dataclass(frozen=True)
class Evidence:
    observation_ids: tuple[str, ...]
    direction: Literal["supports", "contradicts", "neutral"]
    strength: float
    confidence: float
    alternative_explanations: tuple[str, ...] = ()

@dataclass(frozen=True)
class Eligibility:
    status: EligibilityStatus
    reasons: tuple[str, ...] = ()
    quality_metrics: dict[str, float] = field(default_factory=dict)

@dataclass(frozen=True)
class AnalysisResult:
    run_id: str
    schema_version: str
    eligibility: Eligibility
    observations: tuple[Observation, ...]
    evidence: tuple[Evidence, ...]
    candidate: CandidateState
    disposition: Disposition
    limitations: tuple[str, ...]
    provenance: dict[str, Any]
