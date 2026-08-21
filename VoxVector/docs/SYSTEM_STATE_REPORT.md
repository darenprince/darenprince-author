# VoxVector System State Report

**State date:** 2026-08-20
**Repository:** `darenprince/darenprince-author`
**Backend root:** `VoxVector/`
**Frontend root:** `voxvector/`
**Backend software version:** `0.2.25`
**Frontend version:** `0.2.35`

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

## Canonical pipeline

The product pipeline contains 21 stages from File Upload / Ingest through Audit and Provenance Output.

The canonical definition is `docs/ANALYSIS_PIPELINE.md`.

## Current implementation state

### Repository and deployment boundary

- `VoxVector/` is the canonical backend and analysis root.
- `voxvector/` is the canonical public React application.
- `VoxVector/api/app.py` is the HTTP adapter.
- `VoxVector/src/voxvector/` is the canonical analysis engine.
- GitHub Pages hosts the public React application.
- Render hosts the backend.
- Supabase provides authentication persistence and durable diagnostics.
- Vercel is retired.

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

The Developer Console exposes this path through the MVP task board.

## QA state

The documented GitHub Actions run `32212539187` failed on commit `b66551897170b035dd8b2ca7c3d843d18124d00f` with 72 passed and 11 failed.

Later repository work repaired the documented dependency and test issues.

A fresh workflow run on the current main commit is still required before the current state is recorded as green.

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

The active canonical documentation set was reviewed and synchronized against the reference experience and MVP dependency chain.

The cross document record is `docs/DOCS_ALIGNMENT_2026-08-20.md`.

The decision record is `docs/PROJECT_DECISION_2026-08-20_REFERENCE_MVP_ALIGNMENT.md`.
