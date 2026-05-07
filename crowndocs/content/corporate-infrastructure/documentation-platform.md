# Documentation Platform

- Canonical routes: /docs/index.html, /docs/categories.html, /docs/products.html, /docs/viewer.html, /docs/investor-mode.html, /docs/executive-dashboard.html, /docs/ecosystem-map.html, /docs/roadmap-tracker.html.
- Shared styling: `docs/assets/css/platform.css`.
- Theme-aware branding: default dark mode, localStorage persistence, light mode logo swap.
- Logos:
  - Dark: https://www.darenprince.com/labs/assets/crown-labs-logo.png
  - Light: https://www.darenprince.com/assets/images/30F807E6-DA8A-413C-8564-116375DDE082%202.png
  - Favicon: https://www.darenprince.com/app%20icons/crownicon.PNG
- Viewer rendering rules: escape markdown before conversion, render structural markdown safely, support explicit `[[Document Name]]` references only, and never regex-replace already-rendered HTML.
- Navigation standards: expandable hierarchy, active state, breadcrumbs, mobile close-on-select, current path display.
- Footer standard: branding, docs links, investor, executive, ecosystem map, roadmap, contact, signup UI, Iconify social links.
- Utility toolbar: text size controls, copy, print, share, and back-to-top.
- Deprecated legacy files: `viewer-clean.html` and `investor-clean.html` are retired from primary navigation and can be removed after external references are migrated.
- Next implementation step: extract shared interactive behavior into `docs/assets/js/platform.js`.
