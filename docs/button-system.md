# Button System Overview

The author platform now exposes a centralized button system defined in `scss/components/_buttons.scss`. Buttons share a structural mixin that applies layout, animation, and accessibility treatments while variants configure theme-specific tokens through CSS custom properties.

## Structure

All buttons include the `.btn` base class (or reuse the `button-base` mixin) which provides:

- Inline-flex layout with customizable gaps, padding, border radius, and font weight through `--btn-*` variables.
- Flat, pill-shaped surfaces that default to lime with no drop shadow so the label color stays crisp.
- Consistent focus-visible outline driven by the configured border color.
- Disabled handling and hover/focus transitions that respect the configured surfaces.

### Key CSS Custom Properties

| Variable                                                            | Purpose                               |
| ------------------------------------------------------------------- | ------------------------------------- |
| `--btn-bg` / `--btn-hover-bg`                                       | Background surface (flat by default). |
| `--btn-color` / `--btn-hover-color`                                 | Text/icon color.                      |
| `--btn-border-width` / `--btn-border-color`                         | Border styling.                       |
| `--btn-radius`                                                      | Corner radius (defaults to pill).     |
| `--btn-padding-x`, `--btn-padding-y`                                | Horizontal and vertical padding.      |
| `--btn-font-weight`, `--btn-letter-spacing`, `--btn-text-transform` | Typography controls.                  |
| `--btn-font-size`, `--btn-line-height`, `--btn-min-height`          | Type scale and vertical rhythm.       |
| `--btn-shadow` / `--btn-hover-shadow`                               | Elevation controls (opt-in).          |
| `--btn-transition`                                                  | Timing function for hover/focus.      |
| `--btn-gap`                                                         | Spacing between label and icons.      |

The defaults for those variables live in `scss/base/_variables.scss` (`$btn-*-default`) so every call to `@include button-base` inherits the same padding, font sizing, transition speed, and min-height even outside of `.btn`. Override them with modifier classes or inline styles when you need to tighten a density without rebuilding structure rules.

Override these variables at the component level or via modifier classes to tweak presentation without duplicating layout code.

### Brand scope & opt-outs

The button system only attaches to author-facing and Game On! experiences. Any page whose `<body>` **does not** carry the `brand-exempt` class automatically picks up `.btn` styling, CTA helpers, and the size utilities. To keep experimental zones untouched (e.g., Labs, Emergency 911, or future microsites), add `brand-exempt` to the `<body>` element so their local button rules remain in control.

## Variants

`$btn-variants` generates solid button themes: `primary` (lime), `forest` (deep green), `charcoal` (dark neutral), `mint` (soft secondary), and `outline` (bordered lime). Legacy class names—`accent`, `secondary`, `contrast`, and `neutral`—alias those same themes so existing pages keep working while adopting the refreshed styling. Additional modifiers—`btn--ghost`, `btn--subtle`, icon buttons, nav controls, auth buttons, and grayscale utilities—are composed on top of the same mixins so every button responds uniformly to focus, hover, and disabled states.

### Size & feel modifiers

- `.btn--block`: full-width buttons.
- `.btn--flat`: removes shadows and tightens transitions for ultra-flat looks (mirrors the screenshot shared).
- `.btn--xs`, `.btn--sm`, `.btn--md`, `.btn--lg`, `.btn--xl`: size ramp that synchronizes font size, padding, min-height, and label/icon gaps.
- `.btn-xs`, `.btn-sm`, `.btn-md`, `.btn-lg`, `.btn-xl`: legacy utility aliases that now set the same CSS variables as the modifiers above for backwards compatibility.
- Icon-focused buttons set padding variables to `0` for round footprints.
- CTA variants override `--btn-padding-x` for long labels.

### Pill defaults & typography

Buttons now round to a pill by default (`$border-radius-pill`) and zero out `letter-spacing` so the label reads naturally even on lime backgrounds. Adjust `--btn-letter-spacing` or `--btn-radius` per instance if you need a squarer badge or microtracking.

### Density defaults

Each button starts with a `--btn-min-height` of `2.75rem`, a `--btn-gap` of `0.5rem`, and a `--btn-font-size` of `1rem` defined in the shared `$btn-*-default` tokens to keep controls balanced across templates. Apply a size modifier when you need compact pill links (`.btn--xs` / `.btn--sm`) or oversized hero CTAs (`.btn--lg` / `.btn--xl`) without manually recalculating padding or icon spacing.

### Bold Variants

The `bold-variant` mixin now extends each button selector to provide `-b` classes (`.btn--primary-b`, `.btn-contrast-b`, etc.) that only adjust `--btn-font-weight`. This ensures weight changes inherit all other tokenized styles.

## Reusing the System Elsewhere

Use the `button-base` mixin directly when styling CTA components or legacy buttons:

```scss
.my-custom-button {
  @include button-base(
    $deep-green,
    $white,
    color-mix(in srgb, #{$deep-green} 84%, white),
    $white,
    1px,
    color-mix(in srgb, #{$deep-green} 35%, transparent),
    none
  );
  --btn-padding-y: #{$spacing-xxs};
  --btn-padding-x: #{$spacing-md};
}
```

Because the mixin writes to CSS variables first, you can adjust any `--btn-*` property within the selector or from a parent theme wrapper to align with campaign-specific palettes.

## Implementation Notes

- Hover and press states pick up `--btn-hover-shadow` if you opt into elevation.
- All hover/focus states leverage the same motion easing defined by `$transition`.
- The system assumes dark-mode-first palettes (per platform directive) while still supporting light-surface tokens via custom properties.

## Visual Gallery

- Open [`docs/buttons-demo.html`](./buttons-demo.html) in a browser to explore every variant, bold modifier, and icon control rendered with the production CSS bundle.
- Capture new screenshots for design reviews directly from that page; it renders on a dark surface by default to respect the platform directive.

## Why Button Links Looked Gray

Anchored buttons inherit the site-wide link styling defined in `scss/base/_typography.scss`. Historically that rule colored every `<a>` element with `var(--color-muted)`, which turned lime CTAs into dull gray text. The fix now lives inside the brand scope (`body:not(.brand-exempt) a:is(.btn, .btn-b, [class*='btn--'])`), so author/Game On! buttons inherit their configured tokens while brand-exempt properties (Labs, 911, etc.) keep their local hyperlink treatments.

## Quick Color Customization

1. Open `scss/components/_buttons.scss` and locate the `$primary-variant`, `$forest-variant`, `$charcoal-variant`, `$mint-variant`, or `$outline-variant` maps (aliases feed the legacy class names automatically).
2. Update the `bg`, `text`, and (optionally) `hover-bg` / `hover-text` entries for the theme you want to adjust. Use token variables from `scss/tokens/_colors.scss` for consistency.
3. Run `npm run build` to lint the variant map and regenerate `assets/styles.css`.
4. Review the change in [`docs/buttons-demo.html`](./buttons-demo.html) or any page consuming the updated class.

> Need to override a single CTA? Apply inline CSS variables such as `style="--btn-bg: #ffb703; --btn-color: #081c15"` on the button element to avoid creating a brand new modifier.

### Fastest color tweak

Want to try a new palette in seconds? Add `style="--btn-bg: #hex; --btn-color: #hex"` directly to a button in the CMS, refresh the page, and, once you're happy, promote that combination into the variant maps above for reuse.

## Automated Guardrail

`npm run lint:buttons` now parses the `$btn-variants` map and fails the build if a variant is missing explicit `bg` or `text` tokens. The script runs automatically inside `npm run build`, ensuring future edits cannot accidentally fall back to muted link colors again.

Refer to `docs/style-guide.html` for additional interactive previews that consume the unified button styling.
