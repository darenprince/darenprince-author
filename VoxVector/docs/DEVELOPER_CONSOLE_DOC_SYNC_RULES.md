# Developer Console Documentation Synchronization Rules

**Status:** Canonical active instruction
**Effective:** 2026-08-30

This document supplements the general VoxVector editing workflow with the specific synchronization requirements for the Developer Console and connected MVP workflow.

## Required synchronization

When a Developer Console feature, API workflow, pipeline stage, task, diagnostic surface, or user workflow changes, the agent must evaluate and update the relevant current records before calling the work complete.

At minimum, evaluate:

- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/ANALYSIS_PIPELINE.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/`

## Dashboard synchronization

The Developer Console dashboard is an operator-facing projection of canonical engineering state.

It must not invent progress. Build counts, current engineering stage, QA state, dependencies, and stage status must be derived from the documented implementation state or a real API response.

The 21-stage build card must remain aligned with:

- the canonical 21 stage identifiers;
- the backend stage definitions;
- the current build-status matrix;
- the documented implementation/conditional/queued states.

The collapsed dashboard card must identify the current engineering stage and next dependency. The expanded card must list all 21 stages with semantic state indicators.

## Engineering status semantics

The console must distinguish engineering states rather than treating a successful build as proof of functionality.

Use these independent dimensions wherever applicable:

- **BUILT** — source implementation compiles or exists in the intended canonical owner.
- **FUNCTIONAL** — the implemented workflow has executed successfully with its required runtime inputs.
- **TESTED** — an actual automated or manual test has passed for the behavior being reported.
- **VALIDATED** — the relevant scientific, operational, or performance validation has actually been completed and documented.
- **CONDITIONAL** — the behavior requires inputs or conditions not currently supplied.
- **NOT INVOKED** — the stage is intentionally not executed by the current workflow.
- **QUEUED** — the capability is represented in the architecture but deeper runtime integration remains outstanding.
- **FAILED** — an execution or verification attempt failed.
- **BLOCKED** — work cannot proceed because a documented dependency or environment constraint remains.

A green build must never automatically produce a green FUNCTIONAL or VALIDATED state.

## Main dashboard stats

Primary dashboard statistics must use consistent all-caps labels and semantic status treatment.

Required primary categories are:

- **API** — current health/reachability state.
- **RUNTIME** — runtime self-test or operational state.
- **PIPELINE** — 21-stage implementation and execution state.
- **QA** — current test/build verification state.

Each primary stat should have a meaningful icon and color-coded status. Color is supplementary; the text state must remain explicit and accessible.

## QA checks

QA checks must expose more than a single historical test count. Where data exists, the console should distinguish:

- backend tests
- frontend production build
- runtime self-test
- upload contract
- case creation
- source persistence
- secure playback
- case-bound analysis
- pipeline execution
- browser/E2E verification
- deployment/artifact verification
- scientific validation

Historical baselines must be explicitly labeled **HISTORICAL** and must never be displayed as current QA.

## Current engineering state

The dashboard must expose enough detail to answer:

1. What is the current engineering stage?
2. What is its BUILD state?
3. What is its FUNCTIONAL state?
4. What TEST evidence exists?
5. What VALIDATION evidence exists?
6. What is blocked or still unverified?
7. What is the next dependency?
8. Which source files, workflow, commit, and documentation establish the status?

## Source traceability

Every material dashboard status should have a traceable source when a repository or workflow source exists.

The operator-facing trace should support:

`GitHub → repository path → workflow → commit → artifact/deployment`

Where applicable, expose:

- clickable GitHub source/documentation link;
- exact repository path;
- commit SHA;
- workflow name or run reference;
- artifact/deployment reference;
- copy-to-clipboard control;
- copied confirmation feedback.

The trace is evidence of provenance, not evidence that the underlying capability is scientifically validated.

## Workflow synchronization

Every substantive workflow must refresh or invalidate the relevant dashboard status data after a state-changing event. At minimum, case creation, upload, persistence, playback preparation, analysis execution, diagnostics, and deployment verification must not leave stale operator statistics displayed.

The preferred state flow is:

`SOURCE → COMMIT → WORKFLOW → TEST RESULT → ARTIFACT/DEPLOYMENT → RUNTIME STATUS → CONSOLE`

If a workflow cannot update a downstream status automatically, the limitation must be documented rather than simulated.

## Editing workflow synchronization

Every substantive change must leave the project understandable to the next engineer.

Record:

1. the task completed;
2. the actual canonical owner;
3. the current implementation state;
4. the tests that actually ran;
5. the verification still required;
6. the current engineering stage;
7. the next engineering dependency;
8. documentation surfaces synchronized;
9. any historical document moved to archive.

## Feature implementation status

Use distinct labels for:

- implemented
- integrated
- conditional
- queued
- not invoked
- failed
- blocked
- planned research
- validated inferential
- retired

Do not mark a stage complete merely because its UI exists.

## Audio workflow gate

The connected case workflow remains:

`create case → select compatible WAV → upload → persist source → secure playback → run analysis → inspect stage state → Analysis Workspace`

The upload path must be verified independently before downstream presentation is described as operational.

## Documentation lifecycle

Active documents describe current behavior.

Historical documents preserve traceability.

Superseded records may be archived only after reviewing what information they contain and ensuring that required behavior or decisions are represented in the current canonical documents.

Never archive a document merely because its filename looks old or inconvenient.

## Verification rule

A repository write is not verification.

For substantive changes, build/test/browser verification must be performed when available. If a protected authenticated path cannot be exercised in the available environment, record that limitation explicitly rather than claiming success.
