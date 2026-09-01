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

## Audio intake status

The intended case workflow is:

`create case → select WAV → upload source → persisted source → secure playback → case-bound analysis → Analysis Workspace`

Current intake limits remain WAV-only at the initial runtime boundary and a 250 MB configured media ceiling. The API validates WAV structure and the media adapter persists private media through the existing Supabase storage architecture.

The upload path is instrumented for diagnosis, but a protected authenticated browser session is not available in this environment. Therefore a production end-to-end upload pass must remain explicitly unverified until performed through the deployed application.

## 21-stage pipeline status

The canonical pipeline contains 21 stages. Current engineering status is:

- 14 stages with implemented runtime foundations
- 4 stages conditional or intentionally not invoked without required inputs
- 3 stages queued for deeper integration

The dashboard requirement is an expandable 21-stage build control. Its collapsed state must show the current engineering stage and next dependency. Its expanded state must list all 21 stages with semantic status icons. It must not infer functionality or scientific validation from source presence alone.

### Engineering status dimensions

The console must keep these dimensions separate:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has executed successfully.
- **TESTED** — an actual automated or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation has been completed and documented.

Conditional, not-invoked, queued, failed, and blocked states remain explicit where applicable.

## Current engineering stage

**Upload and intake reliability** remains the immediate dependency because no downstream workflow can be considered healthy if the source cannot be accepted, persisted, retrieved, and played reliably.

Next dependency after intake stabilization:

**Stage telemetry and real stage lifecycle reporting.**

Then:

**Speaker and transcript foundation → evidence workspace → validation and calibration gate.**

## Dashboard requirements

The Developer Console dashboard must expose:

- **API** state with icon and explicit all-caps status;
- **RUNTIME** state with icon and explicit all-caps status;
- **PIPELINE** state with 21-stage build/execution information;
- **QA** state with current verification information;
- current engineering stage;
- next dependency;
- detailed QA checks rather than a single aggregate number;
- source traceability for material status claims;
- links to canonical methodology, pipeline, architecture, and MVP records;
- copy controls for GitHub paths/commit/workflow references where available.

Primary status labels must distinguish BUILT, FUNCTIONAL, TESTED, and VALIDATED. A successful build must never be presented as proof of functionality or scientific validation.

## Workflow synchronization requirement

State-changing workflows must refresh or invalidate relevant console status data so the dashboard does not retain stale claims. This applies to:

- case creation;
- source selection and upload;
- source persistence;
- secure playback preparation;
- analysis execution;
- pipeline stage transitions;
- diagnostics and error events;
- CI/test results;
- artifact/deployment verification.

Preferred provenance flow:

`SOURCE → COMMIT → WORKFLOW → TEST RESULT → ARTIFACT/DEPLOYMENT → RUNTIME STATUS → CONSOLE`

## MVP plan synchronization requirement

Any task or implementation change that affects the connected case workflow must update the relevant MVP plan section and the current dashboard next-step/task representation. The source of truth remains the canonical MVP plan; dashboard wording is an operator-oriented projection of that plan.

For the current work cycle, the MVP task sequence is:

1. stabilize and verify upload/persistence;
2. complete secure browser playback verification;
3. instrument actual per-stage runtime telemetry;
4. make console build/function/test/validation state explicit and traceable;
5. build speaker identification/diarization;
6. integrate production transcription;
7. synchronize transcript/audio alignment;
8. expose real analytical tracks;
9. normalize and expose evidence;
10. implement evidence synthesis;
11. build assessment/report surfaces;
12. complete case history/reopen;
13. run reproducible browser-level verification.

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
- functional state
- testing evidence
- validation state
- unresolved verification
- current engineering stage
- next dependency
- documentation surfaces updated
- source path / workflow / commit trace where available

The Developer Console MVP board is the operator-facing work tracker. It is not a substitute for canonical engineering documentation.

## Archive policy

Superseded synchronization records and historical deployment/design plans may be moved into `VoxVector/docs/archive/` or the corresponding frontend documentation archive after their contents and behavior have been reviewed. Historical context must remain recoverable through the archive or Git history. Active documents must not contain superseded deployment instructions.

Previously reviewed historical records remain historical; they must not be used as current implementation or QA evidence.

## Verification boundary

This record reflects repository inspection and source-level synchronization. It does not claim a production browser session, authenticated upload, or scientific validation that was not directly observed.


## 2026-08-31 urgent upload incident resolution

**Observed production evidence:** Supabase Storage logs showed the case-source workflow successfully wrote the WAV object to the private `voxvector-media` bucket, then failed while rewriting the owning case JSON in `voxvector-logs`. The failing object write returned HTTP 400 after media persistence, producing an upload failure despite the audio object already existing.

**Root cause:** case JSON persistence used a create-style Storage POST without an upsert header. Updating an existing case after appending source metadata therefore failed as a duplicate/object conflict.

**Fix:** canonical `VoxVector/api/storage.py` now sends `x-upsert: true` for JSON object persistence. Media writes remain private and unchanged. Regression coverage was updated in `VoxVector/tests/test_storage.py`.

**Client hardening:** browser MIME labels are no longer allowed to reject an otherwise selected File before authoritative upload validation, and the multipart request preserves the original selected filename for backend diagnostics.

**Verification boundary:** Supabase production logs verified the pre-fix media write and subsequent case-record failure. The code fix and regression test are committed; successful deployed end-to-end upload still requires the updated backend revision to be running and the browser path to be exercised.


## 2026-09-01 production analysis milestone and observability repair

**Observed production evidence:** A real production case completed the connected workflow from case workflow through source upload, private media persistence, case-bound analysis, and analysis completion. During the successful run, `/health`, `/v1/cases`, and `/v1/cases/{case_id}` returned `200 OK`, and the Render runtime emitted valid `VOXVECTOR_DIAGNOSTIC` records.

**Operational conclusion:** The previous basic upload/analysis blocker is cleared at the production runtime boundary. Case creation, audio upload, private media persistence, PCM WAV intake, and case-bound analysis are now **production working / production executed** based on the observed run. This does not constitute scientific validation.

**Observability finding:** Render logs isolated the remaining Developer Console gap to the relational projection into `public.api_request_logs`: diagnostic duration values retained fractional milliseconds while the existing `duration_ms` schema is integer. Observed values included `9339.07`, `0.26`, `635.3`, and `597.92` ms.

**Repair:** `VoxVector/api/observability.py` now normalizes the relational duration with `_duration_ms_for_projection()` while preserving exact fractional duration in the immutable diagnostic JSON record. Regression coverage in `VoxVector/tests/test_observability.py` covers decimal, string, zero/sub-millisecond, null, and invalid values.

**Current engineering stage:** The primary blocker moves from upload/intake reliability to **post-analysis results and auditability**. The immediate product sequence is:

`Analysis complete → Review Evidence / Analysis Results`

followed by full run and stage telemetry, speaker/transcript foundations, evidence workspace, assessment/reporting, and production hardening.

**Remaining verification:** Deploy the repaired backend revision and confirm real `api_request_logs` and `error_reports` rows appear from traffic, then verify Live Logs and Error Reports in the Developer Console. Browser playback and complete browser-level workflow verification remain separate verification tasks.
