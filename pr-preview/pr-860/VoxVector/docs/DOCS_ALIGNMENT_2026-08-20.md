# VoxVector Documentation Alignment — 2026-08-20

## Purpose

This record documents the cross-document alignment pass performed after the reference-screen review and the Developer Console MVP planning work.

The reference screens are treated as the product experience target. The repository remains the technical source of truth for what is implemented and verified.

## Documents reviewed

The active VoxVector documentation set was reviewed across these domains:

- operating authority
- project decisions
- architecture
- product experience
- UI application architecture
- analysis pipeline
- implementation plan
- MVP build plan
- roadmap
- capability status
- master method index
- method QA matrix
- validation
- results contract
- research integration
- research method expansion
- runtime constraints
- storage and observability
- deployment
- QA status
- version map
- AI project instructions
- product messaging policy
- developer access
- executive summary
- system state
- Crown Labs VoxVector architecture mirror
- Crown Labs VoxVector product overview mirror

Historical checkpoint documents remain historical records. They are not rewritten to erase prior project state.

## Product experience alignment

The supplied reference experience establishes the target for the connected Analysis Workspace.

The target experience contains:

- case centered workspace
- recording intake
- audio playback
- synchronized waveform
- spectral visualization
- analytical tracks
- speaker regions
- transcript
- flagged moments
- evidence timeline
- deception indicators
- evidence synthesis
- assessment
- report generation
- history and saved cases
- developer operational tooling

The visual structure is treated as a product architecture reference. Color treatment remains governed separately by the active visual design system.

## Canonical 21 stage pipeline

The documentation set is aligned to one canonical pipeline:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speaker Identification / Diarization
6. Speech Segmentation
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

No active architecture document should present the older six stage presentation as the canonical product pipeline.

## Required connected data model

The end state is case centered. Every major object attaches to one analysis case and one analysis run.

Required object families include:

- case
- analysis run
- source asset
- provenance record
- recording metadata
- speaker
- speaker segment
- speech segment
- transcript
- transcript segment
- transcript word
- alignment record
- feature observation
- analytical track
- evidence record
- evidence relationship
- pipeline stage state
- lifecycle event
- finding
- assessment
- report

## MVP dependency chain

The fastest connected MVP path is:

1. case identity
2. recording intake
3. provenance
4. audio access
5. playback
6. waveform
7. real pipeline lifecycle
8. speaker processing
9. transcription
10. audio transcript alignment
11. real analytical tracks
12. evidence normalization
13. evidence synthesis
14. assessment object
15. report generation
16. case persistence
17. browser end to end verification

The Developer Console is the engineering cockpit for this sequence.

## Developer Console alignment

The Developer Console is now treated as an engineering control surface rather than a generic dashboard.

Required functions include:

- runtime health
- API workbench
- request inspection
- lifecycle events
- error inspection
- runtime diagnostics
- methodology navigation
- architecture navigation
- MVP task board
- persistent task checkoffs
- phase completion state
- dependency visibility
- next task visibility
- developer profile

## Methodology alignment

The methodology hierarchy is:

1. `MASTER_METHOD_INDEX.md` for the complete data point inventory
2. `ANALYSIS_METHODS.md` for method definitions
3. `METHOD_QA_MATRIX.md` for software QA controls
4. `CAPABILITY_STATUS.md` for implementation maturity
5. `VALIDATION.md` for scientific validation requirements
6. `ROADMAP.md` for future engineering scope

The same method must not acquire contradictory status values across these records.

## Status alignment rules

Use implementation states consistently:

- implemented
- integrated
- implemented but not primary integrated
- planned research
- validated inferential
- retired

Software QA status and scientific validation status are separate dimensions.

## Current runtime alignment

The current backend pipeline remains an observational foundation with real acoustic and temporal processing plus optional transcript and baseline inputs.

The product architecture continues toward production speaker processing transcription alignment richer linguistic analysis evidence synthesis classification validation and reporting.

Documentation must preserve the complete end state while keeping current runtime facts accurate.

## QA alignment

The documentation set must not claim a current green CI run unless the current commit has an observed successful workflow run.

The last observed failed run remains historical QA evidence. Later repairs must be verified by a fresh run before being promoted to current green status.

## Deployment alignment

The canonical boundary remains:

- GitHub Pages for the public React application
- Render for the FastAPI backend
- Supabase for authentication persistence and durable diagnostics

Vercel remains retired from the VoxVector architecture.

## Documentation synchronization rule

When the pipeline changes update:

- `ANALYSIS_PIPELINE.md`
- `ARCHITECTURE.md`
- `PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `IMPLEMENTATION_PLAN.md`
- `MVP_BUILD_PLAN.md`
- `ROADMAP.md`
- `CAPABILITY_STATUS.md`
- `METHOD_QA_MATRIX.md`
- `VERSION_MAP.md`
- `CHATGPT_PROJECT_INSTRUCTIONS.md`

When a runtime capability changes also update:

- relevant schemas
- method registry
- QA records
- system state
- developer documentation

When customer facing architecture changes also synchronize the Crown Labs VoxVector dossier.

## Integrity rule

Historical checkpoints remain intact for traceability.

Active canonical documents must describe the current architecture.

No document may silently revive retired deployment architecture.

No document may claim implementation or validation that has not been verified.

The end product remains the complete VoxVector architecture represented by the reference experience and the canonical 21 stage pipeline.
