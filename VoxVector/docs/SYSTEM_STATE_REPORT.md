# VoxVector System State Report

**State date:** 2026-09-10  
**Repository:** `darenprince/darenprince-author`  
**Canonical branch:** `main`  
**Backend root:** `VoxVector/`  
**Frontend root:** `voxvector/`  
**Backend source release:** `0.2.27`  
**Frontend source release:** `0.2.37`

The backend and frontend are independently versioned packages. The frontend authority is `voxvector/package.json`; the backend packaging authority is `VoxVector/pyproject.toml`. Backend runtime version authorities are synchronized by source and enforced by `tests/test_version_sync.py`. A deployed API version remains a separate runtime observation and must be read from `/health` rather than inferred from source or deployment metadata.

## Executive summary

VoxVector is a functional vocal and audio analysis foundation being developed into a complete deception analysis product.

The repository uses a case-centered architecture with one canonical analysis engine, one stable case-run identity chain, and one 21-stage product pipeline. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate architectural layers.

Current `main` contains the merged #962/#967 post-transcription durability, Stage 10 bounded-admission, process-provenance, and stable-run-identity repairs. Render is `live` on that same revision. Those facts establish source and deployment state, not controlled production completion. #964 now owns runtime-profile reconciliation; reopened #941 then owns the controlled same-WAV proof.

## Current repository state

Canonical GitHub `main` is:

`420536771875c6948be51851118b58cb04a596e6`

That revision merged PR #967's fail-fast serialized Stage 10 composite admission and stable route-owned `run_id` / separate `pipeline_run_id` follow-up on top of the #962 durability/memory foundation.

Exact-main workflow evidence:

- VoxVector QA run `34532394431`: success;
- Deploy GitHub Pages run `34532394423`: success.

Draft PR #974 is separate frontend/auth candidate work and is **not** part of current `main`. Its prior QA predates the #967 main advance and must be refreshed against current `main` before merge recommendation.

## Current verified deployment state — Render

Connected Render inspection on 2026-09-10 reports:

- workspace: `tea-da2errdg1s2s73cl4eeg`
- service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- deployment: `dep-dahi2ics728c73b6ujug`
- status: `live`
- deployed source: exact `420536771875c6948be51851118b58cb04a596e6`
- trigger: `api`
- deployment finished: `2026-09-10T21:36:23.3655Z`
- auto-deploy: disabled
- region: Oregon
- plan: free
- instances: one
- health path: `/health`
- live build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- start command: `uvicorn api.app:app --host 0.0.0.0 --port $PORT`

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches repository/service/root/runtime/plan/region/build/start/health/domain/auto-deploy fields and lists environment-variable names with redacted `sync: false` values.

The canonical root `render.yaml` instead specifies `api/requirements-transcription.txt`. It also declares `CORS_ORIGINS` as server-managed while the owner export does not list that key; backend source defaults to `*` when it is absent. That live-service/Blueprint/configuration drift is tracked in #964. The provider-generated export is reconciliation evidence and must not become a second Blueprint or be used to infer redacted values.

No fresh `/health` response for exact deployed source `420536...` is recorded by the current synchronization pass. Render `live` is not substituted for runtime readback.

## Controlled production memory incident — historical 2026-09-10 evidence

The controlled incident below occurred on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` and remains preserved as historical provider/runtime evidence.

Controlled case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`, 183.3-second WAV, 17,596,936 bytes established:

- source upload and private persistence succeeded;
- speech segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU/int8, beam size 1, one CPU thread, one worker, isolated process and 165-second process deadline;
- transcription completed in about 113 seconds with 58 transcript segments and 246 timestamped words;
- transcript alignment state was reached;
- API-parent RSS was about 134.75 MiB immediately before the post-provider cleanup boundary and about 482.58 MiB after cleanup;
- VoxVector's configured admission ceiling was 416 MiB on the 512 MiB reference budget;
- Stage 10 Acoustic Feature Extraction was nevertheless marked started on that deployed revision;
- Render sampled 519,041,020 bytes against a 536,870,900-byte service memory limit during the incident window;
- the API process restarted shortly afterward;
- the owner confirmed the incident was a memory problem;
- the source WAV remained persisted in private Supabase Storage;
- completed Stage 07/08 lifecycle state survived, but the normalized transcript/provider artifact was not durably attached to the run before Stage 10 because final attachment occurred later in the route lifecycle.

Render did not emit a dedicated kernel OOM/SIGKILL record for this run, so the exact OS termination mechanism is not separately claimed.

This run proves actual historical beam-1 provider execution. It does not prove transcript correctness, current downstream stability, current durable checkpoint execution, browser verification, engineering-MVP completion, or scientific validation.

## Merged #941 source repair and reopened production proof

Merged PR #962 established:

1. `collect_after_heavy_phase()` does not import PyTorch solely to inspect/clear CUDA cache on the CPU faster-whisper path;
2. completed provider acquisition, transcript, alignment, provider timings, and upstream stage state are checkpointed to the same persisted run before downstream heavy work begins;
3. Stage 10 performs explicit memory admission before it is represented as running;
4. `process_instance_id` is a per-Python-process UUID while `render_instance_id` remains separate hosting-provider provenance;
5. the stable case `run_id` remains durable through finalization.

Merged PR #967 completed the reviewed follow-up:

6. Stage 10 composite execution uses fail-fast process-wide single-flight admission so a timed-out/abandoned caller cannot wait behind the heavyweight lock and later execute after its route has failed;
7. an admitted composite call rechecks RSS while holding the shared lock and retains that lock through complete composite execution;
8. the route-owned persisted `run_id` remains authoritative while the pipeline-internal UUID is retained separately as `pipeline_run_id`.

Issue #941 was closed at merge even though its production acceptance criteria had not been executed and has been reopened. #964 should first reconcile the final Render runtime profile, then #941 must rerun the controlled WAV and read back the durability/memory/process/run behavior on that candidate runtime.

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

A source commit is not QA. QA is not deployment. A deployment record is not a fresh health readback. A provider start is not provider completion. Provider completion is not artifact durability. Deployment is not browser verification.

## Supabase current boundary

The last connected Supabase verification on 2026-09-10 established:

- project `VoxVector` (`tawtkawmjqabydnatavx`)
- `voxvector-user-admin` Edge Function `ACTIVE`, version 2, JWT verification enabled
- trusted role inventory: one admin, one developer, one user
- durable diagnostics active
- controlled historical case/source/stage events persisted across an API restart
- the controlled source WAV remained in private `voxvector-media` after the failure

Those facts correct older status text that described the administrator function as undeployed. They do not close #931's remaining PR #974 integration and authenticated browser/profile acceptance work.

## AWS environment

AWS remains a separate deployment environment. The documented AWS path is:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

The AWS endpoint is not used as the default frontend API target and has not been represented as full production parity without authenticated case-workflow verification.

## Case spine and intake

The connected case path is implemented:

`create case → upload WAV → persist private source → obtain signed playback → execute case-bound analysis → persist run`

Case records preserve ownership, source metadata, SHA-256 provenance, run identity, status, and current run state. Private media uses the configured storage boundary and signed access.

Historical controlled cases prove that a 17.6 MB WAV can pass intake, persistence, retrieval and speech segmentation. They do not establish general intake reliability or close separate intermittent pre-handler issue #930.

## Current 21-stage pipeline maturity

The canonical backend order is:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

Current maturity remains 16 implemented or built analytical/runtime foundations, four conditional or intentionally not-invoked stages, and the speaker path still requiring controlled cloud-primary execution.

Stage 07 has historical controlled faster-whisper completion evidence. Stage 08 historical completion state was reached, but current same-run durable checkpoint behavior remains to be proven under #941. Stage 06 cloud-primary execution remains #970. Stage 08 persisted transcript/audio/speaker alignment remains #971.

Current `voxvector/src/components/PipelineBuildCard.jsx` still has stale local Stage 05/06 ordering and queued Stage 07/08 fallback text; #965 owns the existing-component correction.

## Primary analytical pipeline

`VoxVectorPipeline` currently integrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux and rolloff, MFCC, formant tracking, pause topology, optional baseline comparison, optional response latency, and optional transcript disfluency observations.

These implemented measurements remain evidence inputs. Their existence does not establish validated deception inference.

## Evidence acquisition and speech runtime

Canonical constrained source profile:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1
VOXVECTOR_WHISPER_CPU_THREADS=1
VOXVECTOR_WHISPER_NUM_WORKERS=1
VOXVECTOR_WHISPER_ISOLATED_PROCESS=true
VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected runtime secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true

# Optional explicit local fallback only
VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true
HF_TOKEN=<protected Hugging Face token>
```

The beam-1 profile has historical provider-execution evidence on `f0dda136...`. Current exact deployed `420536...` requires a fresh post-#964 runtime readback and controlled execution before the merged durability/memory path is accepted.

Local Community-1 and its PyTorch stack are optional fallback infrastructure. They are not required merely to call the cloud-primary pyannoteAI adapter. The current live Render build still installs the broader `requirements-speech.txt`, so #964 must reconcile that dependency choice into source rather than treating it as automatically correct.

Issue #970 additionally owns rechecking/correcting the cloud pyannoteAI media-upload/job contract and obtaining real cloud-primary execution plus persisted speaker evidence.

## Runtime memory and durability contract

The constrained post-provider sequence is:

`provider completion → provider cleanup → durable upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 composite admission + locked RSS recheck → downstream composite analysis while admitted`

Current source reference memory configuration is 512 MiB with 96 MiB reserved headroom, yielding a 416 MiB reference admission ceiling.

If current process RSS is at or above that admission ceiling, Stage 10 must be refused before it is marked running. Completed transcript/alignment/provider evidence remains persisted and downstream stages record explicit failed/not-run states.

These are source/runtime-profile semantics, not a fresh current `/health` claim. This operational memory gate is separate from analytical Eligibility and Reliability.

## Runtime provenance and QA

The canonical API supports explicit source-revision provenance from deployment environment or embedded container metadata.

Current source semantics are:

- `process_instance_id` is a fresh Python-process UUID;
- `render_instance_id` is retained separately when available;
- `/health` can expose both without exposing protected credentials;
- analysis runs preserve both where relevant;
- route-owned `run_id` remains the persisted case-run identity;
- pipeline-internal identity remains separately available as `pipeline_run_id`.

Exact-main QA `34532394431` succeeded for `420536...`. That does not substitute for fresh `/health` or controlled production execution.

## Analysis Results / Review Evidence

The case result persists run state, observations, evidence structures, candidate state, disposition, limitations, and provenance when those phases complete.

The reliability requirement remains that a successful upstream transcript/alignment is persisted before dependent Stage 10 execution. Merged source implements that ordering; reopened #941 must prove it in production on the reconciled runtime.

## Developer Console

The console is connected to health, case lifecycle, source upload/playback, case-bound analysis, diagnostics, GitHub-backed QA evidence, the 21-stage engineering surface, Render status/logs, structured audits, report/log export controls, and deployment-variable documentation.

PRs #961/#966/#968 are merged. #959 now owns production acceptance of dual Render + Supabase evidence, real Debug Bundle contents/redaction, automatic terminal Render snapshot capture and browser readback.

## Authentication and profiles

Current `main` `AuthGate.jsx` still does not issue the requested login-time API wake.

Draft PR #974 under #931 contains the candidate non-blocking `/health` wake plus the shared role-aware self-profile editor implementation. It reuses the existing `public.profiles` and private avatar bucket for developer/admin/user self-profile behavior; email, trusted role and account ID remain read-only and Admin User Management remains separately privileged.

PR #974 is not current/deployed source. Its prior integration QA predates the #967 main advance and must be refreshed against current `main` before merge recommendation.

## Current engineering priorities

1. complete #964 Render Blueprint/runtime-dependency/configuration reconciliation in the existing root `render.yaml`;
2. deliberately deploy/read back the reconciled exact revision and complete reopened #941 with the same controlled WAV;
3. execute/persist cloud-primary diarization under #970;
4. persist/read back transcript/audio/speaker alignment under #971;
5. complete #963 persisted case playback/transcript/speaker/alignment/report rehydration;
6. bound #930 intake reliability and complete #959 production observability acceptance;
7. correct the existing frontend pipeline projection under #965;
8. refresh draft PR #974 against current `main`, rerun current-base QA and complete #931 auth/profile browser acceptance;
9. complete #932 release-critical public navigation behavior;
10. freeze one exact candidate revision/configuration and pass two complete same-revision golden cases under #972;
11. continue scientific validation separately.

## Endpoint registry

The authoritative endpoint map is `docs/ENDPOINT_REGISTRY.md`.

The current source health/process/memory/run contract is merged. Fresh runtime attribution still requires actual `/health` readback after the intended candidate deployment.

## Verification boundaries

CI passing does not prove browser functionality, production deployment health, fresh runtime state, provider execution, artifact durability, or scientific validity.

Successful historical transcription establishes that a provider executed and returned output for one controlled recording. It does not establish current execution, transcript truthfulness, current durable checkpointing, verified speaker identity, or deception-detection validity.

Scientific validation remains separate and requires task-specific operational definitions, speaker-disjoint evaluation, out-of-sample testing, calibration, uncertainty analysis, leakage controls, robustness analysis, and replication as applicable.

## Canonical synchronization records

- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/ARCHITECTURE.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/MVP_RELEASE_GATE.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/QA_STATUS.md`
- `docs/DEPLOYMENT_BOUNDARY.md`
- `docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `docs/RUNTIME_MEMORY_CONSTRAINTS.md`
- `docs/SPEECH_RUNTIME_DEPLOYMENT.md`
- `docs/SPEECH_INTELLIGENCE_ENGINEERING.md`
