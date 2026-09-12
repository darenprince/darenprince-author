# VoxVector frontend navigation, site-map, and wiring audit

**Date:** 2026-09-11  
**Scope:** PR #993, issues #932 and #965  
**Subsystem:** canonical VoxVector frontend navigation/shell + Developer Console frontend projection/wiring  
**Boundary:** no backend analytical-method change, provider configuration change, provider execution claim, scientific-validation claim, or duplicate application/page implementation

## Objective

Review current canonical VoxVector documentation and source, inventory published frontend surfaces, repair dead/misdirected landing/menu links, add a human site-map page through the existing public shell, correct the Developer Console pipeline projection, and trace the frontend API client to the existing backend route owners.

The work edits existing canonical owners. It does not add `v2`, `new`, `final`, duplicate pages, alternate pipeline implementations, or a second backend.

## Source-of-truth review

Before implementation, current repository documentation was used as authority, including:

- `VoxVector/docs/OPERATING_CHARTER.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/PROJECT_DECISION_LOG.md` / active decision records where applicable
- `VoxVector/docs/ANALYSIS_PIPELINE.md`
- `VoxVector/docs/ARCHITECTURE.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`

Historical audits/checkpoints were treated as evidence for their recorded revision only and were not rewritten to appear current.

## Canonical frontend page/surface inventory

| Surface | Canonical source/owner | Route | Classification |
|---|---|---|---|
| Public product application | `voxvector/src/App.jsx` + `SiteHeader.jsx` | `/voxvector/` | React public shell |
| Human VoxVector site map | `voxvector/src/components/SiteMapPage.jsx` | `/voxvector/site-map` | React public shell, added in PR #993 |
| Account login / role router | `AuthGate.jsx` through `main.jsx` | `/voxvector/login` | protected React entry |
| Approved-user workspace | `UserWorkspace.jsx` through `main.jsx` | `/voxvector/app` | protected React workspace |
| Developer Console | `DeveloperConsole.jsx` through `main.jsx` | `/voxvector/developer` | protected React workspace |
| Analysis Pipeline | `voxvector/public/pipeline.html` | `/voxvector/pipeline.html` | styled frontend reference |
| Analysis Methods | `voxvector/public/methods.html` | `/voxvector/methods.html` | styled frontend reference |
| Image Index | `voxvector/public/image-index/index.html` | `/voxvector/image-index/` | styled technical/reference page |
| Loading demo | `voxvector/public/loading-demo.html` | `/voxvector/loading-demo.html` | technical/demo page |
| Machine sitemap | `voxvector/public/sitemap.xml` | `/voxvector/sitemap.xml` | crawler resource |
| Legacy developer hash compatibility | canonical React router | `#/developer` | compatibility entry, not a second console |
| Crown Labs Bible | `docs/crownlabsbible/` | `/docs/crownlabsbible/docs/viewer.html` | documentation viewer |
| Backend OpenAPI | existing Render FastAPI | `https://voxvector.crownlabs.tech/docs` | backend technical documentation |

## Public navigation repair

PR #993 changes the existing landing/header/footer/menu owners.

Implemented source behavior:

- landing primary CTA is **Request Access** and routes to `/voxvector/login`;
- **See How It Works** updates the URL to `#workflow` and scrolls to that section;
- public header/menu links use `/voxvector/#...` route-qualified anchors so they work from nested routes;
- explicit landing anchors exist for `product`, `workflow`, `technology`, `analysis-interface`, `scientific-discipline`, `use-cases`, and `briefing`;
- hash restoration in `main.jsx` resolves the requested element on direct load, refresh, hash change, pageshow, and popstate rather than indiscriminately forcing page top;
- landing/header/footer destinations use the existing styled `/voxvector/pipeline.html` and `/voxvector/methods.html` surfaces instead of raw repository Markdown where those styled pages exist;
- mobile/public navigation links to the human `/voxvector/site-map` route;
- the XML sitemap includes the human site-map route;
- no replacement landing page, second menu system, or duplicate React application was created.

## Direct-route publication repair

GitHub Pages has no application-owned SPA rewrite.

The canonical production Pages workflow and PR Preview workflow now stage physical route entries for:

- `developer`
- `login`
- `app`
- `site-map`

Each entry copies the same built React `index.html`. These are direct-load aliases of the one canonical React application, not page duplicates.

During synchronization, newer current-main branding/artwork work was preserved:

- canonical `voxvector_wordmark.svg` staging remains intact;
- canonical `voxvector_logo_icon.png` and `voxvector_icon_2_cropped.png` staging remains intact;
- PR #995 desktop/mobile hero assets and staging are preserved;
- current canonical landing CSS remains the owner of hero presentation.

## Pipeline projection defect and repair

Repository documentation and backend source establish the canonical stage dependency order:

- Stage 05: Speech Segmentation
- Stage 06: Speaker Identification / Diarization
- Stage 07: Transcription Generation
- Stage 08: Transcript Alignment

The existing `PipelineBuildCard.jsx` previously carried stale local 05/06 order and queued 07/08 fallback state.

PR #993 repairs that same component:

- canonical 05/06 order and names are used;
- backend `pipeline_build.status_by_stage` is preferred for mutable row state whenever `/health` provides it;
- backend `implemented*` foundation variants are normalized for presentation without turning readiness into execution evidence;
- source-contract row metadata is used only as an explicitly labeled loading/offline fallback;
- Stage 07 and Stage 08 fallback state matches the backend implemented-foundation contract;
- no stage is highlighted as current unless the backend current-stage token actually identifies it;
- the 21-stage owner remains `PipelineBuildCard.jsx`; no duplicate pipeline component or endpoint was introduced.

The styled `pipeline.html` page was corrected to the same Stage 05/06 order.

## Developer Console frontend → backend wiring trace

The Developer Console consumes the existing frontend API client in `voxvector/src/lib/api.js`.

The source trace verified these owner relationships:

```text
DeveloperConsole / workspace UI
        ↓
voxvector/src/lib/api.js
        ↓
https://voxvector.crownlabs.tech
        ↓
VoxVector/api/app.py
        +--> app.include_router(render_router)
        ↓
VoxVector/api/render_api.py for /v1/developer/render/*
        ↓
existing case store / diagnostics / Render bridge / canonical pipeline
```

Client/server source-contract coverage includes:

- `GET /health`;
- case create/list/read/delete;
- source upload;
- signed playback URL;
- source analysis;
- diagnostics errors/events;
- Render status;
- Render logs;
- Render debug bundle;
- protected Render deploy trigger.

The test intentionally distinguishes `app.py` from the mounted `render_api.py` route owner. An early test assumption incorrectly searched for Render decorators in `app.py`; tracing identified the real mounted router owner and the test was corrected instead of changing working backend architecture.

Source-route ownership is software-wiring evidence only. It is not evidence that Render, Supabase, pyannoteAI, faster-whisper, or any other provider executed during this frontend task.

## Focused regression coverage

New focused frontend tests:

- `voxvector/tests/navigation.test.mjs`
- `voxvector/tests/apiContract.test.mjs`
- `voxvector/tests/pipelineBuild.test.mjs`

They cover:

- Request Access/login destination;
- landing anchor presence and route-qualified navigation;
- styled Pipeline/Methods destinations;
- human site-map route and inventory;
- hash restoration contract;
- physical Pages/Preview route entries;
- styled pipeline 05/06 order;
- frontend API route ownership mapping;
- canonical API base and bearer-auth boundary;
- Developer Console `status_by_stage` preference;
- Stage 07/08 fallback semantics;
- explicit loading/unavailable fallback state;
- prevention of a false Stage 01 current marker.

## QA evidence before final synchronization

A prior PR #993 checkpoint at head `7b69bad58d1e2e79b7ab1b2d63fcfe7ffec267fa` produced:

- VoxVector QA `34584824088`: success;
- `pytest -q`: 230 passed;
- frontend `npm test`: 37 passed, 0 failed;
- Vite production build: success, 2,335 modules transformed;
- PR Preview `34584824024`: success.

The branch changed after that run to synchronize active documentation and preserve newer current-main canonical hero/publication work. Therefore those results are historical branch evidence only. Fresh exact-head QA and Preview are required after this audit commit and any final main synchronization.

## Documentation synchronization

Affected current/canonical documentation and Crown mirrors were synchronized to stop claiming the frontend pipeline projection was still stale on the PR candidate and to separate historical runtime evidence from current source state.

Updated current docs include:

- `VoxVector/docs/ANALYSIS_PIPELINE.md`
- `VoxVector/docs/ARCHITECTURE.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/QA_STATUS.md`

Updated Crown mirrors include:

- `docs/crownlabsbible/04-product-dossiers/VoxVector/analysis-pipeline.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/architecture.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/current-engineering-state-2026-09-04.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/pipeline-build-status.md`

Historical dated checkpoints/audits were not rewritten.

## Evidence and acceptance still unresolved

Before PR #993 can be represented as production/browser verified:

1. reconcile against the latest `main` if `main` advances again;
2. run exact-head VoxVector QA;
3. run exact-head PR Preview and verify the built direct-route entries/assets;
4. inspect the final PR diff and review state;
5. after authorized merge, verify exact merged-revision QA and Pages publication separately;
6. perform desktop/mobile browser acceptance for CTA, anchors, drawer reachability, site-map navigation, protected direct-route loads and Developer Console presentation.

No Render backend deployment is required merely to merge these frontend changes unless backend source/configuration also changes. A Pages publication is still not desktop/mobile browser verification.

## Scientific boundary

This work changes frontend navigation, route publication, source-contract tests and frontend status projection. It does not validate deception detection, calibrate inference, prove provider execution, or establish scientific performance.
