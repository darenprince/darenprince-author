# VoxVector Canonical Migration Plan

## Purpose

Restore a single canonical implementation for every feature while preserving functionality recovered from historical patches.

## Rules

1. Existing functionality is migrated into its canonical owner before any patch is removed.
2. No new patch, override, refinement, recovery, V2, duplicate, or runtime DOM workaround may be introduced.
3. Large files are edited directly in focused sections. File size is not a reason to create an architectural layer.
4. Shared UI has one canonical implementation and is composed by pages.
5. Historical commits are evidence for recovery, not automatic rollback targets.
6. Every migration must be build verified and browser verified when applicable.

## Current migration map

| Candidate | Canonical destination | Required migration | Status |
|---|---|---|---|
| HeroRefinement.jsx | Canonical landing hero | Preserve legitimate hero visuals, waveform treatment, CTA behavior; eliminate DOM mutation | Archaeology complete |
| CanonicalHeroCopy.jsx | Canonical landing hero | Move approved copy directly into JSX | Archaeology complete |
| LandingContentRefinement.jsx | Canonical workflow/landing sections | Preserve console visual, waveform/spectrum treatment, markers and legitimate copy | Archaeology complete |
| EvidenceBarsRefinement.jsx | Canonical evidence section | Move evidence presentation/animation into owning markup | Archaeology complete |
| HeaderNoticeCleanup.jsx | Canonical header/page | Resolve notice at source; remove MutationObserver workaround | Archaeology complete |
| DeveloperConsole.jsx | Canonical console shell | Remove runtime sidebar injection; establish explicit composition | Complete |
| DeveloperConsoleMVP.jsx | Developer Console / workspace | Preserve existing console functionality; compare history before rename/removal | Preserve |
| CaseAnalysisWorkspace.jsx | Canonical analysis workspace | Preserve waveform, spectrogram, gain, playback, speed, position, pipeline and analysis controls | Preserve |
| LandingChrome.jsx | Shared public shell/header/footer | Preserve navigation/account/menu functionality; remove DOM portal patching where possible | Migration pending |
| Hero/landing CSS patch files | Canonical hero/landing styles | Consolidate selectors and tokens | Migration pending |
| Console CSS patch files | Canonical console styles | Consolidate selectors and tokens | Migration pending |

## Historical evidence

Commit `c1e64b5de4cf71ee8ef1ea03699aacd84a7497dc` explicitly restored waveform, spectrogram, gain and analysis controls. These are canonical product functionality and must not be lost during cleanup.

## Target shared architecture

```text
SiteShell
├── Header
│   ├── Navigation
│   ├── UserMenu
│   └── MobileMenu
├── PageContent
└── Footer
```

Developer Console:

```text
DeveloperConsole
├── ConsoleShell
├── Navigation
├── CaseAnalysisWorkspace
│   ├── AudioPlayer
│   ├── Waveform
│   ├── Spectrogram
│   ├── Gain / Playback Controls
│   ├── Timeline
│   └── Pipeline / Evidence
└── Diagnostics / Profile
```

## Deletion gate

A patch may only be deleted after:

- all unique functionality has been identified;
- functionality has been migrated into its canonical owner;
- imports/usages have been migrated;
- production build succeeds;
- affected browser flows are verified;
- no unique functionality disappears;
- the patch is no longer referenced.
