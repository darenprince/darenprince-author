from voxvector.convergence import build_convergence
from voxvector.observations import make_observation

def test_convergence_preserves_neutrality_and_alternatives():
    observations=[make_observation(method_id="acoustic.f0",feature="f0",value=120,unit="Hz",segment=(0,1),quality=.9),make_observation(method_id="temporal.pause",feature="pause_count",value=3,unit="count",segment=(0,1),quality=.8)]; report=build_convergence(observations); assert report.feature_groups==2; assert report.independent_methods==2; assert report.agreement=="convergent_observations"; assert all(item.direction=="neutral" for item in report.evidence); assert "stress_or_arousal" in report.alternative_explanations

def test_convergence_flags_limited_data():
    report=build_convergence([make_observation(method_id="acoustic.f0",feature="f0",value=120,unit="Hz",segment=(0,1),quality=.9)]); assert "limited_method_diversity" in report.uncertainty
