# VoxVector Render Observability Runbook

**State date:** 2026-09-01

## Goal

Provide accurate runtime timing, progress correlation, live logs, deployment status, and infrastructure visibility for VoxVector speech-processing workloads.

## Application-side source of truth

Every structured VoxVector diagnostic v2 event carries:

- `request_id`
- `trace_id`
- `analysis_run_id` when an analysis execution trace is active
- UTC `timestamp`
- event name
- source revision
- pipeline version
- stage identity where applicable
- `duration_ms` where measured
- `progress_percent` where meaningful

Immutable diagnostic JSON keeps precise duration values. The relational `api_request_logs.duration_ms` projection remains integer-normalized for schema compatibility.

The application should never use Render's infrastructure timestamps as a substitute for stage timing. Render timestamps are correlation data; `perf_counter`-derived elapsed values remain the source for application duration measurements.

## Render Dashboard

Use the service Logs page and Live Tail for immediate debugging. Render supports filtering by time range, level, instance, method, status code, path, and text. HTTP request logs are available for Pro workspaces and higher. Render also exposes request correlation through its `requestID` / `Rndr-Id` mechanism. 

## Render CLI

The repository includes `scripts/render-observe.sh` as a repeatable wrapper.

After installing the current Render CLI and authenticating:

`render login`

select the VoxVector workspace, then:

`./VoxVector/scripts/render-observe.sh <service-id-or-name>`

or filter for a specific event/trace token:

`./VoxVector/scripts/render-observe.sh <service-id-or-name> analysis.stage_`

The Render CLI supports live tailing and filters for service/resource, instance, level, status code, HTTP method/path, time, task, and text.

## Render MCP

The official hosted Render MCP server is the preferred AI-operations integration when using a supported coding agent. It can inspect services, deploy history, logs, CPU/memory metrics, response metrics, and service configuration. The official endpoint is:

`https://mcp.render.com/mcp`

Current Render guidance supports OAuth in compatible integrations. The current ChatGPT tool session does not have the Render plugin/MCP connection installed, so repository changes are the maximum verified integration in this session.

## Centralized logs

Render can stream service logs to supported third-party destinations over TLS syslog or HTTPS. Better Stack is a supported syslog destination. Configure it from Render workspace Integrations → Observability → Log Streams, then use a dedicated source for VoxVector.

Centralized streaming improves retention and search, but does not create end-to-end tracing by itself. Keep VoxVector `request_id`, `trace_id`, and `analysis_run_id` in application logs.

## Metrics

Render metrics streaming is available to Pro workspaces and higher and can forward CPU, memory, instance, response-count, and response-latency metrics to supported observability providers. This is especially useful once faster-whisper and pyannote workloads are enabled because model execution may materially increase CPU and memory usage.

## Speech-run debugging sequence

1. Confirm `/health` reports the configured speech providers and package readiness.
2. Start Render Live Tail or the CLI helper before submitting the test recording.
3. Search/filter by the analysis request's `request_id`, `trace_id`, or `analysis_run_id`.
4. Confirm the sequence of `analysis.run_started`, stage start/complete/fail events, and `analysis.run_completed`.
5. Compare application `duration_ms` against Render CPU/memory observations.
6. Inspect model-loading events separately from steady-state inference time.
7. Treat transcription, diarization, and alignment output as provider evidence; do not interpret provider confidence as deception confidence.

## Cost discipline

Do not upgrade compute blindly. First measure actual speech-runtime memory and duration on a short controlled WAV. Render's current compute catalog includes memory-optimized web-service plans, and existing legacy plan names remain supported. 

The first controlled benchmark should capture:

- audio duration
- model size
- CPU
- peak memory
- wall-clock duration
- transcription duration
- diarization duration
- alignment duration
- failure/retry behavior

## Current state

The repository has the application-side tracing foundation and a Render operator helper. The remaining external setup is authenticating Render MCP/CLI and, optionally, configuring an external log stream destination. Production speech execution remains an explicit verification gate.
