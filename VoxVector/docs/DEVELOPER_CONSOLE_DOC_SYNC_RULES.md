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

The collapsed dashboard card must identify the current engineering stage and the next dependency. The expanded card must list all 21 stages with semantic state indicators.

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
