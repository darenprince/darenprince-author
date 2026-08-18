from __future__ import annotations
import numpy as np

def frame_signal(signal: np.ndarray, frame_size: int, hop: int) -> np.ndarray:
    signal=np.asarray(signal,dtype=float).reshape(-1)
    if frame_size<=0 or hop<=0: raise ValueError("frame_size and hop must be positive")
    if signal.size<frame_size: return np.empty((0,frame_size),dtype=float)
    starts=np.arange(0,signal.size-frame_size+1,hop); return np.stack([signal[i:i+frame_size] for i in starts])

def rms(frames: np.ndarray)->np.ndarray:
    frames=np.asarray(frames,dtype=float)
    if frames.ndim!=2: raise ValueError("frames must be a 2D array")
    return np.sqrt(np.mean(frames*frames,axis=1))

def intensity_db(frames: np.ndarray,reference:float=1.0)->np.ndarray:
    if reference<=0: raise ValueError("reference must be positive")
    return 20.0*np.log10(np.maximum(rms(frames),np.finfo(float).tiny)/reference)

def zero_crossing_rate(frames: np.ndarray)->np.ndarray:
    frames=np.asarray(frames,dtype=float)
    if frames.ndim!=2: raise ValueError("frames must be a 2D array")
    if frames.shape[1]<2: return np.zeros(frames.shape[0],dtype=float)
    return np.mean(np.signbit(frames[:,1:])!=np.signbit(frames[:,:-1]),axis=1)

def _spectrum(frames:np.ndarray)->tuple[np.ndarray,np.ndarray]:
    frames=np.asarray(frames,dtype=float)
    if frames.ndim!=2: raise ValueError("frames must be a 2D array")
    return np.abs(np.fft.rfft(frames*np.hanning(frames.shape[1]),axis=1)),np.arange(frames.shape[1]//2+1)

def spectral_centroid(frames:np.ndarray,sample_rate:int)->np.ndarray:
    if sample_rate<=0: raise ValueError("sample_rate must be positive")
    spectrum,bins=_spectrum(frames); frequencies=bins*sample_rate/np.asarray(frames).shape[1]; denom=spectrum.sum(axis=1)
    return np.divide(spectrum@frequencies,denom,out=np.zeros_like(denom),where=denom>0)

def spectral_spread(frames:np.ndarray,sample_rate:int)->np.ndarray:
    if sample_rate<=0: raise ValueError("sample_rate must be positive")
    spectrum,bins=_spectrum(frames); frequencies=bins*sample_rate/np.asarray(frames).shape[1]; weights=spectrum.sum(axis=1)
    centroid=np.divide(spectrum@frequencies,weights,out=np.zeros_like(weights),where=weights>0)
    variance=np.divide(spectrum@((frequencies[None,:]-centroid[:,None])**2),weights,out=np.zeros_like(weights),where=weights>0)
    return np.sqrt(np.maximum(variance,0.0))

def fundamental_frequency(frames:np.ndarray,sample_rate:int,min_hz:float=60.0,max_hz:float=500.0,voicing_threshold:float=0.30)->np.ndarray:
    frames=np.asarray(frames,dtype=float)
    if frames.ndim!=2: raise ValueError("frames must be a 2D array")
    if sample_rate<=0 or not(0<min_hz<max_hz): raise ValueError("invalid sample rate or frequency range")
    min_lag=max(1,int(sample_rate/max_hz)); max_lag=min(frames.shape[1]-1,int(sample_rate/min_hz)); result=np.full(frames.shape[0],np.nan)
    if max_lag<=min_lag:return result
    for index,frame in enumerate(frames):
        centered=frame-np.mean(frame); energy=float(np.dot(centered,centered))
        if energy<=np.finfo(float).eps: continue
        corr=np.correlate(centered,centered,mode="full")[centered.size-1:]; corr=corr/corr[0]; lag=min_lag+int(np.argmax(corr[min_lag:max_lag+1]))
        if corr[lag]>=voicing_threshold: result[index]=sample_rate/lag
    return result

def harmonicity(frames:np.ndarray,sample_rate:int,min_hz:float=60.0,max_hz:float=500.0)->np.ndarray:
    frames=np.asarray(frames,dtype=float)
    if frames.ndim!=2: raise ValueError("frames must be a 2D array")
    if sample_rate<=0 or not(0<min_hz<max_hz): raise ValueError("invalid sample rate or frequency range")
    min_lag=max(1,int(sample_rate/max_hz)); max_lag=min(frames.shape[1]-1,int(sample_rate/min_hz)); result=np.full(frames.shape[0],np.nan)
    if max_lag<=min_lag:return result
    for index,frame in enumerate(frames):
        centered=frame-np.mean(frame); energy=float(np.dot(centered,centered))
        if energy<=np.finfo(float).eps: continue
        corr=np.correlate(centered,centered,mode="full")[centered.size-1:]; corr=corr/corr[0]; result[index]=float(np.max(corr[min_lag:max_lag+1]))
    return result

def summarize(values:np.ndarray)->dict[str,float]:
    values=np.asarray(values,dtype=float); finite=values[np.isfinite(values)]
    if finite.size==0:return {"mean":float("nan"),"median":float("nan"),"std":float("nan")}
    return {"mean":float(np.mean(finite)),"median":float(np.median(finite)),"std":float(np.std(finite))}
