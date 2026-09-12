# VoxVector System State Report

**Living engineering status**

## Authority

- Repository: `darenprince/darenprince-author`
- Canonical branch: `main`
- Backend root: `VoxVector/`
- Frontend root: `voxvector/`
- Backend release authority: **0.2.27** from `VoxVector/pyproject.toml`
- Frontend release authority: **0.2.37** from `voxvector/package.json`
- Reconciliation baseline before this documentation pass: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- Exact-baseline VoxVector QA: run `34679916767`, **success**

This file is a living summary. Dated audits and incident records remain historical evidence and are not rewritten merely because the project advances.

## Executive state

VoxVector is a working case-centered vocal and audio intelligence platform with a canonical 21-stage engineering contract, a React public/authenticated application, FastAPI backend, Supabase authentication/persistence/diagnostics/private storage, cloud speech-provider integrations, and operational Developer Console surfaces.

The system is not yet represented as a completed engineering MVP or a scientifically validated deception classifier. The final release path still depends on controlled provider/runtime proof, persisted speaker/alignment evidence, historical case rehydration, intake reliability, production observability acceptance, authenticated browser acceptance, and two complete same-revision golden cases.

## Current repository state

The 2026-09-12 baseline `66f2ea...` includes:

- merged public navigation, Request Access, human site-map, hash restoration and route-wiring repair from PR #993;
- merged frontend pipeline projection correction using canonical Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- merged landing cascade cleanup from PR #997 so obsolete public CSS no longer darkens the canonical hero artwork;
- current source support for one-shot login-time API wake through `AuthGate.jsx` and `wakeApi()`;
- current shared self-profile implementation across user, developer and admin account roles;
- existing 21-stage backend, durable case spine, source persistence, diagnostics, runtime provenance, memory-admission and reporting foundations.

There were no open pull requests at the reconciliation baseline. Open GitHub issues therefore represent remaining acceptance/runtime/browser work, not active PR state.

## Current operational evidence from Supabase

Connected Supabase inspection during this pass established:

- project `VoxVector` (`tawtkawmjqabydnatavx`) is `ACTIVE_HEALTHY` on PostgreSQL 17.6;
- operational public tables use RLS;
- five project migrations are recorded through `developer_profile_avatar_storage` on 2026-09-05;
- `voxvector-user-admin` is ACTIVE, version 2, with JWT verification enabled;
- the last 24 hours contained 1,393 API request records, 1 recorded 5xx response and 271 recorded 4xx responses;
- two open error records existed in the same window, with the latest at 2026-09-12 07:30 UTC;
- sampled current request logs are tagged with source revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`;
- sampled request rows still report `pipeline_version=unknown`, so runtime package version must not be fabricated from those rows;
- private storage currently contains 6,405 `voxvector-logs` objects and 28 `voxvector-media` objects, with approximately 407.97 MB of VoxVector media represented by storage metadata.

This proves active diagnostics/persistence and source attribution. It does not substitute for a fresh `/health` payload, provider execution, or browser verification.

## Supabase advisory state

The current security advisor reports two warnings that remain open engineering hardening work:

1. `public.developer_dashboard_summary()` uses SECURITY DEFINER and is callable by authenticated users; its privilege boundary should be intentionally reviewed and narrowed or converted if appropriate.
2. Supabase leaked-password protection is disabled.

The performance advisor also reports unindexed foreign keys, RLS policies that reevaluate auth functions per row, and unused indexes on `error_reports`. These are hardening/performance tasks, not evidence that the current application is failing.

## Current speech/provider state

- **Transcription:** faster-whisper is the canonical configured transcription adapter. Historical controlled beam-1 execution completed successfully on one older production run. Current same-revision controlled repeatability and post-provider Stage 10 behavior remain owned by #941.
- **Diarization:** pyannoteAI cloud is the canonical primary provider path. The adapter/invocation architecture is wired; real current cloud execution and persisted speaker evidence remain #970.
- **Local Hugging Face fallback:** local pyannote Community-1 remains optional fallback infrastructure, not the constrained cloud-primary default.
- **Hugging Face account:** the connected account authenticates as `crownlabs-voxvector`. During this pass, Hub model/Space discovery calls returned connector-level not-found errors, so no model or Space inventory is claimed from that source.
- **Alignment:** transcript/audio/speaker alignment foundation exists; current persisted multimodal proof remains #971.

## 21-stage engineering status

Canonical order:

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

Current maturity remains approximately 16 implemented analytical/runtime foundations, four conditional or intentionally not-invoked stages, and one speaker-provider path whose current real cloud execution/persistence still requires proof. This count is engineering maturity, not a count of scientifically validated deception indicators.

## Developer Console and status surfaces

The Developer Console currently owns live health, case workflow, analysis workspace, pipeline projection, diagnostics, GitHub QA evidence, deployment/runtime information, documentation navigation and engineering status.

Truth rules:

- the startup pipeline row verifies the presence of the canonical 21-stage backend contract; `COMPLETE` on that row means the contract was received, not that all 21 stages are production complete;
- pipeline maturity should come from backend `pipeline_build` data when available;
- provider configured/readiness is not provider execution;
- source commit is not QA;
- QA is not deployment;
- deployment is not fresh health;
- health is not provider execution;
- provider execution is not artifact durability;
- browser verification is separate from all of the above.

## Authentication and profiles

Current `main` includes the one-shot login-time `/health` wake path in `AuthGate.jsx` and the shared account-profile implementation. Historical PR #974 was closed without merge and is not the current authority; current repository source is authoritative.

Remaining acceptance is authenticated desktop/mobile behavior including role routing/denial, session restoration, login wake observation, sign-out/reset behavior and profile save/reload.

## Public frontend

The merged public frontend now has:

- Request Access routed to the canonical login;
- functional route-qualified landing anchors;
- restored hash/deep-link behavior;
- a human site map;
- styled Pipeline and Analysis Methods routes where those pages exist;
- corrected Stage 05/06 presentation;
- canonical hero artwork without the obsolete darkening cascade.

Final desktop/mobile rendered browser acceptance remains a separate gate.

## Active release path

The current defensible sequence is:

1. #941 controlled same-WAV transcription/durability/Stage 10 production proof.
2. #970 real pyannoteAI cloud-primary diarization plus persisted speaker evidence.
3. #971 persisted transcript/audio/speaker alignment.
4. #963 reopen historical cases with protected playback and persisted artifacts/report.
5. #930 bound intermittent authenticated source-upload 400 behavior.
6. #959 complete production dual-copy observability and real Debug Bundle acceptance.
7. Complete authenticated desktop/mobile acceptance for the already-merged auth/profile, pipeline projection, public navigation and hero changes.
8. #972 freeze one exact candidate and pass two complete same-revision/configuration golden cases.
9. Continue scientific validation separately from engineering release proof.

## Documentation authority

Use `CURRENT_ENGINEERING_STATE_2026-09-12.md`, `VERSION_MAP.md`, `QA_STATUS.md`, `PIPELINE_BUILD_STATUS.md`, `ENDPOINT_REGISTRY.md`, `CAPABILITY_STATUS.md` and `MVP_RELEASE_GATE.md` as the current living status set. Earlier dated engineering-state files and audit snapshots are historical evidence.
