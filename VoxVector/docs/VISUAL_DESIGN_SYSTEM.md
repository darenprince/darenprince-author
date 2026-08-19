# VoxVector Visual Design System

## Status

Active implementation baseline for the public React application at `/voxvector/`.

## Design objective

VoxVector should look like a serious analytical product, not a generic AI landing page. The visual system prioritizes evidence, signal structure, readability, hierarchy and restraint.

The current landing direction uses the supplied luxury reference as the visual anchor. The foundation is espresso black with warm brown, copper, muted amber and warm white accents. Cool blue and cyan are not the dominant public landing colors. Violet is not a dominant brand color.

## Core palette

| Token | Value | Use |
|---|---|---|
| `vv-bg` | `#120D08` | Primary page background |
| `vv-surface` | `#18110B` | Major analytical surfaces |
| `vv-surface-2` | `#21160F` | Section alternation |
| `vv-panel` | `#251911` | Elevated panels |
| `vv-accent` | `#B87845` | Primary action and structural accent |
| `vv-accent-bright` | `#E0B276` | Highlight and active analytical accent |
| `vv-gold` | `#D6A15F` | Editorial emphasis and metadata |
| `vv-text` | `#F6F0E7` | Primary text |
| `vv-muted` | `rgba(246,240,231,.56)` | Secondary copy |
| `vv-border` | `rgba(201,158,108,.18)` | Structural separation |
| `vv-border-strong` | `rgba(224,178,118,.34)` | Focus and elevated separation |

Semantic green, amber and red may communicate system state where required. They must not become decorative brand colors.

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

## Audio visualization rules

Landing page visualizations are interface illustrations, not production telemetry.

The primary signal illustration uses a dense bar based speech waveform with irregular amplitude envelopes, phrase structure, explicit silence gaps and multi frequency variation. It is designed to read like an audio signal rather than a generic graph or decorative line.

Tremor `AreaChart` components are used for secondary analytical relationships where a chart is appropriate. They are explicitly labeled as illustrative and must never be presented as real subject measurements.

Do not display fabricated deception scores, confidence percentages, live processing percentages, request counts or scientific performance numbers on the public landing page.

## Component system

The public landing page uses Tremor React as the primary analytical block system. shadcn style composition remains the product owned visual composition model. Base UI supplies headless interaction primitives for application controls. Lucide React supplies interface iconography. Motion for React supplies entrance and interaction animation.

The implementation should favor direct Tremor analytical components rather than recreating equivalent chart or dashboard blocks from scratch. Product specific styling belongs in VoxVector tokens and application owned composition layers.

## Iconography

Lucide React is the canonical icon system. Icons should use consistent stroke weight and should be large enough to function as visual anchors. Where an icon communicates a primary feature, remove the decorative wrapper and let the icon occupy the layout directly.

## Motion

Motion for React is used for entrance and interaction refinement. Landing page motion is decorative and state independent. API activity animation belongs in the Developer Console and must follow actual query or mutation state.

All motion must respect `prefers-reduced-motion`.

## Surfaces and borders

Use thin warm neutral borders and low contrast surfaces. Avoid heavy white framing, excessive glass effects and large decorative gradients. Rounded corners should be restrained and purposeful rather than applied to every block.

## Scientific communication

The public page must distinguish product objective from current capability. Current runtime language should identify the system as an observational analysis foundation and should not imply scientifically validated deception inference.

The interface should emphasize:

* observations
* reliability
* evidence convergence and conflict
* uncertainty
* alternative explanations
* abstention
* provenance

## Accessibility baseline

The public experience targets WCAG 2.2 AA practices including readable text, sufficient contrast, visible focus states, keyboard access, reduced motion and mobile reflow.

The design does not rely on color alone to communicate important state.

## Review rule

A visually polished section is not considered complete if its underlying interaction, data behavior, accessibility or scientific wording is misleading. Visual quality and functional honesty are both acceptance criteria.
