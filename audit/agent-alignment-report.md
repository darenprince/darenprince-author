# Agent Alignment Report

Generated: 2026-06-01

## Scope Scanned

- `docs/AGENTS.md`
- `.github/`
- `docs/CODEX_PROMPTS.md`
- project documentation containing automation, agent, or workflow guidance

## Findings

| Surface                                   | Finding                                                                      | Required Alignment                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `docs/AGENTS.md`                          | Does not mention Crown Labs Bible as product source of truth.                | Add explicit directive: authoritative source is `docs/crownlabsbible/`.       |
| `.github/PULL_REQUEST_TEMPLATE.md`        | No Crown Labs canonical-data checklist.                                      | Add checkbox requiring product changes to derive from `docs/crownlabsbible/`. |
| `.github/workflows/deploy-pr-preview.yml` | Build workflow relies on npm scripts; no data-source issue found.            | Ensure build script generates metadata before Labs pages.                     |
| `docs/CODEX_PROMPTS.md`                   | Prompt docs may allow broad generation without canonical product constraint. | Add Crown Labs product truth directive.                                       |
| `README.md`                               | Contains operational notes for Labs.                                         | Update to reference canonical docs and generated metadata.                    |

## Agent Operating Rule To Add

> The authoritative source of truth for Crown Labs products is `./docs/crownlabsbible/`. Agents must not create or update competing product inventories, roadmap summaries, classifications, valuation references, or portfolio descriptions outside the generated metadata pipeline.
