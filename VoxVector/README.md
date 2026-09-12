# VoxVector

VoxVector is Crown Labs' case-centered vocal and audio intelligence platform with a deception-analysis research architecture. It connects source intake, private persistence, speech/speaker evidence acquisition, synchronized analysis, evidence synthesis, guarded assessment and auditable reporting in one system.

The repository remains the source of truth for what is actually implemented. Software execution and engineering maturity must not be presented as scientific validation.

## Current source state

- Backend/API/engine: `VoxVector/`
- Public/authenticated React application: `../voxvector/`
- Backend source release: **0.2.27**
- Frontend source release: **0.2.37**
- Current engineering handoff: `docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
- Living version map: `docs/VERSION_MAP.md`
- Living QA record: `docs/QA_STATUS.md`

Frontend and backend are independently versioned.

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

The complete contract is `docs/ANALYSIS_PIPELINE.md`. Stage 05 is Speech Segmentation and Stage 06 is Speaker Identification / Diarization. Historical documents may preserve older numbering, but living product surfaces must use this order.

## Current engineering maturity

Approximately 16 stages have implemented analytical/runtime foundations. Four are conditional or intentionally not invoked without required inputs/authorization. Current cloud-primary speaker execution and persisted multimodal alignment remain open. Historical faster-whisper execution is proven, while current same-revision repeatability and Stage 10 containment remain release gates.

This is an engineering maturity statement, not a claim of sixteen validated deception indicators.

## Case-centered product flow

```text
Create/open case
    ↓
Persist source + provenance
    ↓
Decode / recording assessment
    ↓
Speech segmentation
    ↓
Speaker diarization when enabled
    ↓
Transcription
    ↓
Transcript/audio/speaker alignment
    ↓
Durable upstream checkpoint
    ↓
Operational Stage 10 memory admission
    ↓
Acoustic / prosodic / temporal / linguistic analysis
    ↓
Evidence assembly + convergence/conflict
    ↓
Guarded candidate assessment
    ↓
Validation/calibration gate when authorized
    ↓
Guarded final disposition + audit/provenance
```

Eligibility/reliability, operational memory admission, evidence collection, candidate classification, final disposition and scientific validation are deliberately separate concepts.

## Current analytical foundation

The engine contains structured observations across multiple evidence families, including:

- RMS/intensity and energy behavior
- zero-crossing rate
- spectral centroid/spread/flux/rolloff
- F0 and pitch dynamics
- harmonicity / HNR
- MFCC / cepstral observations
- formant candidate tracking
- pause topology and timing
- response latency when supplied
- transcript disfluency when supplied
- optional within-speaker baseline
- evidence grouping, convergence/conflict and provenance structures

Reusable utilities also include jitter, shimmer, pulse-period, cepstral and interaction-timing work.

These measurements are evidence inputs. No single vocal or linguistic feature is treated as proof of deception.

## Current provider architecture

### Transcription

Canonical adapter: faster-whisper.

Historical controlled beam-1 execution completed successfully. #941 remains the current-revision controlled durability/Stage 10 proof gate.

### Speaker diarization

Canonical primary path: pyannoteAI cloud.

Provider wiring/readiness is not provider execution. #970 remains the real current cloud execution and persisted speaker-evidence gate.

### Local fallback

Local pyannote Community-1/Hugging Face tooling is optional fallback infrastructure. It is not the constrained cloud-primary default.

## Developer Console

The Developer Console is the operational engineering cockpit for:

- API health and live version/source evidence
- case creation/reopen/source upload/playback
- Analysis Workspace
- 21-stage pipeline projection
- lifecycle/diagnostic evidence
- GitHub QA evidence
- Render status/log/debug controls through protected server routes
- documentation and engineering-status navigation
- role/permission-gated account functions

Current startup UI reads web version from `voxvector/package.json` and API version from `/health`. Its 21-stage startup check is **Pipeline contract**, so a completed check means the backend reported the canonical contract. The separate foundations count communicates maturity.

## Current frontend

The React application currently includes:

- public landing and styled reference pages
- Request Access → canonical login
- route-safe landing anchors and restored hash navigation
- human site map
- protected user and Developer Console entry
- one-shot login-time API wake
- shared role-aware self-profile implementation
- backend-driven pipeline status projection
- current hero artwork with obsolete legacy darkening styles retired

Final authenticated desktop/mobile acceptance remains separate from source/CI completion.

## Persistence and operations

Current architecture uses:

- GitHub for source, issues and CI
- GitHub Pages for the public React app
- FastAPI for the backend HTTP boundary
- Supabase for authentication, private storage, diagnostics and persistence
- Render for the primary API boundary
- a separately addressed AWS API environment

Current operational state is documented in `docs/SYSTEM_STATE_REPORT.md` and `docs/ENDPOINT_REGISTRY.md`.

## Active release path

1. #941 controlled current-revision transcription/durability/Stage 10 proof
2. #970 real cloud-primary diarization and persisted speaker evidence
3. #971 persisted transcript/audio/speaker alignment
4. #963 historical-case reopen/playback/artifact/report rehydration
5. #930 upload reliability bounding
6. #959 production observability/debug-bundle acceptance
7. authenticated desktop/mobile acceptance for merged frontend/auth work
8. #972 two complete golden cases on one frozen revision/configuration
9. scientific validation as a separate program

## Repository structure

```text
VoxVector/
├── api/                    FastAPI HTTP adapter
├── src/voxvector/          canonical analysis engine
├── tests/                  backend/software QA
└── docs/                   canonical technical documentation

voxvector/
├── src/                    React/Vite application
├── public/                 public assets
└── tests/                  frontend contract/behavior QA
```

## Development

Backend:

```bash
cd VoxVector
python -m pip install -e '.[dev]'
pytest
```

Frontend:

```bash
cd voxvector
npm install
npm test
npm run build
```

Use the active repository documentation for current environment variables, deployment boundaries and provider configuration.

## Documentation map

Use these living documents for current-state decisions:

- `docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
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
