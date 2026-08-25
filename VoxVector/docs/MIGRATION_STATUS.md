# Canonical Migration Status

## Current working branch

`main` is the canonical working branch for this migration.

## Completed

- Repository and git-history archaeology completed for the principal landing and Developer Console patch candidates.
- Historical commit `c1e64b5de4cf71ee8ef1ea03699aacd84a7497dc` identified as the explicit restoration of waveform, spectrogram, gain and analysis controls. These remain protected canonical functionality.
- Canonical migration plan restored at `VoxVector/docs/CANONICAL_MIGRATION_PLAN.md`.
- Developer Console entry point renders the canonical console declaratively without runtime DOM injection of the legacy duplicate console link.
- `voxvector/src/main.jsx` no longer mounts the landing refinement/override stack. The canonical `App.jsx` landing implementation now owns the public page without `CanonicalHeroCopy`, `EvidenceBarsRefinement`, `LandingContentRefinement`, `LandingChrome`, or `HeaderNoticeCleanup` runtime layers.

## Current verification state

- Canonical source migration committed directly to `main`.
- GitHub Actions has not yet produced a workflow run for commit `4c34716c9d1bb6813fd78488bd18b21611521bc6`; production build therefore remains unverified.
- Patch files have intentionally NOT been deleted yet. They remain available until build and browser verification confirms that the canonical implementation preserves required functionality.

## Active migration order

1. Verify the canonical landing build and browser behavior.
2. Compare landing behavior against the historical/reference versions and migrate any genuinely missing functionality directly into `App.jsx`.
3. Establish declarative shared site chrome with one canonical header, navigation, user menu, and footer owner.
4. Consolidate CSS patch layers into their owning styles.
5. Delete each patch only after its unique functionality has passed the deletion gate.
6. Re-run full build and browser verification.

## Hard deletion gate

No patch is deleted until its unique functionality is present in its canonical owner, references are migrated, production build succeeds, affected browser flows are verified, and no functionality disappears.

## Operating rule

Do not create a parallel migration implementation to avoid editing an existing canonical file. Edit the canonical source directly. Historical versions are used for recovery and comparison only.
