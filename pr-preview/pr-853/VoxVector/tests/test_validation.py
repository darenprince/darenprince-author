import pytest
from voxvector.validation import get_method_validation,is_inferentially_validated,method_registry

def test_registry_contains_implemented_and_unimplemented_methods():
    ids={method.method_id for method in method_registry()}; assert "acoustic.fundamental_frequency" in ids; assert "classifier.deception" in ids
def test_deception_classifier_is_not_inferentially_validated(): assert not is_inferentially_validated("classifier.deception")
def test_unknown_method_fails_closed():
    with pytest.raises(KeyError): get_method_validation("does.not.exist")
def test_every_registered_method_has_validation_plan_and_failure_behavior():
    for method in method_registry(): assert method.validation_plan and method.failure_behavior
