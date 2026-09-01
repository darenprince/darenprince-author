# VoxVector Documentation Alignment — 2026-09-01

## Purpose

Record the current cross-document synchronization after the production analysis milestone, current QA evidence, Developer Console status hardening, Analysis Results / Review Evidence work, stage telemetry foundation, and the canonical composed results envelope.

## Current repository state

The current engineering branch is `main`.

The current product architecture remains:

`GitHub Pages React frontend → FastAPI on Render → canonical VoxVector engine → Supabase persistence/diagnostics/private media`

Historical systems and stale deployment instructions remain historical and do not define the active architecture.

## Current verification boundary

Current source changes after the previously verified `f2b31243c07fc466892693d2ff6aaf8038e413cc` commit require their own workflow result before the current source revision is recorded as CI-green. Current GitHub Actions status is the authoritative verification source for the exact commit.

Production browser verification, relational diagnostic proof, and scientific validation remain separate gates.

## Production execution evidence retained

The configured production path has demonstrated:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Observed production requests included `/health`, `/v1/cases`, and `/v1/cases/{case_id}` with successful responses, and the Render runtime emitted `VOXVECTOR_DIAGNOSTIC` records.

These are operational execution findings only, not scientific validation.

## Current implementation changes

### Developer Console status

The engineering status subsystem queries GitHub Actions for `main` workflow evidence using the runtime source revision and marks a workflow result `STALE` when its commit differs from the current backend revision.

The Console continues to separate BUILT, FUNCTIONAL, TESTED, and VALIDATED states.

### Analysis Results / Review Evidence

The Analysis Workspace surfaces the persisted run result after analysis completion, including eligibility, candidate state, disposition, evidence, observations, limitations, provenance, and run/source identity.

### Stage telemetry foundation

`VoxVector/src/voxvector/stage_telemetry.py` provides a persistence-neutral lifecycle recorder with real monotonic timing, UTC lifecycle timestamps, explicit running/completed/failed/not-run/pending states, outcomes, errors, deterministic snapshots, and transition guards. Unit coverage is in `VoxVector/tests/test_stage_telemetry.py`.

This recorder is an implemented utility, not a claim that every internal `VoxVectorPipeline` computation is already independently timed. The next integration step is to connect it to actual stage boundaries and persist those measurements.

### Canonical results envelope

`VoxVector/src/voxvector/results_envelope.py` now composes a single post-analysis envelope from the connected case, source, run, and engine result. The envelope preserves identity and provenance while explicitly representing unavailable downstream families such as transcript, alignment, tracks, reports, uncertainty, or assessment. It does not invent measurements or validation.

Regression coverage is in `VoxVector/tests/test_results_envelope.py`.

## Current 21-stage state

The product pipeline remains 21 stages:

- 14 implemented runtime foundations;
- 4 conditional or intentionally not invoked without required inputs;
- 3 queued for deeper integration.

The stage model is persisted. Granular internal timing is partially implemented through the telemetry utility but is not yet wired into every pipeline boundary.

## Current engineering priority

1. Wire `StageTelemetry` into the actual analytical stage execution boundaries and persist the resulting lifecycle records.
2. Connect `compose_result_envelope()` to the canonical case-analysis response path.
3. Expand Review Evidence into an evidence explorer and audio-linked timeline.
4. Prove relational diagnostic rows and Developer Console rendering in the deployed environment.
5. Implement speaker identification/diarization.
6. Implement production transcription and transcript/audio alignment.
7. Add real analytical tracks and richer normalized evidence relationships.
8. Build evidence synthesis, assessment, reporting, and history/reopen.
9. Complete authenticated browser end-to-end verification.
10. Execute the scientific validation program.

## Active canonical records synchronized in this cycle

- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/UI_APPLICATION_ARCHITECTURE.md`
- `VoxVector/docs/SYSTEM_STATE_REPORT.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/audits/FULL_AUTO_SYSTEM_AUDIT_2026-09-01.md`
- `VoxVector/docs/DOCS_ALIGNMENT_2026-09-01.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/full-auto-system-audit-2026-09-01.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/current-engineering-state-2026-08-30.md`

## Version truth

Current documented runtime versions are backend `0.2.26`, frontend `0.2.36`, and engine result schema `0.3`.

Historical decision records remain preserved for traceability and are not treated as current dependency or runtime truth when superseded by the active implementation.
