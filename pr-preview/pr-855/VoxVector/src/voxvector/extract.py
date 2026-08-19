from __future__ import annotations
import numpy as np
from .acoustic import fundamental_frequency, harmonicity, rms
from .observations import make_observation
from .schemas import Observation

def extract_acoustic_observations(signal: np.ndarray, sample_rate: int, frame_size: int = 1024, hop_size: int = 512) -> tuple[Observation,...]:
    signal=np.asarray(signal,dtype=float).reshape(-1)
    if sample_rate<=0 or frame_size<=0 or hop_size<=0: raise ValueError("sample_rate, frame_size, and hop_size must be positive")
    if signal.size<frame_size:return ()
    rows=[]
    for start in range(0,signal.size-frame_size+1,hop_size):
        frame=signal[start:start+frame_size]; t0=start/sample_rate; t1=(start+frame_size)/sample_rate; quality=float(np.clip(np.std(frame)/0.05,0.0,1.0))
        values={"rms":(rms(frame[None,:])[0],"amplitude"),"f0":(fundamental_frequency(frame[None,:],sample_rate)[0],"Hz"),"harmonicity":(harmonicity(frame[None,:],sample_rate)[0],"ratio")}
        for feature,(value,unit) in values.items(): rows.append(make_observation(method_id=f"acoustic.{feature}",feature=feature,value=value,unit=unit,segment=(t0,t1),quality=quality,provenance={"sample_rate":sample_rate,"frame_size":frame_size,"hop_size":hop_size}))
    return tuple(rows)
