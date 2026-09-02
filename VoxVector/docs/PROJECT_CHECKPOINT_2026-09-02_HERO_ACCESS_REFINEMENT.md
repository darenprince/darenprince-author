# VoxVector Hero Access Refinement — September 2, 2026

## Implemented

- Mobile landing hero uses the canonical `voxvector-hero-bg-mobile.png` artwork.
- Mobile hero overlay was substantially lightened so the artwork remains visible, with the lower edge still fading toward black.
- `Explore the Technology` is presented as a larger bold black pill with no stroke.
- The technology cue uses a compact stemless chevron beneath the label and respects reduced-motion preferences.
- Additional vertical breathing room was added between hero heading, body copy, and primary actions.
- The primary hero action is rendered as `Request access`.
- Public header access controls include direct GitHub and user/login icons without decorative icon wrappers.

## Source

- `voxvector/src/main.jsx`
- `voxvector/src/components/ui/Button.jsx`
- `voxvector/src/components/SiteHeader.jsx`
- `voxvector/src/components/SiteHeader.css`
- `voxvector/src/public-hero-refinement.css`
- `voxvector/public/assets/voxvector-hero-bg-mobile.png`

## Verification

Canonical source files were read back after editing. The mobile asset path, hero refinement stylesheet import, access CTA rendering logic, GitHub icon, and user/login icon are present in the current `main` source.
