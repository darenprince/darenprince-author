# NON-NEGOTIABLE AI EDITING RULES

These rules apply to every AI agent working anywhere in this repository.

## 1. EDIT THE ORIGINAL SOURCE OF TRUTH

If the feature, page, component, interaction, styling, or behavior already exists, **edit the existing canonical file that owns it.**

Do not avoid the original file because it is large, complicated, old, cumbersome, or inconvenient to edit.

**A large file is not permission to create a patch layer.**

Read the file in sections if necessary. Make targeted edits. Read it back. Verify it.

## 2. NO PATCH STACKS

Do not solve an editing problem by adding another layer around the existing implementation.

Do not create workaround files or runtime patches such as:

- `*Refinement`
- `*Override`
- `*Patch`
- `*Enhancement`
- `*Fix`
- `*Recovery`
- `*New`
- `*V2`
- duplicate pages
- duplicate components
- duplicate navigation
- duplicate headers
- duplicate dashboards
- duplicate analysis workspaces
- DOM mutation that rewrites React UI after render
- CSS whose primary purpose is to undo another stylesheet

A new component is appropriate when it is genuinely new architecture, not when editing the existing component is inconvenient.

## 3. ONE CANONICAL IMPLEMENTATION

Every feature must have one authoritative implementation.

If you discover competing implementations, stop and determine which one is canonical before changing anything.

Do not add a third implementation.

## 4. NEVER REGENERATE A LARGE FILE FOR A SMALL REQUEST

If a 2,000-line file needs one button changed, change the button.

Do not replace the file with a newly generated approximation.

Do not reconstruct it from screenshots, memory, prompts, summaries, or an older version unless the user explicitly requests a full rewrite or migration.

Preserve everything the user did not ask to change.

## 5. LARGE EDITS MUST BE PERFORMED IN PLACE

If an edit is genuinely large:

1. Read the complete existing implementation in manageable ranges.
2. Map the current structure and dependencies.
3. Identify the exact sections that need modification.
4. Edit those sections in the canonical file(s).
5. Preserve unrelated functionality.
6. Read the resulting file back.
7. Inspect the diff.
8. Build/test/browser-verify.

**Do not turn a large edit into a pile of small overlay patches just to make the AI's work easier.**

Agent convenience is subordinate to architectural integrity.

## 6. DO NOT USE RUNTIME DOM SURGERY AS A SUBSTITUTE FOR SOURCE EDITING

If React renders the UI, change the React source.

Do not use `document.querySelector`, `textContent`, `style.display`, injected nodes, delayed mutation, or similar runtime DOM surgery to rewrite existing application UI when the canonical JSX/component can be edited directly.

Runtime behavior is not a convenient escape hatch from editing the source.

## 7. DO NOT LET CSS OVERRIDES BECOME AN ARCHITECTURE

If a component's geometry, spacing, radius, typography, or behavior is wrong, fix the owning component or its canonical stylesheet.

Do not accumulate increasingly specific selectors to fight earlier selectors.

When conflicting layers exist, consolidate them instead of adding another override.

## 8. PRESERVE THE PRODUCT

Never remove existing controls, features, copy, routes, state, API behavior, responsive behavior, accessibility, or analysis UI merely because they were not mentioned in the latest request.

A screenshot shows what should change visually. It does not authorize deletion of functionality outside the screenshot.

## 9. DEPENDENCY MIGRATIONS PRESERVE THE EXISTING PRODUCT

A migration such as Tremor → Recharts 3 means replacing the dependency implementation while preserving the existing UI, behavior, data, layout, controls, and product surface.

It does not authorize rebuilding the page in a simplified form.

## 10. BEFORE CREATING ANY FILE

Ask:

> **Does this functionality already have an owner?**

If yes, edit that owner.

Only create a new file when the functionality is genuinely new or an architectural extraction is explicitly justified.

## 11. REQUIRED RESPONSE TO "THIS FILE IS TOO LARGE"

The correct response is **not** to create a patch layer.

The correct response is:

> Read the existing file in sections, identify the canonical implementation, make the requested changes in place, and verify the result.

## 12. HIGHEST PRIORITY

When these rules conflict with agent convenience, generation limits, or a desire to produce a smaller diff, **these rules win**.

The application architecture is more important than making the edit easy for the AI.

See the detailed VoxVector rules in:

- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `VoxVector/docs/AI_EDITING_GUARDRAILS.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/OPERATING_CHARTER.md`
