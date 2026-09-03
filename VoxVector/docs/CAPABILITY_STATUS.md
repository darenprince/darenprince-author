# VoxVector Capability Status

This document distinguishes the product end state from current implementation state and scientific validation state.

An unimplemented capability remains active product scope.

## Product objective

VoxVector is being built as a vocal and audio deception detection system.

The intended product combines multiple evidence families through a connected case-centered pipeline.

## Status vocabulary

- **Implemented** — code exists with repository QA coverage or deterministic boundary tests.
- **Integrated** — implemented and orchestrated by the primary `VoxVectorPipeline`.
- **Implemented but not primary integrated** — reusable implementation exists outside the primary output contract.
- **Planned research** — retained product capability awaiting implementation evaluation or validation.
- **Validated inferential** — reserved for a defined method and task that has completed the validation program.
- **Retired** — removed only through an explicit project decision.

## Canonical 21 stage capability map

| Stage | Current state | Product target |
|---|---|---|
| File Upload / Ingest | Integrated | Durable multi-format case intake |
| File Decode and Normalization | Integrated | Canonical normalized media pipeline |
| Provenance and Integrity | Integrated | Immutable source and run provenance |
| Channel and Recording Assessment | Integrated / expanding | Full recording and artifact assessment |
| Speaker Identification / Diarization | Runtime dependency installed; execution provider-gated | Production speaker-aware analysis |
| Speech Segmentation | **Integrated** | Production speech region segmentation |
| Transcription Generation | Runtime dependency installed; execution provider-gated | Production timestamped ASR |
| Transcript Alignment | Planned research | Word and audio synchronization |
| Eligibility and Reliability | Integrated | Complete eligibility and reliability gate |
| Acoustic Feature Extraction | Integrated | Expanded acoustic observation layer |
| Prosodic and Voice Quality Analysis | Integrated foundation | Expanded prosodic and source analysis |
| Temporal and Pause Analysis | Integrated | Expanded interaction timing |
| Linguistic and Disfluency Analysis | Integrated when transcript supplied | Production linguistic intelligence |
| Question / Answer Alignment | Integrated when supplied | Full conversational alignment |
| Within Speaker Baseline | Integrated when baseline supplied | Persistent baseline workflows |
| Cross Method Evidence Assembly | Integrated | Expanded evidence graph |
| Evidence Convergence and Conflict | Integrated foundation | Dependence-aware multimethod synthesis |
| Candidate Classification | Integrated boundary | Validated task-specific candidate models |
| Validation and Calibration Gate | Planned research | Production validation gate |
| Final Classification / Disposition | Integrated boundary | Validated final disposition architecture |
| Audit and Provenance Output | Integrated | Complete auditable case package |

## Current input capabilities

The authenticated case intake workflow supports:

- case creation
- case listing
- case retrieval
- WAV source upload
- WAV metadata extraction
- source SHA-256 hashing
- durable private media storage
- signed playback URL generation
- source provenance persistence
- case-bound analysis run creation
- live persisted run state updates
- persisted prior runs for later review

The legacy `/v1/analyze` endpoint remains available as the direct analysis compatibility path.

## Developer Console status

The Developer Console is an active engineering cockpit with:

- runtime health
- case creation and selection
- compatible WAV intake and upload progress
- secure playback request path
- case-bound analysis path
- persisted 21-stage run state
- live run polling during active analysis
- Case History with persisted case reopen
- Analysis Workspace access
- diagnostic event and error surfaces
- server-side Render Runtime service/deployment/instance/log surface
- methodology and pipeline navigation
- MVP task tracking
- developer profile and sign out
- collapsible workbench sections
- Expand All / Collapse All
- scroll-safe sidebar navigation
- route scroll reset
- visible startup initialization progress
- consistent human-readable runtime/test status labels

The console's 21-stage status is an engineering projection of the canonical stage contract. It does not imply that all stages are executed on every run or scientifically validated.

## Render integration status

The repository contains `VoxVector/api/render_api.py` and authenticated routes:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

The bridge is environment-gated and reads `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the API runtime environment. The credentials are not exposed to browser code.

The GitHub Actions workflow `.github/workflows/render-observability.yml` separately consumes repository secrets with those names. GitHub repository secrets are not automatically injected into the Render service process.

## Live analysis capability

The case-analysis endpoint persists a run in `running` state before the main processing call and updates persisted state at actual route-boundary lifecycle points. The console polls the case record while analysis is active.

Where the monolithic analytical engine does not expose internal callbacks, the UI shows an indeterminate activity animation rather than inventing granular stage progress or timing.

## Speech segmentation implementation

Stage 06 has a real deterministic engine under `src/voxvector/speech_segmentation.py` and is integrated into `VoxVectorPipeline`.

The current implementation:

- consumes frame-level RMS energy
- consumes frame-level voicing derived from F0
- establishes a relative energy threshold
- removes very short active runs
- bridges short inactive gaps
- emits timestamped speech segments
- emits a segmentation confidence value
- assigns a method ID for provenance
- adds speech segment count
- adds total speech duration
- adds speech activity ratio
- persists segment IDs in the analysis result contract

This is the first concrete implementation of the speaker/transcript dependency path. It provides speech intervals that later speaker diarization and transcription stages can consume.

## Planned speaker and transcript capabilities

- production speaker identification
- diarization
- speaker separation
- overlap handling
- speaker confidence
- speaker-aware transcript attribution
- production ASR
- segment timestamps
- word timestamps
- transcript confidence
- forced alignment
- audio transcript synchronization
- question and response alignment

## Deception inference development

The product architecture preserves the full path toward:

- multimethod evidence convergence
- dependence-aware evidence synthesis
- calibrated uncertainty
- explicit decision thresholds
- speaker-disjoint evaluation
- cross-dataset evaluation
- recording-condition stress tests
- identity sensitivity testing
- subgroup robustness
- language robustness where appropriate
- external replication
- validated candidate classifiers
- calibrated deception probability
- confidence matrices
- final classification and disposition

## Operational status

| Area | State |
|---|---|
| Render backend | working baseline |
| `/health` | observed working |
| Runtime self test | observed passed during successful deployment |
| Request correlation | implemented |
| Lifecycle diagnostics | implemented |
| Durable diagnostic storage adapter | implemented |
| Durable media storage adapter | implemented in code |
| Case persistence API | implemented |
| Case-bound analysis API | implemented |
| Persisted case history | implemented |
| Live case run state | implemented, deployment verification required |
| Server-side Render API bridge | implemented, Render env verification required |
| `/v1/analyze` normal path stability | open incident history remains under investigation |
| Production diagnostic secret configuration | verification required |
| Production media bucket configuration | verification required |
| Current frontend CI | fresh verification required for this feature branch |

## Frontend status

| Area | State |
|---|---|
| React application shell | implemented |
| GitHub Pages deployment configuration | implemented |
| Developer Console | active implementation |
| API workbench | implemented |
| Real upload progress | implemented |
| Case API client contracts | implemented |
| Audio player | implemented foundation |
| Local WAV waveform | implemented foundation |
| Diagnostic event browser | implemented foundation |
| Methodology navigation | implemented |
| MVP task board | implemented foundation |
| 21-stage dashboard status card | implemented |
| Dashboard current engineering stage | implemented |
| Expandable per-stage build state | implemented |
| Collapsible workbench steps | implemented |
| Case History | implemented, browser verification required |
| Live analysis progress projection | implemented, deployed verification required |
| Render Runtime view | implemented, Render env verification required |
| Analysis Workspace | active implementation target |
| Case intake UI wiring | implemented foundation; browser verification required |
| Signed media playback wiring | implemented foundation; browser verification required |
| Full 21 stage backend lifecycle integration | active implementation target |
| Browser end-to-end verification | required |

## Scientific status rule

Implementation does not equal scientific validation.

A measured feature remains an observation until the defined validation program supports inferential use for a specified task and population.

The product objective remains deception detection throughout the engineering program.

## Documentation authority

- `docs/MASTER_METHOD_INDEX.md` — complete data point inventory
- `docs/ANALYSIS_METHODS.md` — method definitions
- `docs/METHOD_QA_MATRIX.md` — software QA controls
- `docs/VALIDATION.md` — scientific validation requirements
- `docs/ROADMAP.md` — future development
- `docs/MVP_BUILD_PLAN.md` — fastest connected implementation path
- `docs/PIPELINE_BUILD_STATUS.md` — current 21-stage build state
- `docs/CURRENT_ENGINEERING_STATE_2026-08-30.md` — current implementation audit
- `docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md` — console-specific synchronization rules
- `docs/ENGINEERING_PLAN_2026-09-01.md` — engineering plan and dependency order
- `docs/ENGINEERING_SYNC_2026-09-01.md` — active synchronization record
- `docs/QA_STATUS.md` — software QA state

## 2026-09-01 integration update

A real production case successfully executed the configured connected path from case workflow through source upload, private media persistence, case-bound analysis, and analysis completion. Production `/health`, case listing, and case retrieval returned `200 OK`, and valid `VOXVECTOR_DIAGNOSTIC` events were emitted.

This changes the operational maturity classification of the already implemented case/upload/analysis capabilities from source-only or unverified to **production executed for the observed workflow**. It does not promote any analytical method, candidate classifier, or final disposition to scientifically validated status.

## Evidence acquisition update — 2026-09-01

**Implemented foundation**

- evidence acquisition module
- normalized media profile contract
- speech/silence timeline contract
- optional provider-neutral transcription contract
- persisted acquisition artifact attached to the canonical case analysis run
- provider readiness state reporting

**Not yet verified in production**

- production transcription execution
- speaker diarization execution
- word-level production timestamps
- speaker assignment
- transcript/audio alignment under real provider output

These states remain intentionally separated. The foundation provides contracts and artifacts without claiming unavailable providers have produced data.

## 2026-09-03 Live API configuration audit

The observed live API health contract reported the acoustic foundation healthy with runtime self-test passed. Speech adapters were installed but transcription and diarization providers were not configured, and the expected Hugging Face credential was not visible to the running process. These remain configuration and execution-readiness work, not validated capability. See `docs/audits/LIVE_API_SPEECH_RUNTIME_AUDIT_2026-09-03.md` and `docs/DEPLOYMENT_VARIABLE_MATRIX.md`.
