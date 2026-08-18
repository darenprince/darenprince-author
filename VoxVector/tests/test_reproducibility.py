import numpy as np
from voxvector.acoustic import fundamental_frequency,rms
from voxvector.reliability import assess_signal

def test_acoustic_features_are_deterministic():
    signal=np.random.default_rng(42).normal(0,.05,16000); frames=signal[:4000].reshape(10,400); assert np.array_equal(rms(frames),rms(frames)); assert np.array_equal(fundamental_frequency(frames,16000),fundamental_frequency(frames,16000))
def test_reliability_is_deterministic(): assert assess_signal(np.zeros(16000),16000)==assess_signal(np.zeros(16000),16000)
def test_nonfinite_input_does_not_claim_clean_eligibility():
    signal=np.zeros(16000); signal[10]=np.nan; result=assess_signal(signal,16000); assert result.status!="eligible"; assert "non_finite_samples" in result.reasons
