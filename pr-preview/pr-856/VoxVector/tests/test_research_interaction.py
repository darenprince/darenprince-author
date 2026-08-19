import pytest

from voxvector.research_interaction import overlap_duration, response_latency, turn_duration


def test_response_latency():
    result = response_latency(10.0, 11.2, 11.8)
    assert result.first_speech_s == pytest.approx(1.2)
    assert result.first_substantive_s == pytest.approx(1.8)
    assert result.filler_before_content_s == pytest.approx(0.6)


def test_response_latency_rejects_reversed_times():
    with pytest.raises(ValueError):
        response_latency(10.0, 9.0)


def test_turn_and_overlap_duration():
    assert turn_duration(1.0, 3.5) == pytest.approx(2.5)
    assert overlap_duration(1.0, 3.0, 2.0, 4.0) == pytest.approx(1.0)
    assert overlap_duration(1.0, 2.0, 3.0, 4.0) == 0.0
