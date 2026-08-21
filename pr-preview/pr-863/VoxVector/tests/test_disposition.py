from voxvector.disposition import determine_disposition

def test_unvalidated_classifier_cannot_produce_verdict():
    result=determine_disposition(reliability_status="eligible",candidate_state="consistent",classifier_validated=False,evidence_validated=False); assert result.disposition=="insufficient_evidence"; assert result.authorized

def test_bad_quality_abstains():
    result=determine_disposition(reliability_status="degraded",candidate_state="consistent",classifier_validated=True,evidence_validated=True); assert result.disposition=="abstain"

def test_no_enabled_rule_still_cannot_verdict():
    result=determine_disposition(reliability_status="eligible",candidate_state="consistent",classifier_validated=True,evidence_validated=True); assert result.disposition=="insufficient_evidence"
