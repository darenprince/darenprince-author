# Navigation Code Overview

This document summarizes how the navigation (mega menu, top header menu and profile dropdown) is implemented in this repository. It covers the HTML structure, SCSS sources, JavaScript behavior and external dependencies so it is easier to modify them.

## 1. HTML Markup

Every HTML page (e.g., `index.html`, `login.html`, `contact.html`) contains the same navigation markup. The main side menu is a `<nav>` element with class `mega-menu js-mega-menu` followed by a menu overlay:

```html
<nav class="mega-menu js-mega-menu" aria-label="Mega menu">
  <button class="icon-btn menu-close js-menu-close" aria-label="Close">
    <i class="ti ti-x"></i>
  </button>
  <!-- theme toggle switch omitted -->
  <ul class="mega-menu-list">
    <li><a href="index.html" class="active"><i class="ti ti-home"></i>Home</a></li>
    <li class="has-submenu">
      <a href="#" class="js-submenu-trigger"><i class="ti ti-book"></i>Books<i class="ti ti-chevron-right arrow"></i></a>
      <ul class="submenu is-hidden">
        <li class="go-back js-go-back"><a href="#"><i class="ti ti-arrow-left"></i>Back</a></li>
        <li><a href="book.html"><i class="ti ti-book"></i>Game On!</a></li>
        <li><a href="index.html"><i class="ti ti-book-2"></i>Unshakeable</a></li>
      </ul>
    </li>
    <!-- additional links ... -->
  </ul>
</nav>
<div class="menu-overlay js-menu-overlay"></div>
```

The header at the top of each page contains icons that toggle search, the profile dropdown and the side menu. Example from `index.html`:

```html
<header class="site-header padding-y-sm js-sticky-nav">
  <div class="container max-width-adaptive-lg flex items-center justify-between">
    <a href="index.html" class="logo"><img src="/assets/logos/2Daren_Web_Logo_White_For_Dark_Background.png" alt="Daren Prince"></a>
    <div class="nav-btn-group flex items-center gap-sm">
      <button class="icon-btn js-search-toggle" aria-label="Search"><i class="ti ti-search"></i></button>
      <button class="icon-btn js-profile-toggle" aria-label="Account"><i class="ti ti-user"></i></button>
      <button class="icon-btn js-menu-toggle" aria-label="Menu"><i class="ti ti-menu-2"></i></button>
    </div>
  </div>
  <div class="search-bar js-search-bar" hidden>...</div>
  <div class="profile-dropdown js-profile-dropdown" hidden>...</div>
</header>
```

## 2. SCSS Sources

Navigation styles live primarily in the SCSS folder:

- `scss/style.scss` – defines the mega menu layout and transitions.
- `scss/layout/_header.scss` – styles the sticky header bar.
- `scss/layout/_nav.scss` – shared styles for icon buttons, search bar and the profile dropdown.
- `scss/components/_profile-dropdown.scss` – extra styling for the dropdown itself.

All partials are imported in `scss/styles.scss`, which is the entry point compiled to CSS. After editing any SCSS, run:

```bash
npm run build
```

This command uses `sass scss/styles.scss assets/styles.css` as specified in `package.json`.

## 3. JavaScript Behavior

Menu interaction and related UI controls are handled by these scripts:

- `js/main.js` – toggles the mega menu, submenu navigation, theme switch and search bar. Requires jQuery for the submenu animations.
- `js/profile-dropdown.js` – controls the profile menu drop down and logout logic via Supabase.
- `js/theme-toggle.js` – manages the dark/light theme switching.
- `js/trailer-modal.js` – unrelated to navigation but loaded on most pages.

`js/main.js` attaches click handlers to `.js-menu-toggle`, `.js-menu-close`, `.js-menu-overlay`, `.js-submenu-trigger` and `.js-go-back` to open/close the side menu and navigate between submenu levels.

## 4. External Dependencies

The HTML includes these external libraries via CDN:

- [Tabler Icons](https://tabler.io/icons) for all `<i class="ti ..."></i>` icons.
- [jQuery](https://jquery.com/) for submenu animations (`js/main.js` expects `$`).
- [Supabase JS](https://supabase.com/) used for authentication and profile info.

Ensure these `<script>` tags are present near the end of each page (as seen in `index.html` lines ~184-199):

```html
<script src="/js/ui.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/js/profile-dropdown.js"></script>
<script src="/js/trailer-modal.js"></script>
<script src="/js/theme-toggle.js"></script>
<script src="/js/main.js"></script>
```

## 5. Common Pitfalls

1. **SCSS Not Compiled** – Edits to files in `scss/` require running `npm run build` to regenerate `assets/styles.css`. If you only modify the compiled CSS, your changes may be overwritten the next time Sass runs.
2. **Menu HTML Duplication** – Each HTML page has its own copy of the menu markup. Be sure to update all pages or create a shared partial if you want consistent changes across the site.
3. **Cached Assets** – Browsers may cache `assets/styles.css` and the JS files. Hard refresh (Ctrl/Cmd+Shift+R) after rebuilding to ensure you see updates.

## 6. File Locations

- **HTML**: `index.html`, `book.html`, `press.html`, `contact.html`, `dashboard.html`, `login.html`, `components.html`
- **Styles**: `scss/` (source) ➜ compiled to `assets/styles.css`
- **Scripts**: `js/`

With this overview you can trace where any navigation-related change should be made and how to rebuild the styles. Follow the standard workflow:

1. Edit SCSS/HTML/JS as needed.
2. Run `npm run build` to compile styles.
3. Reload the page (hard refresh) to see changes.

