import numpy as np
from voxvector.cepstral import mfcc, mfcc_basis, mfcc_from_power_spectrum

def test_mfcc_shape():
    values=mfcc(np.zeros((3,256)),16000,n_coefficients=13,n_filters=26); assert values.shape==(3,13); assert np.isfinite(values).all()


def test_mfcc_reuses_external_power_spectrum_without_changing_values():
    rng = np.random.default_rng(7)
    frames = rng.normal(size=(5, 400))
    expected = mfcc(frames, 16000)
    bank, dct = mfcc_basis(400, 16000)
    power = np.abs(np.fft.rfft(frames * np.hanning(400), axis=1)) ** 2
    actual = mfcc_from_power_spectrum(power, bank, dct)
    assert np.allclose(actual, expected)
