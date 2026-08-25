# Canonical Migration Status

## Current working branch

`main` is the canonical working branch for this migration.

## Completed

- Repository and git-history archaeology completed for the principal landing and Developer Console patch candidates.
- Historical commit `c1e64b5de4cf71ee8ef1ea03699aacd84a7497dc` identified as the explicit restoration of waveform, spectrogram, gain and analysis controls. These remain protected canonical functionality.
- Canonical migration plan moved into `VoxVector/docs/CANONICAL_MIGRATION_PLAN.md`.
- Developer Console entry point now renders the canonical console declaratively without runtime DOM injection of the legacy duplicate console link.

## Active migration order

1. Establish declarative shared site chrome.
2. Integrate landing patch functionality into the canonical landing implementation.
3. Preserve and verify Developer Console analysis functionality.
4. Consolidate CSS patch layers into owning styles.
5. Remove patches only after migration and verification.

## Hard deletion gate

No patch is deleted until its unique functionality is present in its canonical owner, references are migrated, production build succeeds, and affected browser flows are verified.

## Operating rule

Do not create a parallel migration implementation to avoid editing an existing canonical file. Edit the canonical source directly. Historical versions are used for recovery and comparison only.
