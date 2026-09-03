# VoxVector CSS Architecture

**Status:** Canonical production architecture

## One entrypoint

The React application imports exactly one stylesheet from `voxvector/src/main.jsx`:

`voxvector/src/canonical.css`

Do not add additional global stylesheet imports to JSX files or to `main.jsx`. The canonical manifest is the visible cascade contract for production.

## Cascade ownership order

1. **Foundation** — `index.css`
   - design tokens
   - reset and browser normalization
   - global layout primitives
   - accessibility and reduced motion defaults

2. **Typography** — `Typography.css`
   - font families
   - type scale
   - heading and editorial typography rules

3. **Shared chrome** — `components/SiteHeader.css`
   - public header
   - developer toolbar
   - navigation and mobile menu behavior

4. **Public landing** — `canonical-landing.css`
   - landing page composition
   - hero image ownership
   - mobile full-width artwork treatment
   - the only requested hero edge fade behavior

5. **Developer console** — `components/DeveloperConsole.css`, followed by dashboard and engineering status owners
   - console shell and analysis workflow
   - former enhancement and workflow layers consolidated into the console owner

6. **Visualization and analysis surfaces**
   - `components/SignalVisualizer.css`
   - `components/Spectrogram.css`

7. **Runtime startup** — `components/ApiStartup.css`

## Rules for future changes

- Change the stylesheet that owns the component or page. Do not create a late override file.
- Do not use names such as `patch`, `override`, `refinement`, `enhancement`, or `fix` for new production CSS layers.
- If a rule changes shared tokens, place it in Foundation. If it changes a component, place it with that component's owner.
- A page-specific rule belongs in that page’s named owner, not in an unrelated global stylesheet.
- Avoid selector-order tricks and broad `!important` overrides unless required to neutralize third-party utility output.
- Before declaring a visual change complete, verify the canonical source, the production build, and the deployed artifact.

## Archived styles

Historical layers removed from the active cascade are preserved under:

`voxvector/src/archive/styles/2026-09-canonicalization/`

Those files are reference-only and must not be reintroduced as production imports.

## Audit result

The September 2, 2026 audit removed competing JSX CSS imports, consolidated the developer console's enhancement/workflow layers into its canonical owner, and retired unreferenced refinement and duplicate stylesheets from the active source tree.