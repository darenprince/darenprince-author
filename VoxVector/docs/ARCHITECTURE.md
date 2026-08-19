# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a deception detection system based on structured vocal and audio evidence. The architecture deliberately separates the product objective from the current validation state so the system can mature without turning unvalidated observations into unsupported conclusions.

## Application boundary

```text
Public React application
voxvector/
        |
        | GitHub Pages
        v
https://darenprince.com/voxvector/
        |
        | TanStack Query / real API calls
        v
https://voxvector.crownlabs.tech
        |
        | FastAPI
        v
VoxVector/api/app.py
        |
        v
VoxVector/src/voxvector/
        |
        +--> eligibility / reliability
        |
        +--> evidence collection and analysis
        |
        +--> candidate classification
        |
        +--> final classification / disposition gate
        |
        v
Supabase
Auth / data / diagnostics
```

The public React application is presentation and interaction only. It must not recreate the analysis engine in the browser.

The FastAPI adapter is an interface/runtime boundary only. It must import and execute the canonical engine. It must never become a second analysis implementation.

## Repository workspaces

### Public frontend

`voxvector/` is the canonical React/Vite frontend workspace.

It contains:

- React 19 application
- Tailwind styling
- Motion for React
- TanStack Query
- Supabase browser authentication client
- real API client for the canonical FastAPI service
- Developer Console

Vite is configured with:

```text
base: /voxvector/
```

### Backend

`VoxVector/` remains the canonical backend/analysis workspace.

- HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- Tests: `VoxVector/tests/`
- Canonical technical documentation: `VoxVector/docs/`
- Render root: `VoxVector`
- Render entry point: `api.app:app`

## Frontend stack

The approved frontend stack is:

- **React** — application runtime
- **shadcn/ui** — application-owned UI foundation; formal component installation remains incremental
- **Tailwind CSS** — styling, responsive layout, tokens, and theming
- **Motion for React** — state-driven animation and interaction
- **TanStack Query** — server-state management and API lifecycle handling

Current implementation status is tracked in `docs/UI_APPLICATION_ARCHITECTURE.md` and `docs/ROADMAP.md`.

## Analysis stages

1. **Ingest and provenance**: accept supported audio, normalize input representation, record provenance, and identify the analysis run.
2. **Eligibility and reliability**: determine whether the input is technically meaningful. This stage can downgrade or reject an input before substantive analysis.
3. **Evidence collection and analysis**: compute measurable acoustic, temporal, voice-quality, spectral, formant, prosodic, interaction, transcript, and baseline observations as supported by the current pipeline and supplied context.
4. **Evidence grouping and convergence**: organize observations for downstream deception research while preserving feature dependence, conflicts, alternative explanations, and provenance.
5. **Candidate classification**: combine supported evidence into a provisional candidate state. The current implementation remains indeterminate-only.
6. **Final classification or disposition**: apply reliability and scientific validation gates. Current outputs remain abstention or insufficient evidence unless a future validation program establishes otherwise.

## Current primary pipeline

`VoxVectorPipeline.analyze()` currently orchestrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux/rolloff, MFCC observations, formant tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

MFCC observations are part of the primary pipeline and are emitted with documented provenance and bounded processing behavior. Additional research utilities remain available according to `docs/CAPABILITY_STATUS.md`.

## Reliability boundary

Reliability is an eligibility control. It is not a probability of deception and must not be merged into a deception score.

## Classification boundary

A measured observation is not a candidate label. Candidate classification must remain capable of returning `indeterminate` and must not bypass validation gates.

## Future inference boundary

A future validated deception engine may combine independently justified methods, evidence convergence, uncertainty, reliability, alternative explanations, and task-specific models. A deception probability or confidence matrix may only be enabled after the required scientific validation and calibration work is completed.

## Operational observability boundary

The API includes request correlation and sanitized lifecycle/stage diagnostics with durable Supabase Storage support. The Developer Console consumes operational evidence rather than inventing telemetry.

The open `/v1/analyze` 502 incident remains an engineering reliability problem. UI work must expose failures clearly and must not convert an unavailable API response into a successful-looking analysis state.

## Deployment boundary

GitHub Pages is the public frontend host. Render is the backend host.

```text
https://darenprince.com/voxvector/
    public React application

https://darenprince.com/voxvector/developer/
    authenticated Developer Console

https://voxvector.crownlabs.tech
    canonical FastAPI API
```

The root `voxvector.html` is a compatibility redirect only and must not contain a second VoxVector implementation.

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
