# VoxVector End State Implementation Plan

## Objective

Build the complete VoxVector product represented by the canonical product architecture and Analysis Workspace: one auditable case connects recording intake, private persistence, speaker/transcript evidence, synchronized analytical views, evidence synthesis, guarded assessment, reporting, history/reopen and provenance.

`MVP_BUILD_PLAN.md` owns the shortest current dependency chain and `MVP_RELEASE_GATE.md` owns the exit criteria.

## Current source context

- backend source release: **0.2.27**
- frontend source release: **0.2.38**
- deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- current engineering handoff: `CURRENT_ENGINEERING_STATE_2026-09-12.md`
- current validation snapshot: `VALIDATION_SNAPSHOT_2026-09-12.md`
- canonical Stage 05 = Speech Segmentation
- canonical Stage 06 = Speaker Identification / Diarization
- #941 controlled transcription/durability/Stage 10 proof: **passed and closed**
- frontend 0.2.38 Developer Dashboard/file-picker validation repair: **implemented in canonical source**

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
11. Observability persistence must not convert a healthy product operation into a user-visible failure.

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

- speech segmentation current runtime proven;
- faster-whisper current same-revision execution proven;
- durable transcript checkpoint current runtime proven;
- transcript/audio alignment current runtime proven;
- pyannoteAI cloud-primary architecture/readiness present, but Stage 06 real execution/persistence still open;
- current acquisition dependency path is now **#970 → #971**.

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

The September 12 controlled run proves bounded Stage 10 admission and acoustic-extraction completion on the deployed 0.2.27 revision. Operational memory admission remains separate from Stage 09 analytical Eligibility and Reliability.

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

Evidence records must remain inspectable back to source context.

## Phase E — guarded assessment

Current architecture contains guarded foundations for candidate classification and final disposition.

Before task-specific inferential capability is promoted:

- define exact task/population;
- establish labels/rights/evaluation methodology;
- calibrate and validate outside software QA;
- preserve indeterminate/insufficient-evidence outcomes;
- avoid converting a single acoustic/linguistic observation into a deception verdict.

Stage 19 Validation and Calibration remains intentionally not invoked merely because code runs.

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

The September 12 screenshots visually verify case creation, upload, protected playback, waveform, live level, spectral display, pitch trajectory, decoded metadata and live stage progression. #963 still owns full close/reopen persistence acceptance.

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

Frontend 0.2.38 directly updates the actual `DeveloperConsole.jsx` owner:

- the Developer Overview recognizes the accepted `66f2ea...` controlled proof and displays transcription as **PROVEN** only on a matching live backend revision;
- **Next Engineering Move** is #970 diarization;
- stale `Transcription first`, `execution ready, unverified`, `71% complete`, and `20 of 28` release-readiness presentation is retired;
- the legacy 28-task list is explicitly implementation coverage only;
- `setProgress` is passed into `CaseWorkbench`, fixing the file-picker setter error while retaining the old direct file-input lookup only as defensive fallback;
- a focused source-contract regression test guards these behaviors.

The immediately preceding validation-snapshot QA `34684789612` passed. Final exact-head 0.2.38 QA and authenticated browser readback remain separate acceptance evidence.

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

Remaining work is authenticated/rendered acceptance and defects found during that acceptance, not recreation of the shell.

## Phase J — observability and hardening

Current operational foundation includes Supabase request/error persistence and protected Render observability routes.

A real sanitized Debug Bundle exists with runtime health, Render status and 100 Render logs plus a Supabase Render-log mirror. Exact exported VoxVector event/error correlation remains incomplete under #959.

A separate browser case reproduced one HTTP 500 caused by a `TimeoutError` while diagnostic middleware persisted a completed-request record. `/health` remained 200 and later reads succeeded. #998 is release-critical until observability persistence is best-effort/non-fatal.

Remaining hardening includes:

- #998 observability persistence isolation;
- #959 full dual-copy/debug-bundle acceptance;
- #930 upload error bounding;
- Supabase SECURITY DEFINER boundary review;
- leaked-password protection decision;
- unindexed foreign-key and RLS performance advisories;
- deletion/cancellation safety work as prioritized;
- secret/redaction discipline.

## Phase K — engineering MVP proof

Follow `MVP_RELEASE_GATE.md`:

1. complete #970, #971, #963, #930, #998 and #959;
2. finish authenticated desktop/mobile acceptance, including frontend 0.2.38 readback;
3. freeze one exact source/configuration candidate;
4. run exact-head QA;
5. intentionally publish/deploy;
6. obtain fresh runtime identity;
7. execute and persist golden case 1;
8. close/reopen and verify artifact restoration;
9. execute and persist golden case 2 on the same revision/configuration;
10. record correlated operational evidence;
11. declare only engineering-MVP completion.

## Phase L — scientific validation

Scientific validation is independent of the engineering-MVP gate. It requires explicit task/population definitions, rights-cleared data, protocol design, evaluation metrics, calibration, external/held-out evidence where appropriate, limitations and reproducibility.

A passing build, deployment, provider run or pair of golden cases is not scientific validation.
