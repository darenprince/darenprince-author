from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Iterable


@dataclass(frozen=True)
class InferenceReadiness:
    status: str
    eligible: bool
    evidence_family_count: int
    required_evidence_families: tuple[str, ...]
    present_evidence_families: tuple[str, ...]
    missing_requirements: tuple[str, ...]
    uncertainty_requirements: tuple[str, ...]

    def to_dict(self) -> dict[str, Any]:
        return {
            "status": self.status,
            "eligible": self.eligible,
            "evidence_family_count": self.evidence_family_count,
            "required_evidence_families": list(self.required_evidence_families),
            "present_evidence_families": list(self.present_evidence_families),
            "missing_requirements": list(self.missing_requirements),
            "uncertainty_requirements": list(self.uncertainty_requirements),
        }


DEFAULT_REQUIRED_FAMILIES = (
    "acoustic",
    "prosodic_voice_quality",
    "temporal",
    "linguistic",
    "speaker",
)


def _families_from_records(records: Iterable[dict[str, Any]]) -> set[str]:
    families: set[str] = set()
    for record in records:
        method_id = str(record.get("method_id", "")).lower()
        if method_id.startswith(("acoustic.", "cepstral.", "spectral.", "formants.")):
            families.add("acoustic")
        elif method_id.startswith(("prosody.", "voice_quality.")):
            families.add("prosodic_voice_quality")
        elif method_id.startswith(("timing.",)):
            families.add("temporal")
        elif method_id.startswith(("disfluency.", "linguistic.")):
            families.add("linguistic")
        elif method_id.startswith(("speaker.", "diarization.")):
            families.add("speaker")
    return families


def assess_inference_readiness(
    *,
    eligibility_status: str,
    evidence: Iterable[dict[str, Any]],
    transcript_present: bool,
    speaker_artifact_present: bool,
    validation_status: str = "not_validated",
    calibration_status: str = "not_calibrated",
    alternative_hypotheses_present: bool = False,
    uncertainty_present: bool = False,
    required_evidence_families: tuple[str, ...] = DEFAULT_REQUIRED_FAMILIES,
) -> InferenceReadiness:
    """Evaluate whether a run is ready for a validated inferential model.

    This is a gate, not a classifier. It never computes a deception probability.
    """
    records = [item for item in evidence if isinstance(item, dict)]
    present = _families_from_records(records)
    missing: list[str] = []
    uncertainty: list[str] = []

    if eligibility_status != "eligible":
        missing.append("eligible recording and context")
    missing.extend(f"evidence family: {family}" for family in required_evidence_families if family not in present)
    if not transcript_present:
        missing.append("timestamped transcript artifact")
    if not speaker_artifact_present:
        missing.append("speaker/diarization artifact")
    if validation_status != "validated":
        missing.append("task-specific scientific validation")
    if calibration_status != "calibrated":
        missing.append("held-out calibration evidence")
    if not alternative_hypotheses_present:
        uncertainty.append("documented alternative hypotheses")
    if not uncertainty_present:
        uncertainty.append("uncertainty estimate and interval/decision rule")

    status = "ready_for_validated_model" if not missing and not uncertainty else "not_ready"
    return InferenceReadiness(
        status=status,
        eligible=eligibility_status == "eligible",
        evidence_family_count=len(present),
        required_evidence_families=required_evidence_families,
        present_evidence_families=tuple(sorted(present)),
        missing_requirements=tuple(missing),
        uncertainty_requirements=tuple(uncertainty),
    )
