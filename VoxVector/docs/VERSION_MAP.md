# VoxVector Version Map

| Area | Version | Status |
|---|---:|---|
| Backend runtime | 0.2.25 | active |
| Public React application | 0.2.35 | active |
| Result schema | 0.2 | active |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.2 | integrated |
| Temporal observation integration | 0.2 | integrated |
| Voice quality HNR | 0.1 | integrated / observational |
| Prosodic dynamics | 0.1 | integrated / observational |
| Spectral dynamics / rolloff | 0.1 | integrated / observational |
| Formant frame tracking | 0.1 | integrated / observational |
| Speaker baseline | 0.1 | optional integrated / observational |
| Response latency | 0.1 | optional integrated / observational |
| Transcript disfluency | 0.1 | optional integrated / observational |
| MFCC / cepstral module | 0.1 | integrated / observational |
| Jitter / shimmer utilities | 0.1 | implemented / outside primary pipeline |
| Reliability gate | 0.1 | implemented / eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented / controlled boundary |
| Final disposition gate | 0.1 | implemented / controlled boundary |
| Validation registry | 0.3 | synchronized with implemented and planned methods |
| Reproducibility / QA | 0.1 | implemented / regression controls |
| CI QA workflow | 0.2 | fresh current run required |
| Research method expansion | 0.2 | active preserved backlog |
| Capability status map | 0.1 | active |
| Roadmap | 0.1 | active |
| Deception classifier | not assigned | planned / not validated |
| Speaker diarization | not assigned | planned |
| Production transcription | not assigned | planned |
| Transcript alignment | not assigned | planned |
| Learned speech representations | not assigned | planned |
| D Series validated inference | not assigned | not active |

## Canonical location

VoxVector is maintained under `VoxVector/` in `darenprince-author`.

The public React application is maintained under `voxvector/`.

Historical systems remain historical source material and are not alternate active implementations.

## Primary pipeline integration

`VoxVectorPipeline` currently orchestrates acoustic summaries F0 and intensity dynamics HNR spectral flux and rolloff formant tracking pause topology optional within speaker baselines optional response latency optional transcript disfluency and MFCC observations.

The product pipeline also defines the future speaker transcription alignment linguistic evidence synthesis classification validation reporting and audit stages.

## Public frontend

The canonical React workspace is `voxvector/`.

The current public application version is `0.2.35`.

It uses React Tailwind CSS Tremor React Motion for React TanStack Query Lucide React application owned shadcn style composition and Base UI primitives.

## Deployment boundary

GitHub Pages is the canonical public frontend host.

Render is the canonical backend host.

Vercel is retired and is not part of the frontend dependency graph source configuration or deployment workflow.

## QA boundary

The repository contains historical evidence of both failed and repaired QA stages.

The documented failed run must remain historical evidence.

A fresh current workflow run is required before the current main commit is recorded as green.

## Product pipeline boundary

The canonical product workflow is the 21 stage pipeline defined in `docs/ANALYSIS_PIPELINE.md`.

The connected MVP sequence is defined in `docs/MVP_BUILD_PLAN.md`.

The Developer Console exposes that sequence as an engineering task board.

## Scientific boundary

All implemented analysis remains observational until the defined validation program promotes a method for a specific task.

Eligibility and reliability evidence analysis candidate classification and final disposition remain separate stages.

## Documentation synchronization

The current cross document synchronization record is `docs/DOCS_ALIGNMENT_2026-08-20.md`.
