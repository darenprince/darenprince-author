# VoxVector Current Engineering State — Crown Labs Mirror

**Status date:** 2026-09-02

This document mirrors the current technical state recorded in the canonical `VoxVector/docs/` engineering records. The filename is retained for historical traceability; the content is maintained as the current mirror.

## Current engineering stage

**Evidence acquisition, runtime observability, and connected case workflow**

The repaired production path has crossed the basic operational boundary:

`create case → upload WAV → persist private source → secure playback path → case-bound analysis → analysis completion`

The active dependency chain is now:

`live analysis state → evidence acquisition → speaker/transcription execution → alignment → evidence workspace → assessment/reporting`

## Render incident evidence

Render reported repeated `voxvector-api` instance failures explicitly exceeding the **512 MB** memory budget. The September 1 dashboard evidence shows separate OOM failures at approximately 7:54 PM and 8:09 PM with service recovery after each, plus a separate deployment health-check timeout earlier that day.

The connected observability workflow captured a matching memory window that rose from approximately 94.9 MB to 193.5 MB, 197.0 MB, 198.3 MB, and 198.5 MB before a sharp drop to 73.6 MB and later stabilization near 89–93 MB. The sampled series does not resolve the instantaneous >512 MB peak, but the Render instance events independently establish that the service crossed its platform budget.

Raw incident evidence is preserved as GitHub Actions artifact `9829899743` from workflow run `33585450916`.

## Memory-efficiency response

The canonical primary pipeline uses bounded analysis frame chunks. The speech evidence-acquisition path now follows the same principle and computes RMS in bounded frame groups instead of materializing a full-recording frame matrix.

Heavy transcription and diarization provider phases are serialized in-process. Provider caches are explicitly released after each attempt, followed by garbage collection and best-effort Linux allocator trimming.

The constrained faster-whisper default is `base` / CPU / `int8` / beam `3`, with environment overrides for larger deployments. `VOXVECTOR_MEMORY` records capture current Linux RSS and phase duration around heavyweight provider phases.

These are resource-management and observability changes only.

## Developer Console visual system

The public landing page and Developer Console now share the same compact interface baseline:

- primary header target of 56px;
- two-line menu activation with explicit X close state;
- mobile navigation as a slide-out Sheet with scrim, selection, and swipe dismissal;
- Inter for all body and UI text;
- Cal Sans for hero, page-title, and section-heading hierarchy;
- sentence-case editorial headings with refined kerning, tracking, leading, and balanced wrapping;
- Streamline Sharp as the canonical shared product icon family through the `SharpIcon` primitive;
- restrained 5–8% tonal surface gradients.

The changes are presentation and interaction-system refinements only.

## Current engineering priorities

1. Verify the compact navigation and typography system in authenticated desktop and mobile browser states.
2. Verify the Sharp icon collection renders correctly across shared navigation and core product surfaces.
3. Deploy the constrained speech runtime and capture real `VOXVECTOR_MEMORY` telemetry.
4. Execute controlled faster-whisper and pyannote runs and verify actual artifacts.
5. Correlate provider memory, request concurrency, and Render instance lifecycle behavior.
6. Persist transcript, speaker, and alignment artifacts under canonical case/run identity.

## Scientific boundary

Software build, runtime execution, deployment, telemetry, case history, transcription readiness, diarization labels, acoustic observations, and QA do not establish scientific deception-detection validity. Scientific validation remains separate and task-specific.
