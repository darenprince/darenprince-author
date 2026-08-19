import numpy as np
import pytest
from voxvector.cepstral import mfcc

def test_mfcc_rejects_short_frames():
    with pytest.raises(ValueError): mfcc(np.zeros((1,3)),16000)
def test_mfcc_is_deterministic():
    frames=np.random.default_rng(123).normal(size=(2,256)); assert np.array_equal(mfcc(frames,16000),mfcc(frames,16000))
