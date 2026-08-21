# VoxVector Analysis Pipeline

## Purpose

This is the canonical product and engineering pipeline for VoxVector.

The pipeline defines the complete connected path from recording intake through synchronized analysis evidence synthesis classification reporting and audit.

It is also the source model for the Analysis Workspace pipeline component and the engineering task dependency map.

## Canonical 21 stage pipeline

| # | Stage | Function | Primary output | Product surface |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | Accept the supported recording and create the analysis request. | source asset | New Analysis |
| 02 | File Decode and Normalization | Decode media and establish the canonical audio representation. | normalized audio | Intake |
| 03 | Provenance and Integrity | Hash the source and establish run identity and source metadata. | provenance record | Intake / Audit |
| 04 | Channel and Recording Assessment | Inspect duration clipping channels signal integrity and recording conditions. | recording profile | Intake / Overview |
| 05 | Speaker Identification / Diarization | Establish speaker regions and speaker separation. | speaker segments | Speaker layer |
| 06 | Speech Segmentation | Locate analyzable speech regions. | speech segments | Audio viewer |
| 07 | Transcription Generation | Generate timestamped transcript content. | transcript segments and words | Transcript layer |
| 08 | Transcript Alignment | Associate transcript content with audio timing. | alignment records | Transcript layer |
| 09 | Eligibility and Reliability | Establish the analysis eligibility profile. | eligibility record | Overview / Pipeline |
| 10 | Acoustic Feature Extraction | Extract energy pitch spectral and related acoustic observations. | acoustic observations | Acoustic tracks |
| 11 | Prosodic and Voice Quality Analysis | Extract pitch dynamics intensity dynamics harmonicity HNR and related voice observations. | prosody and voice observations | Prosody tracks |
| 12 | Temporal and Pause Analysis | Measure speech activity pauses response timing and temporal structure. | temporal observations | Temporal tracks |
| 13 | Linguistic and Disfluency Analysis | Analyze transcript structure lexical behavior disfluency and language features. | linguistic observations | Linguistic panels |
| 14 | Question / Answer Alignment | Associate responses with prompts and response boundaries. | interaction records | Conversation layer |
| 15 | Within Speaker Baseline | Compare observations with an independent speaker baseline when available. | baseline observations | Baseline panels |
| 16 | Cross Method Evidence Assembly | Convert observations into normalized evidence records. | evidence records | Evidence Explorer |
| 17 | Evidence Convergence and Conflict | Examine agreement dependence conflict and alternative explanations. | evidence relationships | Evidence synthesis |
| 18 | Candidate Classification | Produce a candidate analytical state from supported evidence. | candidate assessment | Assessment |
| 19 | Validation and Calibration Gate | Apply validation calibration robustness and distribution controls. | validation state | Assessment / Developer |
| 20 | Final Classification / Disposition | Produce the configured final analytical disposition. | final assessment | Assessment / Reports |
| 21 | Audit and Provenance Output | Preserve measurements methods evidence relationships configuration and provenance. | audit package | Reports / Audit |

## Pipeline groupings

### Prepare

Stages 01 through 04 establish the source recording normalized audio and provenance.

### Understand

Stages 05 through 09 establish speaker context speech structure transcript context alignment and analytical eligibility.

### Analyze

Stages 10 through 15 generate signal language temporal speaker and contextual observations.

### Synthesize and Decide

Stages 16 through 21 transform observations into evidence relationships candidate assessment validation controlled final disposition and auditable output.

## Stage 06 — Speech Segmentation

Stage 06 is now an implemented foundation in the primary `VoxVectorPipeline`.

### Input

- frame level RMS energy
- frame level F0 voicing state
- frame hop duration
- canonical source duration

### Processing

The current deterministic segmenter:

1. establishes a relative energy threshold from the recording
2. combines energy activity with F0 derived voicing
3. removes active runs shorter than the configured minimum speech duration
4. bridges inactive gaps shorter than the configured silence gap
5. emits contiguous speech intervals
6. assigns a segmentation confidence based on the active frame state

### Output

Each speech segment contains:

- segment ID
- start time
- end time
- duration
- confidence
- method ID

The pipeline also emits aggregate observations for:

- speech segment count
- total speech duration
- speech activity ratio

This stage provides the time regions consumed by the downstream speaker identification and transcription work. It does not assign speaker identity and does not generate transcript text.

### QA

The segmenter has deterministic tests for:

- active region detection
- short gap bridging
- short active run rejection
- invalid hop handling
- pipeline result integration

## Connected case model

Every stage attaches to the same analysis case and analysis run.

The stage contract must preserve:

- case ID
- analysis ID
- run ID
- source asset ID
- stage ID
- stage state
- start time
- completion time
- duration
- input references
- output references
- method IDs
- source intervals
- evidence references
- related lifecycle events
- error references

## Analysis Workspace mapping

The Analysis Workspace presents the 21 stages as one expandable pipeline.

Each stage can expose:

- stage name
- stage purpose
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

The pipeline is expandable so a user can move from the high level workflow into the underlying analytical stage.

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
- selected intervals

### Analytical tracks

Initial product tracks:

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses

Expanded track families:

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

All tracks use timestamped observation contracts and share the same playhead.

## Transcript and speaker synchronization

The speaker and transcript layers are first class analytical surfaces.

The synchronized contract supports:

- speaker regions
- speaker turns
- overlap regions
- speaker confidence
- transcript segments
- transcript words
- word timestamps
- speaker attribution
- alignment state
- disfluency markers
- question markers
- response boundaries
- evidence markers

Selecting transcript content moves the audio playhead to the associated interval.

Selecting an audio region reveals the associated transcript content when available.

## Evidence timeline

The evidence timeline connects analytical events to source intervals.

Event families include:

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
- selected finding

Every event must resolve to supporting evidence and a source interval.

## Evidence record contract

Every evidence record should preserve:

- analysis ID
- run ID
- method ID
- stage ID
- speaker ID when applicable
- start time
- end time
- observation
- measurement
- unit
- quality
- evidence direction
- provenance
- dependencies
- supporting evidence
- conflicting evidence
- alternative explanations

## Assessment architecture

The pipeline preserves four architectural layers.

### Eligibility and reliability

Determine whether the available material supports the requested analysis.

### Evidence collection and analysis

Extract and organize observations from audio transcript speaker and contextual data.

### Candidate classification

Combine supported evidence into a candidate analytical state.

### Final classification and disposition

Apply the configured validation and calibration architecture before issuing the final output.

These stages remain distinct.

## Runtime versus product architecture

The 21 stages define the complete product architecture.

The current runtime implements the foundational subset documented in `docs/CAPABILITY_STATUS.md`.

Planned stages remain canonical product scope and are preserved in the method registry roadmap and implementation plan.

The frontend must never simulate a stage merely because the product architecture contains it.

## Engineering contract

- The pipeline is canonical.
- The frontend consumes pipeline state from the backend.
- The frontend does not recreate pipeline logic.
- Every stage has a defined input and output.
- Every stage can produce auditable provenance.
- Every analytical visualization maps to a stage or evidence family.
- Every status value represents actual runtime state.
- Progress values come from real stage data or explicit indeterminate state.
- Animation never stands in for analytical execution.
- One case identity connects intake playback analysis evidence assessment and reporting.
- New analytical methods must map to a pipeline stage and a method registry entry.

## MVP dependency path

The fastest connected implementation path follows the pipeline dependency order:

1. case identity
2. upload and ingest
3. decode and provenance
4. playback and waveform
5. pipeline lifecycle
6. speech segmentation
7. speaker processing
8. transcription
9. alignment
10. real analytical tracks
11. evidence records
12. evidence synthesis
13. assessment
14. report
15. history and reopen
16. browser end to end verification

## Related architecture

- `docs/ARCHITECTURE.md`
- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/MASTER_METHOD_INDEX.md`
- `docs/DOCS_ALIGNMENT_2026-08-20.md`
