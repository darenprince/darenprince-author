# VoxVector Visual Design System

## Status

Active implementation baseline for the public React application at `/voxvector/` and the authenticated Developer Console.

## Design objective

VoxVector should look like a serious analytical product, not a generic AI landing page. The visual system prioritizes evidence, signal structure, readability, hierarchy and restraint.

The current visual anchor combines the supplied Shadcnblocks neutral system with the supplied luxury reference. The foundation is absolute black, near black, white and quiet gray. Warm coffee, copper and tan tones are reserved for primary actions, signal emphasis and selected analytical details.

## Theme model

Light and dark themes are first class application states and persist through `localStorage` using the `voxvector-theme` key.

Dark mode uses near black analytical surfaces with white hierarchy and restrained warm accents.

Light mode uses a white canvas, near black typography, soft gray surfaces and the same restrained warm accents.

The theme control is available on the public landing experience and in the Developer Console. Theme changes are stateful and do not depend on browser preference after the user makes a selection.

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

Semantic green, amber and red may communicate system state where required. They are not decorative brand colors.

## Gradients and depth

Gradients are environmental lighting, not decoration. They should remain subtle enough that the interface still reads correctly with gradients disabled.

Use small directional surface gradients, faint radial warm glows and quiet tonal changes between black or white surfaces. Never use large saturated gradients as card fills.

## Typography

The public landing page uses Inter with system fallbacks.

Minimum intended body copy is 16px. Supporting copy should normally be 14px or larger. Navigation should normally be 14px. Section labels may be smaller when they function as metadata rather than reading content.

Primary headings use large responsive type with tight display leading. Body copy uses generous line height and a constrained measure. Text must remain readable at 200 percent resize and should not depend on low contrast or tiny metadata for essential meaning.

WCAG 2.2 requires normal text to meet at least 4.5:1 contrast and supports text resizing to 200 percent without loss of content or functionality.

## Layout principles

1. Use a strong editorial grid rather than stacking equal cards.
2. Give the hero a clear reading path: product identity, headline, proposition, action, scientific boundary, then visual evidence surface.
3. Use full width separators and open sections to create hierarchy.
4. Prefer rows, columns and whitespace over nested rounded containers.
5. Feature icons should often stand alone at 40 to 52px rather than being trapped in small square wrappers.
6. Use large section headings and readable supporting copy so the page can be scanned without zooming.
7. Keep calls to action visually distinct but limited.
8. Alternate dense analytical sections with quiet editorial sections.
9. Mobile layouts must preserve the same hierarchy instead of simply shrinking desktop cards.

## Component system

The frontend uses a product owned shadcn style component system with Base UI headless primitives, Tremor React analytical components, Tailwind CSS, Lucide React and Motion for React.

Shared application owned primitives include Button, Badge, Card, Sheet and ThemeToggle. Components are intentionally small and composable so the product controls its own visual language rather than depending on a hosted design platform.

Tremor is the primary analytical block system for charts, progress indicators and analytical cards. It should be used directly where a Tremor component is appropriate rather than recreating equivalent chart primitives.

## Navigation and responsive behavior

Desktop authenticated views use a persistent sidebar. Mobile authenticated views use an animated slide out Sheet navigation with an accessible overlay and close control.

The public landing page retains its editorial navigation hierarchy and exposes the same persistent light and dark theme state.

## Audio visualization rules

Landing page visualizations are interface illustrations, not production telemetry.

The primary signal illustration uses a dense bar based speech waveform with irregular amplitude envelopes, phrase structure, explicit silence gaps and multi frequency variation. It is designed to read like an audio signal rather than a generic graph or decorative line.

Tremor `AreaChart` components are used for secondary analytical relationships where a chart is appropriate. They are explicitly labeled as illustrative and must never be presented as real subject measurements.

Do not display fabricated deception scores, confidence percentages, live processing percentages, request counts or scientific performance numbers on the public landing page.

## Iconography

Lucide React is the canonical icon system. Icons should use consistent stroke weight and should be large enough to function as visual anchors. Where an icon communicates a primary feature, remove the decorative wrapper and let the icon occupy the layout directly.

## Motion

Motion for React is used for entrance, navigation and interaction refinement. API activity animation belongs in the Developer Console and must follow actual query or mutation state.

All motion must respect `prefers-reduced-motion`.

## Surfaces and strokes

Strokes are intentionally quiet. Default borders should be low contrast and thin. Strong borders are reserved for focused controls, active states and buttons.

Avoid heavy white framing, excessive glass effects and large decorative gradients. Rounded corners should be restrained and purposeful rather than applied to every block.

## Scientific communication

The public page must distinguish product objective from current capability. Current runtime language should identify the system as an observational analysis foundation and should not imply scientifically validated deception inference.

The interface should emphasize observations, reliability, evidence convergence and conflict, uncertainty, alternative explanations, abstention and provenance.

## Accessibility baseline

The public experience targets WCAG 2.2 AA practices including readable text, sufficient contrast, visible focus states, keyboard access, reduced motion and mobile reflow.

The design does not rely on color alone to communicate important state.

## Review rule

A visually polished section is not considered complete if its underlying interaction, data behavior, accessibility or scientific wording is misleading. Visual quality and functional honesty are both acceptance criteria.
