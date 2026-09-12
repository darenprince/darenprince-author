# VoxVector UI Application Architecture

## Status

Approved and in active implementation.

The React application under `voxvector/` is the canonical public and authenticated frontend. It is the interface layer for the FastAPI/backend case architecture and must consume real backend state rather than maintaining a competing product-state model.

## Current version and source ownership

- frontend release authority: `voxvector/package.json` → **0.2.38**
- frontend lockfile root: `voxvector/package-lock.json` → **0.2.38**
- frontend root: `voxvector/`
- backend/API root: `VoxVector/`
- backend release: **0.2.27**
- current engineering state: `CURRENT_ENGINEERING_STATE_2026-09-12.md`

Frontend and backend versions remain independent.

## Route ownership

Current public/account routes include:

- `/voxvector/` — public landing
- `/voxvector/login/` — canonical login/account entry
- `/voxvector/app/` — protected approved-user workspace
- `/voxvector/developer/` — protected Developer Console entry
- `/voxvector/site-map/` — public human-readable route inventory
- `/voxvector/pipeline.html` — styled pipeline reference
- `/voxvector/methods.html` — styled analysis-methods reference

The shared public shell owns navigation. Route-qualified landing anchors must work from nested pages, direct hash loads, refresh and browser history.

## Authentication and account routing

`AuthGate.jsx` is the canonical browser authentication owner.

Current source behavior:

1. restores/observes the Supabase session;
2. handles explicit email/password login and password reset;
3. reads trusted role/permission data from server-controlled account metadata;
4. starts one non-blocking canonical API `/health` wake after a successful explicit password login;
5. routes developer/admin accounts to the Developer Console path and approved users to the user workspace;
6. prevents user-editable profile metadata from becoming authorization authority.

The login wake is a user-driven wake attempt, not proof that the backend is ready. Session restore/token observation/sign-out must not become hidden keep-alive traffic.

## Self-profile ownership

One canonical profile implementation supports user, developer and admin self-profile presentation.

It uses the existing `public.profiles` record and private avatar storage boundary. Display name/avatar are presentation fields. Email, trusted role, permissions and account identity remain controlled/read-only according to the authorization model.

Admin User Management remains a separate privileged surface for managing other accounts.

## Public frontend state

Merged current source includes:

- Request Access → canonical login;
- route-safe landing anchors;
- human site map;
- styled Pipeline and Analysis Methods destinations;
- restored direct hash/back-forward section navigation;
- canonical hero artwork without the retired legacy darkening cascade.

These are current source behaviors. They are not an unmerged PR candidate.

## Developer Dashboard ownership

`voxvector/src/components/DeveloperConsole.jsx` is the actual Developer Overview owner. Frontend 0.2.38 updates that existing component directly rather than adding a second dashboard/status layer.

The Developer Overview now:

- derives frontend version from `voxvector/package.json`;
- derives API/backend identity from live `/health`;
- recognizes the accepted September 12 controlled transcription proof only when live backend revision matches the proven deployed revision;
- shows **PROVEN** for that matched transcription state;
- makes **#970 diarization** the next engineering move;
- presents `pipeline_build.implemented_foundations` as source maturity, not all-stage completion;
- no longer presents the old 71% / 20-of-28 checklist state as release readiness.

The separate `DeveloperEngineeringStatus.jsx` toolbar and the Dashboard share the same evidence rule: configuration/readiness is not provider execution, and provider execution is not scientific validation.

## Case Workbench upload ownership

`CaseWorkbench` inside `DeveloperConsole.jsx` remains the canonical Developer Console upload owner.

Frontend 0.2.38 repairs the file picker by explicitly passing and destructuring `setProgress`. The picker can now reset upload progress through the normal React state path when a user selects a file. The existing direct DOM file-input read remains only as defensive fallback in `handleUpload()`; it is not a second upload implementation.

A focused source-contract regression test guards this prop wiring and the Dashboard proof wording.

## Analysis Workspace

The Analysis Workspace is the canonical connected case surface. It consumes persisted case/source/run state and is designed around one audio time axis.

Primary information families include:

- source metadata and provenance;
- protected playback;
- waveform/playhead;
- pipeline state;
- speech/speaker regions;
- transcript/alignment;
- analytical tracks;
- evidence markers/timeline;
- guarded assessment/report state.

Historical case reopen should reconstruct the workspace from persisted source/run artifacts instead of requiring a re-upload. #963 remains the acceptance owner for that complete behavior.

## Canonical 21-stage presentation

Living UI must use this order:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

The old UI order that placed diarization at 05 and speech segmentation at 06 is stale.

## Pipeline status projection

`PipelineBuildCard.jsx` remains the single Developer Console pipeline-status owner.

Current behavior:

- prefers backend `pipeline_build.status_by_stage` for mutable state;
- uses static source metadata only as a contract-matching fallback;
- labels loading/offline fallback explicitly;
- keeps provider readiness separate from execution;
- does not create a duplicate pipeline implementation.

The startup controller's pipeline step is **Pipeline contract**. A completed startup step means the backend reported the canonical 21-stage contract. The separately displayed foundations count communicates engineering maturity.

## Developer Console

The Developer Console provides:

- API health/version/source evidence;
- case workflow and Analysis Workspace;
- pipeline projection;
- diagnostics/errors/lifecycle evidence;
- GitHub QA evidence;
- protected Render status/log/debug actions through backend routes;
- documentation/status navigation;
- role/permission-gated account functions.

Current status surfaces must preserve the evidence chain:

`source → QA → deployment → health → provider execution → persistence → browser acceptance`

No earlier state is presented as proof of a later one.

## Styling and iconography

The application uses React/Vite, Tailwind CSS, application-owned composition/Base UI primitives, Motion for React, TanStack Query and application-owned analytical SVGs.

Streamline Sharp is the canonical shared product-chrome icon family through `SharpIcon.jsx`. Existing specialist components can retain other icon primitives until intentionally migrated.

Do not create patch/override/new/final duplicate UI owners when the canonical component/style owner can be edited directly.

## Responsive and accessibility requirements

Completion requires:

- keyboard/focus behavior;
- large-text tolerance;
- reduced-motion handling;
- mobile/safe-area behavior;
- accessible navigation/drawer behavior;
- status meaning conveyed by text/state rather than color alone;
- no unreachable content beneath fixed account/navigation chrome.

CI/build success is not desktop/mobile browser acceptance.

## Evidence boundary

Frontend source can accurately present engineering state, but it cannot convert readiness into provider execution or engineering success into scientifically validated deception inference.
