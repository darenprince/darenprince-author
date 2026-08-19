# VoxVector Capability Status

This document distinguishes the product we are building from what the current runtime has implemented and what science has validated. An unimplemented capability is not an obsolete capability.

## Product objective

**VoxVector is being built as a vocal and audio deception detection system.** The intended analytical product combines multiple evidence families to identify patterns that may support or contradict a deception hypothesis in defined interview or conversational tasks.

The current implementation is an observational foundation. It must not be represented as scientifically validated deception detection until the required validation program is completed.

## Status vocabulary

* **Implemented**: code exists with repository level QA coverage or deterministic boundary tests.
* **Integrated**: implemented and currently orchestrated by the primary `VoxVectorPipeline`.
* **Implemented, not primary integrated**: reusable code exists but is not currently emitted by the primary pipeline.
* **Planned research**: documented candidate retained for future implementation, evaluation, or validation.
* **Validated inferential**: reserved for a method or model that has completed the VoxVector validation requirements for a defined task and population.
* **Retired**: removed from the active roadmap only by an explicit documented decision.

## Current implemented and integrated observations

| Capability | Status | Notes |
|---|---|---|
| RMS / energy | Integrated | Primary acoustic pipeline |
| Relative intensity / dB | Integrated | Primary acoustic pipeline |
| Zero crossing rate | Integrated | Primary acoustic pipeline |
| Spectral centroid | Integrated | FFT width aware |
| Spectral spread | Integrated | FFT width aware |
| Fundamental frequency | Integrated | Observational F0 estimation |
| Harmonicity / periodicity | Integrated | Acoustic observation |
| F0 and intensity dynamics | Integrated | Range, dispersion, slope, delta |
| HNR | Integrated | Derived from usable harmonicity |
| Spectral flux | Integrated | Canonical spectral implementation |
| Spectral rolloff | Integrated | Canonical spectral implementation |
| MFCC / cepstral coefficients | Integrated | 13 coefficient means emitted per bounded audio chunk stream |
| Formant candidate tracking | Integrated | FFT boundary hardened; not phonetic validated |
| Pause topology | Integrated | Count, density, longest, median, p90, voiced run mean |
| Response latency | Integrated when supplied | Requires explicit timing boundaries |
| Transcript disfluency | Integrated when supplied | Filled pauses, repetitions, rates |
| Within speaker baseline | Integrated when supplied | Independent baseline required |
| Evidence grouping | Integrated | Neutral observational evidence |
| Candidate classification | Integrated boundary | Indeterminate only |
| Final disposition gate | Integrated boundary | Abstain / insufficient evidence |
| Reliability gate | Integrated | Eligibility control only |

## Operational reliability and observability status

| Area | Status | Current state |
|---|---|---|
| Render build | Working | Canonical `VoxVector` root builds successfully on the pinned production runtime |
| Render process startup | Working | Uvicorn starts `api.app:app` successfully |
| `/health` | Working | Repeated HTTP 200 responses observed |
| Runtime self test | Working | Reported `passed` during successful deployment |
| Durable diagnostic storage adapter | Implemented | Supabase Storage adapter with private JSON bucket support |
| Request correlation | Implemented | `/v1/analyze` receives a request ID and returns `X-Request-ID` |
| Lifecycle diagnostics | Implemented | Start, completion, rejection, stage, and exception events |
| `/v1/analyze` normal path stability | **Open incident** | A public request returned HTTP 502; origin cause remains under investigation |
| Resource safeguards | Planned next | Must fail safely before origin process termination |
| Full CI after latest frontend visual correction | Pending | Fresh green CI evidence is required |
| Production storage configuration | Pending | Render must receive the Supabase URL and service role secret |

## Frontend application status

| Area | Status | Current state |
|---|---|---|
| React application shell | **Implemented** | React/Vite application under `voxvector/` with responsive product shell and Motion interactions |
| React build pipeline | **Implemented** | Dedicated Vite build under `voxvector/`; GitHub Pages workflow builds and stages `/voxvector/` |
| shadcn style component foundation | **Implemented** | Application owned Card, Sheet, Button, Badge and ThemeToggle composition follows shadcn patterns and uses Base UI primitives |
| Tremor analytical UI | **Implemented** | Tremor Card, AreaChart and ProgressBar are first class dependencies and are used by the landing and console surfaces |
| Tailwind CSS design system | **Implemented** | Dedicated frontend Tailwind/PostCSS configuration, semantic tokens, responsive utility styling and light/dark themes |
| Motion for React | **Implemented** | State and presentation animations use Motion; animation does not represent analytical truth |
| TanStack Query | **Implemented** | Query client and API lifecycle integration are present at the application boundary |
| Lucide icon system | **Implemented** | Product and console iconography uses Lucide React |
| Developer Console | **Implemented** | Functional `/voxvector/developer` console with developer gate, dashboard, API workbench and unavailable telemetry states |
| Analysis Workspace | Planned | Must consume real `/v1/analyze` state and preserve analytical stage separation |
| Browser/end to end verification | Planned | Required before frontend workflows are considered complete |

## Frontend design system state

The approved active visual system is the Shadcnblocks inspired neutral foundation supplied during the 2026-08-19 refinement cycle:

* black and near black foundations
* white and warm white typography
* quiet gray surfaces and dividers
* coffee, copper and tan accents
* subtle surface gradients
* thin low contrast strokes
* stronger contrast reserved for controls, focus states and semantic status
* no active blue or cyan product accent

Tremor's default blue theme tokens are overridden in `voxvector/tailwind.config.js`. Landing charts use explicit warm custom colors and the landing analytical cards disable the default Tremor ring so the interface cannot silently revert to blue framing.

## Vercel status

Vercel is retired from the VoxVector architecture.

The canonical frontend host is GitHub Pages. The canonical backend host is Render. The `voxvector/` package contains no Vercel dependency or configuration, and the VoxVector GitHub Actions workflow does not deploy to Vercel.

If a Vercel check remains visible in GitHub, it is an external integration or repository status configuration and must be removed outside the application source. Reintroducing Vercel code to satisfy that check would violate the deployment decision.

## Frontend migration boundary

The canonical public landing implementation is `voxvector/index.html` and its React source under `voxvector/src/`. The public React application is presentation and API interface code only. It does not recreate the analysis engine.

The canonical backend remains under `VoxVector/`, including `VoxVector/api/` and `VoxVector/src/voxvector/`. API driven analysis, telemetry, request lifecycle state, and protected Developer Console behavior must remain connected to the canonical backend rather than duplicated in the frontend.

## Implemented but not primary pipeline integrated

* Cepstral summary utilities beyond the primary MFCC observation path
* Local jitter from supplied periods
* Local shimmer from supplied cycle amplitudes
* Pulse period utilities
* Generic temporal observation utilities such as turn duration and overlap duration

These are real implementation assets and remain available for the deception detection development program.

## Planned research and future development

### Acoustic and voice quality expansion

* openSMILE / eGeMAPS style descriptor layer
* broader spectral tilt and harmonic measures
* LPCC
* GFCC
* Teager Energy Operator descriptors
* richer voice quality and glottal source measures
* stronger channel and recording condition quality controls
* IAIF, NAQ, CQ, OQ, H1 H2 and related source measures

### Learned representations and temporal modeling

* WavLM
* wav2vec 2.0
* HuBERT
* Conformer
* Audio Spectrogram Transformer
* temporal attention and sequence models
* speaker and recording condition leakage evaluation

### Linguistic and conversational intelligence

* production grade ASR
* word and phoneme timestamps
* forced alignment
* transformer linguistic representations
* contradiction and consistency analysis
* repair and false start detection
* hedging and certainty measures
* lexical diversity, negation, and discourse structure
* richer question and answer alignment
* transcript confidence propagation into reliability

### Speaker and interaction analysis

* diarization
* speaker/channel separability controls
* richer turn taking and overlap analysis
* baseline selection and leakage controls

### Multimodal and media integrity

* facial action units
* audio/video synchronization
* cross modal fusion
* synthetic speech detection and provenance aware benchmark evaluation

### Deception inference infrastructure

* dependence aware multimethod convergence
* calibrated uncertainty
* explicit abstention thresholds
* speaker disjoint and cross dataset evaluation
* recording condition stress tests
* identity sensitivity analysis
* subgroup and language robustness where applicable
* externally replicated evaluation
* validated candidate classifiers
* eventual calibrated deception probability and confidence matrix logic
* case level evidence synthesis and final disposition controls

## Scientific rule

No item becomes a deception indicator simply because it is implemented or researched. No feature, representation, model, or classifier is promoted to validated deception inference by documentation alone.

The product objective remains deception detection; the scientific discipline determines when and how that objective can be responsibly enabled in the runtime.

## Current checkpoint

The active engineering checkpoint is `docs/PROJECT_CHECKPOINT_2026-08-19.md`. The frontend refinement record is `docs/PROJECT_CHECKPOINT_2026-08-19_UI_REFINEMENT.md`. These records preserve current progress, open incidents, and the next verification sequence.

The frontend architecture and implementation contract are defined in `docs/UI_APPLICATION_ARCHITECTURE.md`.
