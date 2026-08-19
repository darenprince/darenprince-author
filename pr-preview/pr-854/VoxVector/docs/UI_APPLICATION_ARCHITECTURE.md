# VoxVector UI Application Architecture

## Status

**Approved and in active implementation.** The public React application is deployed at `/voxvector/`. The landing experience now uses the actual Tremor analytical component library together with application owned shadcn style components backed by Base UI, Lucide icons, Tailwind CSS, Motion for React, and TanStack Query. The Developer Console foundation, Supabase developer gate, state driven API activity visualization, accessible landing foundation, and policy navigation are implemented. Backend protected operational telemetry remains the next security and integration phase.

## Architecture

| Layer | Choice | Role |
|---|---|---|
| Application | React 19 | Product shell and route composition |
| UI | shadcn style application owned composition with Base UI primitives | Accessible interaction primitives and product specific components |
| Analytical UI | Tremor React 3.18.7 | Real analytical cards, charts, progress indicators, and dashboard composition |
| Styling | Tailwind CSS | Responsive layout, typography, tokens, and theming |
| Icons | Lucide React | Consistent product and interface iconography |
| Animation | Motion for React | State driven transitions and interaction animation |
| Server state | TanStack Query | API lifecycle, caching, retries, mutations, refresh |
| Authentication | Supabase Auth | Developer identity and session handling |
| Authorization | Supabase trusted `app_metadata` plus future FastAPI enforcement | Developer role gating |
| API | FastAPI on Render | Canonical backend |
| Persistence and diagnostics | Supabase | Existing operational architecture |
| Deployment | GitHub Pages | Public React frontend under `/voxvector/` |

Render and Supabase remain unchanged as infrastructure boundaries.

## Design system direction

The landing page and future public application surfaces use the VoxVector dark visual foundation with a restrained blue and cyan analytical palette, neutral surfaces, and limited semantic green, amber, and violet accents. Violet is a supporting accent rather than the dominant color.

The visual language is Tremor first. Tremor components are used directly for analytical cards, charts, progress indicators, and evidence visualization. Vercel and Linear remain reference points for spacing, typography, hierarchy, compact controls, subtle borders, and developer product clarity. They are visual references only and are not deployment platforms or runtime dependencies.

The actual application layer is owned by VoxVector and follows shadcn composition patterns. Base UI supplies headless interaction behavior. VoxVector specific tokens, composition, icon treatment, evidence states, and analytical visualization patterns sit above those primitives.

Avoid unnecessary rounded containers, heavy white borders, excessive gradients, oversized decorative effects, or purple heavy color treatment. Color should communicate system state and analytical meaning first.

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
* a Project Briefing call to action
* a Documentation call to action
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
* restrained dark visual token system
* evidence first product positioning
* four stage analytical workflow presentation
* current observational method presentation
* scientific state communication
* Project Briefing and Documentation calls to action
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
* operational dashboard
* real `/health` query through TanStack Query
* API workbench for the actual `/v1/analyze` endpoint
* WAV upload and real request execution
* HTTP status, client timing, `X Request ID`, and response JSON visibility
* canonical documentation navigator
* development board
* explicit unavailable states for telemetry and error endpoints that do not yet exist
* Motion based API activity visualization tied to real query and mutation state

The console does not fabricate request counts, error counts, 5xx totals, analysis totals, lifecycle events, or storage records.

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

The next backend security milestone must validate Supabase access tokens in FastAPI and enforce the developer role on diagnostic and operational endpoints before those endpoints expose sensitive data.

See `docs/DEVELOPER_ACCESS.md`.

## API and data contract

`voxvector/src/lib/api.js` is the frontend API boundary. It preserves:

* HTTP status
* request ID
* response payload
* client observed timing
* backend error detail

The canonical API base defaults to `https://voxvector.crownlabs.tech` and can be overridden with `VITE_VOXVECTOR_API_URL`.

## State driven animation

Motion may animate actual query and mutation state, but it may not manufacture analytical progress.

The current console uses an indeterminate activity waveform for real `/health` and `/v1/analyze` requests because the backend does not expose numeric progress. Completed, idle, and error states are rendered from actual request state.

If the backend later provides discrete lifecycle events, the UI will present discrete lifecycle states. Numerical percentages require an actual defined backend progress metric.

## Analysis Workspace

The Analysis Workspace remains the next major product surface. It will be connected only to actual API contracts and will preserve:

1. eligibility and reliability
2. evidence collection and analysis
3. candidate classification
4. final classification and disposition

It must expose uncertainty, convergence and conflict, alternatives, data quality, and abstention rather than collapsing the process into a single score.

## Telemetry roadmap

The console currently marks these areas as unavailable rather than simulating them:

* persistent error browser
* protected diagnostic detail
* lifecycle event stream
* request, error, 5xx, and analysis aggregates
* recurrence and resolution tracking

These require backend query contracts over the existing Supabase diagnostic architecture.

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

The GitHub Pages workflow builds `voxvector/` with Vite and stages the compiled application at `/voxvector/`. The workflow also stages a concrete `/voxvector/developer/index.html` route and a local `/voxvector/404.html` fallback. The root `voxvector.html` is a compatibility redirect only and must not contain a second landing implementation.

## Verification

The frontend stack and landing implementation have been committed to GitHub. A fresh GitHub Actions run is still required before claiming a successful production build or deployment. A successful commit is not equivalent to successful CI or deployment.

## Acceptance principle

The frontend is complete only when important workflows operate against real VoxVector API and data behavior, authorization boundaries are enforced, failures are visible, and browser, accessibility, and deployment verification succeeds. A polished mockup is not completion.
