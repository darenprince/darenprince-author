# VoxVector Development Workflow

## Canonical Operating Rule

The VoxVector GitHub repository is the technical source of truth. This Crown Labs document mirrors the active development workflow for executive and product context.

VoxVector development uses controlled, surgical changes to the existing product. The objective is to improve the real product without losing functionality, creating competing versions, or allowing deployment mechanics to obscure the actual application state.

## Surgical Editing

When an existing VoxVector page, component, route, or feature is being changed, the existing implementation must be read and preserved.

The default approach is:

1. identify the canonical implementation;
2. edit only the necessary region;
3. preserve existing features and behavior;
4. inspect the resulting diff;
5. verify the requested change without introducing unrelated changes.

AI agents must not recreate or overwrite an existing page from scratch unless an explicit request authorizes a rewrite, replacement, migration, or architectural restructuring.

A screenshot or design reference is not permission to discard functionality that is not visible in the screenshot.

For application changes, implement the requested behavior in the real application. Do not substitute a static image mockup unless an image/design artifact was explicitly requested.

## No Duplicate Page Versions

VoxVector must have one canonical implementation for each existing page or route.

Do not create alternate versions such as `landing-v2`, `dashboard-new`, `index2`, `final-dashboard`, or similar files to work around an edit. A new page is created only when it represents genuinely new product functionality.

Compatibility redirects are permitted when intentionally documented and when they do not contain a second implementation.

## Landing Refinement Integrity

Runtime landing refinements must be idempotent. If a refinement is re-applied after delayed rendering or recovery, it must find and reuse an existing component rather than inserting another copy.

The workflow section contains one canonical VoxVector audio analysis console image. The refinement locates the existing `.vv-console-feature` directly, preventing delayed re-application from producing duplicate console images.

The console presentation includes one full-width coffee-colored animated waveform behind the supplied console image. The waveform is decorative interface motion only. It is not live telemetry, analysis output, or a scientific result.

The public header icon and wordmark lockup is allocated **50% of the available header width on mobile**. Whenever the icon and wordmark are rendered side-by-side, both image elements must use the exact same rendered height at every breakpoint, with no exception. Desktop uses a restrained professional SaaS/application size rather than the oversized mobile treatment. The footer follows the same equal-height side-by-side lockup rule.

These are presentation-layer changes and must preserve the existing landing DOM, navigation, responsive behavior, accessibility behavior, and asset staging boundary.

## Canonical Frontend Asset Boundary

The public React application is `voxvector/`. The backend and analysis-engine workspace is `VoxVector/`.

Canonical VoxVector design assets live under `VoxVector/Assets/`. Frontend builds may stage those source assets into `voxvector/public/` as a build-time operation so Vite emits them into the production artifact. Do not create a second permanent canonical asset directory merely to make a deployment work.

The current canonical frontend brand assets include:

- `VoxVector/Assets/voxvector-audio-analysis-console.png`
- `VoxVector/Assets/voxvector_wordmark.svg`
- `VoxVector/Assets/voxvector_icon_2_cropped.png`
- `VoxVector/Assets/voxvector_logo_icon.png`

The semantic asset rule is explicit:

- use `voxvector_icon_2_cropped.png` for the squircle/application identity, including login, favicon, Apple touch icon, installed/PWA app icon, Crown Labs product cards, and Crown Labs Bible product/document navigation;
- use `voxvector_logo_icon.png` for icon-only brand marks and combined icon + wordmark lockups, including the top navigation and startup/load states;
- use `voxvector_wordmark.svg` everywhere a VoxVector wordmark is required; on dark VoxVector UI surfaces the black source SVG is styled very light gray, and every side-by-side icon + wordmark lockup renders both images at the exact same CSS height.

The deployment workflows stage both icon assets and the SVG wordmark into the React public directory before the Vite build. The production Pages artifact also exposes the selected canonical brand assets under `/VoxVector/Assets/` for Crown Labs and Crown Labs Bible consumers. Asset migration must therefore trace source → staging → build → Pages artifact rather than assuming an asset is absent because it is not under `voxvector/public/` in the source tree.

The landing refinement references the emitted console image as `/voxvector/voxvector-audio-analysis-console.png` and the emitted wordmark as `/voxvector/voxvector_wordmark.svg`.

The obsolete source path `VoxVector/voxvector-audio-analysis-console.png` must not be recreated. Neither should a competing permanent copy of the wordmark be placed at `VoxVector/voxvector_wordmark.svg`.

Production and PR preview workflows must reference the exact case-sensitive canonical paths, stage assets before Vite builds, and verify the resulting files in `dist/`. If an obsolete duplicate source path appears, the workflow should fail clearly rather than choose between competing files.

## Development and Review Flow

Effective September 8, 2026, [GitHub tracker #915](https://github.com/darenprince/darenprince-author/issues/915) is the execution queue. The canonical policy is [VoxVector DEVELOPMENT_WORKFLOW.md](../../../../VoxVector/docs/DEVELOPMENT_WORKFLOW.md#10-development-flow). Each substantive task records scope, owner, dependencies, acceptance criteria and evidence. Use Backlog → Ready → In progress → In review → Done; record Blocked with its reason. These statuses are maintained in issues, not an automated project board.

Update [AUDIT_REPORT.md](../../../../voxvector/audits/AUDIT_REPORT.md) and the issue after every completed task. Preserve historical audit copies and source hashes. Link PRs without closing partial tasks; close only when acceptance criteria are verified. Production acceptance requires observed deployment/runtime/browser evidence as applicable. Task completion never implies scientific validation. #910 is first; #913 closes Prompt 1 after its dependencies, and #914 follows only afterward.

The active engineering workflow is:

**issue and acceptance criteria → feature branch → linked pull request → production-like build → isolated PR preview or review artifact → manual visual and functional review → authorized merge/deployment → exact-revision verification → audit update → issue closure**

`main` is the production source. Feature branches and PR previews must never replace the production Pages deployment.

## Deployment Architecture

- GitHub is the canonical source repository.
- GitHub Pages is the canonical public VoxVector frontend host.
- Render remains the canonical backend host.
- The public React application remains the canonical `voxvector/` workspace.
- The legacy root `voxvector.html` is a compatibility redirect only.
- Vercel is retired from VoxVector deployment architecture.

The current PR workflow builds the exact PR frontend and uploads a review artifact. A public browser preview still requires an isolated Pages preview target so that reviewing a PR cannot overwrite production.

## Verification

A successful Actions workflow establishes that the workflow completed. It does not by itself establish that the live visual experience is correct or that the software is scientifically validated.

Substantive frontend changes should be inspected in the PR, reviewed in an isolated preview or artifact when available, checked on desktop and mobile, and verified after merge against the production URL.

Deployment checks should focus on stable build and artifact integrity rather than brittle assertions against temporary marketing copy or implementation markers.

## Authority

This document mirrors `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`. If the two ever conflict, the repository document and the VoxVector Operating Charter control.


## AUTO system workflow

The active VoxVector workflow is **Architecture → Ownership → Trace → Operate/verify**.

Before editing or diagnosing a production failure, establish the actual frontend, API, storage, and deployment boundaries; identify the canonical owner; trace the complete chain; make the smallest safe canonical change; and verify source, build, deployment, runtime/provider, and browser behavior separately.

This Crown Labs mirror follows the canonical technical procedure in `VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`.


## Observability tracing

Operational dashboards follow the evidence-first chain: runtime event → persistence writer → provider state → authenticated API → Developer Console. Do not replace missing production records with simulated UI state. The 2026-09-01 audit identified and repaired a relational observability projection gap while preserving the immutable Storage archive.
