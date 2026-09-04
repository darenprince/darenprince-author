# VoxVector Research Inference Readiness Plan — 2026-09-04

## Purpose

This document defines the engineering gate between a working multimethod analysis pipeline and any future research-backed deception inference. It is not itself a validation result and does not authorize a deception score.

## Current engineering position

The product now has a connected case/run spine, timestamped transcript artifacts through the configured faster-whisper path, a synchronized waveform/transcript review surface, an explicit software gate for inference readiness, and a pure-Python/NumPy research evaluation metrics module. Controlled provider execution and artifact readback remain required before the speech stages are promoted to functional production execution.

## Inference architecture

The future inferential workflow must remain:

`eligibility → evidence acquisition → evidence normalization → candidate model → calibration/uncertainty → final disposition`

A model must never bypass eligibility, provenance, evidence provenance, or the validation/calibration gate.

## Software readiness gate

The canonical `voxvector.research_readiness` module defines the minimum gate fields:

- operational task definition
- frozen label protocol
- speaker-disjoint partitions
- calibration separated from final test data
- frozen final evaluation set
- leakage audit complete
- uncertainty reporting defined
- external or cross-dataset evaluation

The gate is deliberately fail-closed. Provider configuration, a successful software build, or an internal model result cannot mark the gate ready by itself.

## Evidence requirements

A production candidate model should be evaluated against independent evidence families rather than a single vocal signal. The current readiness gate expects acoustic, prosodic/voice-quality, temporal, linguistic, and speaker evidence families, plus a timestamped transcript and speaker artifact where the task requires them.

Presence of a feature is not evidence that the feature is causally or diagnostically specific to deception. The inference layer must preserve the contributing methods, direction, quality, alternative explanations, and conflict/convergence structure.

## Dataset design requirements

Before fitting or selecting a classifier:

1. Define the operational target and label construction protocol before model training.
2. Keep speakers disjoint across training, calibration, and final evaluation partitions.
3. Track recording source, task, language, channel, prompt, context, and collection condition so dataset shortcuts can be measured.
4. Freeze the final evaluation set before model selection.
5. Keep calibration data separate from the final test set.
6. Report subgroup and condition performance where sample sizes support it.
7. Preserve dataset and label provenance for every record used in development or evaluation.

The speaker-disjoint requirement is critical because speech systems can carry substantial speaker-specific information. Leakage can make a model appear to generalize when it has learned identity or recording context instead of task-relevant signal.

## Required evaluation metrics

The canonical `voxvector.research_evaluation` module now provides guarded utilities for future validation runs:

- AUROC and AUPRC;
- sensitivity, specificity, precision, recall, and confusion matrix at a declared threshold;
- Brier score;
- expected calibration error;
- structured binary evaluation output combining the above.

These utilities accept only binary labels and finite probability scores in `[0, 1]`. They calculate metrics; they do not train a classifier or authorize an inference result.

At minimum, future binary candidate models should report these metrics on a held-out speaker-disjoint evaluation set, together with uncertainty intervals, condition/subgroup analysis where supported, and ablation/contribution analysis.

Accuracy alone is insufficient for production inference.

## Calibration and uncertainty

A probability output must be calibrated on data that were not used to fit the classifier and must have a documented calibration procedure. Calibration evidence must be reported separately from discrimination evidence.

The runtime must expose uncertainty and alternative hypotheses rather than treating a calibrated probability as certainty.

## External validation and robustness

A model should not be promoted to validated inferential status from a single internal split. The validation program should include held-out speakers, cross-condition evaluation, and external or cross-dataset replication where the data and licensing permit.

Expected confounders include speaker identity, recording device/channel, environment, prompt/task, language, demographic composition, preparation/motivation, and dataset source.

## Research foundation from current literature

The deception-detection literature contains heterogeneous tasks, datasets, features, and evaluation designs. Large systematic reviews emphasize the importance of dataset choice and evaluation design, while paraverbal meta-analysis reports heterogeneous associations that vary with content, preparation, motivation, sanctioning, experimental design, and operationalization.

Representative resources for the validation program include the Columbia X-Cultural Deception Corpus, Real-life Trial Deception Detection data used across the reviewed literature, Bag-of-Lies, DOLOS, and recent multimodal deception benchmarks. These datasets must be reviewed for licensing, label provenance, task compatibility, and leakage risk before use.

Relevant references:

- Constâncio et al., *Deception detection with machine learning: A systematic review and statistical analysis*, PLOS ONE, 2023. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0281323
- *Deception detection using machine learning (ML) and deep learning (DL) techniques: A systematic review*, Natural Language Processing Journal, 2024. https://doi.org/10.1016/j.nlp.2024.100057
- Sporer, *Paraverbal indicators of deception: A meta-analytic synthesis*, Applied Cognitive Psychology, 2006. https://doi.org/10.1002/acp.1190
- Columbia X-Cultural Deception Corpus. https://www.cs.columbia.edu/speech/cxd/
- Gupta et al., *Bag-Of-Lies: A Multimodal Dataset for Deception Detection*, CVPR Workshops, 2019. https://openaccess.thecvf.com/content_CVPRW_2019/html/CV-COPS/Gupta_Bag-Of-Lies_A_Multimodal_Dataset_for_Deception_Detection_CVPRW_2019_paper.html
- DOLOS Dataset for Audio-Visual Multimodal Deception Detection, ROSE Lab, NTU. https://rose1.ntu.edu.sg/dataset/DOLOS/

## Promotion rule

The future production inference status ladder is:

`implemented → integrated → tested → externally evaluated → calibrated → validated`

Only after the required validation evidence exists may a research-backed inferential model be connected to candidate classification and final disposition. Until then, the runtime remains observational and guarded.
