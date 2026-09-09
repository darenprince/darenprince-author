# VoxVector Speech Runtime Deployment

**State date:** 2026-09-04

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

`VOXVECTOR_WHISPER_BEAM_SIZE=3`

The constrained `base` / CPU / int8 / beam 3 profile is the current documented Render profile. The model and beam remain explicitly configurable for larger deployments.

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

The evidence-acquisition speech detector uses bounded frame groups rather than materializing a full-recording frame matrix. Heavy provider phases are serialized in-process and checked against configured RSS admission where applicable. Provider caches are explicitly released after each attempt, including failed attempts, followed by Python garbage collection and best-effort Linux allocator trimming.

The runtime emits `VOXVECTOR_MEMORY` lines around heavyweight provider phases containing current Linux process RSS when available, phase duration, and the configured memory reference. This provides application evidence to correlate with Render infrastructure telemetry.

## Verification state recorded for the local-primary phase

The earlier local-primary source wiring remains historical evidence. The current provider policy supersedes that selection with the cloud adapter as primary. Controlled provider execution and measured resource verification remain required before provider-backed pipeline stages are promoted beyond their current documented maturity.

## Health verification

After deployment, `/health` exposes non-secret speech runtime state including configured providers, adapter installation state, credential-presence booleans, primary/fallback readiness, and runtime provenance. Health does not expose credentials and does not prove a case actually invoked a provider.

For debugging, inspect these separately:

1. configured provider (`pyannote_api` expected for the current primary path)
2. cloud API-key presence/readiness
3. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` route gate
4. optional fallback provider/readiness
5. actual case/run stage evidence and persisted provider provenance

## Controlled first execution

Use one short known WAV fixture and verify the active primary path in this order:

1. confirm the intended backend source revision and exact-commit QA evidence;
2. confirm faster-whisper is configured/execution-ready;
3. confirm diarization primary is `pyannote_api` and primary readiness is true;
4. confirm `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime;
5. run the fixture through the authenticated case-analysis path;
6. verify faster-whisper returns timestamped transcript segments/words and those artifacts persist under the case/run;
7. verify pyannoteAI cloud returns speaker turns, provider provenance identifies the cloud primary, and diarization artifacts persist under the same case/run;
8. verify the multimodal alignment artifact is produced from real transcript and speaker timing;
9. capture provider duration, request/stage diagnostics, and relevant Render/runtime resource evidence;
10. repeat sequential execution to inspect stability and retained resource behavior;
11. only if fallback behavior itself must be tested, explicitly enable `pyannote_local` fallback and exercise a controlled primary-failure scenario; do not count fallback execution as proof of the primary cloud path.

## Render observability operating procedure

Render logs and Live Tail remain the first-line runtime view. The repository-side GitHub Actions workflow captures service, deployment, log, and incident-window evidence through protected repository credentials. The authenticated Developer Console Render Runtime surface reads the separate server-side Render bridge.

Use infrastructure telemetry to correlate:

`provider start → provider completion/failure → persistence/readback → cleanup → instance lifecycle`

For local fallback runs, also correlate memory rise and cleanup. Application provider duration remains the source of truth for provider execution time; Render timestamps remain infrastructure evidence.

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

## Live analysis timeout and failure visibility — 2026-09-05

The canonical case analysis route now persists the live stage boundary before entering long-running work. The composite analysis boundary and provider-backed evidence acquisition have configurable server-side deadlines: `VOXVECTOR_PIPELINE_TIMEOUT_SECONDS` (default 120 seconds) and `VOXVECTOR_EVIDENCE_ACQUISITION_TIMEOUT_SECONDS` (default 180 seconds). On timeout, VoxVector records the failed stage, request ID, timeout context, persisted run state, and a diagnostic event, then returns HTTP 504 instead of leaving the client indefinitely waiting. The frontend error formatter surfaces the message, failed stage, error type when available, and request ID. These controls improve operational observability; they do not imply cancellation of already-running background worker threads or scientific validation of any analysis output.

## Continue-after-failure pipeline policy — 2026-09-05

A failed or timed-out task is recorded on its own pipeline stage with its sanitized error and outcome, but the orchestration continues into later stages that do not depend on that failed output. Dependent stages are marked `not_run` with an explicit dependency reason rather than being falsely reported as successful. Runs containing one or more stage failures finish as `completed_with_failures` when independent work and persistence can still complete. This preserves partial artifacts, stage visibility, diagnostics, and auditability without silently treating failure as success.
