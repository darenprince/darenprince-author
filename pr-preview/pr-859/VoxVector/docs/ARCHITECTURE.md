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
        +--> file upload / ingest
        +--> decode / normalization
        +--> provenance / integrity
        +--> recording / channel assessment
        +--> speaker identification / diarization
        +--> speech segmentation
        +--> transcription generation
        +--> transcript alignment
        +--> eligibility / reliability
        +--> acoustic / prosodic / temporal / linguistic analysis
        +--> question / answer alignment
        +--> baseline comparison
        +--> evidence assembly
        +--> convergence / conflict analysis
        +--> candidate classification
        +--> validation / calibration gate
        +--> final classification / disposition
        +--> audit / provenance output
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

- React application
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

## Analysis stages

The complete product pipeline is defined in `docs/ANALYSIS_PIPELINE.md`.

1. **File upload / ingest** — accept supported audio and establish the analysis request.
2. **Decode and normalization** — decode media and establish the analysis representation.
3. **Provenance and integrity** — hash the input and preserve run identity and source metadata.
4. **Channel and recording assessment** — inspect duration clipping signal integrity and recording conditions.
5. **Speaker identification / diarization** — identify speaker regions and assess separability. This remains planned research.
6. **Speech segmentation** — identify analyzable speech regions within the recording.
7. **Transcription generation** — produce a transcript for linguistic and conversational analysis. This remains planned research.
8. **Transcript alignment** — associate transcript content with audio timing. This remains planned research.
9. **Eligibility and reliability** — determine whether the available material is adequate for analysis.
10. **Evidence collection and analysis** — compute supported acoustic prosodic voice quality temporal formant spectral transcript and baseline observations.
11. **Question / answer alignment** — connect responses with prompts and response boundaries when available.
12. **Evidence assembly and convergence** — organize observations into neutral evidence while preserving dependence conflict uncertainty and alternative explanations.
13. **Candidate classification** — produce a provisional candidate state. The current implementation remains indeterminate only.
14. **Validation and calibration gate** — require task specific validation calibration robustness and out of distribution controls before inferential use.
15. **Final classification / disposition** — issue a validated disposition only when the configured gates are satisfied. Otherwise abstain or report insufficient evidence.
16. **Audit and provenance output** — report measurements data availability reliability evidence direction uncertainty alternatives and provenance.

## Current primary pipeline

`VoxVectorPipeline.analyze()` currently orchestrates acoustic summaries F0 and intensity dynamics HNR spectral flux and rolloff MFCC observations formant tracking pause topology optional within speaker baselines optional response latency and optional transcript disfluency observations.

The current runtime does not yet contain production grade ASR speaker diarization word or phoneme alignment or a validated deception classifier. Those capabilities remain planned or research status and must not be represented as implemented.

## Reliability boundary

Reliability is an eligibility control. It is not a probability of deception and must not be merged into a deception score.

Reliability must eventually incorporate more than signal amplitude quality. Speaker separability transcript confidence channel integrity clipping duration recording artifacts and contextual completeness can affect whether downstream observations are interpretable.

## Classification boundary

A measured observation is not a candidate label. Candidate classification must remain capable of returning `indeterminate` and must not bypass validation gates.

## Future inference boundary

A future validated deception engine may combine independently justified methods evidence convergence uncertainty reliability alternative explanations and task specific models. A deception probability or confidence matrix may only be enabled after the required scientific validation and calibration work is completed.

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
