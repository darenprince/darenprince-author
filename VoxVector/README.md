# VoxVector

VoxVector is Crown Labs' case-centered vocal and audio intelligence platform with a deception-analysis research architecture. It connects source intake, private persistence, speech/speaker evidence acquisition, synchronized analysis, evidence synthesis, guarded assessment and auditable reporting in one system.

The repository remains the source of truth for what is actually implemented. Software execution and engineering maturity must not be presented as scientific validation.

## Current source state

- Backend/API/engine: `VoxVector/`
- Public/authenticated React application: `../voxvector/`
- Backend source release: **0.2.27**
- Frontend source release: **0.2.38**
- Current deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- Current engineering handoff: `docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
- Current validation snapshot: `docs/VALIDATION_SNAPSHOT_2026-09-12.md`
- Living version map: `docs/VERSION_MAP.md`
- Living QA record: `docs/QA_STATUS.md`

Frontend and backend are independently versioned. Frontend 0.2.38 contains the Developer Dashboard/file-picker validation repairs; the validated deployed backend remains 0.2.27.

## Canonical 21-stage pipeline

### Prepare

| # | Stage |
|---:|---|
| 1 | File Upload / Ingest |
| 2 | File Decode and Normalization |
| 3 | Provenance and Integrity |
| 4 | Channel and Recording Assessment |

### Understand

| # | Stage |
|---:|---|
| 5 | Speech Segmentation |
| 6 | Speaker Identification / Diarization |
| 7 | Transcription Generation |
| 8 | Transcript Alignment |
| 9 | Eligibility and Reliability |

### Analyze

| # | Stage |
|---:|---|
| 10 | Acoustic Feature Extraction |
| 11 | Prosodic and Voice Quality Analysis |
| 12 | Temporal and Pause Analysis |
| 13 | Linguistic and Disfluency Analysis |
| 14 | Question / Answer Alignment |
| 15 | Within Speaker Baseline |

### Synthesize and Decide

| # | Stage |
|---:|---|
| 16 | Cross Method Evidence Assembly |
| 17 | Evidence Convergence and Conflict |
| 18 | Candidate Classification |
| 19 | Validation and Calibration Gate |
| 20 | Final Classification / Disposition |
| 21 | Audit and Provenance Output |

Stage 05 is Speech Segmentation and Stage 06 is Speaker Identification / Diarization. Historical documents may preserve older numbering, but living product surfaces must use this order.

## Current engineering maturity

Fresh `/health` reports 21 total stages, approximately 16 implemented foundations, one queued stage and four conditional/not-invoked stages.

Separately, the September 12 controlled runtime proof completed **17/21 stages with 0 failed and 4 intentionally not run**. Source maturity and one-run runtime completion are different evidence dimensions.

This is an engineering maturity statement, not a count of validated deception indicators.

## September 12 controlled runtime proof

A controlled 183.3-second WAV completed on deployed backend **0.2.27**, revision `66f2ea...`:

- 26 speech segments
- faster-whisper completed in about 150.1 seconds
- 58 timestamped transcript segments / 246 words durably checkpointed
- transcript/audio alignment available before Stage 10
- Stage 10 admitted at 118.6 MB RSS under a 416 MB ceiling / 512 MB service limit
- acoustic extraction completed in about 73.8 seconds
- no uncontrolled API restart

**#941 passed and is closed.**

## Current provider architecture

### Transcription

Canonical adapter: faster-whisper.

Current same-revision controlled execution, durable transcript checkpointing, transcript/audio alignment and bounded Stage 10 completion are proven on the deployed candidate.

### Speaker diarization

Canonical primary path: pyannoteAI cloud.

Fresh `/health` reports the provider configured and execution-ready. Stage 06 was intentionally not invoked in the successful controlled case, so **#970 is now the first P0 runtime gate**.

### Local fallback

Local pyannote Community-1/Hugging Face tooling is optional fallback infrastructure. It is not the constrained cloud-primary default.

## Developer Console

The Developer Console is the operational engineering cockpit for API health, case workflow, analysis workspace, pipeline projection, diagnostics, GitHub QA, Render status/log/debug evidence, documentation and trusted account functions.

Frontend 0.2.38 updates the actual canonical `DeveloperConsole.jsx` Dashboard directly:

- matched controlled transcription proof is shown as **PROVEN**;
- source-level 16/21 foundations remain separate from the successful 17/21 controlled runtime result;
- **Next Engineering Move** is **#970 diarization**;
- stale `Transcription first`, `execution ready, unverified`, and legacy percentage/count release-readiness copy are removed from the current Dashboard;
- the 28-task checklist is explicitly implementation coverage, not the release gate.

The same release fixes the Case Workbench file picker by passing `setProgress` into `CaseWorkbench`. The existing direct file-input lookup remains defensive fallback only and no second upload path was created.

A focused source-contract regression test guards the file-picker prop and Dashboard proof wording.

## Observability finding

A real sanitized Debug Bundle exists for the successful controlled run, with runtime health, Render status and 100 Render logs plus a Supabase Render-log mirror. Exact exported VoxVector event/error correlation remains incomplete under #959.

A separate browser case reproduced one HTTP 500 caused by a `TimeoutError` while diagnostic middleware persisted a completed-request record. `/health` remained 200 and later reads succeeded. **#998** tracks the requirement that observability persistence be best-effort/non-fatal to product requests.

## Active release path

1. #970 real cloud-primary diarization and persisted speaker evidence
2. #971 persisted speaker/transcript/audio alignment
3. #963 historical-case reopen/playback/artifact/report rehydration
4. #930 upload reliability bounding
5. #998 observability persistence isolation
6. #959 complete dual-copy observability/debug-bundle correlation
7. authenticated desktop/mobile acceptance, including frontend 0.2.38 readback
8. #972 two complete golden cases on one frozen revision/configuration
9. scientific validation as a separate program

## Documentation map

Use these living documents for current-state decisions:

- `docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
- `docs/VALIDATION_SNAPSHOT_2026-09-12.md`
- `docs/SYSTEM_STATE_REPORT.md`
- `docs/VERSION_MAP.md`
- `docs/QA_STATUS.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/MVP_RELEASE_GATE.md`
- `docs/ARCHITECTURE.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/MASTER_METHOD_INDEX.md`
- `docs/VALIDATION.md`

Dated audit/checkpoint documents remain historical evidence and should not be rewritten to look current.

## Evidence rule

Keep this chain explicit:

`source → QA → deployment/publication → fresh runtime readback → provider execution → durable artifact readback → authenticated browser acceptance → repeated golden cases → scientific validation`

Never use an earlier state as proof of a later one.
