# VoxVector Render + GitHub Actions Observability

**State date:** 2026-09-01

## Purpose

Provide a secure engineering bridge from GitHub Actions to the Render API without storing Render credentials in source, while keeping application-level VoxVector trace data as the authoritative source for analysis timing and workflow state.

## Secret boundary

The repository secret name is:

`RENDER_API_KEY`

The secret is consumed only inside the `Render Observability` GitHub Actions workflow. The key is never written into repository files, logs, artifacts, or VoxVector runtime responses.

## Workflow

`.github/workflows/render-observability.yml`

The workflow is manually dispatched with a Render service ID and optional log lookback window. It securely validates the secret, installs the Render CLI, retrieves service/deployment information, retrieves recent logs, emits a compact diagnostic summary, and stores the raw inspection files as a short-retention Actions artifact.

## Intended use

Use the workflow when diagnosing a deployed VoxVector service:

1. dispatch the workflow from GitHub Actions;
2. provide the target Render service ID;
3. inspect the workflow summary for service/deploy/log evidence;
4. download the short-lived artifact when deeper inspection is required;
5. correlate Render evidence with `VOXVECTOR_DIAGNOSTIC` and `VOXVECTOR_SPEECH` events using `request_id`, `trace_id`, and `analysis_run_id`.

## Timing truth

Render log timestamps are infrastructure timestamps. VoxVector uses application-side monotonic timers for durations and UTC timestamps for lifecycle ordering. These should be preferred when reporting stage and provider runtime duration.

## Current bridge limitation

The ChatGPT session does not have direct Render account access. The GitHub Actions workflow is therefore the repository-controlled integration point for Render inspection. It does not expose Render API credentials to the application.

## Next observability expansion

- Add deployment health assertions using Render service status and the VoxVector `/health` endpoint.
- Add a workflow mode that captures a controlled speech-runtime smoke test result.
- Add Render CPU and memory metrics when available through the account/API surface.
- Add centralized log streaming only after retention/search requirements justify the external service.
- Keep all secret handling outside application code and documentation.

## Scientific boundary

Infrastructure logs, provider timings, transcription output, diarization output, and execution traces establish software/runtime behavior only. They do not establish the validity of deception inference.
