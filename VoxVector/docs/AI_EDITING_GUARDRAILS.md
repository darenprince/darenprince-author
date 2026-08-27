# VoxVector AI Editing Guardrails

## Purpose

This document defines the editing discipline for AI agents modifying VoxVector. It exists to prevent visual regressions, accidental loss of functionality, incomplete migrations, formatting churn, silent overwrites, destructive cleanup, and inconsistent product communication during iterative development.

VoxVector is the end product being built. AI work should advance the complete product architecture rather than optimize for superficial completion of isolated screens or file-count reduction.

## Canonical workflow

The active branch, PR, preview, and deployment rules are defined in `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`. This document governs the editing behavior inside that workflow.

## Surgical editing is the default

When changing an existing file:

1. Read the current file before editing it.
2. Identify the smallest exact region that satisfies the request.
3. Trace imports, consumers, dependencies, runtime effects, and relevant git history.
4. Preserve all unrelated code, markup, classes, imports, comments, ordering, formatting, responsive rules, accessibility behavior, and existing visual treatments.
5. Prefer additive or narrowly targeted edits over reconstruction.
6. Never replace a large file from memory or from an earlier snapshot when only a small change is required.
7. Never remove existing functionality merely because it is not directly relevant to the current request.
8. Do not normalize, reformat, minify, reorder, or restyle unrelated code as part of a feature change.
9. When a requested change affects architecture, update every dependent surface that must remain synchronized rather than patching only the most visible file.

## Architecture migration is behavior-preserving consolidation

Architectural cleanup must not be interpreted as permission to delete files that do not fit the preferred architecture.

A legacy patch, refinement, override, recovery component, compatibility layer, or workaround may contain newer behavior than the current canonical implementation. Its name or location is not evidence that its behavior is obsolete.

Before retiring an architectural layer:

1. Read its complete contents.
2. Identify every behavior it introduces or modifies.
3. Trace its imports, consumers, selectors, assets, runtime effects, and dependencies.
4. Inspect git history to determine when each significant behavior was introduced or last changed.
5. Compare those behaviors with the current canonical implementation.
6. Identify which behaviors are already present, which are missing, which conflict, and which are obsolete.
7. Determine the correct canonical owner for every behavior that remains required.
8. Migrate missing or newer required behavior into the canonical owner.
9. Read back the canonical implementation and verify that the behavior is actually present there.
10. Verify visual, functional, responsive, accessibility, and runtime behavior as applicable.
11. Search again for competing ownership and stale references.
12. Only then remove the obsolete layer.

### Non-negotiable rule

**Never delete a patch merely because it looks like a patch.**

The objective is not to make the repository smaller. The objective is to make ownership correct while preserving the useful behavior that the repository has accumulated.

For example, if a later logo-sizing stylesheet contains the newest responsive sizing and spacing behavior, that behavior must be incorporated into the canonical header/design system before the stylesheet is retired. The fact that the behavior was delivered as a patch does not make the behavior disposable.

A patch can therefore be:

- architecturally wrong but behaviorally valuable;
- partially obsolete and partially authoritative;
- a workaround that should be replaced by a canonical fix;
- genuinely dead code.

Those cases must be distinguished by contents, dependency tracing, and history rather than filenames.

## Git history is evidence, not an automatic verdict

Use git history to establish chronology and intent.

For significant migration candidates:

- identify the introducing commit when practical;
- identify subsequent commits that modify the behavior;
- compare chronology against the canonical implementation;
- inspect commit messages for stated intent;
- treat newer behavior as evidence requiring migration analysis;
- do not assume newer means correct;
- do not assume older means obsolete;
- preserve historical decisions needed for traceability.

The actual file contents remain essential. History tells us when and why behavior changed; it does not replace reading what the code does today.

## Canonical ownership

Shared behavior must have one appropriate canonical owner.

```text
ONE canonical implementation
          ↓
    multiple consumers
```

not:

```text
Page A implementation
+ Page B implementation
+ patch for Page A
+ override for Page B
+ runtime DOM fix
+ competing CSS
```

Shared site chrome should be owned by shared canonical components where appropriate, including:

- header
- navigation
- logo / brand lockup
- user/account menu
- mobile navigation primitives
- global buttons and UI primitives
- footer
- common shell behavior

Page-specific behavior remains in the page. Do not over-abstract genuinely page-specific controls merely to reduce file count.

Current canonical public header: `voxvector/src/components/SiteHeader.jsx`.

When migrating another consumer to the canonical header, preserve that consumer's legitimate contextual actions through explicit props/composition rather than recreating the header or forcing console-specific functionality into the shared component.

## Existing page preservation is mandatory

When the user asks to edit an existing page, component, route, or feature, the existing implementation is canonical unless the user explicitly authorizes replacement.

AI agents must **not completely recreate, regenerate, or overwrite an existing page file** for a normal edit request.

Do not:

- rewrite an entire page from a screenshot;
- generate a replacement page from memory;
- simplify an existing page by removing controls that were not mentioned;
- replace a working dashboard with a new dashboard because the requested visual change is easier to implement that way;
- copy an old page into a new filename and modify the copy;
- create `v2`, `new`, `final`, `backup`, or similar competing page implementations.

A full rewrite is allowed only when the user explicitly requests a rewrite, replacement, migration, or architectural restructuring.

## No duplicate pages

Before creating a new page or route:

1. Search for an existing implementation serving the same purpose.
2. Identify its canonical route and source file.
3. Edit that implementation when it already exists.
4. Create a new page only when the requested feature is genuinely a new product surface.
5. Confirm that no competing route or duplicate page was introduced.

Compatibility redirects may exist when intentionally documented, but they must not contain a second implementation.

## Thoroughness standard

For substantive requests do not stop at the first matching file.

Trace the requested concept across:

- runtime implementation
- frontend components
- API contracts
- analysis engine
- method registries
- pipeline definitions
- capability status
- roadmap
- QA and validation records
- version documentation
- product documentation
- Crown Labs Bible mirrors
- deployment configuration
- customer-facing pages
- AI project instructions when the request establishes a persistent operating rule

Update all affected canonical surfaces. Do not create contradictory duplicate definitions.

When a request says `everywhere`, `all`, `update the docs`, or equivalent, treat it as a repository-wide synchronization task. Search for related terminology and inspect the relevant results before declaring completion.

## Before writing

Confirm:

- the current branch and source revision;
- the canonical project path;
- the current implementation of the feature being changed;
- related CSS and component dependencies;
- responsive behavior;
- reduced-motion and accessibility behavior;
- whether another recent change already touched the same area;
- the canonical documentation governing the change;
- dependent documentation and mirrors;
- the deployment surface affected by the change.

If a file is difficult to retrieve completely, do not reconstruct it from partial output. Retrieve the necessary ranges or use an appropriate repository editing workflow before writing.

## Frontend preservation rules

For landing-page and console work:

- preserve the existing component structure unless restructuring is explicitly requested;
- preserve the approved VoxVector palette and existing design tokens;
- preserve existing typography scale and spacing unless the request changes them;
- preserve mobile behavior while changing desktop behavior and vice versa;
- preserve existing animation timing unless the requested change specifically targets animation;
- avoid broad selectors that can unintentionally affect unrelated components;
- scope new CSS to the smallest stable component or feature selector;
- avoid duplicate competing implementations of the same interaction;
- do not introduce a second menu, header, waveform, or navigation system when one already exists;
- make interactive analysis views genuinely functional rather than static mockups.

Reference screenshots are visual guidance only. They do not authorize removal of existing application behavior that is not shown in the reference.

## Runtime and CSS cleanup

Runtime DOM manipulation, injected HTML, competing CSS, and workaround layers are migration candidates, not automatic deletion targets.

For each candidate:

- inspect the complete implementation;
- determine what it changes at runtime;
- identify which current UI behavior depends on it;
- identify the canonical React/CSS owner for that behavior;
- migrate the behavior into the canonical owner;
- replace runtime mutation with declarative React or canonical CSS when equivalent behavior is confirmed;
- verify the resulting UI;
- only then delete the old mechanism.

Search specifically for:

- `document.querySelector`
- `document.querySelectorAll`
- `MutationObserver`
- dynamically inserted nodes
- `innerHTML`
- injected styles
- `!important` override chains
- duplicated selectors
- component imports used solely to mutate another component
- CSS files with no surviving consumer

A stale-looking stylesheet may contain newer design behavior. Its contents must be reconciled with the canonical implementation before deletion.

## Readback and integrity check

After every substantive edit:

1. Re-read the modified file.
2. Confirm the requested behavior is present.
3. Confirm unrelated sections remain present.
4. Check imports, selectors, component names, and referenced assets.
5. Search for dependent references to the changed concept.
6. Inspect the resulting diff when the tooling permits.
7. Check for accidental deletions, duplicate rules, duplicate components, or formatting loss.
8. Run the applicable build, test, or browser verification when available.
9. Verify documentation synchronization.
10. Report what was actually verified.

For migrations, explicitly verify both sides:

1. the canonical owner now contains every required behavior migrated from the old layer;
2. removing the old owner does not remove any required behavior.

## Documentation preservation

Runtime changes must not silently erase project context. Preserve planned capabilities, historical decisions, and canonical terminology.

When a change establishes a new development convention, update the appropriate canonical project documentation rather than relying on conversation memory.

When product language changes, update the product messaging policy and relevant product mirrors.

When a pipeline changes, synchronize the pipeline specification, frontend pipeline view, method index, capability records, and relevant product documentation.

## Completion standard

A task is not complete merely because an edited file was successfully written.

Completion requires:

- implementation review;
- dependency review;
- behavior migration review where applicable;
- git-history review where applicable;
- documentation synchronization;
- readback and integrity check;
- applicable build or test verification;
- confirmation that no duplicate or contradictory implementation was introduced;
- confirmation that an existing page was not unintentionally recreated or overwritten;
- confirmation that useful behavior from any retired layer was migrated or explicitly determined obsolete.

If verification is unavailable, record that internally. Do not claim it occurred.

When uncertain, make the smallest defensible change, inspect the complete implementation and history, and stop before broadening the change.
