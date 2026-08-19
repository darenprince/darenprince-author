import numpy as np
from voxvector.extract import extract_acoustic_observations

def test_extract_acoustic_observations_creates_provenance_records():
    sr=8000; t=np.arange(sr,dtype=float)/sr; observations=extract_acoustic_observations(.2*np.sin(2*np.pi*200*t),sr,frame_size=256,hop_size=128); assert observations; assert {obs.feature for obs in observations}>={"rms","f0","harmonicity"}; assert all(obs.provenance["sample_rate"]==sr for obs in observations); assert all(obs.segment[1]>obs.segment[0] for obs in observations)
