# VoxVector hero background replacement audit

**Date:** 2026-09-11
**Issue:** #985
**Branch:** `fix/985-voxvector-hero-backgrounds`
**Subsystem:** public landing hero artwork and build-time asset staging only

## Scope

Replace the canonical public landing hero background artwork with the supplied desktop and mobile designs while preserving the existing hero copy, CTA behavior, navigation, layout, animation, accessibility, and unrelated styling.

## Source evidence

The task was re-read from current GitHub state. The active branch was rebased onto canonical `main` revision `e98d28cc5cf885514d9ef3ad544c40698c8b995b` before this audit record was added.

The canonical implementation owners are:

- `VoxVector/Assets/voxvector-hero-desktop.svg`
- `VoxVector/Assets/voxvector-hero-mobile.svg`
- `voxvector/src/canonical-landing.css`
- `.github/workflows/deploy-pr-preview.yml`
- `.github/workflows/deploy-pages.yml`

The Crown Labs product mirror is synchronized in `docs/crownlabsbible/04-product-dossiers/VoxVector/overview.md`.

## Implementation state

- Desktop hero artwork is sourced from the canonical 16:9 asset under `VoxVector/Assets/`.
- Mobile hero artwork is sourced from the canonical 9:16 asset under `VoxVector/Assets/`.
- Build workflows stage the assets into `voxvector/public/assets/` before Vite builds. The staged copies are build inputs, not competing canonical source assets.
- `canonical-landing.css` selects the desktop asset by default and the mobile asset below the existing mobile breakpoint.
- The prior mobile mask/fade treatment is removed. No new hero-specific gradient, mask, or opacity treatment is introduced.
- Existing hero content and interaction markup are not rewritten by this task.

## Verification boundary

At the time this audit record was authored, source readback and branch/main comparison had been performed, but exact-head GitHub Actions QA, PR Preview Build, merge, GitHub Pages publication, and deployed desktop/mobile browser verification were still pending. Those evidence classes must be recorded separately and must not be inferred from source state.

This is a presentation change only. It does not modify VoxVector analytical methodology, provider execution, classification, evidence synthesis, or scientific validation status.
