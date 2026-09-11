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

## Frontend engineering alignment — PR #993

The existing `voxvector/src/components/PipelineBuildCard.jsx` is the single Developer Console owner for the 21-stage engineering projection. PR #993 corrects that existing component rather than creating another pipeline surface.

In the candidate source:

- Stage 05 is Speech Segmentation and Stage 06 is Speaker Identification / Diarization, matching the backend contract;
- mutable row state prefers backend `pipeline_build.status_by_stage` whenever `/health` provides it;
- `implemented*` foundation variants are normalized for presentation without converting readiness into provider execution evidence;
- static stage metadata is used only as a contract-matching fallback while backend state is loading or unavailable, and the fallback is labeled explicitly;
- Stage 07 and Stage 08 fallback states match the backend implemented-foundation contract rather than the obsolete queued presentation;
- no stage is marked current unless a backend current-stage token identifies it;
- the same `/health` contract and existing `PipelineBuildCard.jsx` remain in place, with no duplicate frontend or backend pipeline owner.

This is software/source truth correction only. It is not provider execution, a deployment claim, authenticated browser verification, engineering-MVP completion, or scientific validation.

## Preserved deployment checkpoint — 2026-09-10

At the 2026-09-10 checkpoint, canonical GitHub `main` was `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Exact-main VoxVector QA `34532394431` succeeded and GitHub Pages publication workflow `34532394423` succeeded.

Render deployment `dep-dahi2ics728c73b6ujug` was `live` on exact source `420536771875c6948be51851118b58cb04a596e6`, with production auto-deploy disabled. No fresh `/health` response for that exact deployment was recorded by that synchronization pass.

The historical checkpoint recorded a Render dependency-profile drift under #964. Issue #964 was subsequently completed after repository/service reconciliation and sole-service inventory verification. The checkpoint is retained here as historical evidence and is not used as proof of the PR #993 frontend candidate.

## Historical controlled provider execution

A controlled 183.3-second case on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` completed:

- source upload/private persistence;
- Stage 05 Speech Segmentation with 26 segments;
- Stage 07 faster-whisper using `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process;
- transcription in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- Stage 08 transcript alignment state.

The API process later restarted during the post-provider/downstream transition after memory entered the constrained runtime danger zone. The owner confirmed the incident was a memory problem. The source audio remained persisted, but the completed transcript/provider artifact was not durably attached to the run before Stage 10 on that historical deployed revision.

This proves provider execution for that historical run. It does not prove current end-to-end stability, transcript correctness, browser verification, or scientific validation.

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

Merged source also places the complete downstream composite analysis behind fail-fast process-wide single-flight admission. A competing request cannot wait behind an active heavyweight lock and later execute after its route has already failed. An admitted composite call rechecks RSS while owning the shared lock and retains that lock through complete composite execution.

If current RSS is already at or above the ceiling, Stage 10 must not start. The run preserves completed upstream transcript/alignment evidence and records an explicit bounded downstream failure/not-run state.

This is operational safety, not a scientific eligibility decision. Reopened #941 owns controlled production verification; #964 is complete and no longer blocks that proof gate.

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

## Authenticated entry state

Current merged `AuthGate.jsx` performs a non-blocking canonical API wake after successful password login before trusted-role routing settles. Shared role-aware profile handling remains part of the canonical account implementation.

That wake is connectivity/readiness behavior only. It is not provider execution, a Render deployment, successful analysis, or scientific validation. Authenticated desktop/mobile browser acceptance remains a separate evidence class.

## Engineering dependency path

1. Reopened #941 — controlled durable transcription/Stage 10 proof.
2. #970 — current pyannoteAI cloud contract, provider execution, persisted speaker evidence.
3. #971 — persisted transcript/audio/speaker alignment.
4. #963 — historical-case source/playback/artifact rehydration.
5. #930 / #959 — intake reliability and production observability acceptance.
6. #965 / PR #993 — truthful frontend pipeline projection; source QA and browser acceptance remain separate gates.
7. #932 / PR #993 — release-critical public navigation and site-map wiring; browser acceptance remains separate.
8. #972 — frozen candidate and two same-revision/configuration golden cases.
9. Scientific validation as a separate program.

## Related active work

- #964: **completed** canonical Render Blueprint/runtime-profile reconciliation.
- #941: reopened controlled production proof.
- #970: cloud-primary diarization execution/persistence.
- #971: persisted multimodal alignment.
- #959: merged dual Render + Supabase logs and Debug Bundle source; production acceptance open.
- #963: reopened persisted source/audio/transcript/speaker/alignment/report rehydration.
- #965 / PR #993: frontend pipeline contract synchronization.
- #932 / PR #993: public CTA/anchor/menu and site-map repair.
- #972: final engineering-MVP repeatability gate.

## Authority

`VoxVector/docs/` is the technical source of truth. This Crown Labs Bible page mirrors the canonical product architecture for executive/documentation use.
