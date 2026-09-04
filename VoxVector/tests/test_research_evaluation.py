import pytest

from voxvector.research_evaluation import auprc, auroc, evaluate_binary


def test_binary_evaluation_reports_discrimination_calibration_and_matrix():
    labels = [0, 0, 1, 1]
    scores = [0.1, 0.3, 0.7, 0.9]
    result = evaluate_binary(labels, scores, threshold=0.5)
    assert result.auroc == pytest.approx(1.0)
    assert result.auprc == pytest.approx(1.0)
    assert result.sensitivity == pytest.approx(1.0)
    assert result.specificity == pytest.approx(1.0)
    assert result.precision == pytest.approx(1.0)
    assert result.recall == pytest.approx(1.0)
    assert result.brier_score == pytest.approx(0.05)
    assert result.confusion_matrix == ((2, 0), (0, 2))


def test_auc_returns_none_when_one_class_is_absent():
    labels = [1, 1, 1]
    scores = [0.2, 0.5, 0.9]
    assert auroc(labels, scores) is None
    assert auprc(labels, scores) == pytest.approx(1.0)


def test_metric_inputs_are_guarded():
    with pytest.raises(ValueError):
        evaluate_binary([0, 1], [0.1, 1.2])
    with pytest.raises(ValueError):
        evaluate_binary([0, 2], [0.1, 0.9])
