# VoxVector Render + GitHub Actions Observability

**State date:** 2026-09-02

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

The workflow supports manual dispatch and a controlled push-triggered inspection when the workflow itself changes. It resolves the Render workspace, validates the protected credentials, installs the current Render CLI, retrieves service and deployment information, retrieves recent logs, and for the current incident investigation captures a fixed 2026-09-02 02:00–02:30 UTC log window plus Render memory telemetry at 30-second resolution. Raw inspection files are stored as a short-retention Actions artifact.

The workflow had to be hardened against three CLI/runtime details observed during the first controlled investigation: the CLI installer path is `/home/runner/.local/bin`, a workspace must be selected before non-interactive service queries, and current `render logs` uses `--resources`, `--start`, and `--end` rather than the earlier `--since` form.

## Incident evidence — 2026-09-02

The connected VoxVector Render service is operating on a **512 MB RAM** free web-service budget. Incident-window telemetry recorded memory rising from approximately 94.9 MB at 02:10:00 UTC to 193.5 MB at 02:10:30, 197.0 MB at 02:11:00, 198.3 MB at 02:11:30, and 198.5 MB at 02:12:00 and 02:12:30. At 02:13:00 it dropped to approximately 73.6 MB and then stabilized around 89–93 MB.

This is strong runtime evidence of a lifecycle discontinuity consistent with the Render-reported restart. It is not sufficient to identify the exact root cause because the highest sampled value remained below the 512 MB budget and the memory series has 30-second resolution.

The same time period contained slow `/v1/cases` requests around 10.35 seconds and 8.11 seconds, which are separate reliability signals. They should be correlated with application diagnostics before attribution.

The first successful incident capture produced Actions artifact `9829899743` from workflow run `33585450916`.

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
- Add Render CPU metrics alongside the memory capture when available through the account/API surface.
- Add controlled repeated speech-provider execution profiling.
- Add centralized log streaming only after retention/search requirements justify the external service.
- Keep all secret handling outside application code and client bundles.

## Scientific boundary

Infrastructure logs, provider timings, transcription output, diarization output, and execution traces establish software/runtime behavior only. They do not establish the validity of deception inference.
