# VoxVector Canonical Migration Plan

## Governing objective

Consolidate VoxVector around correct canonical ownership **without losing behavior** accumulated in later patches, refinements, overrides, recovery layers, or workarounds.

Architectural cleanup is not a file deletion exercise.

## Rules

1. Edit canonical implementations directly. Do not create parallel replacements because a file is large or difficult to edit.
2. Inspect the complete contents of every migration candidate before changing or deleting it.
3. Trace imports, consumers, dependencies, runtime effects, selectors, and assets.
4. Inspect relevant git history to determine when behavior was introduced or last changed.
5. Treat newer behavior as migration evidence, not deletion evidence.
6. Compare every behavior against the current canonical implementation.
7. Migrate unique, newer, or otherwise required functionality into its correct canonical owner before deleting the old layer.
8. If a patch contains both useful and obsolete behavior, migrate the useful behavior and retire only what is actually obsolete.
9. If a workaround compensates for a canonical defect, fix the canonical defect rather than copying the workaround.
10. Never add a patch, override, refinement, recovery, V2, duplicate, or runtime DOM workaround to avoid a canonical edit.
11. Shared header, navigation, user menu, footer, buttons, and UI primitives must have one appropriate canonical owner.
12. Page-specific behavior must remain page-specific unless there is an objectively shared responsibility.
13. Build and browser verify substantive migrations before deleting the old layer when those verification tools are available.
14. Read modified files back and inspect the resulting diff.
15. Never claim verification that did not occur.

## Migration decision test

For each candidate layer, answer all of these before deletion:

1. **What does it actually do?**
2. **Which rules/functions/behaviors did it introduce?**
3. **Which behaviors are still present in the canonical implementation?**
4. **Which behaviors are missing from the canonical implementation?**
5. **Which behavior is newer according to git history?**
6. **Which behavior conflicts with another implementation?**
7. **Which behavior is genuinely obsolete?**
8. **Who should own each surviving behavior?**
9. **What must be migrated?**
10. **What consumers or dependencies change?**
11. **How will the migrated behavior be verified?**
12. **What, exactly, is safe to retire afterward?**

A filename such as `fix`, `refinement`, `override`, `recovery`, `final`, or `MVP` is not sufficient evidence for any disposition.

## Target architecture

```text
App
├── SiteShell
│   ├── Header
│   │   ├── Navigation
│   │   ├── UserMenu
│   │   └── MobileMenu
│   ├── PageContent
│   └── Footer
└── DeveloperConsole
    └── CaseAnalysisWorkspace
        ├── AudioPlayer
        ├── Waveform
        ├── Spectrogram
        ├── Gain / Playback
        ├── Timeline
        └── Pipeline / Evidence
```

The target architecture describes ownership. It does not authorize rebuilding existing surfaces. Existing functionality must be migrated into the target owner.

## Current canonical shared chrome

`voxvector/src/components/SiteHeader.jsx` is the canonical public header implementation.

The landing application consumes it directly from `voxvector/src/App.jsx`.

The Developer Console also consumes it directly for shared header chrome while retaining console-specific sidebar, mobile console navigation, theme controls, methodology access, sign-out, and other console-specific behavior in the console.

The shared header must not absorb console-specific functionality merely to make the console look simpler.

## Developer Console consolidation completed

The repository previously had:

```text
DeveloperConsole.jsx
      ↓
DeveloperConsoleMVP.jsx
      ↓
actual console implementation
```

The wrapper did not provide a separate architectural responsibility. The actual console implementation has now been migrated into `DeveloperConsole.jsx`, which is the canonical owner consumed by `App.jsx`.

The migration preserved the existing implementation rather than rebuilding the console. The former `DeveloperConsoleMVP.jsx` was retired only after its complete implementation was moved.

Protected console functionality includes:

- case creation
- source upload
- secure playback
- analysis execution
- pipeline state
- Analysis Workspace integration
- waveform
- spectrogram
- gain/playback controls
- API handling
- authentication/session behavior
- diagnostics
- theme control
- mobile navigation
- developer sidebar
- existing console tools and state

## Behavior migration example: logo/header sizing

Recent header/logo refinement history demonstrated why patch names cannot determine disposition.

Later commits introduced responsive logo sizing and header spacing behavior. That behavior was reconciled into the canonical header/brand styling before the legacy spacing layer was retired.

The intended sequence is:

```text
legacy/refinement behavior
        ↓
read complete contents
        ↓
inspect history
        ↓
compare against canonical implementation
        ↓
migrate required behavior
        ↓
verify canonical result
        ↓
retire old owner
```

## Current migration targets

These remain investigation candidates, not automatic deletion candidates:

- remaining landing refinement components
- landing/hero CSS refinements
- landing recovery styles
- header/logo visibility and sizing styles
- shared navigation and footer variants
- duplicate UI primitives
- runtime DOM manipulation
- injected HTML or dynamically inserted UI
- CSS override chains
- duplicate analytical visualizations
- duplicate audio-analysis components
- stale compatibility layers

## Landing migration requirements

Landing refinements must be reconciled into `App.jsx` or appropriate canonical shared components/styles when their behavior remains required.

Do not rewrite landing copy as part of architectural cleanup.

Do not introduce a second hero text block.

Preserve the existing visual hierarchy, responsive behavior, animation behavior, analytical illustrations, and calls to action unless the user explicitly requests changes.

## Developer Console migration requirements

Do not rebuild `DeveloperConsole.jsx` or `CaseAnalysisWorkspace.jsx` to accomplish shared chrome cleanup.

When shared chrome is migrated:

- use `SiteHeader.jsx` as the shared header owner;
- preserve console-specific actions through explicit composition;
- preserve the existing sidebar and console navigation unless separately requested;
- preserve authentication/session behavior;
- preserve audio controls and analysis views;
- preserve Recharts 3 implementation;
- preserve API behavior and query state;
- preserve responsive/mobile behavior.

## Runtime DOM cleanup

Runtime DOM mutation is a migration candidate when equivalent declarative ownership can be established.

Search for:

- `document.querySelector`
- `document.querySelectorAll`
- `MutationObserver`
- `innerHTML`
- dynamically inserted React/DOM nodes
- injected styles
- components mounted only to modify another component

Do not delete such code until the behaviors it provides have been traced and migrated or explicitly proven obsolete.

## CSS cleanup

CSS files and selectors are evaluated by behavior, not filename.

For each stylesheet:

- identify every active consumer;
- identify selectors that override canonical styles;
- inspect specificity and breakpoint behavior;
- inspect git history for later refinements;
- migrate useful behavior into the canonical stylesheet/component;
- remove only genuinely obsolete rules and files;
- verify responsive behavior afterward.

## Deletion gate

A patch, refinement, override, recovery component, or duplicate implementation may be deleted only when:

1. its complete contents were inspected;
2. relevant git history was inspected;
3. all consumers/dependencies were traced;
4. each significant behavior was classified;
5. required behavior was migrated into the canonical owner;
6. the canonical implementation was read back;
7. competing ownership was searched for;
8. the applicable build succeeds;
9. affected browser flows are verified when tooling permits;
10. no required functionality disappears;
11. documentation reflects the actual migration.

## Documentation rule

Every completed migration must update `MIGRATION_STATUS.md` with:

- what moved;
- old owner;
- canonical owner;
- behavior preserved;
- verification status;
- remaining risks or candidates.

Historical checkpoint documents remain historical records. They must not be rewritten to falsely represent their original state.

## Final principle

**Consolidate ownership, not behavior.**

The correct end state is not the fewest files. It is one appropriate canonical implementation for each shared responsibility, with all valuable behavior from previous iterations migrated into that implementation and no accidental loss of product functionality.
