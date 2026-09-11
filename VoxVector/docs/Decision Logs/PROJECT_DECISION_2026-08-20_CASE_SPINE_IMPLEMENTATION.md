# Project Decision — Case Spine Implementation

**Date:** 2026-08-20

## Decision

Move the fastest MVP path into a durable case centered workflow now rather than continuing to build isolated analysis screens or method breadth.

The first implementation slice is:

1. authenticated case identity
2. source asset identity
3. durable source provenance
4. private media persistence
5. signed playback access
6. case bound analysis runs
7. persisted 21 stage state
8. frontend API contracts for the case workflow

## Architecture

Case metadata uses the existing private Supabase Storage architecture under the diagnostics bucket because the repository already has a trusted server-side storage adapter and no second persistence provider is required for the first case slice.

Audio source assets use a dedicated private Supabase media bucket.

The browser receives signed media URLs rather than administrative storage credentials.

The canonical `VoxVectorPipeline` remains the only analysis engine.

## Ownership

Every case route requires the existing developer authentication boundary. Case and source access is scoped to the authenticated user ID stored in the case record.

## Pipeline state

Each case-bound analysis run persists the canonical 21 stage identifiers with:

- status
- start time
- completion time
- duration
- outcome
- error reference

The runtime records only stages that actually execute as complete. Speaker processing transcription alignment and other downstream stages remain explicitly pending or not-run until their real implementation is connected.

## Next dependency

The next implementation step is Developer Console integration with the case API followed immediately by signed playback and waveform integration in the Analysis Workspace.

## Verification requirement

The code is committed to the canonical repository. Fresh backend tests and browser level verification are required before treating the new workflow as production verified.
