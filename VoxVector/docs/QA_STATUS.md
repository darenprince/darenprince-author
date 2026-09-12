# VoxVector QA Status

**Living software QA and runtime-verification record**

## Versions

- backend: **0.2.27**
- frontend: **0.2.38**
- deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`

## Repository QA

Exact-baseline VoxVector QA run `34679916767` passed on deployed-backend revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`.

Validation-snapshot QA run **`34684789612` passed successfully** on revision `88a01b8746120326f5569477bc24a76cd85ef141`, including backend/API tests, React contract tests and the production React build.

Frontend 0.2.38 was created after that successful validation-snapshot run to repair the actual Developer Dashboard and file-picker state wiring. Therefore the final 0.2.38 synchronization head requires its own exact-head VoxVector QA before the current frontend source is called QA-verified.

Repository `main` is newer than the deployed backend by design. Frontend/docs source identity and Render backend deployment identity must remain separate.

## September 12 controlled runtime proof

A 183.3-second WAV completed the deployed canonical analysis path on backend 0.2.27 and source revision `66f2ea...`.

- case `ecdc428a-7009-47ed-99de-7b58baf52860`
- source `9c464d7b-89f0-41ea-b1eb-8707f12c9b2b`
- request `8e43718cb11746f3852863da4dbe536a`
- run `d05dc0bb-0f04-4c15-bb0e-6da1dba38935`
- run status: completed
- elapsed: 247,984 ms
- 17/21 stages complete
- 0 failed
- 4 intentionally not run
- 26 speech segments
- faster-whisper execution: ~150.1 s
- durable acquisition checkpoint: 58 transcript segments / 246 words
- alignment available before Stage 10
- Stage 10 admitted at 118.6 MB RSS under 416 MB ceiling / 512 MB service limit
- Stage 10 acoustic extraction: ~73.8 s
- Stage 10 after-GC RSS: 128.63 MB
- no uncontrolled API restart

**#941 is passed and closed.**

## Frontend 0.2.38 regression scope

The browser validation pass exposed two stale/defective frontend behaviors in the existing canonical Developer Console:

1. The file-picker handler called `setProgress(0)` but `setProgress` was not passed into `CaseWorkbench`. Upload could still succeed through the existing direct file-input fallback, masking the broken React state path.
2. The actual Developer Overview still displayed pre-proof status text such as `Transcription first`, `execution ready, unverified`, and a legacy checklist percentage/count as if that were current release readiness.

Frontend 0.2.38 directly repairs `voxvector/src/components/DeveloperConsole.jsx`:

- `setProgress` is explicitly passed and destructured by `CaseWorkbench`;
- the existing fallback remains defensive only;
- matched controlled runtime proof is shown as **PROVEN**;
- **Next Engineering Move** is #970 diarization;
- the old percentage/count is explicitly labeled as implementation coverage rather than release readiness;
- `voxvector/tests/developerConsoleValidation.test.mjs` locks those contracts.

## Current implementation/evidence matrix

| Area | Current state | Current evidence | Remaining acceptance |
|---|---|---|---|
| 21-stage contract | implemented | source/tests/live health | scientific maturity remains separate |
| Case create/upload/playback | implemented | visual browser evidence + persisted case/source | #930 edge-case bounding, #963 historical reopen |
| File-picker React state path | repaired in 0.2.38 | canonical source + regression contract | exact-head QA + browser acceptance |
| Developer Dashboard proof state | repaired in 0.2.38 | canonical source + regression contract | exact-head QA + browser acceptance |
| Speech segmentation | current runtime proven | 26 segments on controlled run | golden repeatability |
| faster-whisper | current runtime proven | same-revision controlled provider execution | golden repeatability only |
| Transcript checkpoint | current runtime proven | 58 segments / 246 words durably checkpointed | golden repeatability |
| Transcript/audio alignment | current runtime proven | checkpoint available before Stage 10 | add speaker evidence under #971 |
| Stage 10 admission | current runtime proven | 118.6 MB RSS, 416 MB ceiling | golden repeatability |
| Stage 10 acoustic extraction | current runtime proven | completed ~73.8 s | golden repeatability |
| pyannoteAI cloud | ready/configured | live health readiness | #970 real execution/persistence |
| Speaker-inclusive alignment | not yet proven | no Stage 06 provider output in controlled run | #971 after #970 |
| Debug Bundle | partially proven | real sanitized bundle, Render logs/status/health present | #959 exact durable event/error correlation |
| Authenticated UI | materially browser-observed | September 12 PDFs | remaining role/profile/mobile acceptance + 0.2.38 readback |
| Scientific validity | not established | no claim authorized | validation program |

## Fresh Render health

Connected Render evidence shows `voxvector-api` live, `/health` returning 200, runtime self-test passed, backend 0.2.27, faster-whisper execution-ready and pyannoteAI cloud-primary execution-ready.

## New QA defect: observability timeout can fail product request

During visual validation, one `GET /v1/cases/{id}` returned 500 because diagnostic middleware timed out while persisting a completed-request diagnostic record. `/health` remained 200 and subsequent case reads returned 200.

This is tracked by **#998**. Observability persistence must not convert an otherwise healthy product path into a user-visible failure.

## Visual inspection findings

The September 12 screenshot PDFs visibly confirm:

- Developer Overview and engineering state
- navigation drawer
- case creation
- source upload and persistence
- protected playback
- waveform and spectral visualizations
- analysis engine progression through early stages
- user-visible fetch failure in the separate timeout case

The visual 4:16 `1017 LA-524 2.wav` session is separate from the successful 183.3-second controlled proof case.

## Current release-critical order

1. #970
2. #971
3. #963
4. #930
5. #998
6. #959
7. authenticated desktop/mobile acceptance
8. #972 two complete same-revision/configuration golden cases
9. scientific validation separately

## Evidence boundary

Software QA, runtime execution, persistence, browser evidence, engineering repeatability and scientific validation remain distinct evidence classes.
