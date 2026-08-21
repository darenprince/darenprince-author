# VoxVector UI Application Architecture

## Status

**Approved and in active implementation.** The public React application is deployed at `/voxvector/`. The landing experience uses Tremor React analytical components together with application owned shadcn style components backed by Base UI, Lucide icons, Tailwind CSS, Motion for React, and TanStack Query. The Developer Console foundation, Supabase developer gate, state driven API activity visualization, accessible landing foundation, policy navigation, live diagnostic polling, real audio upload/player workflow, and developer profile editing are implemented in source. Backend protected operational telemetry remains an integration and verification concern.

## Architecture

| Layer | Choice | Role |
|---|---|---|
| Application | React 18.3.1 | Product shell and route composition; pinned for Tremor compatibility |
| UI | shadcn style application owned composition with Base UI primitives | Accessible interaction primitives and product specific components |
| Analytical UI | Tremor React 3.18.7 | Real analytical cards, charts, progress indicators, and dashboard composition |
| Styling | Tailwind CSS | Responsive layout, typography, semantic tokens, and theming |
| Icons | Lucide React | Consistent product and interface iconography |
| Animation | Motion for React + lightweight CSS state animation | State driven transitions and operational status animation |
| Server state | TanStack Query | API lifecycle, caching, retries, mutations, refresh, and diagnostic polling |
| Authentication | Supabase Auth | Developer identity and session handling |
| Authorization | Supabase trusted `app_metadata` plus FastAPI enforcement | Developer role gating |
| API | FastAPI on Render | Canonical backend |
| Persistence and diagnostics | Supabase | Existing operational architecture |
| Deployment | GitHub Pages | Public React frontend under `/voxvector/` |

Render and Supabase remain unchanged as infrastructure boundaries.

## Design system direction

The VoxVector visual system follows the supplied shadcnblocks reference: strong black and white contrast, quiet neutral gray structure, warm coffee and tan accents, subtle surface gradients, and very low contrast strokes. The previous blue and cyan analytical treatment is retired from the active frontend visual system.

Light mode uses a white canvas, near black typography, quiet gray surfaces, and restrained coffee, copper, and tan accents. Dark mode uses near black and espresso surfaces with warm white typography and the same restrained warm accent family. Borders and dividers are intentionally thin and low contrast. High contrast is reserved for actionable controls, focus states, and semantic status communication.

Tremor remains the analytical visual layer. Its default blue brand tokens are overridden in `voxvector/tailwind.config.js` with the VoxVector warm neutral palette. Landing charts use explicit Tremor custom colors so chart strokes cannot silently fall back to blue. Tremor cards use the shared low contrast border treatment and no decorative blue ring.

The actual application layer is owned by VoxVector and follows shadcn composition patterns. Base UI supplies headless interaction behavior. VoxVector specific tokens, composition, icon treatment, evidence states, and analytical visualization patterns sit above those primitives.

Avoid heavy white framing, high contrast decorative outlines, unnecessary rounded containers, excessive gradients, oversized decorative effects, or generic dashboard styling. Gradients should be subtle and support depth rather than compete with information. Color should communicate product hierarchy and system state first.

## Deployment boundary

Vercel is retired for VoxVector.

The canonical public frontend deployment is GitHub Pages. The canonical backend deployment is Render. The VoxVector frontend package contains no Vercel dependency, Vercel configuration, Vercel workflow, or Vercel deployment command.

The repository source of truth therefore follows this boundary:

* React frontend: `voxvector/`
* GitHub Pages public path: `/voxvector/`
* GitHub Pages developer path: `/voxvector/developer/`
* FastAPI backend: `VoxVector/api/app.py`
* Render root: `VoxVector`
* Render application: `api.app:app`
* Crown Labs public documentation: `/docs/crownlabsbible/docs/`

A Vercel check that continues to appear in GitHub after repository cleanup would indicate an external GitHub or Vercel integration rather than a VoxVector source file. It must not be reintroduced into the repository as a workaround.

## Public landing page

The landing page is the public product introduction rather than a generic marketing template. It presents:

* the advanced vocal deception analysis identity
* the core product proposition in consumer facing language
* a real Tremor analytical recording preview
* structured signal charts and evidence direction visualization
* the four stage analytical path
* current observation families
* evidence convergence and conflict
* scientific discipline and capability state
* serious analysis use cases
* a Project Briefing call to action routed to the Crown Labs Bible VoxVector dossier
* a Documentation call to action routed to the Crown Labs documentation viewer
* GitHub source/documentation controls that remain explicitly linked to the appropriate repository paths
* privacy and terms policy destinations
* legal, developer, resource, source, and company footer navigation

The landing page does not present fabricated production telemetry or validated deception performance. Analytical panels are interface illustrations and are explicitly presented as such.

## Current implementation

### Public application

Implemented:

* React and Vite entrypoint at `voxvector/index.html`
* responsive product landing page
* direct Tremor React analytical components
* application owned shadcn style Card and Badge components
* Base UI backed Button primitive
* Lucide icon system
* warm neutral light and dark design token system
* subtle surface gradients and low contrast structural strokes
* explicit warm custom Tremor chart colors with no blue fallback
* evidence first product positioning
* four stage analytical workflow presentation
* current observational method presentation
* scientific state communication
* Project Briefing routed to the Crown Labs Bible
* Documentation routed to the Crown Labs documentation viewer
* GitHub source button scoped to `./voxvector/`
* GitHub documentation button scoped to `./VoxVector/docs/`
* professional footer with legal, developer, resource, source, and company navigation
* navigable privacy and terms policy drafts
* mobile navigation
* keyboard focus treatment
* skip to content control
* reduced motion support
* Motion based progressive presentation
* `/voxvector/developer` entry point
* canonical documentation entry point

### Developer Console

Implemented at `/voxvector/developer`:

* Supabase Auth sign in gate
* trusted developer role check using `app_metadata`
* sign out with awaited Supabase Auth completion and visible error handling
* operational dashboard with animated green, warning, and red state icons
* real `/health` query through TanStack Query
* API workbench for the actual `/v1/analyze` endpoint
* WAV upload and real request execution
* browser XHR upload progress that completes before analysis animation begins
* client generated request correlation ID
* explicit live analysis stages: upload, decode, analysis, result
* cancellable browser analysis request with Stop analysis controls
* durable diagnostic lifecycle polling during analysis
* server response, HTTP status, client timing, `X Request ID`, and response JSON visibility
* uploaded audio playback with waveform and seek control
* decoded WAV metadata panel including filename, container/codec, sample rate, channels, bit depth, bitrate, duration, file size, MIME type, modification time, and available RIFF INFO/BEXT metadata
* live playback dBFS meter and digital clipping indicator
* persistent error browser backed by the authenticated diagnostic endpoint
* live diagnostic log stream backed by the authenticated lifecycle event endpoint
* canonical documentation navigator using only existing `VoxVector/docs/` files
* development board
* developer profile editing through Supabase Auth user metadata

The console does not fabricate request counts, error counts, 5xx totals, analysis totals, lifecycle events, or storage records.

## Analysis request state model

The browser deliberately separates transfer state from server processing state:

1. **Upload:** XHR progress represents bytes transferred by the browser.
2. **Upload complete:** the progress bar reaches 100 percent and the UI changes state only after the browser upload stream completes.
3. **Server waiting/processing:** the generic analysis animation begins only after upload completion and is then driven by durable diagnostic events when available.
4. **Decode:** displayed when the backend emits the real `stage=decode` lifecycle event.
5. **Analysis:** displayed when the backend emits `stage=analysis_pipeline`.
6. **Result:** displayed when the request completes and the response is received.
7. **Stopped/error:** displayed from actual browser request outcome.

The Stop analysis control cancels the browser HTTP request. It does not claim to terminate a server-side worker thread that may already be executing CPU-heavy analysis; backend job cancellation would require a cooperative cancellation contract in the analysis engine.

## Audio player and metadata

The Developer Console player is local-browser functionality over the selected file. It does not upload the file merely to generate the waveform.

The player derives WAV metadata from RIFF chunks and decodes the audio locally for a compact waveform. During playback, a browser `AnalyserNode` provides instantaneous peak level and clipping state. The meter is a playback monitor, not a scientific measurement returned by the VoxVector backend.

## Developer access boundary

The browser gate is an interface authorization layer. It is not sufficient to secure sensitive backend data.

Current developer admission requires:

```text
Supabase session exists
AND
user.app_metadata.role == "developer"
OR
user.app_metadata.voxvector_role == "developer"
```

Only trusted server or admin processes should assign these metadata values.

FastAPI diagnostic endpoints enforce the developer role before returning persistent diagnostics.

See `docs/DEVELOPER_ACCESS.md`.

## API and data contract

`voxvector/src/lib/api.js` is the frontend API boundary. It preserves:

* HTTP status
* request ID
* response payload
* client observed timing
* backend error detail
* upload progress callbacks
* cancellable request handles
* lifecycle event query support

The canonical API base defaults to `https://voxvector.crownlabs.tech` and can be overridden with `VITE_VOXVECTOR_API_URL`.

## State driven animation

Motion and lightweight CSS animation may animate actual query, mutation, upload, playback, and diagnostic state, but they may not manufacture analytical progress.

The API workbench uses a transfer progress bar only for actual browser upload progress. Server analysis is indeterminate until real lifecycle events arrive. No numeric percentage is invented for the backend pipeline.

## Telemetry and diagnostics

The backend exposes authenticated `/v1/diagnostics/events` lifecycle queries and `/v1/diagnostics/errors` indexed error queries over the existing Supabase Storage architecture.

Lifecycle records include request correlation, stage names, durations, sample counts, source revision, and sanitized error fields where applicable. Raw audio and transcript content are excluded by the observability sanitizer.

HTTP 5xx events are indexed as persistent errors. Abrupt process termination can still prevent an application-level error record from being emitted, so Render process logs remain necessary evidence for host-level failures.

## Analysis Workspace

The Analysis Workspace remains the next major product surface. It will be connected only to actual API contracts and will preserve:

1. eligibility and reliability
2. evidence collection and analysis
3. candidate classification
4. final classification and disposition

It must expose uncertainty, convergence and conflict, alternatives, data quality, and abstention rather than collapsing the process into a single score.

## Accessibility

The interface must retain:

* readable text sizes
* strong contrast
* keyboard accessible controls
* semantic form labels
* visible focus states
* reduced motion support
* mobile usability
* explicit error, loading, and unavailable states
* non color only status communication

## Legal and policy navigation

The public footer links to product specific policy drafts in `VoxVector/docs/PRIVACY.md` and `VoxVector/docs/TERMS.md`, the canonical security documentation, and the repository contact page. These policy drafts describe current product intent and limitations and are not represented as final legal advice. Legal content must be reviewed and approved before being treated as a binding public policy.

## Deployment

The GitHub Pages workflow builds `voxvector/` with Vite and stages the compiled application at `/voxvector/`. The workflow also stages a concrete `/voxvector/developer/index.html` route and a local `/voxvector/404.html` fallback. It explicitly stages `docs/crownlabsbible/` because the general repository `docs/` tree is intentionally excluded from the public artifact. The root `voxvector.html` is a compatibility redirect only and must not contain a second landing implementation.

## Verification

The source changes for the developer controls, diagnostics, metadata/player workflow, profile editing, documentation routing, and Crown Labs Bible deployment restoration are committed to GitHub. No fresh browser or GitHub Actions verification has been performed in this change session, so production build and deployment success must not be claimed until CI and browser verification complete.

## Acceptance principle

The frontend is complete only when important workflows operate against real VoxVector API and data behavior, authorization boundaries are enforced, failures are visible, and browser, accessibility, and deployment verification succeeds. A polished mockup is not completion.
