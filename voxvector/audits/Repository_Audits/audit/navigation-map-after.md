# Crown Labs Navigation Map — Planned After Modernization

Generated before implementation as the target state for the Crown Labs navigation modernization directive.

## Modern public Labs navigation target

The public Labs shell will expose the same primary navigation labels on desktop and mobile:

| Label         | Landing target                           | Product-page target                         | Purpose                                             |
| ------------- | ---------------------------------------- | ------------------------------------------- | --------------------------------------------------- |
| Home          | `#top`                                   | `../`                                       | Return to the Crown Labs public landing entry.      |
| Products      | `#products`                              | `../#products`                              | Open the product portfolio grid.                    |
| Technology    | `#crowncode`                             | `../#crowncode`                             | Open the CrownCode.ai technology/substrate section. |
| Founder       | `#founder`                               | `../#founder`                               | Open founder positioning.                           |
| Documentation | `../docs/crownlabsbible/docs/index.html` | `../../docs/crownlabsbible/docs/index.html` | Use the Crown Labs Bible documentation application. |
| Contact       | `mailto:apps@crownlabs.tech`             | `mailto:apps@crownlabs.tech`                | Direct contact route.                               |

## Documentation routing target

| Previous public route pattern                                                            | New public route pattern                                                                                    | Reason                                                                                                   |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `../docs/`                                                                               | `../docs/crownlabsbible/docs/index.html`                                                                    | Avoid generic repo docs for Crown Labs public documentation.                                             |
| `../docs/crownlabsbible/`                                                                | `../docs/crownlabsbible/docs/index.html`                                                                    | Avoid raw directory/source browsing.                                                                     |
| `../docs/crownlabsbible/README.md`                                                       | `../docs/crownlabsbible/docs/viewer.html#Documentation%20Platform`                                          | Use docs app viewer route.                                                                               |
| `../docs/crownlabsbible/02-products/crowncode-ai.md`                                     | `../docs/crownlabsbible/docs/crowncode-ai.html`                                                             | Use CrownCode.ai docs application page.                                                                  |
| `../../docs/crownlabsbible/04-product-dossiers/<slug>/overview.md`                       | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/<slug>/overview.md#Overview`         | Use docs app viewer where all dossier navigation remains reachable.                                      |
| `/docs/style-guide.html` and `/docs/buttons-demo.html` in the CrownCode microsite footer | `/docs/crownlabsbible/docs/index.html` and `/docs/crownlabsbible/docs/viewer.html#Documentation%20Platform` | Route Crown Labs documentation users to the Crown Labs Bible application instead of repo docs utilities. |

## Product dossier documentation target map

| Product page                          | Documentation application target                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `labs/products/crowncode-ai.html`     | `../../docs/crownlabsbible/docs/crowncode-ai.html`                                                            |
| `labs/products/ai-cherry-pie.html`    | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/ai-cherry-pie/overview.md#Overview`    |
| `labs/products/crown-psychology.html` | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/crown-psychology/overview.md#Overview` |
| `labs/products/sentinel-vault.html`   | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/sentinel-vault/overview.md#Overview`   |
| `labs/products/crowncam.html`         | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/crowncam/overview.md#Overview`         |
| `labs/products/crown-sos.html`        | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/crown-sos/overview.md#Overview`        |
| `labs/products/crown-watchtower.html` | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/crown-watchtower/overview.md#Overview` |
| `labs/products/crowncast.html`        | `../../docs/crownlabsbible/docs/viewer.html?doc=../04-product-dossiers/crowncast/overview.md#Overview`        |

The viewer will support a `doc` query parameter so product pages can deep-link to the exact dossier while preserving the existing sidebar tree, hash label, and documentation app experience.

## Documentation application preservation target

The existing Crown Labs Bible documentation app keeps its sidebar, quick links, mobile sidebar toggle, viewer tree, footer links, and all generated HTML app pages. Public Labs pages link into the app instead of replacing or bypassing it.

## Mobile behavior target

- Desktop: modern horizontal navigation with API-backed Tabler line icons rendered through Iconify.
- Mobile/tablet: accessible hamburger button opens the same navigation stack.
- Escape key and outside-click/scrim close behavior are supported on the landing page.
- Product pages use the same modern navigation labels and hamburger pattern.
