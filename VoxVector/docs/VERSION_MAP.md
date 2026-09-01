# VoxVector Version Map

**State date:** 2026-09-01

| Area | Version / reference | Status |
|---|---:|---|
| Backend runtime | 0.2.26 | active |
| Public React application | 0.2.36 | active |
| Result schema | 0.3 | active engine schema; composed case result remains under integration |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.2 | integrated |
| Temporal observation integration | 0.2 | integrated |
| Voice quality HNR | 0.1 | integrated / observational |
| Prosodic dynamics | 0.1 | integrated / observational |
| Spectral dynamics / rolloff | 0.1 | integrated / observational |
| Formant frame tracking | 0.1 | integrated / observational |
| Speech segmentation | 0.1 | integrated / observational |
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
| CI QA workflow | 0.2 | current `main` run 33500649854 passed |
| Research method expansion | 0.2 | active preserved backlog |
| Capability status map | 0.1 | active |
| Roadmap | 0.1 | active |
| Deception classifier | not assigned | planned / not validated |
| Speaker diarization | not assigned | planned / queued |
| Production transcription | not assigned | planned / queued |
| Transcript alignment | not assigned | planned / queued |
| Learned speech representations | not assigned | planned |
| D Series validated inference | not assigned | not active |

## Canonical locations

VoxVector backend and analysis: `VoxVector/`

Public React application: `voxvector/`

Historical systems remain historical source material and are not alternate active implementations.

## Primary pipeline integration

`VoxVectorPipeline` currently orchestrates acoustic summaries, F0 and intensity dynamics, HNR, spectral flux and rolloff, formant tracking, pause topology, MFCC observations, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

The product pipeline additionally defines speaker processing, transcription, alignment, evidence synthesis, classification, validation, reporting, and audit stages.

## Frontend authority

Current frontend package authority is `voxvector/package.json`. The active stack is React 19.2.8, React DOM 19.2.8, Recharts 3.10.1, Motion for React, TanStack Query, Lucide React, Tailwind CSS, Base UI, and application-owned shadcn-style composition.

Historical React 18 / Tremor documentation is retained only as historical context.

## Deployment boundary

GitHub Pages is the only supported public frontend host.

Render is the canonical backend host.

Supabase is the operational/authentication/persistence/diagnostic/private-media service layer.

Vercel is retired and prohibited for VoxVector.

## Current QA evidence

GitHub Actions workflow `VoxVector QA` run `33500649854` on commit `f2b31243c07fc466892693d2ff6aaf8038e413cc` passed. The successful job ran API tests, React dependency installation, and the React production build. Historical failed QA records remain historical evidence and are not current status.

## Scientific boundary

All implemented analysis remains observational until the defined validation program promotes a method for a specific task. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain distinct.

## Documentation synchronization

The current cross-document synchronization record is `docs/DOCS_ALIGNMENT_2026-09-01.md`.

Historical alignment records remain available for traceability.
