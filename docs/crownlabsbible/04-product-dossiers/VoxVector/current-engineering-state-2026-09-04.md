# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. The repository implementation and canonical VoxVector documentation remain authoritative.

## Runtime snapshot

- Canonical GitHub `main`: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA: #1963 / `34425588762`, success
- Exact-main Deploy GitHub Pages: #1708 / `34425588752`, success
- Exact-main CodeQL push run: #71 / `34425587747`, success
- Latest confirmed live Render deployment revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Latest confirmed live Render deploy: `dep-dah0g13l550s73d2dbb0`, trigger `api`, status `live`
- Render production auto-deploy: disabled
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- Fresh Edge Function inventory: no deployed Edge Functions
- Runtime self-test, media-storage readiness, provider readiness, API version, and source revision details beyond the Render deployment record require a fresh `/health` readback rather than inference
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB

Backend and frontend are independently versioned. Backend source authority is `VoxVector/pyproject.toml`; frontend authority is `voxvector/package.json`. The live API's detailed runtime/provider state remains whatever `/health` actually reports when read fresh.

## Run lifecycle recovery — issue #945 / PR #946

Issue #945 is closed and PR #946 is merged as current `main`. The existing CaseStore/run-lifecycle owner now supports eligible stale/interrupted-run reconciliation from Case History, truthful failed/not-run terminalization, persisted elapsed time, terminal run/failure reports, historical source-revision preservation, durable metadata backfill, and same-process per-case serialization across reconciliation and mutation. The existing Analysis Workspace exposes Copy/Download controls for the persisted run report.

Final PR head `de343d593f320eea3ef23fd970bae614fcc240b1` passed VoxVector QA #1962 and PR Preview #818 with changed-code CodeQL clean and all existing review threads resolved. The merged source then passed exact-main QA #1963, Pages #1708, and CodeQL #71.

The current Render deployment contains this lifecycle implementation. Production Case History reconciliation/report readback has not yet been verified. The per-case lock is an in-process guarantee for the current single-process/single-instance architecture, not cross-process compare-and-swap protection.

## September 9 transcription reliability repair

The merged transcription repair is included in current `main` and the current live Render deployment. It uses dependency-ordered provider acquisition and a disposable faster-whisper child process with a hard local deadline rather than relying on cancellation of native work in an in-process thread.

Issue #941 remains open because deployment is not controlled provider execution. Fresh `/health` settings readback, a controlled real-audio transcription, Render memory/instance correlation, and persisted transcript/run artifact readback remain required.

## Intake reliability — issue #930

The merged pre-handler upload diagnostics are now present in the current live Render source. #930 is therefore ready for production reproduction/verification rather than blocked only on deployment.

The exact multipart/client/proxy cause remains unproven. Authenticated upload/private persistence/provenance/playback must be verified on the current runtime, with request-correlated diagnostic evidence if the intermittent 400 reproduces.

## Authentication and administrator state — issue #931

The shared role-aware authentication implementation, canonical `/voxvector/login/` route, physical Pages login entry, and login visibility fallback are merged.

The current Render source contains the backend trusted developer/admin authorization changes. Connected Supabase inspection on 2026-09-10 lists no deployed Edge Functions, so `voxvector-user-admin` remains source-only in production. A trusted admin assignment, Edge Function deployment, authenticated administrator execution, and developer/admin/user desktop/mobile browser verification remain open.

## Active P0 source work

- #948 / draft PR #951: auditable secure case deletion is in progress and not merge-ready; review work remains around concurrency, durable receipt recovery, and authenticated DELETE response opt-in.
- #949 / draft PR #952: server-aware Stop Analysis is in progress; the current draft only establishes the frontend cancellation API action. Server lifecycle, persistence, workspace states, tests, and docs remain outstanding.
- #920: protected Developer Console deployment-control verification remains blocked on the authenticated **Deploy Now** path. The current Render deployment was triggered through Render API and does not satisfy that acceptance criterion.

## 21-stage pipeline

The canonical contract remains 21 stages with 16 implemented/built foundations, 4 conditional or intentionally not-invoked stages, and speaker execution still queued for controlled cloud-primary verification.

The source order remains:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

Provider readiness does not promote queued or conditional stages. Stage promotion requires real provider-backed execution, persisted artifacts, integration behavior, and QA evidence.

## Current implementation sequence

1. Capture fresh `/health` for current source and preserve runtime/provider settings.
2. Reproduce or sufficiently bound #930 with authenticated intake/playback evidence.
3. Execute controlled faster-whisper under #941 with Render memory/instance and persisted artifact evidence.
4. Execute controlled pyannoteAI cloud-primary diarization when its invocation gate is enabled.
5. Persist/read back transcript, speaker, and alignment artifacts under the same case/run identity.
6. Finish #948 and #949 as separate bounded source changes with exact-head QA/review.
7. Deploy and verify the #931 Supabase administrator function and trusted admin boundary.
8. Complete #932 navigation/CTA work and, after #930, #928 upload UX hardening.
9. Complete authenticated desktop/mobile browser verification and history/reopen/report acceptance.
10. Repeat the engineering-MVP golden case twice on the same exact deployed revision.
11. Conduct scientific validation separately.

## Deployment boundary

`https://darenprince.com/voxvector/` is the public application.

`https://voxvector.crownlabs.tech` is the preserved canonical Render API domain. Render auto-deploy remains disabled.

`https://awsapi.crownlabs.tech` is a separate historical benchmark environment and is not part of active QA gating.

Supabase remains the configured authentication, persistence, diagnostics, private-media, and developer-profile storage boundary.

## Developer Console deployment control

The Render Runtime surface includes a protected **Deploy Now** control that calls `POST /v1/developer/render/deploy`. The current live deployment `dep-dah0g13l550s73d2dbb0` reports trigger `api`; it proves deployment of current source but not execution of that protected deploy-hook path.

Required #920 evidence remains:

`Developer Console action → hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → fresh /health verified → browser/runtime verification when required`

## Scientific boundary

Operational readiness, provider execution, software QA, memory containment, engineering-MVP completion, and scientific validation remain distinct. No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception.
