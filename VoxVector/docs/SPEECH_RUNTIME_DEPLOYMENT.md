# VoxVector Speech Runtime Deployment

**State date:** 2026-09-09

## Purpose

Deploy the optional speech intelligence runtime without weakening the lightweight base API deployment or exhausting the constrained Render memory budget.

## Runtime components

- faster-whisper for transcription
- pyannoteAI cloud (`pyannote_api`) as the current primary speaker-diarization provider
- local pyannote Community-1 (`pyannote_local`) as an optional explicit fallback
- VoxVector alignment and evidence acquisition contracts

## Current Render activation

## 2026-09-02 wiring correction

The transcription adapter was implemented but the canonical Render blueprint installed only `api/requirements.txt`. That meant the production service could report a configured provider while `faster_whisper` itself was absent. The root cause was therefore deployment wiring, not the transcription contract.

The canonical Render blueprint now installs the speech dependency set used by the active service. Runtime package installation and provider readiness must be verified from the current deployment/build evidence rather than inferred from this historical wiring note.

Keep the existing Start Command:

`uvicorn api.app:app --host 0.0.0.0 --port $PORT`

## Required Render environment configuration

Transcription:

`VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`

`VOXVECTOR_WHISPER_MODEL=base`

`VOXVECTOR_WHISPER_DEVICE=cpu`

`VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`

`VOXVECTOR_WHISPER_BEAM_SIZE=1`

`VOXVECTOR_WHISPER_CPU_THREADS=1`

`VOXVECTOR_WHISPER_NUM_WORKERS=1`

`VOXVECTOR_WHISPER_ISOLATED_PROCESS=true`

`VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165`

The constrained `base` / CPU / int8 / beam 1 / one-thread / one-worker profile is the current source default for the repaired Render path. The model and resource settings remain explicitly configurable for larger deployments. The process timeout is intentionally shorter than the outer evidence-acquisition deadline so the child can terminate and return a bounded provider failure before the route-level deadline expires.

Current primary diarization configuration:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api`

`PYANNOTE_KEY=<protected pyannoteAI API key>`

The runtime also accepts `PYANNOTE_API_KEY` as the cloud-key alias.

Case-analysis invocation gate:

`VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`

This gate is separate from `/health` provider readiness. A runtime can report the cloud provider as configured/execution-ready while case analysis still does not invoke diarization if this gate is disabled.

Optional explicit local fallback:

`VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`

`VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`

`HF_TOKEN=<protected Hugging Face token>`

The local adapter also accepts `HUGGINGFACE_TOKEN`. Community-1 fallback is not the current primary deployment path and should not be used as the first production verification target.

Superseded local-primary reference retained for history only:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote`

`VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1`

Do not use the superseded local-primary block as current Render setup guidance.

Runtime memory reference:

`VOXVECTOR_MEMORY_LIMIT_MB=512`

This is a diagnostic reference only. It does not override Render's platform memory limit.

Memory admission reserve:

`VOXVECTOR_MEMORY_HEADROOM_MB=96`

On the 512 MiB reference budget, a heavyweight local provider phase is admitted only while measured process RSS is below **416 MiB**. This protects a reserve for allocator overhead, transient tensors, request state, and runtime activity. The cloud provider does not load the local Community-1 model into the Render process, but application/runtime resource behavior still requires measurement.

## Memory-safe execution behavior

The evidence-acquisition speech detector uses bounded frame groups rather than materializing a full-recording frame matrix. Heavy provider phases are serialized and checked against configured RSS admission where applicable. Provider caches are explicitly released after each attempt, including failed attempts, followed by Python garbage collection and best-effort Linux allocator trimming where applicable.

The case route drops the persisted byte buffer after SHA-256 integrity verification, retains the canonical audio signal as float32, executes upstream speech/evidence acquisition before downstream composite analysis, and therefore avoids intentionally overlapping downstream DSP working sets with local ASR model execution.

faster-whisper now runs in a disposable spawned process by default. The parent writes a temporary WAV, starts the child, waits up to `VOXVECTOR_WHISPER_TIMEOUT_SECONDS`, terminates then kills the child if the hard deadline is exceeded, closes IPC state, and removes the temporary WAV. This provides a terminable boundary around native ASR execution rather than relying only on coroutine cancellation around an in-process thread.

The runtime emits `VOXVECTOR_MEMORY` lines around heavyweight provider phases containing current Linux process RSS when available, phase duration, and the configured memory reference. This provides application evidence to correlate with Render infrastructure telemetry.

Render's memory limit applies to the service/container rather than independently to each child process. Process isolation therefore improves termination and reclamation behavior but is not, by itself, proof that a specific recording stays below the 512 MiB service ceiling. Real provider execution remains required.

## 2026-09-09 production transcription OOM evidence

Production revision `7d5a66fa406efde4abfd79361a4d589b5b75e6e0` processed request `6bb7ec766d3e46f39462ef92c9929544`. Render logged Stage 07 `transcription_generation` at `09:36:46Z`, faster-whisper start at `09:36:47Z`, and model load at `09:36:48Z` for a 183.3 second WAV. No transcription completion/failure/timeout record followed. Render then launched Uvicorn again at `09:37:05Z` and a new server process at `09:37:11Z`, consistent with the contemporaneous Render memory-limit automatic-restart alert.

The persisted run remained `running` because the process terminated before the prior in-process timeout/error path could store a terminal state. The repair in PR #942 adds persisted process identity/stage deadline metadata and case-read reconciliation so a prior worker's orphaned run can be marked explicitly interrupted or deadline-exceeded instead of remaining indefinitely active.

This is runtime execution evidence and software reliability work. It is not scientific validation.

## Verification state recorded for the local-primary phase

The earlier local-primary source wiring remains historical evidence. The current provider policy supersedes that selection with the cloud adapter as primary. Controlled provider execution and measured resource verification remain required before provider-backed pipeline stages are promoted beyond their current documented maturity.

## Health verification

After deployment, `/health` exposes non-secret speech runtime state including configured providers, adapter installation state, credential-presence booleans, primary/fallback readiness, current constrained transcription settings, process identity, and runtime provenance. Health does not expose credentials and does not prove a case actually invoked a provider.

For debugging, inspect these separately:

1. configured provider (`pyannote_api` expected for the current primary path)
2. cloud API-key presence/readiness
3. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` route gate
4. optional fallback provider/readiness
5. faster-whisper isolated-process/deadline configuration
6. actual case/run stage evidence and persisted provider provenance
7. Render instance lifecycle and memory telemetry for the same request window

## Controlled first execution

Use one short known WAV fixture and verify the active primary path in this order:

1. confirm the intended backend source revision and exact-commit QA evidence;
2. confirm faster-whisper is configured/execution-ready and reports the intended isolated-process/deadline profile;
3. confirm diarization primary is `pyannote_api` and primary readiness is true;
4. confirm `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime;
5. run the fixture through the authenticated case-analysis path;
6. verify pipeline stage order remains upstream-to-downstream and no later dependent stage is marked complete while transcription is still active;
7. verify faster-whisper returns timestamped transcript segments/words or reaches an explicit bounded failure without an API restart;
8. verify pyannoteAI cloud returns speaker turns when invoked, provider provenance identifies the cloud primary, and diarization artifacts persist under the same case/run;
9. verify the multimodal alignment artifact is produced from real transcript and speaker timing when both inputs exist;
10. capture provider duration, request/stage diagnostics, and relevant Render/runtime resource evidence;
11. repeat sequential execution to inspect stability and retained resource behavior;
12. only if fallback behavior itself must be tested, explicitly enable `pyannote_local` fallback and exercise a controlled primary-failure scenario; do not count fallback execution as proof of the primary cloud path.

The engineering-MVP release gate separately requires two complete golden-case executions on the same exact deployed revision. One successful provider call is not sufficient for that gate.

## Render observability operating procedure

Render logs and Live Tail remain the first-line runtime view. The repository-side GitHub Actions workflow captures service, deployment, log, and incident-window evidence through protected repository credentials. The authenticated Developer Console Render Runtime surface reads the separate server-side Render bridge.

Use infrastructure telemetry to correlate:

`provider start → provider completion/failure → persistence/readback → cleanup → instance lifecycle`

For local provider runs, also correlate memory rise and cleanup. Application provider duration remains the source of truth for provider execution time; Render timestamps remain infrastructure evidence.

## Scientific boundary

Successful transcription or diarization establishes software execution and provider output. It does not validate VoxVector deception inference. Provider confidence is not deception confidence, and speaker cluster labels are not verified real-world identities.

## pyannoteAI cloud provider and fallback policy — 2026-09-04

The runtime supports a cloud diarization path that does not require loading the local pyannote model into the Render process.

Primary cloud configuration:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api`

`PYANNOTE_KEY=<protected pyannoteAI API key>`

Optional model selection:

`VOXVECTOR_PYANNOTE_API_MODEL=<provider-supported model>`

Optional explicit local fallback:

`VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`

`VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`

`HF_TOKEN=<protected Hugging Face token>`

The cloud provider uploads normalized audio to pyannoteAI temporary media, submits a diarization job, polls for terminal status, and normalizes returned speaker turns into VoxVector evidence contracts. Results must be persisted immediately under the canonical case/run identity because provider job results are externally retained for a limited period. The local fallback is attempted only when explicitly enabled and the primary provider fails; the fallback event is recorded in provenance.

## Live analysis timeout and failure visibility — 2026-09-05, superseded in part 2026-09-09

The canonical case analysis route persists live stage boundaries before entering long-running work. The composite analysis boundary and provider-backed evidence acquisition retain configurable route-level deadlines: `VOXVECTOR_PIPELINE_TIMEOUT_SECONDS` (default 120 seconds) and `VOXVECTOR_EVIDENCE_ACQUISITION_TIMEOUT_SECONDS` (default 180 seconds). The previous implementation used `asyncio.wait_for(asyncio.to_thread(...))` around heavyweight provider work. That protected the waiting coroutine but could not terminate native work already running inside the background thread and could not persist a timeout if the API process was killed first.

For faster-whisper, the September 9 repair adds the separate hard process deadline `VOXVECTOR_WHISPER_TIMEOUT_SECONDS` (default 165 seconds) inside a disposable child process. The route-level 180 second deadline remains a second outer boundary. A production OOM can still terminate the service if the platform memory ceiling is exceeded, so persisted process identity and stale/deadline reconciliation are also required.

These controls improve operational observability and bounded execution. They do not establish scientific validation of any analysis output.

## Continue-after-failure pipeline policy — 2026-09-05

A failed or timed-out task is recorded on its own pipeline stage with its sanitized error and outcome, but orchestration continues only into work that does not depend on that failed output. Dependent stages are marked `not_run` with an explicit dependency reason rather than falsely reported as successful. Runs containing one or more stage failures finish as `completed_with_failures` when independent work and persistence can still complete. This preserves partial artifacts, stage visibility, diagnostics, and auditability without silently treating failure as success.
