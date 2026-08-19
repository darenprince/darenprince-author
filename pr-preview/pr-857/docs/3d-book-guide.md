# 📕 3D Book Cover + Game On Experience

The `book.html` page now combines the rotating 3D Game On viewer with interactive details + purchasing flows tuned for GitHub Pages deployments. The core visual treatment is still based on the open source [3D Book Image CSS Generator](https://github.com/scastiel/3d-book-image-css-generator), with custom SCSS and JS enhancements.

## Usage

1. Include the markup:

```html
<section class="book-preview">
  <div class="book-3d">
    <img src="path/to/cover.jpg" alt="Book Title by Author" />
  </div>
</section>
```

2. The active SCSS partials are `scss/components/_book-3d.scss` and `scss/components/_book-details-wrapper.scss`, imported through `scss/styles.scss`.

3. The interactive behavior is handled in `js/book-3d-viewer.js` and `js/book-details.js`:
   - 3D drag/rotate tooling.
   - In-view card entrance animation (tilt + settle + slight scale).
   - Details drawer reveal where the book shifts left and purchasing controls are surfaced.

## Build + Deploy

- Local build: `npm run build`
- GitHub Pages deployment build: `npm run deploy:github-pages`
- CSS-only refresh during styling work: `npm run watch`

All paths are authored to work from the repository base path for GitHub Pages hosting.
