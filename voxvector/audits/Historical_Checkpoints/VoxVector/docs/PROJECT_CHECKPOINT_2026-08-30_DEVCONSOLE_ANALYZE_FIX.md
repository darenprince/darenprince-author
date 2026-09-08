# Project Checkpoint — 2026-08-30

## Developer Console analysis fix

### Problem found

The canonical React Developer Console computes `activeSource` from either the locally uploaded source or the selected case's persisted source list. The analysis mutation, however, passed only the local `source?.source_id` value.

When a developer selected an existing analysis case, the console intentionally cleared local `source` state. The Case Workbench could still display the persisted source from the case record, but the analysis request helper received an empty source ID and constructed an invalid `/sources/{source_id}/analyze` request.

### Resolution

The canonical frontend API helper `voxvector/src/lib/api.js` now:

1. requires a case ID;
2. uses the supplied source ID when present;
3. when a source ID is not supplied, retrieves the selected case through the authenticated case endpoint;
4. resolves the first persisted source from that case;
5. refuses to send an analysis request when the case has no uploaded WAV source;
6. then calls the canonical case-bound analysis endpoint.

This fixes analysis for existing cases without changing the Developer Console page structure, introducing a new component, or creating an alternate implementation.

### Canonical runtime boundary

The analysis request remains:

`POST /v1/cases/{case_id}/sources/{source_id}/analyze`

The backend endpoint remains the canonical interface to `VoxVectorPipeline`. The Developer Console remains an interface over the API and does not duplicate the analysis engine.

### Related backend behavior confirmed

The canonical backend currently:

- validates developer authentication for case-bound routes;
- retrieves the case and source from the private case store;
- reads the persisted WAV source;
- runs `VoxVectorPipeline().analyze` in a worker thread;
- persists the run and its stage-state records;
- returns the updated case and run to the Developer Console.

The 21-stage record remains the product pipeline representation. Some stages can be explicitly marked `not_run` or `pending` when the current source does not provide the inputs required for those stages.

## Documentation synchronization

This checkpoint is mirrored conceptually in the Crown Labs executive/product dossier at:

`docs/crownlabsbible/04-product-dossiers/VoxVector/overview.md`

That dossier remains the executive and product mirror; the `VoxVector/` repository documentation and implementation remain the technical source of truth.

## Verification status

The source change was committed directly to `main` and the modified API helper was read back from GitHub after the write.

A production browser run of the authenticated Developer Console was not available in this tool session, so this checkpoint does not claim end-to-end browser verification or scientific validation.
