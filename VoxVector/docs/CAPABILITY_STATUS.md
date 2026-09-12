# VoxVector Capability Status

This living document separates source implementation, runtime proof, browser evidence and scientific validation.

## Current source and deployment context

- backend: **0.2.27**
- frontend: **0.2.37**
- deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- current controlled proof date: **2026-09-12**

## Capability matrix

| Capability | Source state | Current evidence | Remaining acceptance |
|---|---|---|---|
| Case create/list/read/delete | implemented | active API + browser evidence | observability timeout isolation; edge cases |
| Private source upload | implemented | successful September 12 persistence | #930 intermittent 400 bounding |
| Source provenance | implemented | SHA-256 confirmed in current run | golden repeatability |
| Protected playback | implemented | browser screenshot evidence | #963 historical reopen proof |
| Speech segmentation | implemented | **current runtime proven: 26 segments** | golden repeatability |
| Speaker diarization | cloud-primary path wired | readiness/configuration proven | **#970 real execution + persisted speaker evidence** |
| Transcription | implemented | **current faster-whisper execution proven: ~150.1 s** | golden repeatability |
| Transcript durability | implemented | **58 segments / 246 words checkpointed before Stage 10** | golden repeatability |
| Transcript/audio alignment | implemented | **current runtime proven before Stage 10** | add speaker dimension under #971 |
| Eligibility / reliability | implemented | current controlled run completed eligible | scientific validation separate |
| Stage 10 admission | implemented | **118.6 MB RSS vs 416 MB ceiling / 512 MB limit** | golden repeatability |
| Acoustic extraction | implemented | **current runtime proven ~73.8 s** | golden repeatability |
| Prosodic / voice quality | implemented foundation | current run completed | scientific interpretation separate |
| Temporal / pause | implemented foundation | current run completed | scientific interpretation separate |
| Linguistic / disfluency | conditional on transcript | current run completed 8 observations / 8 evidence records | scientific interpretation separate |
| Question / answer alignment | conditional | not run; no question context | runtime proof when context exists |
| Within-speaker baseline | conditional | not run; no baseline | runtime proof when baseline exists |
| Cross-method evidence | implemented | current run completed | golden repeatability |
| Convergence / conflict | implemented | current run completed | scientific calibration separate |
| Candidate classification | guarded | current run completed guarded state | no deception-validity claim |
| Validation / calibration | not invoked | intentionally not run | scientific program |
| Final disposition | guarded | current run completed guarded state | scientific authorization separate |
| Audit / provenance | implemented | current run completed | golden completeness proof |
| Debug Bundle | implemented foundation | real sanitized bundle generated | #959 missing exact exported VoxVector events/errors |
| Developer Console | active | current visual evidence across dashboard, drawer, case/upload/playback/analysis | remaining role/mobile acceptance |
| Golden repeatability | not passed | one current controlled run passed | #972 two-run proof |
| General deception validity | not established | no authorized claim | scientific validation |

## #941 status

**Complete.** The current deployed revision completed faster-whisper, durable acquisition checkpointing and Stage 10 without uncontrolled restart.

## Current provider truth

### Transcription

Canonical provider: faster-whisper. Current same-revision execution is now proven on the deployed candidate. This is no longer a readiness-only claim.

### Diarization

Canonical primary provider: pyannoteAI cloud. Fresh `/health` reports the provider configured and execution-ready, but the controlled run intentionally did not invoke Stage 06. #970 remains the next P0 runtime gate.

### Hugging Face

Hugging Face remains optional/local/fallback infrastructure and does not prove the cloud-primary diarization path.

## Runtime reliability finding

A separate browser validation case returned one HTTP 500 because diagnostic persistence timed out inside `DIAGNOSTICS.emit()` after the case request path. `/health` remained 200 and later reads succeeded. Observability must become non-fatal/best-effort so telemetry storage failures cannot create user-visible request failures.

## Visual evidence

September 12 Confidential IP PDFs verify current Developer Console presentation for dashboard health, drawer navigation, case creation, upload, protected playback, waveform/spectral rendering and analysis-stage progression. They also capture the fetch failure associated with the observability timeout case.

## Current release queue

1. #970 cloud diarization
2. #971 speaker-inclusive alignment
3. #963 historical rehydration
4. #930 upload bounding
5. observability timeout isolation
6. #959 full dual-copy/debug correlation
7. authenticated desktop/mobile acceptance
8. #972 two same-revision golden runs
9. scientific validation

## Boundary

One completed controlled run is strong engineering evidence. It is not scientific validation and does not establish general deception-detection accuracy.
