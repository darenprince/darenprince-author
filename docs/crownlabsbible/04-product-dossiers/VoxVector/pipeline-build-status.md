# VoxVector Pipeline Build Status

**Status date:** 2026-09-08

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current engineering state

VoxVector's canonical product architecture contains 21 stages from file intake through audit and provenance output.

Current runtime maturity remains:

- 16 stages with implemented or built runtime foundations.
- 4 conditional or intentionally not invoked without required inputs.
- 1 queued for deeper runtime integration.
- all 21 represented in the canonical backend stage contract.

The latest observed Render runtime reports faster-whisper plus the pyannoteAI cloud primary as configured/execution-ready. The local Community-1 fallback was disabled/not ready. Provider readiness does not promote queued stages without real provider-backed execution and artifact persistence.

## Live API checkpoint

Observed Render `/health` state recorded by the canonical engineering documentation:

- pipeline `0.2.26`
- source revision `73ac03ded08c161e092ee2a4ecbbed7d036771c8`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- maximum sample rate `48,000 Hz`
- maximum media size `250 MiB`
- faster-whisper configured and execution-ready
- pyannoteAI cloud primary configured and execution-ready
- local pyannote Community-1 fallback disabled and not execution-ready
- current commit QA field `external_workflow_required`

The case-analysis route also requires `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` before it invokes the configured diarization provider. This gate is separate from `/health` readiness.

## Current engineering stage

**Controlled speech-provider execution and evidence artifact integration.**

The next dependency is a controlled real WAV execution of transcription and the configured cloud-primary diarization path, followed by persistence and synchronized alignment.

## Provider path

1. Run faster-whisper and verify transcript segments/word timestamps.
2. Confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime without exposing credentials.
3. Run the pyannoteAI cloud primary and verify speaker turns plus provider provenance.
4. Persist transcript and speaker artifacts by case/run.
5. Normalize timing and produce the multimodal alignment artifact.
6. Test local Community-1 only as a separate explicit fallback exercise when fallback configuration is enabled.
7. Connect downstream linguistic, interaction, baseline, and evidence consumers.

## Analysis Workspace direction

The post-analysis workspace is being expanded toward:

- synchronized audio and waveform
- speaker regions
- timestamped transcript
- analytical tracks
- evidence markers
- 21-stage lifecycle state
- Review Evidence
- assessment
- reporting
- saved case history and reopen

## QA boundary

The exact source revision is surfaced by the runtime independently from GitHub QA. Runtime `current_commit_qa` values and GitHub Actions evidence must be matched by revision before source QA is called current.

Software QA, provider execution, infrastructure health, and scientific validation remain separate evidence classes.

## Developer Console

The dashboard projects real runtime and engineering evidence through the 21-stage build control, runtime health, diagnostics, Render infrastructure, AWS environment status, structured audits, and report/audit/log export controls.

The Console must never simulate provider execution or stage progress.

## Current engineering sequence

1. Exact-commit QA.
2. Controlled faster-whisper execution.
3. Controlled pyannoteAI cloud-primary execution with the route gate enabled.
4. Persist transcript, speaker, and alignment artifacts.
5. Optional local Community-1 fallback exercise only when fallback behavior itself is being tested.
6. Expose synchronized speaker/transcript/evidence views.
7. Feed transcript into linguistic/disfluency analysis.
8. Add question/response context, speaker-aware acoustic aggregation, and baseline inputs.
9. Complete Review Evidence, assessment, reporting, and history/reopen.
10. Complete authenticated desktop/mobile verification.
11. Advance scientific validation only after engineering evidence is stable.

## Scientific boundary

The pipeline remains an evidence-analysis architecture, not a claim that an individual vocal feature proves deception. Candidate classification and final disposition remain distinct from eligibility/reliability and evidence collection. Scientific validation is a separate gate.

**Canonical source:** `VoxVector/docs/PIPELINE_BUILD_STATUS.md`

## pyannote provider synchronization — 2026-09-04

Canonical VoxVector supports pyannoteAI cloud diarization as the current primary provider using a protected server-side API key, with local pyannote Community-1 retained as an explicit configuration-controlled fallback. Provider substitution is recorded in provenance and is not silent. Implementation or readiness does not itself claim successful provider execution or scientific validation.
