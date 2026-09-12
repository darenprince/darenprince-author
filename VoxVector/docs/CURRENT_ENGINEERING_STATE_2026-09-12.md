# VoxVector Current Engineering State — 2026-09-12

## Purpose

This is the current engineering handoff and reconciliation record for VoxVector. It supersedes older files named `CURRENT_ENGINEERING_STATE_*` for current-state decisions while preserving those older records as historical evidence.

## Canonical ownership

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Backend/API/analysis engine: `VoxVector/`
- Public/authenticated React application: `voxvector/`
- Crown Labs executive mirror: `docs/crownlabsbible/04-product-dossiers/VoxVector/`
- Backend source release: **0.2.27**
- Frontend source release: **0.2.37**
- Engineering baseline reconciled before this documentation pass: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- Exact-baseline VoxVector QA run: `34679916767` — **success**

The synchronization commits created after that baseline may make `main` newer without changing the authoritative package versions.

## What is currently real

VoxVector has a working case-centered software foundation with:

- public product landing and reference pages;
- email/password authentication with trusted role routing;
- one-shot login-time API wake behavior;
- protected user and Developer Console surfaces;
- shared self-profile editing for supported roles;
- case creation, private source persistence, signed playback and case-bound analysis routes;
- a canonical 21-stage pipeline contract;
- structured stage/run/provenance persistence;
- faster-whisper transcription integration with historical real provider execution;
- pyannoteAI cloud-primary diarization architecture;
- acoustic, prosodic, voice-quality, temporal, linguistic and evidence-assembly foundations;
- guarded candidate/final disposition architecture;
- Supabase authentication, private storage, diagnostics and operational persistence;
- Developer Console health, pipeline, diagnostics, case workflow and engineering status surfaces;
- GitHub QA and Pages workflows;
- current public navigation, Request Access, human site map and canonical landing artwork.

## What is not yet proven

Do not represent the following as complete:

- current-revision controlled same-WAV Stage 10 proof;
- current cloud-primary pyannoteAI execution with persisted speaker evidence;
- current persisted transcript/audio/speaker alignment proof;
- full historical-case reopen/playback/artifact/report rehydration;
- fully bounded intermittent upload 400 behavior;
- complete production Render + Supabase dual-copy/debug-bundle acceptance;
- complete authenticated desktop/mobile role/profile/navigation/browser matrix;
- two same-revision/configuration complete golden cases;
- scientifically validated general deception classification.

## Canonical stage order

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

Any living UI or documentation that presents Speaker Identification / Diarization as Stage 05 and Speech Segmentation as Stage 06 is stale.

## Current pipeline maturity

The engineering maturity model remains:

- approximately 16 stages with implemented analytical/runtime foundations;
- four stages conditional or intentionally not invoked without required inputs/authorization;
- speaker-provider execution still requiring current cloud-primary proof;
- historical faster-whisper provider execution established, but current controlled repeatability and downstream memory behavior remain open;
- validation/calibration remains a separate scientific program.

## Current frontend state

The merged React source now includes:

- Request Access → canonical login;
- route-safe public anchors;
- restored direct hash/refresh/back-forward section navigation;
- human `/voxvector/site-map` surface;
- styled Pipeline and Analysis Methods destinations;
- corrected pipeline Stage 05/06 order;
- pipeline row state preferring backend `pipeline_build.status_by_stage` where available;
- current canonical hero artwork without obsolete legacy overlay/darkening rules;
- login-time `wakeApi()` call through the canonical API client;
- shared role-aware self-profile implementation.

The remaining frontend gate is real authenticated desktop/mobile acceptance, not another competing source implementation.

## Developer Console truth model

Developer Console status must be evidence-backed.

- `WEB v…` comes from the frontend package manifest.
- `API v…` comes from live `/health`, not a hard-coded React value.
- the startup `Pipeline contract` row verifies that the backend reported the canonical 21-stage contract; it does not mean all 21 stages are complete.
- mutable pipeline maturity comes from backend health data when available.
- offline/fallback state must be visible rather than silently presenting stale success.
- deployment, health, provider execution, persistence and browser acceptance remain different status categories.

## Current Supabase state

Connected inspection on this reconciliation pass:

- project: `VoxVector` / `tawtkawmjqabydnatavx`;
- project health: `ACTIVE_HEALTHY`;
- database: PostgreSQL 17.6;
- RLS enabled on the inspected operational tables;
- migrations present through 2026-09-05;
- `voxvector-user-admin` Edge Function ACTIVE, version 2, JWT verification enabled;
- current private storage: 6,405 log objects and 28 media objects;
- current media metadata total: approximately 407.97 MB;
- last 24 hours: 1,393 API request records, one 5xx response, 271 4xx responses;
- two open error records in the same window;
- current diagnostic request rows carry source revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`.

Current hardening findings include a SECURITY DEFINER dashboard summary RPC accessible to authenticated users, leaked-password protection disabled, several unindexed foreign keys, RLS auth-function reevaluation warnings and unused error-report indexes.

## Provider state

### Transcription

Canonical provider: faster-whisper.

Historical real execution exists for a controlled beam-1 run. The current release gate is to repeat the controlled path on the intended candidate and prove durable upstream checkpointing plus bounded Stage 10 behavior without uncontrolled restart.

### Speaker diarization

Canonical primary provider: pyannoteAI cloud.

Architecture/readiness is not execution. #970 remains responsible for current provider contract confirmation, real execution and persisted speaker evidence.

### Hugging Face

The connected Hugging Face identity is `crownlabs-voxvector`. Hugging Face remains relevant to optional local model/fallback tooling. The current cloud-primary pyannoteAI path is not proven merely by Hugging Face authentication.

During this pass, model/Space discovery actions returned connector-level not-found errors. No unverified Hub inventory is promoted into project documentation.

## Current operational risk queue

### P0

- #941 controlled transcription/durability/Stage 10 production proof
- #970 cloud-primary diarization execution/persistence
- #971 persisted multimodal alignment
- #963 historical case rehydration
- #930 intermittent upload 400 bounding
- #959 production observability/debug-bundle acceptance
- authenticated browser acceptance for merged auth/profile/navigation/pipeline changes
- #972 same-revision two-run golden release gate

### P1/P2

Operator cancellation, secure-deletion receipt/UI completion, notification/storage-monitor work and remaining convenience/visual verification continue behind the core golden path unless they become direct blockers.

## Version policy

Backend **0.2.27** and frontend **0.2.37** are independently versioned. This synchronization aligns every living informational surface to those actual source authorities. It does not fabricate a new release number merely because documentation changed.

## Verification discipline

Keep these states separate:

`source → exact-head QA → publication/deployment → fresh runtime readback → provider execution → durable artifact readback → authenticated browser verification → repeated golden cases → scientific validation`

A later state may use evidence from earlier states. An earlier state must never be documented as proof of a later one.
