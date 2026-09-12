# VoxVector Endpoint Registry

**Status:** canonical active endpoint map

This is a living route inventory. Exact runtime/deployment identity comes from live evidence, not from stale hard-coded deployment IDs in documentation.

## Public application surfaces

| Surface | Role |
|---|---|
| `/voxvector/` | public product landing |
| `/voxvector/login/` | canonical account entry |
| `/voxvector/app/` | protected approved-user workspace |
| `/voxvector/developer/` | protected Developer Console entry |
| `/voxvector/site-map/` | public human-readable product surface map |
| `/voxvector/pipeline.html` | styled pipeline reference |
| `/voxvector/methods.html` | styled analysis-methods reference |

The current public shell uses Request Access → login and route-qualified landing anchors. PR #993 is merged; these are current source behaviors rather than an unmerged candidate.

## Core health endpoint

### `GET /health`

Canonical backend readiness/runtime evidence endpoint.

Current source health contract can expose safe runtime information including:

- service status;
- backend/pipeline version;
- source revision;
- runtime self-test;
- process and hosting-instance provenance when available;
- memory budget/admission information;
- pipeline build/status contract;
- transcription provider configuration/readiness;
- diarization provider configuration/readiness;
- diagnostic/private-media readiness.

A health response is runtime/readiness evidence. It is not provider execution or case-analysis completion.

The latest retained forced-fresh health evidence reported backend **0.2.27** on source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93` on 2026-09-11. Current Supabase diagnostics later show request rows tagged with the 2026-09-12 engineering baseline `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`, but that diagnostic attribution must not be rewritten as a fresh `/health` response.

## Case API

Protected case routes require the current trusted authorization boundary and the `cases.manage` permission where applicable.

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/v1/cases` | create an owner-scoped case |
| `GET` | `/v1/cases` | list owner-scoped cases |
| `GET` | `/v1/cases/{case_id}` | read one case and persisted state |
| `POST` | `/v1/cases/{case_id}/sources` | upload/persist a supported case source |
| `GET` | `/v1/cases/{case_id}/sources/{source_id}/playback` | issue authenticated signed playback access |
| `POST` | `/v1/cases/{case_id}/sources/{source_id}/analyze` | run canonical case-bound analysis |
| `DELETE` | `/v1/cases/{case_id}` | delete the owner-scoped case through the supported case/storage owner |

The case-bound analysis route is the current product path. Undated documentation that still calls a generic `/v1/analyze` endpoint the primary product analysis route is stale.

## Diagnostics API

Protected diagnostic routes require `diagnostics.read`.

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/v1/diagnostics/errors` | query sanitized durable error reports |
| `GET` | `/v1/diagnostics/events` | query sanitized durable lifecycle/diagnostic events |

Current Supabase diagnostics are active and receiving production request/error records. Operational logs must not copy raw audio, transcript bodies, bearer tokens, cookies, provider credentials or signed URLs merely as proof.

## Developer Render bridge

Protected server-owned Render bridge routes keep provider credentials/deploy hooks out of browser source.

| Method | Route | Permission | Purpose |
|---|---|---|---|
| `GET` | `/v1/developer/render/status` | `diagnostics.read` | retrieve normalized Render service/deployment status |
| `GET` | `/v1/developer/render/logs` | `diagnostics.read` | retrieve bounded/sanitized Render logs |
| `GET` | `/v1/developer/render/debug-bundle` | `diagnostics.read` | generate/download case/run correlated debug evidence |
| `POST` | `/v1/developer/render/deploy` | `deploy.manage` | trigger the protected server-side deploy-hook path |

Current source/tests enforce permission mapping for cases, diagnostics, Render diagnostics and deploy management.

## Authentication and role boundary

The browser uses Supabase authentication. Trusted role/permission authority is server-controlled account metadata and backend authorization policy; user-editable profile metadata is not authorization.

Current frontend login source issues one non-blocking `GET /health` wake after successful explicit password login before role routing settles. That wake attempt does not prove backend readiness.

## Supabase account administration

Administrator account management uses the canonical `voxvector-user-admin` Supabase Edge Function. Connected inspection during the 2026-09-12 reconciliation showed it ACTIVE at version 2 with JWT verification enabled.

The browser must never receive the Supabase service-role key.

## Deployment boundary

Public frontend: GitHub Pages at the VoxVector public path.

Primary API domain: `voxvector.crownlabs.tech`.

Separately addressed AWS API environment: `awsapi.crownlabs.tech`.

Supabase: authentication, persistence, diagnostics and private media/storage boundary.

Do not infer that a source commit is deployed merely because it is on `main`. Do not infer that a deployment is healthy merely because a provider says `live`. Do not infer provider execution from readiness.

## Canonical source wiring

- frontend API client: `voxvector/src/lib/api.js`
- authentication owner: `voxvector/src/components/AuthGate.jsx`
- Developer Console: `voxvector/src/components/DeveloperConsole.jsx`
- pipeline projection: `voxvector/src/components/PipelineBuildCard.jsx`
- backend HTTP owner: `VoxVector/api/app.py`
- Render bridge owner: `VoxVector/api/render_api.py`
- backend auth policy: `VoxVector/api/auth.py`
- analysis engine: `VoxVector/src/voxvector/`

The frontend contract tests trace case, diagnostics and Render-client paths to these backend owners. Source-route wiring tests do not prove production execution.
