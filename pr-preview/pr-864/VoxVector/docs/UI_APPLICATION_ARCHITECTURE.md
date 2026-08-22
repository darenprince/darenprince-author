# VoxVector UI Application Architecture

## Status

Approved and in active implementation.

The React application under `voxvector/` is the canonical public frontend. It is the interface layer for the VoxVector backend and is organized around the connected case workflow represented by the Analysis Workspace reference screens.

The active visual system is intentionally separate from this architecture document.

## Technology architecture

| Layer | Choice | Role |
|---|---|---|
| Application | React 18.3.1 | Product shell and route composition |
| UI | shadcn style application owned composition with Base UI primitives | Accessible interaction primitives |
| Analytical UI | Tremor React 3.18.7 | Analytical cards charts progress and dashboard blocks |
| Styling | Tailwind CSS | Responsive layout typography tokens and theming |
| Icons | Lucide React | Product and interface iconography |
| Animation | Motion for React | State driven transitions and interaction animation |
| Server state | TanStack Query | API lifecycle caching refresh mutations and diagnostics polling |
| Authentication | Supabase Auth | Developer and user identity |
| Authorization | Supabase metadata plus FastAPI enforcement | Developer access control |
| API | FastAPI on Render | Canonical backend |
| Persistence | Supabase | Case data authentication and diagnostics |
| Deployment | GitHub Pages | Public React application |

## Product application model

The frontend is a case centered application.

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
Evidence Synthesis
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

## Primary navigation

- Overview
- New Analysis
- Analyses
- Analysis History
- Evidence Explorer
- Reports
- Comparisons
- Alerts
- Settings

## Developer navigation

- Dashboard
- API Workbench
- Requests
- Errors
- Events
- Runtime
- Methodology
- Documentation
- Development Board
- Profile

Developer functions remain separated from the customer analysis workflow.

## Analysis intake

The New Analysis flow is the entry point into the connected case.

### Intake sequence

1. Select or upload recording
2. Inspect media
3. Display metadata
4. Establish provenance
5. Assess recording quality
6. Establish speaker context
7. Generate transcript
8. Establish alignment
9. Start analysis
10. Open Analysis Workspace

### File intake data

Display:

- file name
- duration
- sample rate
- bit depth when available
- channel count
- file size
- detected format
- upload state
- processing state
- provenance state
- case ID
- analysis ID

## Analysis Workspace

The Analysis Workspace is the core product surface.

It combines:

- case header
- source metadata
- audio player
- synchronized waveform
- speaker regions
- transcript
- analytical tracks
- evidence markers
- evidence timeline
- pipeline state
- assessment state

## Synchronized audio viewer

### Primary waveform

Display:

- full recording waveform
- current playhead
- time scale
- speech regions
- pause regions
- speaker regions
- evidence markers
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

### Interaction model

- shared time axis
- shared playhead
- synchronized hover
- click to seek
- drag to scrub
- region selection
- zoom window
- reset zoom
- track visibility controls
- event marker navigation
- playback from selected region

## Speaker layer

Display:

- speaker label
- turn boundaries
- overlap regions
- speaker confidence when available
- selected speaker state
- speaker evidence markers

Speaker selection synchronizes with the waveform transcript and evidence surfaces.

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

Transcript selection moves the audio playhead.

Audio selection reveals associated transcript content when available.

## Analysis Overview

The overview is the executive analytical surface for an individual case.

Required regions:

- source file
- duration
- recording quality
- analysis state
- current pipeline stage
- condensed waveform
- key metrics
- assessment state
- evidence timeline
- pipeline state

The metric system is data driven.

Only backend supplied measurements may be displayed as actual analysis values.

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

Each stage exposes:

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

Stage status comes from real backend lifecycle state.

## Evidence surfaces

### Evidence timeline

Events are anchored to source intervals and may include:

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

Every evidence item links to its originating method observation and source interval.

## Assessment surface

The assessment area is structured around:

- eligibility and reliability
- evidence summary
- evidence convergence
- evidence conflict
- candidate classification
- confidence matrix
- uncertainty
- alternative hypotheses
- final disposition

The interface does not reduce the complete analysis to a single decorative score.

## Reports

Reports are generated from the persistent case model.

Report sections include:

1. Case summary
2. Recording information
3. Speaker information
4. Eligibility and reliability
5. Analysis methods
6. Acoustic findings
7. Prosodic findings
8. Temporal findings
9. Linguistic findings
10. Speaker findings
11. Evidence timeline
12. Convergence and conflict
13. Candidate assessment
14. Confidence and uncertainty
15. Alternative hypotheses
16. Final disposition
17. Audit and provenance

## Developer Console

The Developer Console is the engineering cockpit.

It must expose:

- runtime health
- real API workbench
- request inspection
- lifecycle events
- indexed errors
- runtime diagnostics
- methodology links
- architecture links
- pipeline links
- MVP build board
- phase expansion
- task checkboxes
- persistent browser task state
- completion counts
- next task visibility
- developer profile

### MVP board behavior

The board uses the canonical `docs/MVP_BUILD_PLAN.md` task order.

Each task can be checked locally.

Each phase can be expanded or collapsed.

The console calculates local completion state from the task set.

The console must never present a local checkbox as proof that the backend capability is implemented.

## API boundary

`voxvector/src/lib/api.js` is the frontend API boundary.

It preserves:

- HTTP status
- request ID
- response payload
- client timing
- backend error detail
- upload progress
- cancellable request handles
- lifecycle event support

The canonical API base defaults to `https://voxvector.crownlabs.tech` and can be overridden with `VITE_VOXVECTOR_API_URL`.

## State driven animation

Animation may represent actual:

- upload progress
- query state
- mutation state
- playback state
- diagnostic state
- navigation state

Animation must never manufacture analytical progress or evidence.

## Developer access

The browser gate is an interface authorization layer.

Sensitive diagnostic data remains protected by backend authorization.

Current developer admission requires a trusted Supabase session and the configured developer role metadata.

FastAPI diagnostic endpoints enforce the developer role before returning persistent diagnostics.

## Accessibility

The application must retain:

- readable text sizes
- strong contrast
- keyboard accessible controls
- semantic labels
- visible focus states
- reduced motion support
- mobile usability
- explicit error states
- explicit loading states
- explicit unavailable states
- non color only status communication

## Deployment boundary

Vercel is retired.

GitHub Pages is the canonical public frontend host.

Render is the canonical backend host.

The public paths are:

- `/voxvector/`
- `/voxvector/developer/`

The root `voxvector.html` is a compatibility redirect only.

## Acceptance principle

The UI is complete only when important workflows operate against real VoxVector API behavior and real data contracts.

A polished mockup is not completion.

The connected product workflow is the acceptance target.
