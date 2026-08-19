import numpy as np

from voxvector.pipeline import FRAME_CHUNK_COUNT, VoxVectorPipeline, _iter_frame_chunks


def test_pipeline_abstains_without_enough_context():
    result = VoxVectorPipeline().analyze(np.zeros(32000, dtype=float), 16000)
    assert result.candidate == "indeterminate"
    assert result.disposition == "insufficient_evidence"
    assert result.eligibility.status == "eligible"
    assert len(result.observations) > 0


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
