# VoxVector Engineering Audit — Auth Wake and Role Profile Editors

**Audit date:** 2026-09-10  
**Prompt:** `VV-AUTH-WAKE-PROFILE-EDITORS`  
**Tracking issue:** #931  
**Draft PR:** #974  
**Branch:** `fix/voxvector-auth-wake-profiles`  
**Source base:** `8bf2e3c0a97025ea7f25f6b10bc4cbad9bfa8b1e`

## Scope

This task is limited to the existing browser authentication, authenticated entry, and self-profile subsystem. It does not alter the VoxVector analysis pipeline, classification methodology, speech-provider configuration, backend authorization rules, Render deployment policy, or scientific-validation program.

The task has two owner-reported defects/gaps:

1. the API wake request was not started by a successful login;
2. approved user and administrator self-profile editing needed to be available through the existing authenticated product surfaces.

No duplicate login page, profile database, user workspace, administrator console, or v2/new/final implementation is introduced.

## Source trace

### Login and API wake

`voxvector/src/components/AuthGate.jsx` is the canonical browser authentication owner. Before this task, successful `signInWithPassword()` authentication updated the session and trusted-role routing but did not call the FastAPI health boundary. Developer/admin sessions could subsequently encounter health polling after the Developer Gate mounted, while the approved-user route had no equivalent login-triggered API request.

`voxvector/src/lib/api.js` is the canonical frontend FastAPI client boundary. The repair adds `wakeApi()` there rather than creating a second fetch client. A successful explicit email/password login starts one non-blocking `GET /health` request with `cache: 'no-store'` and `keepalive: true` before the returned session is applied to redirecting role state. Login does not wait for the Render cold start to complete.

Session restoration and normal auth-state observation do not invoke `wakeApi()`. This preserves the policy against artificial background keep-alive traffic. The existing Developer Gate remains responsible for observing actual health/runtime readiness after an operator routes into the Developer Console.

`voxvector/public/server-wake.js` was also traced. The file contains an older DOM/fetch-interception startup implementation, but the current `voxvector/index.html` does not load it. `VoxVector/docs/RENDER_FREE_SERVER_WAKE.md` is corrected so that historical file is no longer represented as the current runtime owner.

### Self-profile editing

Connected Supabase schema readback confirmed that VoxVector already has the RLS-protected `public.profiles` table with the established profile fields and existing profile rows. The existing `DeveloperProfileEditor.jsx` already used that table together with Supabase Auth user metadata and the private `voxvector-avatars` bucket. The correct repair was therefore to generalize and reuse the existing editor rather than create user/admin profile stores or competing components.

`DeveloperProfileEditor.jsx` now exports `useAccountProfile()` as the generic query owner while preserving `useDeveloperProfile` as a compatibility alias for existing Developer Console wiring. The editor derives its presentation label from the trusted VoxVector role and renders as Developer Profile, Admin Profile, or User Profile. Display name and avatar remain editable. Email, trusted role, and account ID remain read-only.

The editor does not write authorization roles or permissions. Trusted access remains derived exclusively from server-controlled `app_metadata` through the existing VoxVector access helper. Synchronizing display name into Supabase Auth `user_metadata` is presentation-only and cannot grant protected access.

`UserWorkspace.jsx` now embeds the shared self-profile editor and uses the persisted profile display name when available. The existing Developer Console profile route continues to use the same canonical editor; an administrator therefore receives the role-aware Admin Profile presentation there. Admin-only User Management remains a separate privileged surface for managing other accounts.

## Source changes

- `voxvector/src/lib/api.js` — add the one-shot canonical health wake helper.
- `voxvector/src/components/AuthGate.jsx` — start the wake request only after successful explicit password authentication and before session-driven role routing.
- `voxvector/src/components/DeveloperProfileEditor.jsx` — generalize the existing self-profile editor across trusted roles while preserving compatibility wiring and the authorization boundary.
- `voxvector/src/components/UserWorkspace.jsx` — wire the shared User Profile editor into the protected approved-user workspace.
- `voxvector/tests/authAccountIntegration.test.mjs` — add source-contract regression coverage for wake behavior, no restore keep-alive, shared role profile ownership, user wiring, and admin/developer separation.
- `VoxVector/docs/RENDER_FREE_SERVER_WAKE.md` — align runtime ownership and wake semantics with the canonical React implementation.
- `VoxVector/docs/UI_APPLICATION_ARCHITECTURE.md` — document login wake behavior and the shared role-aware self-profile architecture.
- `docs/crownlabsbible/04-product-dossiers/VoxVector/system-architecture-and-auto-workflow.md` — synchronize the executive/product mirror for authenticated wake and profile ownership.

## Verification evidence before this audit checkpoint

PR #974 QA run `34531077782` completed successfully against GitHub's synthetic PR merge commit `342d751cef299bcbdec6002660bb7e74af5a6df8`, whose PR head was `11cc570797b0520ea269c20bb1c3553609fc6306` at that checkpoint.

The workflow reported:

- `pytest -q` — **217 passed in 1.54s**;
- frontend `npm test` — **20 passed, 0 failed**;
- the four new auth/profile contract tests all passed;
- Vite production build — **success in 1.46s**, 2,334 modules transformed.

PR Preview Build `34531077668` explicitly checked out exact branch head `11cc570797b0520ea269c20bb1c3553609fc6306`, built successfully, verified the direct login entry, and uploaded preview artifact `voxvector-pr-preview-974` with artifact ID `10173503712`.

That evidence predates the final documentation/audit commits. Fresh final-head QA and Preview are therefore still required before any merge recommendation.

## Evidence boundaries

A login-triggered `/health` request establishes only that the browser attempted to wake the configured API. It does not establish that Render completed startup or that `/health` subsequently reached the healthy/runtime-self-test state.

A successful source build or PR Preview is not a GitHub Pages production publication, Render backend deployment, Supabase function deployment, or authenticated browser verification.

The profile editor source is not represented as browser verified until authenticated `admin`, `developer`, and `user` sessions are exercised on desktop and mobile against a published candidate. The administrator's ability to manage other users remains independently governed by the existing admin-only User Management and Supabase Edge Function boundary.

No analytical provider execution, end-to-end audio analysis, deception determination, engineering-MVP completion, or scientific validation is established by this task.

## Remaining acceptance

- inspect fresh final-head QA and PR Preview after all task files are committed;
- inspect the complete PR diff and current-main comparison;
- preserve PR #974 as draft until the review/verification gate is satisfied;
- publish only through the approved merge/deployment workflow if authorized;
- authenticate as admin, developer, and approved user in desktop and mobile browsers;
- verify that successful login starts a real API wake attempt and that actual backend readiness is separately observed;
- verify User Profile and Admin Profile display-name/avatar saves and reloads against Supabase;
- verify unauthorized and wrong-role direct-route denial plus sign-out/session behavior;
- update the running audit/index with final acceptance evidence when the safe append/update path is available.
