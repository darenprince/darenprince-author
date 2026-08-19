import numpy as np
import pytest

from voxvector.pipeline import VoxVectorPipeline


def _signal(sample_rate=16000, seconds=1.0):
    t = np.arange(int(sample_rate * seconds)) / sample_rate
    return 0.1 * np.sin(2 * np.pi * 180 * t)


def test_comprehensive_pipeline_preserves_stage_separation():
    sr = 16000
    result = VoxVectorPipeline().analyze(
        _signal(sr),
        sr,
        transcript_tokens=["I", "uh", "I", "answered"],
        question_end_s=0.10,
        first_speech_s=0.35,
        first_substantive_s=0.55,
        baseline_values={"f0": np.array([175, 180, 182]), "intensity": np.array([-20, -19]), "rms": np.array([0.08, 0.09])},
    )

    assert result.eligibility.status == "eligible"
    assert result.candidate == "indeterminate"
    assert result.disposition == "insufficient_evidence"
    assert result.provenance["input_sha256"]
    assert result.provenance["software_version"] == "0.2.25"
    assert result.observations
    assert result.evidence
    assert all(e.direction == "neutral" for e in result.evidence)


def test_bad_input_abstains_instead_of_inferencing():
    result = VoxVectorPipeline().analyze(np.zeros(0), 16000)
    assert result.eligibility.status == "ineligible"
    assert result.candidate == "indeterminate"
    assert result.disposition == "abstain"


def test_response_latency_requires_complete_boundaries():
    with pytest.raises(ValueError):
        VoxVectorPipeline().analyze(_signal(), 16000, first_speech_s=0.2)


def test_missing_optional_context_is_explicitly_reported():
    result = VoxVectorPipeline().analyze(_signal(), 16000)
    assert any("No transcript" in item for item in result.limitations)
    assert any("No independent within-speaker baseline" in item for item in result.limitations)
    assert any("No question/answer timing boundaries" in item for item in result.limitations)
