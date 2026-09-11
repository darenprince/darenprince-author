# VoxVector Current Engineering State — 2026-09-04

**State refresh:** 2026-09-11

This Crown Labs Bible page mirrors the canonical current-state owner at `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`. The technical repository document remains authoritative.

## Current source boundary

- repository: `darenprince/darenprince-author`
- frontend: `voxvector/`
- backend: `VoxVector/`
- current `main` observed during PR #993 synchronization: `0e051293e8071afcf5a243c9a81f76ab1144b7c6`
- backend source release: `0.2.27`
- frontend source release: `0.2.37`
- production frontend: `https://darenprince.com/voxvector/`
- production API: `https://voxvector.crownlabs.tech`
- Render Blueprint/runtime-profile reconciliation: #964 complete
- controlled Stage-10/durability proof: #941 open
- cloud diarization execution/persistence: #970 open
- persisted multimodal alignment: #971 open
- historical-case rehydration: #963 open
- public navigation + frontend pipeline projection: #932/#965 through PR #993 candidate source
- final frozen-candidate two-run gate: #972 open

Source, software QA, Pages publication, Render deployment, runtime readback, provider execution, durable artifact persistence, browser verification, engineering-MVP completion and scientific validation remain separate states.

## PR #993 frontend state

PR #993 changes existing canonical frontend owners rather than creating replacements.

The candidate source:

- routes **Request Access** to the canonical login;
- makes landing/menu/footer anchors route-safe from nested pages;
- preserves direct hash load/refresh/history restoration;
- uses existing styled Pipeline and Analysis Methods pages where those references exist;
- adds `/voxvector/site-map` through the existing React public shell;
- stages direct Pages/Preview entries for `developer`, `login`, `app` and `site-map`, all serving the same React build;
- preserves the canonical SVG wordmark and the current desktop/mobile hero assets;
- corrects the existing Developer Console pipeline projection to Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization;
- prefers backend `pipeline_build.status_by_stage` for mutable stage state and labels loading/offline fallback explicitly;
- adds source-level frontend/API route ownership coverage without duplicating backend behavior.

A prior candidate checkpoint at `7b69bad58d1e2e79b7ab1b2d63fcfe7ffec267fa` passed 230 backend tests, 37 frontend tests, Vite production build and PR Preview. The branch changed afterward, so fresh exact-head QA is still required before merge recommendation.

## Backend/runtime evidence boundary

The latest separately verified backend deployment/readiness record retained in canonical QA documentation is Render deployment `dep-dahnv7p42hec739o7phg`, `live`, on exact source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`. A fresh `/health` readback for that revision reported runtime self-test passed and the constrained transcription/diarization readiness profile.

That evidence is not silently promoted to later GitHub `main` revisions. Readiness is not provider execution.

Historical controlled execution on older source `f0dda136...` established real faster-whisper beam-1 execution with 58 timestamped transcript segments and 246 timestamped words before the confirmed downstream memory incident. Merged #962/#967 add the intended durability and bounded Stage-10 source behavior; reopened #941 remains the controlled production proof gate.

## Current pipeline contract

The canonical Stage 05/06 dependency order is:

5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment

PR #993 now matches that contract in the existing `PipelineBuildCard.jsx`. It does not claim provider execution, browser verification or scientific validation.

## Authentication/account boundary

Current `AuthGate.jsx` starts one non-blocking API wake after successful password login before trusted-role routing settles. Current repository source, not closed historical candidate PRs, is the authority.

Trusted role/permission metadata remains separate from editable profile metadata. A wake request is connectivity/readiness behavior only.

## Scientific boundary

VoxVector remains evidence-first. No individual vocal or behavioral feature is treated as proof of deception. Software implementation, operational execution and scientific validation remain distinct.
