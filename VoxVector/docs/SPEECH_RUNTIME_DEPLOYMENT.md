# VoxVector Speech Runtime Deployment

**State date:** 2026-09-02

## Purpose

Deploy the optional open-source speech intelligence runtime without weakening the lightweight base API deployment or exhausting the constrained Render memory budget.

## Runtime components

- faster-whisper for transcription
- pyannote Community-1 for speaker diarization
- VoxVector alignment and evidence acquisition contracts

## Current Render activation

The repository contains a separate `api/requirements-speech.txt` so the current lightweight Render service is not forced to install heavy speech ML dependencies during ordinary API builds.

To activate speech processing on the target Render service, the Build Command must install both sets of dependencies. Use the repository root configured for the VoxVector API and run:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

Keep the existing Start Command:

`uvicorn api.app:app --host 0.0.0.0 --port $PORT`

## Required Render environment configuration

Transcription:

`VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`

`VOXVECTOR_WHISPER_MODEL=base`

`VOXVECTOR_WHISPER_DEVICE=cpu`

`VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`

`VOXVECTOR_WHISPER_BEAM_SIZE=3`

The default `base` + CPU `int8` profile is the constrained-runtime default. A larger-memory deployment can override the model and beam settings explicitly.

Diarization:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote`

`VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1`

Credential:

`HF_TOKEN` must contain the Hugging Face access token accepted for the gated Community-1 model. The secret is configured in Render and is never stored in GitHub documentation.

Runtime memory telemetry:

`VOXVECTOR_MEMORY_LIMIT_MB=512`

This value is used as a diagnostic reference for the constrained Render service and does not override the platform memory limit.

## Memory-safe execution behavior

Heavy provider execution is serialized in-process so two provider/model allocations are not intentionally active at the same time. Provider caches are explicitly released after each attempt, followed by garbage collection and best-effort allocator trimming. The evidence acquisition speech detector also processes bounded frame groups instead of materializing all audio frames at once.

The runtime emits `VOXVECTOR_MEMORY` lines around heavy provider phases containing current Linux RSS when available, elapsed duration, and the configured reference budget. These records are infrastructure/runtime evidence and do not represent analytical results.

## Health verification

After deployment, `/health` exposes a non-secret `speech_runtime` object containing:

- configured transcription provider
- whether the faster-whisper package is installed
- configured diarization provider
- whether pyannote.audio is installed
- whether the Hugging Face token variable is present

The health check does not load models and does not expose credentials.

## Controlled first execution

Do not immediately promote a long recording to production validation. First process a short known WAV fixture and verify:

1. transcription provider state becomes `completed`;
2. transcript segments and word timestamps are present;
3. diarization provider state becomes `completed`;
4. speaker segments are returned;
5. the multimodal alignment artifact is produced;
6. the case run persists acquisition artifacts;
7. provider execution duration and `VOXVECTOR_MEMORY` boundaries are recorded;
8. repeated sequential provider runs do not show unbounded retained memory;
9. failures degrade to explicit `unavailable` state when a provider cannot run.

## Render observability operating procedure

Render's built-in logs and Live Tail remain the first-line runtime view. The current Render CLI supports `render logs --tail` plus filters for resource, instance, level, status code, method, path, and text; this is the preferred active-debug workflow during deployments and speech-model execution.

The repository-side GitHub Actions workflow captures Render service/deployment/log evidence and a fixed memory incident window using protected repository credentials. The deployed Developer Console uses the separate server-side Render bridge when the Render runtime secrets are configured.

### Centralized log streaming

Render can stream supported service logs to third-party observability providers over TLS syslog or HTTPS. Better Stack is a supported syslog destination and can be configured from Render's workspace Integrations → Observability → Log Streams area.

For VoxVector, centralized streaming is a retention/search enhancement, not a substitute for the application's trace model. Every VoxVector event should carry `request_id`, `trace_id`, and `analysis_run_id` so an external system can correlate the complete run. Log streaming alone does not create end-to-end tracing.

### Metrics

Render service metrics provide infrastructure CPU/memory evidence. The controlled speech runtime should be profiled at provider boundaries rather than inferred from application progress animation.

## Scientific boundary

A successful transcription or diarization run proves software execution and provider output. It does not validate VoxVector deception inference. Provider confidence is not truth confidence, and speaker cluster labels are not verified real-world identities.

## Current configuration record

The Hugging Face token and required Community-1 access acceptance have been reported as complete in Render. Repository-side verification of the secret value is intentionally impossible and is not required. Actual provider execution remains a deployment/runtime verification gate.
