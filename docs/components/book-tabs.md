# 📘 Book Tabs Component

The Book Tabs component displays rich details for a single title. It features tabbed navigation for a preview image, long description with specs, a trailer video, and a members-only teaser.

## Layout

- **Sticky Purchase Bar** – stays fixed to the top while scrolling and contains a store selector and buy button.
- **Tab Navigation** – four buttons switch the visible panel: Preview, Description, Trailer, Members.
- **Preview Panel** – shows a 3D cover by default with toggle buttons for alternate views.
- **Description Panel** – long marketing copy followed by a table of book specs.
- **Trailer Panel** – HTML5 video block with poster image.
- **Members Panel** – simple call to action for joining the site.

Images used in the demo are stored in `/assets/images/placeholders/`.

## Notes

- The component relies on `js/book-tabs.js` for tab switching logic (pending implementation).
- Always import the SCSS partial `_book-tabs.scss` in `scss/styles.scss`.
- Keep buy controls visible on mobile by using the sticky bar.
