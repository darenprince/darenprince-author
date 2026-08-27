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

## Behavior migration: landing refinements

Historical landing refinements were inspected by contents and git history rather than filename.

Migrated into the canonical `voxvector/public/landing.css` layer:

- later hero background scale and responsive positioning;
- later hero heading lift and responsive spacing;
- hero prefix and secondary-line hierarchy adjustments;
- hero waveform positioning/visibility behavior expressed declaratively;
- hero description sizing;
- hero technology-link positioning/scale;
- hero action pill treatment;
- recovered workflow visual treatment;
- evidence-bar visual motion.

The historical `hero-layout-adjustments.css` and `hero-final-adjustments.css` layers were retired only after their relevant rules were migrated into the canonical landing layer.

Runtime DOM mutation from the historical hero refinement was not copied back. Its visual intent is represented declaratively where the current application structure supports it.

## Canonical asset recovery

The canonical image source tree is `VoxVector/Assets/`.

The repository currently contains:

- `VoxVector/Assets/voxvector-audio-analysis-console.png`
- `VoxVector/Assets/VoxVector-logo-word.png`
- `VoxVector/Assets/voxvector-icon-final-color.png.PNG`

The production Pages workflow stages these assets into the React public directory before the Vite build. Asset migration must therefore trace source → staging → build → Pages artifact rather than assuming an asset is absent because it is not under `voxvector/public/` in the source tree.

The canonical landing workflow visual now references the staged console asset at `/voxvector/voxvector-audio-analysis-console.png`.

## Behavior migration: developer dashboard refinement

Historical commit `3d6938fd3976ca2ff014a886133c12a0738738d8` removed `developer-dashboard-refinement.css` after describing it as unnecessary. Its complete 41-line contents were inspected before migration.

The refinement contained a later console geometry system, including a 5px radius, tighter metric/content-grid gaps, panel/header rhythm, sidebar treatment, active-navigation treatment, and restrained button/control geometry.

Those behaviors were migrated into the existing canonical console visual owner `voxvector/src/console-polish.css`. The old refinement file is not being recreated.

## Protected functionality

Historical analysis functionality including waveform, spectrogram, gain, playback, timeline, pipeline and evidence controls must remain intact. Historical commit `c1e64b5de4cf71ee8ef1ea03699aacd84a7497dc` remains a recovery reference for these controls.

The canonical Developer Console and `CaseAnalysisWorkspace` must be inspected before any change that could affect these surfaces. Do not rebuild either surface to accomplish shared chrome cleanup.

## Historical layers deliberately not blindly migrated

Some retired refinement behavior changed product copy through runtime DOM mutation. Those copy substitutions are not automatically canonical behavior.

In particular, `WorkflowCopyRefinement.jsx` replaced workflow messaging at runtime. Because the current canonical application contains deliberate scientific and product language, the historical replacement copy must not be reintroduced merely because it was newer. Any copy migration requires a separate product-copy decision.

Likewise, historical global selectors or runtime mutations that conflict with current component ownership must be evaluated for their intended visual result before migration. The desired result may be retained while the implementation mechanism is replaced.

## Current migration candidates

The following candidates require content-level reconciliation before retirement. Their names do not determine disposition:

- remaining landing refinement components that still exist
- remaining landing/hero CSS refinements and recovery styles
- header/logo visibility and sizing styles
- competing navigation, user-menu, footer, and button implementations
- runtime DOM mutation and injected UI
- CSS selectors that override canonical components
- historical asset references and staging assumptions

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

1. Continue content-level archaeology on the remaining landing/header/CSS candidates.
2. Compare each candidate's behavior against the canonical implementation and relevant git history.
3. Migrate required behavior directly into the canonical owner.
4. Remove runtime DOM mutation where equivalent declarative React/CSS ownership is confirmed.
5. Consolidate remaining shared chrome without moving console-specific behavior into the shared header.
6. Build and browser-verify each substantive migration before retiring its old layer.
7. Synchronize affected documentation after verified implementation changes.

## Non-negotiable rule

**Never create a new patch to avoid editing the canonical implementation. Never delete an existing patch until its contents and history have been inspected and every required behavior has been migrated into the correct canonical owner or explicitly proven obsolete.**
