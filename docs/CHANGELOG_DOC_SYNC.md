# 🗒️ Documentation Sync Changelog

> Tracks documentation updates made during the 2025-02-14 audit.

## 2026-01-24 — Lean In auth UI sync

- Documented the updated Lean In login screen visuals, toggles, and dark-mode variant while preserving access gate identifiers in the SEO/metadata plan.

## 2025-02-14 — Full documentation realignment

- Rebuilt the site audit report with fresh metrics, mismatch matrix, and backlog checkpoints.
- Rewrote README, site structure, file map, style guide, and component catalog to reflect the current Sass, JS, and page inventory.
- Updated build pipeline, navigation overview, and indexing strategy with accurate scripts and environment expectations.
- Logged the retirement of legacy database tooling and highlighted search index gaps (`/content/` missing) across docs.
- Added quick-reference notes to the migration plan and aligned duplicate guides to the new canonical sources.

## 2025-02-13 — Audit refresh & doc corrections

- Re-ran full repo scan; updated `docs/REPORT_SITE_DOC_AUDIT.md` with current metrics, citations, and refreshed backlog.
- Synced `docs/SITE_STRUCTURE.md` + `docs/UI_COMPONENTS.md` to reference `js/main.js` as the component nav controller.
- Updated style and build guides with the 2025-02-13 timestamp to reflect latest audit.
- Extended mismatch tracking for stale README guidance (`.container--dark`, `npm run build`) and removed legacy database project IDs.

## 2025-09-18 — Repo & docs realignment

- Added `docs/REPORT_SITE_DOC_AUDIT.md` with scan metrics, mismatch catalog, and next-step backlog.
- Authored `docs/SITE_STRUCTURE.md` to document the actual directory tree, page inventory, and module map.
- Published `docs/STYLE_GUIDE.md` consolidating tokens, typography, spacing, and heading usage reality checks.
- Compiled `docs/UI_COMPONENTS.md` mapping every SCSS partial to markup hooks and JavaScript controllers.
- Documented build lifecycle in `docs/BUILD_PIPELINE.md`, including npm scripts, GitHub Pages config, and search/index caveats.
- Published the data platform migration plan in `docs/data-platform-migration.md`.
- Logged search index gap (missing `/content/`) and H1 inconsistencies for follow-up in the audit report.

## 2026-04-08 — Crown Labs source-of-truth sync (GitHub Pages)

- Replaced the Crown Labs public page implementation with the user-approved reference layout/copy to match the provided source experience.
- Confirmed `labs.html` keeps GitHub Pages-ready absolute/relative metadata, favicon, social card, and canonical tags for deployment.
- Synced supporting front-end assets (`assets/labs.css`, `assets/labs.js`) to preserve the new mobile-first UI behavior (menu, progress bar, scroll-to-top).

## 2026-04-09 — Home visual refresh (GitHub Pages-safe assets)

- Updated the global body background to the new branded site texture image and kept a dark overlay for readability.
- Swapped the homepage hero/social image to `gameonallformats.png`, tuned hero crop/scale for a larger visual treatment, and updated print/front/back merchandising imagery references.
- Refined the `Daren’s Desk` CTA variant to remove white icon/text treatment and use a brand-mint button style that preserves contrast on dark backgrounds.
