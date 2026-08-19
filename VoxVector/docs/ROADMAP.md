# VoxVector Roadmap

VoxVector is being built toward a comprehensive vocal and audio deception detection system. This roadmap preserves capabilities that have been discussed, researched, or documented but are not yet fully implemented or scientifically validated.

Absence from the current runtime does not make a roadmap item obsolete.

## Phase A — Foundation hardening

- **MFCC/cepstral observations integrated into the primary pipeline — COMPLETE**
- **Render deployment baseline established — COMPLETE**
- **Formant FFT boundary hardening — COMPLETE**
- **Durable Supabase diagnostic storage adapter — IMPLEMENTED**
- **Request correlation and lifecycle diagnostics — IMPLEMENTED**
- **Runtime 502 incident investigation — OPEN**
- configure and verify production Supabase diagnostic secrets
- verify persisted request lifecycle records
- add stage-level timing and resource instrumentation
- add explicit audio/request resource limits and safe failure behavior
- reproduce and resolve origin-side 502/process termination/timeout conditions
- complete current CI repair verification
- keep Python/dependency versions reproducible
- expand reliability and eligibility checks
- synchronize runtime registry, method register, QA matrix, and documentation
- preserve provenance and deterministic failure behavior
- maintain Render runtime fingerprinting and known-fixture verification

## Phase B — Application foundation and Developer Console

**Current phase: ACTIVE.** The React application is the canonical public frontend under `/voxvector/` on GitHub Pages. The first Developer Console foundation is implemented and the next work is protected backend telemetry plus component-system refinement.

### B1 — Application foundation

- **React application boundary — COMPLETE**
- **Vite/GitHub Pages deployment — COMPLETE**
- **Tailwind responsive styling baseline — COMPLETE**
- **Motion integration — IMPLEMENTED**
- **TanStack Query client boundary — IMPLEMENTED**
- **real API client for `/health` and `/v1/analyze` — IMPLEMENTED**
- **state-driven API activity visualization — IMPLEMENTED**
- **formal shadcn/ui component installation — NEXT**
- accessible navigation and responsive application shell refinement
- theme support
- typed API contracts from actual FastAPI schemas
- preserve request IDs, correlation IDs, status codes, and backend error metadata

### B2 — Developer Console

- **`/developer` route and navigation entry — IMPLEMENTED**
- **Supabase Auth developer gate — IMPLEMENTED**
- **trusted developer role check — IMPLEMENTED**
- **real `/health` dashboard — IMPLEMENTED**
- **API workbench for `/health` and `/v1/analyze` — IMPLEMENTED**
- **request timing, status, request ID, errors, raw/structured response — IMPLEMENTED**
- **canonical documentation navigator — IMPLEMENTED**
- **development board — IMPLEMENTED**
- protected FastAPI JWT validation — NEXT
- protected developer authorization dependency — NEXT
- persistent error report browser — BLOCKED on protected query endpoint
- error detail with related events/recurrence — BLOCKED on query contract
- lifecycle event stream — BLOCKED on protected query/stream contract
- request/error/5xx/analysis aggregates — BLOCKED on persistent metrics contract

### B3 — Intelligent loading and state presentation

- **API request state visualization — IMPLEMENTED**
- API-driven analysis lifecycle states
- stage-aware loading UI
- progressive result disclosure as actual data arrives
- Motion transitions tied to real query/mutation state
- explicit unavailable, timeout, rejection, and failure states
- reduced-motion support
- no fabricated percentages or telemetry

## Phase C — Analysis Workspace and public application

### C1 — Analysis Workspace

- upload/record entry point according to supported runtime capabilities
- interview/question context
- waveform and input metadata
- eligibility and reliability presentation
- processing lifecycle
- acoustic evidence panels
- linguistic evidence panels when transcript data is available
- timing and prosody observations
- convergence/conflict presentation
- uncertainty and alternative explanations
- candidate classification state
- final disposition state
- case/result persistence when the backend data model supports it

### C2 — Public application

- **React public landing page — IMPLEMENTED / ACTIVE REFINEMENT**
- evidence-based product positioning
- explanation of the deception-analysis workflow
- methodology and scientific-status access
- purposeful audio/analysis visualizations
- documentation entry points
- responsive/mobile-first experience
- accessible typography and controls

## Phase D — Feature-depth expansion

- expand pause topology and question/answer placement
- add richer pulse and voice-quality observations
- strengthen formant tracking and quality controls
- extend transcript disfluency into false starts and repairs
- improve within-speaker baseline workflows
- add richer interaction timing and turn structure

## Phase E — Research feature families

- openSMILE/eGeMAPS-style interpretable descriptors
- LPCC and GFCC
- Teager Energy Operator descriptors
- IAIF, NAQ, CQ, OQ, H1-H2 and related glottal-source measures
- broader spectral tilt and harmonic measures

## Phase F — Learned representations and temporal models

- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention and sequence models
- speaker identity and recording-condition leakage testing

## Phase G — Linguistic and conversational intelligence

- high-quality ASR
- word and phoneme timestamps
- forced alignment
- transformer linguistic representations
- contradiction/consistency analysis
- hedging, certainty, repair, lexical diversity, negation, and discourse measures
- richer question/answer alignment
- transcript confidence propagation into reliability

## Phase H — Multimodal and media integrity

- speaker diarization
- synchronized video analysis
- facial action units
- audio/video synchronization
- cross-modal fusion
- synthetic-speech detection and provenance-aware benchmark evaluation

## Phase I — Deception inference research

- define operational deception tasks
- build speaker-disjoint development and evaluation datasets
- evaluate multimethod evidence convergence
- evaluate alternative explanations and confounders
- test identity and recording-condition leakage
- develop candidate deception classifiers
- compare interpretable and learned model families
- establish calibrated uncertainty and explicit abstention behavior

## Phase J — Scientific validation

- freeze operational definitions
- define target populations and deployment conditions
- speaker-disjoint evaluation
- cross-dataset evaluation
- recording-condition stress tests
- identity sensitivity analysis
- subgroup/language robustness where appropriate
- calibration and uncertainty analysis
- explicit abstention testing
- external replication

Only methods that satisfy the validation program may be promoted to validated inferential use.

## Phase K — Controlled deception detection engine

Future production work may enable a validated multi-engine deception detection layer combining independently justified observations, validated models, reliability, evidence convergence, uncertainty, alternative explanations, and task-specific calibration.

Potential future outputs include candidate deception classification, calibrated deception probability, confidence and uncertainty matrix, evidence convergence/conflict summary, alternative-explanation analysis, and final classification/disposition with abstention.

These outputs are roadmap capabilities, not current validated runtime capabilities.

## Product and deployment roadmap

- production-grade React frontend at `https://darenprince.com/voxvector/`
- protected Developer Console at `https://darenprince.com/voxvector/developer/`
- canonical FastAPI backend at `https://voxvector.crownlabs.tech`
- authenticated user and case management
- secure audio storage and retention controls
- analysis job lifecycle and result persistence
- mobile-first polished UX
- monitoring, provenance, and operational audit trails
- browser-level and end-to-end verification of critical workflows
- accessibility and reduced-motion verification

Every roadmap stage remains subject to the Operating Charter and Project Decision Log.

## Current checkpoint

See `docs/PROJECT_CHECKPOINT_2026-08-19.md` for the current implementation, deployment, CI, open runtime incident, immediate verification sequence, and frontend architecture decision.

See `docs/UI_APPLICATION_ARCHITECTURE.md` and `docs/DEVELOPER_ACCESS.md` for the frontend and developer-access contracts.
