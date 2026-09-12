# VoxVector Analysis Pipeline

## Canonical 21-stage workflow

| # | Stage | Group | Primary output |
|---:|---|---|---|
| 01 | File Upload / Ingest | Prepare | Source asset |
| 02 | File Decode and Normalization | Prepare | Normalized audio |
| 03 | Provenance and Integrity | Prepare | Provenance record |
| 04 | Channel and Recording Assessment | Prepare | Recording profile |
| 05 | Speech Segmentation | Understand | Speech segments |
| 06 | Speaker Identification / Diarization | Understand | Speaker segments |
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

The 05/06 order mirrors the canonical backend contract.

## Current deployed validation

On 2026-09-12, backend **0.2.27** at revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80` completed one controlled 183.3-second run in **247,984 ms**.

Result:

- **17 stages complete**
- **0 failed**
- **4 intentionally not run**
- Stage 05: 26 speech segments
- Stage 06: not run, cloud diarization not invoked
- Stage 07: faster-whisper completed in about 150.1 seconds
- Stage 08: transcript/audio alignment available
- Stage 10: admitted at 118.6 MB RSS and completed in about 73.8 seconds
- no uncontrolled API restart

Durable acquisition checkpoint:

- 58 transcript segments
- 246 words
- transcription state completed
- alignment available
- diarization not invoked

**#941 is complete.**

## Source maturity versus runtime outcome

Fresh `/health` reports:

- 21 total
- 16 implemented foundations
- 1 queued
- 4 conditional/not invoked

The controlled run's 17/21 result is a runtime outcome, not a replacement for the source maturity contract.

## Prepare

Stages 01–04 establish source intake, normalized media, provenance and recording/channel profile.

## Understand

**05 · Speech Segmentation** locates analyzable speech regions before heavyweight provider acquisition.

**06 · Speaker Identification / Diarization** establishes speaker turns when the configured provider is invoked. Production primary is pyannoteAI cloud. Fresh health reports it configured and execution-ready, but real current execution/persistence remains #970.

**07 · Transcription Generation** uses faster-whisper. Current same-revision execution is proven.

**08 · Transcript Alignment** connects transcript timing to the audio timeline. Current transcript/audio alignment is proven; speaker-inclusive alignment remains #971.

**09 · Eligibility and Reliability** is an analytical eligibility control, separate from runtime memory admission.

## Durable upstream checkpoint

The current controlled run proves provider output can be persisted to the same case run before Stage 10.

The checkpoint preserves, when available:

- transcription state and normalized transcript artifact
- diarization state and speaker records
- alignment timeline
- provider timing/provenance
- completed upstream stage state
- stable case/run/request/source identity
- process and hosting-instance provenance

## Stage 10 memory admission

Current constrained reference:

- memory limit: 512 MB
- reserved headroom: 96 MB
- admission ceiling: 416 MB

September 12 proof:

- transcription after-GC: 116.63 MB RSS
- Stage 10 start: 118.6 MB RSS
- Stage 10 completion: about 73.8 seconds
- Stage 10 after-GC: 128.63 MB RSS
- API restart: none

The intended provider → checkpoint → Stage 10 boundary is now production-proven for the validated revision.

## Analyze

Stages 10–15 produce acoustic, prosodic, voice-quality, temporal, linguistic, interaction and baseline observations when dependencies exist.

The controlled run completed Stages 10–13. Stage 14 was not run because question context was absent. Stage 15 was not run because no independent baseline was attached.

## Synthesize and Decide

Stages 16–18 and 20–21 completed in the controlled run. Stage 19 Validation and Calibration was intentionally not invoked.

No engineering completion state is a scientific deception-validity claim.

## Workspace mapping and visual evidence

The September 12 Confidential IP screenshots visibly confirm:

- case creation/selection
- source upload
- protected playback
- waveform and seek controls
- live level meter
- spectral analysis / spectrogram
- pitch trajectory
- decoded media metadata and provenance
- correct Stage 05/06 ordering
- Stage 06 `Not run`
- Stage 07 live progression

The visual 4:16 `1017 LA-524 2.wav` session is a separate browser case from the 183.3-second controlled proof and must not be conflated with it.

## Observability finding

A real sanitized Debug Bundle exists for the successful controlled run with runtime health, Render status and 100 Render logs plus a Supabase Render-log mirror. Exact exported VoxVector event/error correlation remains open under #959.

A separate browser case reproduced `Failed to fetch`; Render evidence identified a case-read `TimeoutError` inside diagnostic persistence while `/health` remained 200 and later reads succeeded. #998 tracks isolation of telemetry persistence from product-request success.

## Current engineering dependency path

1. #970 cloud-primary diarization execution + persistence
2. #971 persisted speaker/transcript/audio alignment
3. #963 historical-case source/playback/artifact rehydration
4. #930 intake reliability bounding
5. #998 observability persistence isolation
6. #959 complete dual-copy observability / Debug Bundle correlation
7. authenticated desktop/mobile acceptance
8. #972 frozen candidate + two same-revision/configuration golden cases
9. scientific validation separately

## Authority

`VoxVector/docs/` is the technical source of truth. This Crown Labs Bible page mirrors the current product architecture and runtime state for executive/documentation use.
