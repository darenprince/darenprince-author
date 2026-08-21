# Game On! Social Image Assets

Generated social preview cards for the live Game On! landing page.

## Files

- `assets/social/game-on-og-1200x630.png` — primary Open Graph image for Facebook, LinkedIn, iMessage, and general crawlers.
- `assets/social/game-on-twitter-1200x630.png` — X/Twitter `summary_large_image` asset.
- `assets/social/game-on-social-square-1200.png` — square backup creative for platforms that crop tighter.
- Matching `.webp` files are included for future site use, but PNG remains the safest metadata format for social crawlers.

## Source Assets

- `assets/gameon-book-hero-transparent.png`
- `assets/original-header-logo.png`

## Regeneration

Run from the repo root:

```bash
node scripts/generate-gameon-social-images.mjs
```

The generator uses the existing Game On! book, Daren Prince logo, dark field texture, chalk-play accents, brand green, and gold rating treatment.
