# 🎨 Style Guide & Token Catalog

_Last updated: 2025-02-14_

This guide mirrors the design tokens, typography rules, utilities, and heading usage that actually compile from `scss/`. Treat it as the source of truth when adjusting visuals or reviewing brand compliance.

## Color system
### Core palette (CSS custom properties)
| Token | Value | Usage |
| --- | --- | --- |
| `--gray-50` | `#FDFDFD` | Light UI accents, gradient stops |
| `--gray-100` | `#D5D5D5` | Light surfaces, light theme backgrounds |
| `--gray-200` | `#B8BAB7` | Body copy on dark, secondary borders |
| `--gray-600` | `#313132` | Dark gradients, surface shading |
| `--gray-700` | `#2F2F2F` | Card backgrounds |
| `--gray-800` | `#212121` | Primary surface color in dark mode |
| `--gray-900` | `#161616` | Hero/footer gradients |
| `--brand-green-700` | `#456F3A` | Primary CTAs |
| `--brand-green-600` | `#6DA667` | CTA hover/focus |
| `--brand-green-500` | `#87BD72` | Highlights, accent text |
| `--brand-green-400` | `#8CD679` | Accent gradients |
| `--brand-green-200` | `#C2E9C1` | Light backgrounds |
| `--color-charcoal` | `#3B3C3B` | Neutral dark text |
| `--color-muted` | `#B8BAB7` | Paragraphs, muted labels |
| `--color-black` | `#070A06` | Headlines on light |
| `--color-white` | `#FDFDFD` | Headlines on dark |
| `--color-surface` | `#212121` | Dark container background |
| `--color-icon` | `#E6E6E6` | Icon strokes |
| `--color-border` | `rgba(255, 255, 255, 0.10)` | Card borders |
| `--color-accent` | `#8CD679` | Accent tags, icons |
| `--color-success` | `#87BD72` | Success alerts |
| `--color-danger` | `#e03131` | Error alerts |
| `--focus-ring` | `0 0 0 3px rgba(135,189,114,.35)` | Accessible focus halo |

See `scss/tokens/_css-vars.scss` for the full list of 77 tokens, including gradient presets for lemon-lime, charcoal-mint, and light container treatments.

### Theme overrides
`.theme-light` overrides the grayscale ramp, borders, and gradients for the optional light theme. Ensure `.theme-dark` remains the default root class.

### Sass bindings
`scss/tokens/_colors.scss` maps each CSS variable to a Sass variable so mixins and components inherit updates automatically.

> **Reality Check:** Modify tokens in `scss/tokens/_css-vars.scss` and rerun `npm run build`. Editing `assets/styles.css` directly will be overwritten on the next compile.

## Typography
### Typeface stack
- Base font: `'Helvetica Neue', Arial, sans-serif` for headings and body copy (`scss/base/_variables.scss`).
- Accent utility: `.styledh1` applies `'League Spartan', sans-serif` for hero statements, but the font is not bundled—load it via web fonts or accept Helvetica fallback.

### Scale & rhythm
| Element | Size | Notes |
| --- | --- | --- |
| `h1` | `2.25rem` | Bold 700 weight, 1.2 line height |
| `h2` | `1.75rem` | |
| `h3` | `1.5rem` | |
| `h4` | `1.25rem` | |
| `h5` | `1rem` | |
| `h6` | `0.875rem` | |
| Paragraph | Base line height `1.6`, `margin-bottom: 1rem` | |

Links default to the muted gray and transition to bright green on hover/focus.

### Spacing scale & motion
| Token | Value |
| --- | --- |
| `$spacing-xxs` | `0.25rem` |
| `$spacing-xs` | `0.5rem` |
| `$spacing-sm` | `0.75rem` |
| `$spacing-md` | `1rem` |
| `$spacing-lg` | `2rem` |
| `$spacing-xl` | `3rem` |
| `$border-radius` | `0.6875rem` |
| `$transition` | `all 0.2s ease-in-out` |

Breakpoints: `sm 480px`, `md 768px`, `lg 1024px`, `xl 1280px`. Use `@include respond-to(md)` for responsive adjustments.

## Utilities
Key helper classes from `scss/utilities/_helpers.scss`:
- `.flex`, `.items-center`, `.justify-between`, `.justify-center` — layout helpers.
- `.gap-sm`, `.gap-md`, `.spacing-y-*` — consistent spacing without inline styles.
- `.padding-*`, `.margin-bottom-*`, `.max-width-adaptive-lg` — section framing.
- `.text-center`, `.text-lg`, `.text-xxxl` — typographic tweaks.
- `.styledh1`, `.text-gradient-lime-deep`, `.text-gradient-gray-light` — hero typography treatments.
- `.btn-xs` → `.btn-xl`, `.btn-fw` — button sizing utilities.

`scss/utilities/_gradients.scss` provides `.grad-lemon-lime`, `.grad-charcoal-mint`, `.grad-light-container`, `.grad-dark-main`, and related classes for backgrounds.

## Heading usage audit
| Page | H1 treatment | Notes |
| --- | --- | --- |
| `index.html` | Hidden H1 (`style="display:none;"`) containing SEO title | Visual hero uses `.styledh1` on `<h3>` tags; expose a visible H1 for accessibility. |
| `book.html` | Hidden H1 for SEO | Format selector uses `.styledh1` on `<h3>`; add a visible H1 in the hero stack. |
| `All-heroes-demos.html` | Multiple visible H1 elements | Reduce to a single page-level H1 and cascade with H2/H3 for each demo. |
| `login.html` | Visible H1 “Member Login” | Aligns with the scale. |
| `dashboard.html` | No H1; topmost heading is `.greeting` (`h3`) | Add a dashboard-level H1 for semantic structure. |
| `admin-dashboard.html` | Visible H1 “Operator Command Center” | Correct structure. |
| `press.html` | Visible H1 “Press & Media Resources” | Matches brand tone. |
| `contact.html` | Visible H1 “Let’s Talk About It” | Uses spacing utilities. |
| `member/index.html` | Visible H1 “Member Dashboard” | Prototype only; lacks auth guard. |

> **Reality Check:** Brand guidance expects a visible, singular H1 per page. Update hidden or duplicate headings before major launches.

## Buttons & CTAs
- Generated via `@include button-base($bg, $text, $hover)` from `scss/base/_mixins.scss`.
- Primary CTA palette: `$deep-green` → `$medium-green` gradient.
- Secondary/light containers: `.grad-light-container` background with `.btn-md` sizing.
- Outline approach: wrap content in `.container--border` and use `.btn-outline` modifiers.
- Hero video controls share the CTA system: `.hero-mute-btn` uses the gradient attention pulse, `.hero-video-btn` / `.hero-video-icon-btn` rely on the same rounded geometry with glass overlays from `_hero.scss`.

## Forms & Inputs
- Forms leverage `scss/components/_forms.scss` and `_login.scss` for dark-mode inputs, inset shadows, and focus rings.
- Password strength meter from `scss/components/_password-strength.scss` pairs with `js/password-strength.js` for live validation.

## Reality checks & guardrails
> **Reality Check:** When introducing new gradients or spacers, add tokens first (`scss/tokens/_css-vars.scss` → `_colors.scss`) before referencing them in components.

> **Reality Check:** `.styledh1` assumes League Spartan is available. Include the font via Google Fonts or self-hosting if you rely on that look in production.

## Implementation checklist
- [ ] Add or update tokens in `scss/tokens/_css-vars.scss` and import them in `scss/tokens/_colors.scss`.
- [ ] Document any new component styles in `docs/UI_COMPONENTS.md`.
- [ ] Audit heading hierarchy whenever a new page is introduced.
