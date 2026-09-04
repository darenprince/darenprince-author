import pytest

from voxvector.research_dataset import ResearchRecord, assert_speaker_disjoint, dataset_summary


def record(record_id, speaker_id, split):
    return ResearchRecord(record_id, speaker_id, 0, split, "task-1", "dataset-a", record_id)


def test_speaker_disjoint_contract_accepts_separate_speakers():
    records = [record("r1", "s1", "train"), record("r2", "s2", "calibration"), record("r3", "s3", "test")]
    assert_speaker_disjoint(records)
    summary = dataset_summary(records)
    assert summary["speaker_disjoint"] is True
    assert summary["record_count"] == 3


def test_speaker_leakage_is_rejected():
    records = [record("r1", "s1", "train"), record("r2", "s1", "test")]
    with pytest.raises(ValueError, match="speaker leakage"):
        assert_speaker_disjoint(records)


def test_dataset_requires_binary_labels_and_speaker_identity():
    bad_label = ResearchRecord("r1", "s1", 2, "train", "task-1", "dataset-a", "r1")
    with pytest.raises(ValueError, match="non-binary"):
        dataset_summary([bad_label])
