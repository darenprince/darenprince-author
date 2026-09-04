from voxvector.research_readiness import REQUIRED_GATE_KEYS, assess_research_readiness


def test_research_readiness_requires_every_gate():
    result = assess_research_readiness({key: True for key in REQUIRED_GATE_KEYS})
    assert result.ready is True
    assert result.missing == ()


def test_research_readiness_blocks_partial_validation():
    checks = {key: True for key in REQUIRED_GATE_KEYS}
    checks["external_or_cross_dataset_evaluation"] = False
    result = assess_research_readiness(checks)
    assert result.ready is False
    assert "external_or_cross_dataset_evaluation" in result.missing


def test_missing_checks_default_to_false():
    result = assess_research_readiness({})
    assert result.ready is False
    assert set(result.missing) == set(REQUIRED_GATE_KEYS)
