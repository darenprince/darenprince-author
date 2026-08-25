# Canonical Migration Status

## Current working branch

`main` is the canonical working branch.

## Canonicalization completed so far

- Landing refinement stack removed from `src/main.jsx`.
- Canonical landing remains `src/App.jsx`.
- Developer Console entry point is declarative and no longer injects the legacy console link at runtime.
- Recharts 3 migration and lockfile regeneration are in place.
- Production QA workflow passed after the landing canonicalization change.

## Protected functionality

Historical analysis functionality including waveform, spectrogram, gain, playback, timeline, pipeline and evidence controls must remain intact. Historical commit `c1e64b5de4cf71ee8ef1ea03699aacd84a7497dc` is the recovery reference for these controls.

## Patch disposition

The following files remain temporarily as recovery material until each is compared against the canonical implementation and its unique functionality is either migrated or proven obsolete:

- `src/components/HeroRefinement.jsx`
- `src/components/CanonicalHeroCopy.jsx`
- `src/components/LandingContentRefinement.jsx`
- `src/components/EvidenceBarsRefinement.jsx`
- `src/components/LandingChrome.jsx`
- `src/components/HeaderNoticeCleanup.jsx`
- associated hero/landing override and recovery stylesheets

## Next work

1. Compare each retained landing patch against `App.jsx`.
2. Migrate only genuine product/UI functionality directly into the canonical owner.
3. Consolidate shared header, navigation, user menu, footer and UI primitives into singular declarative owners.
4. Remove runtime DOM mutation and competing CSS layers.
5. Delete each patch only after build and browser verification.

## Non-negotiable rule

Never create a new patch to avoid editing the canonical implementation. Never delete a patch until its unique functionality has been migrated or explicitly proven unnecessary.
