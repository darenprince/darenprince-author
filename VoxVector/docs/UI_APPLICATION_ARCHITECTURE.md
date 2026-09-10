# VoxVector UI Application Architecture

## Status

Approved and in active implementation.

The React application under `voxvector/` is the canonical public frontend. It is the interface layer for the VoxVector backend and is organized around the connected case workflow represented by the Analysis Workspace reference screens.

## Technology architecture

| Layer | Choice | Role |
|---|---|---|
| Application | React 19.2.8 | Product shell and route composition |
| UI | application-owned shadcn-style composition with Base UI primitives | Accessible interaction primitives |
| Analytical UI | Application-owned SVG components, including `NativeAreaChart` | Real and illustrative analytical visualizations; Recharts 3.10.1 remains installed but is not imported by current source |
| Styling | Tailwind CSS | Responsive layout typography tokens and theming |
| Icons | Lucide React | Product and interface iconography |
| Animation | Motion for React | State-driven transitions and interaction animation |
| Server state | TanStack Query | API lifecycle caching refresh mutations and diagnostics polling |
| Authentication | Supabase Auth | Developer, administrator, and approved user identity |
| Authorization | trusted Supabase `app_metadata`, shared React auth gating, FastAPI enforcement, and server-only Supabase administration | Role routing and protected access control |
| API | FastAPI via configured backend environments | Original Render API plus separately addressed AWS API environment |
| Persistence | Supabase | Case data authentication diagnostics profiles audit events and private media |
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

## Authentication and role routing

`AuthGate.jsx` is the canonical browser authentication owner. It restores the Supabase session, handles email/password login, password reset and sign-out, resolves the trusted role from `app_metadata`, and prevents protected workspace content from rendering before session and role resolution.

Current role routing in source is:

| Trusted role | Canonical destination | Protected behavior |
|---|---|---|
| `admin` | `/voxvector/developer` | Developer Console plus admin-only User Management drawer item |
| `developer` | `/voxvector/developer` | Developer Console |
| `user` | `/voxvector/app` | minimum protected user workspace |
| missing / unknown | `/voxvector/login` denial state | no protected workspace access |

`user_metadata` is profile data only and is never accepted as a VoxVector authorization source. Direct URL entry is independently gated; redirects are navigation behavior, not access control.

The `/voxvector/app` route is the canonical minimum user destination while the user-facing analysis workflow is developed. It does not adopt or redirect to the legacy root `voxvector-dashboard.html`, and it does not manufacture analytical capability that the protected user application has not yet implemented.

The public landing header exposes a visible Login action on desktop and mobile. The login page does not expose Google sign-in or account creation because those provider/policy flows have not been established and tested for VoxVector.

### Admin account management

Administrator account controls are implemented as a separate protected boundary inside the existing Developer Console. The User Management drawer item is rendered only for a trusted `admin` role.

The browser invokes the Supabase Edge Function `voxvector-user-admin`. The function revalidates the caller JWT and trusted `admin` role before using the server-only Supabase service-role credential. Supported source operations include listing users, creating or inviting accounts, changing role and permission metadata, updating account/profile fields, password administration/recovery, and permanent deletion. Self-deletion and removal of the caller's own admin role are blocked. Administrative mutations write sanitized records to `audit_events`; passwords, access tokens, and service-role credentials are not written to those audit records.

The Edge Function source existing in a branch is not equivalent to a deployed function. Supabase function deployment and authenticated administrator execution must be verified separately from GitHub QA and frontend publication.

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
- admin-only user management when the session carries the trusted `admin` role

### Developer Overview status model

The primary dashboard status blocks intentionally separate endpoint reachability from actual service lifecycle. The overview reads `/health` and the authenticated Render status bridge independently while the dashboard is open.

The canonical dashboard blocks are API, Runtime, Pipeline, Transcription, and Render Service. Each block includes an explicit text state plus always-visible secondary context such as frontend/backend version, runtime revision, implemented/queued pipeline counts, transcription provider/adapter state, or Render region/revision. Healthy, transitional, and attention states tint the whole block so the state remains visible at a glance, but text remains mandatory for accessibility.

A successful API or Render-bridge request cannot make the Render Service block green. Render is healthy only when the normalized service state and latest deployment state are both `ACTIVE` or `LIVE`. Transitional states such as building, deploying, updating, or pending are shown as non-healthy; suspended, failed, unavailable, deactivated, or unreported states remain explicit attention states. Provider configuration/readiness likewise remains distinct from successful transcription execution.

### Developer shell and live engineering rail

`SiteHeader.jsx` remains the canonical Developer navigation owner. The existing `DeveloperEngineeringStatus` instance is rendered immediately after that header in the Developer Console shell rather than inside header actions. The collapsed 34px rail therefore occupies normal sticky document flow directly below the 56px navigation and reserves its own space instead of covering page content.

The rail keeps the existing live runtime, GitHub QA, deployment, pipeline, provider-readiness, and source-traceability projections. It provides native-button expand/collapse controls plus a small independent X that hides the rail for the current component session. Hiding the rail removes the 34px layout row; expanding opens the existing full-height status surface below the 90px navigation-plus-rail boundary with internal scrolling.

The compact rail is a stricter operational alarm than the individual dashboard warning palette: it stays in the normal dark treatment only while the Render service and latest deployment are both accepted `ACTIVE`/`LIVE` states. Any other Render state combination, including a transitional deployment, makes the rail red and the text summary names both service and deployment states. Render control-plane connectivity cannot suppress that red state.

The expanded status surface is a non-modal disclosure region. Its controls use `aria-expanded` and `aria-controls`; it must not claim `aria-modal` behavior unless full focus containment, Escape handling, and focus restoration are implemented. Toast notifications sit at the bottom-right so they do not obscure the top rail. Desktop and mobile layouts must preserve these same ownership and non-overlap rules.

### Status semantics

The console keeps these independent:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has executed successfully.
- **TESTED** — automated or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

A local task checkbox is never proof that the corresponding backend capability exists. Render service/deploy health is operational evidence only; it does not establish source-revision parity, browser verification, provider execution, or scientific validation.

## API boundary

`voxvector/src/lib/api.js` is the frontend API boundary for the FastAPI environments.

It preserves:

- HTTP status
- request ID
- response payload
- client timing
- backend error detail
- upload progress
- cancellable request handling
- lifecycle event support

The admin Auth-management surface uses the Supabase client only to invoke the JWT-protected `voxvector-user-admin` Edge Function. The browser never invokes Supabase `auth.admin` directly and never receives a service-role key.

The frontend API base defaults to the original API environment at `https://voxvector.crownlabs.tech` and can be overridden with `VITE_VOXVECTOR_API_URL`. The separately addressed AWS environment is `https://awsapi.crownlabs.tech`; configuring the frontend to use AWS is an explicit deployment/configuration decision and is not implied by the existence of the AWS runtime.

## Deployment boundary

Vercel is retired.

GitHub Pages is the canonical public frontend host.

The public/protected React paths are:

- `/voxvector/` — public product surface
- `/voxvector/login` — canonical account login and trusted-role router
- `/voxvector/developer/` — protected developer/admin console
- `/voxvector/app` — protected approved-user workspace

The backend environments are:

- original Render API: `https://voxvector.crownlabs.tech`
- AWS API environment: `https://awsapi.crownlabs.tech`

The original API hostname is preserved. The AWS environment is separately addressed and does not silently replace the existing API.

The root `voxvector.html` is a compatibility redirect only.

GitHub Pages publication of role-routing source does not deploy the Render backend authorization change and does not deploy the Supabase Edge Function. Those runtime boundaries require separate revision-linked evidence.

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