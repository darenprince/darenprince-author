# VoxVector End State Implementation Plan

## Objective

Build the complete VoxVector product represented by the canonical product architecture and Analysis Workspace: one auditable case connects recording intake, private persistence, speaker/transcript evidence, synchronized analytical views, evidence synthesis, guarded assessment, reporting, history/reopen and provenance.

The implementation plan is broader than the immediate MVP sequence. `MVP_BUILD_PLAN.md` owns the shortest current dependency chain and `MVP_RELEASE_GATE.md` owns the exit criteria.

## Current source context

- backend source release: **0.2.27**
- frontend source release: **0.2.37**
- current engineering handoff: `CURRENT_ENGINEERING_STATE_2026-09-12.md`
- canonical Stage 05 = Speech Segmentation
- canonical Stage 06 = Speaker Identification / Diarization
- frontend navigation/site-map/pipeline correction is merged
- current auth source includes login-time API wake and shared self-profile behavior

Do not use older checkpoint SHAs as a current-head claim. Dated checkpoint documents remain historical evidence.

## Architecture principles

1. One canonical case model.
2. One canonical backend/analysis engine under `VoxVector/`.
3. One canonical React application under `voxvector/`.
4. One 21-stage pipeline contract.
5. One synchronized audio timeline for playback, transcript, speakers and analytical tracks.
6. Backend/persisted state drives UI truth.
7. Every stage has explicit inputs, outputs, lifecycle state and provenance.
8. Provider readiness is separate from execution.
9. Engineering completion is separate from scientific validation.
10. Existing canonical owners are edited directly; do not create patch/replacement/v2 duplicates.

## Phase A — case spine and source integrity

Current foundation is implemented.

Required end state:

- owner-scoped case create/list/read/delete;
- supported source upload;
- source metadata and SHA-256 provenance;
- private media storage;
- authenticated signed playback;
- durable run/stage ownership;
- source/case history and secure reopen behavior.

Current remaining acceptance is primarily #930 intake reliability, #963 historical rehydration and #948 complete auditable deletion UX/receipt work.

## Phase B — evidence acquisition

Canonical sequence:

1. speech segmentation;
2. speaker diarization when enabled/ready;
3. transcription generation;
4. timestamp normalization;
5. transcript/audio/speaker alignment;
6. durable upstream checkpoint before dependent heavyweight work.

Current status:

- speech segmentation foundation implemented;
- faster-whisper integration implemented with historical real provider execution;
- pyannoteAI cloud-primary architecture wired;
- alignment foundation implemented;
- current release evidence remains #941 → #970 → #971.

## Phase C — analytical observations

Implemented/foundation areas include:

- acoustic feature extraction;
- F0/intensity dynamics;
- HNR/harmonicity;
- spectral flux/rolloff and related spectral observations;
- MFCC/cepstral observations;
- formant candidate tracking;
- pause topology and timing;
- optional response latency;
- optional transcript disfluency;
- optional within-speaker baseline.

Operational memory admission belongs to Stage 10 execution safety and must not be confused with Stage 09 analytical Eligibility and Reliability.

## Phase D — evidence architecture

Build and maintain:

- normalized evidence records;
- source interval and speaker links;
- method identity and provenance;
- reliability/quality state;
- evidence direction;
- dependency relationships;
- convergence and conflict;
- alternative hypotheses;
- uncertainty.

Evidence records must be inspectable back to their source context.

## Phase E — guarded assessment

Current architecture contains guarded foundations for candidate classification and final disposition.

Before any task-specific inferential capability is promoted:

- define the exact task/population;
- establish labels/rights/evaluation methodology;
- calibrate and validate outside the software QA loop;
- preserve indeterminate/insufficient-evidence outcomes;
- avoid converting a single acoustic/linguistic observation into a deception verdict.

Stage 19 Validation and Calibration is intentionally not invoked merely because code runs.

## Phase F — Analysis Workspace

The canonical workspace should restore and synchronize:

- case/source identity;
- protected playback;
- waveform and playhead;
- speech and speaker regions;
- transcript and word/segment timing;
- analytical tracks;
- evidence markers/timeline;
- stage/run detail;
- guarded assessment state;
- reports/failure reports/provenance.

#963 owns the critical close/reopen persistence acceptance for the connected product experience.

## Phase G — reports and audit

Reports must preserve:

- source/recording information;
- speaker/transcript evidence where available;
- eligibility/reliability;
- method observations;
- evidence convergence/conflict;
- uncertainty and alternative hypotheses;
- guarded assessment/disposition;
- runtime/source/provider provenance;
- limitations.

A report must not promote unavailable or unvalidated evidence into certainty.

## Phase H — Developer Console and operations

The Developer Console remains the engineering cockpit for:

- health/version/source evidence;
- case workflow and Analysis Workspace;
- pipeline build/state projection;
- diagnostics/errors;
- GitHub QA;
- protected Render status/log/debug/deploy paths;
- documentation and release status;
- trusted role/permission account operations.

The status UI must preserve the evidence chain:

`source → QA → deployment → health → provider execution → durable artifacts → browser acceptance`

The startup `Pipeline contract` row verifies contract presence, not all-stage completion.

## Phase I — frontend/product shell

Current source already includes:

- public landing and styled reference surfaces;
- Request Access → canonical login;
- route-qualified anchors;
- direct hash/back-forward restoration;
- human site map;
- correct Stage 05/06 pipeline presentation;
- current hero artwork/cascade ownership;
- protected account/workspace routes.

Remaining work is primarily authenticated/rendered acceptance and any defects discovered by that acceptance, not recreation of the shell.

## Phase J — observability and hardening

Current operational foundation includes Supabase request/error persistence and protected Render observability routes.

Remaining hardening includes:

- #959 production dual-evidence/debug-bundle acceptance;
- #930 upload error bounding;
- active timeout/error reduction;
- Supabase SECURITY DEFINER boundary review;
- leaked-password protection decision;
- unindexed foreign-key and RLS performance advisories;
- deletion/cancellation safety work as prioritized;
- secret/redaction discipline.

## Phase K — engineering MVP proof

Follow `MVP_RELEASE_GATE.md`:

1. finish the current P0 runtime/persistence/browser gates;
2. freeze one exact source/configuration candidate;
3. run exact-head QA;
4. intentionally publish/deploy;
5. obtain fresh runtime identity;
6. execute and persist golden case 1;
7. close/reopen and verify artifact restoration;
8. execute and persist golden case 2 on the same revision/configuration;
9. record correlated operational evidence;
10. declare only engineering-MVP completion.

## Phase L — scientific validation

Scientific validation is independent of the engineering-MVP gate. It requires explicit task/population definitions, rights-cleared data, protocol design, evaluation metrics, calibration, external/held-out evidence where appropriate, limitations and reproducibility.

A passing build, deployment, provider run or pair of golden cases is not scientific validation.
