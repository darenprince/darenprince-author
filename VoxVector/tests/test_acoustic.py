import numpy as np
from voxvector.acoustic import frame_signal,fundamental_frequency,harmonicity,intensity_db,pitch_and_harmonicity,rms,spectral_centroid,spectral_moments_from_spectrum,spectral_spread,zero_crossing_rate

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


def test_combined_pitch_and_harmonicity_matches_existing_methods():
    sr=16000;t=np.arange(1600)/sr;frames=frame_signal(np.sin(2*np.pi*200*t),400,200)
    f0,h= pitch_and_harmonicity(frames,sr)
    assert np.allclose(f0, fundamental_frequency(frames,sr), equal_nan=True)
    assert np.allclose(h, harmonicity(frames,sr), equal_nan=True)

def test_shared_spectral_moments_match_existing_methods():
    rng=np.random.default_rng(3);frames=rng.normal(size=(6,400));spectrum=np.abs(np.fft.rfft(frames*np.hanning(400),axis=1))
    centroid,spread=spectral_moments_from_spectrum(spectrum,16000,400)
    assert np.allclose(centroid,spectral_centroid(frames,16000))
    assert np.allclose(spread,spectral_spread(frames,16000))
