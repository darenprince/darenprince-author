from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Literal

Split = Literal["train", "calibration", "test", "external"]


@dataclass(frozen=True)
class ResearchRecord:
    record_id: str
    speaker_id: str
    label: int
    split: Split
    task_id: str
    source_dataset: str
    recording_id: str


def validate_records(records: Iterable[ResearchRecord]) -> tuple[ResearchRecord, ...]:
    normalized = tuple(records)
    if not normalized:
        raise ValueError("research dataset must contain at least one record")
    for record in normalized:
        if record.label not in (0, 1):
            raise ValueError(f"record {record.record_id} has a non-binary label")
        if not record.speaker_id.strip():
            raise ValueError(f"record {record.record_id} is missing speaker_id")
        if not record.task_id.strip():
            raise ValueError(f"record {record.record_id} is missing task_id")
        if not record.source_dataset.strip():
            raise ValueError(f"record {record.record_id} is missing source_dataset")
    return normalized


def speaker_split_overlaps(records: Iterable[ResearchRecord]) -> dict[tuple[Split, Split], tuple[str, ...]]:
    normalized = validate_records(records)
    by_split: dict[Split, set[str]] = {}
    for record in normalized:
        by_split.setdefault(record.split, set()).add(record.speaker_id)
    splits = tuple(by_split)
    overlaps: dict[tuple[Split, Split], tuple[str, ...]] = {}
    for index, left in enumerate(splits):
        for right in splits[index + 1 :]:
            shared = tuple(sorted(by_split[left] & by_split[right]))
            if shared:
                overlaps[(left, right)] = shared
    return overlaps


def assert_speaker_disjoint(records: Iterable[ResearchRecord], *, pairs: tuple[tuple[Split, Split], ...] | None = None) -> None:
    overlaps = speaker_split_overlaps(records)
    if pairs is None:
        if overlaps:
            raise ValueError(f"speaker leakage detected across splits: {overlaps}")
        return
    failures = {pair: overlaps[pair] for pair in pairs if pair in overlaps}
    if failures:
        raise ValueError(f"speaker leakage detected across required split pairs: {failures}")


def dataset_summary(records: Iterable[ResearchRecord]) -> dict[str, object]:
    normalized = validate_records(records)
    speakers_by_split: dict[str, set[str]] = {}
    labels_by_split: dict[str, dict[int, int]] = {}
    for record in normalized:
        speakers_by_split.setdefault(record.split, set()).add(record.speaker_id)
        labels = labels_by_split.setdefault(record.split, {0: 0, 1: 0})
        labels[record.label] += 1
    return {
        "record_count": len(normalized),
        "speaker_count": len({record.speaker_id for record in normalized}),
        "task_count": len({record.task_id for record in normalized}),
        "source_dataset_count": len({record.source_dataset for record in normalized}),
        "splits": {
            split: {
                "record_count": sum(1 for record in normalized if record.split == split),
                "speaker_count": len(speakers),
                "label_counts": labels_by_split[split],
            }
            for split, speakers in sorted(speakers_by_split.items())
        },
        "speaker_disjoint": not bool(speaker_split_overlaps(normalized)),
    }
