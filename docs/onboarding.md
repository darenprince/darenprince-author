# 🚀 Onboarding Quick Guide

Welcome to the Daren Prince Author Platform! This quick primer gets you building fast. Everything runs in dark mode, powered by SCSS and simple HTML.

## 1. Install Dependencies

Run the helper script to install Node packages and compile the initial stylesheet:

```bash
./scripts/local_setup.sh
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
- **Pages:** `index.html` is the landing page. `components.html` demos all available components—add new ones here for easy reference.

Every component imports into `scss/styles.scss`, so keep file names consistent.

## 4. Preview the Site

After compiling styles, start the live dev server:

```bash
./scripts/start_dev.sh
```

This serves the project locally and reflects your SCSS changes immediately.

## 5. Keep It Bold

Daren’s brand voice is confident and direct. Keep copy short and powerful. Dark mode is the baseline, but a light theme is available via `#themeToggle`.

That’s it! You’re ready to create components and push updates. If you get stuck, read `docs/FILE_STRUCTURE.md` for more details.
