# VoxVector Research Data and Evaluation Architecture — 2026-09-04

## Purpose

This record defines the software contract for moving from engineering evidence into a reproducible research evaluation program. It does not assert that a dataset, classifier, or deception inference has been validated.

## Data contract

Research records are represented by `voxvector.research_dataset.ResearchRecord` and must include:

- record identity;
- speaker identity;
- binary task label;
- declared split (`train`, `calibration`, `test`, or `external`);
- operational task identifier;
- source dataset identifier;
- recording identity.

The contract rejects missing speaker/task/dataset identifiers and non-binary labels.

## Leakage control

The software contract can inspect speaker overlap across declared splits and fail closed when speaker identity crosses partitions. At minimum, development, calibration, and final evaluation speakers should remain disjoint for speaker-sensitive speech models.

Dataset source, task, recording, prompt, language, channel, and collection-condition metadata should be preserved outside the minimal record contract so shortcut learning and domain shift can be audited.

## Evaluation contract

`voxvector.research_evaluation.evaluate_binary` is the metric layer for future held-out predictions. It reports:

- AUROC;
- AUPRC;
- sensitivity and specificity;
- precision and recall;
- confusion matrix at a declared threshold;
- Brier score;
- expected calibration error.

Probability inputs are required to be finite and bounded in `[0, 1]`. The evaluation module does not train models.

## Model promotion sequence

The intended future sequence is:

`data contract → speaker-disjoint split → candidate model → calibration set → frozen test set → held-out metrics → uncertainty intervals → subgroup/condition analysis → leakage audit → external/cross-dataset evaluation → calibrated model artifact → validation decision`

A successful internal metric run is not sufficient for a production deception claim.

## Evidence architecture

VoxVector must preserve independent evidence families and their provenance. Planned multimethod inputs include acoustic, prosodic/voice-quality, temporal, linguistic, speaker, and contextual evidence. Feature contribution must be evaluated by ablation or controlled comparison rather than assumed from feature presence.

The inference layer must retain:

- source and method provenance;
- reliability/quality state;
- evidence direction;
- convergence/conflict information;
- alternative explanations;
- uncertainty;
- dataset and task provenance.

## Current implementation status

Implemented software foundations now include:

- normalized transcript evidence extraction;
- synchronized timestamped transcript review;
- research readiness gate;
- speaker-disjoint dataset contract;
- binary research evaluation metrics;
- fail-closed candidate classification boundary.

Still required before research-backed inference:

- controlled faster-whisper execution on known fixture audio;
- controlled speaker diarization execution where the required runtime path is deliberately enabled;
- persisted artifact readback and synchronization verification;
- a task-specific labeled dataset with provenance;
- speaker-disjoint train/calibration/test partitioning;
- frozen operational labels and evaluation protocol;
- leakage and confounder audit;
- calibrated candidate model;
- held-out and external evaluation;
- documented uncertainty and robustness results.
