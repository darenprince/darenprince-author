# VoxVector Pipeline Build Status

**Status date:** 2026-09-10

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current engineering state

VoxVector's canonical product architecture contains 21 stages from file intake through audit and provenance output.

Current runtime maturity remains:

- 16 stages with implemented or built runtime foundations.
- 4 conditional or intentionally not invoked without required inputs.
- speaker execution queued for controlled cloud-primary verification; transcription/alignment have built paths requiring controlled provider evidence.
- all 21 stages represented in the canonical backend contract.

Canonical GitHub `main` is `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`. Exact-main VoxVector QA #1963 (`34425588762`), Deploy GitHub Pages #1708 (`34425588752`), and CodeQL push run #71 (`34425587747`) succeeded.

Connected Render inspection on 2026-09-10 reports deployment `dep-dah0g13l550s73d2dbb0` live on the same source revision with trigger `api`. The current backend therefore contains both the September 9 transcription containment/dependency-order repair and the merged #946 lifecycle recovery/report work.

Deployment health does not establish a fresh complete `/health` payload, controlled provider execution, authenticated browser verification, or scientific validation. The API trigger also does not verify #920's protected Developer Console deploy-hook path.

## Current engineering stage

**Verify intake and provider execution on the current deployed source while the remaining P0 source tasks proceed independently.**

Primary active gates:

1. #930 — production reproduction/verification of the intermittent case-source upload 400 now that the merged diagnostics are live.
2. #941 — controlled faster-whisper execution, Render memory/instance correlation, and persisted transcript/run artifact readback.
3. `VV-DIARIZE` — controlled pyannoteAI cloud-primary execution and persisted speaker provenance.
4. `VV-ALIGN` — persisted transcript/speaker/timeline alignment under one case/run identity.
5. #948 / draft PR #951 — auditable secure case deletion, still in review/source hardening.
6. #949 / draft PR #952 — server-aware Stop Analysis, still incomplete.
7. #931 — production administrator Edge Function deployment/trusted-admin/browser verification.

## Provider path

1. Capture a fresh `/health` payload for the current Render source.
2. Run faster-whisper and verify transcript segments/word timestamps plus bounded runtime behavior.
3. Confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime before cloud-primary diarization execution.
4. Run the pyannoteAI cloud primary and verify speaker turns plus provider provenance.
5. Persist transcript and speaker artifacts by case/run.
6. Normalize timing and produce the multimodal alignment artifact.
7. Retain local Community-1 as the explicit fallback path; establish bounded memory/runtime behavior before enabling it on the constrained Render runtime.
8. Connect downstream linguistic, interaction, baseline, and evidence consumers only when their required inputs exist.

Provider configuration/readiness is not provider execution.

## Run lifecycle recovery — issue #945 / PR #946

Issue #945 is closed. PR #946 merged as current `main` after final-head VoxVector QA #1962, PR Preview #818, clean changed-code CodeQL, and resolved review findings.

Merged behavior includes:

- Case History reconciliation for eligible stale/deadline-expired `running` runs;
- protection for legitimate current-worker runs with usable future deadlines;
- explicit failed/not-run terminalization of interrupted/dependent stages;
- persisted active/final elapsed time;
- persisted `run_report` and failure-report metadata;
- historical source-revision preservation and durable terminal metadata backfill;
- per-case in-process serialization across reconciliation, run updates, source mutation, and deletion;
- Copy/Download run-report controls in the existing Analysis Workspace;
- pyannoteAI-primary / explicit Community-1 fallback failure provenance.

The current Render source contains this implementation. Production Case History reconciliation and report readback remain unverified. The in-process lock is not represented as cross-process compare-and-swap protection.

## Intake reliability — issue #930

The pre-handler diagnostic implementation is now present in the current live Render source, so #930 is no longer blocked only on deployment. The next step is an authenticated production reproduction or bounded successful upload/playback verification with request-correlated evidence.

The exact multipart/client/proxy cause of the intermittent 400 remains unproven.

## Transcription runtime verification — issue #941

The source-level OOM/dependency-order repair is merged and included in the current live deployment. It uses dependency-ordered evidence acquisition and a disposable faster-whisper child process with a hard local deadline.

Still required: fresh runtime settings readback, controlled real-audio transcription, bounded completion/failure without API OOM restart, Render memory/instance correlation, persisted transcript/run artifact readback, supported incident-media cleanup, and authenticated browser stage verification.

## Active lifecycle-adjacent source work

### #948 / draft PR #951

Auditable secure deletion remains in progress and is not merge-ready. Current review work includes case-mutation/delete concurrency, durable final receipt recovery, and explicit authenticated DELETE-route receipt opt-in. Application-level storage deletion is not cryptographic proof of provider-level physical sanitization.

### #949 / draft PR #952

Server-aware Stop Analysis remains in progress. The current draft only establishes the frontend cancellation API action. Server lifecycle/persistence, safe-boundary cancellation, Analysis Workspace states, tests, and synchronized docs are still required. Browser transport abort is not server cancellation.

## Authentication and administrator state — issue #931

The canonical login and role-gating source is merged, including direct `/voxvector/login/` Pages entry and the login visibility fallback.

Connected Supabase inspection on 2026-09-10 lists zero deployed Edge Functions, so the merged `voxvector-user-admin` source is not yet a production administrator service. Trusted admin assignment, function deployment, authenticated administrator execution, and desktop/mobile role verification remain open.

## Developer Console and deployment boundary

The dashboard projects real runtime and engineering evidence through the 21-stage build control, runtime health, diagnostics, Render infrastructure, structured audits, and report/audit/log export controls. It must never simulate provider execution or stage progress.

The protected Render Runtime **Deploy Now** control calls `POST /v1/developer/render/deploy`. Render auto-deploy remains disabled. Current deployment `dep-dah0g13l550s73d2dbb0` was API-triggered and therefore does not satisfy #920's protected deploy-hook verification.

## Current engineering sequence

1. Capture fresh `/health` for current source.
2. Reproduce or sufficiently bound #930 and verify authenticated intake/playback.
3. Execute controlled faster-whisper under #941 with memory/instance and persisted artifact evidence.
4. Execute controlled pyannoteAI cloud-primary diarization with its route gate enabled.
5. Persist transcript, speaker, and alignment artifacts.
6. Finish #948 and #949 as separate bounded source tasks with exact-head QA/review.
7. Deploy and verify the #931 Supabase administrator function and trusted admin boundary.
8. Complete #932 landing navigation/CTA work; after #930, complete #928 upload UX hardening.
9. Complete Review Evidence, assessment, reporting, saved history/reopen, and authenticated desktop/mobile verification.
10. Repeat the engineering-MVP golden case twice on the same exact deployed revision.
11. Advance scientific validation only as a separate program.

## Scientific boundary

The pipeline remains an evidence-analysis architecture, not a claim that an individual vocal feature proves deception. Candidate classification and final disposition remain distinct from eligibility/reliability and evidence collection. Scientific validation is a separate gate.

**Canonical source:** `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
