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

## Current source and deployment checkpoint — 2026-09-10

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Exact-main VoxVector QA `34532394431` succeeded and GitHub Pages publication workflow `34532394423` succeeded.

Render deployment `dep-dahi2ics728c73b6ujug` is `live` on exact source `420536771875c6948be51851118b58cb04a596e6`, with production auto-deploy disabled. No fresh `/health` response for that exact deployment is recorded by the current synchronization pass.

The current live service and owner-provided Render export generated `2026-09-10T21:38:48Z` use `requirements-speech.txt`; canonical root `render.yaml` uses `requirements-transcription.txt`. Root Blueprint also declares `CORS_ORIGINS` while the export does not list it. #964 owns deliberate reconciliation into the existing root Blueprint before final controlled runtime evidence is accepted.

## Historical controlled provider execution

A controlled 183.3-second case on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` completed:

- source upload/private persistence;
- Stage 05 Speech Segmentation with 26 segments;
- Stage 07 faster-whisper using `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process;
- transcription in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- Stage 08 transcript alignment state.

The API process later restarted during the post-provider/downstream transition after memory entered the constrained runtime danger zone. The owner confirmed the incident was a memory problem. The source audio remained persisted, but the completed transcript/provider artifact was not durably attached to the run before Stage 10 on that historical deployed revision.

This proves provider execution for that historical run. It does not prove current `420536...` end-to-end stability, transcript correctness, browser verification, or scientific validation.

## Prepare

Stages 01 through 04 establish source intake, canonical audio, provenance, and recording/channel profile.

## Understand

**05 · Speech Segmentation** locates analyzable speech regions before heavyweight provider acquisition.

**06 · Speaker Identification / Diarization** establishes speaker turns when the configured provider is invoked. The production primary architecture is pyannoteAI cloud; local Community-1 is optional fallback only.

**07 · Transcription Generation** creates timestamped transcript segments and words through faster-whisper when execution-ready.

**08 · Transcript Alignment** connects transcript timing to the audio timeline and to speaker turns when available.

**09 · Eligibility and Reliability** establishes the analytical eligibility/reliability state. It is separate from runtime resource admission.

## Durable upstream checkpoint

Merged source requires completed provider output to be persisted to the **same case run** before dependent heavyweight downstream analysis begins.

The checkpoint preserves, when available:

- transcription state and normalized transcript artifact;
- diarization state and speaker records;
- multimodal alignment timeline;
- provider timings/provenance;
- completed upstream stage state;
- stable case/run/request/source identity;
- process and hosting-instance provenance.

Operational checkpoint logs use sanitized state/count metadata and do not copy raw transcript text into diagnostics.

The checkpoint exists so successfully completed speech work survives a later downstream failure or process restart. It is a durability boundary, not a second pipeline or second run.

## Stage 10 memory admission and single-flight execution

Before Stage 10 Acoustic Feature Extraction is represented as running on the constrained Render path, the API must check process RSS against the configured operational admission threshold.

Current source reference:

- memory reference: 512 MiB
- reserved headroom: 96 MiB
- reference admission ceiling: 416 MiB

Current merged source also places the complete downstream composite analysis behind fail-fast process-wide single-flight admission. A competing request cannot wait behind an active heavyweight lock and later execute after its route has already failed. An admitted composite call rechecks RSS while owning the shared lock and retains that lock through complete composite execution.

If current RSS is already at or above the ceiling, Stage 10 must not start. The run preserves completed upstream transcript/alignment evidence and records an explicit bounded downstream failure/not-run state.

This is operational safety, not a scientific eligibility decision. Reopened #941 owns controlled production verification after #964 establishes the intended runtime configuration.

## Analyze

Stages 10 through 15 produce acoustic, prosodic, voice-quality, temporal, linguistic, interaction, and baseline observations only when their dependencies are available.

A failed runtime resource gate must not be rewritten as an analytical finding.

## Synthesize and Decide

Stages 16 through 21 preserve evidence assembly, convergence/conflict, candidate assessment, validation/calibration boundary, guarded final disposition, and audit/provenance output.

The architecture keeps these distinct from raw evidence collection and eligibility/reliability.

## Stable run identity and recovery

One route-owned case run remains the persistence owner across provider checkpointing and downstream finalization. The stable ID is `run_id`.

The pipeline-internal analytical UUID is retained separately as `pipeline_run_id`; it must not replace the persistent case run identity.

`process_instance_id` identifies the active Python process. `render_instance_id` preserves Render infrastructure identity separately because an internal Python restart may occur while the Render instance label remains the same.

## Workspace mapping

The target case-centered workspace connects source metadata, audio playback, waveform, speech/speaker regions, transcript, analytical tracks, evidence timeline/explorer, pipeline state, assessment, reports, and history using one shared time axis.

Reopened cases must use persisted source/run artifacts. #963 owns frontend playback/transcript/speaker/alignment/report rehydration after the upstream runtime/provider evidence gates establish those artifacts.

## Frontend engineering alignment

Runtime state comes from the backend contract. Current `voxvector/src/components/PipelineBuildCard.jsx` still has stale local Stage 05/06 ordering and queued Stage 07/08 fallback text. #965 owns correction in that existing component so backend `pipeline_build.status_by_stage` is preferred when available. This is a synchronization defect, not an alternate pipeline.

Current `main` `AuthGate.jsx` still lacks the requested login-time API wake. Draft PR #974 under #931 contains the candidate wake plus shared role-aware developer/admin/user self-profile implementation. It is not current/deployed behavior and requires current-main integration QA and browser acceptance.

## Engineering dependency path

1. #964 — Render Blueprint/runtime-profile reconciliation.
2. Reopened #941 — controlled durable transcription/Stage 10 proof.
3. #970 — current pyannoteAI cloud contract, provider execution, persisted speaker evidence.
4. #971 — persisted transcript/audio/speaker alignment.
5. #963 — historical-case source/playback/artifact rehydration.
6. #930 / #959 — intake reliability and production observability acceptance.
7. #965 — truthful frontend pipeline projection.
8. #931 / draft PR #974 — login wake/shared profiles/authenticated role browser matrix.
9. #932 — release-critical public navigation.
10. #972 — frozen candidate and two same-revision/configuration golden cases.
11. Scientific validation as a separate program.

## Related active work

- #964: canonical root Render Blueprint/runtime-profile reconciliation.
- #941: reopened controlled post-#967 production proof.
- #970: cloud-primary diarization execution/persistence.
- #971: persisted multimodal alignment.
- #959: merged dual Render + Supabase logs and Debug Bundle source; production acceptance open.
- #963: reopened persisted source/audio/transcript/speaker/alignment/report rehydration.
- #965: frontend pipeline contract synchronization.
- #931 / draft PR #974: login wake/shared self-profile/current role browser acceptance.
- #972: final engineering-MVP repeatability gate.

## Authority

`VoxVector/docs/` is the technical source of truth. This Crown Labs Bible page mirrors the canonical product architecture for executive/documentation use.
