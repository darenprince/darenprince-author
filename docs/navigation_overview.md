# Navigation Code Overview

_Last updated: 2026-04-14_

This guide summarizes the navigation system (mega menu, header icons, profile dropdown) with accurate file references. For icon usage standards, see `docs/icon-system.md`.

## 1. HTML markup

Most public pages (`index.html`, `book.html`, `login.html`, `contact.html`, etc.) share the same navigation skeleton:

```html
<header class="site-header padding-y-sm js-sticky-nav">
  <div class="container max-width-adaptive-lg flex items-center justify-between">
    <a href="index.html" class="logo">
      <img src="/assets/logos/2Daren_Web_Logo_White_For_Dark_Background.png" alt="Daren Prince" />
    </a>
    <div>
      <button class="js-search-toggle" aria-label="Search">
        <i class="ph ph-magnifying-glass"></i>
      </button>
      <button class="js-profile-toggle" aria-label="Account"><i class="ph ph-user"></i></button>
      <button class="js-menu-toggle" aria-label="Menu"><i class="ph ph-list"></i></button>
    </div>
  </div>
  <div class="search-bar js-search-bar" hidden>…</div>
  <div class="profile-dropdown js-profile-dropdown" hidden>…</div>
</header>
<nav class="mega-menu js-mega-menu" aria-label="Mega menu">…</nav>
<div class="menu-overlay js-menu-overlay"></div>
```

Admin utilities such as `admin-user-management.html` omit the theme toggle button to maximize usable width but otherwise follow the same pattern.

### Mobile behavior (April 2026 update)

- The top icon cluster now scales down on narrow viewports (`<= 600px`) to prevent clipping when logo + actions share one row.
- The share action (`.js-share-trigger`) is still injected by `js/main.js`, but it uses `nav-icon-btn--share` and becomes a floating quick action button on mobile instead of consuming header width.
- Desktop/tablet behavior remains unchanged (share icon stays in the top-right action cluster).

### Share overlay behavior (April 14, 2026)

- The floating quick-action stack is initialized by `js/main.js` on pages that load the main shell scripts.
- The share action is now always visible so every page has a persistent share affordance, while the back-to-top button still appears only after scrolling.
- This restores the prior “share overlay” experience across short and long pages without requiring per-page markup edits.

## 2. SCSS sources

Navigation styles compile from:

- `scss/layout/_header.scss` — header layout, sticky behavior, icon button styling.
- `scss/layout/_nav.scss` — mega menu, overlay, search bar, profile dropdown wrappers.
- `scss/style.scss` — mega menu glassmorphism polish (gradient stroke, refined separators, active icon/link color alignment).
- `scss/components/_profile-dropdown.scss` — dropdown panel styling.
- `scss/styles.scss` — Sass entry point (imports all partials, including `scss/style.scss` legacy mega menu tweaks).

Run `npm run build` (or the `watch` script) after editing any of these partials.

## 3. JavaScript behavior

- `js/main.js` — toggles the mega menu (`.js-menu-toggle`, `.js-menu-close`, `.js-menu-overlay`), handles the auth button default state, injects the header share action, and launches the desktop search modal.
- `js/profile-dropdown.js` — controls the avatar dropdown and routes users to login while auth is offline.
- `js/theme-toggle.js` — switches `.theme-dark`/`.theme-light` and persists the choice in `localStorage`.
- `js/search.js` (from `src/js/`) — powers the autocomplete dropdown in pages that include the `[data-search]` widget.

> **Reality Check:** `components.html` still includes `<script src="./js/mobile-nav.js"></script>` even though the file was removed. Remove the tag or restore the script to avoid 404s.

## 4. External dependencies

Every page loads:

- [Phosphor Icons](https://phosphoricons.com/) for `<i class="ph …"></i>` glyphs.
- [jQuery 3.7.1](https://code.jquery.com/jquery-3.7.1.min.js) for legacy scripts still referenced by some demos.
- Future data provider SDK (to be reintroduced once the migration completes).

The relevant scripts near the end of each page typically look like:

```html
<script type="module" src="/js/ui.js"></script>
<script type="module" src="/js/main.js"></script>
<script type="module" src="/js/theme-toggle.js"></script>
<script type="module" src="/js/profile-dropdown.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

Adjust the list per page (e.g., dashboards also load `js/auth-guard.js` and `js/dashboard.js`).

## 5. Common pitfalls

1. **Forgotten rebuilds** — Edits in `scss/` require `npm run build` to regenerate `assets/styles.css`.
2. **Menu markup drift** — Each HTML page has its own copy of the menu. Update all surfaces or extract a partial before shipping wide changes.
3. **Auth provider offline** — With the migration placeholder active, `js/profile-dropdown.js` keeps the login route and tooltip messaging instead of exposing broken buttons.
4. **Stale search assets** — Header and modal search now route to `/pages/search.html` (on-site Minisearch). Seed `/content/` and run `npm run build:search` before demoing so results are not empty.

## 6. Current mega-menu baseline (April 14, 2026)

- Public mega-menu variants no longer include the legacy **Collabs** and **Developers** links.
- Top-level primary links now focus on Home, Books, Meet Daren, Media, Swag, Blog, Site Map, and Contact destinations to reduce dead-end navigation paths.
- The old `components.html` reference to `/js/mobile-nav.js` was removed to avoid a runtime 404 script fetch.

Keep these notes handy when adjusting navigation behavior or styling.
