# VoxVector Analysis Pipeline

## Canonical product workflow

VoxVector is organized around one connected analysis case that carries the source recording through preparation speaker intelligence transcription alignment specialized analysis evidence synthesis classification validation final disposition and audit.

The canonical product architecture contains **21 stages**.

## Pipeline at a glance

| # | Stage | Group | Primary output |
|---:|---|---|---|
| 01 | File Upload / Ingest | Prepare | Source asset |
| 02 | File Decode and Normalization | Prepare | Normalized audio |
| 03 | Provenance and Integrity | Prepare | Provenance record |
| 04 | Channel and Recording Assessment | Prepare | Recording profile |
| 05 | Speaker Identification / Diarization | Understand | Speaker segments |
| 06 | Speech Segmentation | Understand | Speech segments |
| 07 | Transcription Generation | Understand | Timestamped transcript |
| 08 | Transcript Alignment | Understand | Alignment records |
| 09 | Eligibility and Reliability | Understand | Eligibility record |
| 10 | Acoustic Feature Extraction | Analyze | Acoustic observations |
| 11 | Prosodic and Voice Quality Analysis | Analyze | Prosody and voice observations |
| 12 | Temporal and Pause Analysis | Analyze | Temporal observations |
| 13 | Linguistic and Disfluency Analysis | Analyze | Linguistic observations |
| 14 | Question / Answer Alignment | Analyze | Interaction records |
| 15 | Within Speaker Baseline | Analyze | Baseline observations |
| 16 | Cross Method Evidence Assembly | Synthesize | Evidence records |
| 17 | Evidence Convergence and Conflict | Synthesize | Evidence relationships |
| 18 | Candidate Classification | Decide | Candidate assessment |
| 19 | Validation and Calibration Gate | Decide | Validation state |
| 20 | Final Classification / Disposition | Decide | Final assessment |
| 21 | Audit and Provenance Output | Decide | Audit package |

## Prepare

### 01 · File Upload / Ingest

Accept the supported recording and create the analysis request.

### 02 · File Decode and Normalization

Decode the media and establish the canonical audio representation used by downstream analysis.

### 03 · Provenance and Integrity

Hash the source and establish run identity together with source metadata.

### 04 · Channel and Recording Assessment

Inspect duration clipping channels signal integrity and recording conditions to establish the recording profile.

## Understand

### 05 · Speaker Identification / Diarization

Establish speaker regions and speaker separation so analysis can be attributed to the appropriate speaker.

### 06 · Speech Segmentation

Locate analyzable speech regions and establish the temporal structure of the recording.

### 07 · Transcription Generation

Generate timestamped transcript content from the spoken recording.

### 08 · Transcript Alignment

Associate transcript content with audio timing so words and language events can be inspected against the source signal.

### 09 · Eligibility and Reliability

Establish the analysis eligibility profile from recording quality signal structure speaker context transcript context and other available inputs.

## Analyze

### 10 · Acoustic Feature Extraction

Extract energy pitch spectral and related acoustic observations.

The analytical track architecture includes waveform pitch F0 intensity spectral energy speech activity pauses and expanded families such as formants HNR spectral flux spectral rolloff MFCC jitter shimmer voice quality response latency speaker turns transcript alignment and evidence events.

### 11 · Prosodic and Voice Quality Analysis

Analyze pitch dynamics intensity dynamics harmonicity HNR and related voice observations.

### 12 · Temporal and Pause Analysis

Measure speech activity pauses response timing and temporal organization.

### 13 · Linguistic and Disfluency Analysis

Analyze transcript structure lexical behavior disfluency and language features.

### 14 · Question / Answer Alignment

Associate responses with prompts response boundaries and conversational structure.

### 15 · Within Speaker Baseline

Compare observations with an independent speaker baseline when a suitable baseline is available.

## Synthesize

### 16 · Cross Method Evidence Assembly

Convert observations from specialized analytical methods into normalized evidence records with measurement provenance and source intervals.

### 17 · Evidence Convergence and Conflict

Examine agreement dependence conflict and alternative explanations across evidence families.

## Decide

### 18 · Candidate Classification

Produce a candidate analytical state from supported evidence.

### 19 · Validation and Calibration Gate

Apply validation calibration robustness and distribution controls to the classification architecture.

### 20 · Final Classification / Disposition

Produce the configured final analytical disposition from the complete analytical record.

### 21 · Audit and Provenance Output

Preserve measurements methods evidence relationships configuration source intervals and provenance as an auditable analysis package.

## Analysis Workspace

The product workspace is case centered. The pipeline is one expandable view inside the workspace and connects to the shared audio timeline.

The workspace architecture includes:

- source metadata
- file and recording information
- audio playback
- synchronized waveform
- speaker regions
- transcript
- analytical tracks
- evidence timeline
- evidence explorer
- pipeline state
- assessment
- reports
- history

Selecting an analytical interval should resolve to the associated audio and transcript context when available. Selecting transcript content should move the shared playhead to the corresponding source interval.

## Four architectural layers

The 21 stages preserve four distinct analytical layers:

1. **Eligibility and reliability**
2. **Evidence collection and analysis**
3. **Candidate classification**
4. **Final classification and disposition**

The layers are connected but are not collapsed into one score.

## Implementation alignment

The public VoxVector pipeline experience and the canonical engineering pipeline use the same 21 stage model. The frontend represents actual runtime state and must not manufacture execution progress for stages that are not connected to the backend.

The current implementation status for individual stages is maintained in the VoxVector capability and MVP engineering records. The 21 stage model is the target product architecture and the dependency order for continued implementation.

## Engineering dependency path

The fastest connected MVP path follows the actual dependency chain:

1. case identity
2. upload and ingest
3. decode and provenance
4. playback and waveform
5. pipeline lifecycle
6. speaker processing
7. transcription
8. alignment
9. real analytical tracks
10. evidence records
11. evidence synthesis
12. assessment
13. report
14. history and reopen
15. browser end to end verification

## Related documentation

- [VoxVector Overview](/docs/product-dossiers/voxvector/overview)
- [VoxVector Architecture](/docs/product-dossiers/voxvector/architecture)
- [VoxVector Methods](https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ANALYSIS_METHODS.md)
- [VoxVector MVP Build Plan](https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/MVP_BUILD_PLAN.md)
- [VoxVector Validation Architecture](https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/VALIDATION.md)
