# 📕 3D Book Viewer + Print Overlay

This component creates a rotating 3D book using HTML, SCSS, and a small toolbar controller in JavaScript. The base rendering approach is inspired by the open source [3D Book Image CSS Generator](https://github.com/scastiel/3d-book-image-css-generator).

## Current Controls (book.html)

- **Front / Back snap** rotates the 3D model to the matching side.
- **Print Front / Print Back** opens the print image overlay and pre-selects the matching cover image.
- **360°** runs a full rotation.
- **Buy** scrolls directly to purchase options.
- **Close X (white/lime)** appears as an overlay button when the 3D view is expanded in modal/fullscreen context.
- Toolbar rail is pinned to the **left side of the viewport** and vertically centered.

## Deployment Notes

- Build CSS with `npm run build:site` before deployment.
- Production deployment target is **GitHub Pages** (`npm run deploy:github-pages`), not Netlify.

## Legacy Basic Markup Example

```html
<section class="book-preview">
  <div class="book-3d">
    <img src="path/to/cover.jpg" alt="Book Title by Author" />
  </div>
</section>
```

The current production styles are maintained in `scss/components/_book-3d.scss` and `scss/components/_book-toolbar.scss`, imported via `scss/styles.scss`.

Update JS behavior in `js/book-3d-viewer.js` when adding toolbar tools, snap behavior, or overlay states.

## Creating Covers

- Prepare a front cover image at the desired aspect ratio (example: 200x300).
- Replace the `img` source in the markup with the absolute URL of your cover.
- Adjust component variables if you need a different size or thickness.
- Rebuild the CSS and commit changes.

The enhanced viewer uses JavaScript for interaction and remains aligned with dark-mode-first site branding.
