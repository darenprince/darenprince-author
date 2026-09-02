# 2026-09-02 — Public VoxVector shell alignment

## Decision

All non-developer VoxVector public surfaces should share the landing page's visual shell language while preserving each page's existing content and functionality.

## Canonical owner

The React landing/application shell remains `voxvector/src/components/SiteHeader.jsx`. The public static pages `methods.html`, `pipeline.html`, and `image-index/index.html` are normalized during the root build by `scripts/apply-voxvector-public-shell.mjs` and consume `voxvector/public/public-shell.css`.

## Navigation

The restored public navigation text is:

- Product
- How it works
- Technology
- Use cases
- Resources
- Developer

Navigation icons are rendered directly inside links without decorative icon containers. The mobile menu uses the same labels and icon treatment. The shared menu trigger remains a two-line control with no background wrapper.

## Visual direction

Public non-developer pages inherit the landing system's black/graphite foundation, warm tan accent, Inter/system typography, thin low-contrast borders, restrained spacing, and sharp/direct icon treatment. Existing page content, analysis data, and page-specific controls remain owned by their existing implementations.

## Deployment metadata incident

Actions run `33608386550` / job `100177559629` failed before VoxVector compilation because `labs/index.html` contained `#090a0c` while the canonical deployment metadata check expected `#070b14` for its theme-color. The current `labs/index.html` source is aligned to the expected value; the failure was a metadata consistency issue, not a VoxVector analysis failure.

## Verification boundary

Source changes are committed to `main`. GitHub Actions and browser verification are required before claiming production deployment success. A build pass is not scientific validation.
