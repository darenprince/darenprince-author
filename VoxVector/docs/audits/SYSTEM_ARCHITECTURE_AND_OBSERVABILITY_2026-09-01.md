# VoxVector System Architecture and Observability Audit

**Audit date:** 2026-09-01  
**Status:** Production case workflow successfully executed; relational projection repair implemented; deployed verification of the repaired projection remains pending

## Scope

This audit records the repaired production workflow, the observability failure isolated from that run, the canonical source repair, and the next engineering boundary.

## Production execution evidence

A real production case completed the connected operational workflow:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Observed production behavior included:

- `GET /health` → `200 OK`
- `GET /v1/cases` → `200 OK`
- `GET /v1/cases/{case_id}` → `200 OK`
- valid `VOXVECTOR_DIAGNOSTIC` events emitted by the Render runtime
- source upload and private media persistence completed successfully
- case-bound analysis executed to completion

This is an engineering/runtime milestone. It is not scientific validation and does not promote any individual signal or method to a validated deception indicator.

## Observability defect isolated

Production Render logs showed that application requests and analysis execution were succeeding while the relational projection into `public.api_request_logs` failed because diagnostic duration values retained fractional milliseconds while the existing database column is integer.

Examples observed in production diagnostic output included:

- `9339.07` ms
- `0.26` ms
- `635.3` ms
- `597.92` ms

The immutable diagnostic record retains fractional precision. The relational projection now normalizes the value through `_duration_ms_for_projection()`:

- `9339.07` → `9339`
- `0.26` → `0`
- `"635.3"` → `635`
- `None` → `None`
- invalid values → `None`

## Source repair

The canonical implementation in `VoxVector/api/observability.py` now:

1. emits sanitized diagnostics to Render stdout;
2. projects lifecycle events into `public.api_request_logs`;
3. projects error events into `public.error_reports`;
4. normalizes fractional duration values to the existing integer schema at the projection boundary;
5. preserves the original precise duration in the immutable Storage event record;
6. retains Storage archive fallback behavior for diagnostic reads.

Regression coverage in `VoxVector/tests/test_observability.py` explicitly covers decimal durations, string duration values, zero/sub-millisecond values, null values, and invalid values.

## Architecture findings

### Public application boundary — verified

`voxvector/` is the React/Vite public application. GitHub Actions builds and deploys the public artifact through GitHub Pages.

### API boundary — verified

`VoxVector/` contains the canonical FastAPI adapter and analysis-engine workspace. Render hosts the API runtime.

### Persistence boundary — verified

Supabase provides the private media and diagnostics storage boundary. Audio is not durably stored on Render.

### Observability model

The active observability path is:

`analysis lifecycle`

`├─ Render stdout → VOXVECTOR_DIAGNOSTIC`

`├─ Supabase Storage → immutable sanitized event archive`

`├─ public.api_request_logs → lifecycle relational projection`

`└─ public.error_reports → error relational projection`

The relational tables provide the Developer Console query surface. Storage remains the immutable diagnostic archive.

## Engineering state after milestone

| Area | Current state |
|---|---|
| Case creation | Production working |
| Audio upload | Production working |
| Private media persistence | Production working |
| PCM WAV intake | Production working |
| Case-bound analysis | Production executed successfully |
| Diagnostic emission | Production working |
| Storage diagnostic archive | Production observed working |
| Duration projection repair | Implemented and regression tested |
| Relational request log projection | Repaired in source; deployed verification pending |
| Analysis Results workflow | Next implementation phase |
| Full analysis audit timeline | Next implementation phase |
| 21-stage pipeline | Partial implementation |
| Scientific validation | Not established by this run |

## Next verification

The next production verification is narrow and targeted:

1. run traffic against the deployed revision containing the duration projection repair;
2. confirm new `api_request_logs` rows are created;
3. confirm `error_reports` rows are created when real error events occur;
4. confirm Live Logs and Error Reports display real relational records in the Developer Console;
5. confirm immutable Storage diagnostics remain present.

## Next engineering phase

With upload and analysis no longer the primary blocker, the product path now moves to the post-analysis experience:

`Analysis complete → Review Evidence / Analysis Results`

The completed-analysis surface should expose:

- completion status
- structured analysis result
- stage-by-stage state
- successful stages
- unavailable, not implemented, conditional, and skipped stages with reasons
- evidence generated by implemented stages
- warnings and errors
- uncertainty, limitations, and alternative explanations
- provenance and timestamps

The full analysis log should provide an auditable lifecycle timeline from case creation through analysis completion, including timestamps, durations, outputs, warnings, and failure details.

## Verification boundary

This audit incorporates production evidence from the 2026-09-01 repair cycle and source-level confirmation of the projection fix. It does not claim that the repaired relational projection has already been observed after redeployment, does not claim browser verification of every frontend path, and does not claim scientific validation of deception inference.
