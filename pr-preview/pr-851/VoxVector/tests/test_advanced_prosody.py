import numpy as np
from voxvector.advanced_prosody import contour_dynamics, contour_delta

def test_contour_dynamics_ignores_nonfinite_values():
    result = contour_dynamics(np.array([100.0, np.nan, 120.0]))
    assert result["mean"] == 110.0
    assert result["range"] == 20.0

def test_contour_delta_requires_two_finite_values():
    assert np.isnan(contour_delta(np.array([np.nan, 1.0])))
    assert contour_delta(np.array([1.0, 3.0])) == 2.0
