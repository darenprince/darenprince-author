from voxvector.inference_readiness import assess_inference_readiness


def test_inference_readiness_requires_validation_and_calibration():
    result = assess_inference_readiness(
        eligibility_status="eligible",
        evidence=[
            {"method_id": "acoustic.rms"},
            {"method_id": "prosody.f0_dynamics"},
            {"method_id": "timing.pause_topology"},
            {"method_id": "disfluency.rate"},
            {"method_id": "speaker.turns"},
        ],
        transcript_present=True,
        speaker_artifact_present=True,
    )
    assert result.status == "not_ready"
    assert "task-specific scientific validation" in result.missing_requirements
    assert "held-out calibration evidence" in result.missing_requirements


def test_inference_readiness_can_open_when_all_gates_are_supplied():
    result = assess_inference_readiness(
        eligibility_status="eligible",
        evidence=[
            {"method_id": "acoustic.rms"},
            {"method_id": "prosody.f0_dynamics"},
            {"method_id": "timing.pause_topology"},
            {"method_id": "disfluency.rate"},
            {"method_id": "speaker.turns"},
        ],
        transcript_present=True,
        speaker_artifact_present=True,
        validation_status="validated",
        calibration_status="calibrated",
        alternative_hypotheses_present=True,
        uncertainty_present=True,
    )
    assert result.status == "ready_for_validated_model"
    assert result.missing_requirements == ()
    assert result.uncertainty_requirements == ()
