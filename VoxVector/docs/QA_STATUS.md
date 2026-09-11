# VoxVector QA Status

**State date:** 2026-09-11

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment state

Canonical GitHub `main` is `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`.

Current exact-main GitHub evidence:

- VoxVector QA run `34560251931`: **success**;
- API test step: **success**;
- React application contract-test step: **success**;
- React production-build step: **success**;
- Deploy GitHub Pages run `34557928184`: **success**.

The current connected Render deployment is `dep-dahnv7p42hec739o7phg`, status `live`, on exact backend source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`. The deployment trigger is `deploy_hook`; production auto-deploy remains disabled; deployment finished at `2026-09-11T04:14:41.882165Z`.

The live service builds:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The canonical root `render.yaml` now declares the same cloud-primary Render speech build owner and preserves optional local diarization dependencies outside the constrained Render image. Issue #964 is closed completed after direct Render workspace inventory confirmed exactly one VoxVector API service in workspace `tea-da2errdg1s2s73cl4eeg`.

A forced-fresh `/health` readback at `2026-09-11T04:31:47.647002Z` returned HTTP 200 and reported:

- `status=ok`;
- exact `source_revision=1cc10f40bb6b94e0a8f3380c1b70529137e89d93`;
- pipeline/runtime version `0.2.27`;
- runtime self-test `passed`;
- process instance `0f629722-aa1c-4bab-8151-0c720945b78b`;
- Render instance `srv-da2f88n40ujc73a8m26g-hibernate-57dd8fc574-f82n8`;
- 512 MiB memory reference and 416 MiB Stage-10 admission ceiling;
- faster-whisper `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process, 165-second timeout, execution-ready;
- cloud-primary `pyannote_api`, API key configured, primary execution-ready;
- local fallback `none` / disabled and local adapter not installed.

This is current deployment/readiness evidence. It is not provider execution, Stage 10 completion, browser verification or scientific validation.

## Current #941 controlled-production gate

The runtime-safety source work from PRs #962/#967 remains in current source. It provides:

1. CPU post-heavy cleanup without importing PyTorch merely to inspect CUDA cache;
2. same-run checkpointing of completed acquisition/transcript/alignment/provider state before Stage 10;
3. operational Stage 10 memory admission before running state;
4. fail-fast process-wide single-flight composite admission so an abandoned/timed-out caller cannot wait behind the heavyweight lock and execute later;
5. RSS recheck while the shared lock is held and lock ownership through composite execution;
6. stable persisted route-owned `run_id` with pipeline-internal identity kept separately as `pipeline_run_id`;
7. separate Python `process_instance_id` and Render infrastructure `render_instance_id` provenance.

Issue #964 is now complete, so #941 is the active runtime proof gate. The same 183.3-second controlled WAV must be invoked once through the authenticated Analysis Workspace on exact deployed `1cc10f40...` and correlated across Render and durable Supabase evidence.

Current invocation preflight after the exact deployment became live found no controlled Analyze request in Render logs and no case/analyze request in the checked post-deployment Supabase request-log window. The protected Analyze endpoint requires the owner's authenticated VoxVector session; connected service tools must not bypass that authorization boundary.

## Controlled production transcription result — historical 2026-09-10 evidence

The controlled incident below occurred on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. It remains valid historical provider/runtime evidence but is not execution proof for current `1cc10f40...`.

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

Those records remain historical source-QA evidence. Current source authority is the exact-main `1cc10f40...` QA result above.

## Current exact-main QA boundary

Current `main` exact revision `1cc10f40bb6b94e0a8f3380c1b70529137e89d93` has push-triggered VoxVector QA `34560251931` and GitHub Pages workflow `34557928184`, both successful.

These results establish software QA/publication workflow success. Current Render deployment and fresh `/health` independently establish exact-revision backend deployment/readiness. None of those evidence classes establishes the still-unexecuted #941 controlled provider/Stage-10 run, authenticated browser verification or scientific validity.

## Supabase evidence

Connected Supabase verification establishes project `VoxVector` (`tawtkawmjqabydnatavx`) as `ACTIVE_HEALTHY`.

Current storage inventory at preflight:

- `voxvector-logs`: 4,976 objects at the observed query, latest update `2026-09-11T04:11:33.247024Z`;
- `voxvector-media`: 25 objects, latest update `2026-09-09T09:49:54.310614Z`.

Multiple private 17,596,936-byte WAV objects remain present for the owner. A direct storage-object-name search did not expose the historical #941 case/source UUIDs, so no object-name mapping is inferred from SQL alone. Canonical case API/CaseStore readback is required for the controlled rerun.

Merged observability work through #961/#966/#968 adds durable correlation/debug-bundle source foundations. Issue #959 remains open for a controlled production run proving the Render copy, Supabase copy, real Debug Bundle contents/redaction and terminal snapshot behavior.

## Render configuration state

The prior Blueprint/live dependency drift is resolved at the repository/service ownership boundary.

Canonical root `render.yaml` and the connected Render service both use:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The cloud-primary Render speech manifest excludes the optional local `pyannote.audio`/Torch runtime. Optional local Community-1 dependencies remain preserved in their dedicated local/container path. Production auto-deploy remains off.

Issue #964 was closed only after confirmed Render workspace inventory returned exactly one VoxVector API service. This is configuration and service-inventory evidence, not provider execution.

## Frontend QA / truth boundary

Current `main` frontend source has material open truth/acceptance items:

- `PipelineBuildCard.jsx` still uses stale local Stage 05/06 ordering and queued Stage 07/08 text despite consuming `pipeline_build`; #965 owns the existing-component correction so runtime `status_by_stage` becomes authoritative when available.
- draft PR #974 under #931 contains the candidate login wake plus shared role-aware User/Admin/Developer Profile editor wiring and requires current-main integration/browser acceptance before merge.
- draft PR #986 under #981 contains the manual Developer Console Wake API/chrome refinement. Its exact-head QA and PR Preview pass, but authenticated desktop/mobile browser verification remains open and the PR is not merged into current production.

These are source/application facts, not browser verification.

## Current implementation and evidence matrix

| Area | Current state | Evidence | Remaining gate |
|---|---|---|---|
| 21-stage pipeline contract | represented | source/tests + current `/health` | frontend projection correction #965; engineering/scientific maturity stage-specific |
| Authenticated source upload | implemented | historical large controlled WAV persistence successes | intermittent #930 400 requires reproduction/bounding |
| Source persistence | implemented | Supabase historical/current object inventory | old-case browser rehydration #963 |
| faster-whisper | configured/ready currently; provider execution historically proven with beam 1 | fresh `/health` + historical 58 segments / 246 words | exact-current controlled repeatability #941 |
| Transcript alignment | source foundation + historical stage execution evidence | source/tests + historical run | current durable readback and speaker-aware alignment #971 |
| Acoustic Feature Extraction | implemented source with bounded Stage 10 admission | exact-main QA + fresh current `/health` | controlled production proof #941 |
| pyannoteAI cloud primary | configured/ready architecture | source/provider contracts + fresh `/health` readiness | current provider contract correction/execution/persistence #970 |
| local Community-1 | optional fallback | preserved local/container dependency path | must not be treated as current cloud-primary execution |
| Run recovery/reporting | merged foundation | #945/#946 + #962/#967 | controlled runtime/browser readback separate |
| Dual Render/Supabase observability | merged source foundation | #961/#966/#968 | production dual-copy/bundle/terminal-capture proof #959 |
| Admin user management backend | Edge Function previously verified active | Supabase readback | current auth/profile integration/browser acceptance #931 |
| Login-time API wake / shared self-profile | candidate only | draft PR #974 | current-main integration/merge/publication/browser verification |
| Developer Console manual Wake API / chrome | candidate only | draft PR #986 exact-head QA/Preview | authenticated desktop/mobile browser verification + merge |
| Classification/disposition | guarded foundation | source/tests | no scientifically validated deception inference |

## Current issue queue

- #941 — **active P0 runtime gate:** same-WAV controlled production proof on exact deployed `1cc10f40...`.
- #970 — cloud-primary pyannoteAI contract/execution/persistence after #941.
- #971 — persisted transcript/audio/speaker alignment after #970.
- #963 — historical-case rehydration after upstream artifacts are established.
- #930 — intermittent authenticated upload 400 must be bounded before candidate freeze.
- #959 — merged observability source, production acceptance open.
- #965 — frontend pipeline status contract correction before final browser freeze.
- #931 / draft PR #974 — login wake/shared self-profile plus role/browser matrix.
- #932 — release-critical public CTA/anchor/menu repair before final browser acceptance.
- #981 / draft PR #986 — manual Developer Console Wake API/chrome browser acceptance; source QA/Preview complete.
- #964 — **DONE:** sole Render Blueprint/runtime dependency reconciliation and service-inventory acceptance.
- #972 — final frozen-candidate two-run golden proof.

## Verification boundary

A passing software suite establishes implementation behavior only. A GitHub merge is not a Render deployment. A Render deployment is not a fresh `/health` readback. A fresh `/health` readback is not provider execution. Successful provider execution is not transcript truthfulness, verified speaker identity, deception-detection validity, calibration or generalization. Browser verification, engineering-MVP completion and scientific validation remain separate programs.