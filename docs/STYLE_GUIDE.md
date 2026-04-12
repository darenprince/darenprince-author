# 🎨 Unified Style Guide & Component Library

_Last updated: 2026-04-12_

This is the single source of truth for design tokens, components, CTA behavior, container styling, navigation rules, and release readiness for the Daren Prince site.

## 1) Core visual system

### Color + themes

- Token source: `scss/tokens/_css-vars.scss` and `scss/tokens/_colors.scss`.
- Dark mode is default.
- Dark backgrounds should remain charcoal/black-forward (minimal green tint).
- Light theme remains optional and token-driven.

### Typography

- Base stack: Helvetica Neue / Arial.
- Headline utility `.styledh1` supports variable-font fallback (`InterVariable`, `Inter`) with weight-axis settings.
- Split headline system for major headings:
  - `.brand-heading`
  - `.brand-heading__emphasis` (green text only)
  - `.brand-heading__base` (white text)

## 2) Heading rules (critical)

### Large headline usage

Use split-heading markup for hero and section headlines. **Do not put pill containers on H1/H2 hero headline lines.**

### Small-title pill usage (new standard)

Use pill containers only for small labels / eyebrow text:

- `.section-kicker`
- `.section-kicker--green`
- `.section-kicker--white`
- `.section-kicker--combo`
- `.section-kicker--charcoal-lime`
- `.section-kicker--black-gray`

Allowed: compact labels, metadata tags, section micro-titles.
Not allowed: page/hero headline text.

## 3) Buttons + CTAs

- Base button system lives in `scss/components/_buttons.scss` via `button-base` mixin.
- All CTA buttons must include a Phosphor icon (no emoji glyphs):
  - Preferred: explicit `<i>` or `<svg>` in markup.
  - Fallback: auto icon decoration on key CTA variants.
- Compact dismiss action standard: `.close-pill-btn` (small black circle with white `x` icon).
- Deprecated (do not use): low-contrast line/outline CTA styles with white text that reduce readability.
- Outline variants must maintain clear text/icon contrast.

## 4) Containers, cards, and stroke treatment

Use iOS-glass-inspired ultra-thin stroke treatment:

- Prefer `box-shadow: inset 0 0 0 0.5px ...` over visible heavy borders.
- Keep ambient outer shadow subtle and layered.
- Applies to cards, nav containers, dropdowns, and framed sections.

## 5) Navigation + menus

- No production `href="#"` placeholders in mega menus or primary navigation.
- Social/menu icons must include `aria-label`.
- Header top bar should preserve charcoal-black identity, not green-tinted black.

## 6) Books page polish standards

- Ensure balanced vertical spacing around book images and supporting copy.
- Book card title + summary + CTA stack should keep consistent rhythm.
- CTA row in each card should include icons and remain legible at mobile sizes.
- Book listing cards should use subtle style variations by title/theme (background gradients and kicker color pairings).
- Listing animations should begin and settle in the flatter resting pose for more stable readability.

## 7) GitHub Pages deployment baseline

- Deployment target: GitHub Pages.
- Use `npm run deploy:github-pages` for release pipeline.
- Preserve path-prefix compatibility (`data-site-root` + prefix bootstrap behavior).

## 8) SEO / metadata / sharing assets

Each production page should include:

- Title + meta description + canonical.
- Open Graph title/description/image.
- Twitter card metadata and image.
- Generated favicon/touch assets from `/assets/icons/generated/`.

## 9) Unified component reference (authoring map)

- Layout: `scss/layout/` (`_header.scss`, `_nav.scss`, `_footer.scss`, `_grid.scss`).
- Core components: `scss/components/` (`_buttons.scss`, `_forms.scss`, `_cards.scss`, `_modals.scss`, `_alerts.scss`, `_icons.scss`).
- Storytelling modules: `_hero.scss`, `_banner.scss`, `_testimonials.scss`, `_downloads.scss`, `_viewer.scss`.
- Book stack: `_book.scss`, `_book-3d.scss`, `_book-toolbar.scss`, `_book-tabs.scss`, `_book-details-wrapper.scss`.
- Utility system: `scss/utilities/_helpers.scss`, `scss/utilities/_gradients.scss`.

## 10) Remediation plan for site-wide consistency

1. **Foundation pass**: normalize dark surfaces + token cleanup.
2. **Stroke pass**: replace heavy borders with ultra-thin glass shadows.
3. **Heading pass**: move pill treatment to small labels only.
4. **CTA pass**: enforce icon CTAs and remove low-contrast styles.
5. **Navigation pass**: remove placeholder links and verify mega-menu targets.
6. **Page polish pass**: fix spacing inconsistencies (books, cards, forms, menus).
7. **Release hardening**: lint, build, test, and metadata/social QA for GitHub Pages.

## 11) Engineering checklist

- [ ] Token updates made in `scss/tokens/` before component edits.
- [ ] New component styles imported by `scss/styles.scss`.
- [ ] Headline hierarchy and kicker usage validated.
- [ ] CTA contrast + icon presence validated.
- [ ] No placeholder links in nav/menus/footers.
- [ ] Build/test checks run before commit.
