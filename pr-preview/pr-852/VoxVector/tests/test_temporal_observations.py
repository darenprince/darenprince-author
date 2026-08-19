import numpy as np
from voxvector.temporal_observations import extract_temporal_observations

def test_temporal_observations():
    observations=extract_temporal_observations(np.array([.1,0,0,.1]),np.array([True,False,False,True]),.1,.9); assert {o.feature for o in observations}=={"voiced_fraction","pause_count","pause_duration_mean","pause_duration_total"}; assert all(o.quality==.9 for o in observations)
