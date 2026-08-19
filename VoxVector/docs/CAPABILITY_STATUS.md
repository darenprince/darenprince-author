# VoxVector Capability Status

This document distinguishes the product we are building from what the current runtime has already implemented and what science has already validated. An unimplemented capability is not an obsolete capability.

## Product objective

**VoxVector is being built as a vocal and audio deception detection system.** The intended analytical product combines multiple evidence families to identify patterns that may support or contradict a deception hypothesis in defined interview or conversational tasks.

The current implementation is an observational foundation. It must not be represented as scientifically validated deception detection until the required validation program is completed.

## Status vocabulary

- **Implemented**: code exists with repository-level QA coverage or deterministic boundary tests.
- **Integrated**: implemented and currently orchestrated by the primary `VoxVectorPipeline`.
- **Implemented, not primary integrated**: reusable code exists but is not currently emitted by the primary pipeline.
- **Planned research**: documented candidate retained for future implementation, evaluation, or validation.
- **Validated inferential**: reserved for a method or model that has completed the VoxVector validation requirements for a defined task and population.
- **Retired**: removed from the active roadmap only by an explicit documented decision.

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
| MFCC / cepstral coefficients | Integrated | 13 coefficient means emitted per bounded audio chunk stream |
| Formant candidate tracking | Integrated | FFT boundary hardened; not phonetic validated |
| Pause topology | Integrated | Count, density, longest, median, p90, voiced-run mean |
| Response latency | Integrated when supplied | Requires explicit timing boundaries |
| Transcript disfluency | Integrated when supplied | Filled pauses, repetitions, rates |
| Within-speaker baseline | Integrated when supplied | Independent baseline required |
| Evidence grouping | Integrated | Neutral observational evidence |
| Candidate classification | Integrated boundary | Indeterminate-only |
| Final disposition gate | Integrated boundary | Abstain / insufficient evidence |
| Reliability gate | Integrated | Eligibility control only |

## Operational reliability and observability status

| Area | Status | Current state |
|---|---|---|
| Render build | Working | Canonical `VoxVector` root builds successfully on Python 3.11.9 |
| Render process startup | Working | Uvicorn starts `api.app:app` successfully |
| `/health` | Working | Repeated HTTP 200 responses observed |
| Runtime self-test | Working | Reported `passed` during successful deployment |
| Durable diagnostic storage adapter | Implemented | Supabase Storage adapter with private JSON bucket support |
| Request correlation | Implemented | `/v1/analyze` receives a request ID and returns `X-Request-ID` |
| Lifecycle diagnostics | Implemented | Start, completion, rejection, stage, and exception events |
| `/v1/analyze` normal-path stability | **Open incident** | A public request returned HTTP 502; origin cause remains under investigation |
| Resource safeguards | Planned next | Must fail safely before origin process termination |
| Full CI after latest fixes | Pending | Fresh green CI evidence is required |
| Production storage configuration | Pending | Render must receive the Supabase URL and service-role secret |

## Frontend application status

| Area | Status | Current state |
|---|---|---|
| React application shell | Planned | Architecture approved; not yet implemented in `VoxVector/` |
| shadcn/ui component foundation | Planned | Approved UI foundation; not yet installed/implemented in VoxVector |
| Tailwind CSS design system | Planned | Approved styling layer; not yet established in VoxVector frontend |
| Motion for React | Planned | Approved animation layer; animations must follow real API/data state |
| TanStack Query | Planned | Approved server-state layer; API contracts must derive from actual FastAPI schemas |
| Developer Console | Planned | Functional `/developer` console is next frontend milestone |
| Analysis Workspace | Planned | Must consume real `/v1/analyze` state and preserve analytical stage separation |
| Public application shell | Planned | Landing/product/docs experience to follow foundation and console work |
| Browser/end-to-end verification | Planned | Required before frontend workflows are considered complete |

## Implemented but not primary-pipeline integrated

- Cepstral summary utilities beyond the primary MFCC observation path
- Local jitter from supplied periods
- Local shimmer from supplied cycle amplitudes
- Pulse-period utilities
- Generic temporal observation utilities such as turn duration and overlap duration

These are real implementation assets and remain available for the deception-detection development program.

## Planned research and future development

### Acoustic and voice-quality expansion
- openSMILE / eGeMAPS-style descriptor layer
- broader spectral tilt and harmonic measures
- LPCC
- GFCC
- Teager Energy Operator descriptors
- richer voice-quality and glottal-source measures
- stronger channel and recording-condition quality controls
- IAIF, NAQ, CQ, OQ, H1-H2 and related source measures

### Learned representations and temporal modeling
- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention and sequence models
- speaker and recording-condition leakage evaluation

### Linguistic and conversational intelligence
- production-grade ASR
- word and phoneme timestamps
- forced alignment
- transformer linguistic representations
- contradiction and consistency analysis
- repair and false-start detection
- hedging and certainty measures
- lexical diversity, negation, and discourse structure
- richer question/answer alignment
- transcript confidence propagation into reliability

### Speaker and interaction analysis
- diarization
- speaker/channel separability controls
- richer turn-taking and overlap analysis
- baseline selection and leakage controls

### Multimodal and media integrity
- facial action units
- audio/video synchronization
- cross-modal fusion
- synthetic-speech detection and provenance-aware benchmark evaluation

### Deception inference infrastructure
- dependence-aware multimethod convergence
- calibrated uncertainty
- explicit abstention thresholds
- speaker-disjoint and cross-dataset evaluation
- recording-condition stress tests
- identity sensitivity analysis
- subgroup/language robustness where applicable
- externally replicated evaluation
- validated candidate classifiers
- eventual calibrated deception probability and confidence-matrix logic
- case-level evidence synthesis and final disposition controls

## Scientific rule

No item becomes a deception indicator simply because it is implemented or researched. No feature, representation, model, or classifier is promoted to validated deception inference by documentation alone.

The product objective remains deception detection; the scientific discipline determines when and how that objective can be responsibly enabled in the runtime.

## Current checkpoint

The active engineering checkpoint is `docs/PROJECT_CHECKPOINT_2026-08-19.md`. It is the handoff record for current progress, open incidents, and the next verification sequence.

The frontend architecture and implementation contract are defined in `docs/UI_APPLICATION_ARCHITECTURE.md`.
