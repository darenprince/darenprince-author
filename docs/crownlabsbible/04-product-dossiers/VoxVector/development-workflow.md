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

The public header icon and wordmark lockup is allocated **50% of the available header width on mobile**. The icon and wordmark form one cohesive lockup at the same visual height. Desktop uses a restrained professional SaaS/application size rather than the oversized mobile treatment. The footer places the supplied icon above the wordmark, centered immediately before the copyright row.

These are presentation-layer changes and must preserve the existing landing DOM, navigation, responsive behavior, accessibility behavior, and asset staging boundary.

## Canonical Frontend Asset Boundary

The public React application is `voxvector/`. The backend and analysis-engine workspace is `VoxVector/`.

Canonical VoxVector design assets live under `VoxVector/Assets/`. Frontend builds may stage those source assets into `voxvector/public/` as a build-time operation so Vite emits them into the production artifact. Do not create a second permanent canonical asset directory merely to make a deployment work.

The current canonical landing assets include:

- `VoxVector/Assets/voxvector-audio-analysis-console.png`
- `VoxVector/Assets/VoxVector-logo-word.png`
- `VoxVector/Assets/voxvector-icon-final-color.png.PNG`

The landing refinement references the emitted console image as `/voxvector/voxvector-audio-analysis-console.png` and the emitted wordmark as `/voxvector/VoxVector-logo-word.png`.

The obsolete source path `VoxVector/voxvector-audio-analysis-console.png` must not be recreated. Neither should a competing permanent copy of the wordmark be placed at `VoxVector/VoxVector-logo-word.png`.

Production and PR preview workflows must reference the exact case-sensitive canonical paths, stage assets before Vite builds, and verify the resulting files in `dist/`. If an obsolete duplicate source path appears, the workflow should fail clearly rather than choose between competing files.

## Development and Review Flow

The active engineering workflow is:

**feature branch → pull request → production-like build → isolated PR preview or review artifact → manual visual and functional review → merge to `main` → production GitHub Pages deployment**

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
