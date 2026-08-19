from voxvector.classification import assess_candidate
from voxvector.convergence import build_convergence
from voxvector.observations import make_observation

def test_candidate_boundary_remains_indeterminate():
    observations=[make_observation(method_id="acoustic.f0",feature="f0",value=120,unit="Hz",segment=(0,1),quality=.9)]; result=assess_candidate(build_convergence(observations),reliability_status="eligible"); assert result.state=="indeterminate"; assert not result.eligible_for_disposition

def test_degraded_reliability_blocks_classification():
    result=assess_candidate(build_convergence([]),reliability_status="degraded"); assert result.state=="indeterminate"; assert not result.eligible_for_disposition
