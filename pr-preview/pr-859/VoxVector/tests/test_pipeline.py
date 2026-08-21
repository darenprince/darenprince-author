import numpy as np

from voxvector.pipeline import FRAME_CHUNK_COUNT, MFCC_COEFFICIENTS, VoxVectorPipeline, _iter_frame_chunks


def test_pipeline_abstains_without_enough_context():
    result = VoxVectorPipeline().analyze(np.zeros(32000, dtype=float), 16000)
    assert result.candidate == "indeterminate"
    assert result.disposition == "insufficient_evidence"
    assert result.eligibility.status == "eligible"
    assert len(result.observations) > 0


def test_pipeline_emits_mfcc_observations():
    signal = np.sin(2 * np.pi * 180 * np.arange(16000, dtype=float) / 16000)
    result = VoxVectorPipeline().analyze(signal, 16000)
    mfcc_observations = [item for item in result.observations if item.method_id == "cepstral.mfcc"]
    assert len(mfcc_observations) == MFCC_COEFFICIENTS
    assert {item.provenance["coefficient_index"] for item in mfcc_observations} == set(range(MFCC_COEFFICIENTS))


def test_pipeline_rejects_invalid_sample_rate():
    result = VoxVectorPipeline().analyze(np.zeros(100), 0)
    assert result.eligibility.status == "ineligible"
    assert result.disposition == "abstain"


def test_frame_processing_is_bounded():
    signal = np.zeros(16000 * 8, dtype=float)
    chunks = list(_iter_frame_chunks(signal, frame_size=400, hop=160))
    assert chunks
    assert all(frames.shape[0] <= FRAME_CHUNK_COUNT for frames, _ in chunks)
    assert sum(frames.shape[0] for frames, _ in chunks) == 1 + (signal.size - 400) // 160
    assert chunks[0][1] == 0
    assert all(chunks[index][1] > chunks[index - 1][1] for index in range(1, len(chunks)))
