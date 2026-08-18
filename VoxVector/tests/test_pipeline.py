import numpy as np
from voxvector.pipeline import VoxVectorPipeline

def test_pipeline_abstains_without_enough_context():
    result=VoxVectorPipeline().analyze(np.zeros(32000,dtype=float),16000); assert result.candidate=="indeterminate"; assert result.disposition=="insufficient_evidence"; assert result.eligibility.status=="eligible"; assert len(result.observations)>0

def test_pipeline_rejects_invalid_sample_rate():
    result=VoxVectorPipeline().analyze(np.zeros(100),0); assert result.eligibility.status=="ineligible"; assert result.disposition=="abstain"
