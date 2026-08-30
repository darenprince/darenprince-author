# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-08-30

This document is an engineering status record, not a claim that every pipeline stage is currently implemented or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake | upload contract hardening in progress |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization | covered by existing API/runtime tests |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source/run provenance | covered by case-store tests |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile | runtime exercised by pipeline |
| 05 | Speaker Identification / Diarization | **queued** | not executed by current case run | test plan required |
| 06 | Speech Segmentation | **implemented foundation** | deterministic energy/voicing segmentation | deterministic tests exist |
| 07 | Transcription Generation | **queued** | production transcription not attached | integration test required |
| 08 | Transcript Alignment | **queued** | transcript alignment not attached | integration test required |
| 09 | Eligibility and Reliability | **implemented** | recording eligibility/reliability result | covered by pipeline tests |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations | covered by acoustic/pipeline tests |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests exist; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests exist |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires supplied transcript | unit tests exist; transcript integration required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing unit tests exist; product integration required |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests exist |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records from observations | evidence tests exist |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests exist |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains indeterminate in current observational runtime | classification tests exist |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current run | validation harness is roadmap work |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | current runtime returns indeterminate/insufficient-evidence disposition | disposition tests exist |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted | case-store/provenance coverage exists |

### Current count

- **14 stages have implemented runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **3 stages remain queued for deeper runtime integration**
- **21 stages are represented in the canonical pipeline contract**

The 14 implemented foundations do not mean fourteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Dashboard representation

The Developer Console dashboard now exposes this same build matrix through an expandable **21-stage build** control. When collapsed, the control identifies the **current engineering stage** and key counts. When expanded, it lists all 21 stages with semantic build-state indicators.

The dashboard representation is an operator view of this canonical document. It must not become an independent source of truth.

## Current engineering stage

**Upload and intake reliability** is the current engineering stage because downstream case workflow reliability depends on successful source acceptance, persistence, retrieval, and playback.

**Next dependency:** stage telemetry and real per-stage lifecycle reporting.

After that, the immediate dependency chain is:

**speaker and transcript foundation → evidence workspace → validation and calibration gate.**

## Build status

The latest GitHub Pages production deployment associated with commit `4b922c10356c8c12aff96c719db0a6f23afc42d1` completed successfully. The Pages build and artifact verification steps passed, and the Pages deployment completed successfully.

The repository's VoxVector QA workflow exists and is configured to run backend pytest followed by the React dependency installation and production build. A current post-change QA result for the latest hardening commits is **not being claimed** here because the available workflow records do not expose a completed QA run for the latest commit.

## Testing statistics

### Last recorded backend baseline

The project decision log records a prior successful backend suite of:

**91 passed in 0.56s**

That result predates the current upload/storage hardening and therefore is retained as historical baseline evidence rather than presented as current QA.

### Current verification requirement

The next QA run must establish:

1. Python dependency installation succeeds on the pinned Python 3.11 runtime.
2. All backend tests pass.
3. WAV upload contract tests pass.
4. Case source persistence tests pass.
5. React dependency installation succeeds without peer-resolution bypasses.
6. React production build succeeds.
7. GitHub Pages artifact verification succeeds.
8. Browser verification confirms the Developer Console can create a case, upload a real WAV, retrieve the persisted source, generate playback, execute case-bound analysis, and render the returned 21-stage state.

## Upload investigation status — 2026-08-30

The Developer Console upload client was hardened again because the reported failure could not be conclusively reproduced from the protected authenticated environment available to this session.

### Client changes

- validates filename, non-zero size, and the 250 MB upload ceiling before network activity;
- keeps browser-managed multipart boundaries;
- emits an explicit upload → processing → completed/failed state sequence;
- includes the request correlation ID in user-visible upload failures;
- reports HTTP status and backend detail instead of collapsing all failures into a generic message;
- reports timeout, network, and cancellation separately.

### Storage changes

The server-side Supabase media adapter was hardened to:

- check for an existing media bucket before attempting creation;
- tolerate the already-exists race;
- accept WAV and common WAV MIME variants plus `application/octet-stream`;
- use a 10 second storage request timeout by default;
- retry transient 429/502/503/504 and transport failures;
- reject empty media objects;
- enforce the configured media size limit.

These changes are operational reliability work. They do not create new scientific evidence or deception inference.

## Developer Console chrome and API startup — 2026-08-30

The canonical `SiteHeader` now owns the product and Developer Console header behavior.

- The header is sticky to the top of the viewport.
- Desktop logo dimensions are constrained so the wordmark and icon no longer blow out the header bar.
- Mobile header dimensions are reduced proportionally.
- The Developer Gate login shell also uses a sticky header.
- The authenticated Developer Console automatically polls `/health` while the API is unavailable or waking from sleep.
- The startup surface displays an animated initializing state while the health request is unresolved.
- When the API reports healthy, the surface changes to a ready state and slides down/out automatically.
- Failed health checks remain visible as a reconnecting state and continue retrying rather than requiring a manual restart.

The health polling is a wake-up mechanism through the canonical API endpoint. It does not create a second API service or duplicate backend behavior.

## Documentation synchronization

The Developer Console build-status surface, MVP task board, and relevant Crown Labs mirror must stay synchronized with this document.

When pipeline state, stage execution, or the current engineering priority changes, update the appropriate canonical implementation records and review:

- `VoxVector/docs/ANALYSIS_PIPELINE.md`
- `VoxVector/docs/ARCHITECTURE.md`
- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/`

## Next pipeline build sequence

The next implementation sequence is deliberately ordered around real dependencies:

### 1. Upload and intake

Prove the complete case-source path first. No downstream stage should be treated as healthy if source persistence is unreliable.

### 2. Stage telemetry

Move stage execution state from hard-coded case-route labels toward actual stage instrumentation with:

- `pending`
- `running`
- `complete`
- `not_run`
- `failed`
- start time
- completion time
- duration
- input references
- output references
- method IDs
- error references

### 3. Speaker and transcript foundation

Implement speaker segmentation/diarization, transcription generation, and transcript alignment as real backend stages instead of queued labels.

### 4. Evidence workspace

Expose normalized evidence records and source intervals from the canonical backend stage output.

### 5. Validation gate

Build the evaluation harness, calibration layer, uncertainty reporting, and speaker-disjoint testing before promoting inferential classification capability.

## Verification boundary

A successful build means the software compiled and tests that actually ran passed. It is not scientific validation.

A successful upload means the source was accepted and persisted. It is not evidence that the recording contains reliable deception indicators.

A completed pipeline run means the configured software stages executed. It is not proof that any individual vocal feature proves deception.
