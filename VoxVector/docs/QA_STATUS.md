# VoxVector QA Status

**State date:** 2026-09-11

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current repository boundary

Current GitHub `main` observed during the PR #993 synchronization pass is `0e051293e8071afcf5a243c9a81f76ab1144b7c6`, the merge of PR #995 for canonical landing hero artwork.

PR #993 is a separate frontend/navigation candidate branch. Its source must be evaluated at its own exact head after every synchronization/doc change. A prior successful candidate checkpoint at head `7b69bad58d1e2e79b7ab1b2d63fcfe7ffec267fa` produced:

- VoxVector QA run `34584824088`: **success**;
- backend `pytest -q`: **230 passed**;
- frontend `npm test`: **37 passed, 0 failed**;
- Vite production build: **success**, 2,335 modules transformed;
- VoxVector PR Preview Build `34584824024`: **success**.

That evidence remains valid for `7b69bad...` only. The branch subsequently synchronized documentation and newer `main` changes, including the PR #995 hero-asset publication. Therefore a new exact-head QA/Preview run is required before PR #993 is merge-ready.

## Latest separately observed backend deployment/readiness evidence

The latest backend deployment/readiness evidence retained in the current QA record is exact backend source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93` on Render deploy `dep-dahnv7p42hec739o7phg`, status `live`, with deployment trigger `deploy_hook` and production auto-deploy disabled.

A forced-fresh `/health` readback at `2026-09-11T04:31:47.647002Z` returned HTTP 200 and reported:

- `status=ok`;
- exact `source_revision=1cc10f40bb6b94e0a8f3380c1b70529137e89d93`;
- pipeline/runtime version `0.2.27`;
- runtime self-test `passed`;
- 512 MiB memory reference and 416 MiB Stage-10 admission ceiling;
- faster-whisper `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process, 165-second timeout, execution-ready;
- cloud-primary `pyannote_api`, API key configured, primary execution-ready;
- local fallback `none` / disabled and local adapter not installed.

This is deployment/readiness evidence for `1cc10f40...`. It is not a claim that current GitHub `main` `0e051293...` was deployed to Render. It is also not provider execution, Stage 10 completion, browser verification or scientific validation.

Issue #964 is complete after reconciliation of the sole root Render Blueprint/runtime profile and direct service inventory. A Blueprint configuration is not execution.

## Current #941 controlled-production gate

The runtime-safety source work from PRs #962/#967 provides:

1. CPU post-heavy cleanup without importing PyTorch merely to inspect CUDA cache;
2. same-run checkpointing of completed acquisition/transcript/alignment/provider state before Stage 10;
3. operational Stage 10 memory admission before running state;
4. fail-fast process-wide single-flight composite admission;
5. RSS recheck while the shared lock is held and lock ownership through composite execution;
6. stable persisted route-owned `run_id` with pipeline-internal identity kept separately as `pipeline_run_id`;
7. separate Python `process_instance_id` and Render infrastructure `render_instance_id` provenance.

Issue #941 remains the controlled runtime proof gate. The same 183.3-second controlled WAV must be invoked through the authenticated analysis workflow on an explicitly observed deployed revision and correlated across Render and durable Supabase evidence.

The protected Analyze endpoint requires the owner's authenticated VoxVector session. Connected service tools must not bypass that authorization boundary.

## Controlled production transcription result — historical 2026-09-10 evidence

The controlled incident below occurred on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. It remains valid historical provider/runtime evidence but is not current execution proof.

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

The same run exposed the downstream memory defect that #962/#967 were designed to contain. Stage 10 started after memory had entered the constrained-service danger zone and the API process later restarted. The owner confirmed the incident was a memory problem. Render did not emit a dedicated kernel-level OOM/SIGKILL record, so a specific OS termination mechanism is not claimed.

## Frontend source QA / truth boundary — PR #993

PR #993 changes the existing canonical frontend owners rather than creating duplicate pages or alternate pipeline implementations.

Current candidate behavior includes:

- Request Access routes to `/voxvector/login`;
- landing/menu/footer anchors are route-qualified and point to unique current landing sections;
- direct hash load, refresh and back/forward restoration target the requested section instead of forcing the page to top;
- styled `/voxvector/pipeline.html` and `/voxvector/methods.html` are used where those frontend references exist;
- `/voxvector/site-map` is a human-readable page inventory rendered through the existing public React shell;
- GitHub Pages and PR Preview staging create direct entries for `developer`, `login`, `app`, and `site-map`, all serving the same React build;
- the styled pipeline and Developer Console pipeline projection use canonical Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- existing `PipelineBuildCard.jsx` prefers backend `pipeline_build.status_by_stage`, labels loading/offline fallback explicitly, and no longer falsely presents Stage 07/08 as queued when the backend source contract defines implemented foundations;
- frontend API contract tests trace case, health, diagnostics and Render-client paths to `VoxVector/api/app.py` and the mounted `VoxVector/api/render_api.py` route owner.

Source-route wiring verification is not provider execution or production browser verification.

Current merged `AuthGate.jsx` starts one non-blocking canonical API wake after successful password login before trusted-role routing settles. Closed historical PR #974 is not the current source authority. The current repository implementation is.

Closed draft PR #986 is likewise not current authority for Developer Console chrome. Any future Wake API/manual chrome work must be evaluated against current canonical source rather than resurrected as a patch.

## Current implementation and evidence matrix

| Area | Current state | Evidence | Remaining gate |
|---|---|---|---|
| 21-stage pipeline contract | represented | backend source/tests | stage-specific runtime/scientific maturity |
| Frontend pipeline projection | corrected in PR #993 source | focused frontend tests at prior checkpoint | final exact-head QA + authenticated desktop/mobile browser acceptance |
| Public CTA/anchors/site map | corrected in PR #993 source | focused frontend tests at prior checkpoint | final exact-head QA + desktop/mobile browser acceptance |
| Direct React route publication | workflow source corrected in PR #993 | PR Preview artifact contract | production Pages publication after merge + browser readback |
| Authenticated source upload | implemented | historical large controlled WAV persistence successes | intermittent #930 400 requires reproduction/bounding |
| Source persistence | implemented | Supabase historical/current evidence | old-case browser rehydration #963 |
| faster-whisper | configured/ready in latest observed runtime; historical provider execution proven | fresh historical/current readiness + historical 58 segments / 246 words | controlled repeatability #941 |
| Transcript alignment | source foundation + historical stage execution evidence | source/tests + historical run | current durable readback and speaker-aware alignment #971 |
| Acoustic Feature Extraction | implemented source with bounded Stage 10 admission | source/tests | controlled production proof #941 |
| pyannoteAI cloud primary | configured/ready architecture | source/provider contracts + latest observed readiness | current provider execution/persistence #970 |
| Run recovery/reporting | merged foundation | #945/#946 + #962/#967 | controlled runtime/browser readback separate |
| Dual Render/Supabase observability | merged source foundation | #961/#966/#968 | production dual-copy/bundle/terminal-capture proof #959 |
| Login-time API wake / shared self-profile | current source behavior | current repository implementation/tests | authenticated browser acceptance remains separate |
| Classification/disposition | guarded foundation | source/tests | no scientifically validated deception inference |

## Current issue queue

- #941 — active controlled runtime gate.
- #970 — cloud-primary pyannoteAI execution/persistence.
- #971 — persisted transcript/audio/speaker alignment.
- #963 — historical-case rehydration after upstream artifacts are established.
- #930 — intermittent authenticated upload 400 must be bounded before candidate freeze.
- #959 — merged observability source, production acceptance open.
- #965 / PR #993 — frontend pipeline projection source correction; browser acceptance remains separate.
- #932 / PR #993 — public CTA/anchor/menu/site-map repair; browser acceptance remains separate.
- #964 — **DONE:** sole Render Blueprint/runtime dependency reconciliation and service-inventory acceptance.
- #972 — final frozen-candidate two-run golden proof.

## Verification boundary

A passing software suite establishes implementation behavior only. A GitHub merge is not a Render deployment. A Pages workflow success is publication evidence, not desktop/mobile browser verification. A Render deployment is not a fresh `/health` readback. A fresh `/health` readback is not provider execution. Successful provider execution is not transcript truthfulness, verified speaker identity, deception-detection validity, calibration or generalization. Browser verification, engineering-MVP completion and scientific validation remain separate programs.
