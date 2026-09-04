from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol, Sequence

from .research_readiness import ResearchReadiness


@dataclass(frozen=True)
class ValidatedModelArtifact:
    model_id: str
    version: str
    task_id: str
    calibration_id: str
    evaluation_id: str
    validated: bool
    evidence_families: tuple[str, ...]


@dataclass(frozen=True)
class InferenceResult:
    state: str
    probability: float | None
    model_id: str | None
    rationale: tuple[str, ...]


class ProbabilityModel(Protocol):
    model_id: str
    version: str

    def predict_probability(self, evidence_vector: Sequence[float]) -> float: ...


def guarded_infer(
    model: ProbabilityModel | None,
    artifact: ValidatedModelArtifact | None,
    readiness: ResearchReadiness,
    evidence_vector: Sequence[float],
) -> InferenceResult:
    """Permit model execution only after the explicit validation gate is open."""
    if not readiness.ready:
        return InferenceResult(
            "indeterminate",
            None,
            None,
            ("research_inference_gate_not_satisfied", *readiness.missing),
        )
    if model is None or artifact is None:
        return InferenceResult("indeterminate", None, None, ("validated_model_artifact_unavailable",))
    if not artifact.validated:
        return InferenceResult("indeterminate", None, artifact.model_id, ("model_artifact_not_validated",))
    if artifact.model_id != model.model_id or artifact.version != model.version:
        return InferenceResult("indeterminate", None, artifact.model_id, ("model_artifact_version_mismatch",))
    if not artifact.evidence_families:
        return InferenceResult("indeterminate", None, artifact.model_id, ("model_evidence_family_contract_missing",))
    probability = float(model.predict_probability(evidence_vector))
    if probability < 0.0 or probability > 1.0:
        raise ValueError("validated model returned a probability outside [0, 1]")
    return InferenceResult("available", probability, artifact.model_id, ("validated_model_artifact_authorized",))
