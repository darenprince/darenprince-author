# 🗒️ Documentation Sync Changelog

> Tracks documentation updates made during the 2025-02-14 audit.

## 2026-04-09 — Hero subtitle size + image offset tweak

- Increased the homepage hero subtitle clamp values so the supporting line reads larger across mobile and desktop breakpoints.
- Nudged the hero image crop downward by updating `object-position` to keep the top visual sitting slightly lower without breaking the GitHub Pages static asset flow.
- Confirmed the change is CSS-only and remains compatible with the existing GitHub Pages deployment/build process (`assets/styles.css` committed artifact).

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

## 2026-04-09 — Hero CTA + heading style-guide alignment

- Restyled the homepage `Trailer` hero CTA to use `btn-combo-17` from the style guide Complimentary Combos set for visual parity with documented button recipes.
- Converted the hero supporting line to white `styledh1` treatment and split the copy into two explicit lines: “Learn the psychology” / “of real connection.”
- Rebuilt compiled CSS via the standard GitHub Pages pipeline (`npm run build:site`) so deployment assets stay in sync with source SCSS updates.

## 2026-04-09 — Homepage hero visual polish

- Removed the heavy hero fade overlays and replaced them with a subtle vignette so the hero image stays crisp while maintaining depth.
- Increased top spacing above the hero media, enlarged hero support text, tightened line spacing, and locked “of real connection” to the second line.
- Updated button icon inheritance so icons now always match each button’s text color tokens across CTA variants.

## 2026-04-09 — Hero motion + readability pass

- Increased homepage hero subtitle scale and added a soft black glow lift so supporting copy stays visible over mixed-image regions.
- Added a subtle hero background vignette treatment and fixed-attachment behavior on desktop, with mobile/reduced-motion fallback to standard scroll behavior.
- Added scroll-linked hero image zoom easing plus desktop-only section snap scrolling on the homepage for smoother transitions between story blocks.
