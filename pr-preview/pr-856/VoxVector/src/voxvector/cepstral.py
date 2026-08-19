from __future__ import annotations
import numpy as np

def mfcc(frames: np.ndarray,sample_rate:int,n_coefficients:int=13,n_filters:int=26,low_hz:float=20.0,high_hz:float|None=None)->np.ndarray:
    frames=np.asarray(frames,dtype=float)
    if frames.ndim!=2 or frames.shape[1]<4: raise ValueError("frames must be a 2D array with at least 4 samples")
    if sample_rate<=0 or n_coefficients<=0 or n_filters<=1: raise ValueError("invalid MFCC parameters")
    high_hz=sample_rate/2 if high_hz is None else float(high_hz)
    if not (0<=low_hz<high_hz<=sample_rate/2): raise ValueError("invalid frequency bounds")
    hz_to_mel=lambda hz:2595.0*np.log10(1.0+hz/700.0)
    mel_to_hz=lambda mel:700.0*(10.0**(mel/2595.0)-1.0)
    window=np.hanning(frames.shape[1]); spectrum=np.abs(np.fft.rfft(frames*window,axis=1))**2
    mel_points=np.linspace(hz_to_mel(low_hz),hz_to_mel(high_hz),n_filters+2); hz_points=mel_to_hz(mel_points)
    bins=np.floor((frames.shape[1]+1)*hz_points/sample_rate).astype(int); bins=np.clip(bins,0,spectrum.shape[1]-1)
    bank=np.zeros((n_filters,spectrum.shape[1]),dtype=float)
    for i in range(n_filters):
        left,center,right=bins[i:i+3]
        if center>left: bank[i,left:center]=(np.arange(left,center)-left)/(center-left)
        if right>center: bank[i,center:right]=(right-np.arange(center,right))/(right-center)
    energies=spectrum@bank.T; log_energies=np.log(np.maximum(energies,np.finfo(float).tiny)); n=min(n_coefficients,n_filters)
    k=np.arange(n)[:,None]; j=np.arange(n_filters)[None,:]; dct=np.cos(np.pi/n_filters*(j+0.5)*k)
    return log_energies@dct.T

def cepstral_summary(coefficients: np.ndarray)->dict[str,float]:
    values=np.asarray(coefficients,dtype=float); finite=values[np.isfinite(values)]
    return {"mean":float(np.mean(finite)),"std":float(np.std(finite))} if finite.size else {"mean":float("nan"),"std":float("nan")}
