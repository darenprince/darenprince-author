# VoxVector — Crown Labs Product Dossier

**Product:** VoxVector  
**Category:** Advanced vocal and audio intelligence with deception-analysis research architecture  
**Canonical backend:** `VoxVector/`  
**Canonical frontend:** `voxvector/`  
**Primary API:** `voxvector.crownlabs.tech`  
**Separate AWS API environment:** `awsapi.crownlabs.tech`  
**Public application:** `darenprince.com/voxvector/`  
**Backend release:** **0.2.27**  
**Frontend release:** **0.2.37**

## Product definition

VoxVector is Crown Labs' case-centered vocal and audio intelligence platform. It combines private source handling, speaker/transcript evidence acquisition, acoustic and temporal measurements, evidence assembly, guarded assessment architecture, reporting and auditable provenance in one workflow.

VoxVector is purpose-built for deception-analysis research and professional evidence review, but the current system must not be marketed as a scientifically validated universal lie detector. Engineering capability, provider execution, repeatability and scientific validation are separate evidence states.

## Current engineering posture

Current executive engineering authority is `VoxVector/current-engineering-state-2026-09-12.md` in this dossier mirror and `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-12.md` in the technical source.

The 2026-09-12 reconciliation baseline was source `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`; exact-baseline VoxVector QA run `34679916767` succeeded. Documentation synchronization commits after that baseline can make `main` newer without changing the package release numbers.

Current product status is best described as an **advanced pre-release engineering / connected MVP build**.

## Canonical 21-stage pipeline

### Prepare

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment

### Understand

5. Speech Segmentation
6. Speaker Identification / Diarization
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

The canonical numbering is Stage 05 **Speech Segmentation** and Stage 06 **Speaker Identification / Diarization**. Any undated living copy that reverses them is stale.

## Current maturity

Approximately 16 stages have implemented analytical/runtime foundations. Four are conditional or intentionally not invoked without required inputs or authorization. Current cloud-primary speaker execution and persisted multimodal alignment still require proof. Faster-whisper has historical real provider execution, while current same-revision repeatability and Stage 10 containment remain open release gates.

This maturity count does not mean sixteen validated deception indicators.

## User experience

The target case workflow is:

1. Create/open a case
2. Upload or select persisted audio
3. Verify source/provenance
4. Inspect/play the recording
5. Segment speech
6. Acquire speaker evidence when enabled
7. Generate and align transcript evidence
8. Persist upstream evidence before heavy downstream work
9. Run acoustic/prosodic/temporal/linguistic analysis
10. Assemble evidence and conflicts
11. Review guarded assessment state
12. Generate/report provenance
13. Close and later reopen the case without re-uploading the source

The product experience architecture is maintained in `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`.

## Current frontend

The canonical React application currently includes:

- public landing and styled reference pages;
- Request Access routed to the canonical login;
- route-safe landing anchors and restored direct hash navigation;
- human site map;
- protected user and Developer Console surfaces;
- one-shot login-time API wake;
- shared self-profile behavior across supported account roles;
- backend-driven 21-stage pipeline projection;
- current landing hero artwork with obsolete legacy darkening styles retired.

The Developer Console startup shows frontend package version and live API-reported version separately. Its 21-stage startup check is labeled **Pipeline contract** so a completed check cannot be mistaken for all 21 stages being production-complete.

## Analysis foundation

The active analytical foundation includes measurements and structured evidence across:

- RMS/intensity and energy behavior;
- zero-crossing and spectral observations;
- spectral centroid/spread/flux/rolloff;
- F0 and pitch dynamics;
- HNR/harmonicity;
- MFCC/cepstral observations;
- formant candidate tracking;
- pause topology and timing;
- response latency when supplied;
- transcript disfluency when supplied;
- within-speaker baseline when supplied;
- evidence grouping, convergence/conflict and provenance structures.

Additional reusable modules include jitter, shimmer, pulse-period, cepstral and interaction-timing utilities.

These are evidence inputs. Their existence does not establish validated deception inference.

## Provider architecture

### Transcription

Canonical provider path: faster-whisper.

Historical controlled beam-1 provider execution is proven. Current same-revision controlled repeatability, durable upstream checkpointing and bounded Stage 10 behavior remain #941.

### Speaker intelligence

Canonical primary path: pyannoteAI cloud.

Provider wiring/readiness is not provider execution. Current real execution and persisted speaker evidence remain #970.

### Hugging Face

The connected Hugging Face identity is `crownlabs-voxvector`. Hugging Face supports optional/local model workflows and fallback tooling. It is not proof of cloud-primary pyannoteAI execution.

## Data and infrastructure

Current architecture uses:

- GitHub for source, issues and CI;
- GitHub Pages for the public React application;
- FastAPI for the API boundary;
- Supabase for authentication, private storage, durable diagnostics and persistence;
- Render for the primary API service boundary;
- a separately addressed AWS API environment;
- cloud speech providers selected by the canonical backend runtime.

Connected Supabase inspection during the 2026-09-12 reconciliation showed the project ACTIVE_HEALTHY on PostgreSQL 17.6, `voxvector-user-admin` ACTIVE at version 2 with JWT verification, 6,405 private log objects, 28 private media objects and active current-source diagnostic traffic.

## Developer Console

The Developer Console is the operational engineering surface for:

- runtime health and source/version evidence;
- case workflow and analysis workspace;
- pipeline build/status projection;
- diagnostics and error review;
- Render status/log/debug workflows through server-owned routes;
- GitHub QA evidence;
- documentation and engineering-status navigation;
- protected account/admin functions according to trusted permissions.

Status must remain evidence-backed. Configuration must not be shown as execution, and provider execution must not be shown as scientific validity.

## Current release gates

1. #941 controlled transcription/durability/Stage 10 proof
2. #970 real cloud-primary diarization and persisted speaker evidence
3. #971 persisted multimodal alignment
4. #963 historical-case reopen/playback/artifact/report rehydration
5. #930 upload reliability bounding
6. #959 production observability/debug-bundle acceptance
7. authenticated desktop/mobile acceptance for already-merged frontend/auth work
8. #972 two complete same-revision/configuration golden cases
9. scientific validation separately

## Frontend design system

Current product UI uses React, Tailwind CSS, Base UI/application-owned composition, Motion for React, TanStack Query and application-owned analytical SVGs. Streamline Sharp is the canonical shared product-chrome icon family through the existing `SharpIcon.jsx` wrapper. Existing specialist components can retain other primitives until deliberately migrated.

## Commercial posture

The strongest near-term commercial framing is **auditable vocal/audio evidence intelligence and professional workflow**, not an automated universal lie verdict.

Potential revenue layers include professional/team subscriptions, enterprise/institutional licensing, API usage, managed analytical services, research/evaluation engagements, private deployments, OEM/embedded licensing and later task-specific validated inference offerings if scientific evidence supports them.

The current internal valuation framework remains maintained in `VoxVector/docs/CURRENT_VALUATION_ASSESSMENT.md`. Its figures are internal analytical scenarios, not an independent appraisal or evidence of booked revenue.

## Documentation authority

Technical source of truth: `VoxVector/`.

Executive/product mirror: `docs/crownlabsbible/04-product-dossiers/VoxVector/`.

Key living records:

- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/docs/SYSTEM_STATE_REPORT.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/MVP_RELEASE_GATE.md`

Dated historical audit/checkpoint documents remain evidence of their original state and should not be rewritten to appear current.
