# 🗒️ Documentation Sync Changelog

> Tracks documentation updates made during the 2025-02-14 audit.

## 2026-04-18 — Homepage mobile format stack hotfix + branded app metadata titles (GitHub Pages-safe)

- Fixed the homepage format-selector layout regression on mobile by forcing `.book-primary-layout .book-experience` to render as a vertical stack (instead of a horizontal flex row), restoring readable copy/button flow and preventing the image rail from pinching into a narrow side column in iOS Safari.
- Added spacing/stretch constraints for the same stack in `scss/components/_book-details-wrapper.scss` so controls, accordion content, and hero media remain full-width and scroll naturally on small screens while preserving desktop alignment.
- Updated homepage browser-app metadata labels in `index.html` (`application-name` + `apple-mobile-web-app-title`) from Crown Labs to Daren Prince branding so installable/browser chrome naming matches the live author site identity.
- Rebuilt deployable CSS (`assets/styles.css`) with `npm run styles:build` to keep committed GitHub Pages output synchronized with SCSS source changes.

## 2026-04-18 — Index accordion relocation + mobile vertical rail behavior fixes (GitHub Pages-safe)

- Moved the homepage long-form book details accordion stack directly below the format-selection controls in `index.html` so description/details now appear immediately after format choice.
- Set long-form accordion sections to start collapsed by default and refreshed accordion styling in `scss/components/_book-details-wrapper.scss` with a cleaner modern dark-glass treatment while removing visible heavy outer strokes.
- Updated featured-books rail touch ergonomics (`scss/components/_book-details-wrapper.scss`) to better allow vertical page scrolling on mobile when interacting with cards in the index featured rail.
- Added a mobile-focused vertical rail treatment for `book.html` listing cards via `scss/components/_book-details-wrapper.scss` and prevented desktop section snap scripting from hijacking mobile gestures in `js/book-page.js`.
- Rebuilt `assets/styles.css` via `npm run styles:build` so static GitHub Pages deploy output matches source changes.

## 2026-04-18 — Homepage format selector unwrap + centered heading + subtle 3D overlay trigger

- Removed the old outer wrapper card around the homepage format selector stack in `index.html` so the heading, format pills, and image now render as direct section content (no extra enclosing card shell).
- Center-aligned the `PICK YOUR FORMAT / YOUR MOVE / SELECT A FORMAT` heading treatment and moved the `3D view` trigger onto the top-right corner of the format image using a lighter, less aggressive overlay style.
- Replaced the image-based 3D trigger icon with a Phosphor library icon (`ph-cube-focus`) so the control uses the shared icon system and remains consistent across themes.
- Synced style behavior in `scss/components/_book-details-wrapper.scss` and rebuilt deployable CSS (`assets/styles.css`) for GitHub Pages output parity.
- While running deploy checks, regenerated missing favicon outputs via `npm run generate:icons`, resolving metadata lint failures tied to missing `/assets/icons/generated/*` assets.

## 2026-04-18 — Homepage featured-rail deployment fix + metadata deploy checks (GitHub Pages-safe)

- Wired `index.html` to load `js/homepage-rail-enhancements.js` directly so featured-rail motion + modal interactions now execute in production (not just in source control).
- Added `scripts/check-deploy-metadata.mjs` and `npm run lint:metadata` to enforce deploy-ready favicon, Apple icon, OG image, Twitter image, and `theme-color` tags across key public pages before build/deploy.
- Updated build/documentation guidance (`README.md`, `docs/BUILD_PIPELINE.md`) so GitHub Pages deployment explicitly includes metadata/social-asset validation and branded browser-chrome requirements.

## 2026-04-18 — Homepage featured books rail background refresh + heading spacing polish (GitHub Pages-safe)

- Updated featured books rail styling in `scss/components/_book-details-wrapper.scss` to layer the requested production background image (`/assets/images/sitebg/cbad6b12cb5c4ba29d1a55a3f2685a6a.jpg`) beneath the section overlays for the homepage index rail.
- Increased top padding on the featured books shell so the `FEATURED & UPCOMING / BY DAREN PRINCE` heading has clearer breathing room above it.
- Synced `assets/styles.css` with the same featured-rail background + spacing updates so the change is deploy-ready for GitHub Pages static hosting.

## 2026-04-18 — Featured rail full-bleed + tighter section snapping refinements (GitHub Pages-safe)

- Updated homepage rail behavior (`js/main.js`) so the featured books shell/strip runs full-bleed to the viewport edges instead of staying constrained inside the previous centered max-width container.
- Refined homepage mobile section snap motion (`js/homepage-rail-enhancements.js`) with a wider 40% section-break capture zone, lower-friction smooth snap timing, and a subtle two-step bounce settle.
- Added tighter book listing snap control on `book.html` via `js/book-page.js`, making section transitions feel more like a guided vertical rail with reduced overscroll play and better section anchoring.

## 2026-04-16 — Homepage featured rail upcoming spine + books-card iOS radius + hero image preloader (GitHub Pages-safe)

- Updated `index.html` featured rail copy and structure to:
  - add an offset “coming soon” spine card ahead of the first featured title,
  - change the heading treatment to `FEATURED & UPCOMING BOOKS` + `BY DAREN PRINCE`,
  - and style the CTA copy as “explore” (white) + “the books” (green) with staggered reveal styling.
- Updated `scss/components/_book-details-wrapper.scss` for:
  - square-cropped cover images with rounded corners (featured rail + books listing covers + format hero image),
  - stronger iOS-like rounded card radii on `book.html` listing containers,
  - and stricter vertical snapping behavior while scrolling books-page sections/cards.
- Added a hero-image-local preloader layer and title-art float/zoom motion polish on the index hero using `index.html`, `scss/components/_hero.scss`, and `js/hero-auto-zoom.js` so the hero media presents cleanly until image load completes.
- Rebuilt deployable stylesheet artifacts with `npm run styles:build` so GitHub Pages serves the updated visual system without runtime build dependencies.

## 2026-04-15 — Books cards padding + responsive flex grid + detail modal + connect CTA (GitHub Pages-safe)

- Updated `book.html` collection card markup to add explicit **View details** triggers, click/tap cover-to-open interactions, and a new bottom “Stay connected” section with CTA + mailing list form.
- Added a new full-screen-on-mobile books detail modal template in `book.html` (Apple Books-inspired rail/card feel) with front/back cover thumbnail switching and CTA actions cloned from each card state.
- Refined books page styles in `scss/components/_book-details-wrapper.scss` for larger card padding, expanded title/description rhythm, responsive flex behavior (1-up mobile, 2-up tablet, 3-up desktop), connect-section presentation, and modal surface polish.
- Updated `js/book-page.js` to power modal open/close behavior, dynamic content injection from each book card, front/back cover swapping, and notify fallback action wiring.
- Rebuilt deployable stylesheet artifacts with `npm run styles:build` so GitHub Pages serves the updated books experience without runtime dependencies.

## 2026-04-15 — Homepage rail centering + format selector flow + login routing fix (GitHub Pages-safe)

- Updated `index.html` featured books strip to use style-guide heading treatment, centered card content, and rail spacer cards so swipe snapping centers each title in the viewport.
- Reordered homepage format selector controls so CTA format buttons render directly beneath “Select a format,” then the hero image below, matching the requested conversion flow.
- Removed the extra compact-toggle control from the landing-page 3D toolbar UI and restored rounded lower corners + top border continuity for the format selection container pair.
- Fixed login action routing in `js/main.js` to use the GitHub Pages-aware asset prefix helper (`prefixedPath('/login.html')`) so login works correctly on project-subpath deployments.
- Renamed all visible `F*CK Codependency Terminated.` references to `F*CK Codependency` across homepage/books content and related cover metadata to keep naming consistent site-wide.

## 2026-04-14 — Homepage conversion rail merge + featured books swiper + metadata/nav cleanup (GitHub Pages-safe)

- Updated `index.html` so format-selection heading/buttons now live inside the same hero media card as the dynamic format image, reducing split attention and improving conversion flow.
- Added a new touch-swipable featured books strip on the homepage that links directly to `book.html` anchor sections (`#book-rooted`, `#book-too-much`, etc.) using the same cover assets as the books collection.
- Removed stale mega-menu links for **Collabs** and **Developers** across public HTML surfaces to keep navigation aligned with live destinations.
- Refreshed homepage metadata/social footprint (robots directives, Twitter site/creator tags, and expanded JSON-LD `sameAs`) while preserving GitHub Pages static compatibility.
- Removed the broken `components.html` reference to `/js/mobile-nav.js` to eliminate a known client-side 404.
- Rebuilt deployable artifacts via `npm run build:site` (including `assets/styles.css`, search docs/index JSON, generated icon assets, and image manifest) to keep GitHub Pages output synchronized.

## 2026-04-14 — Mega menu scroll fix + hero glass strip + grouped floating share/back-to-top controls (GitHub Pages-safe)

- Fixed excess dead-space scrolling at the bottom of the slide-in mega menu by tightening menu height/padding handling and constraining the decorative blur layer to menu bounds in `scss/style.scss`.
- Restored a share overlay control and refactored floating quick actions so share + back-to-top render together as a bottom-right grouped stack from `js/main.js` + `scss/base/_globals.scss`.
- Added a full-width dark glass strip behind hero copy/CTA content down to the bottom edge of the hero section in `scss/components/_hero.scss` to improve contrast while preserving background media.
- Kept all updates static-site compatible for GitHub Pages deployment and avoided Netlify-specific behavior.

## 2026-04-14 — Search page shell parity + section-divider alignment (GitHub Pages-safe)

- Refactored `pages/search.html` to use the same shared shell structure as `index.html` (`data-shared-header` + `data-shared-footer`) and restored the full mega-menu/link set with login action parity.
- Added missing shared UI script loading on search (`js/site-shell.js`, `js/profile-dropdown.js`, `js/theme-toggle.js`) so header toolbar, account controls, and login routing behavior match the homepage implementation.
- Normalized global divider inset math in `assets/styles.css` with a shared `--divider-inline-gutter` token so gradient section divider lines align consistently across section transitions.
- Kept deployment/static path behavior GitHub Pages compatible (`/assets`, `/js`, `/pages/search.html`) with no Netlify dependencies.

## 2026-04-13 — Shared shell refactor + search modal close motion (GitHub Pages-safe)

- Refactored core author-platform pages (`index.html`, `home.html`, `book.html`, `meet-daren-prince.html`, `contact.html`, and `login.html`) to mount shared header/footer snippets through `js/site-shell.js`, reducing drift in nav/search/login/footer markup across pages.
- Extended the shared shell rollout to `press.html` and `sitemap.html` so header/search/login/footer behavior stays centralized and consistent across more high-traffic pages.
- Updated header styles in `scss/layout/_header.scss` so the Daren Prince logo no longer compresses at tight widths.
- Enhanced the desktop search overlay close interaction in `js/main.js` + `scss/components/_search.scss` with a compact close control, stronger slide-up hide transition, and improved focus restoration after close.
- Preserved GitHub Pages deployment compatibility by keeping static paths and build-script expectations unchanged.

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
