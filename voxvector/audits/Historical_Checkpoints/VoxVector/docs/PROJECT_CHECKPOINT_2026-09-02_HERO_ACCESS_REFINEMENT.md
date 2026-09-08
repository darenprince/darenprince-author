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
- Temporary `public-hero-refinement.css` was retired; hero styling now belongs to the canonical landing owner.
- `voxvector/public/assets/voxvector-hero-bg-mobile.png`

## Verification

Canonical source files were read back after editing. The mobile asset path, hero refinement stylesheet import, access CTA rendering logic, GitHub icon, and user/login icon are present in the current `main` source.


## Canonicalization update

On September 2, 2026, the temporary refinement layer was fully retired. The React application imports only `voxvector/src/canonical.css`; the hero is owned by the public landing stylesheet and canonical component structure rather than a late-stage override file.
