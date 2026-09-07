# VoxVector Initial Boot / Runtime Blank Page Incident — 2026-08-25

## Incident

After the static boot preloader was restored, the public application could still present as a dark blank page after the loader disappeared.

## Diagnosis

The preloader was only one layer of the failure. The React application had no runtime error boundary around the application or the DOM-heavy landing refinements. If a render or enhancement error occurred after the React module loaded, the static preloader could still release and leave the user looking at the empty `#root` surface.

The public landing composition contains several browser-side enhancement components that mutate the DOM after React render:

- `HeroRefinement`
- `EvidenceBarsRefinement`
- `LandingContentRefinement`
- `LandingChrome`
- `HeaderNoticeCleanup`

These are presentation enhancements and must never be allowed to take down the core landing application.

## Correction

The frontend now has two explicit runtime protections:

1. `RuntimeBoundary` wraps the core `App` and renders a visible recovery surface when the application throws during rendering or lifecycle execution.
2. `EnhancementBoundary` isolates each optional landing enhancement. A failed enhancement is discarded while the core application remains available.

The static HTML boot boundary now uses a readiness handshake instead of hiding after an arbitrary animation-frame delay.

- React calls `window.__voxvectorMarkReady()` from a mounted readiness effect.
- The boot loader remains visible until the application reaches that readiness point.
- A five second timeout is a bounded failure path, not a silent hide.
- Global `error` and `unhandledrejection` events switch the boot surface to a visible initialization failure state rather than exposing a blank page.
- The failure state provides a reload action.

## Architectural rule

A successful module download or production build is not proof that the browser application successfully initialized.

The startup contract is now:

`static boot surface → React mount → runtime boundary → readiness handshake → loader release`

Any failure before readiness must produce a visible recovery state. Any failure in a noncritical enhancement must not destroy the application surface.

## Verification

The branch must pass the production-like frontend build and Pages artifact checks. Browser verification must confirm:

- preloader appears on initial load;
- landing page becomes visible after React mount;
- no blank state remains after loader dismissal;
- a forced runtime error produces the recovery surface rather than a blank page;
- a failed optional enhancement does not remove the landing page;
- Developer Console remains reachable;
- desktop and mobile startup both behave correctly.
