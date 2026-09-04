from voxvector.research_model import ValidatedModelArtifact, guarded_infer
from voxvector.research_readiness import assess_research_readiness, REQUIRED_GATE_KEYS


class Model:
    model_id = "model-1"
    version = "1"

    def predict_probability(self, evidence_vector):
        return sum(evidence_vector) / len(evidence_vector)


def test_inference_is_blocked_until_all_validation_gates_pass():
    readiness = assess_research_readiness({})
    artifact = ValidatedModelArtifact("model-1", "1", "task-1", "cal-1", "eval-1", True, ("acoustic", "linguistic"))
    result = guarded_infer(Model(), artifact, readiness, [0.2, 0.8])
    assert result.state == "indeterminate"
    assert result.probability is None


def test_validated_model_can_be_called_only_after_gate_is_open():
    readiness = assess_research_readiness({key: True for key in REQUIRED_GATE_KEYS})
    artifact = ValidatedModelArtifact("model-1", "1", "task-1", "cal-1", "eval-1", True, ("acoustic", "linguistic"))
    result = guarded_infer(Model(), artifact, readiness, [0.2, 0.8])
    assert result.state == "available"
    assert result.probability == 0.5
