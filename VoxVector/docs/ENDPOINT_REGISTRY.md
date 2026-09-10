# VoxVector Endpoint Registry

**Effective:** 2026-09-09  
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

HTTP on port 80 redirects to HTTPS.

The AWS ACM certificate for `awsapi.crownlabs.tech` is issued and DNS validated.

## Persistence boundary

Supabase is the configured authentication, persistence, diagnostics, and private-media boundary for the connected architecture. AWS is a separately addressed API environment. Provider secrets must be managed by the target deployment environment and must never be placed in repository source or client bundles.

### Authenticated case lifecycle endpoints

The canonical case API remains owner scoped through the existing backend authorization boundary:

- `POST /v1/cases` — create a case record;
- `GET /v1/cases` — list the authenticated owner's cases;
- `GET /v1/cases/{case_id}` — read one owner-scoped case;
- `POST /v1/cases/{case_id}/sources` — persist a source recording and provenance;
- `POST /v1/cases/{case_id}/sources/{source_id}/analyze` — execute the canonical case-analysis path for that source;
- `DELETE /v1/cases/{case_id}` — delete the owner-scoped case and its recorded persisted media through the supported storage API.

Issue #945 / PR #946 hardens the read/list lifecycle rather than adding a second endpoint family. Eligible interrupted or deadline-expired `running` runs can be reconciled to explicit terminal state when `GET /v1/cases` or the individual case path causes canonical case reconciliation. Legitimate current-worker runs with a usable future stage deadline are preserved. Reconciliation persists real elapsed/report metadata, marks the interrupted active stage failed, and records unfinished dependent work as `not_run` instead of leaving it indefinitely pending.

The current #946 implementation serializes per-case read/reconcile/write operations with run updates, source mutation and deletion inside the existing single-process CaseStore. This prevents a Case History poll from persisting a stale case snapshot after a newer same-process run update. It is not a claim of cross-process compare-and-swap semantics for future horizontally scaled object-store writers.

Terminal run records may include `run_report`; failed or `completed_with_failures` runs may include `failure_report`. These fields are persisted case/run artifacts and are exposed through the existing case payload. They are execution/audit records, not scientific-validation reports.

### Supabase account-administration function

`voxvector-user-admin` is the canonical server-side Supabase Edge Function source for administrator account management. It is not a browser-side `auth.admin` client.

The function contract is:

`authenticated browser → Supabase Functions invoke → JWT revalidation → trusted admin role check → server-only service-role administration`

Supported source actions are `list`, `create`, `update`, `recovery`, and `delete`. The source can create or invite accounts, update trusted VoxVector role/permission metadata, maintain profile fields, administer passwords/recovery, and delete accounts. It blocks self-deletion and removal of the caller's own admin role. Administrative mutations write sanitized entries to `audit_events` without passwords, bearer tokens, or service-role credentials.

Source presence is not proof of successful authenticated live administration. Edge Function deployment state, actual admin-role assignment, authenticated invocation, and browser verification remain separate evidence gates.

## Latest observed Render runtime configuration

Connected Render inspection on 2026-09-09 confirms the single `voxvector-api` service (`srv-da2f88n40ujc73a8m26g`) still follows `main`, has automatic deployment disabled, and has one active service instance configured. The latest observed live deployment is `dep-dagjc3740ujc73ff3ge0`, source revision `09381797d4486bc049cb99a527c624690274b7c7`, which contains the merged September 9 transcription memory/dependency-order repair.

The latest separately recorded detailed `/health` payload remains an older checkpoint. Its provider-readiness fields must not be projected onto a newer source revision without a fresh health payload readback. The later `09381797...` deployment was observed building, starting Uvicorn, returning health-check HTTP 200 responses and reaching Render `live`; that does not establish controlled provider execution.

Provider readiness is not proof that a case route invoked the provider. Case-analysis diarization additionally requires the explicit route gate `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`.

Commit-specific QA must be established from GitHub Actions for the exact source revision before a runtime is marked QA-current.

### Health operational-truth contract

`GET /health` preserves its existing top-level compatibility fields and exposes a normalized `runtime` object with:

- `status`
- `source`
- `observed_at`
- `version`
- `version_source`
- `source_revision`

The observation timestamp describes the API health read. It is not a GitHub QA timestamp or a Render deployment timestamp. The React Developer Console keeps that backend revision separate from its own `VITE_GITHUB_SHA` frontend build revision.

## Deployment and migration rule

The AWS endpoint is a separate deployment environment. Do not silently replace `voxvector.crownlabs.tech` or change the production frontend API base without an explicit cutover decision, exact-commit deployment verification, browser verification, and documentation update.

## Engineering verification

At the current documentation checkpoint:

- canonical GitHub `main`: `010676db66e92d715290ee5fe0d1bc3b52c4b208`;
- exact-main VoxVector QA #1950: success;
- exact-main Deploy GitHub Pages #1707: success;
- Render service: `voxvector-api`, auto-deploy disabled;
- latest observed Render deployment: `dep-dagjc3740ujc73ff3ge0`, `live`, source `09381797d4486bc049cb99a527c624690274b7c7`;
- current #946 lifecycle source checkpoint before this documentation commit: `18777886bf28c6cac8fb13fc00d5b5653b15b20b`, VoxVector QA #1954 success, PR Preview Build #815 success;
- Supabase project `VoxVector`: `ACTIVE_HEALTHY` at the 2026-09-09 connected inspection;
- AWS custom-domain/runtime evidence remains separately maintained and is not refreshed by this task.

Infrastructure state, case-run lifecycle reliability, provider readiness, provider execution, browser verification and scientific validation remain separate evidence classes.

## Protected Developer Console deployment trigger

`POST /v1/developer/render/deploy`

This authenticated developer route triggers the configured Render Deploy Hook from the server-side API runtime. The hook URL is stored only as `RENDER_DEPLOY_HOOK_URL` in protected runtime configuration and is never returned to the browser.

Render production auto-deploy is intentionally disabled. Connected inspection on 2026-09-09 reconfirmed one workspace (`My Workspace`, `tea-da2errdg1s2s73cl4eeg`) and one Render service (`voxvector-api`, `srv-da2f88n40ujc73a8m26g`) with `autoDeploy=no` and the automatic deploy trigger off.

The endpoint reports **hook-request acceptance only**. Its successful response does not mean a Render deployment exists, finished, went live, matches the intended Git commit, passed `/health`, or was browser verified. The required evidence chain is:

`POST /v1/developer/render/deploy accepted → new Render deploy observed → intended commit matched → deploy status live → backend source_revision checked → /health verified → browser/runtime verification when required`

## Render Developer Console observability routes

`GET /v1/developer/render/status`

Returns current service/deployment/instance state visible to the authenticated developer bridge. Its normalized `operational` object reports `source`, `observed_at`, `service_state`, `deploy_state`, and `source_revision`. Missing deployment revisions remain `unknown`; provider strings such as `not_suspended` are mapped explicitly rather than coerced as truthy values.

`GET /v1/developer/render/logs`

Returns current Render log observations through the server-side bridge. Logs and status are evidence about runtime/deployment behavior; they are not evidence of scientific validation.

## External diarization provider boundary

The VoxVector backend may call the pyannoteAI API as an external server-side provider when `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` is configured. The API key remains only in the deployment environment. The public React application never calls pyannoteAI directly and never receives `PYANNOTE_KEY`.

Local Community-1 remains a separate provider path and may be configured as an explicit fallback. Provider switching is recorded in analysis provenance rather than hidden from the case/run record.
