# VoxVector Current Engineering State — 2026-09-04

## Canonical current-state role

This file remains the canonical current engineering-state owner despite its historical filename. Dated audits/checkpoints remain preserved separately and are not rewritten to make old evidence appear current.

**State refresh:** 2026-09-11

- Repository: `darenprince/darenprince-author`
- Canonical branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Current `main` observed during PR #993 synchronization: `0e051293e8071afcf5a243c9a81f76ab1144b7c6`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Production API domain: `https://voxvector.crownlabs.tech`
- Production frontend domain: `https://darenprince.com/voxvector/`
- Render workspace: `tea-da2errdg1s2s73cl4eeg`
- Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- Render production auto-deploy: disabled
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- Maximum sample rate: `48,000 Hz`
- Default maximum media size: `262,144,000 bytes`
- Render Blueprint/runtime dependency reconciliation: #964 **DONE**
- Controlled Stage-10/durability runtime proof: #941 **OPEN**
- Cloud-primary diarization execution/persistence: #970 **OPEN**
- Persisted transcript/audio/speaker alignment: #971 **OPEN**
- Historical-case rehydration: #963 **OPEN**
- Frontend pipeline/public-navigation correction: #965/#932, PR #993 **candidate source**
- Final frozen-candidate two-run proof: #972 **OPEN**

The backend and frontend have separate release numbers. Backend source authority is `VoxVector/pyproject.toml`; frontend source authority is `voxvector/package.json`.

A source revision, workflow result, Pages publication, Render deployment, runtime `/health`, provider execution, durable artifact readback, browser verification and scientific validation are separate evidence classes.

## Current GitHub main versus latest backend deployment evidence

Current GitHub `main` observed in this pass is `0e051293e8071afcf5a243c9a81f76ab1144b7c6`. That revision includes frontend-only hero publication work after the latest backend deployment/readiness evidence recorded below.

The latest separately verified Render backend evidence in the canonical QA record is deployment `dep-dahnv7p42hec739o7phg`, `live`, on exact backend source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`, trigger `deploy_hook`, with production auto-deploy disabled.

A forced-fresh `/health` readback at `2026-09-11T04:31:47.647002Z` returned HTTP 200 from exact deployed source `1cc10f40...` and reported:

- `status=ok`;
- runtime self-test `passed`;
- pipeline/runtime version `0.2.27`;
- 512 MiB memory reference;
- 416 MiB Stage-10 admission ceiling;
- faster-whisper `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process, 165-second timeout, execution-ready;
- cloud-primary `pyannote_api` readiness;
- local fallback disabled/not installed in the constrained Render image.

That is deployment/readiness evidence for `1cc10f40...`. It does not mean later GitHub `main` revisions are deployed to Render, and it does not prove provider execution or successful analysis.

## Public frontend and route ownership

The canonical public application remains one React application under `voxvector/`.

Current source surfaces include:

- `/voxvector/` — public product landing/application shell;
- `/voxvector/login` — canonical account login/trusted-role router;
- `/voxvector/developer` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace;
- `/voxvector/site-map` — PR #993 human-readable site/page inventory using the existing public shell;
- `/voxvector/pipeline.html` — styled analysis-pipeline reference;
- `/voxvector/methods.html` — styled analysis-method/data-point reference;
- `/voxvector/image-index/` — image/visual asset index;
- `/voxvector/loading-demo.html` — loading-state demonstration surface;
- `/voxvector/sitemap.xml` — machine-readable sitemap.

GitHub Pages does not provide an SPA rewrite. PR #993 updates the canonical Pages/Preview workflows so `developer`, `login`, `app` and `site-map` receive physical `index.html` entries that all serve the same React build. These are route aliases, not duplicate applications or pages.

PR #993 also preserves the current canonical SVG wordmark and the current main desktop/mobile hero assets from PR #995.

## Public navigation state — PR #993

The PR #993 candidate repairs the existing shared landing/header/footer owners rather than creating replacements.

Candidate behavior:

- primary CTA is **Request Access** and opens `/voxvector/login`;
- **See How It Works** updates and honors `#workflow`;
- primary/menu anchors are route-qualified so nested pages can return to the intended landing section;
- landing sections have unique anchors for `product`, `workflow`, `technology`, `analysis-interface`, `scientific-discipline`, `use-cases` and `briefing`;
- direct hash load, refresh and browser history restore the requested section instead of forcing page top;
- Pipeline and Analysis Methods links use `/voxvector/pipeline.html` and `/voxvector/methods.html` where those styled pages exist;
- the mobile drawer includes the human `/voxvector/site-map` surface;
- the landing footer uses the same canonical destinations.

This is source behavior until merged/published. Authenticated desktop/mobile visual verification remains a separate acceptance gate under #932/#972.

## Developer Console frontend/backend wiring — PR #993

The Developer Console remains a frontend over existing backend owners. It does not duplicate pipeline or provider behavior.

The frontend API client maps to the canonical backend contract for:

- `GET /health`;
- case create/list/read/delete;
- source upload;
- signed source playback;
- case/source analysis;
- diagnostics events/errors;
- Render status/logs/debug-bundle/deploy through the mounted developer Render router.

The route ownership trace is:

`voxvector/src/lib/api.js → VoxVector/api/app.py + app.include_router(render_router) → VoxVector/api/render_api.py → existing backend/runtime/provider/service boundaries`

PR #993 includes source-level contract tests for that mapping. A matching source route does not prove the provider or external service executed successfully.

## Developer Console pipeline projection — PR #993

The canonical backend order is:

| Stage | Current source contract |
|---:|---|
| 01 | File Upload / Ingest |
| 02 | File Decode and Normalization |
| 03 | Provenance and Integrity |
| 04 | Channel and Recording Assessment |
| 05 | Speech Segmentation |
| 06 | Speaker Identification / Diarization |
| 07 | Transcription Generation |
| 08 | Transcript Alignment |
| 09 | Eligibility and Reliability |
| 10 | Acoustic Feature Extraction |
| 11 | Prosodic and Voice Quality Analysis |
| 12 | Temporal and Pause Analysis |
| 13 | Linguistic and Disfluency Analysis |
| 14 | Question / Answer Alignment |
| 15 | Within Speaker Baseline |
| 16 | Cross Method Evidence Assembly |
| 17 | Evidence Convergence and Conflict |
| 18 | Candidate Classification |
| 19 | Validation and Calibration Gate |
| 20 | Final Classification / Disposition |
| 21 | Audit and Provenance Output |

PR #993 corrects the existing `PipelineBuildCard.jsx` to the Stage 05/06 order above and prefers backend `pipeline_build.status_by_stage` whenever `/health` provides it. Static row metadata is retained only as an explicitly labeled loading/offline contract fallback. Stage 07/08 fallback state now matches the backend implemented-foundation contract, and a stage is marked current only when the backend current-stage token actually identifies it.

No second pipeline endpoint, component, method or analytical implementation was introduced.

## Authentication and account boundary

Current canonical `AuthGate.jsx` starts one non-blocking canonical API wake after successful password login before trusted-role routing settles. Current repository implementation, not closed historical PR #974, is the source authority.

Trusted roles/permissions remain separate from editable profile metadata. A login wake is connectivity/readiness behavior only.

## Historical controlled provider evidence

A controlled 183.3-second run on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established:

1. source upload/private persistence succeeded;
2. Stage 05 Speech Segmentation completed with 26 segments;
3. faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
4. transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
5. transcript alignment state was reached;
6. the API later entered the constrained-memory danger zone and restarted during the downstream transition;
7. the owner confirmed the incident was a memory problem;
8. the source WAV remained persisted, while the completed provider artifact had not yet been durably checkpointed before downstream work on that historical revision.

This is real historical provider execution evidence. It is not current end-to-end proof, transcript truthfulness, verified speaker identity, browser verification or scientific validation.

## Runtime containment and durability source

Merged PRs #962/#967 provide:

- no cleanup-time PyTorch import merely to inspect CUDA on the CPU transcription path;
- same-run checkpointing of completed acquisition/transcript/alignment/provider state before Stage 10;
- Stage 10 operational memory admission before running state;
- fail-fast process-wide single-flight admission for the downstream composite analysis;
- RSS recheck while holding the heavyweight lock and lock ownership through composite execution;
- separate Python `process_instance_id` and Render `render_instance_id` provenance;
- stable route-owned `run_id` with pipeline-internal `pipeline_run_id` preserved separately.

Issue #941 remains the controlled production proof gate for those behaviors.

## Software QA boundary for PR #993

A prior PR #993 checkpoint at head `7b69bad58d1e2e79b7ab1b2d63fcfe7ffec267fa` passed:

- VoxVector QA `34584824088`;
- 230 backend tests;
- 37 frontend tests, 0 failed;
- Vite production build;
- PR Preview `34584824024`.

The branch subsequently changed to synchronize documentation and preserve newer `main` hero/publication assets. Therefore that checkpoint is historical branch evidence only. A fresh exact-head QA and PR Preview run is required before merge recommendation.

## Active issue state

- #941 — controlled same-WAV durability/Stage-10 runtime proof.
- #970 — cloud-primary pyannoteAI execution/persistence.
- #971 — persisted transcript/audio/speaker alignment.
- #963 — historical-case artifact rehydration.
- #930 — intermittent authenticated upload 400 reliability boundary.
- #959 — observability/Debug Bundle production acceptance.
- #965 / PR #993 — frontend pipeline projection correction; browser acceptance remains separate.
- #932 / PR #993 — public CTA/anchor/menu/site-map repair; browser acceptance remains separate.
- #964 — **DONE:** sole Render Blueprint/runtime-profile reconciliation and service inventory.
- #972 — final frozen-candidate two-run golden proof.

## Scientific boundary

VoxVector remains an evidence-first research/development system. Implementation, configuration, readiness, execution, software QA, deployment, runtime readback, durable artifact persistence, browser verification, engineering-MVP completion and scientific validation are separate states. No individual vocal or behavioral feature is treated as proof of deception.
