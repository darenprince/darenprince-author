import numpy as np
from voxvector.pulse import autocorrelation_periods,period_from_f0

def test_period_from_f0(): assert np.allclose(period_from_f0(np.array([100.,np.nan,200.,0.])),[.01,.005])
def test_autocorrelation_period_estimator_detects_tone_period():
    sr=8000; f=200; t=np.arange(0,.2,1/sr); periods=autocorrelation_periods(np.sin(2*np.pi*f*t),sr,min_f0=100,max_f0=300); assert periods.size==1; assert abs(periods[0]-1/f)<1/sr
def test_autocorrelation_period_estimator_rejects_silence(): assert autocorrelation_periods(np.zeros(1000),8000).size==0
