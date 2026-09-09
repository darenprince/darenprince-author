# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected VoxVector product experience.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md). This build plan defines what to build and verify next; the release gate defines the evidence required before engineering MVP may be signed off.

## MVP definition

One real case must move through:

`create case → upload recording → provenance → decode → playback → waveform → real pipeline state → speaker processing → transcription → alignment → analytical tracks → evidence → synthesis → assessment → report → persistence → reopen`

The MVP is defined by connected real workflows, not screen count.

## Current execution checkpoint — 2026-09-09

**Current engineering stage:** close intake reliability, then execute and persist the speech-provider artifacts required for the golden-case path.

Current GitHub `main` at the alignment checkpoint is `fbe317660e7b9238cd46ffff3a8101291bc85580`. Exact-main `VoxVector QA` run `34305133803` succeeded and exact-main `Deploy GitHub Pages` run `34305133777` succeeded. Render deployment `dep-dagcvau7bikc73aki9b0` was separately observed `live` for the same source revision. That deployment record does not substitute for a fresh `/health` readback, authenticated browser verification, provider execution, or scientific validation.

**Immediate blocker:** [#930](https://github.com/darenprince/darenprince-author/issues/930) tracks the intermittent production case-source upload HTTP 400 that can occur before the normal route-level upload diagnostics begin. Engineering-MVP sign-off cannot treat intake as reliable until that failure is resolved or reproducibly bounded and the golden-case upload path passes.

**Primary next dependency after intake reliability:** controlled faster-whisper and pyannoteAI cloud-primary execution against the same known case source with exact persisted artifact readback.

**Following dependency:** persisted transcript/speaker alignment, speaker-aware and transcript-derived evidence integration, assessment/report completion, history/reopen, and exact-revision browser verification.

## P0 — Case spine

Status: **FUNCTIONAL / TESTED** for the configured backend path.

The canonical case model preserves case identity, authenticated ownership, sources, provenance, run identity, status, and current run.

## P1 — Intake and audio foundation

Status: **IMPLEMENTED FOUNDATION / ACTIVE RELIABILITY BLOCKER**.

Implemented: supported-file validation, size checks, WAV decoding, private source persistence, SHA-256 provenance, signed playback endpoint, upload progress/error handling, request correlation, and storage diagnostics.

Current blocker: intermittent production case-source upload HTTP 400 tracked in #930. The latest investigated failure occurred before normal route-entry diagnostics and therefore is not represented as a resolved invalid-WAV or storage failure.

Remaining after reliability closure: authenticated browser playback verification and the upload cancellation/progress treatment tracked in #928.

## P2 — Analysis Workspace foundation

Status: **ACTIVE IMPLEMENTATION**.

Implemented: case workspace shell, persisted source metadata, waveform generation, playback controls, spectrogram view, and persisted pipeline-state inspection.

Next: composed Analysis Results and Review Evidence, followed by richer synchronized analytical tracks.

## P3 — Real pipeline lifecycle

Status: **FUNCTIONAL / TESTED FOUNDATION**.

The 21 stage identifiers and persisted per-run state contract exist. The current case analysis path accurately distinguishes complete, pending, not-run, and guarded stages.

Remaining: granular per-stage timing, warnings, errors, and lifecycle events rather than coarse grouped timestamps.

## P4 — Speaker intelligence

Status: **EXECUTION-READY PATH / CONTROLLED EXECUTION REQUIRED**.

The configured pyannoteAI cloud primary is represented separately from the optional local fallback and the case-analysis invocation gate remains explicit. Engineering MVP requires actual cloud-primary execution against the golden source, normalized speaker artifact persistence, and readback. Provider configuration/readiness is not execution.

Execution owner until promoted: tracker #915 identifier `VV-DIARIZE`.

## P5 — Production transcription

Status: **BUILT / EXECUTION VERIFICATION NEXT**.

Implemented: the canonical case-analysis route invokes the configured faster-whisper provider when the runtime reports execution readiness and persists normalized timestamped transcript segments and words in the case run. The Analysis Workspace renders the persisted transcript against the shared audio playhead.

Remaining: controlled live provider execution, artifact readback, and transcript quality verification.

Execution owner until promoted: tracker #915 identifier `VV-TRANSCRIBE`.

## P6 — Audio/transcript alignment

Status: **BUILT FOUNDATION / EXECUTION VERIFICATION NEXT**.

Implemented: timestamped transcript words and segments are projected into the shared case timeline; waveform markers, transcript selection, and word selection synchronize through the canonical audio playhead. Speaker attribution remains dependent on a persisted diarization result.

Remaining: controlled provider-backed alignment verification, speaker-turn synchronization, evidence anchoring, persistence, and reopen readback.

Execution owner until promoted: tracker #915 identifier `VV-ALIGN`.

## P7 — Analytical observation layer

Status: **FOUNDATION IMPLEMENTED**.

Primary observations include acoustic energy, F0, intensity, spectral measures, HNR, MFCC, formants, temporal/pause measures, and optional baseline/interaction/transcript observations.

## P8 — Evidence architecture

Status: **FOUNDATION IMPLEMENTED / ACTIVE UI INTEGRATION**.

Observation and evidence records preserve method identity, source interval, quality, direction, and provenance. The next step is exposing these records as an inspectable review surface connected to the golden-case artifacts.

## P9 — Evidence synthesis

Status: **FOUNDATION / NOT VALIDATED INFERENCE**.

The architecture preserves convergence, conflict, dependence, and alternatives. Statistical dependence-aware inference remains part of the validation program.

## P10 — Assessment and report

Status: **ACTIVE BUILD**.

Next deliverable is a canonical composed assessment/result contract followed by report generation from the persistent case. The report must preserve eligibility/data quality, contributing evidence, convergence/conflict, uncertainty, alternatives, provenance, and disposition boundaries rather than hiding the evidence behind a single score.

## P11 — Case history and return path

Status: **FOUNDATION PRESENT / INCOMPLETE PRODUCT SURFACE**.

Case list and retrieval are implemented. History, saved evidence/report state, and polished reopen workflow remain outstanding release-gate requirements.

## P12 — Browser verification and production hardening

Status: **ACTIVE QA WORKSTREAM**.

Repository QA is green for the 2026-09-09 alignment checkpoint. Remaining verification must traverse the exact deployed authenticated browser workflow, signed media, Analysis Workspace, diagnostics, desktop/mobile, keyboard, reduced motion, failures, cancellation, production readback, and revision identity.

## Developer Console operating model

The Developer Console is the engineering cockpit. Its operator status model is:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has executed successfully.
- **TESTED** — automated or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

The console consumes GitHub-backed QA/deployment state and marks workflow results from another runtime revision as `STALE`.

The local MVP task board is an operator tracker and never substitutes for backend capability evidence.

## Current dependency chain

1. resolve/bound #930 intake reliability and prove authenticated upload/playback
2. controlled production transcription execution and artifact readback (`VV-TRANSCRIBE`)
3. controlled pyannoteAI cloud-primary execution and artifact readback (`VV-DIARIZE`)
4. persisted transcript/audio/speaker alignment (`VV-ALIGN`)
5. Analysis Results and Review Evidence connected to persisted artifacts
6. granular per-stage lifecycle telemetry where required for truthful failure diagnosis
7. real speaker-aware/transcript-derived analytical tracks
8. evidence explorer and synthesis
9. assessment/reporting
10. history/reopen
11. authenticated desktop/mobile end-to-end verification
12. two complete golden-case executions on the same exact deployed revision
13. engineering-MVP sign-off through `MVP_RELEASE_GATE.md`
14. scientific validation program as a separate post-engineering gate

## Definition of done

The connected product path is complete only when a real case moves from recording intake through synchronized audio, speaker and transcript analysis, evidence synthesis, assessment, reporting, persistence, and reopening through reproducible browser verification.

**Engineering-MVP sign-off additionally requires the evidence in `MVP_RELEASE_GATE.md`, including two successful complete golden-case executions on the same exact deployed revision.** A source change between those executions resets the repeatability proof for the new candidate.

## Revised next build order

The MVP build order prioritizes evidence acquisition and release proof:

**Phase EA0:** intake reliability — active blocker #930
**Phase EA1:** media profile and speech timeline foundation — implemented
**Phase EA2:** speaker diarization contract/provider — built path; controlled cloud-primary execution next
**Phase EA3:** transcription provider and normalized transcript artifact — built; controlled execution verification next
**Phase EA4:** word/segment timestamp normalization and speaker association — transcript/audio foundation built; speaker execution next
**Phase EA5:** transcript/audio alignment and multimodal timeline — synchronized workspace foundation built; provider-backed persistence/readback next
**Phase EA6:** evidence consumers: linguistic, interaction, baseline, convergence
**Phase EA7:** assessment/report/history/reopen
**Phase EA8:** exact-revision desktop/mobile golden-case verification twice on one deployed revision

Existing telemetry and results infrastructure remains supporting architecture around these real engines.
