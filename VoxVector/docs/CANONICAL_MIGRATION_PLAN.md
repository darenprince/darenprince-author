# VoxVector Canonical Migration Plan

## Rules

1. Edit canonical implementations directly. Do not create parallel replacements because a file is large.
2. Migrate unique functionality into its canonical owner before deleting any patch.
3. Never add a patch, override, refinement, recovery, V2, duplicate, or runtime DOM workaround to solve a canonical edit.
4. Shared header, navigation, user menu, footer, buttons, and UI primitives must have one canonical owner.
5. Historical commits are recovery evidence, not automatic rollback targets.
6. Build and browser verify substantive migrations before deleting the old layer.

## Protected functionality

The Developer Console's waveform, spectrogram, gain, playback, timeline, pipeline, and analysis controls are product functionality and must survive cleanup.

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

## Current migration targets

- HeroRefinement.jsx → canonical landing hero
- CanonicalHeroCopy.jsx → canonical landing hero
- LandingContentRefinement.jsx → canonical landing sections
- EvidenceBarsRefinement.jsx → canonical evidence section
- HeaderNoticeCleanup.jsx → canonical header/page
- LandingChrome.jsx → canonical shared site chrome
- hero-refinement-overrides.css → canonical hero styles
- hero-layout-adjustments.css → canonical hero styles
- hero-final-adjustments.css → canonical hero styles
- landing-final-polish.css → canonical landing styles
- landing-runtime-recovery.css → canonical landing styles

## Deletion gate

A patch is deleted only after unique functionality is migrated, imports/usages are migrated, the production build succeeds, affected browser flows are verified, and no functionality disappears.
