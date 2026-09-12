# VoxVector System State Report

**Living engineering status**

## Current authority

- backend release: **0.2.27**
- frontend release: **0.2.37**
- deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- canonical branch: `main`

## Executive state

VoxVector is a working case-centered vocal/audio intelligence platform with a 21-stage engineering contract, protected case workflow, private persistence, live Developer Console, production Render deployment and current same-revision controlled speech execution.

The September 12 validation materially advances the engineering state: the current deployed candidate completed a full constrained transcription-through-Stage-10 run without restart. The next major runtime blocker is now cloud-primary diarization, not transcription durability.

## Current controlled run

Controlled source: 183.3-second WAV.

- run completed in **247,984 ms**
- **17/21 complete, 0 failed, 4 intentionally not run**
- 26 speech segments
- faster-whisper about 150.1 s
- 58 transcript segments / 246 words durably checkpointed
- transcript/audio alignment checkpoint present before Stage 10
- Stage 10 admitted at 118.6 MB RSS under 416 MB ceiling / 512 MB limit
- acoustic extraction completed about 73.8 s
- post-GC RSS 128.63 MB
- no uncontrolled Render/API restart

Issue #941 is complete.

## Render

`voxvector-api` is live in Oregon on deployment `dep-daifrgoae00c73ebcc20`, commit `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`. Auto-deploy remains disabled. `/health` is returning 200 and reports backend 0.2.27, runtime self-test passed, 21 total stages, 16 implemented foundations, 1 queued and 4 conditional/not invoked.

Speech runtime reports faster-whisper ready and pyannoteAI cloud-primary configured/execution-ready. Readiness is not diarization execution proof.

## Newly reproduced runtime defect

A separate browser validation session produced one case-read 500 while `/health` remained 200. The traceback shows `TimeoutError: The read operation timed out` during `DIAGNOSTICS.emit()` persistence from diagnostic middleware after a case request. Subsequent case reads succeeded.

Current classification: observability persistence is able to leak a storage/read timeout into an otherwise healthy product request. Diagnostic persistence should be isolated as best-effort/non-fatal.

## Visual evidence

Current Confidential IP PDFs visually verify the Developer Console dashboard, navigation drawer, case creation, source upload, protected playback, waveform/spectral presentation and analysis-stage progression. They also visually capture the fetch failure tied to the observability timeout above.

## Debug evidence

A sanitized Debug Bundle exists for the successful run with case/run data, runtime health, Render status and 100 provider logs. The manifest reports a Supabase Render-log mirror, but zero exported exact VoxVector events and zero correlated error records. #959 therefore remains open.

## Provider state

- **faster-whisper:** current controlled execution and durability proven on deployed revision; #941 closed
- **pyannoteAI cloud:** configured/readiness proven; current real execution and speaker persistence still #970
- **alignment:** transcript/audio alignment proven in the controlled run; speaker-inclusive multimodal alignment remains #971
- **Hugging Face:** optional/local/fallback relevance only; not proof of cloud diarization

## Current release path

1. #970 real cloud diarization + persisted speaker evidence
2. #971 same-run speaker/transcript/audio alignment persistence
3. #963 historical case rehydration
4. #930 upload 400 bounding
5. isolate observability persistence failures from product-request success
6. #959 dual-copy/debug-bundle correlation acceptance
7. authenticated desktop/mobile acceptance
8. #972 two same-revision/configuration golden cases
9. scientific validation separately

## Boundary

The current snapshot proves stronger engineering maturity and repeatability than prior records. It does not authorize deception-accuracy or scientific-validity claims.
