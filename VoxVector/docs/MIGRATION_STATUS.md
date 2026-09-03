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
- Shared console/audio/UI stylesheet behavior has been consolidated into canonical `src/index.css`; the separate stylesheet entrypoints were retired only after content migration.
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
- hero waveform positioning, layering, visibility, and entrance behavior expressed declaratively;
- hero description sizing and spacing;
- hero technology-link positioning and scale;
- hero action pill treatment;
- recovered workflow visual treatment using the supplied `VoxVector/Assets/voxvector-audio-analysis-console.png` asset;
- evidence-bar visual motion;
- applicable non-conflicting behavior from the historical final landing polish layer.

The historical `hero-layout-adjustments.css`, `hero-final-adjustments.css`, `hero-refinement.css`, `hero-refinement-overrides.css`, and `landing-final-polish.css` layers were retired only after their relevant behavior was reconciled against the canonical landing implementation.

Runtime DOM mutation from the historical hero refinement was not copied back. Where the current component structure supports the intended result, the behavior is expressed declaratively in the canonical owner.

## Restored canonical hero and workflow copy

The current canonical landing implementation now contains the approved historical hero direction directly in `voxvector/src/App.jsx` rather than applying it through a runtime copy patch:

- `Reveal the` + `TRUTH` + `IN YOUR AUDIO` hero stack;
- the advanced vocal intelligence supporting paragraph;
- the existing working `Analyze a Recording` and `See How It Works` actions;
- the `Explore the Technology` navigation link;
- `Deep Forensic Vocal Analysis + State of the art Linguistics` workflow heading;
- the long-form workflow description from the August 21 approved landing copy checkpoint;
- `Deep Analysis Methods` workflow link.

The earlier runtime `CanonicalHeroCopy.jsx` mechanism is not restored. The content is now owned by the canonical React implementation.

## Canonical asset recovery

The canonical image source tree is `VoxVector/Assets/`.

The repository currently contains:

- `VoxVector/Assets/voxvector-audio-analysis-console.png`
- `VoxVector/Assets/VoxVector-logo-word.png`
- `VoxVector/Assets/voxvector-icon-final-color.png.PNG`

The production Pages workflow stages these assets into the React public directory before the Vite build. Asset migration must therefore trace source → staging → build → Pages artifact rather than assuming an asset is absent because it is not under `voxvector/public/` in the source tree.

The canonical landing workflow visual now references the staged console asset at `/voxvector/voxvector-audio-analysis-console.png`.

## Behavior migration: developer dashboard refinement

Historical `developer-dashboard-refinement.css` behavior was inspected from its complete contents before retirement.

Its later console geometry system included a 5px radius, tighter metric/content-grid gaps, panel/header rhythm, sidebar treatment, active-navigation treatment, and restrained button/control geometry.

That behavior was migrated into the canonical console stylesheet and subsequently consolidated into `voxvector/src/index.css` with the other shared console/audio/UI style behavior. The old refinement file is not being recreated.

## Shared stylesheet consolidation

The following active stylesheet layers were inspected by contents before retirement:

- `audio-player.css`
- `console-menu-effects.css`
- `console-polish.css`
- `ui-consistency.css`

Their behavior was consolidated into canonical `voxvector/src/index.css`, and `main.jsx` was reduced to the canonical stylesheet entry. The historical files were then retired individually.

This consolidation preserved audio upload/player behavior, console status/panel geometry, mobile navigation effects, active-state treatment, reduced-motion behavior, and shared UI geometry instead of deleting those rules with their original files.

## Landing runtime recovery disposition

`landing-runtime-recovery.css` was inspected in full before retirement. Its current selectors included product height/background safety rules, waveform geometry, section-signal containment, workflow selectors targeting a historical `.vv-console-feature` surface, and loader sizing.

The product and waveform rules conflicted with newer canonical landing behavior; the historical `.vv-console-feature` selectors did not match current canonical markup; and loader behavior already belongs to the active `loading-screen.css` owner. No unique required behavior remained to be migrated from that layer, so it was retired.

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

## Completed landing-style consolidation

The historical landing refinement stack was reconciled against the current canonical `App.jsx` markup and `voxvector/public/landing.css` contents. Applicable behavior from the later final polish and hero refinement layers was moved into the canonical landing stylesheet before retirement.

The canonical landing layer now owns the recovered declarative hero artwork treatment, typography hierarchy, CTA treatment, waveform layering/entrance, workflow visual, evidence motion, responsive rules, and reduced-motion behavior that remain relevant to the current structure.

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


## September 2, 2026 CSS canonicalization

The VoxVector React frontend now has one stylesheet entrypoint: `voxvector/src/canonical.css`, imported only by `voxvector/src/main.jsx`. The manifest defines the cascade in ownership order: foundation, typography, shared chrome, public landing, developer console, visualization, and runtime startup.

Stale refinement and override layers were removed from the active source tree after their contents were either merged into their owning stylesheet or confirmed unreferenced. Historical copies are preserved under `voxvector/src/archive/styles/2026-09-canonicalization/` and are not imported by the production build.

The developer console's former `DeveloperConsoleEnhancements.css`, `coffee-ui.css`, and `console-workflow-state.css` layers were consolidated into `components/DeveloperConsole.css`. Component JSX imports for active styles were removed so the production cascade is visible from the canonical manifest.
