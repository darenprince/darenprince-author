import numpy as np
from voxvector.voice_quality import clipping_ratio,dc_offset,jitter_local,shimmer_local

def test_clipping_ratio_detects_threshold_hits(): assert clipping_ratio(np.array([0.,.5,1.,-1.]))==.5
def test_dc_offset(): assert dc_offset(np.array([-1.,1.,3.]))==1.
def test_jitter_and_shimmer_require_multiple_valid_cycles(): assert np.isnan(jitter_local(np.array([.01]))); assert np.isnan(shimmer_local(np.array([1.])))
def test_jitter_and_shimmer_are_finite_for_valid_sequences(): assert np.isfinite(jitter_local(np.array([.010,.011,.010]))); assert np.isfinite(shimmer_local(np.array([1.,1.1,1.])))
