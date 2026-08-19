import pytest

from voxvector.validation import get_method_validation, is_inferentially_validated, method_registry


def test_research_methods_are_registered_as_observational():
    expected = {
        "timing.speech_rate",
        "timing.articulation_rate",
        "timing.pause_topology",
        "prosody.contour_summary",
        "spectral.flux",
    }
    registry = {item.method_id: item for item in method_registry()}
    assert expected <= registry.keys()
    assert all(registry[item].status == "implemented_observational" for item in expected)


def test_deception_classifier_is_not_validated():
    assert not is_inferentially_validated("classifier.deception")
    assert get_method_validation("classifier.deception").status == "registered_unimplemented"


def test_unknown_method_fails_closed():
    with pytest.raises(KeyError):
        get_method_validation("unknown.method")
