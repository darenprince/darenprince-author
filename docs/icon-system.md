# Phosphor Icon System

Phosphor Icons are the single, shared icon language for all Crown brands and sites. Do **not** ship custom icon fonts or bespoke SVGs unless the icon is part of a logo/brand mark. Keep UI glyphs consistent by using the Phosphor webfont and the `ph` class naming convention everywhere.

## Install (webfont)

Include the Phosphor webfont stylesheet in every page template:

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.2/src/regular/style.css" />
```

## Usage

Use the base `ph` class plus the icon name. Prefer the `regular` weight unless a brand requires a heavier visual tone.

```html
<i class="ph ph-house" aria-hidden="true"></i>
<i class="ph ph-magnifying-glass" aria-hidden="true"></i>
<button class="icon-btn" aria-label="Search">
  <i class="ph ph-magnifying-glass" aria-hidden="true"></i>
</button>
```

### Accessibility

- Decorative icons: add `aria-hidden="true"` and keep text labels in the UI.
- Icon-only buttons: add a descriptive `aria-label` to the button.

## Brand theming & overrides

Icon color and hover states should be controlled by SCSS tokens. If a brand needs a distinct icon treatment, apply a scoped wrapper and override the color or glow only within that brand container.

```scss
.brand-game-on {
  .ph {
    color: var(--color-icon-gameon);
  }
}
```

Avoid modifying icon markup to achieve brand differences; keep it purely in CSS.

## Standard UI mappings

Use this mapping to keep navigation and core UI consistent across all Crown surfaces:

| Purpose              | Phosphor icon         |
| -------------------- | --------------------- |
| Home                 | `ph-house`            |
| Books                | `ph-book`             |
| Meet Daren / Profile | `ph-user`             |
| Media / Press        | `ph-camera`           |
| Swag / Shop          | `ph-t-shirt`          |
| Blog / News          | `ph-newspaper`        |
| Collabs              | `ph-user-plus`        |
| Support              | `ph-hand-heart`       |
| Developers           | `ph-gear`             |
| Contact              | `ph-envelope`         |
| Search               | `ph-magnifying-glass` |
| Menu                 | `ph-list`             |
| Close                | `ph-x`                |
| Play                 | `ph-play-circle`      |
| Volume On            | `ph-speaker-high`     |
| Volume Off           | `ph-speaker-slash`    |

If an icon is not listed here, select the closest matching Phosphor glyph and update this table.
