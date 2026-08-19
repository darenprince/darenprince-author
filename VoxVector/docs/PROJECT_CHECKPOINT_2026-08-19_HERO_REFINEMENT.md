# VoxVector Hero Refinement — 2026-08-19

## Scope

Public landing hero hierarchy, header proportions, hero background treatment, and headline motion.

## Implemented

- Removed the hero eyebrow copy `Advanced vocal deception analysis`.
- Removed the hero eyebrow label `Evidence first`.
- Replaced the secondary hero headline with the requested semantic headline structure: `Reveal the truth` followed immediately by `in your audio` on the next line.
- Preserved the existing display type scale and tightened line spacing between the two headline lines.
- Added a restrained animated coffee-gold shine to the words `truth` only.
- Reduced the public header height from the prior 76px desktop treatment to 68px, with a 64px mobile treatment.
- Allowed the hero artwork to extend behind the transparent/translucent sticky header so the visual begins at the top of the viewport.
- Added a new full-bleed SVG hero artwork using a dark charcoal field, subtle dimensional wave paths, fine spectral lines, restrained coffee-gold illumination, and sparse particles.
- Reduced the hero overlay contrast so the new artwork remains visible without competing with the headline.
- Added reduced-motion handling for the animated gold shine.

## Implementation

- `voxvector/src/components/HeroRefinement.jsx`
- `voxvector/src/hero-refinement.css`
- `voxvector/src/main.jsx`
- `voxvector/public/assets/voxvector-hero-cinematic-v2.svg`

## Boundary

Presentation-only change. No VoxVector analysis method, evidence model, reliability logic, classification behavior, API behavior, or scientific validation status was changed.

## Verification status

Changes are committed to the GitHub source of truth. A fresh production build and browser-level visual QA are still required before claiming rendered production verification.
