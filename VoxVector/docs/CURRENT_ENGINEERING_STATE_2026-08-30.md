# VoxVector Current Engineering State — 2026-08-30

## Purpose

This is the current engineering synchronization record for the connected VoxVector application. It is intentionally separate from historical checkpoints. The repository remains the technical source of truth.

## Current implementation audit

### Public React application — `voxvector/`

Current connected product surfaces include:

- public landing page
- shared `SiteHeader`
- authenticated Developer Gate
- Developer Console
- Case Workbench
- Analysis Workspace
- audio upload and playback primitives
- local signal and spectrogram visualization components
- methodology and documentation navigation
- MVP build task board
- diagnostic error and event views
- developer profile and sign-out controls

The Developer Console currently uses the canonical case API contracts for case creation, case retrieval, WAV source upload, signed playback, and case-bound analysis. The frontend upload client tracks request identity, progress, timeout, cancellation, and API error detail.

### Backend — `VoxVector/`

The canonical FastAPI adapter currently exposes:

- `/health`
- direct `/v1/analyze`
- authenticated case creation/list/retrieval
- authenticated case-source upload
- secure signed playback
- authenticated case-bound analysis
- diagnostic events and errors

The canonical analysis engine remains under `VoxVector/src/voxvector/` and is invoked by the API adapter rather than duplicated in the frontend.

### Audio intake status

The intended case workflow is:

`create case → select WAV → upload source → persisted source → secure playback → case-bound analysis → Analysis Workspace`

Current intake limits remain WAV-only at the initial runtime boundary and a 250 MB configured media ceiling. The API validates WAV structure and the media adapter persists private media through the existing Supabase storage architecture.

The upload path is instrumented for diagnosis, but a protected authenticated browser session is not available in this environment. Therefore a production end-to-end upload pass must remain explicitly unverified until performed through the deployed application.

## 21-stage pipeline status

The canonical pipeline contains 21 stages. Current engineering status is:

- 14 stages with implemented runtime foundations
- 4 stages conditional or intentionally not invoked without required inputs
- 3 stages queued for deeper integration

The dashboard now exposes the same build matrix through an expandable 21-stage card. The collapsed state identifies the current engineering stage. The expanded state lists all 21 stages and presents their current engineering state with semantic status icons.

This card is a build-status surface only. It does not imply that a stage is scientifically validated or that every stage executes on every recording.

## Current engineering stage

**Upload and intake reliability** remains the immediate dependency because no downstream workflow can be considered healthy if the source cannot be accepted, persisted, retrieved, and played reliably.

Next dependency after intake stabilization:

**Stage telemetry and real stage lifecycle reporting.**

Then:

**Speaker and transcript foundation → evidence workspace → validation and calibration gate.**

## Dashboard requirement

The Developer Console dashboard must expose:

- API/runtime state
- 21-stage build status
- current engineering stage
- next dependency
- QA state
- links to the canonical methodology, pipeline, architecture and MVP records

The 21-stage card must remain synchronized with `VoxVector/docs/PIPELINE_BUILD_STATUS.md` and the backend stage definition contract.

## MVP plan synchronization requirement

Any task or implementation change that affects the connected case workflow must update the relevant MVP plan section and the current dashboard next-step/task representation. The source of truth remains the canonical MVP plan; dashboard wording is an operator-oriented projection of that plan.

For the current work cycle, the MVP task sequence is:

1. stabilize and verify upload/persistence;
2. complete secure browser playback verification;
3. instrument actual per-stage runtime telemetry;
4. build speaker identification/diarization;
5. integrate production transcription;
6. synchronize transcript/audio alignment;
7. expose real analytical tracks;
8. normalize and expose evidence;
9. implement evidence synthesis;
10. build assessment/report surfaces;
11. complete case history/reopen;
12. run reproducible browser-level verification.

## Documentation synchronization map

Runtime or workflow changes must be reconciled across, when applicable:

- `VoxVector/docs/OPERATING_CHARTER.md`
- `VoxVector/docs/PROJECT_DECISION_LOG.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/AI_EDITING_GUARDRAILS.md`
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `VoxVector/docs/ANALYSIS_PIPELINE.md`
- `VoxVector/docs/ARCHITECTURE.md`
- `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `VoxVector/docs/IMPLEMENTATION_PLAN.md`
- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/METHOD_QA_MATRIX.md`
- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- corresponding `docs/crownlabsbible/04-product-dossiers/VoxVector/` mirror records

Documentation updates must describe actual implementation state and must not be used as proof of implementation or scientific validation.

## Editing workflow requirement

Every substantive code change should produce a synchronized engineering record containing:

- what changed
- canonical implementation owner
- affected API/backend path
- current build state
- testing evidence
- unresolved verification
- current engineering stage
- next dependency
- documentation surfaces updated

The Developer Console MVP board is the operator-facing work tracker. It is not a substitute for canonical engineering documentation.

## Archive policy

Superseded synchronization records and historical deployment/design plans may be moved into `VoxVector/docs/archive/` or the corresponding frontend documentation archive after their contents and behavior have been reviewed. Historical context must remain recoverable through the archive or Git history. Active documents must not contain superseded deployment instructions.

The following records were reviewed for redundancy during this pass:

- 2026-08-20 documentation alignment
- free-hosting deployment plan
- 2026-08-19 visual neutral-theme checkpoint

They were moved out of active locations after being explicitly marked historical/superseded.

## Verification boundary

This record reflects repository inspection and source-level synchronization. It does not claim a production browser session, authenticated upload, or scientific validation that was not directly observed.
