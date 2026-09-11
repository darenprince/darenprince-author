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

## Icon affordance rule

Passive iconography is rendered as direct glyphs without a decorative full-perimeter square or rectangular stroke. A framed icon reads as an interactive control and must not be used merely as decoration.

Borders remain appropriate when the containing element is actually interactive or structurally meaningful, including buttons, disclosure controls, form controls, cards/panels, selected/filter controls, status boundaries, and intentional avatar/media frames. A passive glyph may use color, opacity, size, or spacing for hierarchy without acquiring a button-like container.

This rule applies across the public application, authentication surfaces, startup/runtime surfaces, Analysis Workspace, and Developer Console. Component-specific owners must enforce it locally rather than adding a global patch selector.

## Developer engineering status rail contract

`DeveloperEngineeringStatus.css` owns the live engineering rail below the canonical Developer navigation. In toolbar mode the collapsed 34px rail is a sticky, normal-flow row immediately below the 56px navigation rather than a fixed overlay. Hiding the rail removes its row from layout so console content closes the gap naturally; do not recreate the former `:has()` header-padding or main-content compensation workaround.

The rail’s operational attention treatment is also owned here. `DeveloperEngineeringStatus.jsx` supplies the semantic `is-service-live` or `is-service-attention` state after normalizing the authenticated Render service and latest-deployment state. The normal dark rail is permitted only when Render is in the accepted live combination. Any other Render combination, including pending, building, deploying, updating, suspended, failed, unavailable, or unreported state, uses the red attention rail. This visual state is supplementary to explicit service/deploy text and must never be derived from API-bridge connectivity alone.

`DeveloperDashboard.css` owns whole-card semantic coloring for the Developer Overview status blocks. Healthy, transitional/warning, and attention/error states tint the complete status card rather than only a dot or label. Every card still carries an explicit text state and always-visible subtext so color is not the only status channel. Render-page service/deploy value blocks use component-local utility classes in `DeveloperConsole.jsx` because those colors are data-state presentation inside the existing Render Runtime component rather than a new stylesheet layer.

The expanded engineering surface may occupy the remaining viewport below the 90px navigation-plus-rail boundary and must remain internally scrollable on desktop and mobile. Its accessibility contract is a non-modal disclosure region connected to native button controls through `aria-expanded` and `aria-controls`; do not label it `aria-modal` unless a complete modal focus lifecycle is implemented.

Toast placement belongs to the existing toast owner. Developer Console toasts are positioned at the bottom-right so top-of-page notifications do not collide with or obscure the engineering rail. Responsive and reduced-motion behavior remains local to the existing component owners.

## Developer Console chrome ownership

`DeveloperConsole.css` owns the page-specific Case Workflow tracker and Developer drawer presentation. When the sticky Case Workflow tracker settles into its compact state, its surface must be opaque and theme-aware so underlying analysis content cannot visually bleed through. Hover and focus may expand the existing tracker; the compact-state opacity rule must not create a second tracker or change the workflow state semantics.

The Developer drawer must not visually duplicate the account/email/sign-out presentation already owned by the canonical header profile menu. Suppressing that redundant drawer footer is a Developer Console presentation rule only; it does not remove the shared profile menu, role routing, sign-out behavior, or account controls from their canonical owners.

The explicit **Wake API** control belongs to `DeveloperEngineeringStatus.jsx`, not CSS. It uses the existing health client boundary and reports the observed request state. Styling must not imply that merely sending a wake request proves API readiness.

## Archived styles

Historical layers removed from the active cascade are preserved under:

`voxvector/src/archive/styles/2026-09-canonicalization/`

Those files are reference-only and must not be reintroduced as production imports.

## Audit result

The September 2, 2026 audit removed competing JSX CSS imports, consolidated the developer console's enhancement/workflow layers into its canonical owner, and retired unreferenced refinement and duplicate stylesheets from the active source tree.

The September 9, 2026 active-UI icon review confirmed that shared header access glyphs, landing section/method glyphs, collapsible-panel glyphs, engineering-state glyphs, and toast status glyphs already render without decorative full-stroke boxes. The remaining active passive full-stroke treatments were the API-startup step glyph container and the Developer Gate key glyph; those canonical owners were corrected directly. Interactive buttons and structural card/status borders were intentionally preserved.

The September 11, 2026 Developer Console chrome refinement keeps these rules in the existing canonical owners: `DeveloperConsole.css` owns the opaque compact Case Workflow tracker and duplicate drawer-footer suppression, while `DeveloperEngineeringStatus.jsx` owns the health-backed Wake API behavior. No additional public/shared-shell styling change is part of that refinement.