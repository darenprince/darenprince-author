# CrownCode.ai Intelligence Systems Laboratory

This laboratory encapsulates the CrownCode.ai experience inside the `labs/crowncode` workspace so it can evolve independently from the primary Daren Prince author site. The interface was rebuilt with the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov) to ensure federal-grade accessibility, performance, and responsive behavior.

## Structure

```
labs/crowncode/
├── README.md                # This file
├── docs/                    # Reports, NDAs, and supporting documentation
├── icons/                   # Favicon assets and icon references
├── images/                  # Visual assets used throughout the experience
├── index.html               # Reimagined CrownCode.ai page built on USWDS
├── scripts/
│   └── ccai.js              # Access workflows, loaders, and security interlocks
└── stylesheets/
    ├── global.css           # Compiled dark-theme baseline (from `scss/global.scss`)
    ├── packages/
    │   └── ccai-overrides.css  # Compiled component enhancements (from `scss/packages/_ccai-overrides.scss`)
    └── scss/
        ├── _mixins.scss     # CodyHouse-inspired helpers for glass panels, focus, grids
        ├── _tokens.scss     # CrownCode.ai color tokens mapped to USWDS values
        ├── global.scss      # Source for global styling compiled to `global.css`
        └── packages/
            └── _ccai-overrides.scss  # Source for component overrides compiled to CSS
```

## Key Improvements

- **USWDS Foundations:** Layout, navigation, hero, cards, accordions, collections, process lists, tables, and identifier components all inherit baseline styling from USWDS and augment it with CrownCode.ai dark theming.
- **Dark-Mode Tokens:** Custom SCSS tokens ensure WCAG 2.2 AA contrast while echoing USWDS guidance for lighting, gradients, and section shells.
- **Security Workflows:** Access token modal, numeric clearance gate, loaders, and audit notices were refactored for clarity, keyboard support, and mobile responsiveness.
- **Session Awareness:** Clearance state, security toasts, and mission brief visibility persist across refreshes via `sessionStorage` without leaking to the broader site.

## Development Notes

1. Open `index.html` in a modern browser. The file references the USWDS CDN for CSS and JavaScript.
2. Modify SCSS sources in `stylesheets/scss/` and compile using `npx sass stylesheets/scss/global.scss stylesheets/global.css` and `npx sass stylesheets/scss/packages/_ccai-overrides.scss stylesheets/packages/ccai-overrides.css` from the `labs/crowncode` folder.
3. All JavaScript powering loaders, modals, keypad logic, and security hardening resides in `scripts/ccai.js`. The module pattern avoids polluting global scope.
4. When adding assets, place images in `images/`, icons in `icons/`, and documentation in `docs/` to keep the lab compartmentalized.

## Accessibility & Compliance

- Skip navigation, focus outlines, role annotations, and responsive grids follow USWDS checklists.
- Keyboard and screen-reader flows were validated for the numeric keypad, dialogs, and toasts.
- All notices and loaders include live-region messaging so assistive tech receives immediate status changes.

## Future Enhancements

- Integrate authenticated APIs for live clearance token rotation.
- Layer in USWDS step indicators for multi-stage access reviews.
- Expand automated testing around keyboard traps and security notice timing.
