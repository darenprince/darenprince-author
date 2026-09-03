# VoxVector — Crown Labs Product Dossier

**Product:** VoxVector

**Category:** Vocal intelligence and deception analysis

**Canonical implementation:** `VoxVector/`

**Public application:** `voxvector/`

**Backend target:** `voxvector.crownlabs.tech`

**AWS API environment:** `awsapi.crownlabs.tech`

**Public target:** `darenprince.com/voxvector/`

**Product objective:** Build an advanced full-stack vocal and audio deception analysis platform.

## Product definition

VoxVector is an advanced vocal and audio deception analysis platform built to transform spoken conversation into structured intelligence through a complete multimethod analytical workflow.

The platform spans recording ingestion audio preparation provenance recording assessment speaker intelligence speech segmentation transcription alignment acoustic analysis prosodic analysis voice quality analysis temporal analysis linguistic analysis conversational context within speaker comparison evidence synthesis classification validation reporting and final disposition.

VoxVector is purpose built for deception analysis.

The product architecture is designed to progress from foundational signal measurement into increasingly sophisticated multimethod inference calibrated models speaker aware intelligence conversational understanding and validated classification.

## Current endpoint roles

The public product experience is currently served from `https://darenprince.com/voxvector/`.

The original API remains `https://voxvector.crownlabs.tech` and is preserved as the existing backend endpoint.

A separate AWS API environment is available at `https://awsapi.crownlabs.tech`, using an AWS Application Load Balancer with HTTPS and an ECS Fargate backend.

The AWS endpoint is an additional deployment environment. It does not silently replace the original API domain.

## Product experience target

The supplied reference screens establish the intended end state for the application experience.

The product is a unified intelligence workspace rather than a collection of disconnected utilities.

The user journey is:

1. Upload or record
2. Prepare and inspect
3. Identify speakers
4. Generate transcript
5. Align audio and language
6. Analyze synchronized evidence
7. Explore evidence
8. Review synthesis
9. Review assessment
10. Generate report

The detailed experience contract is defined in `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

## The 21 stage pipeline

### Prepare

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment

### Understand

5. Speaker Identification / Diarization
6. Speech Segmentation
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability

### Analyze

10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline

### Synthesize and Decide

16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

## Analysis Workspace

The core analysis workspace combines:

- source metadata
- audio playback
- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses
- speaker regions
- transcript
- transcript alignment
- evidence markers
- analysis pipeline
- key metrics
- evidence timeline
- assessment state

All analytical tracks share one time axis and one playhead.

Selecting an audio region can reveal the associated transcript and evidence.

Selecting transcript content can move the audio playhead to the associated interval.

Selecting an evidence event can open its source interval and method details.

## Analysis Overview

The overview surface provides:

- source file
- duration
- recording quality
- processing state
- condensed waveform
- evidence markers
- key analytical metrics
- assessment state
- evidence timeline

Metrics are data driven and tied to the canonical analysis result.

## Method intelligence

### Acoustic Analysis

- pitch
- intensity
- energy
- spectral shape
- spectral distribution
- harmonicity
- HNR
- MFCC
- formant candidates

### Prosodic Intelligence

- pitch contours
- pitch dynamics
- intensity dynamics
- speech rate
- articulation timing
- phrase movement
- pause topology
- prosodic boundaries

### Voice Quality Intelligence

- harmonicity
- HNR
- jitter
- shimmer
- pulse period
- glottal source measures
- expanded voice quality descriptors

### Speaker Intelligence

- speaker identification
- diarization
- speaker turns
- overlap
- speaker separation
- speaker aware baselines
- interaction structure

### Linguistic Intelligence

- transcription
- transcript alignment
- disfluency
- lexical analysis
- syntactic structure
- semantic representation
- contradiction analysis
- consistency analysis
- hedging
- certainty
- negation
- discourse structure
- question and answer alignment

### Evidence Intelligence

- evidence assembly
- convergence analysis
- conflict analysis
- dependency modeling
- uncertainty
- alternative hypothesis analysis
- provenance
- audit trails

### Classification Intelligence

- candidate classification
- calibrated probabilistic models
- confidence matrix
- uncertainty state
- validation framework
- final classification
- final disposition

## Evidence Explorer

Evidence Explorer provides case wide access to analytical evidence.

Users can filter by:

- speaker
- timestamp
- method family
- evidence type
- evidence direction
- reliability
- transcript context
- question
- response

Every evidence item links to its source audio interval and analytical method.

## Reports

Reports provide a structured and auditable representation of an analysis.

Report sections include:

- case summary
- recording information
- speaker information
- eligibility and reliability
- analysis methods
- acoustic findings
- prosodic findings
- temporal findings
- linguistic findings
- speaker findings
- evidence timeline
- convergence and conflict
- candidate assessment
- confidence and uncertainty
- alternative hypotheses
- final disposition
- audit and provenance

## Comparisons

The product supports comparison between compatible:

- recordings
- speakers
- baseline segments
- question responses
- evidence regions
- analysis runs

## Alerts

Alerts provide case level events such as:

- processing completed
- processing failed
- reliability change
- speaker processing completed
- transcript completed
- evidence convergence
- evidence conflict
- report ready

## Developer Console

The Developer Console remains a separate operational surface.

It provides:

- runtime health
- API workbench
- request inspection
- errors
- lifecycle events
- runtime diagnostics
- documentation
- development board
- deployment endpoint traceability

## Current analytical foundation

The active analysis engine provides structured measurement across multiple evidence families including:

- RMS and intensity
- zero crossing rate
- spectral centroid
- spectral spread
- spectral flux
- spectral rolloff
- fundamental frequency
- harmonicity
- harmonic to noise ratio
- F0 dynamics
- intensity dynamics
- MFCC observations
- formant candidate tracking
- pause topology
- response latency when supplied
- transcript disfluency when supplied
- within speaker baseline when supplied

Additional reusable analytical modules include:

- jitter
- shimmer
- pulse period analysis
- cepstral processing
- interaction timing
- speech timing utilities

## Frontend architecture

The canonical public application uses React with application owned UI composition.

The approved architecture includes:

- React
- shadcn style application owned components
- Base UI interaction primitives
- Tailwind CSS
- Tremor React analytical components
- Lucide React iconography
- Motion for React
- TanStack Query

The frontend remains an interface over the canonical FastAPI analysis architecture.

## Backend architecture

The canonical backend and analysis engine live under `VoxVector/`.

- `VoxVector/api/app.py` — FastAPI HTTP boundary
- `VoxVector/src/voxvector/` — analysis engine
- `VoxVector/tests/` — QA
- `VoxVector/docs/` — technical source of truth

Render serves the original API environment.

AWS provides the separately addressed `awsapi.crownlabs.tech` environment through an HTTPS Application Load Balancer and ECS Fargate.

GitHub Pages serves the public React application.

## Implementation plan

The detailed engineering sequence is maintained in `VoxVector/docs/IMPLEMENTATION_PLAN.md`.

The plan is organized around:

- product shell
- analysis intake
- synchronized audio visualization
- speaker intelligence
- transcription
- transcript alignment
- eligibility and reliability
- acoustic and prosodic intelligence
- temporal intelligence
- linguistic intelligence
- question and answer intelligence
- within speaker baselines
- evidence architecture
- convergence and conflict
- candidate classification
- validation and calibration
- final assessment
- reports
- history
- Evidence Explorer
- comparisons
- alerts
- Developer Console
- reliability
- security
- browser verification

## Documentation authority

The technical source of truth is the `VoxVector/` directory in GitHub.

The Crown Labs Bible is the executive and product documentation mirror.

The product experience architecture is maintained in `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

The implementation plan is maintained in `VoxVector/docs/IMPLEMENTATION_PLAN.md`.

The technical architecture is maintained in `VoxVector/docs/ARCHITECTURE.md`.

The canonical pipeline is maintained in `VoxVector/docs/ANALYSIS_PIPELINE.md`.

The method library remains in `VoxVector/docs/MASTER_METHOD_INDEX.md`.

The endpoint map is maintained in `VoxVector/docs/ENDPOINT_REGISTRY.md`.

Material product and architecture changes should be synchronized across these canonical surfaces.
