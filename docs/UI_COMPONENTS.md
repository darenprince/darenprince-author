# 🧩 UI Component Reference

_Last updated: 2025-02-14_

This reference links every Sass partial, markup hook, and JavaScript controller powering the CodyHouse-inspired UI system. Use it to keep implementation and documentation aligned.

## Layout wrappers
| Partial | Purpose | Markup hooks |
| --- | --- | --- |
| `scss/layout/_grid.scss` | Grid helpers for responsive sections | `.grid`, `.grid--2`, `.grid--3` |
| `scss/layout/_header.scss` | Sticky header + icon bar | `.site-header`, `.nav-icon-btn`, `.js-menu-toggle`, `.js-theme-toggle` |
| `scss/layout/_nav.scss` | Mega menu + overlay | `.mega-menu`, `.mega-menu-list`, `.menu-overlay` |
| `scss/layout/_component-nav.scss` | Side navigation used on `components.html` | `.component-nav`, `.component-nav__link`, `.component-nav__select` |
| `scss/layout/_demo-section.scss` | Component demo wrappers | `.demo-section`, `.demo-section__grid` |
| `scss/layout/_footer.scss` | Footer layout | `.site-footer`, `.footer-grid`, `.footer-cta` |

## Core components
| Partial | Description | Key hooks | JS dependencies |
| --- | --- | --- | --- |
| `_buttons.scss` | Gradient CTAs, outline buttons, segmented groups | `.btn`, `.btn--primary`, `.btn--outline`, `.btn-group` | Optional: `js/ui.js` for progress feedback |
| `_cta-buttons.scss` | Hero CTA stacks with icons | `.cta-buttons`, `.cta-buttons__item` | — |
| `_forms.scss` | Inputs, selects, textareas with focus halos | `.form-control`, `.form-field`, `.form-error` | `js/password-strength.js` when meter active |
| `_cards.scss` | Flexible card shells and stat panels | `.card`, `.card--press`, `.card__meta` | Used by `js/dashboard.js`, `js/admin-user-console.js` |
| `_modals.scss` | Modal overlay + close controls | `.modal`, `.modal__content`, `.modal__close` | `js/trailer-modal.js` |
| `_alerts.scss` | Inline alert banners | `.alert`, `.alert--success`, `.alert--danger` | `js/ui.js` to show toast equivalents |
| `_toggles.scss` | Toggle switches | `.toggle`, `.toggle__indicator` | — |
| `_icons.scss` | Icon badges + sizing utilities | `.icon-badge`, `.icon-badge--accent` | — |
| `_loaders.scss` | Spinner + progress bar | `.loader`, `.progress`, `.progress .bar` | `js/ui.js` (`showProgress`, `setProgress`) |

## Hero & storytelling modules
| Partial | Description | Hook elements | JS |
| --- | --- | --- | --- |
| `_hero.scss` | Primary hero layout | `.hero`, `.hero__title`, `.hero__cta` | `js/hero-demos.js`, `js/theme-toggle.js` |
| `_hero-demos.scss` | Experimental hero variants | `.hero-demo`, `.hero-demo--video`, `.hero-demo--parallax` | `js/hero-demos.js`, `js/hero-video.js`, `js/hero-auto-zoom.js` |
| `_banner.scss` | Announcement banner | `.banner`, `.banner--success` | — |
| `_testimonials.scss` | Quote grid with avatars | `.testimonial`, `.testimonial__author` | — |
| `_downloads.scss` | Download cards | `.download-card`, `.download-card__meta` | `js/image-index.js` (viewer) |
| `_viewer.scss` | Document/video viewer | `.viewer`, `.viewer__frame`, `.viewer__actions` | `js/image-index.js`, `js/book-3d-viewer.js` |

## Book experience
| Partial | Description | Hook elements | JS |
| --- | --- | --- | --- |
| `_book.scss` | Book hero + feature list | `.book-hero`, `.book-hero__cover`, `.book-hero__meta` | `js/book-rail.js` (homepage rail) |
| `_book-3d.scss` | 3D book preview frame | `.book-3d`, `.book-3d__canvas` | `js/book-3d-viewer.js` |
| `_book-toolbar.scss` | Toolbar controls for 3D viewer | `.book-toolbar`, `.book-toolbar__btn` | `js/book-3d-viewer.js` |
| `_book-tabs.scss` | Format selector tabs | `.book-tabs`, `.book-tabs__nav`, `.book-tabs__panel` | `js/book-tabs.js` |
| `_book-details-wrapper.scss` | Wrapper for tabbed demo | `.book-details`, `.book-details__summary` | `js/book-details.js` |
| `_trailer-modal.scss` | Video modal styling | `.trailer-modal`, `.trailer-modal__video` | `js/trailer-modal.js` |

## Auth & membership
| Partial | Description | Hook elements | JS |
| --- | --- | --- | --- |
| `_login.scss` | Login/signup panel | `.login-container`, `.auth-toggle`, `.auth-error` | `js/auth.js`, `js/password-strength.js` |
| `_password-strength.scss` | Password meter | `.password-meter`, `.password-meter__bar` | `js/password-strength.js` |
| `_dashboard.scss` | Member dashboard layout | `.dashboard`, `.dashboard__card`, `.greeting` | `js/dashboard.js`, `js/auth-guard.js` |
| `_profile-dropdown.scss` | Avatar dropdown menu | `.profile-dropdown`, `.profile-dropdown__menu` | `js/profile-dropdown.js`, `js/auth-guard.js` |
| `_viewer.scss` | Shared viewer (downloads) | `.viewer` | `js/dashboard.js` |

## Admin & operations
| Partial | Description | Hook elements | JS |
| --- | --- | --- | --- |
| `_component-docs.scss` | Layout for `components.html` docs | `.component-docs`, `.component-docs__aside` | `js/main.js` |
| `_demo-container.scss` | Demo wrappers with headers/footers | `.demo-container` | `js/main.js` |
| `_press-page.scss` | Press/media asset layout | `.press-hero`, `.press-grid`, `.press-downloads` | `js/theme-toggle.js` |
| `_bio-page.scss` | Biography storytelling | `.bio-hero`, `.bio-grid`, `.bio-card` | — |
| `_alerts.scss`, `_toggles.scss`, `_cards.scss` | Shared admin feedback + toggle styles | `.alert`, `.toggle`, `.card` | `js/admin-user-console.js` |

## Search & docs
| Partial | Description | Hook elements | JS |
| --- | --- | --- | --- |
| `_search.scss` | Search results layout (`pages/search.html`) | `.search-results`, `.search-hit`, `.search-hit__meta` | `src/js/search-results.js`, `src/js/search.js` |
| `_component-docs.scss` | Documentation typography | `.component-docs`, `.component-docs__content` | — |

## Component & script crosswalk
| Surface | Key HTML | SCSS modules | JS |
| --- | --- | --- | --- |
| Homepage hero | `index.html` (`.hero`) | `_hero.scss`, `_buttons.scss`, `_cta-buttons.scss` | `js/hero-demos.js`, `js/main.js` |
| Book detail | `book.html` | `_book.scss`, `_book-tabs.scss`, `_trailer-modal.scss`, `_book-3d.scss` | `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js` |
| Login | `login.html` | `_login.scss`, `_forms.scss`, `_password-strength.scss` | `js/auth.js`, `js/password-strength.js` |
| Member dashboard | `dashboard.html` | `_dashboard.scss`, `_cards.scss`, `_forms.scss`, `_viewer.scss` | `js/dashboard.js`, `js/auth-guard.js` |
| Admin console | `admin-user-management.html` | `_dashboard.scss`, `_cards.scss`, `_profile-dropdown.scss`, `_alerts.scss`, `_toggles.scss` | `js/admin-user-console.js`, `js/auth-guard.js` |
| Press hub | `press.html` | `_press-page.scss`, `_downloads.scss`, `_viewer.scss` | `js/theme-toggle.js` |
| Components gallery | `components.html` | `_component-docs.scss`, `_demo-container.scss`, `_buttons.scss` | `js/main.js`, `js/ui.js` |
| Search results | `pages/search.html` | `_search.scss` | `src/js/search-results.js`, `src/js/search.js` |

> **Reality Check:** Place new Sass partials under `scss/components/` and import them in `scss/styles.scss`. The `/components/` folder is reserved for HTML demos only.

## Authoring checklist
- [ ] Add new partials to `scss/components/` and import them in `scss/styles.scss`.
- [ ] Document new components in this guide with markup hooks and JS dependencies.
- [ ] Update `docs/SITE_STRUCTURE.md` when new pages ship or prototypes are retired.
