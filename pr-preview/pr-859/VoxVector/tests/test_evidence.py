from voxvector.evidence import observations_to_evidence
from voxvector.observations import make_observation

def test_observations_group_into_neutral_evidence():
    obs=[make_observation(method_id="acoustic.f0",feature="f0",value=120,unit="Hz",segment=(0,1),quality=.9),make_observation(method_id="acoustic.f0",feature="f0",value=125,unit="Hz",segment=(1,2),quality=.8)]
    evidence=observations_to_evidence(obs); assert len(evidence)==1; assert evidence[0].direction=="neutral"; assert "observational feature" in evidence[0].alternative_explanations[0]
