# Apple Books Promotional Assets

This reference collects the Apple-provided promo assets that pair with the Game On! Apple Books listing. Each asset keeps the tracking parameters supplied by Apple so downstream analytics stay accurate.

## Books Box Embed

- **URL:** `https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900?ign-itscg=30200&ign-itsct=books_box_link&mttnsubad=6745466900`
- **Usage:** Full-width embed that surfaces cover art, pricing, and ratings directly in Apple Books-supported browsers.

```html
<a
  href="https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900?ign-itscg=30200&ign-itsct=books_box_link&mttnsubad=6745466900"
>
  Apple Books – Game On! Master the Conversation, Win Her Heart
</a>
```

> ⚠️ The live Books Box widget must be generated through Apple's Toolbox each time because the markup is script-driven. The link above preserves the correct campaign parameters for quick access.

## Download Badges

All badges link to the same tracking URL but vary by treatment. Replace the `img` source to switch styles.

| Style                       | Preview URL                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| Standard White              | `https://toolbox.marketingtools.apple.com/api/v2/badges/get-it-on-apple-books/standard-white/en-us` |
| Standard Black              | `https://toolbox.marketingtools.apple.com/api/v2/badges/get-it-on-apple-books/standard-black/en-us` |
| Mono White                  | `https://toolbox.marketingtools.apple.com/api/v2/badges/get-it-on-apple-books/mono-white/en-us`     |
| Badge with Black Background | `https://toolbox.marketingtools.apple.com/api/v2/badges/get-it-on-apple-books/mono-white/en-us`     |

```html
<a
  href="https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900?itscg=30200&itsct=books_box_badge&mttnsubad=6745466900"
  style="display: inline-block;"
>
  <img
    src="https://toolbox.marketingtools.apple.com/api/v2/badges/get-it-on-apple-books/standard-white/en-us"
    alt="Get it on Apple Books"
    style="width: 387px; height: 82px; vertical-align: middle; object-fit: contain;"
  />
</a>
```

### Badge Sizing Notes

- Default badge renders at **387 × 82 px**. Scale uniformly to maintain clarity.
- Keep a minimum padding of **16 px** around the badge so it breathes within dark UI surfaces.

## App Icon Options

Use these when a square icon works better than the wide badge.

| Style    | Image URL                                                                              |
| -------- | -------------------------------------------------------------------------------------- |
| Standard | `https://toolbox.marketingtools.apple.com/api/v2/badges/app-icon-books/standard/en-us` |
| Black    | `https://toolbox.marketingtools.apple.com/api/v2/badges/app-icon-books/black/en-us`    |
| White    | `https://toolbox.marketingtools.apple.com/api/v2/badges/app-icon-books/white/en-us`    |

```html
<a
  href="https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900?itscg=30200&itsct=books_box_appicon&mttnsubad=6745466900"
  style="display: inline-block;"
>
  <img
    src="https://toolbox.marketingtools.apple.com/api/v2/badges/app-icon-books/standard/en-us"
    alt="Apple Books app icon"
    style="width: 100px; height: 100px; vertical-align: middle; object-fit: contain;"
  />
</a>
```

### Icon Usage Tips

- Square icons render best between **72–128 px** for crisp edges on retina displays.
- Pair icons with short CTAs such as “Read on Apple Books” when used in grids or feature lists.

## Quick Copy Snippets

- **CTA:** “Open in Apple Books”
- **Value Prop:** “Instantly syncs to iPhone, iPad, and Mac with night mode and offline access.”

Store this document with other marketing resources so future promos stay aligned with Apple’s official guidelines.
