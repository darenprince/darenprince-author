# VoxVector Render Operational Status UI Verification

**Date:** 2026-09-09 America/Chicago / 2026-09-10 UTC  
**Issue:** #954  
**Pull request:** #956  
**Branch:** `fix/voxvector-render-operational-status-ui`  
**Canonical base:** `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`  
**Prompt identifier:** `VV-RENDER-OPERATIONAL-STATUS-UI`

## Scope

This checkpoint covers one subsystem only: operator-facing Render lifecycle/status presentation inside the existing VoxVector Developer Console.

No backend analysis behavior, classification logic, provider execution policy, authentication policy, Render auto-deploy policy, or scientific methodology was changed.

## Problem verified in canonical source

The prior Developer Console gave Render API connectivity too much visual authority. The Render Runtime surface could show a green connection state even when service/deployment lifecycle evidence had a different meaning, and absent service state could fall back to `Active`. The main Developer Overview did not poll Render status while open and did not include Render among the primary status cards.

The existing backend endpoint `GET /v1/developer/render/status` already exposes normalized operational evidence through `operational.service_state` and `operational.deploy_state`, so the corrective layer is the canonical frontend status presentation rather than a duplicate backend service implementation.

## Implemented source behavior

The branch introduces `voxvector/src/lib/renderOperationalState.js` as the frontend normalization owner used by both Developer Overview and the live engineering rail.

Accepted terminal-live values are `ACTIVE` and `LIVE`. Both the Render service and latest deployment must independently be in that accepted terminal set before the combined state is healthy.

Transitional values such as `PENDING`, `QUEUED`, `CREATED`, `BUILDING`, `DEPLOYING`, `UPDATING`, `BUILD IN PROGRESS`, `UPDATE IN PROGRESS`, and `PRE DEPLOY IN PROGRESS` remain non-live. Hard error/attention values such as suspended, deactivated, failed, unavailable, unknown/unreported, or other non-live provider states outrank transitional values in the combined dashboard tone.

The compact top engineering rail uses a stricter alarm rule: any combined Render state other than terminal-live receives the red attention treatment, including legitimate transitional deployment states.

Developer Overview now polls the existing authenticated Render status bridge while the dashboard is open, adds a Render Service primary status card, colors each complete primary card by state, and exposes always-visible subtext for API/frontend/backend version, runtime revision, pipeline counts, transcription provider/adapter/readiness context, Render region, and Render source/deployment revision.

Render Runtime now labels the Render API bridge connection separately from service and deployment lifecycle. Service state and latest deployment are independently color-coded, and missing provider state is no longer synthesized as `Active`.

## Direct Render evidence before change

Connected Render inspection observed one VoxVector service in the configured workspace:

- service: `voxvector-api`
- service ID: `srv-da2f88n40ujc73a8m26g`
- root: `VoxVector`
- production auto-deploy: disabled
- suspension value: `not_suspended`
- latest deploy: `dep-dah0g13l550s73d2dbb0`
- latest deploy source revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- latest deploy state: `live`

This is Render service/deployment evidence only. It does not establish a fresh backend `/health` readback, authenticated browser behavior, controlled transcription/diarization execution, engineering-MVP completion, or scientific validation.

## Test evidence

A focused Node contract test was added at `voxvector/tests/renderOperationalState.test.mjs`. It covers:

- provider-state normalization;
- service `ACTIVE` + deploy `LIVE` and service `LIVE` + deploy `ACTIVE` as healthy;
- transitional build/update/pre-deploy states as non-live;
- suspended, deactivated, failed, unavailable, and unreported states as errors;
- hard-error severity taking precedence when the other state is transitional;
- pending query state as transitional rather than healthy.

On exact source/test head `80ecb3366db88549ef901cc68ecb674fb6f53907`, VoxVector QA run #1984 completed successfully. The workflow executed API package installation, `pytest -q`, tested-revision recording, frontend `npm ci --no-audit --no-fund`, `npm test`, and `npm run build`.

The exact same source/test head passed VoxVector PR Preview Build #822. The workflow staged canonical public assets, installed dependencies, built the preview, staged direct login entry, verified the preview artifact, and uploaded `voxvector-pr-preview-956`.

Because this audit checkpoint itself is committed after those runs, final merge recommendation requires another exact-head QA and PR Preview result for the resulting pull-request head.

## Browser verification boundary

The exact-head preview artifact can verify build/artifact integrity, but the requested Developer Console surfaces are protected by Supabase authentication. No authorized reusable browser session is available in the current execution environment. The protected Developer Overview and Render Runtime therefore remain **not browser verified** in this checkpoint.

Do not treat successful frontend build, uploaded preview artifact, Render service status, or API bridge connectivity as browser verification.

## Documentation synchronization

Affected current documents updated in this task:

- `VoxVector/docs/CSS_ARCHITECTURE.md`
- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `VoxVector/docs/UI_APPLICATION_ARCHITECTURE.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/current-engineering-state-2026-09-04.md`

Historical checkpoints were not rewritten.

## Merge gate

Before merge recommendation:

1. confirm final PR head still branches from the intended current `main` or reconcile if `main` moved;
2. require successful VoxVector QA on that exact final head;
3. require successful PR Preview Build on that exact final head;
4. inspect the final diff and review threads;
5. preserve protected-console browser verification as unresolved unless an authorized session is actually exercised.

A successful merge or Pages publication will still not constitute a Render backend deployment, provider execution, browser verification, or scientific validation.
