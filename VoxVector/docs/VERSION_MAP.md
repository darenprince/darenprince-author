# VoxVector Version Map

| Area | Version | Status |
|---|---:|---|
| Repository rebuild | 0.2.24 | active |
| Public React application | 0.2.35 | active |
| Result schema | 0.2 | active |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.2 | integrated |
| Temporal observation integration | 0.2 | integrated for pause topology and timing inputs |
| Voice quality HNR | 0.1 | integrated / observational |
| Prosodic dynamics | 0.1 | integrated / observational |
| Spectral dynamics / rolloff | 0.1 | integrated / observational |
| Formant frame tracking | 0.1 | integrated / observational |
| Speaker baseline | 0.1 | optional integrated / observational |
| Response latency | 0.1 | optional integrated / observational |
| Transcript disfluency | 0.1 | optional integrated / observational |
| MFCC / cepstral module | 0.1 | implemented / observational |
| Jitter / shimmer utilities | 0.1 | implemented / not primary pipeline integrated |
| Reliability gate | 0.1 | implemented / eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented / indeterminate only |
| Final disposition gate | 0.1 | implemented / guarded |
| Validation registry | 0.3 | synchronized with implemented and planned methods / fail closed |
| Reproducibility / QA | 0.1 | implemented / regression controls |
| CI QA workflow | 0.2 | verified on frontend 0.2.35: 91 backend tests passed and React production build passed |
| Research method expansion | 0.2 | active preserved backlog |
| Capability status map | 0.1 | active |
| Roadmap | 0.1 | active |
| Deception classifier | not assigned | not validated / not active |
| Speaker diarization | not assigned | planned |
| Learned speech representations | not assigned | planned |
| D Series validated inference | not assigned | not active |

## Canonical location

VoxVector is maintained under `VoxVector/` in `darenprince-author`. Historical systems remain historical source material for traceability and are not alternate active implementations.

## Primary pipeline integration

`VoxVectorPipeline` currently orchestrates acoustic summaries, F0 and intensity dynamics, HNR, spectral flux and rolloff, formant tracking, pause topology, optional within speaker baselines, optional response latency, and optional transcript disfluency observations. MFCC and cepstral processing is implemented and the current product documentation treats it as an observational capability. Several lower level utilities remain outside the primary pipeline output contract.

## Public frontend

The canonical React workspace is `voxvector/`. The current public application version is `0.2.35`. It uses React, Tailwind CSS, Tremor React, Motion for React, TanStack Query, Lucide React, application owned shadcn style composition, Base UI primitives and shared Card, Sheet and ThemeToggle components. The landing page uses direct Tremor analytical components and the supplied Shadcnblocks and luxury dashboard references as visual direction. The current landing metrics and signal visualizations are illustrative interface content, not production telemetry.

## Deployment boundary

GitHub Pages is the canonical public frontend host. Render is the canonical VoxVector backend host. Vercel is retired and is not part of the frontend dependency graph, source configuration or GitHub Actions deployment workflow.

If a Vercel status check remains visible in GitHub after source cleanup, it is an external repository or account integration and must be removed at that integration layer. It must not be recreated in VoxVector source code.

## Current landing visual direction

The public visual system is based on the supplied Shadcnblocks neutral reference and the supplied luxury reference. Light mode uses white, near black and quiet gray. Dark mode uses near black and white. Coffee, copper and tan accents are restrained and localized to actions and selected signal details. Strokes are thin and low contrast except for focused controls and buttons. Gradients are subtle environmental lighting rather than decorative card fills.

## QA boundary

The VoxVector QA workflow was executed on a verification pull request against the current frontend. The backend suite completed with `91 passed in 0.54s`, normal `npm install` completed with zero vulnerabilities, and the React production build completed successfully after adding the missing `@vitejs/plugin-react` frontend dev dependency. This establishes successful execution of the current software build and test workflow, not scientific validation.

## Scientific boundary

All implemented analysis remains observational. A measured feature is not a deception label. Eligibility and reliability, evidence analysis, candidate classification, and final disposition remain separate stages.
