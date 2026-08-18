import numpy as np
import pytest
from voxvector.research_prosody import contour_summary,spectral_flux

def test_contour_summary_ignores_nonfinite_observations():
    result=contour_summary(np.array([100.,np.nan,120.]),np.array([0.,1.,2.])); assert result["mean"]==110.; assert result["range"]==20.; assert result["slope"]==10.
def test_spectral_flux_has_one_value_per_transition():
    flux=spectral_flux(np.array([[1.,0.],[0.,1.],[.5,.5]])); assert flux.shape==(2,); assert np.all(np.isfinite(flux)); assert flux[0]>0
def test_spectral_flux_rejects_negative_or_nonfinite_values():
    with pytest.raises(ValueError): spectral_flux(np.array([[1.,-1.],[1.,1.]]))
    with pytest.raises(ValueError): spectral_flux(np.array([[1.,np.nan],[1.,1.]]))
