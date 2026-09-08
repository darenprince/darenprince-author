# Crown Labs Navigation Map — Before Modernization

Generated before implementation for the Crown Labs navigation modernization directive.

## Scope reviewed

- `labs/index.html`
- `labs/products/*.html`
- `labs/crowncode/index.html`
- `docs/crownlabsbible/docs/*.html`
- `docs/crownlabsbible/docs/assets/js/navigation.js`

## Public Labs landing navigation before

Source: `labs/index.html`

| Location           | Label                         | Target                                               | Finding                                                                              |
| ------------------ | ----------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Header             | Crown Labs                    | `#crown-labs`                                        | Section anchor only; no Home item.                                                   |
| Header             | CrownCode.ai                  | `#crowncode`                                         | Technology/product infrastructure section.                                           |
| Header             | Products                      | `#products`                                          | Product grid anchor.                                                                 |
| Header             | Founder                       | `#founder`                                           | Founder section anchor.                                                              |
| Header             | Docs                          | `../docs/`                                           | Points to repository documentation index, not the Crown Labs Bible docs application. |
| Hero primary CTA   | Enter documentation           | `../docs/`                                           | Points to repository docs.                                                           |
| Hero secondary CTA | Open Crown Labs Bible         | `../docs/crownlabsbible/`                            | Points to raw documentation directory/index.                                         |
| Hero panel         | Open docs application         | `../docs/crownlabsbible/docs/index.html`             | Correct Crown Labs Bible documentation application entry.                            |
| CrownCode section  | Open CrownCode.ai dossier     | `../docs/crownlabsbible/02-products/crowncode-ai.md` | Points to raw Markdown material.                                                     |
| Product section    | Review source documentation   | `../docs/crownlabsbible/`                            | Points to raw documentation directory/index.                                         |
| Founder section    | Documentation governance note | `../docs/crownlabsbible/README.md`                   | Points to raw Markdown material.                                                     |
| Footer/CTA         | `/docs/`                      | `../docs/`                                           | Points to repository docs.                                                           |
| Footer/CTA         | `/docs/crownlabsbible/`       | `../docs/crownlabsbible/`                            | Points to raw documentation directory/index.                                         |

## Product page navigation before

Source: `labs/products/*.html`

| Location      | Label                          | Target                                      | Finding                                                                   |
| ------------- | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------- |
| Header        | Back to Labs                   | `../#products`                              | Returns to Labs product grid.                                             |
| Header        | Crown Labs Bible               | `../../docs/crownlabsbible/docs/index.html` | Correct docs app entry.                                                   |
| Hero CTA      | Open canonical dossier         | `../../docs/crownlabsbible/.../*.md`        | Points to raw Markdown dossier/source file.                               |
| Hero CTA      | Explore Labs                   | `../#products`                              | Returns to Labs product grid.                                             |
| Metadata text | Source file / Canonical source | `docs/crownlabsbible/.../*.md` text         | Presents raw source file paths as user-facing documentation destinations. |

## CrownCode microsite navigation before

Source: `labs/crowncode/index.html`

| Location          | Label        | Target                    | Finding                                                                       |
| ----------------- | ------------ | ------------------------- | ----------------------------------------------------------------------------- |
| Footer docs links | Style Guide  | `/docs/style-guide.html`  | Points to repository docs utility page rather than Crown Labs Bible docs app. |
| Footer docs links | Buttons Demo | `/docs/buttons-demo.html` | Points to repository docs utility page rather than Crown Labs Bible docs app. |

## Crown Labs Bible documentation application before

Source: `docs/crownlabsbible/docs/*.html` and `docs/crownlabsbible/docs/assets/js/navigation.js`

| Area                | Existing behavior                                                                                  | Preservation requirement                                   |
| ------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Sidebar quick links | Overview, Docs, Investor, Executive, Map, Roadmap                                                  | Preserve.                                                  |
| Mobile menu         | Existing docs app sidebar toggle and scrim                                                         | Preserve.                                                  |
| Viewer tree         | Corporate Foundation, Branding, Writing, Investor, Corporate Infrastructure, Product Documentation | Preserve and keep all documents reachable through the app. |
| Footer docs links   | Viewer, Ecosystem Map, Roadmap, Investor Mode, Executive Dashboard, Contact                        | Preserve.                                                  |

## Key risks identified before implementation

1. Public Labs navigation does not provide the requested modern item set: Home, Products, Technology, Founder, Documentation, Contact.
2. Public Labs navigation has no mobile hamburger behavior; the menu is simply hidden below 860px by shared CSS.
3. Multiple public links route users to repo docs or raw Markdown/source directories rather than the Crown Labs Bible documentation application.
4. Product pages expose raw Markdown as primary canonical dossier destinations instead of app-based documentation destinations.
5. The existing Crown Labs Bible documentation app navigation is functional and should not be replaced or broken.
