from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ResponseLatency:
    """Question-to-response timing observation."""

    first_speech_s: float
    first_substantive_s: float | None
    filler_before_content_s: float | None


def response_latency(question_end_s: float, first_speech_s: float, first_substantive_s: float | None = None) -> ResponseLatency:
    if not all(isinstance(v, (int, float)) for v in (question_end_s, first_speech_s)):
        raise TypeError("timestamps must be numeric")
    if first_speech_s < question_end_s:
        raise ValueError("first_speech_s must not precede question_end_s")
    if first_substantive_s is not None:
        if first_substantive_s < first_speech_s or first_substantive_s < question_end_s:
            raise ValueError("first_substantive_s must not precede speech or question end")
    first_latency = float(first_speech_s - question_end_s)
    substantive_latency = None if first_substantive_s is None else float(first_substantive_s - question_end_s)
    filler_latency = None if substantive_latency is None else substantive_latency - first_latency
    return ResponseLatency(first_latency, substantive_latency, filler_latency)


def turn_duration(start_s: float, end_s: float) -> float:
    if end_s < start_s:
        raise ValueError("end_s must not precede start_s")
    return float(end_s - start_s)


def overlap_duration(a_start_s: float, a_end_s: float, b_start_s: float, b_end_s: float) -> float:
    if a_end_s < a_start_s or b_end_s < b_start_s:
        raise ValueError("turn end must not precede turn start")
    return float(max(0.0, min(a_end_s, b_end_s) - max(a_start_s, b_start_s)))
