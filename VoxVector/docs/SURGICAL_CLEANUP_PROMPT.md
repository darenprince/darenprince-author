# VoxVector Surgical Cleanup Prompt

Use this prompt for the repository-wide cleanup pass.

> You are cleaning and hardening the existing VoxVector product. **Do not rebuild, recreate, redesign, or rewrite existing product surfaces.** Treat the current repository implementation as canonical. For every problem you find, trace the actual rendered/runtime source, identify the smallest controlling implementation, and edit that implementation directly.
>
> Start by reading `VoxVector/docs/OPERATING_CHARTER.md`, `VoxVector/docs/PROJECT_DECISION_LOG.md`, `VoxVector/docs/AI_EDITING_GUARDRAILS.md`, `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`, and `VoxVector/docs/SURGICAL_EDITING_STANDARD.md`.
>
> Audit the entire VoxVector frontend and supporting implementation for duplicate or competing implementations: components, CSS, runtime DOM manipulation, injected styles, responsive overrides, duplicated assets, duplicate routes, legacy copies, stale selectors, dead code, conflicting source paths, and build/deployment transformations.
>
> For each finding, determine the canonical source before editing. Fix the canonical source directly. Remove only obsolete conflicting code that is demonstrably superseded. Preserve all unrelated functionality, navigation, state, API behavior, accessibility, responsive behavior, animations, assets, typography, spacing, and product content.
>
> Do not create `new`, `v2`, `final`, `backup`, replacement, or parallel files. Do not solve a component problem with DOM surgery when the component itself can be edited. Do not solve a stylesheet problem with another stylesheet when the canonical stylesheet can be corrected. Do not overwrite whole files from memory or partial output.
>
> Pay particular attention to the landing page because recent changes exposed a recurring issue where `LandingContentRefinement.jsx`, `brand.css`, and the React-rendered header could all influence the same visual surface. Establish clear ownership and eliminate unnecessary competing layers rather than adding another override.
>
> Audit the Developer Console and every other frontend surface for the same class of problem. The goal is one authoritative implementation for each product behavior and visual surface.
>
> After cleanup, perform a readback and integrity review. Search for duplicate implementations and conflicting selectors. Inspect the complete diff. Run applicable frontend build/tests. Verify affected rendered surfaces at mobile and desktop widths when browser tooling is available. Verify existing functionality survived. Do not claim visual or deployment verification unless it actually occurred.
>
> Update canonical documentation only where the audit reveals a real architectural change or establishes a durable rule. Preserve historical records. Do not manufacture validation or deployment results.

## Scope

- Audit first; change only verified problems.
- Surgical cleanup across the existing VoxVector implementation.
- No redesign.
- No feature additions.
- No scientific methodology changes.
- Preserve existing product behavior.

## Completion criteria

- Canonical implementation identified for each cleaned surface.
- Duplicate or competing implementations removed where confirmed obsolete.
- No replacement pages or parallel components introduced.
- No unrelated functionality removed.
- Diff inspected for accidental churn.
- Build/tests run where applicable.
- Browser verification performed where tooling permits.
- Documentation synchronized only when warranted.
- Remaining known issues documented rather than hidden.
