# VoxVector Loading Motion System

## Status

Documented visual system for VoxVector application loading and transition states. These references are design inspiration only; implementations must be recreated and adapted into VoxVector-owned code and styling rather than treated as runtime dependencies.

## Loading assignments

### 1. Analysis engine loader — Esca-Byte / Hard Penguin 57

Reference: https://uiverse.io/Esca-Byte/hard-penguin-57

**Role:** Primary loader for active analysis execution.

**Direction:** This supersedes the earlier Bitter Dragonfly reference as the preferred analysis loader. Use VoxVector black, graphite, warm tan/gold, and restrained white highlights. Motion should suggest evidence processing rather than a generic spinner.

### 2. Analysis workspace preloader — Shoh2008 / Terrible Fireant 25

Reference: https://uiverse.io/Shoh2008/terrible-fireant-25

**Role:** Preparing the analysis workspace before evidence UI becomes interactive.

### 3. API startup animation — Satwinder04 / Witty Starfish 81

Reference: https://uiverse.io/Satwinder04/witty-starfish-81

**Role:** API/engine initialization and service startup state.

### 4. Application splash — SmookyDev / Shaggy Donkey 90

Reference: https://uiverse.io/SmookyDev/shaggy-donkey-90

**Role:** Primary application splash/preloader.

**VoxVector treatment:** black background, warm tan wave, VoxVector logo centered, logo gently pulsing.

## Visual rules

- Keep the four states semantically distinct.
- Use the existing VoxVector palette and design tokens.
- Avoid rainbow, neon, or unrelated UIverse colors.
- Respect reduced-motion preferences.
- Loading animation must never imply analysis completion or a scientific result.
- Loading states are presentation components and must remain separate from eligibility, evidence collection, candidate classification, and final disposition.

## Demo

The interactive comparison page is published with the frontend at:

`/voxvector/loading-demo.html`

It provides a controlled visual preview of all four loading treatments.
