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
    ├── global.css           # Global tokens, typography, and layout baselines
    └── packages/
        └── ccai-overrides.css  # Component-level enhancements layered atop USWDS
```

## Key Improvements

- **USWDS Foundations:** The layout, navigation, hero, cards, forms, modals, and alerts all inherit baseline styling from USWDS and augment it with CrownCode.ai theming.
- **Security Workflows:** Access token modal, numeric clearance gate, loaders, and audit notices were refactored for clarity, keyboard support, and mobile responsiveness.
- **Session Awareness:** Clearance state, security toasts, and mission brief visibility persist across refreshes via `sessionStorage` without leaking to the broader site.

## Development Notes

1. Open `index.html` in a modern browser. The file references the USWDS CDN for CSS and JavaScript.
2. Custom styles live in `stylesheets/global.css` and `stylesheets/packages/ccai-overrides.css` so additional packages can be layered without touching USWDS core files.
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
