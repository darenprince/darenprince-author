# 🚀 Onboarding Quick Guide

Welcome to the Daren Prince Author Platform! This quick primer gets you building fast. Everything runs in dark mode, powered by SCSS and simple HTML.

## 1. Install Dependencies

The project uses Node and the `sass` package to compile styles. Install everything with:

```bash
npm install
```

## 2. Compile SCSS

All styles live in `scss/`. The main entry point is `scss/styles.scss`. Compile it to `assets/styles.css` whenever you make changes:

```bash
npx sass scss/styles.scss assets/styles.css --watch
```

The `--watch` flag keeps Sass running so any edits automatically rebuild.

## 3. Project Structure Overview

- **SCSS Components:** `scss/components/` contains partials like `_buttons.scss` and `_forms.scss`.
- **Base Styles:** Global resets and variables live under `scss/base/`.
- **Tokens:** Brand colors are defined in `scss/tokens/_colors.scss`.
- **Pages:** `index.html` is the landing page. `components.html` showcases reusable bits.

Every component imports into `scss/styles.scss`, so keep file names consistent.

## 4. Preview the Site

After compiling styles, open `index.html` in your browser or run Netlify’s dev server:

```bash
npx netlify-cli dev
```

This serves the project locally and reflects your SCSS changes immediately.

## 5. Keep It Bold

Daren’s brand voice is confident and direct. When you write or code, keep copy short and powerful. Dark mode is the default—no need to design a light theme yet.

That’s it! You’re ready to create components and push updates. If you get stuck, read `docs/FILE_STRUCTURE.md` for more details.
