# VoxVector Visual Design System

## Status

Active implementation baseline for the public React application at `/voxvector/` and the authenticated Developer Console.

## Design objective

VoxVector should look like a serious analytical product, not a generic AI landing page. The visual system prioritizes evidence, signal structure, readability, hierarchy, restraint and fast comprehension.

The foundation is absolute black, near black, white and quiet gray, with restrained warm tonal depth. Accent color is reserved for meaningful actions and system state rather than decoration.

## Theme model

Light and dark themes are first class application states and persist through `localStorage` using the `voxvector-theme` key.

Dark mode uses near black analytical surfaces with white hierarchy and restrained warm accents.

Light mode uses a white canvas, near black typography, soft gray surfaces and the same restrained warm accents.

## Core palette

### Dark

| Token | Value | Use |
|---|---|---|
| `vv-bg` | `#0A0A0A` | Primary page background |
| `vv-surface` | `#111111` | Major analytical surfaces |
| `vv-surface-2` | `#171717` | Secondary surfaces |
| `vv-panel` | `#0D0D0D` | Elevated panels and dense analysis areas |
| `vv-accent` | `#B97842` | Primary warm action accent |
| `vv-accent-bright` | `#D9A06B` | Highlight and active accent |
| `vv-gold` | `#C6A16B` | Editorial and analytical emphasis |
| `vv-text` | `#F5F5F5` | Primary text |
| `vv-muted` | `rgba(245,245,245,.56)` | Secondary copy |
| `vv-border` | `rgba(255,255,255,.09)` | Structural separation |
| `vv-border-strong` | `rgba(255,255,255,.18)` | Focus and elevated separation |

### Light

| Token | Value | Use |
|---|---|---|
| `vv-bg` | `#FFFFFF` | Primary page background |
| `vv-surface` | `#FAFAFA` | Major surfaces |
| `vv-surface-2` | `#F4F4F4` | Secondary surfaces |
| `vv-panel` | `#FFFFFF` | Elevated panels |
| `vv-accent` | `#8F5D35` | Primary warm action accent |
| `vv-accent-bright` | `#A86F3F` | Highlight and active accent |
| `vv-gold` | `#9B7848` | Editorial and analytical emphasis |
| `vv-text` | `#0A0A0A` | Primary text |
| `vv-muted` | `rgba(10,10,10,.56)` | Secondary copy |
| `vv-border` | `rgba(0,0,0,.085)` | Structural separation |
| `vv-border-strong` | `rgba(0,0,0,.16)` | Focus and elevated separation |

Semantic green, amber and red communicate system state where required. They are not decorative brand colors.

## Gradients and depth

Gradients are environmental lighting, not decoration. Surface gradients should normally shift only about 5–8% from the base surface. They should be directional, quiet and barely perceptible at a glance.

Use small directional surface gradients, faint radial warm glows and quiet tonal changes between black or white surfaces. Never use large saturated gradients as card fills.

## Typography

### Body and interface

**Inter** is the canonical typeface for all body copy, navigation, controls, labels, metadata and application UI. The implementation loads Inter from Google Fonts with system fallbacks.

Body copy is normally 16px or larger. Supporting copy is normally 14px or larger. Navigation is normally 14px. Utility metadata may be smaller when it is supplemental and never the sole carrier of essential meaning.

### Display and headings

**Cal Sans** is the canonical display face for hero headlines, page titles and section headings. Cal Sans is intentionally reserved for large hierarchy so its distinctive geometry remains a signal rather than visual noise.

Heading treatment uses tight display leading, optical kerning and controlled negative tracking. Heading text should remain sentence case unless a specific brand lockup requires another treatment.

### Typographic tuning

- Body line height: approximately `1.45–1.60` depending on measure.
- Display line height: approximately `0.96–1.05`.
- Display tracking: approximately `-0.03em` to `-0.04em`.
- Section heading tracking: approximately `-0.02em` to `-0.03em`.
- Navigation and controls use neutral casing and restrained positive tracking.
- Utility labels may use uppercase with generous tracking when they function as metadata.
- Use `font-kerning: normal`, `font-feature-settings` for standard kerning/ligatures and `text-wrap: balance` for major headings.

WCAG 2.2 requires normal text to meet at least 4.5:1 contrast and supports text resizing to 200 percent without loss of content or functionality.

## Navigation and responsive behavior

### Header

The primary public and Developer Console header target is **56px**. Header chrome should be compact enough to leave the application workspace visually dominant while retaining clear touch targets.

### Mobile menu

Mobile navigation uses a slide-out `Sheet` rather than an expanding inline block. The menu trigger uses a restrained two-line glyph. Open state uses an explicit X treatment and an accessible label.

The `Sheet` supports three intentional dismissal paths: selecting navigation, tapping the scrim, and swiping the panel horizontally. Swipe-to-close follows the direction from which the sheet entered and respects reduced-motion preferences.

### Desktop console

The Developer Console retains a persistent desktop sidebar. Mobile navigation uses the same compact sheet interaction model rather than maintaining a second competing navigation architecture.

## Component system

The frontend uses a product owned shadcn style component system with Base UI headless primitives, Tremor React analytical components, Tailwind CSS and Motion for React.

Shared application owned primitives include Button, Badge, Card, Sheet and ThemeToggle. Components are intentionally small and composable so the product controls its own visual language.

Tremor is used for analytical chart and data blocks where appropriate. Application-owned layout and typography remain the controlling visual layer.

## Iconography

**Streamline Sharp** is the canonical icon family for the VoxVector product experience. The Sharp collection is used for its geometric precision, high legibility and technical character.

The web implementation uses Iconify's on-demand `streamline-sharp` collection so only requested glyphs are resolved at runtime. The design source remains Streamline Sharp; the separate Streamline API is the authoritative route for licensed asset discovery, download and broader collection access.

Use the Line style for primary interface navigation and compact controls. Use Solid or Remix variants selectively where a stronger visual anchor is appropriate. Icons should normally be 16–20px in navigation and 18–24px for primary controls, with larger feature icons allowed where they function as visual anchors.

Do not mix unrelated icon families inside the same interaction cluster. Existing specialist visualizations may retain their own rendering primitives where an icon is part of the visualization itself, but shared application chrome should follow Sharp.

Streamline's free Sharp distribution is attribution based and permits commercial use according to its stated license. Asset provenance should be retained when downloaded or bundled directly.

## Surfaces and strokes

Strokes are intentionally quiet. Default borders should be low contrast and thin. Strong borders are reserved for focused controls, active states and buttons.

Avoid heavy white framing, excessive glass effects and large decorative gradients. Rounded corners should be restrained and purposeful rather than applied to every block.

Data surfaces may use a subtle 5–8% tonal shift to establish hierarchy. The shift must not overpower typography or analytical content.

## Layout principles

1. Use a strong editorial grid rather than stacking equal cards.
2. Give the hero a clear reading path: product identity, headline, proposition, action, visual evidence.
3. Use full-width separators and open sections to create hierarchy.
4. Prefer rows, columns and whitespace over nested rounded containers.
5. Feature icons may stand alone at 40–52px when they serve as visual anchors.
6. Use large section headings and readable supporting copy so the page can be scanned without zooming.
7. Keep calls to action visually distinct but limited.
8. Alternate dense analytical sections with quiet editorial sections.
9. Mobile layouts must preserve hierarchy rather than simply shrinking desktop cards.

## Audio visualization rules

Landing page visualizations are interface illustrations, not production telemetry.

The primary signal illustration uses a dense bar-based speech waveform with irregular amplitude envelopes, phrase structure, explicit silence gaps and multi-frequency variation. It is designed to read like an audio signal rather than a generic graph or decorative line.

Tremor `AreaChart` components are used for secondary analytical relationships where a chart is appropriate. They are explicitly labeled as illustrative and must never be presented as real subject measurements.

Do not display fabricated deception scores, confidence percentages, live processing percentages, request counts or scientific performance numbers on the public landing page.

## Motion

Motion for React is used for entrance, navigation and interaction refinement. API activity animation belongs in the Developer Console and must follow actual query or mutation state.

All motion must respect `prefers-reduced-motion`.

## Scientific communication

The public page must distinguish product objective from current capability. Internal implementation maturity and validation status belong in developer and validation documentation rather than being promoted into customer-facing visual clutter.

The interface should emphasize observations, reliability, evidence convergence and conflict, uncertainty, alternative explanations and provenance where those concepts are part of the relevant workflow.

## Accessibility baseline

The public experience targets WCAG 2.2 AA practices including readable text, sufficient contrast, visible focus states, keyboard access, reduced motion and mobile reflow.

The design does not rely on color alone to communicate important state.

## Review rule

A visually polished section is not considered complete if its underlying interaction, data behavior, accessibility or scientific wording is misleading. Visual quality and functional honesty are both acceptance criteria.



## Developer workflow tracker

The Case Workbench workflow tracker is a compact stateful navigation aid rather than another large dashboard card.

- Each step receives a subtle tonal background distinction from the surrounding console.
- The active step uses the restrained coffee/copper state with a subtle pulse.
- Completed prerequisite steps transition to a solid semantic green state.
- After a short dwell, the tracker contracts into a thin current-step rail to return vertical space to the workbench.
- Hover and keyboard focus expand the full tracker without introducing a separate control surface.
- Reduced-motion users retain the expanded readable state.
- Status values belong on the right edge of checks and workflow rows so labels and state metadata remain scannable as separate columns.
- Collapsed workbench sections communicate state through the chevron and structure rather than a redundant literal “Collapsed” label.
