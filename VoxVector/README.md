# VoxVector

**VoxVector is a vocal intelligence and deception detection platform being engineered as a complete end to end analysis system.**

It is built around a case centered workflow that turns conversational audio into a structured analytical record through recording intake speaker processing transcription synchronized signal analysis evidence synthesis classification and auditable reporting.

> **Product objective:** build the end product rather than a collection of disconnected analysis utilities.

---

## What VoxVector is building

VoxVector brings the complete analysis lifecycle into one connected system:

```text
Audio / Conversation
        ↓
File Upload and Ingest
        ↓
Decode and Normalization
        ↓
Provenance and Integrity
        ↓
Recording / Channel Assessment
        ↓
Speaker Identification / Diarization
        ↓
Speech Segmentation
        ↓
Transcription Generation
        ↓
Transcript Alignment
        ↓
Eligibility and Reliability
        ↓
Acoustic Analysis
        ↓
Prosodic and Voice Quality Analysis
        ↓
Temporal and Pause Analysis
        ↓
Linguistic and Disfluency Analysis
        ↓
Question / Answer Alignment
        ↓
Within Speaker Baseline
        ↓
Cross Method Evidence Assembly
        ↓
Evidence Convergence / Conflict
        ↓
Candidate Classification
        ↓
Validation / Calibration Gate
        ↓
Final Classification / Disposition
        ↓
Audit / Provenance Output
```

The architecture deliberately separates eligibility and reliability from evidence collection from candidate classification from final disposition. The same case identity follows the source asset through the complete workflow.

---

## The 21 stage pipeline

The canonical pipeline is organized into four operating groups.

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
| 5 | Speaker Identification / Diarization |
| 6 | Speech Segmentation |
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

The complete stage specification is maintained in `docs/ANALYSIS_PIPELINE.md`.

---

## Analysis methods

The current engine already provides a broad set of signal and behavioral observations. These are the building blocks for the larger evidence system.

### Acoustic and signal observations

- RMS / energy
- relative intensity / dB
- zero crossing rate
- spectral centroid
- spectral spread
- fundamental frequency
- harmonicity
- HNR
- spectral flux
- spectral rolloff
- MFCC / cepstral coefficients
- formant candidate tracking

### Prosodic and temporal observations

- F0 dynamics
- intensity dynamics
- pause topology
- speech timing
- response latency when timing is supplied
- turn structure as speaker processing expands

### Linguistic observations

- transcript disfluency when transcript data is supplied
- lexical observations
- question / response context
- transcript timing
- speaker attributed language analysis as transcription and diarization mature

### Comparative observations

- within speaker baseline deviation
- cross method evidence grouping
- evidence convergence
- evidence conflict
- reliability state
- source and method provenance

The complete data point inventory is maintained in `docs/MASTER_METHOD_INDEX.md`. Method definitions live in `docs/ANALYSIS_METHODS.md`.

---

## End to end product experience

VoxVector is being developed around a persistent case and a synchronized Analysis Workspace.

### Case

A case is the root identity for an analysis. It connects:

- case ID
- analysis ID
- analysis run ID
- source asset
- source metadata
- provenance
- recording metadata
- speakers
- speaker segments
- speech segments
- transcript
- transcript segments
- transcript words
- alignment records
- analytical tracks
- feature observations
- evidence records
- pipeline stage state
- lifecycle events
- findings
- assessment
- reports
- final disposition

### Analysis Workspace

The workspace is designed around one shared audio time axis.

Core surfaces include:

- source metadata
- persisted audio playback
- decoded waveform
- shared playhead
- pipeline state
- speaker regions
- transcript
- analytical tracks
- evidence markers
- evidence timeline
- assessment state

Current workspace engineering already includes real source waveform generation and persisted run stage inspection. Stage records can be expanded to inspect status timing duration outcome and persisted errors.

The next connected layers are speaker processing transcription alignment analytical tracks and evidence visualization.

---

## Developer Console

The Developer Console is the engineering cockpit for building VoxVector.

It provides the operational path for:

- API health and runtime inspection
- case creation
- case selection and reopening
- source upload
- provenance inspection
- analysis run creation
- persisted pipeline state
- diagnostic events
- methodology navigation
- MVP engineering priorities
- Analysis Workspace access
- expandable pipeline stage inspection

The console is intentionally connected to real backend contracts rather than maintaining a separate simulated application state.

The fastest connected MVP path is tracked in `docs/MVP_BUILD_PLAN.md`.

---

## Synchronized analytical viewer

The primary analytical viewer uses one shared time axis so different evidence families can be inspected against the same moment in the recording.

### Initial tracks

- waveform
- pitch / F0
- intensity
- spectral energy
- speech activity
- pauses

### Expanded tracks

- formants
- HNR
- spectral flux
- spectral rolloff
- MFCC
- jitter
- shimmer
- voice quality
- response latency
- speaker turns
- transcript alignment
- evidence events

Every analytical track must be driven by canonical analysis data. The interface is not permitted to manufacture analytical telemetry.

---

## Evidence model

VoxVector is designed to move from isolated observations to structured evidence.

Each evidence item should retain:

- source identity
- source interval
- speaker identity when available
- method identity
- observation identity
- measurement
- quality / reliability
- evidence direction
- contextual relationship
- provenance
- dependencies

The synthesis layer then organizes evidence into:

- convergence
- conflict
- dependency relationships
- alternative hypotheses
- candidate assessments
- calibrated final outputs

No single vocal or linguistic feature is treated as an independent proof of deception. The system is engineered to combine multiple evidence families through an explicit analytical architecture.

---

## Classification architecture

Classification is deliberately downstream of measurement and evidence.

```text
Eligibility / Reliability
          ↓
Evidence Collection
          ↓
Evidence Synthesis
          ↓
Candidate Classification
          ↓
Validation / Calibration Gate
          ↓
Final Classification / Disposition
```

This separation makes the system auditable and gives engineering a clear path from raw observations to validated inferential capability.

The validation program covers defined tasks and populations rather than treating software execution as scientific validation.

---

## Current implementation status

The repository currently contains working foundations across the intake pipeline case model analysis engine API and developer experience.

### Backend and engine

- canonical `VoxVectorPipeline`
- FastAPI runtime adapter
- authenticated case workflow
- case creation and retrieval
- WAV source upload
- source metadata extraction
- SHA-256 source hashing
- private durable media storage
- signed playback URL generation
- case bound analysis runs
- persisted pipeline stage state
- request correlation
- lifecycle diagnostics
- durable diagnostic storage adapter
- acoustic feature extraction
- F0 and intensity dynamics
- HNR
- spectral flux
- spectral rolloff
- formant candidate tracking
- pause topology
- optional response latency
- optional transcript disfluency observations
- optional within speaker baselines
- evidence grouping
- reliability gate

### Frontend

- React / Vite application
- authenticated application shell
- Developer Console
- real API client
- case workbench
- source upload workflow
- upload progress
- signed media playback
- local WAV waveform generation
- persistent Analysis Workspace
- synchronized playhead foundation
- pipeline stage inspector
- methodology navigation
- MVP task board foundation

### Operational architecture

- GitHub Pages public frontend deployment
- Render backend deployment
- Supabase authentication and persistence integration
- API request correlation
- durable lifecycle diagnostics

Implementation state is tracked in `docs/CAPABILITY_STATUS.md` rather than inferred from this overview.

---

## Product development path

The fastest connected path to the end product is:

```text
1. Case identity
2. Intake and provenance
3. Audio playback and waveform
4. Real pipeline lifecycle
5. Speaker processing
6. Transcription
7. Transcript alignment
8. Analytical tracks
9. Evidence normalization
10. Evidence synthesis
11. Assessment
12. Reporting
13. History and reopen
14. Browser verification
```

The immediate engineering sequence is therefore centered on real speaker segmentation and diarization contracts followed by transcription generation and synchronization into the existing Analysis Workspace.

Planned research capabilities are preserved in the canonical capability register and roadmap. They are not silently promoted into implemented functionality.

---

## Repository structure

```text
VoxVector/
├── api/                    FastAPI HTTP adapter
├── src/voxvector/          canonical analysis engine
├── tests/                  automated software QA
└── docs/                   canonical technical documentation

voxvector/
├── src/                    React / Vite application
├── public/                 frontend public assets
└── ...                     frontend configuration and build files
```

The repository root contains both product workspaces because the public React application and backend engine have deliberately separated deployment responsibilities.

### Deployment boundary

```text
https://darenprince.com/voxvector/
        public React application

https://darenprince.com/voxvector/developer/
        authenticated Developer Console

https://voxvector.crownlabs.tech
        canonical FastAPI API
```

GitHub Pages hosts the frontend.

Render hosts the backend API.

The root `voxvector.html` is a compatibility redirect and is not a second application.

---

## Documentation map

### Governing documents

- `docs/OPERATING_CHARTER.md` — product identity architecture authority and engineering rules
- `docs/PROJECT_DECISION_LOG.md` — durable architectural decisions

### Architecture and product

- `docs/ARCHITECTURE.md` — complete system architecture
- `docs/ANALYSIS_PIPELINE.md` — canonical 21 stage pipeline
- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md` — product and workspace UX architecture
- `docs/MASTER_METHOD_INDEX.md` — complete method and data point inventory

### Capability and engineering

- `docs/CAPABILITY_STATUS.md` — implementation and capability maturity map
- `docs/MVP_BUILD_PLAN.md` — fastest connected MVP path
- `docs/ROADMAP.md` — longer range product and research roadmap
- `docs/RESEARCH_INTEGRATION.md` — research to product integration boundary
- `docs/RESEARCH_METHOD_EXPANSION.md` — research derived engineering backlog

### Analysis and validation

- `docs/ANALYSIS_METHODS.md` — analytical method definitions
- `docs/METHOD_QA_MATRIX.md` — software QA coverage
- `docs/VALIDATION.md` — scientific validation program and requirements
- `docs/RESULTS_CONTRACT.md` — result schema and output contract

### Operations

- `docs/SYSTEM_STATE_REPORT.md` — repository and runtime state
- `docs/VERSION_MAP.md` — version and deployment state
- `docs/DEPLOYMENT_PLAN_FREE.md` — deployment runbook
- `docs/DOCS_ALIGNMENT_2026-08-20.md` — documentation synchronization audit
- `docs/PROJECT_CHECKPOINT_2026-08-20_WORKSPACE_PIPELINE_INSPECTION.md` — recent workspace pipeline implementation checkpoint

---

## Development

### Requirements

- Python 3.12+
- Node.js / npm for the React frontend
- Supabase configuration for authenticated persistence workflows
- Render configuration for the backend deployment

### Backend

```bash
cd VoxVector
python -m pip install -e '.[dev]'
pytest
```

### Frontend

```bash
cd voxvector
npm install
npm run build
```

Use the repository's active configuration and documentation as the authority for deployment commands and environment variables.

---

## Engineering rules

VoxVector is built from the repository canon.

- one canonical analysis engine
- one canonical case model
- one 21 stage pipeline
- one synchronized analytical time axis
- real backend state drives the frontend
- every visualization has a data contract
- every evidence record has provenance
- every analytical stage has defined inputs and outputs
- implementation state is documented separately from validation state
- planned product capabilities remain preserved
- scientific validation is an explicit engineering workstream
- accessibility and responsive behavior are part of completion
- deployment is verified rather than assumed

Never invent measurements validation results datasets model performance or completed integrations.

---

## Project status

VoxVector is actively under development toward the complete end to end product described above.

The repository is the source of truth for what is actually implemented. This README provides the project map and architecture overview; the linked canonical documents provide the detailed implementation and validation state.
