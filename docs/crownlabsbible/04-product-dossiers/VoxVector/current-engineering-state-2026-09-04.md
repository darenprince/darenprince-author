# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. The repository implementation and canonical VoxVector documentation remain authoritative.

## Runtime snapshot

- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Latest confirmed live Render deployment revision: `7d5a66fa406efde4abfd79361a4d589b5b75e6e0`
- Latest confirmed live Render deploy: `dep-dagib9ajnfac73dpb630`, trigger `deploy_hook`, finished `2026-09-09T09:30:19.773542Z`
- Render production auto-deploy: disabled; production backend changes require the protected manual/deploy-hook path
- Runtime self-test, media-storage readiness, provider readiness, API version, and source revision are read from the live API health contract rather than inferred from source or Render deployment state
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB

Backend and frontend are independently versioned. Backend source authority is `VoxVector/pyproject.toml`, with source/runtime alignment enforced by `VoxVector/tests/test_version_sync.py`. Frontend authority is `voxvector/package.json`. The live API release remains whatever `/health` actually reports until a newer deployment is verified.

## September 9 transcription reliability incident

Connected Render logs for request `6bb7ec766d3e46f39462ef92c9929544` show Stage 07 transcription starting at `09:36:46Z` for a 183.3 second WAV, faster-whisper starting at `09:36:47Z`, and the `base` CPU/int8 model loading at `09:36:48Z`. No transcription completion/failure/timeout record followed. Render restarted Uvicorn at `09:37:05Z` and started a new server process at `09:37:11Z`, matching the Render memory-limit automatic-restart alert.

The persisted run stayed `running` because the API process died before the prior in-process timeout handler could persist a terminal state. Source inspection also found that the deployed route marked downstream analytical stages complete before provider-backed transcription began, which did not match the canonical dependency sequence.

PR #942 repairs this source-level lifecycle but is not production evidence until merged, deliberately deployed, and verified against the live Render runtime.

## Speech runtime

The canonical backend supports configured faster-whisper transcription plus pyannoteAI cloud diarization with an explicit local pyannote fallback path. Live provider selection and readiness are runtime-reported fields.

The repaired source defaults faster-whisper to `base`, CPU, int8, beam 1, one CPU thread, one worker, an isolated spawned process, and a 165 second hard child-process deadline. The route-level evidence-acquisition deadline remains a separate outer boundary.

The Developer Console keeps these distinctions visible:

- configured provider
- adapter/package presence where applicable
- pyannote API-key presence for the cloud path
- Hugging Face token presence for the local path
- primary execution readiness
- fallback execution readiness
- successful provider execution, which still requires a controlled run
- active process/stage identity for interrupted-run reconciliation after restart

Provider readiness is not successful execution and is not scientific validation.

## Render runtime discipline

The Render service remains a constrained compute baseline. Runtime hardening includes heavyweight phase serialization, RSS telemetry, provider cleanup, bounded speech-frame processing, float32 normalized audio, and conservative CPU/thread settings.

The repaired case route releases the persisted WAV byte buffer after integrity verification, performs speech/provider evidence acquisition before downstream composite analysis, and runs faster-whisper in a disposable child process so a hard deadline can terminate native ASR work rather than merely cancelling the waiting coroutine.

Render's memory ceiling still applies to the service/container as a whole. Process isolation improves termination and memory reclamation behavior but does not by itself prove a real recording will remain below the platform memory ceiling. Production provider execution and Render memory/instance correlation remain mandatory.

The engineering UI does not hard-code a memory-limit claim as live status. Infrastructure state is read from the authenticated Render bridge, while analysis runtime state is read from `/health`.

Configured runtime safeguards may include `OMP_NUM_THREADS=1`, `MKL_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MALLOC_ARENA_MAX=2`, and `TOKENIZERS_PARALLELISM=false`.

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

The repaired case route no longer intentionally reports later dependent analysis complete while Stage 07 transcription is still active. Controlled production execution is still required to verify that behavior under the Render runtime.

Provider readiness does not promote queued or conditional stages. Stage promotion requires real provider-backed execution, persisted artifacts, integration behavior, and QA evidence.

## Current implementation sequence

1. Exact PR-merge software QA.
2. Review and merge the bounded transcription/order repair.
3. Trigger the protected Render deployment manually because auto-deploy is disabled.
4. Verify deployed source revision and `/health` runtime settings.
5. Verify stale/interrupted persisted runs reconcile to explicit failed/interrupted state.
6. Run controlled transcription and correlate provider execution with Render memory/instance lifecycle.
7. Run controlled cloud-primary speaker diarization when its route gate is enabled.
8. Persist transcript, speaker, and alignment artifacts.
9. Confirm downstream evidence/classification stages follow the required dependency order.
10. Repeat the engineering-MVP golden case on the same exact deployed revision.
11. Complete authenticated desktop/mobile browser verification.
12. Conduct scientific validation separately.

## Deployment boundary

`https://darenprince.com/voxvector/` is the public application.

`https://voxvector.crownlabs.tech` is the preserved canonical Render API domain. It is manually deployed through the protected Render deploy hook; repository pushes do not automatically deploy the Render production service.

`https://awsapi.crownlabs.tech` is a separate historical benchmark environment and is not part of active QA gating.

Supabase remains the configured authentication, persistence, diagnostics, private-media, and developer-profile storage boundary.

## Developer Console interaction state

The canonical Developer Console uses one reusable collapsible-card title-bar system for applicable work surfaces. Title bars meet the top and side card edges, use only a subtle lower separator, keep supporting text subordinate, and put a small disclosure control at the far right. The Analysis Workspace uses the same pattern rather than maintaining a competing header override.

Case History preserves swipe-to-delete on touch devices and desktop trash controls while adding Select mode for multi-case deletion. Multi-delete still calls the owner-scoped canonical case endpoint and requires irreversible confirmation.

Structured audits are collapsed by default and show date, title, brief summary, status, and disclosure affordance until expanded.

Developer profiles use the existing `public.profiles` record and a private `voxvector-avatars` Supabase Storage bucket. Avatar access is owner-scoped; accepted profile images are JPG, PNG, or WebP up to 5 MB. The profile editor supports display-name changes and avatar upload/change. The top-navigation profile menu uses an opaque surface.

The Live Engineering State rail is full-width directly below the primary navigation. Opening it produces a page-filling slide-down drawer with scroll and swipe-to-collapse. Status is assembled from separate API health, exact-revision GitHub Actions, and authenticated Render evidence instead of a synthetic single health claim.

### PR #950 engineering rail repair checkpoint

Issue #947 / PR #950 refines that existing rail without creating a second console/status implementation. The canonical `SiteHeader.jsx` remains the Developer navigation owner, while the single `DeveloperEngineeringStatus` instance is rendered immediately after the header in `DeveloperConsole.jsx`. The collapsed 34px rail is a sticky normal-flow row beneath the 56px navigation, so it reserves its own space instead of covering page content or requiring a `:has()`/main-padding compensation layer.

The rail has explicit expand/collapse controls and a small independent X. Hiding it removes the 34px row from layout. Expansion uses the remaining viewport below the 90px navigation-plus-rail boundary with internal scrolling on desktop and mobile. The expanded content is a non-modal disclosure region with native controls and `aria-expanded` / `aria-controls`, and Developer Console toast notifications are positioned at the bottom-right to avoid collision with the rail.

Implementation checkpoint `64edfb60aecdf13d4cb094838518504a994fc78d` passed VoxVector QA #1921 and PR Preview Build #799. Subsequent documentation synchronization advances the branch head, so those runs are evidence for the implementation checkpoint rather than final exact-head QA. Fresh exact-head QA/preview are required before merge recommendation. Authenticated desktop/mobile browser verification, merge, Pages publication, and production-browser verification remain unperformed.

The API startup surface uses an indeterminate wake state and elapsed time while the backend is cold instead of holding a synthetic progress percentage. After `/health` really returns, the returned checks are revealed progressively before the dashboard opens. The footer displays the frontend package version next to the API-reported live version and source revision.

Passive interface glyphs render without decorative full-stroke square containers unless the element is actually an interactive control. Startup and authentication glyphs follow the same rule as the existing public header, landing, panel, engineering-status, and toast iconography.

## Verification boundary

The transcription/order repair currently has repository QA evidence only. It is not production-verified until the merged revision is deliberately deployed, `/health` reports the exact intended source revision and constrained ASR settings, a controlled real-audio transcription run completes or fails within the documented bound without an API OOM restart, persisted run state is read back, and the browser/runtime projection matches the persisted stage states.

The Supabase avatar/profile migration was applied and its private bucket and RLS policies were read back successfully. Existing Supabase security-advisor warnings unrelated to this migration remain open. Frontend/Developer Console changes still require exact-head QA, deployment evidence and authenticated desktop/mobile browser verification before production UI behavior is considered verified.

## Scientific boundary

Operational readiness, provider execution, software QA, memory containment, engineering-MVP completion, and scientific validation remain distinct. No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception.

## Manual Render deployment control

The Render Runtime surface includes a protected **Deploy Now** control. The browser calls `POST /v1/developer/render/deploy`; the authenticated API runtime keeps `RENDER_DEPLOY_HOOK_URL` server-side and sends the deployment request to Render.

The current Render service is not auto-deployed. Connected inspection confirms one workspace, `My Workspace` (`tea-da2errdg1s2s73cl4eeg`), and one service, `voxvector-api` (`srv-da2f88n40ujc73a8m26g`).

Trigger acceptance is distinct from deployment verification. Required evidence is:

`hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → /health verified → controlled provider execution → browser/runtime verification when required`

Historical Render diagnostics on September 5 captured a `JSONDecodeError` on the deploy route when a successful hook response body was not JSON. Issue #920 repaired that server-side response parsing and added JSON, text and empty-body regression coverage. The hook value remains private and non-JSON hook content is not treated as trusted deployment evidence.

The current repair is not production-verified until the merged revision is deliberately deployed, a new Render deploy reaches `live`, runtime source revision is verified, and the controlled provider/browser evidence chain is completed.
