# 📕 3D Book Cover Component

This component creates a rotating 3D book using only HTML and SCSS. It is based on the open source [3D Book Image CSS Generator](https://github.com/scastiel/3d-book-image-css-generator).

## Usage

1. Include the markup:

```html
<section class="book-preview">
  <div class="book-3d">
    <img src="path/to/cover.jpg" alt="Book Title by Author" />
  </div>
</section>
```

2. The SCSS partial is located at `scss/components/_book.scss` and imported in `scss/styles.scss`. Compile styles with `npm run build`.

3. Customize variables at the top of `_book.scss` to adjust rotation, thickness, or colors. The `$book-bg-color` variable defaults to `transparent` and no shadows are applied.

## Creating Covers

- Prepare a front cover image at the desired aspect ratio (example: 200x300).
- Replace the `img` source in the markup with the absolute URL of your cover.
- Adjust component variables if you need a different size or thickness.
- Rebuild the CSS and commit changes.

The effect works without JavaScript and respects the dark mode design system.
