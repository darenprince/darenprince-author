# VoxVector Decision — Patch Behavior Recovery

**Date:** 2026-08-27
**Status:** Active
**Branch:** `main`

## Decision

Historical landing-page patches that were previously retired must be evaluated by behavior, contents, dependency usage, and git chronology before their removal is considered complete.

A patch is not disposable merely because its implementation mechanism is undesirable. Required visual or functional behavior must be migrated into an appropriate canonical owner first.

## Recovery performed

Historical commits were reviewed, including:

- `877eac0509a42783de90fa7a4a6dfc956012e93f` — retired `HeroRefinement.jsx` runtime behavior.
- `3cc4c37b6643a64d63cbcb4764bbdb556eb9ba6c` — retired `LandingContentRefinement.jsx` behavior.
- `e20fd340f0c9dbcb97da64eda6bb02e309eb2c5e` — retired `EvidenceBarsRefinement.jsx` behavior.
- `14956b54cbf4edf158b0a09c14107ee37678a888` — retired `HeaderNoticeCleanup.jsx` behavior.
- `dd871359907621a2523c509a58d5aff6dfc1124c` — retired `CanonicalHeroCopy.jsx` behavior.
- `3d52e47c6d4d540428d835c60cb9c3cb622ac3f9` — latest reviewed hero layout adjustment behavior.

## Migration result

Required declarative landing visual behavior recovered from the historical layers is now represented by the canonical landing stylesheet:

`voxvector/public/landing.css`

The stylesheet is loaded directly by `voxvector/index.html` and is not a runtime patch or DOM mutation layer.

Recovered behavior includes:

- later hero background scale and positioning;
- later hero heading vertical positioning and responsive spacing;
- declarative hero waveform treatment replacing the historical runtime canvas injection;
- workflow section visual treatment;
- workflow console artwork presentation;
- evidence bar widths and visual motion treatment.

The historical hero copy manipulation was **not** blindly restored. Existing canonical copy remains the source of truth because copy changes require separate product approval and the project explicitly prohibits restoring competing copy through runtime mutation.

The historical runtime DOM mechanisms were also not restored. Their visible behavior is being migrated declaratively where it remains appropriate.

## Remaining audit

This decision does not declare the entire historical patch archaeology complete. Remaining retired layers must continue to be evaluated individually, with the same sequence:

1. inspect contents;
2. inspect chronology/history;
3. identify behavior;
4. compare with current canonical implementation;
5. classify behavior;
6. migrate required behavior;
7. verify;
8. retire only the obsolete mechanism.

## Verification status

The new commits have been written to `main`. GitHub has not yet returned a CI status for the latest commit, so build/deployment success is not claimed here.
