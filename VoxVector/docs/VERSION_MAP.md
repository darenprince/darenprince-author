# VoxVector Version Map

**State date:** 2026-09-04

| Area | Version / reference | Status |
|---|---:|---|
| Backend runtime | 0.2.26 | active |
| Public React application | 0.2.36 | active |
| Result schema | 0.3 | active engine and composed case envelope |
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
| Evidence acquisition | 0.1 | implemented foundation |
| faster-whisper adapter | configured / execution-ready on live Render runtime | implemented; real execution verification next |
| pyannote Community-1 adapter | configured / execution-ready on live Render runtime | implemented; real execution verification next |
| Transcript/speaker alignment | 0.1 | foundation implemented; provider-backed verification next |
| Jitter / shimmer utilities | 0.1 | implemented / outside primary pipeline |
| Reliability gate | 0.1 | implemented / eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented / controlled boundary |
| Final disposition gate | 0.1 | implemented / controlled boundary |
| Validation registry | 0.3 | synchronized with implemented and planned methods |
| Reproducibility / QA | 0.1 | implemented / regression controls |
| CI QA workflow | 0.2 | exact-commit QA still required for current runtime source |
| Research method expansion | 0.2 | active preserved backlog |
| Capability status map | 0.1 | active |
| Roadmap | 0.1 | active |
| Deception classifier | not assigned | planned / not validated |
| Speaker diarization | not assigned | adapter configured; execution-ready; real controlled execution next |
| Production transcription | not assigned | adapter configured; execution-ready; real controlled execution next |
| Transcript alignment | 0.1 | foundation implemented; provider-backed execution next |
| Learned speech representations | not assigned | planned |
| D Series validated inference | not assigned | not active |

## Current runtime evidence — 2026-09-04

Live Render `/health` reports:

- source revision: `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- pipeline: `0.2.26`
- runtime self-test: `passed`
- diagnostic storage: `configured_media_ready`
- media storage: `true`
- transcription provider: `faster_whisper`
- transcription adapter: installed
- transcription execution readiness: `true`
- diarization provider: `pyannote`
- diarization adapter: installed
- Hugging Face token presence: `true`
- diarization execution readiness: `true`
- diarization model: `pyannote/speaker-diarization-community-1`

The health response reports `current_commit_qa: external_workflow_required`; that value remains separate from runtime health until exact-commit GitHub Actions verification is observed.

## Canonical locations

VoxVector backend and analysis: `VoxVector/`

Public React application: `voxvector/`

Historical systems remain historical source material and are not alternate active implementations.

## Primary pipeline integration

`VoxVectorPipeline` currently orchestrates acoustic summaries, F0 and intensity dynamics, HNR, spectral flux and rolloff, formant tracking, pause topology, MFCC observations, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

The product pipeline additionally defines speaker processing, transcription, alignment, evidence synthesis, classification, validation, reporting, and audit stages.

## Speech intelligence runtime

The canonical acquisition layer can activate real local transcription and diarization providers through environment-selected adapters. Current live Render configuration makes both provider adapters execution-ready. Heavy model execution must still be verified through controlled case runs before the related pipeline stages are promoted to implemented/integrated runtime status.

Supported current providers are faster-whisper for transcription and pyannote Community-1 for speaker diarization.

## Frontend authority

Current frontend package authority is `voxvector/package.json`. The active stack is React 19.2.8, React DOM 19.2.8, Recharts 3.10.1, Motion for React, TanStack Query, Lucide React, Tailwind CSS, Base UI, and application-owned shadcn-style composition.

Historical React 18 / Tremor documentation is retained only as historical context.

## Deployment boundary

GitHub Pages hosts the public frontend at `https://darenprince.com/voxvector/`.

The original VoxVector API remains at `https://voxvector.crownlabs.tech`.

AWS provides the separately addressed API environment at `https://awsapi.crownlabs.tech`, using an HTTPS Application Load Balancer and ECS Fargate.

Supabase is the operational/authentication/persistence/diagnostic/private-media service layer.

Vercel is retired and prohibited for VoxVector.

## Scientific boundary

All implemented analysis remains observational until the defined validation program promotes a method for a specific task. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain distinct.

## Documentation synchronization

Current canonical status records include:

- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`
- `docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/ROADMAP.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/QA_STATUS.md`

