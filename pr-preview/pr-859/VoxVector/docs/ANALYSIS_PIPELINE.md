# VoxVector Analysis Pipeline

## Purpose

This is the canonical product and engineering pipeline model for VoxVector. The pipeline describes the complete path from an uploaded recording to a guarded final disposition.

The pipeline is broader than the current observational runtime. Each stage is explicitly marked by implementation state so planned research capability is not represented as current functionality.

## Complete pipeline

| # | Stage | Function | Current state |
|---:|---|---|---|
| 01 | File Upload / Ingest | Accept the supported audio file and establish the analysis request. | Implemented |
| 02 | File Decode and Normalization | Decode the media and normalize the audio representation used by the engine. | Implemented |
| 03 | Provenance and Integrity | Hash the input and retain source metadata and run identity. | Implemented |
| 04 | Channel and Recording Assessment | Inspect duration clipping signal integrity and recording conditions. | Implemented / expanding |
| 05 | Speaker Identification / Diarization | Identify speaker regions and determine whether speaker separation is adequate. | Planned research |
| 06 | Speech Segmentation | Locate speech activity and establish analyzable segments. | Implemented in bounded frame processing / expanding |
| 07 | Transcription Generation | Generate a transcript from the audio for linguistic and conversational analysis. | Planned research |
| 08 | Transcript Alignment | Attach word and phoneme timing to the audio when supported. | Planned research |
| 09 | Eligibility and Reliability Gate | Determine whether the available audio speaker and transcript evidence is adequate for analysis. | Implemented / expanding |
| 10 | Acoustic Feature Extraction | Measure energy intensity spectral F0 harmonic and related acoustic observations. | Integrated |
| 11 | Prosodic and Voice Quality Analysis | Measure pitch dynamics intensity dynamics harmonicity HNR and related voice behavior. | Integrated / expanding |
| 12 | Temporal and Pause Analysis | Measure pauses speech activity response latency and temporal structure when boundaries exist. | Integrated / expanding |
| 13 | Linguistic and Disfluency Analysis | Analyze transcript observations including filled pauses repetitions and future richer linguistic features. | Partial integrated / expanding |
| 14 | Question / Answer Alignment | Associate responses with prompts and measure response level context. | Partial / planned expansion |
| 15 | Within Speaker Baseline | Compare current observations against an independent speaker baseline when sufficient material exists. | Integrated when supplied |
| 16 | Cross Method Evidence Assembly | Convert observations into neutral evidence records with provenance and quality. | Integrated |
| 17 | Evidence Convergence and Conflict | Examine agreement dependence conflict and alternative explanations without collapsing everything into one score. | Integrated foundation / expanding |
| 18 | Candidate Classification | Produce a provisional candidate state from supported evidence. | Integrated boundary — indeterminate only |
| 19 | Validation and Calibration Gate | Apply task specific validation calibration robustness and out of distribution controls before inferential use. | Planned research |
| 20 | Final Classification / Disposition | Produce a validated classification or abstain when gates are not satisfied. | Guarded disposition only |
| 21 | Audit and Provenance Output | Return what was measured what was unavailable reliability evidence direction uncertainty alternatives and provenance. | Integrated |

## Why the missing stages matter

### File upload / ingest

The system cannot begin an auditable analysis until the recording enters a controlled workflow. Upload state is a product workflow stage even though the backend analysis engine receives decoded signal data.

### Speaker identification / diarization

Speaker attribution is a prerequisite for any analysis that depends on within speaker measurements speaker baselines turn taking or multi speaker recordings. It must remain separate from the identity of a real person. The system can identify speaker segments without claiming who the person is.

### Transcription generation

The current engine can consume supplied transcript tokens for limited disfluency observations. A complete product workflow needs an explicit transcription generation stage so audio can feed linguistic and conversational analysis rather than requiring an externally supplied transcript.

### Transcript alignment

A transcript without timing cannot reliably support word level pause context response boundaries turn attribution or audio to language synchronization. Word and phoneme timing therefore belong between transcription and deeper linguistic analysis.

### Channel and recording assessment

Reliability is more than a single audio quality score. Channel count speaker overlap clipping duration noise and recording artifacts can determine whether downstream measurements are interpretable.

### Speech segmentation

The engine already processes bounded audio frames and derives pause topology. The product pipeline should expose speech segmentation as a recognizable stage because downstream methods operate on analyzable speech regions rather than an undifferentiated file.

### Question / answer alignment

For deception research a response is interpreted in relation to the prompt or proposition being answered. Response latency substantive latency contradiction analysis and consistency work are substantially stronger when question and response boundaries are explicit.

### Validation and calibration

This is a gate rather than another feature extractor. A future deception classifier cannot be promoted simply because multiple signals converge. Task specific validation calibration speaker disjoint evaluation recording condition stress tests and robustness checks must precede inferential deployment.

## Scientific boundary

No individual acoustic vocal temporal linguistic behavioral or psychological signal proves deception.

The pipeline must preserve:

- observations
- provenance
- reliability
- evidence convergence
- evidence conflict
- uncertainty
- alternative explanations
- missing data
- abstention

The final classification stage must never be presented as active validated deception inference unless the required validation program has actually been completed.

## Product versus implementation state

This pipeline intentionally contains stages that are planned. Planned stages are part of the product architecture and research roadmap but are not current runtime capabilities.

The current primary pipeline remains an observational foundation. Its implemented orchestration includes reliability assessment acoustic and spectral observations F0 and intensity dynamics HNR MFCC observations formant tracking pause topology optional response latency optional transcript disfluency and optional within speaker baseline comparisons.
