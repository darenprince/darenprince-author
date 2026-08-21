# VoxVector Engineering Progress — Case Console

**Date:** 2026-08-20

## Completed in this slice

The Developer Console now consumes the case-first API contracts rather than acting only as an observability surface.

### Case Workbench

- create an authenticated analysis case
- list existing cases
- reopen an existing case
- select a case
- upload a WAV source
- show upload progress
- show source identity
- show SHA-256 provenance
- show sample rate
- show duration
- request a signed playback URL
- play the persisted source
- invoke case-bound analysis
- display persisted analysis run state
- display returned pipeline stage state
- refresh the case from the backend

### MVP Build Plan

The console now contains an interactive dependency ordered MVP board with:

- phase expansion
- collapse all
- expand all
- individual task checkoff
- persisted local developer checkoff state
- completion percentage
- completed task count
- ownership labels
- reset checks

The checkboxes are engineering workflow state only. They do not represent test or scientific validation status.

### Documentation navigation

The console now provides direct links to the canonical:

- Master Method Index
- Analysis Methods
- Analysis Pipeline
- Architecture
- MVP Build Plan
- Capability Status

## Next engineering step

The next critical path is the Analysis Workspace audio contract:

1. connect signed source playback to the workspace
2. create the shared time axis
3. generate the real waveform from the persisted source
4. add playhead and seek synchronization
5. expose persisted 21-stage state beside the audio
6. add speaker region and transcript tracks once their backend contracts are connected

## Verification status

This commit has been written to the canonical GitHub repository.

A fresh frontend build and browser-level verification against the resulting deployment still need to be run before this slice is marked deployment verified.
