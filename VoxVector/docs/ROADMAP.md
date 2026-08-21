# VoxVector Roadmap

VoxVector is being built toward a comprehensive vocal and audio deception analysis system.

The roadmap preserves the complete product direction while tracking the engineering sequence required to reach the end state.

The end state is defined by:

- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/ANALYSIS_PIPELINE.md`

## Phase A — Foundation hardening

- **MFCC and cepstral observations integrated into the primary pipeline — COMPLETE**
- **Render deployment baseline established — COMPLETE**
- **Formant FFT boundary hardening — COMPLETE**
- **Durable Supabase diagnostic storage adapter — IMPLEMENTED**
- **Request correlation and lifecycle diagnostics — IMPLEMENTED**
- **Runtime 502 incident investigation — OPEN**
- configure and verify production Supabase diagnostic secrets
- verify persisted request lifecycle records
- add stage level timing and resource instrumentation
- add explicit audio and request resource limits
- reproduce and resolve origin side 502 and timeout conditions
- complete current CI repair verification
- keep Python and dependency versions reproducible
- expand reliability and eligibility checks
- synchronize runtime registry method register QA matrix and documentation
- preserve provenance and deterministic failure behavior
- maintain Render runtime fingerprinting and known fixture verification

## Phase B — Product shell and Analysis Workspace

**Target:** Build the complete product shell represented by the reference experience.

### B1 — Application shell

- **React application boundary — COMPLETE**
- **Vite and GitHub Pages deployment — COMPLETE**
- **Tailwind responsive styling baseline — COMPLETE**
- **Motion integration — IMPLEMENTED**
- **TanStack Query client boundary — IMPLEMENTED**
- **real API client for `/health` and `/v1/analyze` — IMPLEMENTED**
- **Developer Console foundation — IMPLEMENTED**
- persistent product navigation
- New Analysis route
- Analysis History
- Evidence Explorer
- Reports
- Comparisons
- Alerts
- Settings
- shared case context

### B2 — Analysis intake

- file picker
- drag and drop upload
- file metadata extraction
- provenance creation
- upload progress
- intake validation
- analysis request creation
- analysis identity persistence

### B3 — Analysis Workspace

- waveform viewer
- audio playback
- shared playhead
- seek and scrub
- zoom
- fullscreen
- waveform event markers
- analysis pipeline component
- key metrics surface
- evidence timeline
- assessment surface
- responsive analytical layout

### B4 — Synchronized analytical tracks

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses
- formants
- HNR
- spectral flux
- spectral rolloff
- MFCC
- voice quality
- speaker turns
- transcript alignment
- evidence events

## Phase C — Speaker and language intelligence

### C1 — Speaker processing

- speaker identification
- speaker segmentation
- diarization
- turn boundaries
- overlap detection
- speaker separation quality
- speaker confidence
- speaker aware evidence

### C2 — Transcription

- production ASR
- timestamped transcript
- word timestamps
- transcript confidence
- speaker attribution
- transcript persistence

### C3 — Alignment

- word alignment
- phoneme alignment where supported
- audio to transcript synchronization
- selected word to playhead synchronization
- selected audio region to transcript synchronization

### C4 — Conversational intelligence

- question identification
- response boundaries
- response latency
- question and answer semantic alignment
- proposition and response representation
- contradiction and consistency context

## Phase D — Feature depth expansion

- expand pause topology
- richer pulse and voice quality observations
- stronger formant tracking
- expanded acoustic descriptors
- speech rate and articulation timing
- transcript disfluency expansion
- repairs and false starts
- within speaker baseline workflows
- turn taking and overlap analysis

## Phase E — Research feature families

- openSMILE style descriptors
- eGeMAPS style descriptors
- LPCC
- GFCC
- Teager Energy Operator descriptors
- broader spectral tilt
- harmonic measures
- IAIF
- NAQ
- CQ
- OQ
- H1 H2
- broader glottal source measures

## Phase F — Learned representations and temporal models

- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention
- sequence models
- speaker identity leakage testing
- recording condition leakage testing

## Phase G — Linguistic and conversational intelligence

- transformer linguistic representations
- lexical analysis
- syntactic structure
- semantic representations
- contradiction and consistency analysis
- hedging
- certainty
- lexical diversity
- negation
- discourse structure
- richer question and answer alignment

## Phase H — Evidence intelligence

- normalized evidence records
- evidence provenance
- evidence relationships
- convergence analysis
- conflict analysis
- dependency modeling
- alternative hypothesis analysis
- evidence timeline
- Evidence Explorer

## Phase I — Deception inference research

- define operational deception tasks
- build speaker disjoint development datasets
- build speaker disjoint evaluation datasets
- evaluate multimethod convergence
- evaluate alternative explanations
- evaluate confounders
- test identity leakage
- test recording condition leakage
- develop candidate deception classifiers
- compare interpretable and learned model families
- establish calibrated uncertainty
- establish explicit abstention behavior

## Phase J — Scientific validation

- freeze operational definitions
- define target populations
- define deployment conditions
- speaker disjoint evaluation
- cross dataset evaluation
- recording condition stress tests
- identity sensitivity analysis
- subgroup robustness where appropriate
- language robustness where appropriate
- calibration analysis
- uncertainty analysis
- external replication

Only methods that satisfy the validation program may be promoted to validated inferential use.

## Phase K — Controlled deception detection engine

Future production work may enable a validated multimethod deception detection layer combining independently justified observations validated models reliability evidence convergence uncertainty alternative explanations and task specific calibration.

Potential outputs include:

- candidate deception classification
- calibrated deception probability
- confidence matrix
- evidence convergence and conflict summary
- alternative hypothesis analysis
- final classification
- final disposition

## Phase L — Product completion

- persistent case management
- saved analysis runs
- report generation
- comparison workflows
- alerts
- operational event history
- secure audio storage
- retention controls
- deletion workflows
- browser level verification
- end to end verification
- accessibility verification
- mobile verification
- production reliability verification

## Product experience completion sequence

The recommended implementation order is:

1. Product shell
2. Analysis intake
3. Audio playback
4. Synchronized waveform
5. Pipeline visualization
6. Real feature tracks
7. Speaker intelligence
8. Transcription
9. Alignment
10. Linguistic intelligence
11. Question and answer intelligence
12. Evidence synthesis
13. Evidence Explorer
14. Candidate classification
15. Validation and calibration
16. Final assessment
17. Reports
18. History
19. Comparisons
20. Alerts
21. Production hardening

## Current engineering plan

The detailed implementation sequence is maintained in `docs/IMPLEMENTATION_PLAN.md`.

The product experience contract is maintained in `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

The canonical technical architecture is maintained in `docs/ARCHITECTURE.md`.

The canonical 21 stage pipeline is maintained in `docs/ANALYSIS_PIPELINE.md`.

The method library remains in `docs/MASTER_METHOD_INDEX.md` and `docs/ANALYSIS_METHODS.md`.

## Product and deployment targets

- public React frontend at `https://darenprince.com/voxvector/`
- protected Developer Console at `https://darenprince.com/voxvector/developer/`
- canonical FastAPI backend at `https://voxvector.crownlabs.tech`
- authenticated user and case management
- secure audio storage
- analysis job lifecycle
- result persistence
- polished responsive UX
- monitoring
- provenance
- operational audit trails

Every roadmap stage remains subject to the Operating Charter and Project Decision Log.
