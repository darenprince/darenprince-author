import numpy as np

from voxvector.acoustic import spectral_centroid, spectral_spread


def test_spectral_features_match_fft_dimension():
    rng = np.random.default_rng(7)
    frames = rng.normal(size=(16, 514))
    centroid = spectral_centroid(frames, 16000)
    spread = spectral_spread(frames, 16000)
    assert centroid.shape == (16,)
    assert spread.shape == (16,)
    assert np.all(np.isfinite(centroid))
    assert np.all(np.isfinite(spread))


def test_spectral_features_work_with_deployed_frame_size():
    rng = np.random.default_rng(11)
    frames = rng.normal(size=(8, 1200))
    centroid = spectral_centroid(frames, 48000)
    spread = spectral_spread(frames, 48000)
    assert centroid.shape == spread.shape == (8,)
    assert np.all(centroid >= 0)
    assert np.all(spread >= 0)
