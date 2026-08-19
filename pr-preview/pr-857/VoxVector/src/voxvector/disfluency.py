from __future__ import annotations

from dataclasses import dataclass
from typing import Sequence


@dataclass(frozen=True)
class DisfluencyCounts:
    filled_pauses: int = 0
    false_starts: int = 0
    repairs: int = 0
    repetitions: int = 0
    fragments: int = 0
    abandoned_phrases: int = 0

    @property
    def total(self) -> int:
        return sum((self.filled_pauses, self.false_starts, self.repairs, self.repetitions, self.fragments, self.abandoned_phrases))


def count_filled_pauses(tokens: Sequence[str], fillers: set[str] | None = None) -> int:
    fillers = {"um", "uh", "er", "erm", "hmm"} if fillers is None else {str(x).lower() for x in fillers}
    return sum(str(token).strip().lower() in fillers for token in tokens)


def repetition_count(tokens: Sequence[str]) -> int:
    normalized = [str(token).strip().lower() for token in tokens if str(token).strip()]
    return sum(a == b for a, b in zip(normalized, normalized[1:]))


def token_count(tokens: Sequence[str]) -> int:
    return sum(bool(str(token).strip()) for token in tokens)


def disfluency_rate(count: int, token_count_value: int) -> float:
    if count < 0 or token_count_value < 0:
        raise ValueError("counts must be non-negative")
    if count > token_count_value and token_count_value > 0:
        raise ValueError("disfluency count cannot exceed token count")
    return float("nan") if token_count_value == 0 else float(count / token_count_value)
