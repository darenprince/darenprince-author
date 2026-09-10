# VoxVector Analysis Pipeline

## Canonical 21-stage workflow

VoxVector is organized around one connected analysis case. The source recording moves through preparation, speech/speaker understanding, transcription, alignment, specialized analysis, evidence synthesis, classification, validation, final disposition, and audit.

The canonical product pipeline is:

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

The 05/06 order above mirrors the canonical backend contract. Historical dated records may preserve the prior numbering as historical evidence.

## Current execution evidence — 2026-09-10

A controlled 183.3-second case on deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` completed:

- source upload/private persistence;
- Stage 05 Speech Segmentation with 26 segments;
- Stage 07 faster-whisper using `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process;
- transcription in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- Stage 08 transcript alignment state.

The API process later restarted during the post-provider/downstream transition after memory entered the constrained runtime danger zone. The owner confirmed the incident was a memory problem. The source audio remained persisted, but the completed transcript/provider artifact was not durably attached to the run before Stage 10 on that deployed revision.

This proves provider execution for that run. It does not prove end-to-end stability, transcript correctness, browser verification, or scientific validation.

## Prepare

Stages 01 through 04 establish source intake, canonical audio, provenance, and recording/channel profile.

## Understand

**05 · Speech Segmentation** locates analyzable speech regions before heavyweight provider acquisition.

**06 · Speaker Identification / Diarization** establishes speaker turns when the configured provider is invoked. The production primary architecture is pyannoteAI cloud; local Community-1 is optional fallback only.

**07 · Transcription Generation** creates timestamped transcript segments and words through faster-whisper when execution-ready.

**08 · Transcript Alignment** connects transcript timing to the audio timeline and to speaker turns when available.

**09 · Eligibility and Reliability** establishes the analytical eligibility/reliability state. It is separate from runtime resource admission.

## Durable upstream checkpoint

Completed provider output must be persisted to the **same case run** before dependent heavyweight downstream analysis begins.

The checkpoint preserves, when available:

- transcription state and normalized transcript artifact;
- diarization state and speaker records;
- multimodal alignment timeline;
- provider timings/provenance;
- completed upstream stage state;
- stable case/run/request/source identity;
- process and hosting-instance provenance.

Operational checkpoint logs use sanitized state/count metadata and do not copy raw transcript text into diagnostics.

## Stage 10 memory admission

Before Stage 10 Acoustic Feature Extraction is represented as running on the constrained Render path, the API must check process RSS against the configured operational admission threshold.

Current reference:

- memory reference: 512 MiB
- reserved headroom: 96 MiB
- admission ceiling: 416 MiB

If current RSS is already at or above the ceiling, Stage 10 must not start. The run preserves completed upstream transcript/alignment evidence and records an explicit bounded downstream failure/not-run state.

This is operational safety, not a scientific eligibility decision.

## Analyze

Stages 10 through 15 produce acoustic, prosodic, voice-quality, temporal, linguistic, interaction, and baseline observations only when their dependencies are available.

A failed runtime resource gate must not be rewritten as an analytical finding.

## Synthesize and Decide

Stages 16 through 21 preserve evidence assembly, convergence/conflict, candidate assessment, validation/calibration boundary, guarded final disposition, and audit/provenance output.

The architecture keeps these distinct from raw evidence collection and eligibility/reliability.

## Stable run identity and recovery

One case run remains the persistence owner across provider checkpointing and downstream finalization. A pipeline-internal run identifier may be retained separately but must not replace the persistent case `run_id`.

`process_instance_id` identifies the active Python process. `render_instance_id` preserves Render infrastructure identity separately because an internal Python restart may occur while the Render instance label remains the same.

## Workspace mapping

The target case-centered workspace connects source metadata, audio playback, waveform, speech/speaker regions, transcript, analytical tracks, evidence timeline/explorer, pipeline state, assessment, reports, and history using one shared time axis.

Reopened cases must use persisted source/run artifacts. #963 owns frontend playback/transcript rehydration after #941 establishes the canonical durable checkpoint.

## Engineering alignment

Runtime state comes from the backend contract. Static frontend metadata that contradicts current backend stage order or maturity is a synchronization defect, not an alternate pipeline.

The fastest dependency path is:

1. case identity and persisted source;
2. speech segmentation;
3. provider-backed transcription and cloud-primary diarization;
4. durable same-run provider checkpoint;
5. transcript/audio/speaker alignment;
6. Stage 10 memory admission and downstream analysis;
7. evidence records and synthesis;
8. assessment/report;
9. history and reopen;
10. authenticated browser verification;
11. two complete same-revision golden cases;
12. scientific validation as a separate program.

## Related active work

- #941 / draft PR #962: confirmed post-transcription memory failure and durable upstream checkpoint
- #959 / draft PR #961: dual Render + Supabase logs and Debug Bundle
- #963: reopened persisted audio/transcript rehydration
- #964: canonical root Render Blueprint reconciliation

## Authority

`VoxVector/docs/` is the technical source of truth. This Crown Labs Bible page mirrors the canonical product architecture for executive/documentation use.
