# VoxVector Development, Editing, and Deployment Workflow

**Status:** Canonical active workflow
**Effective:** 2026-08-26
**Scope:** VoxVector frontend, backend, documentation, GitHub workflow, and AI assisted development

## 1. Authority

The GitHub repository is the technical source of truth. The VoxVector Operating Charter remains the highest project authority. This document is the canonical operating procedure for day to day code editing, architectural migration, pull requests, previews, and production deployment.

The Crown Labs Bible is an executive and product mirror. It must not override repository implementation or architecture decisions.

## 2. Surgical editing is mandatory

Existing pages and components are assets to preserve, not templates to replace.

When a request is to edit an existing page, component, stylesheet, route, or feature:

1. Read the current implementation before changing it.
2. Identify the exact file and smallest region that satisfies the request.
3. Trace imports, consumers, dependencies, runtime behavior, and relevant git history.
4. Make the smallest defensible change.
5. Preserve unrelated markup, components, imports, logic, routes, state, accessibility behavior, responsive behavior, animations, styling, and existing functionality.
6. Read back the changed file and inspect the diff before considering the edit complete.
7. Search for duplicate implementations, overrides, runtime mutations, and references created or exposed by the change.

### Explicit prohibition

AI agents must **not completely recreate, regenerate, or overwrite an existing page file** merely because a page needs editing.

A page may be substantially rewritten only when the user explicitly requests a rewrite, replacement, architectural migration, or other change that requires it.

If the requested change can be made surgically, it must be made surgically.

Do not replace an existing page with a new simplified version from memory, a screenshot, a prompt, or an earlier design. This has previously caused working features and UI behavior to disappear.

## 3. Architecture migration means behavior migration, not deletion

Architectural cleanup is **not** a deletion exercise. A file or component may have an undesirable name, ownership model, patch-oriented architecture, override mechanism, or runtime workaround while still containing the newest or most valuable implementation of a required behavior.

The correct migration sequence is:

```text
candidate legacy / patch / refinement / override
        ↓
inspect complete contents
        ↓
trace imports, consumers, dependencies, and runtime effects
        ↓
inspect git history and identify when behavior was introduced or last changed
        ↓
compare behavior against the current canonical implementation
        ↓
classify each behavior individually
        ↓
identify the correct canonical owner
        ↓
migrate missing or newer behavior into that canonical owner
        ↓
read back and verify the canonical implementation
        ↓
verify visual / functional / responsive behavior
        ↓
search for remaining competing ownership
        ↓
remove the obsolete layer only after its behavior is accounted for
```

### The critical rule

**Never delete a patch merely because it looks like a patch.**

A patch can be architecturally obsolete while the behavior it introduced remains authoritative. For example, a later CSS refinement may contain the newest responsive logo sizing, spacing, breakpoint, or alignment behavior. That behavior must be migrated into the canonical header or design system before the refinement stylesheet is removed.

The question is never simply:

> “Does this file fit the architecture?”

The questions are:

- What does this file actually do?
- What behavior does each relevant rule or function produce?
- When was that behavior introduced or last changed?
- Is it newer than the current canonical behavior?
- Is the behavior already present in the canonical owner?
- If not, where does it belong architecturally?
- What functionality would disappear if this layer were deleted?
- What imports, consumers, selectors, assets, or runtime effects depend on it?
- Has the behavior been migrated and verified?

Only after those questions are answered may an obsolete layer be removed.

### Behavior preservation has priority over file preservation

The goal is not to preserve every patch forever. The goal is to preserve the **correct behavior** while consolidating ownership.

If a patch contains ten rules and only four represent current desired behavior, migrate those four to the canonical owner and retire the remaining six only after confirming they are obsolete.

If a patch contains a workaround for a defect in the canonical implementation, fix the canonical implementation instead of copying the workaround into another layer.

If a patch contains behavior that is genuinely page-specific, keep that behavior in the page rather than forcing it into a global abstraction.

If several patches contain overlapping behavior, reconcile them against current implementation and history before deciding which behavior is authoritative.

## 4. Git history is architectural evidence

Git history must be used when determining whether a patch contains newer behavior than the canonical implementation.

For every significant migration candidate:

1. identify the introducing commit when practical;
2. identify subsequent commits that modified the behavior;
3. compare the chronology with the canonical implementation;
4. inspect commit messages and changed files for stated intent;
5. treat newer behavior as a migration candidate, not automatically as disposable code;
6. preserve historical information needed to understand why the behavior exists.

A newer patch is **not automatically correct**, but it is evidence that must be investigated. A filename such as `fix`, `refinement`, `override`, `recovery`, or `final` is not evidence that its contents are obsolete.

Git history must inform the migration. It must never substitute for inspecting the actual current file contents.

## 5. Canonical ownership model

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

## 6. No duplicate pages or competing implementations

Do not create another version of an existing page to avoid editing the canonical page.

Before creating a page, route, component, or HTML entry point:

- search for the existing page or route;
- determine its canonical implementation;
- edit that implementation when it already exists;
- confirm the new page represents genuinely new product functionality.

Do not create files such as `landing-new`, `landing-v2`, `dashboard-new`, `dashboard-final`, `index2`, `override`, `patch`, `recovery`, or replacement HTML copies as workarounds for editing an existing surface.

Compatibility redirects are allowed when intentionally documented as redirects and when they contain no competing implementation.

## 7. Preserve existing product surfaces

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

## 8. Canonical frontend asset boundary

The backend and analysis-engine workspace is `VoxVector/`. The public React application is `voxvector/`.

Canonical VoxVector design assets live under `VoxVector/Assets/`. The frontend build may stage required assets into `voxvector/public/` as a build-time operation so Vite emits them into `voxvector/dist/`. Those staged files are build inputs, not a second canonical source directory.

Do not create or maintain competing permanent source copies merely to satisfy a component.

## 9. Change classification

Before editing, classify the request:

- **Content edit:** change copy only.
- **Visual edit:** change styling, spacing, color, imagery, or animation while preserving behavior.
- **Behavior edit:** change an existing interaction or data flow.
- **Feature addition:** add genuinely new functionality to an existing surface.
- **New page:** add a genuinely new route or product surface.
- **Architecture change:** intentionally restructure implementation or consolidate ownership.

Architectural cleanup must be treated as an architecture change **plus behavior preservation/migration**. The objective is not to minimize line count; it is to establish correct ownership without losing current functionality.

## 10. Development flow

For normal feature development, the repository's documented review flow remains:

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

For authorized maintenance sessions that explicitly require direct work on `main`, use `main` exactly as instructed by the project owner and still perform the same inspection, diff, build, and verification gates. Do not create an alternate branch merely to avoid editing the canonical implementation.

## 11. Verification discipline

A green GitHub Actions run means the workflow completed successfully. It does not automatically prove that the live browser experience is correct.

For substantive changes:

- inspect the complete changed implementation;
- inspect the diff;
- search for competing implementations and selectors;
- inspect build output;
- verify the requested behavior;
- verify that migrated behavior survived;
- verify unrelated functionality remains present;
- verify desktop and mobile behavior;
- verify accessibility and reduced-motion behavior where relevant;
- verify the live deployment after merge when tooling permits.

For migrations, explicitly verify both sides of the migration:

1. the canonical owner now contains the required behavior;
2. the obsolete owner can be removed without removing required behavior.

Never claim testing, browser verification, scientific validation, or deployment success unless it actually occurred.

## 12. Runtime and CSS cleanup

Runtime DOM manipulation, injected HTML, competing CSS, and workaround layers are migration candidates, not automatic deletion targets.

For each candidate:

- inspect the complete implementation;
- determine what it changes at runtime;
- identify which current UI behavior depends on it;
- identify the canonical React/CSS owner for that behavior;
- migrate the behavior into the canonical owner;
- remove runtime mutation when declarative React or canonical CSS can own the same behavior;
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

## 13. Landing refinement integrity

Landing refinements must be reconciled into canonical React/CSS ownership whenever their behavior is still required. Runtime refinement is not a preferred permanent architecture.

If a refinement introduced a useful visual or responsive behavior, migrate that behavior into the canonical landing component or design system before retiring the refinement.

The landing page must retain its existing copy and information hierarchy unless a copy change is explicitly requested. Do not introduce a second hero text block.

Landing charts, signal graphics, and analytical readouts remain interface illustrations unless explicitly connected to real telemetry through a documented implementation.

## 14. Developer Console preservation

The Developer Console is a protected canonical product surface.

Architectural migration must not rewrite it merely to make shared chrome easier to change.

Preserve, unless explicitly changed:

- waveform
- spectrogram
- gain level/control
- audio controls
- playback
- audio analysis
- Analysis Workspace
- Recharts 3 implementation
- API handling
- authentication
- user/session behavior
- case state
- developer tools
- diagnostics
- existing analysis state

Shared chrome may migrate to `SiteHeader.jsx`, but console-specific controls remain console-specific. Use explicit composition rather than moving the entire console into the shared shell.

## 15. Recharts architecture

The frontend uses native Recharts 3 for the current chart implementation.

Do not reintroduce Tremor as a competing chart implementation. Do not create duplicate chart systems when the existing Recharts implementation can be edited directly.

## 16. Scientific integrity

Architecture work must not change the scientific status of VoxVector by implication.

Never represent an individual vocal, acoustic, linguistic, behavioral, emotional, psychological, pitch, stress, hesitation, silence, arousal, cognitive-load, speaking-rate, pause, prosodic, or other feature as proof of deception.

Maintain separation between:

1. eligibility and reliability;
2. evidence collection and analysis;
3. candidate classification;
4. final classification or disposition.

Never invent validation, datasets, model results, measurements, integrations, or capabilities during an architectural migration.

## 17. Documentation synchronization

When implementation architecture or editing discipline changes, synchronize affected canonical documentation rather than leaving contradictory instructions active.

At minimum, architectural migration changes should be reviewed against:

- `VoxVector/docs/OPERATING_CHARTER.md`
- `VoxVector/docs/PROJECT_DECISION_LOG.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/AI_EDITING_GUARDRAILS.md`
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- relevant architecture, UI, deployment, and capability documentation
- corresponding `docs/crownlabsbible/` mirrors where applicable

Historical records may be retained, but obsolete instructions must be explicitly marked superseded rather than left looking active.

## 18. Final preservation rule

When uncertain, stop before broadening the change.

Inspect the current implementation and its history. Understand what it actually does. Determine which behavior is current and valuable. Identify the correct canonical owner. Migrate the behavior into that owner. Verify it. Then retire only the obsolete ownership layer.

**Do not rebuild the wheel when the request is to adjust the wheel. Do not throw away the wheel's newest improvements merely because they were bolted on in the wrong place. Move the improvements into the wheel.**


## 19. AUTO system-tracing workflow

For every substantive change or production failure, use the canonical **Architecture → Ownership → Trace → Operate/verify** workflow defined in `docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`.

1. Establish the actual architecture and service boundary.
2. Identify the canonical owner of the behavior.
3. Trace the complete source/deployment/runtime/data chain rather than inferring the failure from one symptom.
4. Edit the canonical owner.
5. Verify each claimed boundary separately: source, build, deployment, runtime, persistence/provider, and browser behavior.
6. Synchronize material architecture changes with the Crown Labs dossier.

AUTO does not mean automatic assumptions. It means a repeatable evidence-first operating procedure.


## Observability repair rule

When logs, errors, or operational state are missing, trace runtime event → diagnostic emitter → durable archive → relational projection/query → API endpoint → frontend query → rendered state. Inspect connected provider state before rewriting the UI.
