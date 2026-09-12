# VoxVector Validation Snapshot — 2026-09-12

## Scope

This record captures the September 12, 2026 engineering validation evidence from the deployed Render service, the successful controlled analysis run, the sanitized Debug Bundle, and the current Confidential IP Developer Console screenshots.

It is an engineering validation snapshot. It is not scientific validation.

## Runtime identity

- service: `voxvector-api`
- backend release: **0.2.27**
- deployed revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- Render deployment: `dep-daifrgoae00c73ebcc20`
- region: Oregon
- `/health`: HTTP 200
- runtime self-test: passed
- health maturity: 21 total / 16 implemented foundations / 1 queued / 4 conditional or not invoked

Speech runtime:

- transcription provider: faster-whisper
- model: base
- device/compute: CPU / int8
- beam: 1
- CPU threads: 1
- workers: 1
- isolated child process: enabled
- provider timeout: 165 seconds
- diarization primary: pyannoteAI cloud
- diarization execution-ready: true

## Successful controlled run

Controlled source: 183.3-second WAV.

Identifiers:

- case `ecdc428a-7009-47ed-99de-7b58baf52860`
- source `9c464d7b-89f0-41ea-b1eb-8707f12c9b2b`
- request `8e43718cb11746f3852863da4dbe536a`
- run `d05dc0bb-0f04-4c15-bb0e-6da1dba38935`

Outcome:

- run completed
- elapsed **247,984 ms**
- **17/21 complete**
- **0 failed**
- **4 intentionally not run**

Important stage evidence:

- Stage 01 source persisted before analysis
- Stage 02 PCM WAV decode/normalization completed
- Stage 03 SHA-256 integrity confirmed
- Stage 04 recording assessed at 48 kHz with no clipping detected
- Stage 05 **26 speech segments**
- Stage 06 diarization intentionally not invoked on the constrained Render path
- Stage 07 faster-whisper completed in about **150.1 s**
- Stage 08 transcript/audio alignment available
- Stage 09 eligible
- Stage 10 admitted and completed
- Stages 11–13 completed
- Stage 14 not run because no question context was attached
- Stage 15 not run because no independent baseline was attached
- Stages 16–18 completed
- Stage 19 validation/calibration intentionally not invoked
- Stages 20–21 completed

Durable upstream checkpoint:

- transcription state: completed
- transcript segments: **58**
- transcript words: **246**
- alignment available: true
- diarization state: not invoked

Memory/runtime evidence:

- transcription after-GC RSS: **116.63 MB**
- Stage 10 admission start: **118.6 MB RSS**
- admission ceiling: **416 MB**
- service memory limit: **512 MB**
- Stage 10 acoustic extraction elapsed: **73.8 s**
- Stage 10 after-GC RSS: **128.63 MB**
- uncontrolled API restart: **none**

Engineering conclusion: **#941 passed and is closed.**

## Debug Bundle

A real sanitized Debug Bundle was generated for the successful run.

Included:

- case/run snapshot
- runtime health
- Render service/deploy status
- 100 Render logs for the bounded analysis window
- Supabase Render-log mirror reference

Manifest availability:

- Render provider logs: available
- Render status: available
- runtime health: available
- Supabase Render-log mirror: available
- exact exported VoxVector events: unavailable/zero
- correlated error reports: unavailable/zero

The bundle intentionally excludes raw audio and transcript text. #959 remains open until exact durable VoxVector-event/error correlation is complete.

## Visual inspection of Confidential IP screenshots

The current PDF screenshots directly verify the rendered Developer Console experience.

### Developer Overview

Observed rendered state:

- API Online
- Runtime Passed
- Render ACTIVE / LIVE
- frontend v0.2.37 / API 0.2.27
- pipeline card showing 16/21 foundations

The screenshot also contains stale pre-validation wording:

- `Transcription first`
- `execution ready, unverified`
- `71% complete`
- `20 of 28`

Those values are not current engineering truth after the successful controlled run. The canonical status module has been updated so the matched deployed proof revision can be represented as **PROVEN** for transcription and with a dedicated controlled-runtime proof check.

### Case Workbench / analysis session

A separate visual case used `1017 LA-524 2.wav`, approximately 23.46 MB and 4:16 duration. The screenshots visibly confirm:

- real case creation/selection
- successful upload
- protected playback controls
- waveform rendering and seek interaction
- live level UI
- spectral analysis / spectrogram
- pitch trajectory presentation
- decoded WAV metadata and source provenance
- canonical pipeline progression
- correct Stage 05 Speech Segmentation / Stage 06 Speaker Identification order
- Stage 06 visibly `Not run`
- Stage 07 visibly running

This visual case is not the 183.3-second controlled proof case and must not be conflated with it.

### Visual fetch failure

The analysis-session PDF ends with a user-visible `Failed to fetch` state after the browser had shown the pipeline progressing into Stage 07.

Render logs from a separate case-read failure at 08:28 UTC show:

- `/health` remained HTTP 200
- `GET /v1/cases/{id}` encountered `TimeoutError: The read operation timed out`
- traceback occurred while diagnostic middleware persisted a completed-request record through `observability.py`
- that request returned HTTP 500
- later case reads returned HTTP 200

Current classification: **observability persistence timeout leaking into the product request path**, tracked by #998. This is not treated as proof that the analysis pipeline itself failed.

## Current release order

1. #970 real cloud-primary diarization + persisted speaker evidence
2. #971 speaker/transcript/audio alignment
3. #963 historical-case rehydration
4. #930 upload 400 bounding
5. #998 observability persistence isolation
6. #959 complete dual-copy observability / Debug Bundle correlation
7. authenticated desktop/mobile acceptance
8. #972 two same-revision/configuration golden cases
9. scientific validation separately

## Evidence boundary

The September 12 evidence proves current controlled faster-whisper execution, durable transcript checkpointing, transcript/audio alignment, bounded Stage 10 completion, and substantial real browser/UI functionality.

It does not prove current cloud speaker execution, human speaker identity, general deception accuracy, transcript truthfulness, legal admissibility, or scientific validity.
