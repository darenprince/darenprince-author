# VoxVector System State Report

**State date:** 2026-09-10
**Repository:** `darenprince/darenprince-author`  
**Canonical branch:** `main`  
**Backend root:** `VoxVector/`  
**Frontend root:** `voxvector/`  
**Backend source release:** `0.2.27`  
**Frontend source release:** `0.2.37`

The backend and frontend are independently versioned packages. The frontend authority is `voxvector/package.json`; the backend packaging authority is `VoxVector/pyproject.toml`. Backend runtime version authorities are synchronized by source and enforced by `tests/test_version_sync.py`. A deployed API version remains a separate runtime observation and must be read from `/health` rather than inferred from source.

## Executive summary

VoxVector is a functional vocal and audio analysis foundation being developed into a complete deception analysis product.

The repository uses a case-centered architecture with one canonical analysis engine, one case identity chain, and one 21-stage product pipeline. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate architectural layers.

## Current verified runtime state — Render

Connected Render inspection on 2026-09-10 reports the `voxvector-api` service live on deploy `dep-dah0g13l550s73d2dbb0`, sourced from backend revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`. Repeated Render health requests returned HTTP 200 during the observed period. This synchronization did not capture a fresh complete `/health` JSON payload, so provider-readiness and version fields are not re-attributed from an older health payload.

Controlled production transcription on that deployed revision established the following execution evidence:

- the same 183.3 second / 17,596,936 byte WAV was persisted successfully twice;
- speech segmentation completed with 26 segments on both analysis attempts;
- faster-whisper was actually invoked with model `base`, CPU/int8, one CPU thread, one worker, isolated process execution, and a 165 second process deadline;
- the deployed runtime used **beam size 3**, despite the constrained source/runtime contract specifying beam size 1;
- the first attempt loaded the model and produced one progress record after about 65 seconds, reaching only about 6.03 seconds of the 183.3 second source before the API runtime restarted;
- Render memory sampling rose to roughly 458 MB against a reported 536,870,900 byte service memory limit before restart; the 30 second metric resolution does not prove the exact unsampled peak crossed the limit;
- the second attempt loaded the model and the service relaunched before a transcript progress/completion/failure record was persisted;
- no successful transcript artifact readback was established from either attempt.

The active #941 correction aligns the canonical Render source profile to beam size 1. That source correction is not a deployment claim. A deliberate deployment and controlled provider rerun are still required before the deployed transcription path is represented as repaired.

Provider configuration, provider execution, artifact persistence, resource stability, software QA, deployment state, browser verification, and scientific validation remain separate evidence boundaries.

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

The September 10 controlled transcript incident provides positive evidence that case creation, source persistence, source retrieval, and speech segmentation can succeed before the transcription boundary fails. That evidence does not establish general intake reliability for every supported file or close separate intake issue #930.

## Current 21-stage pipeline maturity

The canonical 21-stage contract reports:

- **16 implemented or built runtime foundations**
- **4 conditional / intentionally not invoked without required inputs**
- **Stage 05 Speaker Identification / Diarization remains queued for controlled provider execution**
- **Stages 07 Transcription Generation and 08 Transcript Alignment have built integration paths pending controlled provider-backed verification**

Transcription and alignment have canonical invocation, persistence, and synchronized workspace foundations. Their functional production state still requires successful controlled provider execution, artifact persistence, and verification evidence.

## Primary analytical pipeline

`VoxVectorPipeline` currently integrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux and rolloff, MFCC, formant tracking, pause topology, optional baseline comparison, optional response latency, and optional transcript disfluency observations.

## Evidence acquisition and speech runtime

The acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker timestamp alignment, and multimodal timeline output.

Canonical constrained Render source profile:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<configured as protected runtime secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true

# Optional explicit local fallback only
VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true
HF_TOKEN=<protected Hugging Face token>
```

The secret values are not stored in repository source or exposed in the dashboard export path. The local fallback variables are optional and should be enabled only when fallback behavior is intentionally being tested. The source profile above must not be confused with the last observed deployed beam-size value of 3; #941 owns that correction and production verification.

## Runtime provenance and QA

The canonical API supports explicit source-revision provenance from deployment environment or embedded container metadata. The latest observed live Render source revision is `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`, reported separately from current GitHub source.

GitHub source QA and deployed runtime provenance remain separate. A successful source workflow cannot be used as proof that the corresponding revision is running on Render until the deployment is observed and the runtime revision is read back.

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

The API startup surface treats a cold backend wake as an indeterminate state with elapsed time rather than a fabricated percentage. After a real `/health` response arrives, the returned checks are revealed progressively before the dashboard opens. The startup footer reads the frontend version from `voxvector/package.json` and the API version from the live health payload, so source/deployment version drift remains visible.

The engineering status component compares runtime source revision with workflow source revision and distinguishes stale/current evidence instead of presenting unrelated workflow results as current.

## Current engineering priorities

1. Complete #941 source correction so the canonical Render transcription profile uses beam size 1 and exact-head QA protects that deployment setting.
2. Deliberately deploy the reviewed #941 revision, confirm the deployed source revision and beam-size runtime readback, and rerun the controlled WAV while correlating Supabase case diagnostics with Render resource/process telemetry.
3. Require an explicit successful transcript artifact readback or an explicit bounded failure; do not treat model load/readiness as successful transcription.
4. Confirm the target runtime selects `pyannote_api` and has `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`, then execute pyannoteAI cloud-primary diarization on the same controlled WAV and persist speaker turns plus provider provenance.
5. Exercise local Community-1 only as a separate explicit fallback test when fallback configuration is enabled; do not substitute fallback testing for primary cloud verification.
6. Produce and persist the multimodal alignment artifact.
7. Feed acquired transcript data into linguistic/disfluency analysis.
8. Add speaker-aware acoustic aggregation, independent baseline input, and question/response context.
9. Instrument actual internal method boundaries where real callbacks exist.
10. Complete Review Evidence, assessment, reporting, history/reopen, and synchronized analytical tracks.
11. Verify authenticated desktop/mobile browser behavior and failure paths.
12. Advance scientific validation only after engineering evidence is stable.

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
