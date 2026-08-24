# VoxVector Surgical Editing Standard

**Status:** Canonical active engineering rule
**Effective:** 2026-08-24
**Scope:** All VoxVector frontend, backend, documentation, deployment, and product-surface edits

## Purpose

VoxVector is developed by modifying an existing product, not by repeatedly recreating it. A normal change must alter the existing canonical implementation that actually controls the requested behavior.

The goal is to prevent the recurring failure mode where a small requested change produces a parallel implementation, runtime patch, duplicate style, replacement component, stale override, or unrelated rewrite.

## Core rule

**Find the thing. Trace the thing. Change the thing. Verify the thing.**

For every existing-surface edit:

1. Identify the user-visible target.
2. Trace the target to the canonical source that renders or controls it.
3. Trace dependent CSS, assets, runtime transformations, responsive rules, and build/deployment steps.
4. Identify competing implementations and overrides before writing.
5. Modify the smallest canonical source region that controls the requested behavior.
6. Do not create a second implementation merely because it is easier to patch.
7. Remove obsolete conflicting code when the canonical implementation replaces it.
8. Read back the modified source and inspect the diff.
9. Build and inspect the affected artifact when applicable.
10. Verify the actual rendered behavior at every affected breakpoint or runtime state.

## Source-of-truth tracing

Before editing a visual or behavioral element, answer these questions in the working record:

- What component renders it?
- What stylesheet or token controls it?
- Is any runtime script modifying it after render?
- Are there responsive overrides?
- Are there duplicate selectors or components?
- Which asset is canonical?
- Which build step stages or transforms it?
- Which deployed artifact contains it?

If the answer is unknown, inspect before changing.

## No compensating patches

Do not solve a canonical implementation problem by stacking another layer on top of it.

Prohibited by default:

- JavaScript DOM replacement to compensate for an incorrect React component.
- Injected `<style>` blocks to override canonical CSS when the canonical CSS can be edited.
- Duplicate components for the same product surface.
- Broad selectors used to defeat narrower selectors elsewhere.
- Repeated media-query overrides that fight one another.
- Copying an existing page or component into a new file to avoid editing the original.
- Recreating assets that already exist canonically.
- Keeping an obsolete implementation active after introducing the canonical replacement.

An override is acceptable only when it is the documented architectural mechanism and there is no simpler canonical source to edit.

## Surgical diff standard

The size and scope of the implementation change must be proportional to the request.

A request such as a color, spacing, size, copy, or single interaction adjustment should normally produce a narrowly scoped diff. A large rewrite requires an explicit architectural reason or explicit user authorization.

Before completion, inspect for:

- unrelated deletions;
- duplicated selectors;
- duplicate components;
- duplicate assets;
- changed routes;
- changed imports;
- changed state or data flow;
- changed responsive behavior outside the request;
- changed accessibility behavior outside the request;
- formatting churn unrelated to the request.

## Runtime refinement boundary

Runtime DOM refinement is not a general-purpose editing mechanism.

If an element is owned by React, the preferred fix is to edit the React component and its canonical stylesheet. Runtime refinement may be used only when the architecture intentionally requires post-render integration, legacy compatibility, or a documented external boundary.

A runtime refinement must never silently become a second implementation of an existing component.

## Verification chain

Source verification is not enough.

For frontend changes, verification proceeds through:

**canonical source → production build → emitted artifact → deployed revision → rendered browser result**

For backend changes:

**canonical source → test/build → deployed revision → live runtime behavior**

A green build proves the build completed. It does not prove that the requested visual or behavioral change is present in the deployed product.

## Completion gate

An edit is complete only when:

- the canonical implementation was identified;
- the requested source was edited directly;
- no competing implementation was introduced;
- obsolete conflicting code was removed when appropriate;
- the diff was inspected;
- dependent references were checked;
- the applicable build/test passed;
- the affected rendered behavior was verified when tooling permits;
- documentation was synchronized when the rule or architecture changed.

If any verification step is unavailable, state that internally and do not claim that the corresponding layer was verified.

## Persistent engineering principle

**Do not rebuild the wheel when the request is to adjust the wheel.**

This standard applies to every VoxVector surface, not merely logos or headers.