# VoxVector Render + GitHub Actions Observability

**State date:** 2026-09-01

## Purpose

Provide a secure engineering bridge from GitHub Actions to the Render API without storing Render credentials in source, while keeping application-level VoxVector trace data as the authoritative source for analysis timing and workflow state.

## Secret boundary

The repository secret names are:

`RENDER_API_KEY`

`RENDER_SERVICE_ID`

`RENDER_API_KEY` is consumed only inside the `Render Observability` GitHub Actions workflow. `RENDER_SERVICE_ID` identifies the default Render service inspected by that workflow.

Neither value is written into repository files, frontend code, case artifacts, or diagnostic responses.

## Workflow

`.github/workflows/render-observability.yml`

The workflow is manually dispatched with an optional Render service-ID override and log lookback window. Without an override, the repository `RENDER_SERVICE_ID` secret is used. It validates the API key and service ID, installs the Render CLI, retrieves service/deployment information, retrieves recent logs, emits a compact diagnostic summary, and stores the raw inspection files as a short-retention Actions artifact.

## Intended use

Use the workflow when diagnosing a deployed VoxVector service:

1. dispatch the workflow from GitHub Actions;
2. confirm the repository secrets are available to the workflow;
3. use the repository `RENDER_SERVICE_ID` or provide a controlled override;
4. inspect the workflow summary for service/deploy/log evidence;
5. download the short-lived artifact when deeper inspection is required;
6. correlate Render evidence with `VOXVECTOR_DIAGNOSTIC` and `VOXVECTOR_SPEECH` events using `request_id`, `trace_id`, and `analysis_run_id`.

## Developer Console bridge

The authenticated Developer Console also has a server-side Render bridge:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

This bridge reads protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the **Render service runtime environment**, not from GitHub Actions. GitHub repository secrets are not automatically injected into the Render process. Therefore the same two protected variables must be configured separately in Render for the Developer Console Render Runtime panel to return live service data.

The browser never receives the Render API credential.

## Timing truth

Render log timestamps are infrastructure timestamps. VoxVector uses application-side monotonic timers for durations and UTC timestamps for lifecycle ordering. These should be preferred when reporting stage and provider runtime duration.

## Current bridge limitations

The ChatGPT session does not have direct Render account access. GitHub Actions provides a repository-controlled infrastructure inspection path, while the deployed server-side bridge provides the authenticated Developer Console integration.

Neither bridge is a substitute for application-level lifecycle telemetry. The current composite pipeline still lacks complete internal callbacks, so the console must not fabricate granular stage durations.

## Next observability expansion

- Add deployment health assertions using Render service status and the VoxVector `/health` endpoint.
- Add a workflow mode that captures a controlled speech-runtime smoke test result.
- Add Render CPU and memory metrics when available through the account/API surface.
- Add centralized log streaming only after retention/search requirements justify the external service.
- Keep all secret handling outside application code and client bundles.

## Scientific boundary

Infrastructure logs, provider timings, transcription output, diarization output, and execution traces establish software/runtime behavior only. They do not establish the validity of deception inference.
