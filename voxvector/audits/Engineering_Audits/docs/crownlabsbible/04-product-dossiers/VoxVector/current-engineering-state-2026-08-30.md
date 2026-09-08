# VoxVector Current Engineering State — Crown Labs Mirror

**Status date:** 2026-09-02

This document mirrors the current technical state recorded in the canonical `VoxVector/docs/` engineering records. The filename is retained for historical traceability; the content is maintained as the current mirror.

## Current engineering stage

**Evidence acquisition, runtime observability, connected case workflow, and deployment hardening**

## Current system statistics

- Public React application: `voxvector/`, version `0.2.37`
- Backend/analysis engine: `VoxVector/`, version `0.2.27`
- Canonical pipeline contract: 21 stages
- Implemented foundations: 14
- Conditional / not invoked: 4
- Queued: 3
- Public frontend host: GitHub Pages via GitHub Actions
- Backend host: Render
- Free Render web-service memory budget observed: 512 MB

## Operational path

`create case → upload WAV → persist private source → secure playback → case-bound analysis → persisted run/result state`

## Transcription runtime repair

The current audit found that the faster-whisper adapter existed but the canonical Render blueprint installed only base API requirements. The production runtime therefore lacked the transcription package. The active repair introduces a transcription-only dependency file, wires it into `render.yaml`, and enables the constrained CPU/int8/base configuration without automatically installing pyannote into the same 512 MB service.

The case workflow also now projects actual acquisition outcomes back into transcription, diarization, and alignment pipeline stages rather than leaving those stages permanently queued after acquisition executes.

Runtime verification remains pending until the repaired service deploys and produces a real persisted transcript.

## Render incident evidence

Render reported repeated `voxvector-api` instance failures explicitly exceeding the **512 MB** memory budget. The September 1 dashboard evidence showed separate OOM failures at approximately 7:54 PM and 8:09 PM with recovery after each, plus a separate deployment health-check timeout earlier that day.

The connected observability workflow captured a corresponding memory window rising from approximately 94.9 MB to 193.5 MB, 197.0 MB, 198.3 MB, and 198.5 MB before a sharp lifecycle discontinuity to 73.6 MB and stabilization near 89–93 MB. The sampled series does not resolve the instantaneous >512 MB peak, but the Render instance events independently establish that the service crossed its platform budget.

Raw incident evidence remains preserved as GitHub Actions artifact `9829899743` from workflow run `33585450916`.

## Memory-efficiency response

The speech acquisition path uses bounded frame processing, heavy transcription and diarization phases are serialized, provider references are released after execution, and `VOXVECTOR_MEMORY` records capture RSS and phase timing around heavyweight work.

These changes are resource-management and observability controls only. They do not establish scientific validity.

## Developer Console

The console currently uses the compact 56px navigation baseline, Inter for UI/body text, Cal Sans for display hierarchy, restrained 5–8% tonal surface gradients, Streamline Sharp for shared product chrome, mobile Sheet navigation with explicit X close and swipe dismissal, collapsible workbench sections, and state-oriented workflow presentation.

The Case Workbench tracker uses coffee/copper emphasis for the active state, semantic green for completed prerequisites, compact collapsed presentation, and right-aligned status metadata. Literal `Collapsed` text is removed from the workbench chrome.

The bottom engineering-status surface exposes current source revision, frontend/backend version information, pipeline maturity, API/runtime state, GitHub Actions QA/deployment state, speech-provider readiness, and the documented 512 MB Render memory constraint.

## Verification and deployment audit

The React typography repair was verified by the canonical `VoxVector QA` workflow and PR preview build before merge. A root GitHub Pages production workflow failure was then traced precisely to `scripts/generate-labs-product-pages.mjs`, where a malformed regular-expression literal in the generated dossier URL expression prevented the existing-site build from reaching VoxVector staging and React build steps.

The corrective change replaces the fragile regex with direct canonical path-string replacement. The correction is now being verified through GitHub Actions before production deployment is considered healthy.

## Current engineering priorities

1. Complete verification of the root GitHub Pages build repair and Pages artifact.
2. Verify authenticated desktop/mobile browser rendering of the public React app and Developer Console.
3. Validate deterministic timer/scroll behavior for workflow tracker auto-collapse.
4. Deploy constrained speech runtime and capture real `VOXVECTOR_MEMORY` telemetry.
5. Execute faster-whisper and pyannote Community-1 with actual provider outputs.
6. Persist transcript, speaker and alignment artifacts under canonical case/run identity.
7. Complete internal pipeline callback instrumentation where real boundaries exist.
8. Continue downstream evidence consumers only from acquired real evidence.

## Scientific boundary

Software builds, QA, deployment state, runtime telemetry, transcription output, diarization labels, acoustic observations and case completion do not establish scientific deception-detection validity. Eligibility/reliability, evidence analysis, candidate classification and final disposition remain separate stages.
