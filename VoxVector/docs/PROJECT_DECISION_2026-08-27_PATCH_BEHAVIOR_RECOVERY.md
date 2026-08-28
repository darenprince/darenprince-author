# VoxVector Decision — Patch Behavior Recovery

**Date:** 2026-08-27
**Status:** Active
**Branch:** `main`

## Decision

Historical landing-page and UI patches that were previously retired must be evaluated by behavior, contents, dependency usage, and git chronology before their removal is considered complete.

A patch is not disposable merely because its implementation mechanism is undesirable. Required visual or functional behavior must be migrated into an appropriate canonical owner first.

## Recovery performed

Historical commits were reviewed, including:

- `877eac0509a42783de90fa7a4a6dfc956012e93f` — retired `HeroRefinement.jsx` runtime behavior.
- `3cc4c37b6643a64d63cbcb4764bbdb556eb9ba6c` — retired `LandingContentRefinement.jsx` behavior.
- `e20fd340f0c9dbcb97da64eda6bb02e309eb2c5e` — retired `EvidenceBarsRefinement.jsx` behavior.
- `14956b54cbf4edf158b0a09c14107ee37678a888` — retired `HeaderNoticeCleanup.jsx` behavior.
- `dd871359907621a2523c509a58d5aff6dfc1124c` — retired `CanonicalHeroCopy.jsx` behavior.
- `3d52e47c6d4d540428d835c60cb9c3cb622ac3f9` — latest reviewed hero layout adjustment behavior.
- historical final landing polish and hero refinement stylesheet layers reviewed by complete file contents before retirement.

## Migration result

Required declarative landing visual behavior recovered from the historical layers is represented by the canonical landing stylesheet:

`voxvector/public/landing.css`

The stylesheet is loaded directly by `voxvector/index.html` and is not a runtime patch or DOM mutation layer.

Recovered behavior includes:

- later hero background scale and positioning;
- later hero heading vertical positioning and responsive spacing;
- hero body spacing and line-height refinements where compatible with the newer canonical values;
- hero CTA spacing, pill geometry, and responsive sizing;
- hero technology-link spacing;
- declarative hero waveform treatment and the historical waveform entrance animation;
- workflow section presentation and supplied console artwork;
- evidence bar widths and visual motion treatment;
- reduced-motion handling for the recovered animated elements.

The historical hero copy manipulation was **not** blindly restored. Existing canonical copy remains the source of truth because copy changes require separate product approval and the project explicitly prohibits restoring competing copy through runtime mutation.

The historical runtime DOM mechanisms were also not restored. Their visible behavior is being migrated declaratively where it remains appropriate.

## Stylesheet consolidation

The following active frontend stylesheets were inspected by contents and then consolidated into `voxvector/src/index.css` before retirement:

- `audio-player.css`
- `console-menu-effects.css`
- `console-polish.css`
- `ui-consistency.css`

`main.jsx` now uses the consolidated canonical stylesheet entry. The retirement commits were made only after the behavior was moved into `index.css`.

The former `landing-final-polish.css`, `hero-refinement-overrides.css`, `landing-runtime-recovery.css`, and `hero-refinement.css` layers were likewise retired only after their required behavior was reconciled against current canonical code and styles. Where a historical value conflicted with a newer canonical behavior, the newer canonical behavior remains authoritative and the historical rule is not resurrected merely to preserve an obsolete mechanism.

## Asset rule

The source of truth for VoxVector visual assets is `VoxVector/Assets/`. Asset presence must be established from the repository source tree and the actual build/staging workflow. A file is not considered missing merely because it does not appear under `voxvector/public/`.

## Remaining audit

This decision does not declare the entire historical patch archaeology complete. Remaining retired or live layers must continue to be evaluated individually, with the same sequence:

1. inspect contents;
2. inspect chronology/history;
3. identify behavior;
4. compare with current canonical implementation;
5. classify behavior;
6. migrate required behavior;
7. verify;
8. retire only the obsolete mechanism.

## Verification status

The latest migrations have been committed to `main`. GitHub Actions status must be checked against the actual latest commit before claiming build or deployment success. No CI success is claimed solely from the presence of a commit.
