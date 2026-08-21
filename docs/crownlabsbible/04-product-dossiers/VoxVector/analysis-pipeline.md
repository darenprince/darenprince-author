# VoxVector Analysis Pipeline

## Canonical 21-stage workflow

The VoxVector product is organized around one connected analysis case. The source recording moves through preparation speaker intelligence transcription alignment specialized analysis evidence synthesis classification validation final disposition and audit.

The canonical product pipeline is:

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

**01 · File Upload / Ingest** establishes the analysis request and source asset.

**02 · File Decode and Normalization** establishes the canonical audio representation.

**03 · Provenance and Integrity** creates source hashing run identity and traceable source metadata.

**04 · Channel and Recording Assessment** characterizes duration clipping channels signal integrity and recording conditions.

## Understand

**05 · Speaker Identification / Diarization** establishes speaker regions and speaker separation.

**06 · Speech Segmentation** locates analyzable speech regions.

**07 · Transcription Generation** creates timestamped transcript content.

**08 · Transcript Alignment** connects transcript content to the audio timeline.

**09 · Eligibility and Reliability** establishes the analysis readiness profile from available recording speaker language and contextual signals.

## Analyze

**10 · Acoustic Feature Extraction** extracts energy pitch spectral and related acoustic observations.

**11 · Prosodic and Voice Quality Analysis** extracts pitch dynamics intensity dynamics harmonicity HNR and related voice observations.

**12 · Temporal and Pause Analysis** measures speech activity pauses response timing and temporal structure.

**13 · Linguistic and Disfluency Analysis** analyzes transcript structure lexical behavior disfluency and language features.

**14 · Question / Answer Alignment** associates responses with prompts and response boundaries.

**15 · Within Speaker Baseline** compares observations with an independent speaker baseline when available.

## Synthesize

**16 · Cross Method Evidence Assembly** converts observations into normalized evidence records with measurement provenance and source intervals.

**17 · Evidence Convergence and Conflict** examines agreement dependence conflict and alternative explanations across evidence families.

## Decide

**18 · Candidate Classification** produces a candidate analytical state from supported evidence.

**19 · Validation and Calibration Gate** applies validation calibration robustness and distribution controls.

**20 · Final Classification / Disposition** produces the configured final analytical disposition.

**21 · Audit and Provenance Output** preserves measurements methods evidence relationships configuration source intervals and provenance as an auditable analysis package.

## Workspace mapping

The target case-centered workspace connects:

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

The shared time axis connects audio speaker transcript analytical observations and evidence events.

## Architectural separation

The pipeline preserves four distinct layers:

1. Eligibility and reliability
2. Evidence collection and analysis
3. Candidate classification
4. Final classification and disposition

The layers remain connected without collapsing the analytical workflow into a single score.

## Engineering alignment

The public VoxVector pipeline and the engineering architecture use the same 21-stage model. Runtime state must come from actual backend stage data. Planned stages remain part of the canonical product architecture without being presented as completed runtime behavior.

The fastest MVP dependency path is:

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

## Authority

`VoxVector/docs/` is the technical source of truth.

This Crown Labs Bible page mirrors the canonical product architecture for executive and documentation use.
