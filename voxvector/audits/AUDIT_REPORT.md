# VoxVector audit progress

## Current task status

Prompt: **VV-USERCONSOLE-ROLE-GATE**. Source base: `9539fa89ede3295e588feed781971919c542427e`. Tracking issue: [#931](https://github.com/darenprince/darenprince-author/issues/931). Branch: `feat/voxvector-role-gating`.

This task consolidates VoxVector authentication and trusted role routing, establishes the minimum protected user destination, extends the existing Developer Console to a trusted administrator role, and adds a server-only Supabase account-administration boundary. It does not deploy the Supabase Edge Function, assign a live admin role, deploy the Render backend change, verify an authenticated browser, execute speech providers, alter the analytical pipeline, or scientifically validate VoxVector.

| Task | Status | Evidence or remaining work |
| --- | --- | --- |
| Read canonical charter/workflow/guardrails and active auth owners | Complete | Current `main` inspected at `9539fa89ede3295e588feed781971919c542427e` |
| Inspect connected Supabase auth/profile boundary | Complete | One current trusted `developer` role observed; `profiles` and `audit_events` available; no live `admin`/`user` assignment changed |
| Consolidate browser auth/session/role routing | Complete in source | Shared `AuthGate.jsx`; trusted `app_metadata`; direct protected-route checks |
| Add minimum protected user destination | Complete in source | `/voxvector/app`; legacy `voxvector-dashboard.html` not adopted |
| Add admin operator and user-management source | Complete in source | Backend admin authorization, admin-only drawer UI, server-only `voxvector-user-admin` Edge Function source |
| Add regression coverage | Complete in source | Backend auth tests plus frontend role-routing contract tests |
| Source checkpoint QA | Complete | `e97655d59e283d7b3c9cda1065854df469214cb1` passed VoxVector QA `34329618939` / #1838, including API suite, frontend contract tests and React build |
| Synchronize affected canonical docs and Crown Labs mirror | Complete in branch | UI architecture, endpoint registry, QA status and architecture mirror updated |
| Final exact-head QA / PR Preview / repository review | Pending | Documentation/audit updates moved branch head; fresh exact-head evidence required |
| Edge Function / Render / browser verification | Not performed | Remains separate post-merge runtime evidence |

## Task log

### Task 19: role-gated account access and administrator boundary, 2026-09-09

Tracked in [#931](https://github.com/darenprince/darenprince-author/issues/931). Work started from exact canonical `main` revision `9539fa89ede3295e588feed781971919c542427e` on branch `feat/voxvector-role-gating`. The existing React app, `DeveloperGate.jsx`, `SiteHeader.jsx`, Supabase client, backend auth dependency, Developer Console, legacy static dashboard, connected Supabase schema, and current Auth role population were inspected before editing.

The prior browser implementation had one developer-specific gate and no canonical role-routed user application entry. The branch adds `voxvector/src/lib/access.js` as the single trusted-role interpretation layer, with `admin`, `developer`, and `user` resolved only from Supabase `app_metadata`. User-editable metadata is not accepted for authorization. `AuthGate.jsx` now owns session restore, email/password login, password reset, sign-out, unknown-role denial, and role routing. `/voxvector/login` routes trusted `admin` and `developer` sessions to `/voxvector/developer`, trusted `user` sessions to `/voxvector/app`, and unknown/missing roles to a denied login state. Direct protected-route entry independently checks allowed roles instead of relying on redirects alone.

The minimum protected `UserWorkspace.jsx` is intentionally bounded. It exposes authenticated account/session information and a safe user destination without copying the legacy root `voxvector-dashboard.html`, without restoring its old Deception Probability presentation, and without claiming user-facing analysis capability that has not yet been implemented and verified in the canonical React application.

The public `SiteHeader.jsx` now exposes a visible Login entry on desktop and mobile while preserving the existing landing actions. The account icon and mobile workspace links use `/voxvector/login`. Google sign-in and account creation are not surfaced because no corresponding VoxVector provider/policy execution evidence was established in this task.

Backend `VoxVector/api/auth.py` retains the historical `require_developer` dependency name so existing route wiring does not fork. Its trusted operator role set now accepts `developer` and `admin`; a trusted `user` remains denied. New backend tests cover developer acceptance, admin acceptance, user denial, user-metadata spoof denial, and missing bearer authentication. New frontend Node contract tests cover developer/admin/user routing, unknown roles, trusted-role checks, and user-metadata spoof resistance.

Administrator account management is added to the existing Developer Console rather than as a duplicate application. A `User Management` drawer item renders only for a trusted admin session and opens `AdminUsers.jsx`. The browser uses the existing Supabase client to invoke the `voxvector-user-admin` Edge Function. The Edge Function revalidates the caller JWT and trusted `admin` role before creating a server-side admin client with `SUPABASE_SERVICE_ROLE_KEY`. Source actions support listing users, account creation/invitation, trusted role/permission metadata changes, account/profile edits, password updates/recovery, and deletion. Self-deletion and removal of the caller's own admin role are blocked. Administrative mutations write bounded records to `audit_events`; passwords, bearer tokens, and the service-role credential are not written to those audit records.

Connected Supabase inspection found one current Auth account with trusted `developer` role and no current trusted `admin` or `user` assignment. `public.profiles` has RLS enabled and is used for profile data. No live user was promoted or demoted during this source task. The new `voxvector_permissions` values are trusted metadata for the account-management model; broad per-permission enforcement across every backend route is not claimed where current APIs remain role-gated.

The source checkpoint `e97655d59e283d7b3c9cda1065854df469214cb1` passed VoxVector QA run `34329618939` / run #1838. The workflow executed the API package install and full API test suite, recorded the tested revision, installed frontend dependencies, ran frontend contract tests, and completed the React production build. Subsequent documentation and audit commits advance the branch beyond that checkpoint, so fresh exact-head QA and PR Preview Build remain mandatory before merge recommendation.

**Changed files in this task:**

- `VoxVector/api/auth.py`
- `VoxVector/tests/test_auth.py`
- `VoxVector/supabase/functions/voxvector-user-admin/index.ts`
- `VoxVector/docs/UI_APPLICATION_ARCHITECTURE.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/QA_STATUS.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/system-architecture-and-auto-workflow.md`
- `voxvector/src/lib/access.js`
- `voxvector/src/lib/supabase.js`
- `voxvector/src/components/AuthGate.jsx`
- `voxvector/src/components/DeveloperGate.jsx`
- `voxvector/src/components/UserWorkspace.jsx`
- `voxvector/src/components/SiteHeader.jsx`
- `voxvector/src/main.jsx`
- `voxvector/src/components/AdminUsers.jsx`
- `voxvector/src/components/DeveloperConsole.jsx`
- `voxvector/tests/access.test.mjs`
- `voxvector/audits/AUDIT_REPORT.md`

The Edge Function source has not been deployed from this branch. The Render service still reflects older backend source and therefore does not yet enforce the branch's admin operator authorization in production. No authenticated admin execution, live user-route browser verification, Render deployment, fresh `/health` readback, provider execution, golden-case proof, or scientific validation is claimed by this task checkpoint.

### Task 18: address PR #937 operational-state and information-exposure review findings, 2026-09-09

PR #937 automated review identified two valid issues on verified head `c595ead24257f31866b412375264d83f2bdb195e`. First, a Render payload that omitted both explicit service state and `suspended` evidence still became `active` because a missing value passed through the false branch of the suspension fallback. Second, the public `/health` response could include an exception type and message produced by the runtime self-test.

The Render bridge now maps explicitly reported boolean/string suspension values through `_reported_suspension_state`; an absent or unrecognized provider value produces `not_reported`. Existing compatibility field `service.suspended` remains boolean, while the operator-facing operational state no longer promotes missing evidence. Regression tests cover active, suspended, absent, and unrecognized values.

The runtime self-test now exposes only `passed` or `failed` through public health and analysis-readiness responses. Exception contents are no longer returned to unauthenticated callers. A regression test deliberately raises an exception containing private detail and verifies the bounded public result.

Prior exact-head evidence for `c595ead...` remains valid for that superseded head: VoxVector QA run `34317879979` and PR Preview Build run `34317880072` both passed. The review-correction head requires fresh exact-head QA before merge. No deployment, browser verification, provider execution, #930 resolution, golden-case proof, or scientific validation is claimed.

### Task 17: operational truth wiring and pipeline coverage, 2026-09-09

Tracked in [#914](https://github.com/darenprince/darenprince-author/issues/914), reprioritized to P1 for the explicitly requested pipeline-readiness work. Work started from exact `main` revision `ee9fc31069d5c332099575afa58cb71a59dc8f52` on branch `codex/vv-operational-truth-wiring`. Published implementation commit: `42ad37724e9fa924fb11cd597f2dcfc2eb20ddc7`.

The Developer Console previously requested one GitHub workflow projection using the backend `/health` revision, then compared both VoxVector QA and GitHub Pages publication to that backend revision. Because the public React artifact and Render API are independently deployed, this could mark a current Pages artifact stale whenever the backend runtime legitimately reported a different commit. The workflow projection now selects frontend QA and Pages runs using the frontend build revision and selects backend-source QA separately using the live backend runtime revision. Unknown target revision is `UNVERIFIED`; a mismatched revision is `STALE`; query failure is `UNAVAILABLE`.

`GET /health` now preserves its existing fields and adds a normalized `runtime` object containing status, source, observation time, backend version, version authority and source revision. The authenticated Render status bridge adds an `operational` object containing source, observation time, explicit service/deploy states and the latest deploy revision. Missing provider data remains unknown/not reported. The frontend consumes these normalized objects with compatibility fallbacks and uses strict reported booleans for provider readiness; it no longer hard-codes an active Render state.

The existing QA workflow now uses deterministic `npm ci`, executes Node contract tests, injects the exact workflow revision and canonical API URL into the Vite build, and then builds the React application. New frontend tests cover completed/in-progress/failure mappings, independent frontend/backend revision selection, stale evidence, unknown freshness and unavailable evidence. Backend tests cover the normalized health contract, degraded health, Render operational mapping, missing revisions and the existing explicit `not_suspended` conversion.

Canonical console synchronization, endpoint, QA and version records were updated, together with the corresponding Crown Labs architecture mirror. Backend source remains `0.2.27` and frontend source remains `0.2.37`; their independent version streams were not forced to the same value. No deployment or production runtime state is claimed by the source change.

**Changed files at the implementation checkpoint:**

- `.github/workflows/voxvector-qa.yml`
- `VoxVector/api/app.py`
- `VoxVector/api/render_api.py`
- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/tests/test_health_contract.py`
- `VoxVector/tests/test_render_api.py`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/system-architecture-and-auto-workflow.md`
- `voxvector/package.json`
- `voxvector/src/components/DeveloperEngineeringStatus.css`
- `voxvector/src/components/DeveloperEngineeringStatus.jsx`
- `voxvector/src/components/PipelineBuildCard.jsx`
- `voxvector/src/lib/githubStatus.js`
- `voxvector/tests/githubStatus.test.mjs`
- `voxvector/audits/AUDIT_REPORT.md`

Checks actually executed before this report update: `node --test voxvector/tests/*.test.mjs` (3 passed); `node --check voxvector/src/lib/githubStatus.js`; Python syntax compilation for the changed backend/test modules; and `git diff --check`. A local full Python suite and Vite build were not executable because this workspace does not contain FastAPI/pytest or frontend dependencies, and offline npm installation could not obtain uncached Vite. GitHub Actions must provide the full API-test and React-build evidence on the final report head. Issue #914 remains open until that exact-head evidence is recorded. Production deployment, `/health` readback of this revision, authenticated browser verification, speech-provider execution, golden-case repeatability, issue #930, and scientific validation remain unresolved and must not be inferred from CI.

### Task 16: engineering MVP sprint gate alignment, 2026-09-09

Tracked in [#933](https://github.com/darenprince/darenprince-author/issues/933). Work started from exact `main` revision `fbe317660e7b9238cd46ffff3a8101291bc85580` on branch `docs/voxvector-mvp-sprint-gate-alignment`.

Canonical source/runtime evidence was refreshed before editing. Exact-main `VoxVector QA` run `34305133803` and `Deploy GitHub Pages` run `34305133777` were observed successful. Connected Render inspection found the single `voxvector-api` service with auto-deploy disabled and deployment `dep-dagcvau7bikc73aki9b0` observed `live` for source `fbe317660e7b9238cd46ffff3a8101291bc85580`, finished `2026-09-09T03:22:43.934801Z`. No fresh `/health` response for that deployment was observed in this task, so the Render deployment record is not represented as runtime self-test, provider readiness/execution, media readiness, or browser verification.

Created `VoxVector/docs/MVP_RELEASE_GATE.md` as the single engineering-MVP exit checklist. The gate requires one controlled real-audio fixture to traverse authenticated case creation/upload, private persistence/playback, actual faster-whisper and pyannoteAI cloud-primary execution, persisted transcript/speaker/alignment artifacts, eligibility/evidence/synthesis/assessment/report, history/reopen, and authenticated desktop/mobile verification. Engineering-MVP sign-off requires two complete successful golden-case executions on the same exact deployed revision; a source change resets the repeatability proof.

The gate explicitly keeps repository QA, frontend publication, backend deployment, runtime `/health`, provider execution, browser verification, engineering-MVP completion, and scientific validation separate. Configuration/readiness is not called provider execution. A build is not called deployed. A Render `live` record is not called browser verified. Engineering MVP is not called scientific validation.

`MVP_BUILD_PLAN.md`, `QA_STATUS.md`, and `CURRENT_ENGINEERING_STATE_2026-09-04.md` were aligned to the same release sequence. #930 is now explicit as the immediate intake reliability blocker. Controlled speech work remains mapped to #915 backlog identifiers `VV-TRANSCRIBE`, `VV-DIARIZE`, and `VV-ALIGN` until promoted. Deployed/browser release proof maps to `VV-DEPLOYVERIFY`; final engineering-MVP sign-off maps to `VV-LAUNCHGATE`. Existing issues remain owners for upload reliability/UX, manual Render deployment verification, user/developer gating, public navigation, startup/browser verification, publication evidence, and operational truth normalization.
