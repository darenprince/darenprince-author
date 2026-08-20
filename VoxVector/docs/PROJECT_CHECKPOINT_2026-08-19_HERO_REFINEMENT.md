# VoxVector Hero Refinement — 2026-08-19

## Scope

Public landing hero hierarchy, header proportions, hero background treatment, headline motion, and preservation of the surrounding landing-page sections.

## Implemented

- Removed the hero eyebrow copy `Advanced vocal deception analysis`.
- Removed the hero eyebrow label `Evidence first`.
- Replaced the secondary hero headline with the requested semantic headline structure: `Reveal the truth` followed immediately by `in your audio` on the next line.
- Preserved the existing display type scale and tightened line spacing between the two headline lines.
- Added a restrained animated coffee-gold shine to the words `truth` only.
- Reduced the public header height from the prior 76px desktop treatment to 68px, with a 64px mobile treatment.
- Allowed the hero artwork to extend behind the transparent/translucent sticky header so the visual begins at the top of the viewport.
- Added the full-bleed SVG hero artwork using a dark charcoal field, subtle dimensional wave paths, fine spectral lines, restrained coffee-gold illumination, and sparse particles.
- Reduced the hero overlay contrast so the artwork remains visible without competing with the headline.
- Added reduced-motion handling for the animated gold shine.
- Refined `IN YOUR AUDIO` to a slightly smaller, darker secondary line, especially on mobile.
- Sequenced the hero reveal so the waveform opens clearly, recedes, `Reveal the` appears, `TRUTH` reveals with an earlier shine, then `IN YOUR AUDIO`, body copy, and CTAs reveal in sequence.
- Increased the opening waveform visibility while retaining its deliberate fade.
- Preserved the landing-page section structure. Hero refinement must not move, remove, or overwrite the Technology section, its feature cards, or the analytical-path heading and copy.
- Removed the prior DOM relocation behavior that was incorrectly treating the section immediately after the hero as a movable principles grid and deleting that entire section.

## Implementation

- `voxvector/src/components/HeroRefinement.jsx`
- `voxvector/src/hero-refinement.css`
- `voxvector/src/main.jsx`
- `voxvector/public/assets/voxvector-hero-cinematic-v2.svg`

## Boundary

Presentation-only change. No VoxVector analysis method, evidence model, reliability logic, classification behavior, API behavior, or scientific validation status was changed.

## Verification status

The section-preservation fix is committed to the GitHub source of truth. Browser-level production visual QA still needs to be performed after the resulting GitHub Actions deployment before rendered production behavior is claimed as verified.
