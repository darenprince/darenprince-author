import numpy as np
import pytest

from voxvector.speech_segmentation import segment_speech


def test_segment_speech_finds_voiced_active_regions_and_bridges_short_gaps():
    rms = np.array([0.01, 0.01, 0.20, 0.22, 0.01, 0.21, 0.23, 0.01, 0.01])
    voiced = np.array([False, False, True, True, False, True, True, False, False])

    segments = segment_speech(rms, voiced, 0.1, min_speech_s=0.15, min_silence_s=0.15)

    assert len(segments) == 1
    assert segments[0].start_s == pytest.approx(0.2)
    assert segments[0].end_s == pytest.approx(0.7)
    assert segments[0].confidence == pytest.approx(1.0)


def test_segment_speech_rejects_short_active_runs():
    rms = np.array([0.01, 0.20, 0.01, 0.01])
    voiced = np.array([False, True, False, False])
    assert segment_speech(rms, voiced, 0.1, min_speech_s=0.2) == ()


def test_segment_speech_requires_positive_hop():
    with pytest.raises(ValueError):
        segment_speech(np.array([0.1]), np.array([True]), 0)
