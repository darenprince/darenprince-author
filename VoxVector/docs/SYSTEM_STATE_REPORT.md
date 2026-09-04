# VoxVector System State Report

**State date:** 2026-09-04  
**Repository:** `darenprince/darenprince-author`  
**Canonical branch:** `main`  
**Backend root:** `VoxVector/`  
**Frontend root:** `voxvector/`  
**Backend software version:** `0.2.26`  
**Frontend version:** `0.2.36`

## Executive summary

VoxVector is a functional vocal and audio analysis foundation being developed into a complete deception analysis product.

The repository uses a case-centered architecture with one canonical analysis engine, one case identity chain, and one 21-stage product pipeline. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate architectural layers.

## Current verified runtime state — Render

The live Render API health response observed on 2026-09-04 reports:

- service: `voxvector-analysis-api`
- pipeline: `0.2.26`
- source revision: `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- runtime self-test: `passed`
- diagnostic/media storage: `configured_media_ready`
- media storage: `true`
- maximum sample rate: `48,000 Hz`
- maximum media size: `262,144,000 bytes`
- transcription provider: `faster_whisper`
- transcription adapter: installed
- transcription execution-ready: `true`
- diarization provider: `pyannote`
- diarization adapter: installed
- Hugging Face token presence: `true`
- diarization execution-ready: `true`
- diarization model: `pyannote/speaker-diarization-community-1`
- current commit QA: `external_workflow_required`

Provider readiness is an operational configuration state. It does not establish successful model execution or scientific validation.

## Repository and deployment boundary

- `VoxVector/` is the canonical backend and analysis-engine root.
- `voxvector/` is the canonical public React application.
- `VoxVector/api/app.py` is the HTTP adapter.
- `VoxVector/src/voxvector/` is the canonical analysis engine.
- GitHub Pages hosts the public React application at `https://darenprince.com/voxvector/`.
- The original API remains on Render at `https://voxvector.crownlabs.tech`.
- A separately addressed AWS API environment exists at `https://awsapi.crownlabs.tech` through AWS Application Load Balancer and ECS Fargate.
- Supabase provides authentication, persistence, diagnostics, and private media storage for the configured architecture.
- Vercel is retired.

## AWS environment

AWS remains a separate deployment environment. The current documented AWS path is:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

The AWS ALB and ECS target were previously verified healthy, with port 8000 restricted to ALB-origin traffic. The AWS endpoint is not used as the default frontend API target and has not been represented as full production parity without authenticated case-workflow verification.

## Case spine and intake

The connected case path is implemented:

`create case → upload WAV → persist private source → obtain signed playback → execute case-bound analysis → persist run`

Case records preserve ownership, source metadata, SHA-256 provenance, run identity, status, and current run state. Private media uses the configured storage boundary and signed access.

## Current 21-stage pipeline maturity

The canonical 21-stage contract reports:

- **16 implemented foundations**
- **4 conditional / intentionally not invoked**
- **3 queued for deeper integration**

The three queued stages are:

- Stage 05 Speaker Identification / Diarization
- Stage 07 Transcription Generation
- Stage 08 Transcript Alignment

The first two now have configured, execution-ready provider runtimes on Render. Stage 08 has the alignment foundation. These stages remain queued until real controlled provider-backed execution, artifact persistence, and integration evidence are obtained.

## Primary analytical pipeline

`VoxVectorPipeline` currently integrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux and rolloff, MFCC, formant tracking, pause topology, optional baseline comparison, optional response latency, and optional transcript disfluency observations.

## Evidence acquisition and speech runtime

The acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker timestamp alignment, and multimodal timeline output.

Current supported provider configuration on Render:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=3

VOXVECTOR_DIARIZATION_PROVIDER=pyannote
VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1
HF_TOKEN=<configured as protected runtime secret>
```

The secret value is not stored in repository source or exposed in the dashboard export path.

## Runtime provenance and QA

The canonical API supports explicit source-revision provenance from deployment environment or embedded container metadata. The current live Render source revision is reported correctly.

The live runtime still reports `current_commit_qa: external_workflow_required`. An exact-commit GitHub Actions result must be observed before the runtime is marked QA-current.

## Analysis Results / Review Evidence

The current product priority is the post-analysis review path. The existing case result persists run state, observations, evidence structures, candidate state, disposition, limitations, and provenance. The next layer is a first-class Review Evidence surface with synchronized source intervals and auditable evidence details.

## Developer Console

The console is connected to:

- `/health`
- case creation/list/retrieval
- source upload
- signed playback
- case-bound analysis
- diagnostics
- GitHub-backed QA/deployment status
- the 21-stage engineering status surface
- Render runtime status and logs
- structured audits
- report/audit/log copy and download controls
- deployment-variable documentation

The engineering status component compares runtime source revision with workflow source revision and distinguishes stale/current evidence instead of presenting unrelated workflow results as current.

## Current engineering priorities

1. Verify exact-commit GitHub QA for the current live source revision.
2. Execute faster-whisper on a controlled short WAV and persist timestamped transcript segments/words.
3. Execute pyannote Community-1 on the same controlled WAV and persist speaker turns.
4. Produce and persist the multimodal alignment artifact.
5. Feed acquired transcript data into linguistic/disfluency analysis.
6. Add speaker-aware acoustic aggregation, independent baseline input, and question/response context.
7. Instrument actual internal method boundaries where real callbacks exist.
8. Complete Review Evidence, assessment, reporting, history/reopen, and synchronized analytical tracks.
9. Verify authenticated desktop/mobile browser behavior and failure paths.
10. Advance scientific validation only after engineering evidence is stable.

## Endpoint registry

The authoritative endpoint map is `docs/ENDPOINT_REGISTRY.md`.

```text
Public frontend
https://darenprince.com/voxvector/

Original API
https://voxvector.crownlabs.tech

AWS API environment
https://awsapi.crownlabs.tech
```

The original API domain remains preserved. AWS is a separately addressed deployment environment.

## Verification boundaries

CI passing does not prove browser functionality, production deployment health, or scientific validity.

Runtime provider readiness does not prove provider execution quality. Successful transcription does not establish transcript truthfulness. Speaker cluster labels do not establish verified real-world identity.

Scientific validation remains separate and requires task-specific operational definitions, speaker-disjoint evaluation, out-of-sample testing, calibration, uncertainty analysis, leakage controls, robustness analysis, and replication as applicable.

## Canonical synchronization records

- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/VERSION_MAP.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/ROADMAP.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/QA_STATUS.md`
- `docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `docs/audits/LIVE_API_SPEECH_RUNTIME_AUDIT_2026-09-03.md`
- `docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
