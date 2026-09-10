# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected VoxVector product experience.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md). This build plan defines what to build and verify next; the release gate defines the evidence required before engineering MVP may be signed off.

## MVP definition

One real case must move through:

`create case → upload recording → provenance → decode → playback → waveform → real pipeline state → speaker processing → transcription → alignment → analytical tracks → evidence → synthesis → assessment → report → persistence → reopen`

The MVP is defined by connected real workflows, not screen count.

## Current execution checkpoint — 2026-09-10

**Current engineering stage:** production reproduction and provider verification on the merged lifecycle/runtime foundation, while the remaining P0 source work continues in separate bounded issues.

Canonical GitHub `main` is `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`, the merge of run-lifecycle recovery PR #946. Exact-main VoxVector QA #1963 (`34425588762`) succeeded, Deploy GitHub Pages #1708 (`34425588752`) succeeded, and the post-merge CodeQL run #71 (`34425587747`) succeeded.

Connected Render inspection on 2026-09-10 shows deployment `dep-dah0g13l550s73d2dbb0` `live` on the same source revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`. Its trigger is `api`. This proves the current backend source has been deployed to Render, but it does **not** verify the protected Developer Console **Deploy Now** / deploy-hook path tracked by #920. A fresh complete `/health` payload readback, authenticated browser verification, provider execution, and scientific validation remain separate evidence gates.

**Immediate intake work:** [#930](https://github.com/darenprince/darenprince-author/issues/930) is now ready for production reproduction because the merged pre-handler diagnostics are included in the live Render source. Root cause and authenticated upload verification remain unresolved.

**Immediate provider work:** [#941](https://github.com/darenprince/darenprince-author/issues/941) is ready for controlled real-audio faster-whisper verification on the current live backend. Source-level OOM/dependency-order repairs are merged, but bounded provider execution, memory correlation, and persisted transcript artifact readback remain unverified.

**Active P0 source work:** #948 / draft PR #951 owns auditable secure case deletion, and #949 / draft PR #952 owns server-aware Stop Analysis. #931 remains open because the `voxvector-user-admin` Supabase Edge Function source is merged but the connected project currently lists no deployed Edge Functions; trusted-admin assignment and authenticated role/browser verification also remain outstanding.

## P0 — Case spine

Status: **FUNCTIONAL / TESTED FOUNDATION**.

The canonical case model preserves case identity, authenticated ownership, sources, provenance, run identity, status, and current run. Merged #945/#946 adds eligible stale/interrupted-run reconciliation, terminal run/failure reports, elapsed timing, and same-process per-case serialization without creating a second case store.

## P1 — Intake and audio foundation

Status: **IMPLEMENTED FOUNDATION / PRODUCTION REPRODUCTION REQUIRED**.

Implemented: supported-file validation, size checks, WAV decoding, private source persistence, SHA-256 provenance, signed playback endpoint, upload progress/error handling, request correlation, storage diagnostics, and pre-handler 4xx evidence capture.

Current blocker: intermittent production case-source upload HTTP 400 tracked in #930. The diagnostic implementation is now present in the current live Render source, so the next step is authenticated reproduction or a successful bounded verification pass with request-correlated evidence. The exact multipart/client/proxy cause remains unproven.

Remaining after reliability closure: authenticated browser playback verification and the upload cancellation/progress treatment tracked in #928.

## P2 — Analysis Workspace foundation

Status: **ACTIVE IMPLEMENTATION**.

Implemented: case workspace shell, persisted source metadata, waveform generation, playback controls, spectrogram view, persisted pipeline-state inspection, elapsed/final run timing, and Copy/Download controls for persisted engineering run/failure reports.

Next: complete the bounded Stop Analysis work in #949, then composed Analysis Results and Review Evidence followed by richer synchronized analytical tracks.

## P3 — Real pipeline lifecycle

Status: **FUNCTIONAL / TESTED FOUNDATION; PRODUCTION READBACK REQUIRED**.

The 21 stage identifiers and persisted per-run state contract exist. The current case-analysis path distinguishes complete, pending, failed, cancelled/not-run where implemented, and guarded stages. Merged #946 can reconcile eligible stale/interrupted runs from Case History and individual case reads and persists terminal reports rather than leaving eligible records indefinitely running.

Current Render now contains the merged lifecycle source. Production Case History reconciliation/report readback has not yet been observed in this checkpoint.

## P4 — Speaker intelligence

Status: **EXECUTION-READY PATH / CONTROLLED EXECUTION REQUIRED**.

The configured pyannoteAI cloud primary is represented separately from the optional local Community-1 fallback and the case-analysis invocation gate remains explicit. Engineering MVP requires actual cloud-primary execution against the golden source, normalized speaker artifact persistence, and readback. Provider configuration/readiness is not execution.

Execution owner until promoted: tracker #915 identifier `VV-DIARIZE`.

## P5 — Production transcription

Status: **BUILT / CURRENT LIVE SOURCE / CONTROLLED EXECUTION VERIFICATION NEXT**.

Implemented: the canonical case-analysis route invokes the configured faster-whisper provider when the runtime reports execution readiness and persists normalized timestamped transcript segments and words in the case run. The repaired path isolates faster-whisper in a bounded child process and executes speech/provider acquisition before dependent downstream analysis.

The current Render deployment includes those source repairs. Remaining: fresh runtime settings readback, controlled real-audio provider execution, Render memory/instance correlation, artifact readback, and transcript quality verification. #941 owns the active production verification.

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

Observation and evidence records preserve method identity, source interval, quality, direction, and provenance. The next step is exposing these records as an inspectable review surface connected to verified golden-case artifacts.

## P9 — Evidence synthesis

Status: **FOUNDATION / NOT VALIDATED INFERENCE**.

The architecture preserves convergence, conflict, dependence, and alternatives. Statistical dependence-aware inference remains part of the separate validation program.

## P10 — Assessment and report

Status: **ACTIVE BUILD**.

The next product deliverable remains a canonical composed assessment/result contract followed by report generation from the persistent case. The report must preserve eligibility/data quality, contributing evidence, convergence/conflict, uncertainty, alternatives, provenance, and disposition boundaries rather than hiding evidence behind a single score.

## P11 — Case history and return path

Status: **FOUNDATION PRESENT / ACTIVE HARDENING**.

Case list and retrieval are implemented. Merged #946 adds lifecycle reconciliation/report persistence. #948 / draft PR #951 is hardening irreversible deletion with a durable sanitized receipt. Saved evidence/report state and polished reopen behavior remain release-gate requirements.

## P12 — Browser verification and production hardening

Status: **ACTIVE QA WORKSTREAM**.

Repository QA and Pages publication are green for current `main`. The backend source is also currently live on Render through an API-triggered deploy. Remaining verification must traverse the exact deployed authenticated browser workflow, signed media, Analysis Workspace, diagnostics, desktop/mobile, keyboard, reduced motion, failure/cancellation paths, production artifact readback, and revision identity.

## Developer Console operating model

The Developer Console is the engineering cockpit. Its operator status model is:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has executed successfully.
- **TESTED** — automated or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

The console consumes GitHub-backed QA/deployment state and marks workflow results from another runtime revision as `STALE`.

The local MVP task board is an operator tracker and never substitutes for backend capability evidence.

## Current dependency chain

1. reproduce/bound #930 intake reliability on the current live diagnostic revision and prove authenticated upload/playback
2. execute controlled production transcription and artifact readback under #941 / `VV-TRANSCRIBE`
3. execute controlled pyannoteAI cloud-primary diarization and artifact readback (`VV-DIARIZE`)
4. persist transcript/audio/speaker alignment (`VV-ALIGN`)
5. complete server-aware Stop Analysis #949 and auditable secure deletion #948 without mixing the two subsystems
6. complete #931 production admin-function/admin-role/authenticated browser gates
7. complete #932 landing CTA/anchor/menu repair now that the canonical login route exists
8. complete upload cancellation/progress UX #928 after #930 is sufficiently bounded
9. connect Analysis Results and Review Evidence to persisted artifacts
10. complete evidence explorer, synthesis, assessment/reporting, history/reopen
11. complete exact deployed authenticated desktop/mobile verification
12. run the complete golden case twice on the same exact deployed revision
13. sign off engineering MVP through `MVP_RELEASE_GATE.md`
14. continue scientific validation as a separate program

## Definition of done

The connected product path is complete only when a real case moves from recording intake through synchronized audio, speaker and transcript analysis, evidence synthesis, assessment, reporting, persistence, and reopening through reproducible browser verification.

**Engineering-MVP sign-off additionally requires the evidence in `MVP_RELEASE_GATE.md`, including two successful complete golden-case executions on the same exact deployed revision.** A source change between those executions resets the repeatability proof for the new candidate.

## Revised next build order

The MVP build order prioritizes evidence acquisition and release proof:

**Phase EA0:** intake reliability — #930 production reproduction now unblocked by deployment
**Phase EA1:** media profile and speech timeline foundation — implemented
**Phase EA2:** speaker diarization contract/provider — built path; controlled cloud-primary execution next
**Phase EA3:** transcription provider and normalized transcript artifact — built/current live source; #941 controlled execution verification next
**Phase EA4:** word/segment timestamp normalization and speaker association — transcript/audio foundation built; speaker execution next
**Phase EA5:** transcript/audio alignment and multimodal timeline — synchronized workspace foundation built; provider-backed persistence/readback next
**Phase EA6:** evidence consumers: linguistic, interaction, baseline, convergence
**Phase EA7:** assessment/report/history/reopen plus bounded cancellation/deletion hardening
**Phase EA8:** exact-revision desktop/mobile golden-case verification twice on one deployed revision

Existing telemetry and results infrastructure remains supporting architecture around these real engines.
