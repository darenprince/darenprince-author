# Canonical Migration Status

## Current working branch

`main` is the canonical working branch for the current authorized migration session.

## Migration rule

Architectural cleanup is behavior-preserving consolidation. A patch, refinement, override, recovery layer, or compatibility layer is never deleted because of its filename or architecture alone.

Before retirement, its complete contents, consumers, dependencies, runtime effects, and relevant git history must be inspected. Required behavior, especially newer behavior, must be migrated into the appropriate canonical owner and verified before the old owner is removed.

## Canonicalization completed so far

- Landing refinement stack is no longer mounted from `src/main.jsx`.
- Canonical landing remains `src/App.jsx`.
- Public landing header is consumed from `src/components/SiteHeader.jsx`.
- Developer Console now consumes the same canonical `SiteHeader` for shared public chrome.
- The former `DeveloperConsoleMVP.jsx` implementation has been migrated intact into the canonical `DeveloperConsole.jsx` owner; the duplicate wrapper/implementation boundary has been removed.
- Developer Console remains a protected product surface. Case creation, source upload, secure playback, analysis execution, pipeline state, Analysis Workspace, diagnostics, authentication, theme controls, mobile navigation, and existing console behavior must survive migration.
- Recharts 3 migration and lockfile regeneration remain in place.

## Behavior migration example: header/logo sizing

Recent header/logo refinements were treated as behavior to migrate rather than delete.

The relevant history established newer responsive sizing and spacing behavior. That behavior was incorporated into the canonical header/brand styling before the legacy spacing layer was retired.

The governing rule is therefore:

```text
newer patch behavior
      ↓
inspect rule/function contents
      ↓
compare with canonical implementation
      ↓
migrate required behavior
      ↓
verify canonical behavior
      ↓
retire obsolete layer
```

## Protected functionality

Historical analysis functionality including waveform, spectrogram, gain, playback, timeline, pipeline and evidence controls must remain intact. Historical commit `c1e64b5de4cf71ee8ef1ea03699aacd84a7497dc` remains a recovery reference for these controls.

The canonical Developer Console and `CaseAnalysisWorkspace` must be inspected before any change that could affect these surfaces. Do not rebuild either surface to accomplish shared chrome cleanup.

## Current migration candidates

The following candidates require content-level reconciliation before retirement. Their names do not determine disposition:

- landing refinement components that still exist
- landing/hero CSS refinements and recovery styles
- header/logo visibility and sizing styles
- duplicate or wrapper components around the Developer Console
- competing navigation, user-menu, footer, and button implementations
- runtime DOM mutation and injected UI
- CSS selectors that override canonical components

For every candidate, record:

1. file
2. component/function/rule
3. behavior introduced or modified
4. canonical owner
5. unique behavior missing from canonical owner
6. migration required
7. dependencies/usages
8. relevant git-history evidence
9. risk
10. verification status
11. deletion disposition

## Completed Developer Console consolidation

The former `DeveloperConsoleMVP.jsx` contained the actual full console implementation while `DeveloperConsole.jsx` was only a wrapper. The implementation included API handling, TanStack Query state, case creation, audio upload, secure playback, analysis execution, pipeline state, Analysis Workspace integration, diagnostics, profile, theme controls, mobile navigation, sidebar, and existing console views.

That complete implementation has now been moved into `DeveloperConsole.jsx` and its exported component is canonical `DeveloperConsole`. `App.jsx` already consumed `DeveloperConsole`, so the route/import boundary did not need to change.

`DeveloperConsoleMVP.jsx` was removed only after its complete contents were migrated. No console functionality was intentionally redesigned or rewritten as part of this consolidation.

## Next work

1. Perform content-level archaeology on the remaining landing/header/CSS candidates.
2. Compare each candidate's behavior against the canonical implementation and relevant git history.
3. Migrate required behavior directly into the canonical owner.
4. Remove runtime DOM mutation where equivalent declarative React/CSS ownership is confirmed.
5. Consolidate remaining shared chrome without moving console-specific behavior into the shared header.
6. Build and browser-verify each substantive migration before retiring its old layer.
7. Synchronize affected documentation after verified implementation changes.

## Non-negotiable rule

**Never create a new patch to avoid editing the canonical implementation. Never delete an existing patch until its contents and history have been inspected and every required behavior has been migrated into the correct canonical owner or explicitly proven obsolete.**
