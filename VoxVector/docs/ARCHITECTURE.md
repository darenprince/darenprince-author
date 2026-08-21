# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake speaker processing transcription synchronized audio analysis evidence synthesis classification reporting and audit into one case centered workflow.

The architecture deliberately separates product experience from analytical engine responsibilities while keeping both connected through canonical data contracts.

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

The public React application is presentation and interaction only.

The frontend must not recreate the analysis engine.

The FastAPI adapter is an interface and runtime boundary only.

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

1. **File Upload / Ingest**
2. **File Decode and Normalization**
3. **Provenance and Integrity**
4. **Channel and Recording Assessment**

### Understand

5. **Speaker Identification / Diarization**
6. **Speech Segmentation**
7. **Transcription Generation**
8. **Transcript Alignment**
9. **Eligibility and Reliability**

### Analyze

10. **Acoustic Feature Extraction**
11. **Prosodic and Voice Quality Analysis**
12. **Temporal and Pause Analysis**
13. **Linguistic and Disfluency Analysis**
14. **Question / Answer Alignment**
15. **Within Speaker Baseline**

### Synthesize and Decide

16. **Cross Method Evidence Assembly**
17. **Evidence Convergence and Conflict**
18. **Candidate Classification**
19. **Validation and Calibration Gate**
20. **Final Classification / Disposition**
21. **Audit and Provenance Output**

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

## Product experience architecture

The product is a unified case centered intelligence workspace.

The detailed UX contract is defined in `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

### Primary application surfaces

- Overview
- New Analysis
- Analyses
- History
- Evidence Explorer
- Reports
- Comparisons
- Alerts
- Settings

### Core Analysis Workspace

The Analysis Workspace combines:

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

### Synchronized analytical viewer

The primary viewer is built around one shared time axis.

Initial tracks:

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses

The viewer must support additional timestamped tracks without changing the underlying interaction model.

Potential expanded tracks:

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

## Comparison architecture

The product supports comparison between compatible analytical objects.

Examples include:

- recordings
- speakers
- baseline segments
- question responses
- evidence regions
- analysis runs

All comparison results preserve source identity and provenance.

## Case data model

The canonical analysis case model must support:

- case ID
- analysis ID
- source file metadata
- provenance
- recording metadata
- speaker records
- speaker segments
- transcript records
- alignment records
- feature observations
- evidence records
- evidence relationships
- pipeline stage states
- lifecycle events
- findings
- reports
- final disposition

The frontend consumes these structures through canonical API contracts.

## Runtime orchestration

`VoxVectorPipeline.analyze()` remains the canonical engine entry point.

Current orchestration includes the implemented acoustic and temporal foundation and optional transcript and baseline inputs.

The end state expands the same orchestration boundary to production speaker processing transcription alignment deeper linguistic analysis evidence synthesis classification and reporting.

No new frontend component may imply an engine capability that lacks a corresponding backend contract.

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

Render is the backend host.

```text
https://darenprince.com/voxvector/
    public React application

https://darenprince.com/voxvector/developer/
    authenticated Developer Console

https://voxvector.crownlabs.tech
    canonical FastAPI API
```

The root `voxvector.html` is a compatibility redirect only.

It must not contain a second VoxVector implementation.

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
