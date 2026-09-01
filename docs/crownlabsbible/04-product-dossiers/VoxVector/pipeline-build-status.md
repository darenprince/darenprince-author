# VoxVector Pipeline Build Status

**Status date:** 2026-08-30

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## 21-stage build

VoxVector's canonical product architecture contains 21 stages from file intake through audit and provenance output.

Current engineering status:

- 14 stages have implemented runtime foundations.
- 4 stages are conditional or intentionally not invoked without required inputs.
- 3 stages remain queued for deeper runtime integration.
- All 21 stages are represented in the canonical backend stage contract.

The Developer Console dashboard now exposes the same matrix through an expandable 21-stage build control. The collapsed card identifies the current engineering stage. Expanding it lists all 21 stages with semantic build-state indicators.

Current engineering stage:

**Upload and intake reliability**

Next dependency:

**Real per-stage telemetry and lifecycle reporting.**

## Upload reliability hardening

The Developer Console audio intake path has been hardened after the reported upload failure.

Frontend intake now validates WAV filename, non-zero size, and the 250 MB ceiling before network activity. Upload lifecycle states distinguish uploading, server processing, completion, timeout, network failure, cancellation, and HTTP/API failure. Request correlation IDs are surfaced with upload errors.

The server storage adapter now checks existing Supabase media buckets before creation, tolerates normal bucket-creation races, accepts common WAV MIME variants, retries transient storage failures, rejects empty media objects, and enforces the configured media limit.

These changes improve operational reliability. They do not change the scientific interpretation of VoxVector measurements.

## QA status

The repository's VoxVector QA workflow runs the backend pytest suite and React production build. The latest known backend baseline recorded in the project decision log was **91 passed in 0.56s**, but that result predates the current upload/storage hardening and is therefore retained as historical baseline evidence rather than claimed as current QA.

The latest known GitHub Pages deployment associated with commit `4b922c10356c8c12aff96c719db0a6f23afc42d1` completed successfully, including production build and artifact verification.

A current post-hardening QA result and authenticated browser verification remain required before the upload path or complete console workflow is declared production-verified.

## Developer Console documentation contract

The dashboard, MVP build plan, pipeline build record, capability status, roadmap, and Crown Labs mirror must move together when the connected workflow changes.

Each substantive engineering change should record:

- current implementation state
- current engineering stage
- next dependency
- testing evidence
- unresolved verification
- affected documentation
- any historical records moved to archive

The operator dashboard is a projection of canonical engineering state, not a second source of truth.

## Engineering sequence

The immediate sequence is:

1. establish a reproducible upload/persistence pass;
2. complete secure browser playback verification;
3. instrument actual per-stage execution state;
4. build speaker and transcript stages;
5. expose normalized evidence records in the Analysis Workspace;
6. implement the validation and calibration gate before promoting inferential classification.

VoxVector documentation remains the technical authority; this document mirrors that status for Crown Labs.

## 2026-09-01 production milestone mirror

A real production case completed the connected operational path through source upload, private media persistence, case-bound analysis, and analysis completion. `/health`, `/v1/cases`, and `/v1/cases/{case_id}` returned `200 OK`, and the Render runtime emitted valid `VOXVECTOR_DIAGNOSTIC` events.

This changes the operational status of the configured upload and case-bound analysis workflow to **production executed**. It does not change the 21-stage implementation counts or scientific validation status.

## 2026-09-01 observability repair mirror

The Developer Console relational log failure was isolated to fractional `duration_ms` values being written to an integer `api_request_logs.duration_ms` column. The canonical backend now normalizes the relational value while retaining precise fractional timing in the immutable diagnostic archive. Regression coverage covers decimal, string, zero/sub-millisecond, null, and invalid values.

The next dependency is now the **post-analysis results and auditability layer**: completed Analysis Results, Review Evidence, full run/stage telemetry, and clear unavailable/skipped reasons, followed by speaker/transcript and evidence-workspace integration.
