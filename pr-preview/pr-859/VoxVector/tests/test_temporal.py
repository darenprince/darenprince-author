import numpy as np
from voxvector.temporal import contiguous_runs,pause_durations,pause_mask,voiced_fraction,voiced_mask

def test_contiguous_runs(): assert contiguous_runs(np.array([False,True,True,False,True]))==[(1,3),(4,5)]
def test_pause_durations_filters_short_runs(): assert np.allclose(pause_durations(np.array([1.,0,0,1,0]),.1,min_duration=.2),[.2])
def test_voiced_mask_requires_finite_f0_and_energy(): assert np.array_equal(voiced_mask(np.zeros((3,8)),np.array([100.,np.nan,150.]),np.array([.1,.1,0.])),[True,False,False])
def test_pause_mask(): assert np.array_equal(pause_mask(np.array([0,.01,0]),.001),[True,False,True])
def test_voiced_fraction(): assert voiced_fraction(np.array([True,False,True,True]))==.75
