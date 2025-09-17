# Meet Daren Prince Page — Architecture & Content Map

The `meet-daren-prince.html` page introduces Daren’s story, credentials, and press resources in a modular, media-ready layout. Everything is optimized for dark mode, CodyHouse spacing rhythm, and quick reuse across launches.

## Page Goals
- Deliver a conversion-grade author bio with immediate credibility markers.
- Serve as the single source of truth for press, speaking, and media kit downloads.
- Provide structured data (JSON-LD) for rich snippets and author profiles.
- Feed navigation (mega menu, footer, sitemap) with a dedicated “Meet Daren” destination.

## Content Sections
1. **Bio Hero** — Gradient-backed headline, subcopy, and dual CTAs (press kit download + speaking inquiry).
2. **Origin Story Block** — Headshot feature with long-form copy and a signature quote.
3. **Stats Grid** — Quick credibility snapshots (books, bestseller badge, coaching reps, daily rituals).
4. **Pillars Modules** — Three-card system outlining communication, healing, and mission frameworks.
5. **Timeline Narrative** — Milestone list (strategy era through current mission) to show transformation.
6. **Media Angles** — Producer-friendly topics linking to deeper assets (press page, book rituals, contact form).
7. **Headshot Gallery** — Approved imagery ready for direct download.
8. **Press Downloads** — Cards for press kit PDF, high-res headshots, and brand graphics.
9. **Call-to-Action Row** — Booking details plus a teaser card for the upcoming email waitlist.

Each block sits inside `.container.max-width-adaptive-lg` wrappers and leans on responsive grids defined in `scss/components/_bio-page.scss`.

## Metadata & Structured Data
- `<title>`, description, Open Graph, and Twitter tags follow the strategy outlined in `docs/seo-metadata-plan.md` for the `/about` route.
- JSON-LD uses `@type: Person` with `sameAs`, `award`, `authorOf`, and `subjectOf` references so search engines can surface rich author cards.
- Canonical URL: `https://darenprince.com/about`.

## Asset Sources
- Headshots & thumbnails: `/assets/images/daren-prince-profile-lg.jpg`, `/assets/images/presskit-thumb.jpg`, `/assets/images/presskit-thumb-portrait.jpg`.
- Press kit PDF: `/assets/brand/Game_On_Press-Retailer_Kit_Brand_Identity_US_EU_compressed.pdf`.
- Buttons reuse global gradients (`.grad-kelly-green`) and the new `.btn--subtle` variant for secondary actions.

## Global Integration
- Mega menu, footer menus, and `sitemap.html` now point to `meet-daren-prince.html` instead of the placeholder About link.
- New SCSS partial `scss/components/_bio-page.scss` centralizes layout + spacing rules for hero, stat, press, and CTA modules.
- `scss/components/_buttons.scss` adds `.btn--subtle` for low-key CTA styling across this page and future reuse.

## Future Enhancements
- Wire the “Join the Waitlist” CTA to the upcoming mailing list component once the Supabase form is finalized.
- Add dynamic testimonials or embedded media reels via `<video>` or podcast players.
- Expand structured data with `speaksAbout` fields when keynote topics are finalized.
