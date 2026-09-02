# Project Decision — Navigation, Typography, and Iconography

**Date:** 2026-09-02
**Status:** Active

## Decision

VoxVector's public landing experience and Developer Console will share one compact, premium interface language:

- Primary header target: 56px.
- Mobile navigation: slide-out Sheet with explicit X close, scrim dismissal, navigation dismissal, and horizontal swipe-to-close.
- Menu activation: restrained two-line glyph rather than a three-line hamburger.
- Body and UI typography: Inter.
- Hero, page-title, and section-heading typography: Cal Sans.
- Heading treatment: sentence case, controlled negative tracking, tight display leading, optical kerning, and balanced wrapping.
- Metadata labels may use uppercase and wider tracking only where their role is genuinely utilitarian.
- Streamline Sharp is the canonical icon family for shared product chrome, with Iconify's on-demand `streamline-sharp` set used in the React application.
- Surface depth remains restrained; directional tonal gradients should generally remain within roughly 5–8% of the base surface.

## Reason

The previous navigation consumed unnecessary vertical space and used a mixed icon/type treatment across shared surfaces. A compact header, consistent typography, coherent iconography, and tighter formatting improve scanability without sacrificing touch targets, accessibility, or functional density.

## Implementation boundary

This is a presentation and interaction-system decision. It does not alter VoxVector's backend architecture, evidence model, analytical methodology, validation state, or scientific claims.

The existing canonical `SiteHeader` remains the shared public/developer chrome. The existing `Sheet` remains the application-owned mobile navigation primitive and is extended for swipe dismissal rather than replaced with a duplicate navigation component.

## Asset provenance

Streamline Sharp is an established Streamline icon family. Its free Sharp distribution is available under the stated CC BY 4.0 license with attribution requirements. The Streamline API remains the authoritative source for broader asset discovery and licensed asset retrieval; the React runtime uses the public on-demand collection so no private API key is embedded in client code.

## Acceptance criteria

1. Public and developer headers occupy approximately 56px.
2. Mobile menus close with X, scrim, item selection, and swipe.
3. Keyboard focus and reduced-motion behavior remain intact.
4. Inter is the global body/UI face.
5. Cal Sans is used for major headings.
6. Casing, kerning, line-height and wrapping are consistent across shared UI.
7. Shared navigation chrome uses Streamline Sharp rather than mixing icon families.
8. The application remains functionally identical outside presentation and interaction refinement.
9. The production React build and backend QA workflow pass before merge.
10. Browser verification checks desktop and mobile states before production release.
