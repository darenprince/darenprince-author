# VoxVector Capability Status

This document distinguishes the product end state from current implementation state and scientific validation state.

An unimplemented capability remains active product scope.

## Product objective

VoxVector is being built as a vocal and audio deception detection system.

The intended product combines multiple evidence families through a connected case centered pipeline.

## Status vocabulary

- **Implemented** — code exists with repository QA coverage or deterministic boundary tests.
- **Integrated** — implemented and orchestrated by the primary `VoxVectorPipeline`.
- **Implemented but not primary integrated** — reusable implementation exists outside the primary output contract.
- **Planned research** — retained product capability awaiting implementation evaluation or validation.
- **Validated inferential** — reserved for a defined method and task that has completed the validation program.
- **Retired** — removed only through an explicit project decision.

## Canonical 21 stage capability map

| Stage | Current state | Product target |
|---|---|---|
| File Upload / Ingest | Integrated | Durable multi format case intake |
| File Decode and Normalization | Integrated | Canonical normalized media pipeline |
| Provenance and Integrity | Integrated | Immutable source and run provenance |
| Channel and Recording Assessment | Integrated / expanding | Full recording and artifact assessment |
| Speaker Identification / Diarization | Planned research | Production speaker aware analysis |
| Speech Segmentation | **Integrated** | Production speech region segmentation |
| Transcription Generation | Planned research | Production timestamped ASR |
| Transcript Alignment | Planned research | Word and audio synchronization |
| Eligibility and Reliability | Integrated | Complete eligibility and reliability gate |
| Acoustic Feature Extraction | Integrated | Expanded acoustic observation layer |
| Prosodic and Voice Quality Analysis | Integrated foundation | Expanded prosodic and source analysis |
| Temporal and Pause Analysis | Integrated | Expanded interaction timing |
| Linguistic and Disfluency Analysis | Integrated when transcript supplied | Production linguistic intelligence |
| Question / Answer Alignment | Integrated when supplied | Full conversational alignment |
| Within Speaker Baseline | Integrated when supplied | Persistent baseline workflows |
| Cross Method Evidence Assembly | Integrated | Expanded evidence graph |
| Evidence Convergence and Conflict | Integrated foundation | Dependence aware multimethod synthesis |
| Candidate Classification | Integrated boundary | Validated task specific candidate models |
| Validation and Calibration Gate | Planned research | Production validation gate |
| Final Classification / Disposition | Integrated boundary | Validated final disposition architecture |
| Audit and Provenance Output | Integrated | Complete auditable case package |

## Speech segmentation implementation

Stage 06 now has a real deterministic engine under `src/voxvector/speech_segmentation.py` and is integrated into `VoxVectorPipeline`.

The current implementation:

- consumes frame level RMS energy
- consumes frame level voicing derived from F0
- establishes a relative energy threshold
- removes very short active runs
- bridges short inactive gaps
- emits timestamped speech segments
- emits a segmentation confidence value
- assigns a method ID for provenance
- adds speech segment count
- adds total speech duration
- adds speech activity ratio
- persists segment IDs in the analysis result contract

This is the first concrete implementation of the speaker/transcript dependency path. It provides speech intervals that later speaker diarization and transcription stages can consume.

## Current primary observations

| Method | Status | Primary output |
|---|---|---|
| RMS / energy | Integrated | acoustic observation |
| Relative intensity / dB | Integrated | acoustic observation |
| Zero crossing rate | Integrated | acoustic observation |
| Spectral centroid | Integrated | spectral observation |
| Spectral spread | Integrated | spectral observation |
| Fundamental frequency | Integrated | F0 observation |
| Harmonicity | Integrated | periodicity observation |
| F0 dynamics | Integrated | prosodic observation |
| Intensity dynamics | Integrated | prosodic observation |
| HNR | Integrated | voice quality observation |
| Spectral flux | Integrated | spectral observation |
| Spectral rolloff | Integrated | spectral observation |
| MFCC | Integrated | 13 coefficient observations |
| Formant candidate tracking | Integrated | spectral candidate observations |
| Pause topology | Integrated | temporal observations |
| Speech segmentation | **Integrated** | timestamped speech segments |
| Response latency | Integrated when timing supplied | interaction observation |
| Transcript disfluency | Integrated when transcript supplied | linguistic observation |
| Within speaker baseline deviation | Integrated when baseline supplied | baseline observation |
| Evidence grouping | Integrated | evidence records |
| Reliability gate | Integrated | eligibility state |
| Candidate classification boundary | Integrated | candidate indeterminate boundary |
| Final disposition boundary | Integrated | configured disposition boundary |

## Current input capabilities

The authenticated case intake workflow now supports:

- case creation
- case listing
- case retrieval
- WAV source upload
- WAV metadata extraction
- source SHA-256 hashing
- durable private media storage
- signed playback URL generation
- source provenance persistence
- case bound analysis run creation
- run stage state persistence

The legacy `/v1/analyze` endpoint remains available as the direct analysis compatibility path.

## Planned speaker and transcript capabilities

- production speaker identification
- diarization
- speaker separation
- overlap handling
- speaker confidence
- speaker aware transcript attribution
- production ASR
- segment timestamps
- word timestamps
- transcript confidence
- forced alignment
- audio transcript synchronization
- question and response alignment

## Planned analytical expansion

- broader acoustic descriptors
- openSMILE style descriptors
- eGeMAPS style descriptors
- LPCC
- GFCC
- Teager Energy Operator
- richer glottal source measures
- IAIF
- NAQ
- CQ
- OQ
- H1 H2
- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention
- sequence models
- transformer linguistic representations
- contradiction and consistency analysis
- richer lexical analysis
- richer question and answer intelligence
- expanded baseline workflows

## Deception inference development

The product architecture preserves the full path toward:

- multimethod evidence convergence
- dependence aware evidence synthesis
- calibrated uncertainty
- explicit decision thresholds
- speaker disjoint evaluation
- cross dataset evaluation
- recording condition stress tests
- identity sensitivity testing
- subgroup robustness
- language robustness where appropriate
- external replication
- validated candidate classifiers
- calibrated deception probability
- confidence matrices
- final classification and disposition

## Operational status

| Area | State |
|---|---|
| Render backend | working baseline |
| `/health` | observed working |
| Runtime self test | observed passed during successful deployment |
| Request correlation | implemented |
| Lifecycle diagnostics | implemented |
| Durable diagnostic storage adapter | implemented |
| Durable media storage adapter | implemented in code |
| Case persistence API | implemented in code |
| Case bound analysis API | implemented in code |
| `/v1/analyze` normal path stability | open incident history remains under investigation |
| Production diagnostic secret configuration | verification required |
| Production media bucket configuration | verification required |
| Current frontend CI | fresh verification required on the current main commit |

## Frontend status

| Area | State |
|---|---|
| React application shell | implemented |
| GitHub Pages deployment configuration | implemented |
| Developer Console | implemented foundation |
| API workbench | implemented |
| Real upload progress | implemented |
| Case API client contracts | implemented |
| Audio player | implemented foundation |
| Local WAV waveform | implemented foundation |
| Diagnostic event browser | implemented foundation |
| Methodology navigation | implemented |
| MVP task board | implemented foundation |
| Analysis Workspace | active implementation target |
| Case intake UI wiring | next implementation step |
| Signed media playback wiring | next implementation step |
| Full 21 stage backend lifecycle integration | active implementation target |
| Browser end to end verification | required |

## Scientific status rule

Implementation does not equal scientific validation.

A measured feature remains an observation until the defined validation program supports inferential use for a specified task and population.

The product objective remains deception detection throughout the engineering program.

## Documentation authority

- `docs/MASTER_METHOD_INDEX.md` — complete data point inventory
- `docs/ANALYSIS_METHODS.md` — method definitions
- `docs/METHOD_QA_MATRIX.md` — software QA controls
- `docs/VALIDATION.md` — scientific validation requirements
- `docs/ROADMAP.md` — future development
- `docs/MVP_BUILD_PLAN.md` — fastest connected implementation path
- `docs/DOCS_ALIGNMENT_2026-08-20.md` — cross document synchronization record
