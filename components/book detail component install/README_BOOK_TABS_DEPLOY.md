
# 📘 Book Detail Tab Component Deployment Kit

This is a full implementation bundle for the Book Detail Tab Component from the Daren Prince Author Website project.

---

## ✅ 1. FILE UNPACKING & PLACEMENT

- Move `book-details-tab-demo.html` → `/components/book-details-tab-demo.html`
- Move assets:
  - `book-3d.jpg` → `/assets/images/placeholders/`
  - `video-thumbnail.jpg` → `/assets/images/placeholders/`
  - `book-trailer.mp4` → `/assets/images/placeholders/`

---

## ✅ 2. SCSS MODULE SETUP

Create: `/scss/components/_book-tabs.scss`

Starter block:

```scss
/* =======================================
   Book Details Tab Component
   Author: Daren Prince
   Description: Tabbed layout with preview, description, trailer, and locked content
   ======================================= */
```

Match REM spacing, use tokens from `/scss/layout/_tokens.scss`, dark mode default.

---

## ✅ 3. COMPONENT DOCUMENTATION

Create: `/docs/components/book-tabs.md`

Include:
- Component purpose
- Tab layout logic
- Required images and layout rules
- Persistent buy/dropdown logic
- Notes for JS functionality

---

## ✅ 4. DEMO SYNC

Update `/components.html`:
- Add `<h2>📘 Book Details Tabs</h2>`
- Embed contents of `book-details-tab-demo.html`
- Link this to `_book-tabs.scss` module

---

## ✅ 5. JS PLACEHOLDER

Create: `/js/book-tabs.js`

```js
/**
 * Book Tabs JS
 * Handles tab switching, active state toggles, and accessibility
 * Pending: transitions, keyboard nav, content fade
 */
```

Do not implement yet. Only placeholder required.

---

⚠️ Follow rules in MASTER_PLAN.md.
⚠️ No truncation. No skipped documentation.
