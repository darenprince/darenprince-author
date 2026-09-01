# VoxVector Documentation Alignment — 2026-09-01

## Purpose

Record the cross-document synchronization performed after the successful 2026-09-01 production upload and analysis execution and the isolated Developer Console observability defect.

## Production evidence digest

Observed production execution completed:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Observed responses/events:

- `GET /health` → `200 OK`
- `GET /v1/cases` → `200 OK`
- `GET /v1/cases/{case_id}` → `200 OK`
- `VOXVECTOR_DIAGNOSTIC` events emitted by the Render runtime
- successful production source upload and private media persistence
- successful completion of the configured case-bound analysis path

## Observability finding and repair

The remaining Developer Console relational-log problem was isolated to `public.api_request_logs.duration_ms`, an integer field receiving fractional diagnostic durations such as `9339.07`, `0.26`, `635.3`, and `597.92` milliseconds.

The canonical implementation now normalizes the value at the relational projection boundary while retaining the original fractional precision in immutable diagnostic Storage records.

Regression coverage in `VoxVector/tests/test_observability.py` covers decimal values, numeric strings, zero/sub-millisecond values, null values, and invalid values.

## Engineering maturity update

The following operational capabilities have now crossed the production execution boundary for the observed configured path:

- case creation and retrieval
- WAV source intake
- private media persistence
- PCM WAV processing path
- case-bound analysis execution
- diagnostic emission

These are operational/runtime findings only. They are not scientific validation and do not establish that any individual vocal or acoustic measurement indicates deception.

The 21-stage capability counts remain:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked without required inputs
- 3 queued for deeper runtime integration

## New engineering priority

The primary blocker moves from basic upload reliability to the **post-analysis experience**.

Required sequence:

1. completed Analysis Results contract;
2. Review Evidence entry point after analysis completion;
3. full analysis audit timeline with timestamps, durations, stage outcomes, warnings, errors, and unavailable/skipped reasons;
4. real per-stage lifecycle telemetry in the Developer Console;
5. speaker identification/diarization and production transcription;
6. transcript/audio alignment;
7. real analytical tracks and normalized evidence;
8. evidence synthesis;
9. assessment/reporting;
10. broader production and scientific validation program.

## Updated canonical records

- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/STORAGE_AND_OBSERVABILITY.md`
- `VoxVector/docs/audits/SYSTEM_ARCHITECTURE_AND_OBSERVABILITY_2026-09-01.md`
- `VoxVector/docs/DOCS_ALIGNMENT_2026-09-01.md`

Updated Crown Labs mirrors:

- `docs/crownlabsbible/04-product-dossiers/VoxVector/current-engineering-state-2026-08-30.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/pipeline-build-status.md`

The existing `PROJECT_DECISION_LOG.md` entry from 2026-09-01 remains the historical decision record for the observability projection architecture. This dated alignment record captures the subsequent production execution evidence and maturity transition.

## Verification boundary

This alignment reflects production evidence described by the repair-cycle runtime logs and source inspection. The repaired relational projection still requires deployment-level confirmation that real traffic creates rows in `api_request_logs` and `error_reports` and that the deployed Developer Console renders them. Browser playback and full end-to-end browser verification remain separate verification tasks. Scientific validation remains outstanding.
