# Navigation Code Overview

_Last updated: 2025-02-14_

This guide summarizes the navigation system (mega menu, header icons, profile dropdown) with accurate file references.

## 1. HTML markup
Most public pages (`index.html`, `book.html`, `login.html`, `contact.html`, etc.) share the same navigation skeleton:
```html
<header class="site-header padding-y-sm js-sticky-nav">
  <div class="container max-width-adaptive-lg flex items-center justify-between">
    <a href="index.html" class="logo">
      <img src="/assets/logos/2Daren_Web_Logo_White_For_Dark_Background.png" alt="Daren Prince">
    </a>
    <div>
      <button class="js-search-toggle" aria-label="Search"><i class="ti ti-search"></i></button>
      <button class="js-profile-toggle" aria-label="Account"><i class="ti ti-user"></i></button>
      <button class="js-menu-toggle" aria-label="Menu"><i class="ti ti-menu-2"></i></button>
    </div>
  </div>
  <div class="search-bar js-search-bar" hidden>…</div>
  <div class="profile-dropdown js-profile-dropdown" hidden>…</div>
</header>
<nav class="mega-menu js-mega-menu" aria-label="Mega menu">…</nav>
<div class="menu-overlay js-menu-overlay"></div>
```
Admin utilities such as `admin-user-management.html` omit the theme toggle button to maximize usable width but otherwise follow the same pattern.

## 2. SCSS sources
Navigation styles compile from:
- `scss/layout/_header.scss` — header layout, sticky behavior, icon button styling.
- `scss/layout/_nav.scss` — mega menu, overlay, search bar, profile dropdown wrappers.
- `scss/components/_profile-dropdown.scss` — dropdown panel styling.
- `scss/styles.scss` — Sass entry point (imports all partials, including `scss/style.scss` legacy mega menu tweaks).

Run `npm run build` (or the `watch` script) after editing any of these partials.

## 3. JavaScript behavior
- `js/main.js` — toggles the mega menu (`.js-menu-toggle`, `.js-menu-close`, `.js-menu-overlay`), handles the auth button default state, and launches the desktop search modal.
- `js/profile-dropdown.js` — controls the avatar dropdown (requires a Supabase session) and logout behavior.
- `js/theme-toggle.js` — switches `.theme-dark`/`.theme-light` and persists the choice in `localStorage`.
- `js/search.js` (from `src/js/`) — powers the autocomplete dropdown in pages that include the `[data-search]` widget.

> **Reality Check:** `components.html` still includes `<script src="./js/mobile-nav.js"></script>` even though the file was removed. Remove the tag or restore the script to avoid 404s.

## 4. External dependencies
Every page loads:
- [Tabler Icons](https://tabler.io/icons) for `<i class="ti …"></i>` glyphs.
- [jQuery 3.7.1](https://code.jquery.com/jquery-3.7.1.min.js) for legacy scripts still referenced by some demos.
- Supabase JS via module imports (handled inside `js/supabase-helper.js`).

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
3. **Missing Supabase env vars** — Without credentials, `js/profile-dropdown.js` and auth toggles will disable themselves and surface warnings via `js/supabase-helper.js`.
4. **Stale search assets** — Desktop search modal opens a Google fallback when Minisearch payloads are empty; seed `/content/` before demoing on-site search.

Keep these notes handy when adjusting navigation behavior or styling.
