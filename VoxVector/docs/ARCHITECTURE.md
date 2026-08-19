# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a deception detection system based on structured vocal and audio evidence. The architecture deliberately separates the product objective from the current validation state so the system can mature without turning unvalidated observations into unsupported conclusions.

## Canonical runtime boundary

```text
VoxVector application
        |
        +------------------------------+
        |                              |
        v                              v
React application                 FastAPI adapter
planned frontend                  VoxVector/api/app.py
        |                              |
shadcn/ui + Tailwind                  v
Motion + TanStack Query       canonical engine
        |                    VoxVector/src/voxvector/
        +------------------------------+
                       |
                       v
             eligibility / reliability
                       |
                       v
             evidence collection
                  and analysis
                       |
                       v
              evidence grouping /
                  convergence
                       |
                       v
              candidate classification
                       |
                       v
            validated final classification
                  / disposition gate
                       |
                       v
                    Supabase
             Auth / data / diagnostics
```

The FastAPI adapter is an interface/runtime boundary only. It must import and execute the canonical engine. It must never become a second analysis implementation.

The planned React application is a presentation and interaction layer over the canonical API. It must not recreate analysis logic in the browser.

## Application stack decision

The next frontend phase will standardize on a small open-source stack:

- **React** — application runtime
- **shadcn/ui** — application-owned UI components and accessible interface primitives
- **Tailwind CSS** — styling, responsive layout, tokens, and theming
- **Motion for React** — state-driven animation and interaction
- **TanStack Query** — server-state management and API lifecycle handling

This stack is **planned/approved architecture**, not current implementation status. The current repository contains the FastAPI API and analysis engine; the React application shell is the next major frontend build phase.

The infrastructure boundary does not change:

- Render remains the VoxVector API runtime.
- FastAPI remains the canonical HTTP interface.
- Supabase remains the existing persistence/authentication/diagnostics layer.
- `VoxVector/` remains the canonical application root.

See `docs/UI_APPLICATION_ARCHITECTURE.md` for the frontend contract and implementation sequence.

## Analysis stages

1. **Ingest and provenance**: accept supported audio, normalize input representation, record provenance, and identify the analysis run.
2. **Eligibility and reliability**: determine whether the input is technically meaningful. This stage can downgrade or reject an input before substantive analysis.
3. **Evidence collection and analysis**: compute measurable acoustic, temporal, voice-quality, spectral, formant, prosodic, interaction, transcript, and baseline observations as supported by the current pipeline and supplied context.
4. **Evidence grouping and convergence**: organize observations for downstream deception research while preserving feature dependence, conflicts, alternative explanations, and provenance.
5. **Candidate classification**: combine supported evidence into a provisional candidate state. The current implementation remains indeterminate-only.
6. **Final classification or disposition**: apply reliability and scientific validation gates. The architecture is intended to support future validated deception inference; current outputs remain abstention or insufficient evidence.

## Current primary pipeline

`VoxVectorPipeline.analyze()` currently orchestrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux/rolloff, MFCC observations, formant tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

MFCC observations are now part of the primary pipeline and are emitted with their documented provenance and bounded processing behavior. Lower-level research utilities such as additional cepstral summaries, jitter, shimmer, pulse-period, and generic timing utilities remain available according to `docs/CAPABILITY_STATUS.md`.

## Reliability boundary

Reliability is an eligibility control. It is not a probability of deception and must not be merged into a deception score.

## Classification boundary

A measured observation is not a candidate label. Candidate classification must remain capable of returning `indeterminate` and must not bypass validation gates.

## Future inference boundary

A future validated deception engine may combine independently justified methods, evidence convergence, uncertainty, reliability, alternative explanations, and task-specific models. A deception probability or confidence matrix may only be enabled after the required scientific validation and calibration work is completed.

## Operational observability boundary

The API now includes request correlation and sanitized lifecycle/stage diagnostics with durable Supabase Storage support. The frontend developer console will consume this operational evidence rather than inventing telemetry.

The current open `/v1/analyze` 502 incident remains an engineering reliability problem. UI work must expose failures clearly and must not convert an unavailable API response into a successful-looking analysis state.

## Deployment boundary

Render must use `VoxVector` as the root directory and launch `api.app:app`. The intended public target is `voxvector.crownlabs.tech`. Public-domain availability or a green deployment is not itself runtime or scientific verification.

## Design properties

- deterministic feature extraction where practical
- bounded frame processing for constrained runtimes
- immutable run provenance
- explicit missing-data states
- reproducible configuration
- auditable evidence contributions
- explicit uncertainty and alternative explanations
- abstention as a first-class outcome
- separation of product objective from implementation and validation status
- planned capabilities preserved independently of current implementation status
- frontend state derived from actual API/data state
- animation separated from analytical truth
- accessible and responsive product presentation
