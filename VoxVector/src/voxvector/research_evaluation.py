from __future__ import annotations

from dataclasses import dataclass
from typing import Sequence

import numpy as np


@dataclass(frozen=True)
class BinaryEvaluation:
    auroc: float | None
    auprc: float | None
    sensitivity: float | None
    specificity: float | None
    precision: float | None
    recall: float | None
    brier_score: float | None
    expected_calibration_error: float | None
    confusion_matrix: tuple[tuple[int, int], tuple[int, int]]


@dataclass(frozen=True)
class ValidationManifest:
    task_definition: str
    label_protocol: str
    speaker_disjoint: bool
    calibration_is_separate: bool
    final_evaluation_is_frozen: bool
    leakage_audit_complete: bool
    uncertainty_defined: bool
    external_or_cross_dataset_evaluation: bool


def _as_binary_arrays(labels: Sequence[int], scores: Sequence[float]) -> tuple[np.ndarray, np.ndarray]:
    y = np.asarray(labels, dtype=int).reshape(-1)
    p = np.asarray(scores, dtype=float).reshape(-1)
    if y.size == 0 or y.size != p.size:
        raise ValueError("labels and scores must be non-empty and have equal length")
    if not np.all(np.isin(y, (0, 1))):
        raise ValueError("labels must contain only 0 or 1")
    if not np.all(np.isfinite(p)) or np.any((p < 0) | (p > 1)):
        raise ValueError("scores must be finite probabilities in [0, 1]")
    return y, p


def _auc(x: np.ndarray, y: np.ndarray) -> float | None:
    if x.size < 2 or y.size < 2:
        return None
    return float(np.trapezoid(y, x))


def auroc(labels: Sequence[int], scores: Sequence[float]) -> float | None:
    y, p = _as_binary_arrays(labels, scores)
    positives = int(y.sum())
    negatives = int(y.size - positives)
    if positives == 0 or negatives == 0:
        return None
    order = np.argsort(-p, kind="mergesort")
    sorted_y = y[order]
    sorted_p = p[order]
    distinct = np.r_[True, sorted_p[1:] != sorted_p[:-1]]
    thresholds = np.flatnonzero(distinct)
    tp = np.cumsum(sorted_y)[thresholds]
    fp = np.cumsum(1 - sorted_y)[thresholds]
    tpr = np.r_[0.0, tp / positives]
    fpr = np.r_[0.0, fp / negatives]
    return _auc(fpr, tpr)


def auprc(labels: Sequence[int], scores: Sequence[float]) -> float | None:
    y, p = _as_binary_arrays(labels, scores)
    positives = int(y.sum())
    if positives == 0:
        return None
    order = np.argsort(-p, kind="mergesort")
    sorted_y = y[order]
    sorted_p = p[order]
    distinct = np.r_[True, sorted_p[1:] != sorted_p[:-1]]
    idx = np.flatnonzero(distinct)
    tp = np.cumsum(sorted_y)[idx]
    fp = np.cumsum(1 - sorted_y)[idx]
    recall_values = tp / positives
    precision_values = tp / np.maximum(tp + fp, 1)
    recall = np.r_[0.0, recall_values]
    precision = np.r_[precision_values[0] if precision_values.size else 0.0, precision_values]
    area = float(np.trapezoid(precision, recall))
    return max(0.0, min(1.0, area))


def confusion_matrix(labels: Sequence[int], scores: Sequence[float], threshold: float = 0.5) -> tuple[tuple[int, int], tuple[int, int]]:
    y, p = _as_binary_arrays(labels, scores)
    if not 0 <= threshold <= 1:
        raise ValueError("threshold must be in [0, 1]")
    pred = (p >= threshold).astype(int)
    tn = int(np.sum((y == 0) & (pred == 0)))
    fp = int(np.sum((y == 0) & (pred == 1)))
    fn = int(np.sum((y == 1) & (pred == 0)))
    tp = int(np.sum((y == 1) & (pred == 1)))
    return ((tn, fp), (fn, tp))


def _ratio(numerator: int, denominator: int) -> float | None:
    return float(numerator / denominator) if denominator else None


def brier_score(labels: Sequence[int], scores: Sequence[float]) -> float:
    y, p = _as_binary_arrays(labels, scores)
    return float(np.mean((p - y) ** 2))


def expected_calibration_error(labels: Sequence[int], scores: Sequence[float], bins: int = 10) -> float:
    y, p = _as_binary_arrays(labels, scores)
    if bins <= 0:
        raise ValueError("bins must be positive")
    edges = np.linspace(0.0, 1.0, bins + 1)
    total = float(y.size)
    error = 0.0
    for index in range(bins):
        left, right = edges[index], edges[index + 1]
        mask = (p >= left) & ((p <= right) if index == bins - 1 else (p < right))
        if not np.any(mask):
            continue
        confidence = float(np.mean(p[mask]))
        accuracy = float(np.mean(y[mask]))
        error += float(np.sum(mask)) / total * abs(accuracy - confidence)
    return float(error)


def evaluate_binary(
    labels: Sequence[int],
    scores: Sequence[float],
    *,
    threshold: float = 0.5,
    calibration_bins: int = 10,
) -> BinaryEvaluation:
    matrix = confusion_matrix(labels, scores, threshold)
    (tn, fp), (fn, tp) = matrix
    return BinaryEvaluation(
        auroc=auroc(labels, scores),
        auprc=auprc(labels, scores),
        sensitivity=_ratio(tp, tp + fn),
        specificity=_ratio(tn, tn + fp),
        precision=_ratio(tp, tp + fp),
        recall=_ratio(tp, tp + fn),
        brier_score=brier_score(labels, scores),
        expected_calibration_error=expected_calibration_error(labels, scores, calibration_bins),
        confusion_matrix=matrix,
    )
