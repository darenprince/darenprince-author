# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. The repository implementation and canonical VoxVector documentation remain authoritative.

## Runtime snapshot

- Current canonical `main` source: `5cc50422125734a34e5fed04fc0e1f11317c7ade`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA: #1997 / `34429952347`, success
- Exact-main Deploy GitHub Pages: #1710 / `34429952384`, success
- Exact-main CodeQL push run: #83 / `34429952114`, success
- Latest confirmed live Render backend revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Latest confirmed live Render deploy: `dep-dah0g13l550s73d2dbb0`, trigger `api`, status `live`
- Render production auto-deploy: disabled
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- Latest Edge Function inventory: no deployed Edge Functions
- Runtime self-test, media-storage readiness, provider readiness, API version and source revision details beyond the Render deployment record require a fresh `/health` readback rather than inference
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB
- Most recently completed Developer Console source task: issue #954 / PR #956, Render operational-state presentation
- Next prioritized production-reliability task: #930 authenticated upload reproduction and evidence capture

Backend and frontend are independently versioned. Backend source authority is `VoxVector/pyproject.toml`; frontend authority is `voxvector/package.json`. Repository revision and Render backend revision are intentionally recorded separately because PR #956 changed frontend/Developer Console presentation and did not redeploy the backend.

## Run lifecycle recovery — issue #945 / PR #946

Issue #945 is closed. PR #946 merged the existing CaseStore/run-lifecycle recovery and report behavior: eligible stale/interrupted-run reconciliation from Case History, truthful failed/not-run terminalization, persisted elapsed time, terminal run/failure reports, historical source-revision preservation, durable metadata backfill, and same-process per-case serialization across reconciliation and mutation. The existing Analysis Workspace exposes Copy/Download controls for the persisted run report.

The deployed Render backend contains this lifecycle ancestry. Production Case History reconciliation/report readback has not yet been verified. The per-case lock is an in-process guarantee for the current runtime model, not cross-process compare-and-swap protection.

## September 9 transcription reliability repair

The merged transcription repair is included in the deployed Render backend. It uses dependency-ordered provider acquisition and a disposable faster-whisper child process with a hard local deadline rather than relying on cancellation of native work in an in-process thread.

Issue #941 remains open because deployment is not controlled provider execution. Fresh `/health` settings readback, a controlled real-audio transcription, Render memory/instance correlation, and persisted transcript/run artifact readback remain required.

## Intake reliability — issue #930

The merged pre-handler upload diagnostics are present in the live Render source. #930 is ready for production reproduction/verification rather than blocked only on deployment.

The exact multipart/client/proxy cause remains unproven. Authenticated upload/private persistence/provenance/playback must be verified on the current runtime, with request-correlated diagnostic evidence if the intermittent 400 reproduces.

## Authentication and administrator state — issue #931

The shared role-aware authentication implementation, canonical `/voxvector/login/` route, physical Pages login entry, and login visibility fallback are merged.

The live Render backend contains the trusted developer/admin authorization source. Latest connected Supabase inspection lists no deployed Edge Functions, so `voxvector-user-admin` remains source-only in production. A trusted admin assignment, Edge Function deployment, authenticated administrator execution, and developer/admin/user desktop/mobile browser verification remain open.

## Render operational status presentation — issue #954 / PR #956

Issue #954 is complete at the source, exact-head CI, merge and GitHub Pages publication boundaries. PR #956 modified the existing Developer Console owners rather than introducing a second dashboard or status rail.

The merged contract is:

- `renderOperationalState.js` owns frontend normalization of Render lifecycle state;
- Render is green only when both service state and latest deployment state are terminal `ACTIVE`/`LIVE`;
- building, queued, pending, deploying, updating and similar states are transitional rather than healthy;
- suspended, deactivated, failed, unavailable and unreported states are attention/error states rather than false green;
- the compact live engineering rail turns red whenever the combined Render service/deployment state is not terminal-live;
- Developer Overview fetches Render operational state while the dashboard is open and includes a whole-card Render Service status block;
- API, Runtime, Pipeline, Transcription and Render Service blocks expose always-visible source-backed subtext for version/revision/provider/stage/deploy context;
- Render Runtime keeps authenticated bridge connectivity separate from service/deployment lifecycle and color-codes service/deployment blocks independently;
- missing state is never defaulted to Active.

Final PR head `bf1a667706a1dcb781583c54341d6e38346fd950` passed VoxVector QA #1996 / `34429777387`, PR Preview Build #828 / `34429777388`, and CodeQL #82 / `34429773922`. PR #956 merged as `5cc50422125734a34e5fed04fc0e1f11317c7ade`; exact-main VoxVector QA #1997 / `34429952347`, Pages #1710 / `34429952384`, and CodeQL #83 / `34429952114` then succeeded. Pages publication is not authenticated browser verification, and the protected Developer Console visuals still require an authenticated desktop/mobile readback before that evidence can be claimed.

## Active work

- #954 / PR #956: **done at source/CI/Pages publication boundaries**; authenticated Developer Console visual verification remains separate unresolved evidence.
- #930: **ready for production reproduction/verification** of the intermittent case-source upload HTTP 400 and authenticated persistence/provenance/playback path.
- #941: **ready for controlled production transcription verification**; provider execution, memory behavior and persisted artifact readback remain open.
- #948 / draft PR #951: auditable secure case deletion remains in progress and not merge-ready.
- #949 / draft PR #952: server-aware Stop Analysis remains in progress; server lifecycle/workspace integration is incomplete.
- #920: protected Developer Console deployment-control verification remains blocked on the authenticated **Deploy Now** path; the current backend deployment was API-triggered and does not satisfy that acceptance criterion.
- #931: administrator function deployment, trusted admin assignment and authenticated role/browser evidence remain open.
- #935: completed; Node-24-backed Actions wrapper migration and its required post-merge audit record are closed.

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

1. Reproduce or sufficiently bound #930 with authenticated intake/playback evidence and capture fresh request-correlated diagnostics.
2. Capture fresh `/health` for the deployed backend and preserve runtime/provider settings as part of the production-reliability work.
3. Execute controlled faster-whisper under #941 with Render memory/instance and persisted artifact evidence.
4. Execute controlled pyannoteAI cloud-primary diarization when its invocation gate is enabled.
5. Persist/read back transcript, speaker, and alignment artifacts under the same case/run identity.
6. Finish #948 and #949 as separate bounded source changes with exact-head QA/review.
7. Deploy and verify the #931 Supabase administrator function and trusted admin boundary.
8. Complete #932 navigation/CTA work and, after #930, #928 upload UX hardening.
9. Complete #920 through the authenticated Developer Console deployment-control path.
10. Complete authenticated desktop/mobile browser verification and history/reopen/report acceptance.
11. Repeat the engineering-MVP golden case twice on the same exact deployed revision.
12. Conduct scientific validation separately.

## Deployment boundary

`https://darenprince.com/voxvector/` is the public application. GitHub Pages #1710 published the merged #956 frontend revision.

`https://voxvector.crownlabs.tech` is the preserved canonical Render API domain. Render auto-deploy remains disabled.

`https://awsapi.crownlabs.tech` is a separate historical benchmark environment and is not part of active QA gating.

Supabase remains the configured authentication, persistence, diagnostics, private-media, and developer-profile storage boundary.

## Developer Console deployment control

The Render Runtime surface includes a protected **Deploy Now** control that calls `POST /v1/developer/render/deploy`. The current live deployment `dep-dah0g13l550s73d2dbb0` reports trigger `api`; it proves deployment of backend source but not execution of that protected deploy-hook path.

Required #920 evidence remains:

`Developer Console action → hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → fresh /health verified → browser/runtime verification when required`

## Scientific boundary

Operational readiness, provider execution, software QA, memory containment, engineering-MVP completion, and scientific validation remain distinct. No individual vocal, acoustic, linguistic, behavioral, emotional or psychological feature is treated as proof of deception.
