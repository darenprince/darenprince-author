import numpy as np
import pytest
from voxvector.formants import track_formants

def test_formant_tracking_returns_frame_matrix():
    t = np.arange(1024) / 16000.0
    frame = np.sin(2 * np.pi * 700 * t) + 0.5 * np.sin(2 * np.pi * 1400 * t)
    result = track_formants(np.vstack([frame, frame]), 16000, n_formants=4, max_hz=4000)
    assert result.shape == (2, 4)
    assert np.isfinite(result).sum() > 0

def test_formant_tracking_rejects_non_matrix_input():
    with pytest.raises(ValueError):
        track_formants(np.zeros(8), 16000)
