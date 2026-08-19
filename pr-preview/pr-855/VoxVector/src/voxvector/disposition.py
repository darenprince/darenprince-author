from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

Disposition = Literal["supported", "not_supported", "insufficient_evidence", "abstain"]

@dataclass(frozen=True)
class DispositionAssessment:
    disposition: Disposition
    reasons: tuple[str, ...]
    authorized: bool


def determine_disposition(*, reliability_status: str, candidate_state: str, classifier_validated: bool, evidence_validated: bool) -> DispositionAssessment:
    if reliability_status != "eligible":
        return DispositionAssessment("abstain", ("reliability_gate_not_fully_eligible",), True)
    if not classifier_validated:
        return DispositionAssessment("insufficient_evidence", ("candidate_classifier_not_validated",), True)
    if not evidence_validated:
        return DispositionAssessment("insufficient_evidence", ("evidence_validation_not_complete",), True)
    if candidate_state not in {"consistent", "inconsistent"}:
        return DispositionAssessment("insufficient_evidence", ("candidate_state_indeterminate",), True)
    return DispositionAssessment("insufficient_evidence", ("no_validated_disposition_rule_enabled",), True)
