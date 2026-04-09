# Press & Media Page: Structure & Asset Map

The `press.html` page centralizes every media ready asset for Daren Prince. It blends approved styling tokens, the reusable document viewer, and curated story angles so producers can prep interviews fast.

## Page Goals

- Give press a single destination for the latest kit, headshots, and contact details.
- Surface story angles and talking points that match the current bio narrative.
- Showcase the official press kit through the embedded viewer for quick scanning.

## Content Sections

1. **Press Hero:** Uses the charcoal lime gradient, highlights quick facts, and routes to the downloadable press kit or inbox.
2. **Press Kit Viewer (Moved Up):** Now sits directly after the hero to keep the preview visible sooner and avoid fold clipping on mobile screenshots.
3. **Producer Angles:** Card grid with four ready made story angles for pitches.
4. **Downloadable Assets:** Three card grid covering the press kit PDF, headshots, and brand graphics.
5. **Headshot Gallery:** Curated gallery with two approved professional headshots and production-ready captions.
6. **Media Contact:** Contact details plus a CTA back to the Meet Daren bio for additional facts.
7. **Media Section Drawer Nav:** Slide out section navigation with icon labeled links for quick jumps between media page anchors.

## Key Assets

- Press kit PDF: `/assets/brand/Game_On_Press-Retailer_Kit_Brand_Identity_US_EU_compressed.pdf`.
- Headshots: `/assets/images/daren-prince-profile-lg.jpg`, `/assets/images/2AA31BBC-1B94-4459-8B4E-E20162EDC5FD.png` (gallery + approved media usage).
- Brand graphic: `/assets/images/og-daren-prince.png`.

## Styling Notes

- Dedicated partial: `scss/components/_press-page.scss` (imported in `scss/styles.scss`).
- Buttons reuse `.grad-kelly-green`, `.btn--accent`, and `.btn--subtle` variants already defined.
- Viewer styling comes from `scss/components/_viewer.scss`; the press partial layers layout spacing and a slightly elevated placement for faster access.
- The in-page media drawer uses a branded dark gradient panel, mint accent borders, and icon-first anchors to match existing site header controls.

## Future Enhancements

- Add zipped bundles for headshots and graphics once curated.
- Introduce a carousel or short video reel once media coverage clips are ready.
- Wire a press inquiry form component for automated intake alongside the mailto link.

## Metadata + Deployment Notes

- Social preview tags on `press.html` point to production assets on `https://www.darenprince.com` (Open Graph + Twitter image + alt text).
- Favicon and PWA icon links resolve from `/assets/icons/generated/*` to stay compatible with GitHub Pages deployment paths.
- Theme and browser color metadata are aligned to brand green (`#456f3a`) for consistent browser chrome customization.
