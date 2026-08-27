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

## 4. MIGRATE BEHAVIOR BEFORE RETIRING A PATCH

**Architectural cleanup is not a deletion exercise.** A patch, refinement, override, recovery layer, compatibility file, or workaround can contain newer or otherwise valuable behavior even when its architecture is undesirable.

Never delete such a layer merely because its filename looks temporary or because it does not fit the target architecture.

Before retiring it:

1. Read its complete contents.
2. Identify every behavior it introduces or modifies.
3. Trace imports, consumers, selectors, assets, dependencies, and runtime effects.
4. Inspect git history and identify when each significant behavior was introduced or last changed.
5. Compare that behavior with the current canonical implementation.
6. Classify each behavior as already canonical, missing, conflicting, obsolete, or requiring a canonical fix.
7. Identify the correct canonical owner.
8. Migrate all required or newer behavior into that owner.
9. Read the canonical implementation back and verify the behavior is actually present.
10. Verify the resulting visual, functional, responsive, accessibility, and runtime behavior as applicable.
11. Search for remaining competing ownership and stale references.
12. Only then remove the obsolete layer.

A patch may be architecturally wrong while containing the newest correct logo sizing, spacing, breakpoint, animation, accessibility, or interaction behavior. **Preserve the behavior by moving it into the canonical implementation before retiring the patch.**

A patch may also be only partially obsolete. Migrate the useful portions and retire only what is genuinely obsolete.

Git history is evidence of chronology and intent, not an automatic verdict that newer code is correct or older code is obsolete. The actual contents must always be inspected.

## 5. NEVER REGENERATE A LARGE FILE FOR A SMALL REQUEST

If a 2,000-line file needs one button changed, change the button.

Do not replace the file with a newly generated approximation.

Do not reconstruct it from screenshots, memory, prompts, summaries, or an older version unless the user explicitly requests a full rewrite or migration.

Preserve everything the user did not ask to change.

## 6. LARGE EDITS MUST BE PERFORMED IN PLACE

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

## 7. DO NOT USE RUNTIME DOM SURGERY AS A SUBSTITUTE FOR SOURCE EDITING

If React renders the UI, change the React source.

Do not use `document.querySelector`, `textContent`, `style.display`, injected nodes, delayed mutation, or similar runtime DOM surgery to rewrite existing application UI when the canonical JSX/component can be edited directly.

If a legacy runtime layer contains required behavior, migrate that behavior into the canonical source first; then remove the runtime mutation mechanism.

## 8. DO NOT LET CSS OVERRIDES BECOME AN ARCHITECTURE

If a component's geometry, spacing, radius, typography, or behavior is wrong, fix the owning component or its canonical stylesheet.

Do not accumulate increasingly specific selectors to fight earlier selectors.

When conflicting layers exist, inspect every layer's actual behavior and history, migrate required behavior into the canonical owner, and then consolidate the competing layers.

A stylesheet is not disposable merely because its name says `fix`, `override`, `refinement`, or `patch`.

## 9. PRESERVE THE PRODUCT

Never remove existing controls, features, copy, routes, state, API behavior, responsive behavior, accessibility, or analysis UI merely because they were not mentioned in the latest request.

A screenshot shows what should change visually. It does not authorize deletion of functionality outside the screenshot.

## 10. DEPENDENCY MIGRATIONS PRESERVE THE EXISTING PRODUCT

A migration such as Tremor → Recharts 3 means replacing the dependency implementation while preserving the existing UI, behavior, data, layout, controls, and product surface.

It does not authorize rebuilding the page in a simplified form.

## 11. BEFORE CREATING OR DELETING ANY FILE

Ask:

> **What functionality does this file contain, who consumes it, when was that behavior introduced, and where should that behavior live canonically?**

Search the repository and inspect relevant history before creating or deleting anything.

If the functionality already has an owner, edit or migrate into that owner.

Only create a new file when the functionality is genuinely new or an architectural extraction is explicitly justified.

Only delete a file after confirming that required behavior has been migrated or that the file is genuinely obsolete.

## 12. REQUIRED RESPONSE TO "THIS FILE IS TOO LARGE"

The correct response is **not** to create a patch layer.

The correct response is:

> Read the existing file in sections, identify the canonical implementation, make the requested changes in place, and verify the result.

## 13. REQUIRED MIGRATION QUESTION

Before retiring any competing implementation, answer:

> **What does this implementation do today that the canonical implementation does not?**

If the answer is anything nontrivial, migrate that behavior before deletion.

Do not use file naming, age, aesthetic preference, or architectural preference as a substitute for this analysis.

## 14. HIGHEST PRIORITY

When these rules conflict with agent convenience, generation limits, or a desire to produce a smaller diff, **these rules win**.

The application architecture is more important than making the edit easy for the AI.

See the detailed VoxVector rules in:

- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `VoxVector/docs/AI_EDITING_GUARDRAILS.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/OPERATING_CHARTER.md`
