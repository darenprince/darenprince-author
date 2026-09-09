# VoxVector Pipeline Build Status

**Status date:** 2026-09-09

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current engineering state

VoxVector's canonical product architecture contains 21 stages from file intake through audit and provenance output.

Current runtime maturity remains:

- 16 stages with implemented or built runtime foundations.
- 4 conditional or intentionally not invoked without required inputs.
- 1 queued for deeper runtime integration.
- all 21 represented in the canonical backend stage contract.

The September 9 transcription containment/dependency-order repair is deployed on the original Render backend at revision `09381797d4486bc049cb99a527c624690274b7c7`. The latest observed runtime reports faster-whisper plus the pyannoteAI cloud primary as configured/execution-ready. The local Community-1 fallback remains optional and has not been established as safe production execution on the constrained Render runtime. Provider readiness and deployment health do not establish controlled provider execution or promote queued stages.

## Live API checkpoint

Manual Render deployment `dep-dagjc3740ujc73ff3ge0` checked out backend revision `09381797d4486bc049cb99a527c624690274b7c7`, built successfully, started Uvicorn, returned repeated `/health` HTTP 200 responses, and reached terminal `live` state. GitHub `main` later advanced with frontend/documentation changes while Render remained intentionally on the last manually deployed backend revision.

This deployment evidence is not a controlled real-audio transcription run, speaker-diarization execution, persisted transcript/speaker artifact readback, authenticated browser verification, or scientific validation.

The case-analysis route requires `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` before it invokes the configured diarization provider. This gate is separate from provider readiness.

## Current engineering stage

**Dependency-ordered provider execution, resilient run completion, and evidence artifact integration.**

The next dependency is controlled real WAV execution of transcription and the configured cloud-primary diarization path, followed by persistence, synchronized alignment, and explicit recovery behavior under failure/timeout conditions.

## Provider path

1. Run faster-whisper and verify transcript segments/word timestamps.
2. Confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime without exposing credentials.
3. Run the pyannoteAI cloud primary and verify speaker turns plus provider provenance.
4. Persist transcript and speaker artifacts by case/run.
5. Normalize timing and produce the multimodal alignment artifact.
6. Retain local Community-1 as the explicit fallback path; before enabling it on the constrained Render runtime, establish and verify bounded memory/runtime behavior.
7. When a deliberate primary failure or timeout test is performed, verify fallback invocation and provenance without representing configuration as execution.
8. Connect downstream linguistic, interaction, baseline, and evidence consumers only when their required inputs exist.

## Analysis Workspace direction

The post-analysis workspace includes or is being expanded toward:

- synchronized audio and waveform
- speaker regions
- timestamped transcript
- analytical tracks
- evidence markers
- 21-stage lifecycle state
- running and final elapsed time
- Review Evidence
- assessment
- reporting
- saved case history and reopen
- copy/download of structured run and failure reports

## Run lifecycle recovery checkpoint — issue #945 / PR #946

The active recovery branch extends the existing case-run lifecycle rather than creating a duplicate pipeline.

Source behavior on the branch:

- Case History listing reconciles eligible stale/deadline-expired `running` runs so old records do not remain indefinitely in progress merely because the individual case was never reopened.
- Recovery marks the interrupted active stage failed and terminalizes remaining unfinished stages as `not_run` with an explicit reason.
- Independent work remains eligible to continue under the existing continue-after-failure orchestration policy; dependent stages are not falsely promoted when required inputs failed.
- Active runs expose real running time and terminal runs persist elapsed time.
- Terminal runs persist a structured `run_report`; failed and `completed_with_failures` runs additionally persist a `failure_report` containing identifiers, source revision when available, timing, provider state, stage states, errors, completed work, failed work, not-run work, and unresolved work.
- The existing Case Analysis Workspace exposes Copy run report and Download run report controls for the JSON report.
- The pyannoteAI → Community-1 fallback wrapper preserves the primary failure in provenance when fallback succeeds and reports both provider failures if fallback also fails.

The prior documentation-synchronized head `107413b821d8a444f212c3a6d523f3bf8d95ec6b` passed VoxVector QA #1896 with 196 Python tests, eight frontend contract tests, and a successful React build; PR Preview Build #787 also passed. Runtime-evidence documentation alignment after that checkpoint advances the branch and requires fresh exact-head QA before merge recommendation.

This is source/QA evidence only. It is not a production deployment of PR #946, provider execution, browser verification, or scientific validation. The Community-1 fallback is not represented as enabled in production by this checkpoint.

## QA boundary

The exact source revision is surfaced by the runtime independently from GitHub QA. Runtime source revision values and GitHub Actions evidence must be matched by revision before source QA is called current.

Software QA, provider execution, infrastructure health, browser verification, and scientific validation remain separate evidence classes.

## Developer Console

The dashboard projects real runtime and engineering evidence through the 21-stage build control, runtime health, diagnostics, Render infrastructure, AWS environment status, structured audits, and report/audit/log export controls.

The Console must never simulate provider execution or stage progress.

## Current engineering sequence

1. Fresh exact-head QA and review for PR #946.
2. Merge only after reviewable source and documentation integrity are confirmed.
3. Deliberately deploy the approved backend revision through the protected manual Render path.
4. Verify runtime `/health` revision and intended runtime settings.
5. Refresh Case History and verify old eligible in-progress runs are terminalized with useful downloadable reports.
6. Execute controlled faster-whisper.
7. Execute controlled pyannoteAI cloud-primary diarization with the route gate enabled.
8. Persist transcript, speaker, and alignment artifacts.
9. Establish a bounded memory/runtime plan before enabling local Community-1 fallback on constrained Render; then deliberately verify fallback behavior.
10. Feed transcript into linguistic/disfluency analysis and continue only dependency-valid downstream work.
11. Complete Review Evidence, assessment, reporting, and history/reopen.
12. Complete authenticated desktop/mobile verification.
13. Advance scientific validation only after engineering evidence is stable.

## Scientific boundary

The pipeline remains an evidence-analysis architecture, not a claim that an individual vocal feature proves deception. Candidate classification and final disposition remain distinct from eligibility/reliability and evidence collection. Scientific validation is a separate gate.

**Canonical source:** `VoxVector/docs/PIPELINE_BUILD_STATUS.md`

## pyannote provider synchronization — 2026-09-04

Canonical VoxVector supports pyannoteAI cloud diarization as the current primary provider using a protected server-side API key, with local pyannote Community-1 retained as an explicit configuration-controlled fallback. Provider substitution is recorded in provenance and is not silent. Implementation or readiness does not itself claim successful provider execution or scientific validation.
