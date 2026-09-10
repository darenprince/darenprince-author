# VoxVector Endpoint Registry

**Effective:** 2026-09-10  
**Status:** Canonical active endpoint map

This document is the authoritative endpoint map for the current VoxVector deployment architecture.

## Public product

`https://darenprince.com/voxvector/`

GitHub Pages hosts the canonical public React application and Developer Console.

Protected React routes include:

- `/voxvector/login/` — canonical Supabase login and trusted-role router;
- `/voxvector/developer/` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace.

The GitHub Pages artifact explicitly stages `voxvector/login/index.html` from the canonical React build so direct navigation to `/voxvector/login/` resolves to the same `AuthGate.jsx` implementation instead of depending on the generic SPA 404 fallback. This is a route entry for the existing React application, not a second login implementation.

## Existing API

`https://voxvector.crownlabs.tech`

This is the original VoxVector API domain and remains preserved. It is not repointed to AWS by the current work.

The existing frontend API client continues to default to this endpoint unless `VITE_VOXVECTOR_API_URL` is explicitly configured.

## AWS API

`https://awsapi.crownlabs.tech`

This is the dedicated AWS VoxVector API hostname.

Current AWS path:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

HTTP on port 80 redirects to HTTPS. The AWS environment remains separately maintained and is not part of the current Render/Pages release-gate evidence.

## Persistence boundary

Supabase is the configured authentication, persistence, diagnostics, durable observed-log archive, and private-media boundary for the connected architecture. Render remains the native provider/runtime log source for the Render-hosted API. The #959 source change preserves Render-native logs and adds/extends the Supabase durable copy; it does not replace Render with Supabase as the provider log surface.

AWS is a separately addressed API environment. Provider secrets must be managed by the target deployment environment and must never be placed in repository source or client bundles.

### Authenticated case lifecycle endpoints

The canonical case API remains owner scoped through the existing backend authorization boundary:

- `POST /v1/cases` — create a case record;
- `GET /v1/cases` — list the authenticated owner's cases and reconcile eligible stale/interrupted run state through the canonical CaseStore;
- `GET /v1/cases/{case_id}` — read one owner-scoped case and reconcile eligible run state;
- `POST /v1/cases/{case_id}/sources` — persist a source recording and provenance;
- `POST /v1/cases/{case_id}/sources/{source_id}/analyze` — execute the canonical case-analysis path for that source;
- `DELETE /v1/cases/{case_id}` — delete the owner-scoped case and its recorded persisted media through the supported storage API.

Issue #945 / PR #946 is merged in current `main`. It hardens the existing read/list lifecycle rather than adding a second endpoint family. Eligible interrupted or deadline-expired `running` runs can be reconciled to explicit terminal state when `GET /v1/cases` or the individual case path causes canonical case reconciliation. Legitimate current-worker runs with a usable future stage deadline are preserved. Reconciliation persists real elapsed/report metadata, marks the interrupted active stage failed, and records unfinished dependent work as `not_run` instead of leaving it indefinitely pending.

The merged implementation serializes per-case read/reconcile/write operations with run updates, source mutation and deletion inside the existing single-process CaseStore. This protects the current same-process runtime from a stale Case History snapshot overwriting a newer same-process run update. It is not cross-process compare-and-swap protection for future horizontally scaled object-store writers.

Terminal run records may include `run_report`; failed or `completed_with_failures` runs may include `failure_report`. These fields are persisted case/run artifacts and are exposed through the existing case payload. They are execution/audit records, not scientific-validation reports.

### Planned server-aware cancellation endpoint — issue #949

Draft PR #952 currently defines the frontend client action for:

`POST /v1/cases/{case_id}/runs/{run_id}/cancel`

The server endpoint/lifecycle is **not yet implemented on canonical `main`** at this synchronization. Do not treat browser `AbortController` transport cancellation as server-side analysis cancellation. Issue #949 remains the owner for authenticated owner-scoped cancellation, persisted request/acknowledgement/terminal state, safe-boundary orchestration, UI states, tests, and documentation.

### Supabase account-administration function

`voxvector-user-admin` is the canonical server-side Supabase Edge Function source for administrator account management. It is not a browser-side `auth.admin` client.

The source contract is:

`authenticated browser → Supabase Functions invoke → JWT revalidation → trusted admin role check → server-only service-role administration`

Source actions are `list`, `create`, `update`, `recovery`, and `delete`. The implementation can create or invite accounts, update trusted VoxVector role/permission metadata, maintain profile fields, administer passwords/recovery, and delete accounts. It blocks self-deletion and removal of the caller's own admin role. Administrative mutations write sanitized entries to `audit_events` without passwords, bearer tokens, or service-role credentials.

Production deployment and browser verification for this Edge Function are tracked by issue #931 and remain separate from #959.

## Latest observed Render runtime configuration

Connected Render inspection on 2026-09-10 confirms the single `voxvector-api` service remains the current Render backend with automatic deployment disabled.

Latest observed deployment at this documentation checkpoint:

- deployment: `dep-dah0g13l550s73d2dbb0`;
- source revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`;
- status: `live`;
- trigger: `api`;
- finished: `2026-09-10T01:36:34.195005Z`.

Current GitHub `main` is newer than that Render backend revision. Subsequent frontend/documentation merges therefore must not be described as a backend deployment. The Render source revision remains separate evidence until a deliberate backend deployment occurs.

This deployment record is not a fresh complete `/health` payload. Detailed provider-readiness fields from older health checkpoints must not be projected onto this newer source without a new readback. Deployment `live` also does not establish controlled provider execution or browser verification.

The `api` trigger does **not** verify issue #920's protected Developer Console `Deploy Now` / server-side deploy-hook route. The path under test remains separate.

Provider readiness is not proof that a case route invoked the provider. Case-analysis diarization additionally requires the explicit route gate `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`.

Commit-specific QA must be established from GitHub Actions for the exact source revision before a runtime is marked QA-current.

### Health operational-truth contract

`GET /health` preserves its compatibility fields and exposes a normalized `runtime` object with:

- `status`
- `source`
- `observed_at`
- `version`
- `version_source`
- `source_revision`

The observation timestamp describes the API health read. It is not a GitHub QA timestamp or a Render deployment timestamp. The React Developer Console keeps the backend revision separate from its own `VITE_GITHUB_SHA` frontend build revision.

No fresh complete `/health` payload for the #959 source branch is recorded in this documentation synchronization.

## Deployment and migration rule

The AWS endpoint is a separate deployment environment. Do not silently replace `voxvector.crownlabs.tech` or change the production frontend API base without an explicit cutover decision, exact-commit deployment verification, browser verification, and documentation update.

## Engineering verification

At the #959 source-work baseline:

- canonical GitHub `main`: `073c6a099768d1a14a882dda37a9c458ac905a18`;
- exact-main VoxVector QA #2004 / `34434051439`: success;
- exact-main Deploy GitHub Pages #1711 / `34434051431`: success;
- Render service: `voxvector-api`, auto-deploy disabled;
- latest observed Render deployment: `dep-dah0g13l550s73d2dbb0`, `live`, trigger `api`, source `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`;
- #959 implementation branch and PR are newer than main and require their own exact-head QA before merge recommendation;
- AWS custom-domain/runtime evidence remains separately maintained and is not refreshed by this task.

Infrastructure state, case-run lifecycle reliability, provider readiness, provider execution, browser verification and scientific validation remain separate evidence classes.

## Protected Developer Console deployment trigger

`POST /v1/developer/render/deploy`

This authenticated developer route triggers the configured Render Deploy Hook from the server-side API runtime. The hook URL is stored only as `RENDER_DEPLOY_HOOK_URL` in protected runtime configuration and is never returned to the browser.

Render production auto-deploy is intentionally disabled.

The endpoint reports **hook-request acceptance only**. Its successful response does not mean a Render deployment exists, finished, went live, matches the intended Git commit, passed `/health`, or was browser verified. Required evidence remains:

`Developer Console action → POST /v1/developer/render/deploy accepted → new Render deploy observed → intended commit matched → deploy status live → backend source_revision checked → fresh /health verified → browser/runtime verification when required`

Current deployment `dep-dah0g13l550s73d2dbb0` was triggered by Render API and is not substituted for that path.

## Render Developer Console observability routes

`GET /v1/developer/render/status`

Returns current service/deployment/instance state visible to the authenticated developer bridge. Its normalized `operational` object reports `source`, `observed_at`, `service_state`, `deploy_state`, and `source_revision`. Missing deployment revisions remain `unknown`; provider strings such as `not_suspended` are mapped explicitly rather than coerced as truthy values.

`GET /v1/developer/render/logs`

Returns the current native Render log observations through the server-side bridge. The #959 source implementation keeps this Render view and additionally attempts to persist a sanitized snapshot of the retrieved window into the private Supabase `voxvector-logs` archive. Mirror failure is reported separately and does not make the Render-native log view unavailable.

Logs and status are evidence about runtime/deployment behavior; they are not evidence of scientific validation.

`GET /v1/developer/render/debug-bundle?case_id=<case_id>&run_id=<run_id>`

Returns an authenticated developer/admin ZIP containing bounded sanitized troubleshooting evidence for the owner-scoped analysis run. The server gathers Supabase-backed VoxVector events/errors, a bounded Render provider-log window, Render status, safe runtime health, and sanitized run/provenance metadata. `manifest.json` records exact versus time-window correlation and explicitly lists missing evidence.

The endpoint intentionally excludes raw audio, transcript text, request bodies, passwords, tokens, cookies, signed URLs, Supabase service-role credentials, Render API keys, and deploy-hook URLs. It is an engineering debug export, not a report of scientific validation.

The corresponding Developer Console control is added to the existing Analysis Workspace rather than a second dashboard/page. It becomes available once the case has a persisted run identifier, including an apparently stuck run whose process may have restarted.

At this source checkpoint the #959 route/control are **not deployed production capability**. Merge, deliberate deployment, exact-revision `/health`, authenticated execution, Supabase mirror readback, downloaded ZIP inspection, and browser verification remain separate required evidence.

## External diarization provider boundary

The VoxVector backend may call the pyannoteAI API as an external server-side provider when `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` is configured. The API key remains only in the deployment environment. The public React application never calls pyannoteAI directly and never receives `PYANNOTE_KEY`.

Local Community-1 remains a separate provider path and may be configured as an explicit fallback. Provider switching is recorded in analysis provenance rather than hidden from the case/run record. Configuration and fallback code paths are not provider-execution evidence.
