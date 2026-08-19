import numpy as np
from voxvector.formants import estimate_formants

def test_formant_candidates_are_bounded():
    sr=16000;t=np.arange(1024)/sr; values=estimate_formants(np.sin(2*np.pi*500*t)+.5*np.sin(2*np.pi*1500*t),sr,n_formants=4,max_hz=4000); finite=values[np.isfinite(values)]; assert finite.size>0; assert np.all((finite>=200)&(finite<=4000))
def test_formants_reject_invalid_short_frame():
    try: estimate_formants(np.zeros(4),16000)
    except ValueError: pass
    else: raise AssertionError("short frame must fail explicitly")
