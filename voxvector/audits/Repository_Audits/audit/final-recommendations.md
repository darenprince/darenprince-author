# Final Recommendations — Pre-Implementation

Generated: 2026-06-01

## Primary Recommendation

Make `docs/crownlabsbible/` the only authoritative source for Crown Labs products. Every public card, portfolio list, investor summary, generated product page, status indicator, and roadmap display should consume generated metadata derived from that directory.

## Implementation Recommendations

1. Relocate the Crown Labs Bible to `docs/crownlabsbible/`.
2. Add a metadata generator that extracts product names, classifications, statuses, summaries, capabilities, and canonical source paths from the Bible.
3. Generate both:
   - `data/products.json` as the canonical delivery metadata layer.
   - `assets/labs-data.json` as a public-site compatibility payload.
4. Update `npm run build:labs` to regenerate metadata before producing product pages.
5. Regenerate active product pages only for canonical products.
6. Update Labs public navigation to link to `docs/crownlabsbible/docs/index.html`.
7. Update agent, prompt, PR, and README guidance so future work cannot reintroduce duplicate product inventories.
8. Preserve detailed documentation and dossiers; use the public site as a discovery layer above the docs.

## Deferred Recommendations

- Add canonical dossiers for currently unlisted product ideas before reintroducing them publicly.
- Add repository-level asset usage analysis before deleting large image archives.
- Add CI link checking after paths stabilize.
