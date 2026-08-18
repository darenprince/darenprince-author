import numpy as np
from voxvector.hnr import harmonic_to_noise_ratio
from voxvector.spectral import spectral_flux, spectral_rolloff
from voxvector.baseline import robust_baseline, baseline_deviation

def test_hnr_is_nan_for_invalid_and_finite_for_valid():
    values = harmonic_to_noise_ratio(np.array([0.5, np.nan, 0.0]))
    assert np.isfinite(values[0])
    assert np.isnan(values[1]) and np.isnan(values[2])

def test_spectral_flux_and_rolloff():
    spectra = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])
    flux = spectral_flux(spectra)
    assert flux.shape == (1,)
    assert flux[0] > 0
    rolloff = spectral_rolloff(spectra, np.array([100.0, 200.0, 300.0]))
    assert rolloff.shape == (2,)

def test_baseline_is_robust_and_repeatable():
    baseline = robust_baseline(np.array([10.0, 10.0, 12.0, 100.0]))
    assert baseline["median"] == 11.0
    deviation = baseline_deviation(11.0, baseline)
    assert deviation == 0.0
