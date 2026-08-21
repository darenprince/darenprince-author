# Crown Labs Frontend System

This document defines the two Crown Labs front-end paths now available in the author platform repository.

## Purpose

Crown Labs needs to operate as a separate premium technology portfolio, not just a subsection of the Daren Prince author website. The design language should feel like official product documentation merged with an investor-facing software showcase.

The system now supports two implementation tracks:

1. Static author-site track for `crownlabs.html`
2. Vite application track under `apps/crown-labs-vite/`

Both share the same product strategy, content hierarchy, and design philosophy.

---

## Track One: Static HTML plus Sass component system

### Primary file

```txt
crownlabs.html
```

This is the current standalone Crown Labs landing page. It is self-contained enough to run immediately, but its UI classes are intentionally structured so the styles can be moved into Sass modules over time.

### Supporting files

```txt
scss/pages/_crownlabs-premium.scss
js/crownlabs-portfolio.js
```

### Recommended Sass import

`scss/styles.scss` should include:

```scss
@use 'pages/crownlabs-premium' as *;
```

Place it near the other page-level imports.

### Build command

```bash
npm run styles:build
```

or during development:

```bash
npm run styles:watch
```

### Design rules

- Use system fonts only.
- Avoid glow-heavy design.
- Avoid pill buttons.
- Use square or softly rounded rect geometry.
- Use restrained cyan, blue, violet, and red accents.
- Maintain deep soft black backgrounds.
- Keep product cards short and move expanded copy into modals or product pages.
- Use status labels as quiet metadata rows, not loud badges.

---

## Track Two: Vite app implementation

### Location

```txt
apps/crown-labs-vite/
```

This is a React/Vite-ready version of the Crown Labs portfolio. It can be developed independently or migrated into the main site later.

### Local setup

From the app directory:

```bash
cd apps/crown-labs-vite
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### App structure

```txt
apps/crown-labs-vite/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── data/
        └── products.js
```

---

## Component model

### Header

Responsible for:

- Brand identity
- Sticky translucent navigation
- Mobile menu toggle
- Portfolio category navigation
- Investor inquiry CTA

### Hero

Responsible for:

- Primary positioning
- Above-the-fold trust
- Portfolio OS visual panel
- Conversion CTAs

### Principles

Responsible for:

- Precision
- Intelligence
- Stewardship

These should remain short and investor-readable.

### Portfolio cards

Each card should include:

- Visual placeholder area
- Icon placeholder filename
- Product name
- Category
- Status
- Short summary
- Next gate
- Strategic value label
- Details action

Do not overload cards with long descriptions.

### Modal detail system

Use modals for quick expanded context. Deep documentation should live on separate product pages.

### Licensing section

Responsible for the real business framing:

- Module licensing
- Professional pilots
- Consumer funnels
- Investor packaging

---

## Placeholder assets

Do not add binary files unless intentionally provided.

Use placeholder paths only:

```txt
assets/icons/crowncode.png
assets/icons/lumilogix.png
assets/icons/crownpsychology.png
assets/icons/justus.png
assets/icons/crowncam.png
assets/icons/crownsos.png
assets/icons/aicherrypie.png
assets/icons/picdetective.png
assets/icons/sentinelvault.png
```

If these files do not exist, the layout still reserves a clean visual area.

---

## Deployment guidance

### Static page

Use `crownlabs.html` for immediate deployment inside the current author site.

### Vite app

Use the Vite app if Crown Labs becomes its own richer product portal with routing, analytics, state, filters, gated investor content, or product dashboards.

Recommended migration order:

1. Keep `crownlabs.html` live as the public landing page.
2. Develop the Vite app in parallel.
3. Move shared data into a single JSON or JS module.
4. Add product routes.
5. Add investor mode or gated packet request flow.
6. Deploy Vite app as a subdirectory or separate Netlify site.

---

## Quality checklist

Before shipping updates:

- Mobile has no horizontal overflow.
- Header menu is usable on small screens.
- Cards have consistent internal spacing.
- Status labels are visually consistent.
- Text hierarchy is clear without shouting.
- Hover states are subtle.
- Reduced motion is respected.
- No paid external assets are required.
- No binary placeholder files are added.
- Product links still resolve or degrade gracefully.
