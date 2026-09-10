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

The repository uses a case-centered architecture with one canonical analysis engine, one stable case-run identity chain, and one 21-stage product pipeline. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate architectural layers.

The latest controlled production run materially advanced the speech runtime evidence: faster-whisper completed the intended beam-1 constrained path and returned a timestamped transcript. The run then failed at the post-transcription/downstream memory boundary. The owner confirmed the incident was a memory problem. Active #941 / PR #962 repairs that reliability boundary without changing analytical methodology.

## Current repository state

Canonical GitHub `main` is:

`f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`

That revision merged PR #960's bounded Render source/profile correction to beam size 1. PR #962 remains an open draft branch and is **not** part of `main` or the deployed runtime at this checkpoint.

Repository QA for the final PR #962 head must be collected after all affected source, documentation, Crown mirror, and audit updates are complete. Earlier CI on previous heads does not establish final-head acceptance.

## Current verified runtime state — Render

Connected Render inspection on 2026-09-10 reports:

- service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- deployment: `dep-dah7usjl550s73e00350`
- status: `live`
- deployed source: exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`
- trigger: `api`
- auto-deploy: disabled
- region: Oregon
- plan: free
- instances: one
- health path: `/health`
- live build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The canonical root `render.yaml` instead specifies `api/requirements-transcription.txt`. That live-service/Blueprint drift is tracked in #964. The downloaded Render-generated Blueprint must be reconciled into the existing root `render.yaml`; it must not become a second Blueprint for the same service.

## Controlled production memory incident — 2026-09-10

Controlled case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`, 183.3-second WAV, 17,596,936 bytes, on deployed source `f0dda136...` established the following execution sequence:

- source upload and private persistence succeeded;
- speech segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU/int8, beam size 1, one CPU thread, one worker, isolated process and 165-second process deadline;
- transcription completed in about 113 seconds with 58 transcript segments and 246 timestamped words;
- transcript alignment state was reached;
- API-parent RSS was about 134.75 MiB immediately before the post-provider cleanup boundary and about 482.58 MiB after cleanup;
- VoxVector's configured admission ceiling was 416 MiB on the 512 MiB reference budget;
- Stage 10 Acoustic Feature Extraction was nevertheless marked started on the deployed revision;
- Render sampled 519,041,020 bytes against a 536,870,900-byte service memory limit during the incident window;
- the API process restarted shortly afterward;
- the owner confirmed the incident was a memory problem;
- the source WAV remained persisted in private Supabase Storage;
- completed Stage 07/08 lifecycle state survived, but the normalized transcript/provider artifact was not durably attached to the run before Stage 10 because final attachment occurred later in the route lifecycle.

Render did not emit a dedicated kernel OOM/SIGKILL record for this run, so the exact OS termination mechanism is not separately claimed.

This run proves actual beam-1 provider execution. It does not prove transcript correctness, downstream stability, durable artifact checkpointing, browser verification, engineering-MVP completion, or scientific validation.

## Active #941 / PR #962 repair

PR #962 keeps the same canonical backend analysis path and repairs four related runtime defects:

1. `collect_after_heavy_phase()` must not import PyTorch solely to inspect/clear CUDA cache on the CPU faster-whisper path.
2. Completed provider acquisition, transcript, alignment, provider timings, and upstream stage state must be checkpointed to the same persisted run before downstream heavy work begins.
3. Stage 10 must pass explicit memory admission before it is represented as running. Failure must preserve successful upstream speech artifacts and terminalize downstream work explicitly.
4. `process_instance_id` must be a per-Python-process UUID while `render_instance_id` remains separate hosting-provider provenance, because the Python process can restart inside the same Render infrastructure instance.

The repair also preserves the stable case `run_id` through finalization and keeps any pipeline-internal run identity separate.

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

Connected Supabase evidence on 2026-09-10 reports:

- project `VoxVector` (`tawtkawmjqabydnatavx`)
- `voxvector-user-admin` Edge Function `ACTIVE`, version 2, JWT verification enabled
- trusted role inventory at latest readback: one admin, one developer, one user
- durable diagnostics active
- controlled case/source/stage events persisted across the API restart
- the controlled source WAV remained in private `voxvector-media` after the failure

Those facts correct older current-status text that described the administrator function as undeployed. They do not close the remaining #931 management-UX and authenticated browser acceptance work.

## AWS environment

AWS remains a separate deployment environment. The documented AWS path is:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

The AWS endpoint is not used as the default frontend API target and has not been represented as full production parity without authenticated case-workflow verification.

## Case spine and intake

The connected case path is implemented:

`create case → upload WAV → persist private source → obtain signed playback → execute case-bound analysis → persist run`

Case records preserve ownership, source metadata, SHA-256 provenance, run identity, status, and current run state. Private media uses the configured storage boundary and signed access.

The latest controlled case is positive evidence that a 17.6 MB WAV can pass current intake, persistence, retrieval and speech segmentation. It does not establish general intake reliability or close separate intermittent pre-handler issue #930.

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

Stage 07 now has one controlled faster-whisper completion on the current deployed source. Stage 08 completion state was reached in the same run, but durable transcript/alignment checkpointing before downstream failure remained incomplete on that deployed revision.

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

The beam-1 profile is no longer configuration-only evidence: it executed successfully through transcription on `f0dda136...`. The unresolved production reliability boundary begins after provider completion.

Local Community-1 and its PyTorch stack are optional fallback infrastructure. They are not required merely to call the cloud-primary pyannoteAI adapter. The fact that the current live Render build installs the broader speech dependency set is therefore treated as deployment drift, not as a necessary property of the primary cloud architecture.

## Runtime memory and durability contract

The constrained post-provider sequence is:

`provider completion → provider cleanup → durable upstream checkpoint → Stage 10 memory admission → downstream composite analysis`

Current reference memory configuration is 512 MiB with 96 MiB reserved headroom, yielding a 416 MiB admission ceiling.

If current process RSS is at or above that admission ceiling, Stage 10 must be refused before it is marked running. Completed transcript/alignment/provider evidence remains persisted and downstream stages record explicit failed/not-run states.

This operational memory gate is separate from analytical Eligibility and Reliability.

## Runtime provenance and QA

The canonical API supports explicit source-revision provenance from deployment environment or embedded container metadata.

PR #962 changes process provenance so:

- `process_instance_id` is a fresh Python-process UUID;
- `render_instance_id` is retained separately when available;
- `/health` exposes both without exposing protected credentials;
- analysis runs preserve both where relevant.

Exact-head QA for the final PR #962 revision is required before merge recommendation. No current branch source is called deployed until a reviewed merge revision is deliberately deployed to Render and read back.

## Analysis Results / Review Evidence

The case result persists run state, observations, evidence structures, candidate state, disposition, limitations, and provenance when those phases complete.

The immediate reliability requirement is stronger: a successful upstream transcript/alignment must persist before dependent Stage 10 execution. That ensures later failure does not erase already-completed provider work.

## Developer Console

The console is connected to health, case lifecycle, source upload/playback, case-bound analysis, diagnostics, GitHub-backed QA evidence, the 21-stage engineering surface, Render status/logs, structured audits, report/log export controls, and deployment-variable documentation.

Issue #959 / PR #961 separately owns durable dual-output logging and the one-click Debug Bundle. It is queued behind #941 so logging architecture is not mixed into the active runtime-memory branch.

## Current engineering priorities

1. Finish #941 / PR #962 implementation, active documentation/Crown synchronization, running audit, and exact-head QA.
2. Merge only after final review/authorization.
3. Deliberately deploy the reviewed revision to Render.
4. Capture fresh `/health` proving exact source, beam 1, process-vs-Render identity semantics and memory-admission configuration.
5. Rerun the same controlled WAV and require successful transcript checkpoint readback before downstream completion is relied upon.
6. Require Stage 10 either to complete within the memory envelope or fail explicitly at admission without API restart.
7. Complete #959 / PR #961 durable Render + Supabase logging, speech-worker correlation, mirrored provider evidence and Download Debug Bundle.
8. Execute pyannoteAI cloud-primary diarization with its route gate enabled and persist speaker provenance.
9. Complete transcript/audio/speaker alignment and #963 persisted case playback/transcript rehydration.
10. Complete remaining product, browser and engineering-MVP release gates.
11. Continue scientific validation separately.

## Endpoint registry

The authoritative endpoint map is `docs/ENDPOINT_REGISTRY.md`.

The `/health` contract is being extended by PR #962 with safe process-instance, Render-instance, and memory-admission fields. That source contract is not deployed until the reviewed revision reaches Render and is read back.

## Verification boundaries

CI passing does not prove browser functionality, production deployment health, or scientific validity.

Successful transcription establishes that a provider executed and returned output for the controlled recording. It does not establish transcript truthfulness, durable checkpointing on the currently deployed revision, verified speaker identity, or deception-detection validity.

Scientific validation remains separate and requires task-specific operational definitions, speaker-disjoint evaluation, out-of-sample testing, calibration, uncertainty analysis, leakage controls, robustness analysis, and replication as applicable.

## Canonical synchronization records

- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/ARCHITECTURE.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/QA_STATUS.md`
- `docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `docs/RUNTIME_MEMORY_CONSTRAINTS.md`
- `docs/SPEECH_RUNTIME_DEPLOYMENT.md`
- `docs/SPEECH_INTELLIGENCE_ENGINEERING.md`
