# VoxVector QA Status

**State date:** 2026-09-10

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment state

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967's Stage 10 bounded-serialization and stable-run-identity follow-up.

Current exact-main GitHub evidence:

- VoxVector QA run `34532394431`: **success**;
- API test step: **success**;
- React application contract-test step: **success**;
- React production-build step: **success**;
- Deploy GitHub Pages run `34532394423`: **success**.

The current connected Render deployment is `dep-dahi2ics728c73b6ujug`, status `live`, on exact backend source `420536771875c6948be51851118b58cb04a596e6`. The deployment trigger is `api`; production auto-deploy remains disabled; deployment finished at `2026-09-10T21:36:23.3655Z`.

The live service builds:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the service repository, root directory, Python runtime, free plan, Oregon region, build/start commands, `/health` path, custom domain and auto-deploy-off state. The export lists environment-variable names with `sync: false` and no values; it is not value evidence.

No fresh `/health` payload for exact deployed source `420536...` was captured by the current synchronization pass. Older health readbacks remain historical evidence and must not be relabeled as current runtime verification.

## Current #941 state after merged #962/#967

The runtime-safety source work is merged. PR #962 established the first durability/memory foundation; PR #967 merged the reviewed follow-up into current `main`.

Current source now provides:

1. CPU post-heavy cleanup without importing PyTorch merely to inspect CUDA cache;
2. same-run checkpointing of completed acquisition/transcript/alignment/provider state before Stage 10;
3. operational Stage 10 memory admission before running state;
4. fail-fast process-wide single-flight composite admission so an abandoned/timed-out caller cannot wait behind the heavyweight lock and execute later;
5. RSS recheck while the shared lock is held and lock ownership through composite execution;
6. stable persisted route-owned `run_id` with pipeline-internal identity kept separately as `pipeline_run_id`;
7. separate Python `process_instance_id` and Render infrastructure `render_instance_id` provenance.

Issue #941 was closed at #967 merge while production verification criteria remained open and has been reopened. The next accepted runtime proof should occur after #964 reconciles the live Render dependency/configuration profile into the sole canonical root Blueprint.

## Controlled production transcription result — historical 2026-09-10 evidence

The controlled incident below occurred on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. It remains valid historical provider/runtime evidence but is not execution proof for current `420536...`.

Controlled case:

- case: `3515362e-f801-463d-961a-df7b3302a596`
- source: `cbdcdbf8-e528-49b0-a474-5cd64588d301`
- analysis request: `32fdb25aee704ee4ad0a0615e2496e09`
- source duration: 183.3 seconds
- source bytes: 17,596,936
- deployed revision: `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`

Observed provider execution:

- speech segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU, int8, beam 1, one CPU thread, one worker, isolated child process, 165-second child deadline;
- transcription completed in approximately 113 seconds;
- output contained 58 timestamped transcript segments and 246 timestamped words;
- language was reported as `en`.

This is successful provider execution evidence for that one historical run. It is not transcript truthfulness validation and it does not establish reliable end-to-end completion on the current source.

## Historical confirmed post-transcription memory failure

The same historical run exposed the downstream reliability defect that #962/#967 were designed to contain.

Application memory telemetry reported approximately 134.75 MiB parent RSS before the post-heavy-phase cleanup completed and approximately 482.58 MiB after cleanup. The configured VoxVector admission ceiling was 416 MiB on a 512 MiB reference budget. Render's 30-second service telemetry sampled 519,041,020 bytes during the incident window against a 536,870,900-byte service limit.

Stage 10 Acoustic Feature Extraction was then marked started and the API process disappeared without a graceful application shutdown record. Render launched Uvicorn again shortly afterward. The owner confirmed the incident was a memory problem. Render did not emit a dedicated kernel-level OOM/SIGKILL line for this exact run, so the precise OS termination mechanism is not separately claimed.

At that historical revision, completed acquisition/transcript/alignment/provider state had not yet been durably attached to the run before the downstream transition. The source WAV itself persisted.

## Historical source-repair QA checkpoints

The #962 source-repair branch accumulated successful review-workflow checkpoints before merge, including:

- branch checkpoint `bfd1d92bf488255a5dd403a7f701790b3134be74` with VoxVector QA `34481815208`: success, 206 backend tests passed, 13 frontend tests passed, Vite build succeeded;
- PR Preview `34481815297`: success;
- later literal branch-head push checkpoint `85add7d4d21640346dc454cd19309fa968d922fb` with VoxVector QA `34484033457`: success.

Those records remain historical source-QA evidence. Current source authority is the exact-main `420536...` QA result above.

## Final #967 exact-main QA boundary

PR #967 resolved the two reviewed follow-up defects before merge: bounded/cancellation-safe heavy-phase admission and preservation of route-owned case-run identity. GitHub `main` then advanced to `420536...`.

VoxVector QA `34532394431` ran on that exact push revision and completed successfully across the API-test, frontend-contract-test and React production-build steps. GitHub Pages workflow `34532394423` also completed successfully for the same main revision.

These results establish software QA/publication workflow success. They do not establish current Render `/health`, controlled post-merge provider execution, browser verification or scientific validity.

## Supabase evidence

The last connected Supabase verification established project `VoxVector` (`tawtkawmjqabydnatavx`) with `voxvector-user-admin` Edge Function active, version 2, JWT verification enabled, and a trusted role inventory of one admin, one developer and one user.

Historical controlled-incident evidence retained:

- private source WAV in `voxvector-media`;
- case JSON in the private VoxVector storage path;
- parent request diagnostic records through transcription start and later Stage 10 start.

Merged observability work through #961/#966/#968 adds durable correlation/debug-bundle source foundations. Issue #959 remains open for a controlled production run proving the Render copy, Supabase copy, real Debug Bundle contents/redaction and terminal snapshot behavior.

## Render configuration drift

Canonical root `render.yaml` currently specifies:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

The connected live Render service and owner-provided export specify:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

`requirements-speech.txt` installs local `pyannote.audio` in addition to faster-whisper, while the canonical primary diarization adapter is the cloud `pyannote_api` path. `requirements-transcription.txt` contains faster-whisper only.

Root `render.yaml` also declares `CORS_ORIGINS` as a server-managed variable. It is absent from the owner-provided Render export, while backend source defaults to `*` when `CORS_ORIGINS` is unset. That difference must be investigated deliberately rather than inferred from the redacted export.

Drift reconciliation belongs to #964 and must update the existing canonical root `render.yaml` rather than creating a duplicate Blueprint owner. Configuration reconciliation is not provider execution.

## Frontend QA / truth boundary

Current `main` frontend source has two material open truth/acceptance items:

- `PipelineBuildCard.jsx` still uses stale local Stage 05/06 ordering and queued Stage 07/08 text despite consuming `pipeline_build`; #965 owns the existing-component correction so runtime `status_by_stage` becomes authoritative when available.
- `AuthGate.jsx` on current `main` still lacks the requested login-triggered API wake. Draft PR #974 under #931 contains the candidate wake plus shared role-aware User/Admin/Developer Profile editor wiring. Its prior QA was against the pre-#967 base and must be rerun against current `main` before merge recommendation.

These are source/application facts, not browser verification.

## Current implementation and evidence matrix

| Area | Current state | Evidence | Remaining gate |
|---|---|---|---|
| 21-stage pipeline contract | represented | source/tests | frontend projection correction #965; engineering/scientific maturity stage-specific |
| Authenticated source upload | implemented | historical large controlled WAV persistence successes | intermittent #930 400 requires reproduction/bounding |
| Source persistence | implemented | Supabase historical object readback | old-case browser rehydration #963 |
| faster-whisper | provider execution historically proven with beam 1 | 58 segments / 246 words on deployed `f0dda136...` | current post-#964/#967 controlled repeatability #941 |
| Transcript alignment | source foundation + historical stage execution evidence | source/tests + historical run | current durable readback and speaker-aware alignment #971 |
| Acoustic Feature Extraction | implemented source with merged bounded Stage 10 admission | exact-main QA | controlled production proof #941 |
| pyannoteAI cloud primary | implemented/configured architecture | source/provider contracts + older readiness evidence | current provider contract correction/execution/persistence #970 |
| local Community-1 | optional fallback | local adapter contracts | must not be treated as current cloud-primary execution |
| Run recovery/reporting | merged foundation | #945/#946 + #962/#967 | controlled runtime/browser readback separate |
| Dual Render/Supabase observability | merged source foundation | #961/#966/#968 | production dual-copy/bundle/terminal-capture proof #959 |
| Admin user management backend | Edge Function previously verified active | Supabase readback | current-main PR #974 integration + role/profile browser acceptance #931 |
| Login-time API wake / shared self-profile | candidate only | draft PR #974 | refresh against current main, QA/merge/publish/browser verification |
| Classification/disposition | guarded foundation | source/tests | no scientifically validated deception inference |

## Current issue queue

- #964 — current first source/configuration task: reconcile Render Blueprint/live dependency/profile state.
- #941 — reopened controlled production proof after #964; source fixes merged.
- #970 — cloud-primary pyannoteAI contract/execution/persistence after #941.
- #971 — persisted transcript/audio/speaker alignment after #970.
- #963 — historical-case rehydration after upstream artifacts are established.
- #930 — intermittent authenticated upload 400 must be bounded before candidate freeze.
- #959 — merged observability source, production acceptance open.
- #965 — frontend pipeline status contract correction before final browser freeze.
- #931 / draft PR #974 — login wake/shared self-profile plus role/browser matrix; current-main integration QA pending.
- #932 — release-critical public CTA/anchor/menu repair before final browser acceptance.
- #972 — final frozen-candidate two-run golden proof.

## Verification boundary

A passing software suite establishes implementation behavior only. A GitHub merge is not a Render deployment. A Render deployment is not a fresh `/health` readback. A fresh `/health` readback is not provider execution. Successful provider execution is not transcript truthfulness, verified speaker identity, deception-detection validity, calibration or generalization. Browser verification, engineering-MVP completion and scientific validation remain separate programs.
