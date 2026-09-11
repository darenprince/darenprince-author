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
- application-owned SVG analytical components; Recharts 3 remains installed but is not imported by current source
- Streamline Sharp for shared product chrome, with Lucide retained only where still owned by existing components
- Motion for React
- TanStack Query

For shared VoxVector product chrome, **Streamline Sharp** is the canonical icon family. The React application resolves it through the existing `voxvector/src/components/SharpIcon.jsx` wrapper using Iconify's `streamline-sharp` collection. New or replacement shared-interface icons should use that canonical wrapper when the glyph exists rather than introducing another icon family for convenience. Existing components may retain a different icon primitive until an intentional migration is performed.

Canonical library references:

- Official Streamline icon browser: <https://www.streamlinehq.com/icons>
- Exact Iconify runtime collection: <https://icon-sets.iconify.design/streamline-sharp/>

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

## Investor valuation and commercial posture

VoxVector now maintains a synchronized internal investor valuation record in `VoxVector/docs/CURRENT_VALUATION_ASSESSMENT.md`.

**Valuation effective date:** 2026-09-08  
**Repository evidence base:** `887c39e08973d1fe45a3d5c8460ebec40d5f8816`

The assessment is an internal analytical valuation framework. It is not an independent appraisal, fairness opinion, investment recommendation, evidence of current revenue, or scientific validation report.

### Current valuation ladder

| Valuation basis | Current range | Central assessment |
|---|---:|---:|
| Replacement / recreation | **$0.85M–$1.80M** | **$1.30M** |
| Orderly asset sale | **$0.55M–$1.30M** | **$0.85M** |
| Strategic as-is enterprise / IP | **$2.50M–$5.00M** | **$3.50M** |
| Connected engineering MVP | **$5.50M–$9.50M** | **$7.50M** |
| Paid pilots / early ARR | **$8M–$16M** | **$12M** |
| Validated proprietary model / data system | **$15M–$35M+** | Milestone-dependent |
| 36-month base scenario | **~$24.8M–$33.0M** | **~$29M** |
| 36-month high-growth scenario | **$99M–$126M** | Scenario only |
| Five-year conditional base zone | **$60M–$90M** | **~$75M** |

The current approximately **$3.50M central strategic assessment** reflects the assembled software, case-centered architecture, 21-stage analytical design, provenance and reliability controls, QA/operational discipline, research and validation architecture, infrastructure evidence, product UX, documentation, and brand system.

It does **not** assume that VoxVector already has recurring revenue, a large rights-cleared proprietary labeled corpus, a proprietary validated deception classifier, completed enterprise security, or scientifically validated general deception inference.

The next valuation inflection is therefore proof-driven: a reproducible provider-backed golden case, complete history/reopen/report proof, enterprise hardening, external paid design partners, rights-cleared proprietary data, and task-specific scientific evaluation.

### Monetization posture

The strongest near-term commercial wedge is **auditable vocal/audio evidence intelligence and professional workflow**, not an automated universal lie verdict.

Potential revenue layers include professional/team subscriptions, enterprise and institutional licensing, API usage, managed analytical services, research/evaluation engagements, private deployments, OEM/embedded licensing, and later validated task-specific inference offerings if the scientific evidence supports them.

Current pricing ranges in the valuation model are planning assumptions only; they are not current list prices or booked revenue. Product-level assumptions and evidence gates are maintained in `crowndocs/content/product-dossiers/voxvector/monetization.md`.

### Proprietary IP protection

Investor and transaction value depends on clear ownership, permitted use, confidentiality, and transferability.

Commercial structures should preserve Crown Labs ownership of lawfully owned VoxVector background IP while expressly carving out third-party libraries, open-source components, external models, datasets, hosted providers, and other materials governed by separate rights.

Publicly disclosed repository material must not be represented as a trade secret. Non-public proprietary assets may receive confidentiality/trade-secret treatment only when they are actually kept non-public and protected appropriately.

Customer or research-participant audio, transcripts, labels, annotations, and case records do not become Crown Labs training property by default. Data/model-training, retention, de-identification, evaluation, and derived-data rights should be defined expressly by contract and applicable law.

The current valuation assigns no incremental premium merely for unverified patents, registrations, proprietary model weights, a rights-cleared labeled deception corpus, customer contracts, or ARR.

The detailed product policy is maintained in `crowndocs/content/product-dossiers/voxvector/licensing.md`, with ecosystem licensing rules in `docs/crownlabsbible/03-investor-framework/licensing-structures.md`.

## Documentation authority

The technical source of truth is the `VoxVector/` directory in GitHub.

The Crown Labs Bible is the executive and product documentation mirror.

The product experience architecture is maintained in `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

The implementation plan is maintained in `VoxVector/docs/IMPLEMENTATION_PLAN.md`.

The technical architecture is maintained in `VoxVector/docs/ARCHITECTURE.md`.

The canonical pipeline is maintained in `VoxVector/docs/ANALYSIS_PIPELINE.md`.

The method library remains in `VoxVector/docs/MASTER_METHOD_INDEX.md`.

The endpoint map is maintained in `VoxVector/docs/ENDPOINT_REGISTRY.md`.

The current internal valuation assessment is maintained in `VoxVector/docs/CURRENT_VALUATION_ASSESSMENT.md`.

Material product, architecture, valuation, monetization, or licensing changes should be synchronized across the affected canonical and mirror surfaces.
