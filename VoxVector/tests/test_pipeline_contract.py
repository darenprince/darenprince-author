import io
import struct

import numpy as np
import pytest

from api.app import read_wav
from voxvector.pipeline import VoxVectorPipeline


def _signal(sample_rate=16000, seconds=1.0):
    t = np.arange(int(sample_rate * seconds)) / sample_rate
    return 0.1 * np.sin(2 * np.pi * 180 * t)


def _extensible_pcm_wav(sample_rate=16000, frames=800):
    channels = 1
    bits = 16
    block_align = channels * (bits // 8)
    byte_rate = sample_rate * block_align
    pcm = np.zeros(frames, dtype=np.int16).tobytes()
    pcm_subformat_guid = bytes.fromhex('0100000000001000800000AA00389B71')
    fmt_payload = struct.pack(
        '<HHIIHHHHI16s',
        0xFFFE,
        channels,
        sample_rate,
        byte_rate,
        block_align,
        bits,
        22,
        bits,
        0,
        pcm_subformat_guid,
    )
    assert len(fmt_payload) == 40
    buf = io.BytesIO()
    riff_size = 4 + 8 + len(fmt_payload) + 8 + len(pcm)
    buf.write(b'RIFF')
    buf.write(struct.pack('<I', riff_size))
    buf.write(b'WAVE')
    buf.write(b'fmt ')
    buf.write(struct.pack('<I', len(fmt_payload)))
    buf.write(fmt_payload)
    buf.write(b'data')
    buf.write(struct.pack('<I', len(pcm)))
    buf.write(pcm)
    return buf.getvalue()


def test_comprehensive_pipeline_preserves_stage_separation():
    sr = 16000
    result = VoxVectorPipeline().analyze(
        _signal(sr),
        sr,
        transcript_tokens=['I', 'uh', 'I', 'answered'],
        question_end_s=0.10,
        first_speech_s=0.35,
        first_substantive_s=0.55,
        baseline_values={'f0': np.array([175, 180, 182]), 'intensity': np.array([-20, -19]), 'rms': np.array([0.08, 0.09])},
    )
    assert result.eligibility.status == 'eligible'
    assert result.candidate == 'indeterminate'
    assert result.disposition == 'insufficient_evidence'
    assert result.provenance['input_sha256']
    assert result.provenance['software_version'] == '0.2.26'
    assert result.observations
    assert result.evidence
    assert result.speech_segments
    assert result.speech_segments[0].segment_id.startswith(result.run_id)
    assert all(e.direction == 'neutral' for e in result.evidence)


def test_bad_input_abstains_instead_of_inferencing():
    result = VoxVectorPipeline().analyze(np.zeros(0), 16000)
    assert result.eligibility.status == 'ineligible'
    assert result.candidate == 'indeterminate'
    assert result.disposition == 'abstain'
    assert result.speech_segments == ()


def test_response_latency_requires_complete_boundaries():
    with pytest.raises(ValueError):
        VoxVectorPipeline().analyze(_signal(), 16000, first_speech_s=0.2)


def test_missing_optional_context_is_explicitly_reported():
    result = VoxVectorPipeline().analyze(_signal(), 16000)
    assert any('No transcript' in item for item in result.limitations)
    assert any('No independent within-speaker baseline' in item for item in result.limitations)
    assert any('No question/answer timing boundaries' in item for item in result.limitations)


def test_read_wav_accepts_extensible_pcm_wav():
    audio, sample_rate = read_wav(_extensible_pcm_wav())
    assert sample_rate == 16000
    assert audio.shape == (800,)
    assert np.all(audio == 0)
