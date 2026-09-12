# VoxVector Architecture

## Product architecture objective

VoxVector is engineered as a case-centered vocal and audio intelligence platform with a deception-analysis research architecture. Recording intake, private persistence, speech/speaker acquisition, transcription, synchronized audio analysis, evidence synthesis, guarded classification, reporting and audit remain one canonical workflow.

## Evidence-state boundary

Keep these states separate:

`source → QA → deployment → fresh runtime → provider execution → durable artifact readback → browser acceptance → repeated golden cases → scientific validation`

A source contract is not provider execution. Deployment is not browser verification. Engineering validation is not scientific validation.

## Current validated runtime baseline

On 2026-09-12, the deployed backend candidate completed the current constrained speech path on one controlled 183.3-second WAV.

- backend: **0.2.27**
- deployed revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- Render deployment: `dep-daifrgoae00c73ebcc20`
- run result: **17/21 complete, 0 failed, 4 intentionally not run**
- Stage 05: 26 speech segments
- Stage 07 faster-whisper: about 150.1 s
- durable checkpoint: 58 transcript segments / 246 words
- Stage 08 transcript/audio alignment available before Stage 10
- Stage 10 start: 118.6 MB RSS
- Stage 10 admission ceiling: 416 MB
- service memory limit: 512 MB
- Stage 10 acoustic extraction: about 73.8 s
- uncontrolled API restart: none

This closes #941. The first remaining P0 runtime gate is #970.

## Application boundary

```text
Public React application
voxvector/
        |
        | GitHub Pages
        v
https://darenprince.com/voxvector/
        |
        | TanStack Query / API client
        v
https://voxvector.crownlabs.tech
        |
        | FastAPI
        v
VoxVector/api/app.py
        |
        +--> developer Render router
        |    VoxVector/api/render_api.py
        |
        v
VoxVector/src/voxvector/
        |
        +--> ingest
        +--> decode / normalization
        +--> provenance / integrity
        +--> recording assessment
        +--> speech segmentation
        +--> speaker diarization
        +--> transcription
        +--> alignment
        +--> eligibility / reliability
        +--> acoustic / prosodic / temporal / linguistic analysis
        +--> evidence assembly / convergence / conflict
        +--> guarded candidate classification
        +--> validation/calibration gate
        +--> guarded final disposition
        +--> audit / provenance
        |
        v
Supabase
Auth / case data / diagnostics / private media / persistence
```

The React application is presentation and interaction code. It must not recreate the analysis engine. FastAPI is the interface/runtime boundary, not a second engine.

## Deployment endpoints

- `https://darenprince.com/voxvector/` — public React application and protected application routes
- `https://voxvector.crownlabs.tech` — primary Render FastAPI service
- `https://awsapi.crownlabs.tech` — separately addressed AWS API environment

The Render service currently validated is `voxvector-api`, Oregon, live on revision `66f2ea...` with `/health` returning HTTP 200.

## Canonical 21-stage pipeline

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

Stage 05 and Stage 06 must remain in this order on all living surfaces.

## Source maturity versus runtime completion

Fresh health currently reports:

- 21 total stages
- 16 implemented foundations
- 1 queued
- 4 conditional/not invoked

The successful controlled run separately produced 17 completed stages, zero failures and four intentionally not run. These numbers are not contradictory. The first is source/build maturity. The second is one real run outcome.

## Evidence acquisition runtime

Current constrained Render profile:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1
VOXVECTOR_WHISPER_CPU_THREADS=1
VOXVECTOR_WHISPER_NUM_WORKERS=1
VOXVECTOR_WHISPER_ISOLATED_PROCESS=true
VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165
VOXVECTOR_MEMORY_LIMIT_MB=512
VOXVECTOR_MEMORY_HEADROOM_MB=96
VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
```

Fresh health reports faster-whisper and pyannoteAI cloud-primary as execution-ready. Only faster-whisper has current same-revision execution proof. Stage 06 was intentionally not invoked in the successful controlled case.

## Memory-safe phase boundary

Canonical heavy path:

```text
source decode / integrity
        ↓
speech segmentation
        ↓
provider-backed acquisition
        ↓
provider cleanup
        ↓
durable upstream checkpoint
        ↓
Stage 10 route preflight
        ↓
shared Stage 10 admission lock + RSS recheck
        ↓
downstream composite analysis
```

The September 12 run proves the intended boundary works on the validated revision: provider output was checkpointed before Stage 10, memory remained below the configured ceiling, acoustic extraction completed, and the API process did not restart.

## Case-centered data architecture

One analysis case remains the root object for source media, source metadata, provenance, run identity, provider states, speaker evidence, transcript evidence, alignment, analytical tracks, evidence records, lifecycle state, findings, assessment, reports and final disposition.

`run_id` is the stable persisted case-run identity. `pipeline_run_id` remains a distinct analytical UUID.

## Analysis Workspace

The persistent workspace combines:

- source metadata
- protected audio playback
- waveform
- spectral analysis
- speaker regions when available
- transcript and alignment
- analytical tracks
- evidence markers
- pipeline state
- evidence timeline
- guarded assessment/report controls
- case history

The September 12 screenshots visually confirm real case creation, upload, playback, waveform, spectral rendering, pitch trajectory, source metadata and live pipeline progression.

## Operational observability

The API includes sanitized request/lifecycle diagnostics and durable Supabase-backed observability plus protected Render status/log/debug routes.

A real Debug Bundle was generated for the successful controlled run with case/run state, runtime health, Render status and 100 Render logs. Exact exported VoxVector event/error correlation remains incomplete under #959.

A separate browser validation case reproduced an HTTP 500 caused by a `TimeoutError` while diagnostic middleware persisted a completed-request record. `/health` remained healthy and later reads succeeded. #998 owns the architectural requirement that diagnostic persistence be best-effort/non-fatal to product requests.

## Authentication and account boundary

Authentication remains owned by `voxvector/src/components/AuthGate.jsx`. Login-time API wake is connectivity/readiness behavior only and is not analysis execution. Trusted role and permission enforcement must remain separate from editable profile metadata.

## Current engineering sequence

```text
#970 cloud-primary diarization execution + speaker persistence
        ↓
#971 speaker/transcript/audio alignment
        ↓
#963 historical-case rehydration
        ↓
#930 upload reliability bounding
        ↓
#998 observability persistence isolation
        ↓
#959 complete dual-copy observability / Debug Bundle correlation
        ↓
authenticated desktop/mobile acceptance
        ↓
#972 frozen candidate + two same-revision/configuration golden cases
        ↓
scientific validation program
```

## Engineering principles

- one canonical analysis engine
- one canonical case model
- one canonical 21-stage pipeline
- one synchronized analytical time axis
- frontend status derived from real backend state
- every visualization has a data contract
- every evidence record has provenance
- completed upstream artifacts persist before dependent heavyweight work
- operational memory admission is separate from scientific eligibility
- case-run identity is distinct from pipeline-internal identity
- process identity is distinct from hosting instance identity
- provider readiness is distinct from provider execution
- observability failure must not fabricate product failure
- browser verification is distinct from runtime execution
- scientific validation remains separate from engineering completion
