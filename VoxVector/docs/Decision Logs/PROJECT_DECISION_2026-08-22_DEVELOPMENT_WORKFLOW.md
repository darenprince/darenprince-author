# Project Decision — 2026-08-22 Development Workflow and Page Preservation

## Decision

VoxVector adopts pull requests as the review boundary for substantive development and makes surgical editing of existing product surfaces the default AI and engineering behavior.

## Page preservation

Existing pages, routes, components, and product surfaces are canonical assets. Normal edit requests must modify those existing implementations rather than recreating them.

AI agents must not completely regenerate or overwrite an existing page unless the user explicitly requests a rewrite, replacement, migration, or architectural restructuring.

Duplicate versions of existing pages are prohibited. A new page is created only when it represents genuinely new product functionality.

## Branch and deployment model

- `main` is the production frontend source.
- GitHub Pages is the production frontend host.
- Render remains the backend host.
- Feature branches are used for substantive work.
- Pull requests are used for review.
- Production Pages deployment occurs only from `main` or an explicit manual production workflow run.
- Pull request builds must not deploy to the production Pages environment.
- PR builds are retained as review artifacts until a separate isolated Pages preview target is established.

GitHub's Pages documentation recommends skipping deployment when a custom Pages workflow is triggered by `pull_request`; this is consistent with the production isolation requirement.

## Deployment checks

The production Pages workflow validates build and artifact integrity only. Brittle content grep assertions are not production deployment gates.

Application QA, browser review, and scientific validation remain separate from the publishing mechanism.

## Documentation

The active operating procedure is `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`.

AI-specific rules are in `VoxVector/docs/AI_EDITING_GUARDRAILS.md` and `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`.

Crown Labs mirrors the workflow in `docs/crownlabsbible/04-product-dossiers/VoxVector/development-workflow.md`.
