# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. The repository implementation and canonical VoxVector documentation remain authoritative.

## Runtime snapshot

- Canonical GitHub `main`: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA: #1963, success
- Exact-main Deploy GitHub Pages: #1708, success
- Latest directly observed live Render deployment revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Latest directly observed Render deploy: `dep-dah0g13l550s73d2dbb0`, trigger `api`, status `live`
- Latest directly observed Render suspension value: `not_suspended`
- Render production auto-deploy: disabled; production backend changes require a deliberate manual/deploy-hook action
- Supabase project `VoxVector` (`tawtkawmjqabydnatavx`): `ACTIVE_HEALTHY` at the 2026-09-09 connected inspection
- Current Render operational-status UI task: issue #954 on `fix/voxvector-render-operational-status-ui`; unmerged source until exact-head QA/PR evidence is complete
- Runtime self-test, media-storage readiness, provider readiness, API version, and source revision are read from the live API health contract rather than inferred from source or Render deployment state
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB

Backend and frontend are independently versioned. Backend source authority is `VoxVector/pyproject.toml`, with source/runtime alignment enforced by `VoxVector/tests/test_version_sync.py`. Frontend authority is `voxvector/package.json`. The live API release remains whatever `/health` actually reports until a newer runtime readback is verified.

## September 9 transcription reliability incident and repair

Connected Render evidence tied the earlier Stage 07 loss to the constrained service memory lifecycle: the faster-whisper model loaded, the API process disappeared before an in-process terminal update could be persisted, and Uvicorn restarted. Source inspection also found the historical route completed downstream analytical work before provider-backed transcription, contradicting the required dependency order.

The repaired backend is included in current main `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`. Direct Render inspection observed deploy `dep-dah0g13l550s73d2dbb0` for that revision in terminal `live` state. That is deployment/service evidence, not controlled real-audio provider execution or a substitute for fresh `/health` runtime readback.

## Run lifecycle recovery — issue #945 / PR #946

PR #946 extends the existing CaseStore/run-lifecycle owner rather than creating a second pipeline or persistence layer and is merged into current main.

Current source behavior:

- Case History listing can reconcile eligible stale/deadline-expired `running` runs instead of requiring the individual case to be reopened first.
- A legitimate current-worker run with a usable configured deadline is not stale-failed before that deadline.
- Recovery marks the interrupted active stage failed and terminalizes unfinished dependent work as `not_run` with an explicit reason.
- Active/final elapsed time is real and terminal `run_report` / `failure_report` metadata is persisted.
- Historical source provenance is not fabricated from a later runtime merely reading an old record.
- Legitimate terminal metadata backfill is persisted rather than synthesized only in a response.
- Per-case in-process serialization covers Case History reconciliation, explicit reconciliation, run updates, source mutation and deletion. In the current one-process/one-instance CaseStore architecture, this prevents a stale history read/reconcile/write from overwriting a newer same-process run update.
- The existing Analysis Workspace exposes Copy/Download controls for the persisted run report.
- The explicit pyannoteAI → local Community-1 fallback wrapper retains primary/fallback failure provenance.

The concurrency protection is not represented as cross-process compare-and-swap protection for a future horizontally scaled object-store writer architecture.

Evidence chronology:

- `c332f58e88c73c89c036b127e5bbe57389d6ed05`: VoxVector QA #1917 success; PR Preview #797 success.
- `18777886bf28c6cac8fb13fc00d5b5653b15b20b`: VoxVector QA #1954 success; PR Preview #815 success after the concurrency repair/test.
- `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`: merged main; exact-main VoxVector QA #1963 success and Deploy GitHub Pages #1708 success.
- Render deploy `dep-dah0g13l550s73d2dbb0` was directly observed for `c21b4cf...` in terminal `live` state.

Production failure-report readback, controlled provider execution, authenticated browser verification, engineering-MVP proof and scientific validation remain separate evidence gates unless independently observed.

## Speech runtime

The canonical backend supports configured faster-whisper transcription plus pyannoteAI cloud diarization with an explicit local pyannote fallback path. Live provider selection and readiness are runtime-reported fields.

The repaired source defaults faster-whisper to `base`, CPU, int8, beam 1, one CPU thread, one worker, an isolated spawned process, and a 165 second hard child-process deadline. The route-level evidence-acquisition deadline remains a separate outer boundary.

The Developer Console keeps configured provider, package/key presence, execution readiness, actual execution, source revision and deployment/runtime state distinct. Provider readiness is not successful execution and is not scientific validation.

## Render runtime discipline

The Render service remains a constrained compute baseline. Runtime hardening includes heavyweight phase serialization, RSS telemetry, provider cleanup, bounded speech-frame processing, float32 normalized audio, and conservative CPU/thread settings.

The repaired case route releases the persisted WAV byte buffer after integrity verification, performs speech/provider evidence acquisition before downstream composite analysis, and runs faster-whisper in a disposable child process so a hard deadline can terminate native ASR work rather than merely cancelling the waiting coroutine.

Process isolation improves termination and memory reclamation behavior but does not prove a real recording will remain below the platform memory ceiling. Production provider execution and Render memory/instance correlation remain mandatory.

## 21-stage pipeline

The canonical contract remains 21 stages with 16 implemented/built foundations, 4 conditional or intentionally not-invoked stages, and 1 queued provider stage in the current source mapping.

The source order is now:

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

1. Complete #954 source/docs synchronization and fresh exact-head QA/PR preview.
2. Inspect the exact #954 diff and resolve any review findings before merge recommendation.
3. Browser-verify Developer Overview and Render Runtime behavior on desktop and mobile, including non-live state presentation where safely reproducible.
4. Merge #954 only after exact-head evidence is clean and current main has not moved underneath the branch.
5. Treat merged frontend publication separately from the Render backend. The #954 UI task does not itself require or constitute a Render backend deployment.
6. Continue the separate #930 intermittent upload investigation and controlled provider-execution program.
7. Run controlled transcription and correlate provider execution with Render memory/instance lifecycle.
8. Run controlled cloud-primary speaker diarization when its route gate is enabled.
9. Persist transcript, speaker, and alignment artifacts.
10. Repeat the engineering-MVP golden case on the same exact deployed revision.
11. Conduct scientific validation separately.

## Deployment boundary

`https://darenprince.com/voxvector/` is the public application.

`https://voxvector.crownlabs.tech` is the preserved canonical Render API domain. It is manually deployed through the protected Render deploy hook; repository pushes do not automatically deploy the Render production service.

`https://awsapi.crownlabs.tech` is a separate historical benchmark environment and is not part of active QA gating.

Supabase remains the configured authentication, persistence, diagnostics, private-media, and developer-profile storage boundary.

## Developer Console interaction state

The canonical Developer Console uses one reusable collapsible-card title-bar system for applicable work surfaces. Case History preserves swipe-to-delete on touch devices and desktop trash controls while adding Select mode for multi-case deletion. Structured audits are collapsed by default. Developer profiles use the existing `public.profiles` record and private `voxvector-avatars` storage.

The single `DeveloperEngineeringStatus` instance remains rendered immediately after `SiteHeader` as a real sticky 34px flow row beneath the 56px navigation. It preserves independent hide/expand/collapse controls, full-height non-modal disclosure, and bottom-right toast placement.

Issue #954 tightens operational truth presentation inside that existing shell. Source on `fix/voxvector-render-operational-status-ui` centralizes Render lifecycle normalization, makes the compact engineering rail red whenever the Render service/deployment combination is anything other than terminal `ACTIVE`/`LIVE`, and adds a Render Service block to the Developer Overview. Dashboard blocks now carry always-visible subtext such as frontend/backend version, revision, provider, stage counts, region and deployment revision, and the whole block is semantically tinted by status.

The Render Runtime page now separates authenticated Render-bridge connectivity from actual service/deploy lifecycle state and color-codes the Service state and Latest deployment blocks independently. Bridge connectivity cannot create a green Render state, and an absent provider state is not defaulted to Active. These statements describe branch source until exact-head QA, publication and browser verification occur.

## Supabase security boundary

Connected inspection reports the project healthy. The security advisor still reports the existing `developer_dashboard_summary()` SECURITY DEFINER executable warning and disabled leaked-password protection. The summary RPC itself performs the existing `is_developer_admin()` authorization check. These warnings were not changed during the Render operational-status UI task and remain separate security-hardening evidence rather than being silently modified.

## Scientific boundary

Operational readiness, provider execution, software QA, memory containment, engineering-MVP completion, and scientific validation remain distinct. No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception.

## Manual Render deployment control

The Render Runtime surface includes a protected **Deploy Now** control. The browser calls `POST /v1/developer/render/deploy`; the authenticated API runtime keeps `RENDER_DEPLOY_HOOK_URL` server-side and sends the deployment request to Render.

Render auto-deploy remains disabled. Trigger acceptance is distinct from deployment verification. Required evidence is:

`hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → /health verified → controlled provider execution → browser/runtime verification when required`