# Press & Media Page: Structure & Asset Map

The `press.html` page centralizes every media ready asset for Daren Prince. It blends approved styling tokens, the reusable document viewer, and curated story angles so producers can prep interviews fast.

## Page Goals
- Give press a single destination for the latest kit, headshots, and contact details.
- Surface story angles and talking points that match the current bio narrative.
- Showcase the official press kit through the embedded viewer for quick scanning.

## Content Sections
1. **Press Hero:** Uses the charcoal lime gradient, highlights quick facts, and routes to the downloadable press kit or inbox.
2. **Producer Angles:** Card grid with four ready made story angles for pitches.
3. **Press Kit Viewer:** Implements the shared `.viewer` pattern with toolbar actions for download, fullscreen, and print.
4. **Downloadable Assets:** Three card grid covering the press kit PDF, headshots, and brand graphics.
5. **Headshot Gallery:** Curated gallery featuring actual event photos with captions for context.
6. **Media Contact:** Contact details plus a CTA back to the Meet Daren bio for additional facts.

## Key Assets
- Press kit PDF: `/assets/brand/Game_On_Press-Retailer_Kit_Brand_Identity_US_EU_compressed.pdf`.
- Headshots: `/assets/images/IMG_6099.jpeg`, `/assets/images/IMG_6241.jpeg`, `/assets/images/IMG_6244.jpeg`, `/assets/images/daren-prince-profile-lg.jpg` (download card).
- Brand graphic: `/assets/images/og-image.jpg`.

## Styling Notes
- Dedicated partial: `scss/components/_press-page.scss` (imported in `scss/styles.scss`).
- Buttons reuse `.btn--kelly`, `.btn--accent`, and `.btn--subtle` variants already defined.
- Viewer styling comes from `scss/components/_viewer.scss`; the press partial layers layout spacing.

## Future Enhancements
- Add zipped bundles for headshots and graphics once curated.
- Introduce a carousel or short video reel once media coverage clips are ready.
- Wire a press inquiry form component for automated intake alongside the mailto link.
