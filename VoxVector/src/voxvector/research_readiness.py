from __future__ import annotations

from dataclasses import dataclass
from typing import Mapping


REQUIRED_GATE_KEYS = (
    "operational_task_defined",
    "label_protocol_frozen",
    "speaker_disjoint_partitions",
    "calibration_separate_from_test",
    "final_evaluation_frozen",
    "leakage_audit_complete",
    "uncertainty_reporting_defined",
    "external_or_cross_dataset_evaluation",
)


@dataclass(frozen=True)
class ResearchReadiness:
    """Software gate for whether an inferential candidate may leave guarded state."""

    ready: bool
    passed: tuple[str, ...]
    missing: tuple[str, ...]
    rationale: tuple[str, ...]


def assess_research_readiness(checks: Mapping[str, bool | None]) -> ResearchReadiness:
    """Evaluate the engineering/validation prerequisites without producing inference."""
    normalized = {key: bool(checks.get(key, False)) for key in REQUIRED_GATE_KEYS}
    passed = tuple(key for key in REQUIRED_GATE_KEYS if normalized[key])
    missing = tuple(key for key in REQUIRED_GATE_KEYS if not normalized[key])
    rationale = (
        "Inferential output remains guarded until every required validation gate is explicitly satisfied.",
        "Provider execution, software QA, or model configuration alone cannot satisfy the validation gate.",
    )
    return ResearchReadiness(
        ready=not missing,
        passed=passed,
        missing=missing,
        rationale=rationale,
    )
