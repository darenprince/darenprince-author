# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`. The repository implementation and canonical VoxVector documentation remain authoritative.

## Runtime snapshot

- Backend pipeline: `0.2.26`
- Frontend package: `0.2.37`
- Latest confirmed live Render deployment revision: `73ac03ded08c161e092ee2a4ecbbed7d036771c8`
- Latest confirmed Render deploy: `dep-dafg5nv40ujc73b5l400`, observed `live` on 2026-09-08
- Render production auto-deploy: disabled (`autoDeploy=no`, automatic trigger off) at the 2026-09-08 connected inspection
- Runtime self-test, media-storage readiness, and provider readiness are read from the live API health contract rather than inferred from Render deployment state
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB

## Speech runtime

The canonical backend supports configured faster-whisper transcription plus pyannoteAI cloud diarization with an explicit local pyannote fallback path. Live provider selection and readiness are runtime-reported fields.

The Developer Console keeps these distinctions visible:

- configured provider
- adapter/package presence where applicable
- pyannote API-key presence for the cloud path
- Hugging Face token presence for the local path
- primary execution readiness
- fallback execution readiness
- successful provider execution, which still requires a controlled run

Provider readiness is not successful execution and is not scientific validation.

## Render runtime discipline

The Render service remains a constrained compute baseline. Runtime hardening includes heavyweight phase serialization, RSS telemetry, provider cleanup, bounded speech-frame processing, float32 normalized audio, and conservative CPU/thread settings.

The engineering UI does not hard-code a memory-limit claim as live status. Infrastructure state is read from the authenticated Render bridge, while analysis runtime state is read from `/health`.

Configured runtime safeguards may include `OMP_NUM_THREADS=1`, `MKL_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MALLOC_ARENA_MAX=2`, and `TOKENIZERS_PARALLELISM=false`.

## 21-stage pipeline

The canonical contract remains 21 stages with 16 implemented/built foundations, 4 conditional or intentionally not-invoked stages, and 1 queued stage in the current source mapping.

Provider readiness does not promote queued or conditional stages. Stage promotion requires real provider-backed execution, persisted artifacts, integration behavior, and QA evidence.

## Current implementation sequence

1. Exact-commit software QA.
2. Confirm Render deployment revision and live API health contract.
3. Controlled transcription execution.
4. Controlled speaker diarization execution.
5. Persist transcript and speaker artifacts.
6. Produce synchronized multimodal alignment.
7. Expand evidence consumers.
8. Continue assessment/reporting refinement under the existing scientific gates.
9. Complete authenticated desktop/mobile browser verification.
10. Conduct scientific validation separately.

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

## Verification boundary

The Supabase avatar/profile migration was applied and its private bucket and RLS policies were read back successfully. Existing Supabase security-advisor warnings unrelated to this migration remain open. Frontend/Developer Console changes still require exact-head QA, deployment evidence and authenticated desktop/mobile browser verification before production UI behavior is considered verified.

## Scientific boundary

Operational readiness, provider execution, software QA, and scientific validation remain distinct. No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception.

## Manual Render deployment control

The Render Runtime surface includes a protected **Deploy Now** control. The browser calls `POST /v1/developer/render/deploy`; the authenticated API runtime keeps `RENDER_DEPLOY_HOOK_URL` server-side and sends the deployment request to Render.

The current Render service is not auto-deployed. Connected inspection on September 8 confirmed one workspace, `My Workspace` (`tea-da2errdg1s2s73cl4eeg`), and one service, `voxvector-api` (`srv-da2f88n40ujc73a8m26g`), with automatic deployment disabled.

Trigger acceptance is distinct from deployment verification. Required evidence is:

`hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → /health verified → browser/runtime verification when required`

Historical Render diagnostics on September 5 captured a `JSONDecodeError` on the deploy route when a successful hook response body was not JSON. Issue #920 repairs that server-side response parsing and adds JSON, text and empty-body regression coverage. The hook value remains private and non-JSON hook content is not treated as trusted deployment evidence.

At the September 8 inspection checkpoint, Render was live on `73ac03ded08c161e092ee2a4ecbbed7d036771c8` while GitHub `main` was `66a1616d49e228c6ec57d3cfc4855898675fae2c`. The five intervening commits were documentation/audit/workflow changes rather than runtime implementation. That was a dated source/runtime observation, not evidence that future revisions will remain functionally equivalent.

The current repair is not production-verified until the merged revision is deliberately deployed, the Developer Console request is observed, a new Render deploy reaches `live`, and the runtime/browser evidence chain is completed.
