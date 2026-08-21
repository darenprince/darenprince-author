# VoxVector Analysis Pipeline

## Purpose

This is the canonical product and engineering pipeline model for VoxVector.

The pipeline describes the complete path from recording intake through synchronized analysis evidence synthesis classification reporting and audit.

The pipeline is also the source model for the Analysis Workspace pipeline component.

## Complete 21 stage pipeline

| # | Stage | Function | Product surface |
|---:|---|---|---|
| 01 | File Upload / Ingest | Accept the supported recording and establish the analysis request. | New Analysis |
| 02 | File Decode and Normalization | Decode media and establish the canonical audio representation. | Intake |
| 03 | Provenance and Integrity | Hash the source and preserve run identity and source metadata. | Intake / Audit |
| 04 | Channel and Recording Assessment | Inspect duration clipping signal integrity and recording conditions. | Intake / Overview |
| 05 | Speaker Identification / Diarization | Identify speaker regions and establish speaker separation. | Speaker layer |
| 06 | Speech Segmentation | Locate analyzable speech regions. | Audio viewer |
| 07 | Transcription Generation | Generate timestamped transcript content. | Transcript layer |
| 08 | Transcript Alignment | Associate transcript content with audio timing. | Transcript layer |
| 09 | Eligibility and Reliability | Establish whether the available material supports the requested analysis. | Overview / Pipeline |
| 10 | Acoustic Feature Extraction | Measure energy intensity spectral F0 harmonic and related acoustic observations. | Acoustic tracks |
| 11 | Prosodic and Voice Quality Analysis | Measure pitch dynamics intensity dynamics harmonicity HNR and related voice behavior. | Prosody tracks |
| 12 | Temporal and Pause Analysis | Measure speech activity pauses response timing and temporal structure. | Temporal tracks |
| 13 | Linguistic and Disfluency Analysis | Analyze transcript structure lexical behavior disfluency and richer language features. | Linguistic panels |
| 14 | Question / Answer Alignment | Associate responses with prompts and response boundaries. | Conversation layer |
| 15 | Within Speaker Baseline | Compare observations with an independent speaker baseline when available. | Baseline panels |
| 16 | Cross Method Evidence Assembly | Convert observations into normalized evidence records. | Evidence Explorer |
| 17 | Evidence Convergence and Conflict | Examine agreement dependence conflict and alternative explanations. | Evidence synthesis |
| 18 | Candidate Classification | Produce a candidate analytical state from supported evidence. | Assessment |
| 19 | Validation and Calibration Gate | Apply validation calibration robustness and distribution controls. | Assessment / Developer |
| 20 | Final Classification / Disposition | Produce the configured final classification or disposition. | Assessment / Reports |
| 21 | Audit and Provenance Output | Preserve measurements methods evidence relationships and provenance. | Reports / Audit |

## Pipeline groupings

### Prepare

Stages 01 through 04 establish the recording and its provenance.

### Understand

Stages 05 through 09 establish speaker context speech structure transcript context and analytical eligibility.

### Analyze

Stages 10 through 15 generate the core signal language temporal speaker and contextual observations.

### Synthesize and Decide

Stages 16 through 21 transform observations into evidence classification final disposition and auditable output.

## Analysis Workspace mapping

The 21 stage pipeline is displayed inside the Analysis Workspace.

Each stage can expose:

- stage name
- stage description
- current state
- start time
- completion time
- duration
- input references
- output references
- methods used
- evidence produced
- source intervals
- related events

The pipeline is expandable so the user can move from a high level workflow view into the underlying stage details.

## Synchronized audio analysis surface

The Analysis Workspace uses one shared time axis for audio and analytical evidence.

### Primary waveform

Display:

- waveform
- time ruler
- playhead
- speech regions
- pause regions
- speaker regions
- evidence markers

### Analytical tracks

Initial analytical tracks:

- Pitch F0
- Intensity
- Spectral Energy
- Speech Activity
- Pauses

Additional tracks may be added through the same timestamped observation contract.

Potential expanded tracks:

- Formants
- HNR
- Spectral Flux
- Spectral Rolloff
- MFCC
- Jitter
- Shimmer
- Voice Quality
- Response Latency
- Speaker Turns
- Transcript Alignment
- Evidence Events

## Analysis Overview mapping

The Overview surface presents the pipeline through a condensed analytical summary.

Required regions:

- source file metadata
- duration
- recording quality
- condensed waveform
- key metrics
- assessment state
- evidence timeline
- pipeline state

## Evidence timeline

The evidence timeline connects analytical events to source intervals.

Potential event types:

- response latency
- pause duration
- speech rate change
- pitch movement
- intensity movement
- speaker transition
- transcript event
- linguistic event
- evidence convergence
- evidence conflict

Selecting an event must reveal its supporting evidence and source interval.

## Evidence model

Every evidence record should preserve:

- analysis ID
- method ID
- stage ID
- speaker ID when applicable
- start time
- end time
- observation
- measurement
- quality
- evidence direction
- provenance
- dependencies
- supporting evidence
- conflicting evidence
- alternative explanations

## Stage separation

The pipeline preserves four architectural layers.

### Eligibility and reliability

Determine whether the available material supports the requested analysis.

### Evidence collection and analysis

Extract and organize observations from audio transcript speaker and contextual data.

### Candidate classification

Combine supported evidence into a candidate analytical state.

### Final classification and disposition

Apply the configured validation and calibration architecture before issuing the final output.

These stages must remain distinct.

## Product versus implementation state

The 21 stages define the product architecture.

Implementation status is maintained internally in `docs/CAPABILITY_STATUS.md`.

Research candidates remain preserved in `docs/MASTER_METHOD_INDEX.md` and `docs/ROADMAP.md`.

The product interface should present the complete analytical architecture while internal engineering records continue to identify implementation and validation state.

## Engineering contract

- The pipeline is canonical.
- The frontend consumes pipeline state from the backend.
- The frontend does not recreate pipeline logic.
- Every stage has a defined input and output.
- Every stage can produce auditable provenance.
- Every analytical visualization maps to a stage or evidence family.
- Every status value represents actual runtime state.
- Progress values must come from real stage data or explicit indeterminate state.
- Animation must never stand in for analytical execution.

## Related architecture

- `docs/ARCHITECTURE.md`
- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/CAPABILITY_STATUS.md`
