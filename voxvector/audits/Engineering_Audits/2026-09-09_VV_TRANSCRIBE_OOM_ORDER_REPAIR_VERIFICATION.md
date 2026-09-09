# VoxVector Engineering Audit — Transcription OOM / Pipeline Order Repair

**Prompt:** `VV-TRANSCRIBE-OOM-ORDER-REPAIR`  
**Tracking issue:** #941  
**Repair PR:** #942  
**Audit date:** 2026-09-09  
**Scope:** backend analysis/transcription lifecycle reliability only

## Purpose

Record the source, QA, deployment, and runtime evidence for the September 9 transcription out-of-memory incident repair without overstating provider execution, browser verification, engineering-MVP completion, or scientific validation.

## Incident evidence

The production incident occurred on Render revision `7d5a66fa406efde4abfd79361a4d589b5b75e6e0`. Request `6bb7ec766d3e46f39462ef92c9929544` entered Stage 07 transcription at `2026-09-09T09:36:46Z` for a 183.3 second WAV. faster-whisper started on CPU/int8 with the `base` model and logged model load at `09:36:48Z`. No provider completion, provider failure, or timeout record followed before the API process restarted. Render then started Uvicorn again and the user received the platform memory-limit automatic-restart alert.

The persisted run remained `running` because the process terminated before the prior in-process timeout handler could persist a terminal state. Source inspection also confirmed that downstream composite analytical stages were being completed before provider-backed transcription, contrary to the intended dependency order.

## Implemented repair

PR #942 repaired the canonical backend rather than introducing a duplicate pipeline. The change:

- restores the dependency order so speech segmentation, diarization, transcription, and alignment are upstream of downstream analytical completion;
- makes Stage 05 Speech Segmentation and Stage 06 Speaker Identification / Diarization;
- retains Stage 07 Transcription Generation and Stage 08 Transcript Alignment;
- normalizes the active recording buffer to `float32` and releases the persisted byte buffer before heavyweight speech execution;
- serializes provider execution and reuses precomputed source evidence where applicable;
- runs faster-whisper in a disposable spawned child process by default;
- constrains faster-whisper to `base`, CPU, int8, beam 1, one CPU thread, one worker, and a 165 second child-process deadline by default;
- terminates and, if necessary, kills the child process after its hard deadline so native ASR work cannot continue indefinitely in the API worker;
- persists process/stage identity and reconciles stale or orphaned `running` case runs after API restart or deadline expiry;
- adds regression coverage for stage ordering, provider order/release, bounded faster-whisper defaults, source-evidence reuse, and interrupted-run recovery.

## Repository QA evidence

The PR merge candidate was tested by VoxVector QA before merge and passed:

- `pytest -q`: 192 passed;
- frontend contract suite: 7 passed, 0 failed;
- `npm run build`: success;
- VoxVector PR Preview Build #782: success.

PR #942 was then merged to `main` as `09381797d4486bc049cb99a527c624690274b7c7`.

Exact-main VoxVector QA run #1882 then executed against that merged revision and passed:

- `pytest -q`: 192 passed in 1.34 seconds;
- frontend contract suite: 7 passed, 0 failed;
- React production build: success.

This is software QA evidence only.

## Render deployment evidence

Production auto-deploy remained disabled. The repair was deliberately deployed through the manual Render path.

Render deployment:

- service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- workspace: `My Workspace` (`tea-da2errdg1s2s73cl4eeg`);
- deploy: `dep-dagjc3740ujc73ff3ge0`;
- deployed commit: `09381797d4486bc049cb99a527c624690274b7c7`;
- trigger: API/manual;
- build result: successful;
- Uvicorn startup: successful;
- repeated `/health` requests during startup: HTTP 200;
- Render deployment state: `live`;
- finished: `2026-09-09T10:39:40.578342Z`.

Render logs explicitly showed checkout of `09381797d4486bc049cb99a527c624690274b7c7`, successful dependency installation/build, Uvicorn startup, repeated health-check 200 responses, and the service becoming live.

A Render `live` deployment and HTTP 200 health checks are not equivalent to successful provider execution or browser verification.

## Repository state after deployment

After the backend deployment, PR #943 merged a frontend login-presentation repair. Current GitHub `main` advanced to `cb30bca5a3c99f0eb52185e4927c969d0ad1b337`. That change modifies the frontend login presentation and test coverage, not the backend transcription repair. Exact-main VoxVector QA run #1883 and GitHub Pages run #1705 both passed for `cb30bca5a3c99f0eb52185e4927c969d0ad1b337`.

The Render backend remains intentionally on the last deliberately deployed backend revision `09381797d4486bc049cb99a527c624690274b7c7` until another manual backend deployment is authorized. Repository `main` and Render therefore currently have different commit IDs even though the intervening change is frontend-only.

## Acceptance state

Verified in source / QA / deployment evidence:

- dependency-ordered source orchestration is implemented;
- the previous thread-only local-ASR containment boundary is replaced by a terminable spawned process by default;
- interrupted-run reconciliation is implemented and regression tested;
- exact-main QA passed on the merged repair revision;
- the intended repair revision was deliberately deployed to Render;
- Render built and started the intended revision and returned health-check HTTP 200 responses.

Still unresolved and required before issue #941 can be closed:

- authenticated `/health` readback proving the runtime-reported `source_revision` and constrained speech settings from the live public API payload, not only Render deployment metadata;
- a controlled real-audio transcription run on the repaired deployment;
- provider completion or bounded provider failure without API OOM restart;
- Render memory and instance-lifecycle correlation during that provider run;
- persisted run readback proving interrupted/stale runs reconcile correctly in production;
- persisted transcript and alignment artifact readback after a successful provider run;
- safe cleanup of duplicate/stuck incident media through the supported authenticated case deletion / Supabase Storage API path;
- authenticated desktop/mobile browser verification of the resulting stage projection.

## Scientific boundary

This repair and its evidence are operational software reliability work. They do not establish deception-detection scientific validity, calibration, classification performance, or provider accuracy.

## Next verification

Run one controlled authenticated recording through the currently deployed repair revision and correlate:

`case/run identity → Stage 05 → Stage 06 if enabled → Stage 07 child process → Stage 08 alignment → downstream stages → persisted artifacts → Render memory/instance lifecycle → browser projection`.

If the provider succeeds, repeat on the same exact deployed revision for engineering-MVP repeatability evidence. If it fails or reaches the hard deadline, verify that the failure is explicit and bounded and that the API process remains alive.
