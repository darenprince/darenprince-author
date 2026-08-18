from __future__ import annotations
import numpy as np

def estimate_formants(frame: np.ndarray, sample_rate: int, n_formants: int = 4, min_hz: float = 200.0, max_hz: float = 5000.0) -> np.ndarray:
    frame=np.asarray(frame,dtype=float).reshape(-1)
    if sample_rate<=0 or frame.size<8 or n_formants<=0: raise ValueError("invalid formant parameters")
    if not(0<min_hz<max_hz<=sample_rate/2): raise ValueError("invalid formant frequency range")
    centered=frame-np.mean(frame); spectrum=np.abs(np.fft.rfft(centered*np.hanning(frame.size))); frequencies=np.fft.rfftfreq(frame.size,1.0/sample_rate); valid=(frequencies>=min_hz)&(frequencies<=max_hz); indices=np.flatnonzero(valid)
    if indices.size<3:return np.full(n_formants,np.nan)
    peaks=indices[(spectrum[indices]>=spectrum[indices-1])&(spectrum[indices]>=spectrum[indices+1])]; ranked=peaks[np.argsort(spectrum[peaks])[::-1]]; selected=[]; min_spacing=max(100.0,sample_rate/frame.size)
    for peak in ranked:
        if all(abs(frequencies[peak]-frequencies[p])>=min_spacing for p in selected): selected.append(int(peak))
        if len(selected)==n_formants: break
    selected.sort(key=lambda p:frequencies[p]); result=np.full(n_formants,np.nan)
    if selected: result[:len(selected)]=frequencies[selected]
    return result
