import numpy as np
from voxvector.cepstral import mfcc

def test_mfcc_shape():
    values=mfcc(np.zeros((3,256)),16000,n_coefficients=13,n_filters=26); assert values.shape==(3,13); assert np.isfinite(values).all()
