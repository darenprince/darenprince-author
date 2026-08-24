# VoxVector Development, Editing, and Deployment Workflow

**Status:** Canonical active workflow
**Effective:** 2026-08-24
**Scope:** VoxVector frontend, backend, documentation, GitHub workflow, and AI assisted development

## 1. Authority

The GitHub repository is the technical source of truth. The VoxVector Operating Charter remains the highest project authority. This document is the canonical operating procedure for day to day code editing, pull requests, previews, and production deployment.

The Crown Labs Bible is an executive and product mirror. It must not override repository implementation or architecture decisions.

## 2. Surgical editing is mandatory

Existing pages and components are assets to preserve, not templates to replace.

When a request is to edit an existing page, component, stylesheet, route, or feature:

1. Read the current implementation before changing it.
2. Identify the exact file and smallest region that satisfies the request.
3. Make the smallest defensible change.
4. Preserve unrelated markup, components, imports, logic, routes, state, accessibility behavior, responsive behavior, animations, styling, and existing functionality.
5. Read back the changed file and inspect the diff before considering the edit complete.
6. Search for duplicate implementations or references created by the change.

### Explicit prohibition

AI agents must **not completely recreate, regenerate, or overwrite an existing page file** merely because a page needs editing.

A page may be substantially rewritten only when the user explicitly requests a rewrite, replacement, architectural migration, or other change that requires it.

If the requested change can be made surgically, it must be made surgically.

Do not replace an existing page with a new simplified version from memory, a screenshot, a prompt, or an earlier design. This has previously caused working features and UI behavior to disappear.

## 3. No duplicate pages

Do not create another version of an existing page to avoid editing the canonical page.

Before creating a page, route, component, or HTML entry point:

- search for the existing page or route;
- determine its canonical implementation;
- edit that implementation when it already exists;
- confirm the new page represents genuinely new product functionality.

A new page is permitted only when it is a truly additional page or route in the product architecture.

Do not create files such as `landing-new`, `landing-v2`, `dashboard-new`, `dashboard-final`, `index2`, replacement HTML copies, or competing route implementations as a workaround for editing an existing surface.

Compatibility redirects are allowed when they are intentionally documented as redirects and do not contain a second implementation.

## 4. Preserve existing product surfaces

For frontend work, preserve the existing application structure unless restructuring is explicitly requested.

In particular:

- do not replace the existing landing page with a newly invented page;
- do not replace the existing Developer Console or Analysis Workspace with a new dashboard simply to implement a visual request;
- do not remove working controls because they are not visible in a reference image;
- do not silently remove routes, API integrations, authentication, state management, or analytical views;
- do not introduce competing navigation, header, waveform, console, or analysis systems;
- do not treat a screenshot as a complete specification of the existing application;
- if the user requests an application change, implement it in the application rather than substituting a static image mockup unless an image/design artifact was explicitly requested.

Reference images describe desired visual changes. They do not authorize deletion of functionality that is not shown.

## 5. Canonical frontend asset boundary

The backend and analysis-engine workspace is `VoxVector/`. The public React application is `voxvector/`.

Canonical VoxVector design assets live under `VoxVector/Assets/`. The frontend build may stage required assets into `voxvector/public/` as a build-time operation so Vite emits them into `voxvector/dist/`. Those staged files are build inputs, not a second canonical source directory.

Current canonical landing assets are:

- `VoxVector/Assets/voxvector-audio-analysis-console.png`
- `VoxVector/Assets/VoxVector-logo-word.png`
- `VoxVector/Assets/voxvector-icon-final-color.png.PNG`

The console image is referenced by the landing refinement as `/voxvector/voxvector-audio-analysis-console.png`. The wordmark is referenced as `/voxvector/VoxVector-logo-word.png` and is paired with the icon at the same visual height.

Do not use or create these obsolete competing source paths:

- `VoxVector/voxvector-audio-analysis-console.png`
- `VoxVector/VoxVector-logo-word.png`

The production and PR preview workflows must use the exact case-sensitive `VoxVector/Assets/` paths, stage the assets before Vite runs, and verify the emitted assets in `dist/`. If an obsolete permanent source copy is reintroduced, the workflow must fail with a clear diagnostic rather than silently choosing one of two files.

## 6. Change classification

Before editing, classify the request:

- **Content edit:** change copy only.
- **Visual edit:** change styling, spacing, color, imagery, or animation while preserving behavior.
- **Behavior edit:** change an existing interaction or data flow.
- **Feature addition:** add genuinely new functionality to an existing surface.
- **New page:** add a genuinely new route or product surface.
- **Architecture change:** intentionally restructure implementation.

The default is the smallest category that satisfies the request.

## 7. Development flow

All substantive VoxVector changes should use:

```text
main
  ↓
feature/fix branch
  ↓
pull request
  ↓
production-like build
  ↓
PR preview artifact / isolated preview
  ↓
manual visual / functional review
  ↓
merge
  ↓
production GitHub Pages deployment
```

Do not use `main` as the working branch for iterative visual development.

A PR is the review boundary. The PR should contain one coherent change set and should not mix unrelated redesigns or speculative rewrites.

## 8. Preview principle

A preview must be isolated from production.

The production GitHub Pages deployment must never be replaced by a feature branch or PR preview.

The current PR workflow builds the exact PR frontend and uploads a review artifact. A public browser preview requires an isolated Pages preview target; until that infrastructure exists, the artifact or a local browser preview is the review boundary.

If the isolated preview infrastructure is unavailable, use a build artifact or local browser preview rather than deploying a feature branch to the production Pages site.

## 9. Production deployment

Production frontend deployment has one canonical source: `main`.

GitHub Pages is the only canonical public frontend host for VoxVector.

Render remains the canonical backend host.

Production deployment must build the canonical `voxvector/` React application and publish the generated artifact under `/voxvector/`.

Feature branches must not trigger production deployment.

The legacy root `voxvector.html` remains a compatibility redirect only and must never become a second frontend implementation.

## 10. Deployment checks

Deployment checks must be stable and directly related to deployment integrity.

Keep checks for:

- successful dependency installation;
- successful application build;
- required production artifacts existing;
- required assets being present;
- successful Pages artifact creation;
- successful Pages deployment.

Do not use brittle marketing-copy grep assertions as the primary deployment gate.

Do not make deployment depend on a particular sentence, temporary design marker, generated class name, or internal component name unless that item is itself a required deployment artifact.

Scientific QA and application testing remain separate from the Pages publishing mechanism.

## 11. Verification discipline

A green GitHub Actions run means the workflow completed successfully. It does not automatically prove that the live browser experience is correct.

For substantive frontend changes:

- inspect the PR diff;
- inspect the production build output;
- inspect the PR preview artifact when available;
- verify desktop and mobile behavior;
- verify the requested change;
- verify that unrelated functionality remains present;
- verify accessibility and reduced-motion behavior where relevant;
- merge only after the change is visually and functionally acceptable.

After merge, verify the production URL and confirm that the deployed revision corresponds to the merged commit when tooling permits.

## 12. Landing refinement integrity

Landing refinements that are applied after React render must be idempotent. Delayed re-application or runtime recovery must never create duplicate visual components.

The workflow console is a single canonical image inserted immediately after the existing workflow heading. Its refinement selector must locate the existing `.vv-console-feature` directly rather than depending on an optional wrapper class or child position.

The console presentation includes one full-width, coffee-colored animated waveform layer behind the supplied console image. The waveform is decorative interface motion only and is not analysis telemetry or a scientific result.

The public header icon and wordmark lockup is allocated **50% of the available header width on mobile**. The icon and wordmark are a single cohesive lockup at the same visual height. Desktop uses a restrained professional SaaS/application size rather than the oversized mobile treatment.

The footer repeats the supplied brand lockup as a centered icon above wordmark immediately before the copyright row.

All are presentation-layer changes. They must preserve the existing landing DOM, navigation, responsive behavior, accessibility behavior, and deployment asset boundary.

## 13. Documentation synchronization

When this workflow or editing discipline changes, synchronize:

- `VoxVector/docs/OPERATING_CHARTER.md`
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `VoxVector/docs/AI_EDITING_GUARDRAILS.md`
- `VoxVector/docs/PROJECT_DECISION_LOG.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- relevant deployment/build documentation
- `docs/crownlabsbible/04-product-dossiers/VoxVector/`

Historical records may be retained, but obsolete instructions must be explicitly marked superseded rather than left looking active.

## 14. Final preservation rule

When uncertain, stop before broadening the change.

Inspect the current implementation, identify the canonical page, make the smallest defensible edit, and verify that existing functionality survived.

**Do not rebuild the wheel when the request is to adjust the wheel.**
