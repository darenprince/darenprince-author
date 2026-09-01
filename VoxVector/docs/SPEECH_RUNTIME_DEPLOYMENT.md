# VoxVector Speech Runtime Deployment

**State date:** 2026-09-01

## Purpose

Deploy the optional open-source speech intelligence runtime without weakening the lightweight base API deployment.

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

`VOXVECTOR_WHISPER_MODEL=small`

`VOXVECTOR_WHISPER_DEVICE=cpu`

`VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`

Diarization:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote`

`VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1`

Credential:

`HF_TOKEN` must contain the Hugging Face access token accepted for the gated Community-1 model. The secret is configured in Render and is never stored in GitHub documentation.

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
7. runtime duration and memory behavior are recorded;
8. failures degrade to explicit `unavailable` state when a provider cannot run.

## Render observability operating procedure

Render's built-in logs and Live Tail remain the first-line runtime view. The current Render CLI supports `render logs --tail` plus filters for resource, instance, level, status code, method, path, and text; this is the preferred active-debug workflow during deployments and speech-model execution.

Render's hosted MCP server can expose live service logs, deploy history, CPU/memory metrics, HTTP response metrics, service configuration, and deploy actions to a compatible coding agent. Render currently recommends the hosted MCP endpoint and supports OAuth in current agent integrations.

The current ChatGPT tool session does not have the Render plugin/MCP connection installed, so no Render service configuration or deploy action is asserted as completed from this repository session. The repository-side instrumentation is ready for that connection.

### Recommended operator setup

Use the official Render plugin for Codex/ChatGPT or another supported coding agent and authorize the Render workspace. Verify the integration with workspace/service listing before allowing deploy or environment-variable mutation.

For local CLI operations, install/upgrade the Render CLI, run `render login`, select the VoxVector workspace, then use `render logs --tail` for live debugging. For automation, Render documents `RENDER_API_KEY` for non-interactive CLI use.

### Centralized log streaming

Render can stream supported service logs to third-party observability providers over TLS syslog or HTTPS. Better Stack is a supported syslog destination and can be configured from Render's workspace Integrations → Observability → Log Streams area.

For VoxVector, centralized streaming is a retention/search enhancement, not a substitute for the application's trace model. Every VoxVector event should carry `request_id`, `trace_id`, and `analysis_run_id` so an external system can correlate the complete run. Log streaming alone does not create end-to-end tracing.

### Metrics

Render metrics streaming is available to Pro workspaces and higher. It can forward CPU, memory, instance, response-count, and response-latency metrics to supported providers. This becomes valuable once Whisper/pyannote workloads are running and we need empirical memory/latency data.

## Scientific boundary

A successful transcription or diarization run proves software execution and provider output. It does not validate VoxVector deception inference. Provider confidence is not truth confidence, and speaker cluster labels are not verified real-world identities.

## Current configuration record

The user has reported that the Hugging Face token and required Community-1 access acceptance are complete in Render. Repository-side verification of the secret value is intentionally impossible and is not required. Actual provider execution remains a deployment/runtime verification gate.
