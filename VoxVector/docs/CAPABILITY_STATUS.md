# VoxVector Capability Status

This document prevents a common documentation error: an unimplemented feature is not an obsolete feature. A capability mentioned anywhere in the VoxVector research, product, or architecture record remains part of project context until explicitly retired by a project decision.

## Status vocabulary

- **Implemented**: code exists and has repository-level QA coverage or deterministic boundary tests.
- **Integrated**: implemented and currently orchestrated by the primary `VoxVectorPipeline`.
- **Implemented, not primary integrated**: reusable code exists but is not currently emitted by the primary pipeline.
- **Planned research**: documented candidate retained for future implementation, evaluation, or validation.
- **Validated inferential**: reserved for a method that has completed the VoxVector validation requirements. None currently has this status for deception inference.
- **Retired**: removed from the active roadmap only by an explicit documented decision. No feature is retired merely because it is not yet built.

## Current implemented and integrated observations

| Capability | Status | Notes |
|---|---|---|
| RMS / energy | Integrated | Primary acoustic pipeline |
| Relative intensity / dB | Integrated | Primary acoustic pipeline |
| Zero-crossing rate | Integrated | Primary acoustic pipeline |
| Spectral centroid | Integrated | FFT-width aware |
| Spectral spread | Integrated | FFT-width aware |
| Fundamental frequency | Integrated | Observational F0 estimation |
| Harmonicity / periodicity | Integrated | Acoustic observation |
| F0 and intensity dynamics | Integrated | Range, dispersion, slope, delta |
| HNR | Integrated | Derived from usable harmonicity |
| Spectral flux | Integrated | Canonical spectral implementation |
| Spectral rolloff | Integrated | Canonical spectral implementation |
| Formant candidate tracking | Integrated | Nyquist bounded; not phonetic validated |
| Pause topology | Integrated | Count, density, longest, median, p90, voiced-run mean |
| Response latency | Integrated when supplied | Requires explicit timing boundaries |
| Transcript disfluency | Integrated when supplied | Filled pauses, repetitions, rates |
| Within-speaker baseline | Integrated when supplied | Independent baseline required |
| Evidence grouping | Integrated | Neutral observational evidence |
| Candidate classification | Integrated boundary | Indeterminate-only |
| Final disposition gate | Integrated boundary | Abstain / insufficient evidence |
| Reliability gate | Integrated | Eligibility control only |

## Implemented but not primary-pipeline integrated

- MFCC / cepstral coefficients
- Cepstral summary utilities
- Local jitter from supplied periods
- Local shimmer from supplied cycle amplitudes
- Pulse-period utilities
- Generic temporal observation utilities such as turn duration and overlap duration

These are real implementation assets, not roadmap deletions.

## Planned research and future development

The following remain explicitly planned or research-backed:

### Acoustic and interpretable feature expansion
- openSMILE / eGeMAPS-style descriptor layer
- broader spectral tilt and harmonic measures
- LPCC
- GFCC
- Teager Energy Operator descriptors
- richer voice-quality and glottal-source measures
- stronger channel and recording-condition quality controls

### Glottal-source analysis
- IAIF
- NAQ
- CQ
- OQ
- H1-H2 and related source/tilt measures

### Representation learning
- WavLM
- wav2vec 2.0
- HuBERT
- speaker and recording-condition leakage evaluation

### Temporal and deep modeling
- Conformer
- Audio Spectrogram Transformer
- temporal attention
- sequence models
- longer-context modeling

### Linguistic analysis
- production-grade ASR
- word and phoneme timestamps
- forced alignment
- transformer linguistic representations
- contradiction and consistency analysis
- repair and false-start detection
- hedging and certainty measures
- lexical diversity, negation, and discourse structure
- richer question/answer alignment

### Speaker and interaction analysis
- diarization
- speaker/channel separability controls
- richer turn-taking and overlap analysis
- baseline selection and leakage controls

### Cross-modal future work
- facial action units
- audio/video synchronization
- cross-modal fusion
- synchronized multimodal evidence analysis

### Synthetic-media detection
- spectral and phase artifacts
- high-frequency generation artifacts
- codec and resampling fingerprints
- vocoder, TTS, and voice-conversion signatures
- benchmark families with provenance and licensing review

### Validation and inference infrastructure
- dependence-aware multimethod convergence
- calibrated uncertainty
- explicit abstention thresholds
- speaker-disjoint and cross-dataset evaluation
- recording-condition stress tests
- identity sensitivity analysis
- subgroup and language robustness where applicable
- externally replicated evaluation
- validated candidate classifiers
- eventual deception probability and confidence-matrix logic only after the required validation gates are satisfied

## Scientific rule

No item above becomes a deception indicator simply because it is implemented. No feature, representation, model, or classifier is promoted to validated inference by documentation alone.
