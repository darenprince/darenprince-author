from __future__ import annotations
import numpy as np

def _validate(energy: np.ndarray, voiced: np.ndarray, hop_seconds: float) -> tuple[np.ndarray, np.ndarray]:
    energy=np.asarray(energy,dtype=float).reshape(-1); voiced=np.asarray(voiced,dtype=bool).reshape(-1)
    if energy.size!=voiced.size: raise ValueError("energy and voiced arrays must have equal length")
    if hop_seconds<=0: raise ValueError("hop_seconds must be positive")
    return energy,voiced

def pause_topology(energy: np.ndarray, voiced: np.ndarray, hop_seconds: float, threshold: float=0.01)->dict[str,float|None]:
    energy,voiced=_validate(energy,voiced,hop_seconds)
    if energy.size==0: return {"pause_count":0.0,"pause_density":None,"longest_pause":None,"pause_median":None,"pause_p90":None,"voiced_run_mean":None}
    quiet=np.isfinite(energy)&(np.abs(energy)<=threshold)&~voiced; runs=[]; current=0
    for value in quiet:
        if value: current+=1
        elif current: runs.append(current); current=0
    if current: runs.append(current)
    pause_seconds=np.asarray(runs,dtype=float)*hop_seconds; voiced_runs=[]; current=0
    for value in voiced:
        if value: current+=1
        elif current: voiced_runs.append(current); current=0
    if current: voiced_runs.append(current)
    vr=np.asarray(voiced_runs,dtype=float)*hop_seconds; duration=energy.size*hop_seconds
    return {"pause_count":float(pause_seconds.size),"pause_density":float(pause_seconds.size/duration) if duration else None,"longest_pause":float(np.max(pause_seconds)) if pause_seconds.size else None,"pause_median":float(np.median(pause_seconds)) if pause_seconds.size else None,"pause_p90":float(np.percentile(pause_seconds,90)) if pause_seconds.size else None,"voiced_run_mean":float(np.mean(vr)) if vr.size else None}

def speech_rate_from_syllables(syllables:float,voiced_seconds:float)->float|None:
    if syllables<0 or voiced_seconds<0: raise ValueError("syllables and voiced_seconds must be non-negative")
    return None if voiced_seconds==0 else float(syllables/voiced_seconds)

def articulation_rate_from_syllables(syllables:float,articulation_seconds:float)->float|None:
    if syllables<0 or articulation_seconds<0: raise ValueError("syllables and articulation_seconds must be non-negative")
    return None if articulation_seconds==0 else float(syllables/articulation_seconds)
