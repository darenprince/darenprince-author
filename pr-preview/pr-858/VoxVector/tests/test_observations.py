import pytest
from voxvector.observations import make_observation,observation_id,observations_from_series

def test_make_observation_and_id_are_deterministic():
    obs=make_observation(method_id="acoustic.rms",feature="rms",value=.2,unit="amplitude",segment=(0,.1),quality=.9,provenance={"sample_rate":16000}); assert observation_id(obs)==observation_id(obs); assert obs.quality==.9

def test_series_preserves_segments():
    values=observations_from_series(method_id="acoustic.rms",feature="rms",values=[.1,None,.3],unit="amplitude",hop_seconds=.1,quality=.8); assert len(values)==3; assert values[1].value is None; assert values[2].segment==(0.2,0.30000000000000004)

def test_invalid_quality_rejected():
    with pytest.raises(ValueError): make_observation(method_id="x",feature="x",value=1,unit="u",segment=(0,1),quality=1.1)
