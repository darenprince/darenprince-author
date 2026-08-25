# VoxVector Frontend AI Editing Rules — READ FIRST

This directory contains the canonical React frontend.

## NON-NEGOTIABLE SOURCE-OF-TRUTH RULE

**If a page, component, feature, interaction, or style already exists, edit the original source file that owns it.**

Never avoid a large or cumbersome file by creating a patch layer.

Do NOT create a second implementation through:

- Refinement components
- Override components
- Patch components
- Enhancement components
- Recovery components
- duplicate pages
- duplicate dashboards
- duplicate headers/navigation
- runtime DOM mutations
- CSS override stacks
- simplified replacement files

If the existing source file is large, read it in sections and edit the correct sections directly.

## PRESERVATION

A normal edit must preserve everything outside the requested change: existing controls, analysis UI, navigation, user menu, routes, state, API calls, audio controls, waveform/spectrogram behavior, responsive layouts, accessibility, animations, assets, and copy.

A dependency migration must preserve the product surface. Recharts 3 migration does not authorize removal or simplification of existing analytical UI.

## REQUIRED PROCESS

1. Search for the existing implementation.
2. Determine the canonical owner.
3. Read the actual source.
4. Edit it in place.
5. Read it back.
6. Inspect the diff.
7. Search for competing implementations.
8. Build and browser-verify when applicable.

> **AI convenience is never a reason to introduce architectural layers. Edit the OG file.**
