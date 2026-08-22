# VoxVector Documentation Alignment — 2026-08-22

## Purpose

Record the documentation synchronization for the new development, editing, pull request, preview, and deployment workflow.

## Canonical active records

- `VoxVector/docs/OPERATING_CHARTER.md` — project authority and architecture boundary
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md` — AI operating instructions
- `VoxVector/docs/AI_EDITING_GUARDRAILS.md` — AI editing discipline
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md` — active development and deployment procedure
- `VoxVector/docs/PROJECT_DECISION_2026-08-22_DEVELOPMENT_WORKFLOW.md` — material decision record
- `.github/workflows/deploy-pages.yml` — production Pages deployment
- `.github/workflows/deploy-pr-preview.yml` — PR build preview artifact workflow
- `docs/BUILD_PIPELINE.md` — repository-level build documentation with the VoxVector workflow overlay
- `docs/crownlabsbible/04-product-dossiers/VoxVector/development-workflow.md` — Crown Labs mirror
- `docs/crownlabsbible/04-product-dossiers/VoxVector/overview.md` — Crown Labs product mirror updated with workflow rules

## Superseded material

`VoxVector/docs/DEPLOYMENT_PLAN_FREE.md` is now explicitly marked historical and superseded. It must not be treated as an active deployment runbook.

Historical provider research remains historical evidence and does not override current architecture.

## Workflow alignment

The active model is:

`feature branch → pull request → production-like build → PR build artifact / isolated preview → manual review → merge to main → production Pages deployment`

Production frontend deployment is from `main` only.

Existing pages are edited surgically. Existing functionality must be preserved. Duplicate page versions are prohibited unless a page is genuinely new product functionality.

GitHub's supported custom Pages workflow does not deploy a `pull_request` run to the Pages site. A public PR preview therefore requires a separate isolated Pages site/repository. Until that target is established, `.github/workflows/deploy-pr-preview.yml` produces a downloadable build artifact and never touches production.

## Verification state

This alignment records documentation and workflow configuration changes. It does not claim that the new PR artifact workflow has successfully executed on GitHub Actions yet. A fresh PR run is required before claiming operational verification.
