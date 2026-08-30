# VoxVector Site Asset Index and Sitemap

**Date:** 2026-08-29
**Status:** Implemented on feature branch; GitHub Actions and live browser verification remain required.

## Change

The canonical React Developer Console now exposes direct links to the public VoxVector site surfaces and developer assets:

- public landing page: `/voxvector/`
- methods page: `/voxvector/methods.html`
- pipeline page: `/voxvector/pipeline.html`
- image asset index: `/voxvector/image-index/`
- sitemap: `/voxvector/sitemap.xml`

Existing repository source links remain intact.

## Asset scan

The `voxvector/` workspace was scanned through its current repository tree. The visual asset library under `voxvector/public/assets/` contains 18 image files:

- 3 root-level SVG hero assets
- 13 marketing SVG assets under `public/assets/marketing/`
- 2 PNG brand assets

The image index is at `voxvector/public/image-index/index.html`. Each indexed asset provides a preview, exact repository path, GitHub link, and a copy-to-clipboard control for the repository path.

## Sitemap

The static sitemap is at `voxvector/public/sitemap.xml` and enumerates the current public VoxVector pages:

1. `/voxvector/`
2. `/voxvector/methods.html`
3. `/voxvector/pipeline.html`
4. `/voxvector/developer/`
5. `/voxvector/image-index/`

## Verification boundary

The modified Developer Console source and generated static files were read back from the feature branch after commit. No fresh production deployment, GitHub Pages build, or browser screenshot verification is claimed by this checkpoint.
