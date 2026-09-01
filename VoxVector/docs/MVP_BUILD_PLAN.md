# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected VoxVector product experience.

## MVP definition

One real case must move through:

`create case → upload recording → provenance → decode → playback → waveform → real pipeline state → speaker processing → transcription → alignment → analytical tracks → evidence → synthesis → assessment → report → persistence → reopen`

The MVP is defined by connected real workflows, not screen count.

## Current execution checkpoint — 2026-09-01

**Current engineering stage:** Post-analysis Results / Review Evidence.

The observed production case path has completed case creation, WAV source upload, private media persistence, case-bound analysis, and analysis completion. Current CI also passes on the same `main` commit, including API tests and the React production build. fileciteturn102file0L2-L10

**Primary next dependency:** canonical composed Analysis Results contract and Review Evidence surface.

**Following dependency:** true per-stage lifecycle telemetry, then speaker/transcript foundations and the full evidence workspace.

## P0 — Case spine

Status: **FUNCTIONAL / TESTED** for the configured backend path.

The canonical case model preserves case identity, authenticated ownership, sources, provenance, run identity, status, and current run.

## P1 — Intake and audio foundation

Status: **FUNCTIONAL / TESTED** for the observed production API path.

Implemented: supported-file validation, size checks, WAV decoding, private source persistence, SHA-256 provenance, signed playback endpoint, upload progress/error handling, request correlation, and storage diagnostics.

Remaining: authenticated browser playback verification and explicit upload cancellation handle for the case-upload client.

## P2 — Analysis Workspace foundation

Status: **ACTIVE IMPLEMENTATION**.

Implemented: case workspace shell, persisted source metadata, waveform generation, playback controls, spectrogram view, and persisted pipeline-state inspection.

Next: composed Analysis Results and Review Evidence, followed by richer synchronized analytical tracks.

## P3 — Real pipeline lifecycle

Status: **FUNCTIONAL / TESTED FOUNDATION**.

The 21 stage identifiers and persisted per-run state contract exist. The current case analysis path accurately distinguishes complete, pending, not-run, and guarded stages.

Remaining: granular per-stage timing, warnings, errors, and lifecycle events rather than coarse grouped timestamps.

## P4 — Speaker intelligence

Status: **QUEUED**.

Required: speaker segmentation, diarization, overlap handling, speaker confidence, and speaker-aware evidence.

## P5 — Production transcription

Status: **QUEUED**.

Required: production ASR integration, timestamped transcript, confidence, persistence, and provenance.

## P6 — Audio/transcript alignment

Status: **QUEUED**.

Required: word/segment alignment, synchronized selection, speaker synchronization, and evidence anchoring.

## P7 — Analytical observation layer

Status: **FOUNDATION IMPLEMENTED**.

Primary observations include acoustic energy, F0, intensity, spectral measures, HNR, MFCC, formants, temporal/pause measures, and optional baseline/interaction/transcript observations.

## P8 — Evidence architecture

Status: **FOUNDATION IMPLEMENTED / ACTIVE UI INTEGRATION**.

Observation and evidence records preserve method identity, source interval, quality, direction, and provenance. The next step is exposing these records as an inspectable review surface.

## P9 — Evidence synthesis

Status: **FOUNDATION / NOT VALIDATED INFERENCE**.

The architecture preserves convergence, conflict, dependence, and alternatives. Statistical dependence-aware inference remains part of the validation program.

## P10 — Assessment and report

Status: **ACTIVE BUILD**.

Next deliverable is a canonical composed assessment/result contract followed by report generation from the persistent case.

## P11 — Case history and return path

Status: **FOUNDATION PRESENT / INCOMPLETE PRODUCT SURFACE**.

Case list and retrieval are implemented. History, saved evidence/report state, and polished reopen workflow remain outstanding.

## P12 — Browser verification and production hardening

Status: **ACTIVE QA WORKSTREAM**.

CI is green. Remaining verification must traverse the deployed browser workflow, signed media, Analysis Workspace, diagnostics, mobile, keyboard, reduced motion, failures, cancellation, and production readback.

## Developer Console operating model

The Developer Console is the engineering cockpit. Its operator status model is:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has executed successfully.
- **TESTED** — automated or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

The console consumes GitHub-backed QA/deployment state and marks workflow results from another runtime revision as `STALE`.

The local MVP task board is an operator tracker and never substitutes for backend capability evidence.

## Current dependency chain

1. Analysis Results contract
2. Review Evidence UI
3. granular per-stage lifecycle telemetry
4. production verification of relational diagnostics
5. speaker processing
6. production transcription
7. transcript alignment
8. real analytical tracks
9. evidence explorer and synthesis
10. assessment/reporting
11. history/reopen
12. browser-level end-to-end verification
13. scientific validation program

## Definition of done

MVP is reached only when one connected case can move from recording intake through synchronized audio, speaker and transcript analysis, evidence synthesis, assessment, reporting, persistence, and reopening through reproducible browser verification.

## Revised next build order

The MVP build order now prioritizes evidence acquisition:

**Phase EA1:** media profile and speech timeline foundation — implemented
**Phase EA2:** speaker diarization contract/provider — next
**Phase EA3:** transcription provider and normalized transcript artifact — next
**Phase EA4:** word/segment timestamp normalization and speaker association
**Phase EA5:** transcript/audio alignment and multimodal timeline
**Phase EA6:** evidence consumers: linguistic, interaction, baseline, convergence

Existing telemetry and results infrastructure remains supporting architecture around these real engines.
