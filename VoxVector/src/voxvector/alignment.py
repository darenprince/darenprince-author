from __future__ import annotations

from dataclasses import dataclass, replace

from .evidence_acquisition import DiarizationResult, TranscriptResult, TranscriptWord


@dataclass(frozen=True)
class AlignedWord:
    text: str
    start_s: float | None
    end_s: float | None
    confidence: float | None
    speaker_id: str | None
    speaker_overlap: float = 0.0


@dataclass(frozen=True)
class MultimodalTimeline:
    words: tuple[AlignedWord, ...]
    speaker_segments: tuple[dict, ...]
    limitations: tuple[str, ...] = ()


def _overlap(start_a: float, end_a: float, start_b: float, end_b: float) -> float:
    return max(0.0, min(end_a, end_b) - max(start_a, start_b))


def align_transcript_to_speakers(
    transcript: TranscriptResult,
    diarization: DiarizationResult | None,
) -> MultimodalTimeline:
    if diarization is None or not diarization.segments:
        words = tuple(
            AlignedWord(w.text, w.start_s, w.end_s, w.confidence, w.speaker_id, 0.0)
            for w in transcript.words
        )
        return MultimodalTimeline(
            words=words,
            speaker_segments=(),
            limitations=("No diarization result was available for speaker attribution.",),
        )

    aligned: list[AlignedWord] = []
    for word in transcript.words:
        if word.start_s is None or word.end_s is None or word.end_s <= word.start_s:
            aligned.append(AlignedWord(word.text, word.start_s, word.end_s, word.confidence, None, 0.0))
            continue
        candidates = []
        for segment in diarization.segments:
            overlap = _overlap(word.start_s, word.end_s, segment.start_s, segment.end_s)
            if overlap > 0:
                candidates.append((overlap, segment.speaker_id))
        if not candidates:
            aligned.append(AlignedWord(word.text, word.start_s, word.end_s, word.confidence, None, 0.0))
            continue
        overlap, speaker_id = max(candidates, key=lambda item: item[0])
        aligned.append(
            AlignedWord(
                word.text,
                word.start_s,
                word.end_s,
                word.confidence,
                speaker_id,
                min(1.0, overlap / max(word.end_s - word.start_s, 1e-9)),
            )
        )

    return MultimodalTimeline(
        words=tuple(aligned),
        speaker_segments=[
            {
                "speaker_id": item.speaker_id,
                "start_s": item.start_s,
                "end_s": item.end_s,
                "confidence": item.confidence,
            }
            for item in diarization.segments
        ],
        limitations=tuple(diarization.limitations),
    )
