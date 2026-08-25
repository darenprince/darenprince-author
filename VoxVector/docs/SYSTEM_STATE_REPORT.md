# VoxVector System State Report

**State date:** 2026-08-25
**Repository:** `darenprince/darenprince-author`
**Backend root:** `VoxVector/`
**Frontend root:** `voxvector/`
**Backend software version:** `0.2.25`
**Frontend version:** `0.2.36`

## Executive summary

VoxVector is a functional vocal and audio analysis foundation being developed into a complete deception analysis product.

The repository now uses a case centered product architecture with a canonical 21 stage pipeline and a dependency ordered MVP build plan.

The most important invariant remains the separation of:

1. eligibility and reliability controls
2. evidence collection and analysis
3. candidate classification
4. final classification or disposition

## Product experience target

The supplied reference screens define the target Analysis Workspace.

The target connects:

- recording intake
- source metadata
- audio playback
- waveform
- spectral view
- analytical tracks
- speaker regions
- transcript
- flagged moments
- evidence timeline
- evidence synthesis
- assessment
- reports
- history

## Current implementation state

### Repository and deployment boundary

- `VoxVector/` is the canonical backend and analysis root.
- `voxvector/` is the canonical public React application.
- `VoxVector/api/app.py` is the HTTP adapter.
- `VoxVector/src/voxvector/` is the canonical analysis engine.
- GitHub Pages hosts the public React application.
- Render hosts the backend.
- Supabase provides authentication persistence and durable diagnostics and is now the durable media backend for the case intake slice.
- Vercel is retired.

### Frontend boot reliability

The public application now uses a **static boot preloader in `voxvector/index.html`**, rather than placing the initial preloader inside the React render tree.

This boundary is intentional. The preloader must be able to render before React executes and must not depend on React, Supabase, TanStack Query, or any application component successfully mounting. The previous React `LoadingScreen` could only appear after the React render tree mounted, while its opaque full viewport surface could also present as a black screen during startup. The 2026-08-25 overlay removal corrected the blocking symptom but removed the intended product preloader, so the preloader has now been restored at the correct boot boundary.

The static preloader uses the canonical staged VoxVector icon asset, releases after the React application has rendered and two browser frames have painted, and has a 3.5 second fail-safe that releases it even when application startup fails. The Developer Console route bypasses the preloader immediately.

The preserved `LoadingScreen.jsx` component remains corrected for the canonical asset path, but the public boot experience is intentionally owned by the static HTML boundary.

### Case spine and intake

The backend now contains a durable case first workflow with authenticated ownership:

- case creation
- case listing
- case retrieval
- source asset creation
- source metadata
- SHA-256 provenance
- private WAV media storage
- signed playback URLs
- case bound analysis runs
- persisted 21 stage state records

The frontend API client now exposes the case contracts for the Developer Console and Analysis Workspace integration.

### Current analysis pipeline

The current `VoxVectorPipeline` integrates:

- RMS and intensity
- zero crossing rate
- spectral centroid and spread
- fundamental frequency
- harmonicity and HNR
- F0 and intensity dynamics
- spectral flux and rolloff
- MFCC observations
- formant candidate tracking
- pause topology
- optional within speaker baseline deviations
- optional response latency
- optional transcript disfluency observations

Speaker diarization production ASR and transcript alignment remain product integration priorities.

### Evidence and classification

Observation records preserve method ID feature value unit segment quality and provenance.

Evidence grouping remains structured and traceable.

Candidate classification remains a controlled boundary until the validation architecture enables a validated inferential configuration.

## MVP execution state

The fastest connected path is:

1. case identity
2. intake and provenance
3. playback and waveform
4. real pipeline lifecycle
5. speaker processing
6. transcription
7. alignment
8. analytical tracks
9. evidence normalization
10. evidence synthesis
11. assessment
12. report
13. history and reopen
14. browser verification
15. production hardening

### Current checkpoint

The case identity and backend intake foundation are implemented in code. The immediate next task is wiring the Developer Console to create a case upload a source obtain signed playback access and invoke the case bound analysis endpoint. The next Analysis Workspace task is the shared audio playback and waveform contract.

## QA state

A fresh workflow run on the current main commit is still required before the current state is recorded as green.

Automated case-store ownership and persistence tests have been added for the new case foundation.

The healthy preloader change requires production-like frontend build verification and desktop/mobile browser verification before it is considered complete.

## Scientific validation state

Scientific validation remains a separate program.

The validation architecture requires:

- frozen operational definitions
- defined task and population
- speaker disjoint evaluation
- cross dataset evaluation
- recording condition stress testing
- identity sensitivity analysis
- calibration
- uncertainty analysis
- leakage controls
- robustness analysis
- external replication where feasible

## Documentation state

The active canonical documentation set was reviewed and synchronized against the reference experience, current product positioning, analytical method library, API surface, and MVP dependency chain.

The implementation checkpoint is recorded in:

- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/CAPABILITY_STATUS.md`

The active cross document record is `docs/DOCS_ALIGNMENT_2026-08-24.md`.

The preloader incident and architectural correction are recorded in `docs/PROJECT_CHECKPOINT_2026-08-25_PRELOADER.md`.

The decision record is `docs/PROJECT_DECISION_2026-08-20_REFERENCE_MVP_ALIGNMENT.md`.
