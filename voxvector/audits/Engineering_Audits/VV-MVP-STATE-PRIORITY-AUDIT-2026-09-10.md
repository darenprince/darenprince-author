# VoxVector MVP State and Priority Audit — 2026-09-10

> **Archive status:** bounded historical engineering snapshot. This dated audit records the evidence available in its stated observation window and does not supersede current canonical engineering, QA, release-gate, or runtime documentation. Later merges may have completed or changed work listed below.
>
> **Conflict-resolution note — 2026-09-11:** PR #973 was reconciled onto current `main` at `e35daf45192514a3ccb7d54a3efe0b8c2a084fe0`. The newer canonical documentation on `main` was preserved rather than overwritten by this older snapshot; this dated audit is the only record carried forward from the original PR diff.

**Prompt:** `VV-MVP-STATE-AUDIT-PRIORITIZE`  
**Tracker:** #915  
**Source-of-truth revision reviewed:** `8bf2e3c0a97025ea7f25f6b10bc4cbad9bfa8b1e`  
**Runtime revision observed:** `7305d0727fafe60a1f78be4995dfddb618ed0192`  
**Observed UTC window:** 2026-09-10 20:33–20:45 UTC

## Purpose

This audit re-establishes the shortest defensible path from the then-current VoxVector repository/runtime state to a working engineering MVP. It is an engineering and operational audit, not scientific validation.

GitHub `main` is the technical source of truth for source and canonical documentation. Render, Supabase, provider execution, GitHub Actions and browser behavior are separate evidence surfaces. Configuration/readiness is not provider execution. A successful build is not deployment. A deployment is not browser verification.

## Evidence reviewed

- canonical `OPERATING_CHARTER.md`, `DEVELOPMENT_WORKFLOW.md`, `AI_EDITING_GUARDRAILS.md`, `PROJECT_DECISION_LOG.md`, `MVP_RELEASE_GATE.md`, `QA_STATUS.md`, and current engineering-state documentation;
- current GitHub `main` and recent VoxVector PR/issue state;
- PR #967 exact-head workflow and review-thread state;
- current `PipelineBuildCard.jsx` frontend stage metadata;
- connected Render service/deployment configuration;
- forced-fresh production `/health` readback from `voxvector.crownlabs.tech`;
- existing issue owners for intake, auth, navigation, runtime safety, observability, case rehydration, Blueprint drift, cancellation, deletion and notification work.

## Current source and runtime state

Canonical GitHub `main` at audit start is `8bf2e3c0a97025ea7f25f6b10bc4cbad9bfa8b1e`.

The latest observed Render deployment is `dep-dahh2em1egvs73fvbem0`, terminal `live`, trigger `deploy_hook`, source `7305d0727fafe60a1f78be4995dfddb618ed0192`. Render production auto-deploy remains disabled.

A forced-fresh `/health` read returned HTTP 200 and reported:

- pipeline/backend `0.2.27`;
- runtime self-test `passed`;
- diagnostic/media storage `configured_media_ready`;
- process and Render-instance identity separately;
- 512 MiB runtime memory reference with a 416 MiB Stage 10 admission ceiling;
- faster-whisper execution-ready with `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process and 165-second child deadline;
- `pyannote_api` configured as cloud-primary diarization, API key configured, primary execution-ready, local fallback disabled;
- Stage 05 Speech Segmentation as implemented foundation;
- Stage 06 Speaker Identification / Diarization as queued;
- Stage 07 Transcription Generation as implemented foundation;
- Stage 08 Transcript Alignment as implemented foundation.

This runtime was healthy enough to continue engineering verification. It was not yet an engineering MVP because the complete persisted golden path had not been demonstrated twice on one exact deployed revision.

## Critical findings

### 1. PR #967 was not merge-ready despite green CI

PR #967 exact head `9c5a3150ab05a54295e2661c45b2422ddc999353` had successful VoxVector QA and Preview checks, but two current review threads remained open.

The P1 finding was a runtime-safety defect: a thread waiting for the serialized Stage 10 heavyweight phase could outlive the route timeout and later acquire the lock, allowing abandoned heavyweight work to execute after the request/run had already failed. Admission/queue acquisition needed to become bounded or cancellation-aware.

The P2 finding was a run-identity defect in `/v1/developer/render/analysis`: successful runs still replaced the route-owned run ID with the internal pipeline UUID. The route-owned stable identity needed to remain authoritative and the analytical UUID needed to be stored separately as `pipeline_run_id`.

This was the highest source blocker at the audit time.

### 2. Render runtime configuration still drifted from the canonical Blueprint

The live service built:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The root canonical `render.yaml` then intended the constrained production dependency path using `api/requirements-transcription.txt`. The live speech requirements also installed the local pyannote/PyTorch stack even though production primary diarization was cloud `pyannote_api` and local fallback was disabled.

Issue #964 owned reconciliation of the existing service into the existing root Blueprint. This audit did not claim the broader dependency set caused the previous memory incident; it recorded a reproducibility/resource-drift risk that should be removed before final candidate verification.

### 3. Cloud-primary diarization was ready but not executed

Production health reported `pyannote_api` primary execution-ready, but Stage 06 remained queued. Readiness is not execution. There was no existing bounded issue that fully owned same-source cloud-primary execution plus persisted speaker-evidence readback, so issue #970 was created.

### 4. Persisted transcript/audio/speaker alignment lacked an explicit final verification owner

Stage 08 was an implemented foundation, but a same-source/run persisted multimodal artifact could not be fully verified until real speaker evidence existed. Issue #971 was created to own execution/readback of the canonical aligned artifact after #970.

### 5. Historical-case rehydration remained MVP-critical

The backend had stronger durable upstream checkpoint foundations from merged #962, but the user experience still needed to prove that a historical case could close/reopen and restore private source playback plus persisted transcript/speaker/alignment/report state without re-upload. #963 was reprioritized as P0 on the golden path.

### 6. Intermittent authenticated upload 400 remained unresolved

Large supported WAV uploads had succeeded, which argued against a deterministic file-size/storage defect, but historical requests returned HTTP 400 before the normal upload route-body start event. The exact request-envelope cause remained unknown. #930 was updated to require sanitized envelope evidence and candidate repeatability rather than claiming an unproven root cause.

### 7. Observability source foundation was deployed but production acceptance was incomplete

PRs #961, #966 and #968 established dual Render/Supabase logging, worker correlation, deterministic Render snapshot identity, sanitized Debug Bundle generation and protected Render response hardening. The live runtime contained that source ancestry. #959 remained open because one controlled run still needed same-run Render + Supabase readback and a real generated bundle inspection; automatic terminal Render snapshot capture also remained a source gap.

### 8. Frontend pipeline status presentation was stale

`PipelineBuildCard.jsx` still used stale local metadata that swapped Stage 05/06 and called Stage 07/08 queued. The backend health contract reported the current canonical order/status. #965 was promoted to P0 for truth correction before final browser/golden verification. The existing component had to be repaired rather than recreated.

### 9. Auth core existed; final authenticated browser matrix was missing

#931 implementation was materially complete at the audit time: canonical login, trusted role routing, backend authorization, admin user-management and deployed Supabase administrator function all had source/runtime evidence. The remaining release blocker was the authenticated developer/admin/user/unauthorized/session/sign-out/password-reset browser matrix.

### 10. Public entry navigation still needed release-critical repair

#932 owned Request Access, How It Works, anchors, public menu behavior and the Developer Console mobile drawer overlap. It was release-critical frontend work but should not interrupt the backend/runtime critical path.

### 11. No final same-revision repeatability proof existed

The canonical release gate required two complete golden-case passes on one exact deployed revision. Issue #972 was created as the final candidate-freeze/repeatability owner. Any candidate-affecting source change reset that count.

## Prioritized MVP path at audit time

1. #941 / PR #967 — fix bounded/cancellation-aware Stage 10 serialization and stable route-owned run identity, clean review, merge, deliberately deploy and controlled-rerun the same WAV.
2. #964 — reconcile the existing Render service with the sole root Blueprint and remove unnecessary runtime dependency drift where source inspection confirmed it was safe.
3. #970 — execute cloud-primary `pyannote_api` against the persisted golden source and persist/read back speaker evidence.
4. #971 — persist/read back transcript/audio/speaker alignment for the same run.
5. #963 — close/reopen the case and restore private playback plus persisted transcript/speaker/alignment/report state.
6. #930 — harden/reproduce or tightly bound intermittent upload 400 and record repeatable authenticated intake.
7. #959 — finish automatic terminal log capture and prove Render + Supabase + Debug Bundle evidence on a controlled run.
8. #965 — repair the existing frontend 21-stage projection so browser status matches backend truth.
9. #931 — complete the authenticated desktop/mobile role matrix.
10. #932 — repair release-critical public CTA/anchor/mobile navigation paths.
11. #972 — freeze the candidate and pass two complete golden cases on the same exact deployed revision.

P1 after the happy path was stable: #920 final Deploy Now browser correlation, #949 server-aware Stop Analysis, #948 enhanced deletion receipt, #928 upload-progress/cancel UX.

P2: #958 notification center/storage monitor and non-blocking visual/operator polish.

## Issue changes made by this audit

Updated/reprioritized: #915, #920, #930, #931, #932, #941, #948, #949, #958, #959, #963, #964 and #965.

Created missing bounded release-gate owners:

- #970 `P0 VoxVector: execute cloud-primary diarization and persist speaker evidence`;
- #971 `P0 VoxVector: verify and persist transcript audio speaker alignment`;
- #972 `P0 VoxVector: freeze MVP candidate and pass two same-revision golden cases`.

No incomplete draft PR was forced through. #951 and #952 remained intentionally unmerged.

## MVP readiness assessment at audit time

VoxVector had a real backend/runtime, authenticated case architecture, private persistence, working constrained transcription provider path, guarded analysis foundations, deployed observability/debug source, and a credible path to a working engineering MVP.

It was **not yet engineering MVP** because the candidate had not completed the full same-source speaker/transcript/alignment/downstream/persistence/reopen path, the Stage 10 serialized-work review findings remained open, the intake 400 was not fully bounded, the browser status/role/navigation gates were incomplete, and the two same-revision golden-case requirement had not been met.

Scientific validation remained a separate program. This audit made no accuracy, sensitivity, specificity, calibration, deception-detection validity, or generalization claim.

## Next action recorded at audit time

Resume #941 / PR #967 only. Fix both open review findings, rerun exact-head QA/Preview, inspect the diff/review state, and merge only when the exact head is clean.

Historical next prompt: `VV-STAGE10-BOUNDED-SERIALIZATION-FIX`
