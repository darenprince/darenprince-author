# VoxVector Current Engineering State — 2026-09-02

## Purpose

Current engineering synchronization record for the connected VoxVector application. GitHub remains the technical source of truth.

## System state

| Area | Current state |
|---|---|
| Public frontend | `voxvector/` React/Vite application |
| Frontend version | `0.2.36` |
| Backend / analysis engine | `VoxVector/` FastAPI + `src/voxvector/` |
| Backend version | `0.2.26` |
| Public frontend deployment | GitHub Pages via GitHub Actions |
| Backend deployment | Render |
| Persistent/auth/media layer | Supabase services |
| Pipeline contract | 21 stages |
| Implemented foundations | 14 |
| Conditional / not invoked | 4 |
| Queued | 3 |

## Operational workflow

The observed canonical case path has completed:

`create case → source upload → private media persistence → secure playback → case-bound analysis → persisted run/result state`

Case identity, source metadata, SHA-256 provenance, run identity and lifecycle state remain persisted under the authenticated case model.

## Evidence acquisition

Implemented provider-backed acquisition foundations include media profiling, speech/silence timeline generation, faster-whisper transcription adapter, pyannote Community-1 diarization adapter, transcript/speaker timestamp overlap alignment, normalized multimodal timeline output, explicit provider states, measured provider execution timing, and heavy-provider cache release.

Real provider execution remains deployment-gated. Provider adapter readiness does not establish model quality or deception validity.

## Runtime observability

`voxvector.diagnostic.v2` provides request/trace/run correlation and measured durations. The execution trace layer records run and stage lifecycle events. Complete internal callback coverage for the monolithic composite pipeline remains incomplete, so the console uses real persisted boundary state plus indeterminate activity where granular progress is unavailable.

## Render memory incident

Render directly reported repeated `voxvector-api` OOM events exceeding the **512 MB** free-instance budget, including separate September 1 failures. Captured telemetry showed approximately 94.9 MB → 193.5 MB → 198.5 MB, followed by a sharp lifecycle discontinuity and stabilization near 89–93 MB.

The telemetry resolution does not identify the instantaneous >512 MB peak and does not prove the responsible component. The repeated platform OOM events are nevertheless confirmed infrastructure evidence.

## Memory-efficiency response

The speech acquisition path now uses bounded RMS frame processing rather than a full-recording frame matrix. Transcription and diarization phases are serialized. Heavy provider references are explicitly released after execution, followed by garbage collection and best-effort Linux allocator trimming. `VOXVECTOR_MEMORY` captures RSS and timing around heavyweight phases.

These are resource-management controls and do not alter analytical methodology.

## Developer Console state

The React console currently implements:

- compact 56px shared header;
- mobile Sheet navigation with two-line menu activation, X close, scrim dismissal and swipe dismissal;
- Inter for body/UI and Cal Sans for display hierarchy;
- restrained 5–8% surface tonal gradients;
- Streamline Sharp shared icon direction through `SharpIcon`;
- collapsible Case Workbench sections;
- workflow-state presentation with active coffee/copper emphasis and completed green state;
- right-aligned status metadata;
- removal of redundant `Collapsed` labels;
- Case History/reopen workflow;
- live run projection from persisted case state;
- Render Runtime status/log inspection;
- GitHub Actions QA/deployment state visibility.

Numeric progress remains restricted to measured transfer or persisted lifecycle state. Animation is never treated as evidence that analysis occurred.

## Current QA and deployment state

The typography repair was verified by the canonical `VoxVector QA` workflow and React PR preview before merge. The React build failure caused by a missing `Typography.css` import is resolved.

A separate root GitHub Pages workflow failure was audited and traced to `scripts/generate-labs-product-pages.mjs`, where a malformed regular-expression literal caused the existing-site build to fail before the VoxVector Pages stages. The repair is now prepared in the current engineering branch and must pass its own workflow gate.

## Current engineering priorities

1. Finish the root GitHub Pages build repair and verify the complete deployment artifact.
2. Perform authenticated browser verification of the public React application and Developer Console on desktop and mobile.
3. Verify compact workflow auto-collapse using deterministic React timer/scroll state.
4. Deploy and execute the constrained speech runtime on Render with measured memory/CPU profiling.
5. Verify real faster-whisper transcription and pyannote speaker turns.
6. Persist transcript, speaker and alignment artifacts under canonical case/run identity.
7. Complete internal pipeline callback telemetry where real method boundaries exist.
8. Continue evidence-consumer work only after real acquisition data is present.

## Integrity boundary

Software QA, deployment, runtime telemetry, transcription output, diarization labels, acoustic measurements and case workflow completion do not constitute scientific deception-detection validation. Eligibility/reliability, evidence analysis, candidate classification and final disposition remain separate architectural stages.

## Traceability

For substantive changes use:

`source → commit → workflow → artifact/deployment → runtime → browser`

Historical audit evidence is preserved separately in `docs/ENGINEERING_AUDIT_2026-09-02.md` and related engineering records.
