# VoxVector System Architecture and AUTO Workflow

**Status:** Current Crown Labs executive/product mirror  
**Effective:** 2026-09-01  
**Canonical technical source:** `VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`

## Executive architecture

VoxVector operates as a deliberately separated full-stack system:

`GitHub repository → GitHub Actions → GitHub Pages public React application`

`Browser → Render-hosted FastAPI API → Supabase authentication, persistence, diagnostics, and private media storage`

The public React application lives in `voxvector/`. The canonical backend and analysis engine live in `VoxVector/`.

## Hosting responsibilities

- **GitHub:** repository source of truth and CI/CD automation
- **GitHub Actions:** QA, build, artifact generation, and public frontend deployment
- **GitHub Pages:** public React application at `darenprince.com/voxvector/`
- **Render:** runtime host for the FastAPI API at `voxvector.crownlabs.tech`
- **Supabase:** configured authentication, persistence, diagnostics, profiles, audit records, and private media storage

Render is an API runtime, not VoxVector's durable media repository. GitHub Pages is a frontend host, not the API runtime.

## Account and authorization boundary

The active role-gating implementation keeps authentication and authorization separate from public navigation. The canonical React application uses one Supabase session lifecycle and trusted `app_metadata` roles:

- `admin` → protected Developer Console plus admin-only User Management;
- `developer` → protected Developer Console;
- `user` → protected `/voxvector/app` user workspace;
- missing or unknown role → denied protected access.

The public application exposes `/voxvector/login/` as the single account entry. The Pages artifact stages `voxvector/login/index.html` from the same canonical React build so the direct URL resolves without creating a second login implementation. Direct protected-route entry is role checked and does not rely on redirect behavior alone. User-editable profile metadata is not an authorization source.

After a successful explicit email/password login, the canonical authentication gate starts one non-blocking request to the API `/health` endpoint before applying the authenticated session to trusted-role routing. This is a user-driven wake attempt for a Render service that may have wound down. It does not wait for backend readiness, and session restoration, token observation, and sign-out do not generate hidden keep-alive traffic. Developer/admin startup state remains separately derived from real `/health` responses after routing.

Self-profile editing reuses one canonical profile implementation across `admin`, `developer`, and `user` accounts. The existing `public.profiles` record and private `voxvector-avatars` storage bucket remain the sole profile stores. Display name and avatar are editable; email, trusted role, and account ID remain read-only identity fields. The protected user workspace embeds the User Profile editor. The existing Developer Console profile route presents the same implementation as Developer Profile or Admin Profile according to the trusted role. Admin-only User Management remains a separate privileged surface for administering other accounts. Profile writes never grant or change authorization because trusted access continues to come only from server-controlled `app_metadata`.

Privileged account administration is designed as a server-only Supabase Edge Function. The browser invokes the function with the current JWT; the function revalidates a trusted `admin` role before using the Supabase service-role credential to create/invite users, maintain roles/permissions/profile fields, administer passwords/recovery, or delete accounts. The service-role credential is never exposed to the GitHub Pages client. Function source, function deployment, authenticated admin execution, and browser verification remain separate evidence states.

## Operational truth boundary

The frontend and backend are independently deployed and therefore carry separate revision truth. The GitHub Pages publication is matched to the frontend build revision injected by GitHub Actions. The Render deployment is matched to the backend revision returned by `/health`. The Developer Console reports the source and observation time for each boundary and marks missing revision identity as unverified or a mismatched revision as stale. It does not infer runtime health from a successful deployment or combine these independent revisions into one synthetic state.

The Supabase account-administration function is a third runtime boundary. A GitHub commit or Pages publication does not establish that the Edge Function is deployed or that an admin operation executed successfully.

A successful login wake request is likewise not equivalent to a completed Render startup. API readiness must still be observed from the backend health response, and authenticated browser behavior must be verified independently from source/build evidence.

## Audio flow

`Browser → frontend → API on Render → Supabase private media storage`

The API mediates authenticated upload operations. Persistent audio storage belongs to the configured Supabase architecture, not Render.

## AUTO engineering workflow

The execution layer is [GitHub tracker #915](https://github.com/darenprince/darenprince-author/issues/915), governed by [DEVELOPMENT_WORKFLOW.md](../../../../VoxVector/docs/DEVELOPMENT_WORKFLOW.md#10-development-flow), effective September 8, 2026. Issues own task status, dependencies and acceptance criteria; PRs own reviewable changes; [AUDIT_REPORT.md](../../../../voxvector/audits/AUDIT_REPORT.md) records evidence after each task. Follow Backlog → Ready → In progress → In review → Done, with explicit Blocked reasons. Close only after acceptance evidence is verified. Dashboard planning must link this queue and keep task status separate from runtime, deployment and scientific validation. Automated issue synchronization is not claimed.

AUTO means:

1. **Architecture** — establish the actual system boundary.
2. **Understand ownership** — identify the canonical implementation.
3. **Trace** — follow source through deployment and runtime to the actual failing boundary.
4. **Operate and verify** — edit the canonical owner, build, deploy, verify, then document.

This workflow explicitly rejects assumption-driven debugging, patch stacking, and deleting layers without migrating their useful behavior.

## Documentation governance

The VoxVector repository and `VoxVector/docs/` remain authoritative for technical implementation.

This Crown Labs dossier mirrors material architecture and workflow changes for executive/product continuity. If a conflict exists, repository canon controls.

## Synchronization rule

Material changes to:

- architecture
- deployment boundaries
- storage/data flow
- engineering workflow
- canonical ownership
- major product surfaces

must be updated in canonical VoxVector documentation and then synchronized to the corresponding Crown Labs dossier.

For the complete technical report and mandatory workflow, see:

`VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`
