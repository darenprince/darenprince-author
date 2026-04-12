# 🗒️ Documentation Sync Changelog

> Tracks documentation updates made during the 2025-02-14 audit.

## 2026-04-12 — Books page cleanup + global top-nav share control (GitHub Pages-safe)

- Removed the redundant books collection intro block and in-hero share button from `book.html` so the page flows directly from hero CTA into listings.
- Updated `js/main.js` to inject a top-nav share icon (`.js-share-trigger`) on every page that has the standard header nav button group, keeping native share/copy fallback behavior centralized.
- Refined books cover presentation in `scss/components/_book-details-wrapper.scss` with a subtle transparent gray diagonal gradient backing, a light stroke frame, and reduced image corner radius for cleaner 3D card polish.
- Fixed mega-menu divider noise by suppressing the divider on the logout list row in `scss/style.scss`.
- Increased global back-to-top button size slightly in `scss/base/_globals.scss`.
- Recompiled deployable stylesheet artifacts (`assets/styles.css` + sourcemap) via `npm run build:site` so GitHub Pages serves the latest visual/menu updates.

## 2026-04-12 — Global spacing/padding breathing room pass (GitHub Pages-safe)

- Expanded global section/container vertical rhythm in `scss/base/_globals.scss` with responsive padding and stack utilities so content blocks no longer feel cramped.
- Increased paragraph spacing/line-height in `scss/base/_typography.scss` and expanded card interior spacing in `scss/components/_cards.scss` for improved readability.
- Refined `scss/components/_book-tabs.scss` tab/nav/toggle/table spacing and sticky purchase bar padding to reduce crowding across controls and panel content.
- Recompiled deployable stylesheet artifacts (`assets/styles.css` + sourcemap) via `npm run build:site` so GitHub Pages serves the updated spacing system.

## 2026-04-12 — Style guide spacing, gradient parity, and format selector card flow (GitHub Pages-safe)

- Tightened `docs/style-guide.html` spacing rhythm around section kickers/full-bleed demos, reduced code-block card font sizing, and restored the dark charcoal full-width gradient treatment (green background tint removed).
- Updated gradient utility behavior so `.btn.grad-*` classes now drive button token variables directly, restoring named gradient visuals in the style guide instead of flattened green fills.
- Refined the homepage format selector module styling to feel modern and cohesive: card stack now joins flush with shared edge corners, and format option controls now use elevated dark-gradient treatments with stronger hover/focus states.
- Recompiled deployable CSS artifacts (`assets/styles.css` + sourcemap) via `npm run build:site` so GitHub Pages serves the latest visual system changes.

## 2026-04-12 — Books listing de-containerization + kicker vertical rhythm cleanup (GitHub Pages-safe)

- Updated `book.html` books collection markup so listings render directly on the page background (no panel/container card shells) while preserving section hierarchy and CTA functionality.
- Refined books listing styling in `scss/components/_book-details-wrapper.scss` to a single-column editorial flow with subtle divider lines between entries instead of boxed cards.
- Tightened top/bottom vertical padding around books-page section kickers for cleaner spacing consistency in hero, collection intro, and each listing entry.
- Recompiled static stylesheet artifacts via `npm run build:site` so GitHub Pages deploys the updated books-page layout exactly as authored.

## 2026-04-12 — Books page hero, cover assets, and motion polish (GitHub Pages-safe)

- Replaced `book.html` hero placeholder with the live all-books image (`IMG_0287.jpeg`), updated hero copy/CTA to “Explore books,” and added smooth-scroll targeting to the first listing card.
- Swapped all six books grid cover image sources to the new production image URLs provided for Rooted, Power of Choice, Game On, Unshakable, Too Much, and F\*ck Codependency.
- Added scroll + hover attention motion for each book card/cover and increased top/bottom spacing around the 3D cover listing block to improve rhythm/legibility.
- Applied pill-style green heading treatment updates for `brand-heading__emphasis` utility usage and restored the universal site background image treatment on `books/gameon.html`.
- Recompiled site styles via `npm run build:site` so `assets/styles.css` remains synchronized for GitHub Pages deployment.

## 2026-04-11 — Global section divider lines (GitHub Pages-safe)

- Added subtle horizontal separator lines between adjacent top-level `<section>` blocks inside `<main>` across public pages to match the requested visual rhythm.
- Scoped the behavior to primary content mains and excluded app-like layouts (`.console-main`, `.hero-section`, `.emergency-main`, `.not-found-page`) to avoid noisy nested UI dividers.
- Compiled updated stylesheet artifacts (`assets/styles.css` + sourcemap) through the existing GitHub Pages pipeline so deployment output remains in sync.

## 2026-04-11 — Books page simplification + hero image source update (GitHub Pages-safe)

- Simplified `book.html` by removing the embedded 3D viewer, toolbar controls, format selector, and accordion stack from the books overview page.
- Added a hero-image placeholder treatment in the books hero panel with top-aligned headline copy and a lower-third centered CTA.
- Refined books collection spacing and introduced visual gradient dividers between adjacent book cards for clearer section rhythm.
- Updated homepage hero background image source to `https://www.darenprince.com/IMG_4935.jpeg` in SCSS and rebuilt compiled CSS for GitHub Pages deployment parity.
- Re-generated the image manifest index (`assets/image-manifest.json`) to keep image indexing metadata current.

## 2026-04-09 — Navigation UX modernization + hero motion polish

- Refined header search UX with updated modal styling, quick-search chips, improved placeholders/labels, and polished mobile search bar controls.
- Upgraded member dropdown styling/behavior with icon-first actions and a guest-safe profile placeholder avatar icon.
- Added a global back-to-top circular arrow button, tuned hero tagline spacing + CTA alignment, and switched hero zoom behavior to a slow in/out loop suitable for GitHub Pages static deployment.

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
