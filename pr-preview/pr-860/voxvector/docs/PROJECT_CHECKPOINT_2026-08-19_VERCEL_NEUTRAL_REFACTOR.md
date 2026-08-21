# VoxVector Project Checkpoint — 2026-08-19 Neutral Theme Refactor

## Reference reviewed

The supplied Shadcnblocks reference screenshots were reviewed as the visual reference for this change. The important design language is not a literal copy of the example application. It is the neutral system and hierarchy:

* near black canvas in dark mode
* white and near white primary typography
* charcoal secondary surfaces
* quiet gray borders and dividers
* restrained rounded corners
* large readable Inter typography
* monospace labels and technical metadata
* subtle surface depth instead of decorative color gradients
* white primary actions rather than colored marketing buttons
* semantic color reserved for actual state, such as success or destructive actions
* light mode is a white canvas with black typography and the same quiet gray structure
* theme switching is a first class product control

## VoxVector implementation decision

The public landing page is being refactored away from the previous espresso, copper, amber and tan brand treatment. The active public palette is now neutral black, white and gray in both dark and light modes.

Warm accent colors are no longer used as the primary product palette. This includes the landing waveform, analytical path numbering, icons, section labels, CTA treatment and decorative radial glows.

The scientific meaning of VoxVector is communicated through typography, information hierarchy, evidence visualization and semantic state rather than a warm color brand layer.

## Theme behavior

The existing application owned `ThemeToggle` remains the theme control. It stores the selected theme in local storage under `voxvector-theme` and applies `data-theme` to the root document. The public landing surface exposes the control through the existing `ThemeLayer` in `src/main.jsx`.

## UI treatment

* Dark canvas: near black
* Dark surfaces: charcoal and deep neutral gray
* Light canvas: white
* Light surfaces: white and near white
* Borders: low contrast neutral gray
* Primary text: white in dark mode and black in light mode
* Secondary text: neutral gray
* Primary button: white in dark mode and black in light mode
* Secondary button: transparent or neutral surface
* Charts: neutral gray families, with semantic green/red only where a real state requires it
* Decorative gradients: neutral luminance only

The goal is the visual restraint shown in the supplied reference: a premium technical interface built from contrast, spacing, type and surface depth rather than a colorful theme.

## Scope boundary

This is a visual system change. It does not alter VoxVector analysis methodology, evidence collection, classification, validation status or backend behavior.

## Verification status

Source changes must be verified by a fresh frontend build and browser inspection. Until those checks run successfully, production deployment is not claimed as verified.
