# VoxVector Initial Boot / Preloader Incident — 2026-08-25

## Diagnosis

The public preloader was implemented as a React component mounted inside the React render tree. That made the loader dependent on React successfully rendering the application. A render or module failure could therefore produce the exact failure state the loader was intended to hide: a dark or blank initial screen with no independent recovery surface.

The loader also referenced `/voxvector/assets/voxvector-icon-final-color.png`, while the canonical Pages asset is staged as `voxvector-icon-final-color.png.PNG`. The existing component had an image error fallback, so the incorrect path did not by itself create a permanent loader, but it was an asset-boundary defect.

The 2026-08-25 removal of the React loading overlay eliminated the blocking layer but also removed the intended product preloader entirely. That was not the correct long-term architecture.

## Correction

The public preloader is now owned by `voxvector/index.html` and appears before the React module executes.

The loader is released by `main.jsx` only after React has rendered and the browser has had two animation frames to paint the application surface.

A 3.5 second static fail-safe releases the loader even if React fails during startup. This prevents a loader from becoming an infinite black screen.

The preloader uses the canonical staged icon asset path and retains the existing VoxVector signal, orbit, pulse, and warm monochrome visual language.

## Architectural rule

The boot preloader must remain independent of the application render tree. It is a boot boundary, not an application component.

The preloader must:

- render before React;
- have no runtime dependency on React, Supabase, TanStack Query, or application components;
- release after the first successful application paint;
- have a finite fail-safe timeout;
- remain pointer-inert after release;
- respect reduced-motion preferences;
- use canonical production asset paths;
- never obscure a failed application indefinitely.

## Verification required

The feature branch must pass the production-like frontend build and Pages artifact checks. Browser verification must confirm the loader appears briefly on desktop and mobile, disappears after the application paints, does not return during navigation, and does not trap the page when JavaScript fails or an application render error occurs.
