# VoxVector UI Application Architecture

## Status

Approved and in active implementation.

The React application under `voxvector/` is the canonical public frontend. It is the interface layer for the VoxVector backend and is organized around the connected case workflow represented by the Analysis Workspace reference screens.

## Technology architecture

| Layer | Choice | Role |
|---|---|---|
| Application | React 19.2.8 | Product shell and route composition |
| UI | application-owned shadcn-style composition with Base UI primitives | Accessible interaction primitives |
| Analytical UI | Recharts 3.10.1 plus application-owned analytical components | Real and illustrative analytical visualizations |
| Styling | Tailwind CSS | Responsive layout typography tokens and theming |
| Icons | Lucide React | Product and interface iconography |
| Animation | Motion for React | State-driven transitions and interaction animation |
| Server state | TanStack Query | API lifecycle caching refresh mutations and diagnostics polling |
| Authentication | Supabase Auth | Developer and user identity |
| Authorization | Supabase metadata plus FastAPI enforcement | Developer access control |
| API | FastAPI via configured backend environments | Original Render API plus separately addressed AWS API environment |
| Persistence | Supabase | Case data authentication diagnostics and private media |
| Deployment | GitHub Pages | Public React application |

## Product application model

The frontend is a case-centered application.

The connected workflow is:

```text
New Analysis
    |
    v
Case + Source Asset
    |
    v
Intake + Provenance
    |
    v
Audio Player + Waveform
    |
    v
21 Stage Pipeline
    |
    +--> Speaker Layer
    +--> Transcript Layer
    +--> Analytical Tracks
    +--> Evidence Timeline
    |
    v
Analysis Results / Review Evidence
    |
    v
Assessment
    |
    v
Report
    |
    v
History + Reopen
```

All surfaces share the same case identity.

## Analysis Workspace

The Analysis Workspace is the core product surface and is being extended from source/playback inspection into the persisted post-analysis review experience.

It combines:

- case header
- source metadata
- audio player
- synchronized waveform
- spectrogram/playback analysis view
- analytical tracks when available
- speaker regions when available
- persisted timestamped conversation transcript with segment and word selection when available
- evidence markers when available
- evidence timeline when available
- pipeline state
- analysis result summary
- assessment state
- uncertainty and alternative explanation state

## Analysis Results / Review Evidence

A completed run should expose the composed canonical case result without inventing unavailable values.

The review surface is organized around:

1. run identity and source provenance;
2. eligibility and reliability;
3. pipeline execution state;
4. observations and evidence records;
5. evidence convergence and conflict;
6. candidate state;
7. final disposition;
8. uncertainty and alternative explanations;
9. software provenance and validation status.

Unavailable downstream stages must remain explicit as unavailable, pending, conditional, not-run, or planned rather than being rendered as completed analysis.

## Synchronized audio viewer

### Primary waveform

Display:

- full recording waveform
- current playhead
- time scale
- speech regions when available
- pause regions when available
- speaker regions when available
- evidence markers when available
- selected intervals

### Analytical tracks

Initial tracks:

1. Waveform
2. Pitch F0
3. Intensity
4. Spectral Energy
5. Speech Activity
6. Pauses

Expanded tracks:

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

Tracks must be driven by canonical backend data when displayed as analysis rather than decorative interface examples.

## Speaker layer

Display:

- speaker label
- turn boundaries
- overlap regions
- speaker confidence when available
- selected speaker state
- speaker evidence markers

Speaker selection synchronizes with the waveform transcript and evidence surfaces when those records exist.

## Transcript layer

Display:

- timestamped transcript
- speaker attribution
- word timing when available
- selected sentence
- selected word
- disfluency markers
- question markers
- response boundaries
- evidence markers

Transcript and word selection move the shared audio playhead. The live playhead highlights the active transcript segment and word timing when timestamps exist. Waveform markers use the same persisted transcript timestamps.

## Analysis Pipeline UI

The pipeline component represents all 21 canonical stages:

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

Each stage exposes, when supplied by the backend:

- name
- purpose
- input
- output
- state
- timing
- methods
- evidence
- source regions
- related events
- warnings
- errors
- unavailable/skipped reason

Stage status comes from real backend lifecycle state.

## Evidence surfaces

### Evidence timeline

Events may include:

- response latency
- pause events
- speech rate changes
- pitch movement
- intensity movement
- speaker transitions
- transcript events
- linguistic events
- evidence convergence
- evidence conflict

### Evidence Explorer

Filters include:

- speaker
- timestamp
- method family
- evidence type
- evidence direction
- quality
- reliability
- transcript context
- question
- response

Every evidence item links to its originating method observation and source interval when available.

## Assessment surface

The assessment area remains structured around:

- eligibility and reliability
- evidence summary
- evidence convergence
- evidence conflict
- candidate classification
- confidence matrix when configured
- uncertainty
- alternative hypotheses
- final disposition

The interface does not reduce the complete analysis to a single decorative score.

## Reports

Reports are generated from the persistent case model and should preserve source, run, evidence, assessment, disposition, uncertainty, and provenance references.

## Developer Console

The Developer Console is the engineering cockpit and must expose real operational state.

It must include:

- runtime health
- API workbench
- request and lifecycle inspection
- indexed errors
- diagnostic events
- GitHub-backed QA state
- deployment state
- methodology and architecture links
- MVP build board
- task persistence
- completion counts
- current engineering stage
- next dependency
- source traceability
- audit registry
- endpoint and deployment-boundary traceability

### Status semantics

The console keeps these independent:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has executed successfully.
- **TESTED** — automated or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

A local task checkbox is never proof that the corresponding backend capability exists.

## API boundary

`voxvector/src/lib/api.js` is the frontend API boundary.

It preserves:

- HTTP status
- request ID
- response payload
- client timing
- backend error detail
- upload progress
- cancellable request handling
- lifecycle event support

The frontend API base defaults to the original API environment at `https://voxvector.crownlabs.tech` and can be overridden with `VITE_VOXVECTOR_API_URL`. The separately addressed AWS environment is `https://awsapi.crownlabs.tech`; configuring the frontend to use AWS is an explicit deployment/configuration decision and is not implied by the existence of the AWS runtime.

## Deployment boundary

Vercel is retired.

GitHub Pages is the canonical public frontend host.

The public paths are:

- `/voxvector/`
- `/voxvector/developer/`

The backend environments are:

- original Render API: `https://voxvector.crownlabs.tech`
- AWS API environment: `https://awsapi.crownlabs.tech`

The original API hostname is preserved. The AWS environment is separately addressed and does not silently replace the existing API.

The root `voxvector.html` is a compatibility redirect only.

## Accessibility

The application must retain:

- readable text sizes
- strong contrast
- keyboard-accessible controls
- semantic labels
- visible focus states
- reduced-motion support
- mobile usability
- explicit loading, error, unavailable, skipped, and not-run states
- non-color-only status communication

## Acceptance principle

The UI is complete only when important workflows operate against real VoxVector API behavior and real data contracts. A polished mockup is not completion.
