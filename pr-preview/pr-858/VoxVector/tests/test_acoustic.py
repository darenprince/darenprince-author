import numpy as np
from voxvector.acoustic import frame_signal,fundamental_frequency,harmonicity,intensity_db,rms,spectral_centroid,spectral_spread,zero_crossing_rate

def test_frame_signal_shape():
    frames=frame_signal(np.arange(100,dtype=float),20,10); assert frames.shape==(9,20)
def test_rms_zero_signal(): assert np.allclose(rms(np.zeros((2,8))),0.0)
def test_intensity_db_reference(): assert np.allclose(intensity_db(np.ones((1,8))),0.0)
def test_zero_crossing_rate(): assert np.allclose(zero_crossing_rate(np.array([[1,-1,1,-1]],dtype=float)),1.0)
def test_spectral_features_are_finite():
    frames=np.zeros((1,128)); assert np.isfinite(spectral_centroid(frames,16000)[0]); assert np.isfinite(spectral_spread(frames,16000)[0])
def test_fundamental_frequency_tracks_synthetic_tone():
    sr=16000;t=np.arange(4000)/sr; finite=fundamental_frequency(frame_signal(np.sin(2*np.pi*200*t),800,400),sr); finite=finite[np.isfinite(finite)]; assert finite.size>0; assert abs(float(np.median(finite))-200)<8
def test_harmonicity_is_bounded():
    sr=16000;t=np.arange(800)/sr; values=harmonicity(frame_signal(np.sin(2*np.pi*200*t),400,200),sr); finite=values[np.isfinite(values)]; assert finite.size>0; assert np.all((finite>=-1)&(finite<=1))
