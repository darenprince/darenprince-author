# VoxVector Hero Refinement — 2026-08-21

## Scope

Public landing hero hierarchy, full-width hero artwork, CTA alignment, hero end-navigation, and preservation of the surrounding landing-page sections.

## Implemented

- Preserved the refined hero headline hierarchy: `Reveal the TRUTH` followed by `IN YOUR AUDIO`.
- Uses `voxvector/public/assets/voxvector-hero-cinematic-v2.svg` as the hero background.
- The artwork is now applied directly to the hero container so it spans the full viewport width and is anchored to the top edge of the hero.
- Removed the previous grayscale treatment from the hero artwork so the supplied artwork renders as authored.
- Reduced the nested hero overlay opacity so the background remains visibly present behind the content instead of collapsing into an effectively black field.
- Kept the hero waveform as a separate animated evidence layer.
- Centered the two primary hero CTA controls while keeping them on one horizontal row.
- Added the text-only `Explore the Technology` control with a downward arrow at the bottom of the hero, immediately above the following content. It links to `#technology`.
- Removed common CTA-adjacent disclaimer copy such as credit-card and secure/private/powerful promotional lines from the hero presentation layer.
- Preserved responsive behavior and the existing mobile navigation.
- Preserved the landing-page section structure and technology section.

## Implementation

- `voxvector/src/components/HeroRefinement.jsx`
- `voxvector/src/hero-refinement.css`
- `voxvector/src/main.jsx`
- `voxvector/public/assets/voxvector-hero-cinematic-v2.svg`

## Boundary

Presentation-only change. No VoxVector analysis method, evidence model, reliability logic, classification behavior, API behavior, or scientific validation status was changed.

## Verification status

Source changes are committed to GitHub. Production browser verification remains a deployment/runtime check and should be performed against the resulting GitHub Pages build.
