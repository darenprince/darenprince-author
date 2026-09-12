# VoxVector — Current Engineering State

**Crown Labs executive mirror**

Canonical technical source: `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`.

## Current identity

- backend release: **0.2.27**
- frontend release: **0.2.38**
- deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- deployed-baseline QA `34679916767`: success
- validation-snapshot QA `34684789612`: success

Frontend 0.2.38 is newer than the deployed backend and contains the canonical Developer Dashboard/file-picker validation repairs.

## Product state

VoxVector is an advanced pre-release, case-centered vocal/audio intelligence platform with private media persistence, a canonical 21-stage analysis contract, operational diagnostics, protected Developer Console surfaces and a current same-revision controlled transcription-through-Stage-10 success.

It is not represented as a scientifically validated universal deception detector.

## September 12 controlled runtime proof

A 183.3-second controlled WAV completed on the current deployed backend candidate:

- **17/21 stages complete**
- **0 failed**
- **4 intentionally not run**
- 26 speech segments
- faster-whisper: ~150.1 seconds
- durable checkpoint: 58 transcript segments / 246 words
- transcript/audio alignment available before Stage 10
- Stage 10 admission: 118.6 MB RSS under 416 MB ceiling / 512 MB limit
- Stage 10 acoustic extraction: ~73.8 seconds
- no uncontrolled API restart

Issue **#941 is passed and closed**.

## Frontend 0.2.38 correction

The actual Developer Overview and Case Workbench were corrected in their existing canonical owner, `voxvector/src/components/DeveloperConsole.jsx`.

Current source now:

- passes the missing upload-progress setter into `CaseWorkbench`;
- uses the existing file-input lookup as fallback only;
- shows matched controlled transcription proof as **PROVEN**;
- makes **#970 diarization** the next engineering move;
- retires the old `Transcription first`, `execution ready, unverified`, 71% and 20-of-28 release-readiness presentation;
- labels the 28-task board as implementation coverage only;
- includes a focused regression contract.

Final exact-head 0.2.38 QA and authenticated browser readback remain separate acceptance evidence.

## Provider state

- faster-whisper: **current same-revision controlled execution proven**
- transcript durability: **proven for the controlled run**
- transcript/audio alignment: **proven for the controlled run**
- Stage 10 bounded execution: **proven for the controlled run**
- pyannoteAI cloud-primary: configured/readiness proven, but Stage 06 was intentionally not invoked in the controlled run
- speaker evidence: still open under **#970**
- speaker-inclusive multimodal alignment: still open under **#971**

## Fresh Render state

`voxvector-api` is live in Oregon on deployment `dep-daifrgoae00c73ebcc20` at revision `66f2ea...`. Fresh `/health` returns 200, backend 0.2.27, runtime self-test passed, faster-whisper execution-ready and pyannoteAI cloud-primary execution-ready.

## Browser/observability finding

A separate Developer Console validation case exposed one case-read HTTP 500 caused by a diagnostic persistence `TimeoutError` while `/health` remained healthy and later case reads succeeded. This is classified as an observability persistence reliability defect rather than pipeline failure. GitHub issue **#998** tracks the fix.

## Debug Bundle

A real sanitized Debug Bundle exists with case/run state, runtime health, Render status and 100 bounded Render logs. Its manifest shows a Supabase Render-log mirror but zero exported exact VoxVector events and zero correlated error records, so **#959 remains open**.

## Visual evidence

The Confidential IP screenshot PDFs directly show the Developer Console dashboard, drawer navigation, case creation, source upload, protected playback, waveform/spectral analysis and stage progression. They also capture the separate fetch failure associated with the observability timeout case. Those screenshots predate the 0.2.38 Dashboard/file-picker repair.

## Current release gates

1. #970 real cloud-primary diarization and persisted speaker evidence
2. #971 persisted speaker/transcript/audio alignment
3. #963 historical-case reopen/playback/artifact/report rehydration
4. #930 upload reliability bounding
5. #998 observability persistence isolation
6. #959 complete dual-copy observability and Debug Bundle correlation
7. authenticated desktop/mobile acceptance, including frontend 0.2.38 readback
8. #972 two complete same-revision/configuration golden cases
9. scientific validation separately

## Boundary

The September 12 evidence materially strengthens engineering readiness. It does not establish validated deception accuracy, verified speaker identity, transcript truthfulness or legal admissibility.
