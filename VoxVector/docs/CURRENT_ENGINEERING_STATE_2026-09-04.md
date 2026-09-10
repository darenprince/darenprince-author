# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This file remains the canonical current engineering-state owner despite its historical filename. Dated audit/checkpoint files remain preserved separately and are not rewritten to make old evidence appear current.

- Repository: `darenprince/darenprince-author`
- Canonical branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Current canonical `main`: `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Current Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- Current Render deployment: `dep-dah7usjl550s73e00350`, `live`
- Current deployed source: exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`
- Render production auto-deploy: disabled
- Render plan/region: free / Oregon
- Current live Render build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- Canonical root Blueprint build command: `pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- `voxvector-user-admin` Edge Function: ACTIVE, version 2, JWT verification enabled
- Latest trusted role inventory: 1 admin, 1 developer, 1 user
- Maximum sample rate: `48,000 Hz`
- Default maximum media size: `262,144,000 bytes`
- Active P0 runtime blocker: confirmed post-transcription memory exhaustion and upstream-artifact durability gap, #941 / draft PR #962
- Next P0 after #941: #959 / draft PR #961 dual Render + Supabase observability and one-click Debug Bundle
- Render Blueprint reconciliation: #964
- Persisted old-case playback/transcript rehydration: #963 after #941

The backend and frontend have separate release numbers. Backend source authority is `VoxVector/pyproject.toml`; frontend source authority is `voxvector/package.json`. Production API version, runtime self-test, source revision, provider configuration, process identity, and memory settings remain runtime observations from `/health` and must not be advanced merely because source or documentation changes.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Canonical GitHub Pages frontend; browser verification remains separate from build/publication evidence |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API; current deploy `dep-dah7usjl550s73e00350` is live on exact `f0dda136...` |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate environment; not substituted for Render production evidence |
| Authentication/persistence/diagnostics/private media | Supabase | Configured active boundary; administrator Edge Function is deployed and active |

Render hosting the API does not make Render the durable media store. GitHub Pages publishing the React artifact does not make Pages the API host. Supabase owns configured auth/persistence/diagnostics/private media, not analytical classification logic.

The current Render deployment was triggered through Render's API. It is deployment evidence only and does not verify issue #920's authenticated Developer Console **Deploy Now** / server-side deploy-hook path.

## Controlled production result — 2026-09-10

The current deployed source has now completed real beam-1 faster-whisper execution against the controlled reference WAV.

Case/run evidence:

- case `3515362e-f801-463d-961a-df7b3302a596`
- source `cbdcdbf8-e528-49b0-a474-5cd64588d301`
- request `32fdb25aee704ee4ad0a0615e2496e09`
- duration 183.3 seconds
- size 17,596,936 bytes

Observed sequence:

1. authenticated source upload/private persistence succeeded;
2. Speech Segmentation completed with 26 segments;
3. faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process, 165-second child deadline;
4. transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
5. transcript alignment state was reached;
6. API-parent RSS was about 134.75 MiB before post-provider cleanup and about 482.58 MiB after cleanup;
7. VoxVector's configured memory admission ceiling was 416 MiB on a 512 MiB reference budget;
8. Stage 10 Acoustic Feature Extraction nevertheless started on deployed `f0dda136...`;
9. Render sampled 519,041,020 bytes against a 536,870,900-byte service memory limit in the incident window;
10. the API process restarted shortly afterward;
11. the owner confirmed the incident was a memory problem;
12. the source WAV remained persisted in Supabase;
13. Stage 07/08 lifecycle state survived, but the transcript/provider artifact had not been durably attached to the run before downstream work.

Render did not provide a dedicated kernel OOM/SIGKILL line for this exact run, so the precise OS termination mechanism is not separately claimed.

This is real provider execution evidence. It is not end-to-end reliability, transcript truthfulness, browser verification, or scientific validation.

## Active #941 / draft PR #962

The active branch `fix/voxvector-post-transcription-memory-cleanup` keeps the existing canonical backend pipeline and CaseStore and addresses one runtime-reliability subsystem:

- `collect_after_heavy_phase()` no longer imports PyTorch solely for cleanup on the CPU transcription path;
- completed acquisition/transcript/alignment/provider state is checkpointed to the same stable case run before Stage 10;
- checkpoint diagnostics expose only state/count metadata, not transcript text;
- Stage 10 performs memory admission before being represented as running;
- admission failure preserves completed upstream provider evidence and terminalizes downstream work explicitly;
- `process_instance_id` is a fresh Python-process UUID;
- `render_instance_id` preserves Render infrastructure identity separately;
- finalization preserves the stable case run ID and keeps any pipeline-internal run identity separate;
- `/health` source contract adds safe process/Render identity and memory-admission fields.

PR #962 is source-only until final exact-head QA succeeds, it is reviewed/merged, and an approved deployment is separately verified.

## Current 21-stage pipeline

| Stage | Runtime contract state |
|---:|---|
| 01 File Upload / Ingest | implemented; latest controlled 17.6 MB upload succeeded; intermittent #930 remains open |
| 02 File Decode and Normalization | implemented |
| 03 Provenance and Integrity | implemented |
| 04 Channel and Recording Assessment | implemented |
| 05 Speech Segmentation | implemented foundation; controlled run completed 26 segments |
| 06 Speaker Identification / Diarization | cloud-primary provider path built; controlled pyannoteAI execution required |
| 07 Transcription Generation | controlled beam-1 faster-whisper execution observed; durability/reliability repair active |
| 08 Transcript Alignment | built synchronized foundation; completion state observed, durable checkpoint repair active |
| 09 Eligibility and Reliability | implemented analytical gate; separate from runtime memory admission |
| 10 Acoustic Feature Extraction | implemented source; constrained-memory admission repair active |
| 11 Prosodic and Voice Quality Analysis | implemented foundation |
| 12 Temporal and Pause Analysis | implemented foundation |
| 13 Linguistic and Disfluency Analysis | conditional on available transcript artifact |
| 14 Question / Answer Alignment | conditional |
| 15 Within Speaker Baseline | conditional |
| 16 Cross Method Evidence Assembly | implemented foundation |
| 17 Evidence Convergence and Conflict | implemented foundation |
| 18 Candidate Classification | implemented guarded foundation |
| 19 Validation and Calibration Gate | not invoked |
| 20 Final Classification / Disposition | implemented guarded foundation |
| 21 Audit and Provenance Output | implemented foundation |

The canonical backend stage order is Speech Segmentation at 05 and Speaker Identification / Diarization at 06. Any current static frontend metadata that preserves the older opposite order is a synchronization defect, not an alternate canonical pipeline.

Current maturity remains **16 implemented or built runtime foundations** with four conditional/intentionally not-invoked stages and the speaker path still requiring controlled cloud-primary execution.

## Memory safety and artifact durability

The constrained production sequence is now explicitly:

`provider completion → provider cleanup → durable same-run upstream checkpoint → Stage 10 memory admission → downstream composite analysis`

Current default memory reference:

- `VOXVECTOR_MEMORY_LIMIT_MB=512`
- `VOXVECTOR_MEMORY_HEADROOM_MB=96`
- effective admission ceiling `416 MiB`

A memory-admission rejection is operational runtime safety. It is not analytical Stage 09 Eligibility and Reliability and must not be presented as a scientific result.

## Process and Render instance identity

`process_instance_id` identifies the current Python API process. It must change when the Python process restarts.

`render_instance_id` identifies Render infrastructure when available. It can remain stable across an internal Python/Uvicorn restart, so it cannot serve as the sole worker identity for interruption recovery.

## Speech runtime readiness and execution

### Transcription

The canonical constrained profile is:

- faster-whisper
- model `base`
- CPU
- int8
- beam 1
- one CPU thread
- one worker
- disposable child process
- 165-second child deadline

That profile has now actually executed and completed transcription on `f0dda136...`. The active issue is downstream memory containment and durable checkpointing, not provider readiness.

### Diarization

The canonical primary path remains pyannoteAI cloud through `pyannote_api`. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is a separate invocation gate.

Local Community-1 is an optional explicit fallback requiring the local pyannote/PyTorch stack and protected Hugging Face credential. It is not required merely to invoke the cloud-primary adapter.

Controlled cloud-primary execution and persisted speaker artifact readback remain required.

## Render Blueprint configuration drift

Git already contains the sole canonical root `render.yaml`.

Live Render currently builds `requirements-speech.txt`, while root `render.yaml` declares `requirements-transcription.txt`. The broader live speech requirements bring in the local pyannote/PyTorch stack even though cloud-primary diarization does not require that stack merely to call the provider.

Issue #964 owns reconciliation. Do not upload the downloaded Render-generated Blueprint as a second file or create a duplicate service. Secret values remain external; reproducible non-secret operational values should remain source-controlled where supported.

## Run lifecycle recovery

Issue #945 / PR #946 remains complete at source/merge boundaries and provides Case History reconciliation, terminal run/failure reports, real elapsed timing, historical source-revision preservation, terminal metadata backfill, and same-process per-case serialization.

PR #962 strengthens that canonical lifecycle by making process identity truly process-scoped and by checkpointing completed provider evidence before dependent heavy work.

## Developer Console

The Developer Console remains the engineering cockpit for runtime health, case workflow, 21-stage state, live run polling, diagnostics, Render status/logs, methodology, structured audits, report/log export controls, and protected deployment actions.

Issue #959 / draft PR #961 is the next observability source subsystem after #941. It owns dual Render + Supabase log durability, parent correlation propagation into speech workers, bounded Render-log mirroring, and the one-click server-generated Debug Bundle.

## Authentication and administrator state — issue #931

The prior Edge Function deployment blocker is resolved at the infrastructure level: `voxvector-user-admin` is ACTIVE version 2 with JWT verification enabled, and the latest trusted-role inventory contains an admin, developer, and user.

Remaining #931 work is the existing-console User Management UX and authenticated browser acceptance: searchable/filterable landing list, separate create and view/edit flows, password-or-invite requirement, delete, permission toggles, role-default explanation, and desktop/mobile verification.

## Active issue state

- #941 / draft PR #962 — **P0 In progress.** Confirmed post-transcription memory failure; source repair active.
- #959 / draft PR #961 — **P0 queued immediately after #941.** Dual logs/correlation/debug bundle.
- #930 — **P0 open.** Latest controlled upload succeeded; intermittent pre-handler 400 still requires reproduction/bounding.
- #920 — **P0 open.** Current API-triggered Render deploy does not verify protected Developer Console Deploy Now.
- #948 / draft PR #951 — **P0 open/in progress.** Secure deletion hardening remains separate.
- #949 / draft PR #952 — **P0 open/in progress.** Server-aware cancellation remains separate.
- #963 — **P1 after #941.** Historical-case audio/transcript rehydration through canonical persisted source/run.
- #964 — **P1 ready.** Reconcile current live Render service/export into existing root Blueprint.
- #931 — **P1 remaining management UX/browser work.** Admin Edge Function/bootstrap no longer the blocker.
- #932, #928, #958, #927 — remain mapped in tracker #915.

## Supabase current boundary

Supabase is the configured durable persistence boundary for cases, private media, diagnostics, and authentication. The latest memory incident demonstrated that source media and pre-termination diagnostic records can survive a Render process restart.

That persistence is not proof of browser rehydration. #963 owns the old-case playback/transcript return path.

## Manual Render deployment control

The canonical Developer Console includes **Deploy Now**, calling `POST /v1/developer/render/deploy` server-side. Render production auto-deploy remains intentionally disabled.

A successful trigger response establishes only request acceptance. #920 still requires:

`Developer Console action → server deploy-hook accepted → new Render deploy → intended commit → live → backend source_revision → fresh /health → browser/runtime verification where required`

## Current engineering sequence

1. finish #941 / PR #962 source/docs/Crown/audit synchronization;
2. run and inspect exact-head QA, Preview and applicable security checks;
3. review PR diff and branch integrity;
4. merge only after owner/review authorization;
5. deliberately deploy the reviewed merge revision to Render;
6. capture fresh `/health` with exact source, beam 1, process/render identity and memory-admission fields;
7. rerun the same WAV and prove transcript/alignment checkpoint readback plus Stage 10 completion or explicit admission failure without restart;
8. complete #959 / PR #961 observability/debug bundle;
9. execute cloud-primary diarization and durable multimodal alignment;
10. complete #963 historical case rehydration;
11. complete remaining product/browser/release gates;
12. run two complete same-revision golden cases before engineering-MVP sign-off;
13. continue scientific validation separately.

## Evidence and scientific boundary

No single vocal, acoustic, linguistic, behavioral, emotional, or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Infrastructure health, provider execution, artifact persistence, software tests, browser verification, engineering-MVP completion, and scientific validation are different claims.
