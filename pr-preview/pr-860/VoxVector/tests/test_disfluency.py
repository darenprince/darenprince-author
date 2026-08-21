import pytest

from voxvector.disfluency import count_filled_pauses, disfluency_rate, repetition_count, token_count


def test_filled_pause_count_is_case_insensitive():
    assert count_filled_pauses(["I", "um", "think", "UH", "yes"]) == 2


def test_repetition_count():
    assert repetition_count(["I", "I", "really", "really"]) == 2


def test_disfluency_rate_handles_empty_tokens():
    assert disfluency_rate(0, 0) != disfluency_rate(0, 1)
    assert disfluency_rate(2, 10) == pytest.approx(0.2)


def test_invalid_counts_fail_closed():
    with pytest.raises(ValueError):
        disfluency_rate(11, 10)


def test_token_count_ignores_blank_tokens():
    assert token_count(["", "hello", " ", "world"]) == 2
