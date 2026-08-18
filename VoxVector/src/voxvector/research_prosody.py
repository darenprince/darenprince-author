from __future__ import annotations
import numpy as np

def contour_summary(values: np.ndarray, times: np.ndarray | None = None) -> dict[str,float|None]:
    x=np.asarray(values,dtype=float).reshape(-1); t=np.arange(x.size,dtype=float) if times is None else np.asarray(times,dtype=float).reshape(-1)
    if t.size!=x.size: raise ValueError("values and times must have equal length")
    mask=np.isfinite(x)&np.isfinite(t); x=x[mask]; t=t[mask]
    if x.size==0: return {"mean":None,"range":None,"std":None,"p10":None,"p90":None,"slope":None}
    slope=None if x.size<2 or np.ptp(t)<=0 else float(np.polyfit(t,x,1)[0])
    return {"mean":float(np.mean(x)),"range":float(np.ptp(x)),"std":float(np.std(x)),"p10":float(np.percentile(x,10)),"p90":float(np.percentile(x,90)),"slope":slope}

def spectral_flux(magnitudes: np.ndarray)->np.ndarray:
    x=np.asarray(magnitudes,dtype=float)
    if x.ndim!=2: raise ValueError("magnitudes must be a 2D frame-by-bin array")
    if not np.all(np.isfinite(x)): raise ValueError("magnitudes must be finite")
    if np.any(x<0): raise ValueError("magnitudes must be non-negative")
    if x.shape[0]<2: return np.empty(0,dtype=float)
    denom=np.maximum(np.sum(x,axis=1,keepdims=True),np.finfo(float).eps); norm=x/denom; delta=norm[1:]-norm[:-1]
    return np.sqrt(np.sum(delta*delta,axis=1))
