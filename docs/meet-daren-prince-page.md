# Meet Daren Prince Page: Architecture & Content Map

The `meet-daren-prince.html` page introduces Daren’s story, credentials, and personality through a modular, media-ready layout. Everything is optimized for dark mode, CodyHouse spacing rhythm, and quick reuse across launches.

## Page Goals
- Deliver a conversion grade author bio with immediate credibility markers.
- Spotlight the human story behind the books and lead visitors toward the dedicated press hub.
- Provide structured data (JSON-LD) for rich snippets and author profiles.
- Feed navigation (mega menu, footer, sitemap) with a dedicated “Meet Daren” destination.

## Content Sections
1. **Bio Hero:** Uses the approved charcoal mint gradient and spotlights the core mission with CTAs leading to the press hub and book catalog.
2. **Origin Story Block:** Headshot feature with the updated narrative copy and a signature quote.
3. **Stats Grid:** Quick credibility snapshots (books, bestseller badge, coaching reps, daily rituals).
4. **Pillars Modules:** Three card system outlining communication, healing, and mission frameworks.
5. **Timeline Narrative:** Milestone list (strategy era through current mission) to show transformation.
6. **Media Angles:** Producer friendly topics linking directly to the press page, book rituals, and contact form.
7. **Press Ready Bio Options:** Four card grid with the official press bio plus three quick grab variations.
8. **Call to Action Row:** Booking details plus a teaser card for the upcoming email waitlist.

Each block sits inside `.container.max-width-adaptive-lg` wrappers and leans on responsive grids defined in `scss/components/_bio-page.scss`.

## Metadata & Structured Data
- `<title>`, description, Open Graph, and Twitter tags follow the strategy outlined in `docs/seo-metadata-plan.md` for the `/about` route.
- JSON-LD uses `@type: Person` with `sameAs`, `award`, `authorOf`, and `subjectOf` references so search engines can surface rich author cards.
- Canonical URL: `https://darenprince.com/about`.

## Asset Sources
- Headshots: `/assets/images/daren-prince-profile-lg.jpg`.
- Press kit PDF: `/assets/brand/Game_On_Press-Retailer_Kit_Brand_Identity_US_EU_compressed.pdf`.
- Buttons reuse global gradients (`.grad-kelly-green`) and approved button variants for secondary actions.

## Global Integration
- Mega menu, footer menus, and `sitemap.html` point to `meet-daren-prince.html` instead of the placeholder About link.
- `scss/components/_bio-page.scss` houses the layout + spacing rules for the hero, stat, pillar, timeline, media, versions, and CTA modules.
- Press specific assets and downloads have moved to `press.html` so the bio page can stay narrative focused.

## Future Enhancements
- Wire the “Join the Waitlist” CTA to the upcoming mailing list component once the Supabase form is finalized.
- Add dynamic testimonials or embedded media reels via `<video>` or podcast players.
- Expand structured data with `speaksAbout` fields when keynote topics are finalized.
