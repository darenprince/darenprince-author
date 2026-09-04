from __future__ import annotations

from collections import Counter
from typing import Any

from .disfluency import count_filled_pauses, disfluency_rate, repetition_count, token_count
from .evidence import observations_to_evidence
from .schemas import Observation


def build_transcript_evidence(transcript: Any, *, quality: float = 1.0) -> dict[str, Any]:
    """Convert a normalized transcript into traceable, neutral observational evidence."""
    if transcript is None:
        return {"observations": (), "evidence": (), "metrics": {}}

    segments = tuple(getattr(transcript, "segments", ()) or ())
    words = tuple(getattr(transcript, "words", ()) or ())
    tokens = [str(getattr(word, "text", "") or "").strip() for word in words if str(getattr(word, "text", "") or "").strip()]
    if not tokens:
        tokens = [token for token in str(getattr(transcript, "text", "") or "").split() if token]

    total = token_count(tokens)
    fillers = count_filled_pauses(tokens)
    repetitions = repetition_count(tokens)
    timestamped = [word for word in words if getattr(word, "start_s", None) is not None and getattr(word, "end_s", None) is not None]
    confidences = [float(word.confidence) for word in timestamped if getattr(word, "confidence", None) is not None]
    duration_end = max((float(word.end_s) for word in timestamped if word.end_s is not None), default=0.0)
    coverage = len(timestamped) / len(words) if words else 0.0
    mean_confidence = sum(confidences) / len(confidences) if confidences else None

    observations: list[Observation] = []

    def add(feature: str, value: float | None, unit: str, *, segment: tuple[float, float] = (0.0, 0.0), provenance: dict[str, Any] | None = None) -> None:
        if value is None:
            return
        observations.append(
            Observation(
                method_id="linguistic.transcript_evidence",
                feature=feature,
                value=float(value),
                unit=unit,
                segment=segment,
                quality=max(0.0, min(1.0, quality)),
                provenance=provenance or {},
            )
        )

    analysis_span = (0.0, duration_end)
    add("transcript_token_count", float(total), "count", provenance={"source": "timestamped_transcript"})
    add("filled_pause_count", float(fillers), "count", provenance={"source": "timestamped_transcript"})
    add("filled_pause_rate", disfluency_rate(fillers, total), "ratio", provenance={"source": "timestamped_transcript", "token_count": total})
    add("repetition_count", float(repetitions), "count", provenance={"source": "timestamped_transcript"})
    add("repetition_rate", disfluency_rate(repetitions, total), "ratio", provenance={"source": "timestamped_transcript", "token_count": total})
    add("timestamp_coverage", coverage, "ratio", provenance={"source": "timestamped_transcript", "timestamped_word_count": len(timestamped), "word_count": len(words)})
    add("mean_word_confidence", mean_confidence, "probability", provenance={"source": "timestamped_transcript", "confidence_word_count": len(confidences)})
    add("transcript_segment_count", float(len(segments)), "count", provenance={"source": "timestamped_transcript"})

    return {
        "observations": tuple(observations),
        "evidence": tuple(observations_to_evidence(observations, minimum_quality=0.5)),
        "metrics": {
            "token_count": total,
            "filled_pause_count": fillers,
            "filled_pause_rate": disfluency_rate(fillers, total),
            "repetition_count": repetitions,
            "repetition_rate": disfluency_rate(repetitions, total),
            "timestamp_coverage": coverage,
            "mean_word_confidence": mean_confidence,
            "segment_count": len(segments),
            "timeline_end_s": duration_end,
            "token_frequencies": dict(Counter(token.lower() for token in tokens)),
        },
    }
