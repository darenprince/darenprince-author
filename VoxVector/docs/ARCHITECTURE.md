# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake speaker processing transcription synchronized audio analysis evidence synthesis classification reporting and audit into one case centered workflow.

The architecture is designed around the supplied Analysis Workspace reference experience. The reference establishes the information architecture and interaction model. The active visual system is governed separately.

## Application boundary

```text
Public React application
voxvector/
        |
        | GitHub Pages
        v
https://darenprince.com/voxvector/
        |
        | TanStack Query / real API calls
        v
https://voxvector.crownlabs.tech
        |
        | FastAPI
        v
VoxVector/api/app.py
        |
        v
VoxVector/src/voxvector/
        |
        +--> file upload / ingest
        +--> decode / normalization
        +--> provenance / integrity
        +--> recording / channel assessment
        +--> speaker identification / diarization
        +--> speech segmentation
        +--> transcription generation
        +--> transcript alignment
        +--> eligibility / reliability
        +--> acoustic analysis
        +--> prosodic / voice quality analysis
        +--> temporal / pause analysis
        +--> linguistic / disfluency analysis
        +--> question / answer alignment
        +--> within speaker baseline
        +--> evidence assembly
        +--> convergence / conflict analysis
        +--> candidate classification
        +--> validation / calibration gate
        +--> final classification / disposition
        +--> audit / provenance output
        |
        v
Supabase
Auth / case data / diagnostics / persistence
```

The React application is presentation and interaction code.

The frontend must not recreate the analysis engine.

The FastAPI adapter is an interface and runtime boundary.

It must import and execute the canonical engine.

It must never become a second analysis implementation.

## Repository workspaces

### Public frontend

`voxvector/` is the canonical React and Vite frontend workspace.

It contains:

- React application
- application owned UI components
- Base UI interaction primitives
- Tailwind styling
- Motion for React
- TanStack Query
- Supabase browser authentication client
- real API client
- public product experience
- Analysis Workspace
- Developer Console

Vite uses:

```text
base: /voxvector/
```

### Backend

`VoxVector/` remains the canonical backend and analysis workspace.

- HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- Tests: `VoxVector/tests/`
- Technical documentation: `VoxVector/docs/`
- Render root: `VoxVector`
- Render entry point: `api.app:app`

## Canonical 21 stage analysis pipeline

The complete product pipeline is defined in `docs/ANALYSIS_PIPELINE.md`.

### Prepare

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment

### Understand

5. Speaker Identification / Diarization
6. Speech Segmentation
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability

### Analyze

10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline

### Synthesize and Decide

16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

## Core analytical layers

### Input layer

Responsible for:

- file intake
- decoding
- normalization
- metadata extraction
- hashing
- provenance
- recording condition assessment

### Speaker and speech layer

Responsible for:

- speech activity
- segmentation
- speaker regions
- diarization
- turn structure
- overlap
- speaker separation

### Language layer

Responsible for:

- transcription
- word timing
- phoneme timing where supported
- speaker attribution
- disfluency
- lexical analysis
- semantic analysis
- question and answer context

### Signal analysis layer

Responsible for:

- pitch
- intensity
- energy
- spectral features
- harmonicity
- HNR
- MFCC
- formant candidates
- voice quality
- prosody
- temporal behavior

### Evidence layer

Responsible for:

- normalized evidence
- provenance
- quality
- evidence direction
- convergence
- conflict
- dependency relationships
- alternative hypotheses

### Classification layer

Responsible for:

- candidate classification
- model configuration
- calibration
- confidence
- uncertainty
- final disposition

### Audit layer

Responsible for:

- run identity
- source identity
- method identity
- configuration
- measurements
- evidence relationships
- pipeline state
- final output provenance

## Case centered data architecture

One analysis case is the root object for the complete user workflow.

The case model must connect:

- case ID
- analysis ID
- analysis run ID
- source asset ID
- source metadata
- provenance
- recording metadata
- speaker records
- speaker segments
- speech segments
- transcript records
- transcript segments
- transcript words
- alignment records
- analytical track records
- feature observations
- evidence records
- evidence relationships
- pipeline stage states
- lifecycle events
- findings
- assessment
- reports
- final disposition

Upload playback transcription analysis evidence assessment and reporting must share this identity chain.

## Product experience architecture

The product is a unified case centered intelligence workspace.

The detailed UX contract is defined in `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

Primary surfaces:

- Overview
- New Analysis
- Analyses
- History
- Evidence Explorer
- Reports
- Comparisons
- Alerts
- Settings
- Developer Console

The core Analysis Workspace combines:

- source metadata
- audio playback
- synchronized waveform
- analytical tracks
- speaker regions
- transcript
- evidence markers
- analysis pipeline
- key metrics
- evidence timeline
- assessment state

## Synchronized analytical viewer

The primary viewer is built around one shared time axis.

Initial tracks:

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses

Expanded tracks can include:

- formants
- HNR
- spectral flux
- spectral rolloff
- MFCC
- jitter
- shimmer
- voice quality
- response latency
- speaker turns
- transcript alignment
- evidence events

Every track is driven by canonical analysis data.

## Transcript and speaker synchronization

The workspace treats speaker regions and transcript content as first class synchronized layers.

The interaction model supports:

- speaker turn selection
- speaker region highlighting
- overlap visualization
- transcript segment selection
- word selection
- audio to transcript navigation
- transcript to audio navigation
- evidence marker synchronization

## Analysis Overview architecture

The overview surface contains:

- source file metadata
- duration
- recording quality
- processing state
- condensed waveform
- evidence markers
- key analytical metrics
- assessment state
- evidence timeline
- pipeline state

The metric system is data driven.

The UI must never invent numerical telemetry.

## Evidence Explorer architecture

Evidence Explorer provides case wide access to normalized evidence.

Filters include:

- speaker
- time
- method family
- evidence type
- evidence direction
- reliability
- transcript context
- question
- response

Every evidence record links back to its source interval and method.

## Reports architecture

Reports are generated from the persistent analysis case model.

A report may contain:

- case summary
- source information
- speaker information
- eligibility and reliability
- method summary
- analytical findings
- evidence timeline
- convergence and conflict
- candidate assessment
- confidence and uncertainty
- alternative hypotheses
- final disposition
- audit and provenance

## Runtime orchestration

`VoxVectorPipeline.analyze()` remains the canonical engine entry point.

The current runtime provides the foundational observational analysis documented in `docs/CAPABILITY_STATUS.md`.

The product architecture expands the same orchestration boundary to speaker processing transcription alignment richer linguistic analysis evidence synthesis classification validation and reporting.

No frontend component may imply that a backend stage has executed when the backend has not produced the corresponding state.

## Reliability boundary

Reliability is an eligibility control.

It is not a deception probability.

Reliability should incorporate:

- signal quality
- clipping
- duration
- channel integrity
- recording artifacts
- speaker separability
- transcript confidence
- contextual completeness

## Classification boundary

A measured observation is not a candidate label.

Candidate classification remains a distinct stage.

Final disposition remains a distinct stage.

Validation and calibration remain a distinct gate.

## Operational observability boundary

The API includes request correlation and sanitized lifecycle and stage diagnostics with durable Supabase Storage support.

The Developer Console consumes operational evidence rather than inventing telemetry.

UI state must reflect real request and stage state.

## Deployment boundary

GitHub Pages is the public frontend host.

Render remains the original API host.

AWS provides a separately addressed deployment environment for benchmarking and controlled runtime evaluation.

```text
https://darenprince.com/voxvector/
    public React application

https://darenprince.com/voxvector/developer/
    authenticated Developer Console

https://voxvector.crownlabs.tech
    original VoxVector FastAPI API

https://awsapi.crownlabs.tech
    AWS ALB → ECS Fargate VoxVector API
```

The root `voxvector.html` is a compatibility redirect only.

It must not contain a second VoxVector implementation.

## MVP engineering boundary

The fastest connected MVP path is maintained in `docs/MVP_BUILD_PLAN.md`.

The dependency chain is:

1. case identity
2. intake and provenance
3. audio playback and waveform
4. real pipeline lifecycle
5. speaker processing
6. transcription
7. transcript alignment
8. analytical tracks
9. evidence normalization
10. evidence synthesis
11. assessment
12. reporting
13. history and reopen
14. browser verification

The Developer Console is the engineering cockpit for this path.

## Engineering principles

- one canonical analysis engine
- one canonical case model
- one 21 stage pipeline
- one synchronized analytical time axis
- frontend state derived from real backend state
- every visualization has a data contract
- every evidence record has provenance
- every analytical stage has defined inputs and outputs
- implementation maturity remains an internal engineering property
- scientific validation remains an explicit engineering workstream
- planned capabilities remain preserved in canonical documentation
- accessibility remains part of product completion
- responsive behavior remains part of product completion
- animation is presentation state and never analytical evidence

## Documentation synchronization

When the pipeline changes update the architecture pipeline implementation plan MVP plan roadmap capability status and AI project instructions together.

When deployment endpoints or hosting responsibilities change, update `docs/ENDPOINT_REGISTRY.md`, the deployment boundary, system architecture, cloud audit, developer engineering surfaces, and the synchronized Crown Labs VoxVector dossier.

The cross document audit record is `docs/DOCS_ALIGNMENT_2026-08-20.md`.
