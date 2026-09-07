# Documentation Cleanup Report

Generated: 2026-06-01

## Classification Legend

- KEEP: preserve as active documentation.
- MERGE: retain but consolidate or point to canonical source.
- ARCHIVE: preserve outside active navigation.
- REMOVE: delete only after replacement is complete and references are updated.

## Findings

| Path/Pattern                                                                    | Classification | Reason                                                                 | Recommendation                                                                                  |
| ------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `crownlabsbible/`                                                               | MERGE          | Correct content, incorrect canonical location.                         | Move to `docs/crownlabsbible/`.                                                                 |
| `docs/CROWNLABS_FRONTEND_SYSTEM.md`                                             | KEEP           | Useful frontend implementation documentation.                          | Add canonical source directive.                                                                 |
| `docs/LABS_PAGE_SYSTEM.md`                                                      | KEEP           | Active Labs page system documentation.                                 | Update data-source path to generated metadata.                                                  |
| `docs/AGENTS.md`                                                                | KEEP           | Active agent instruction file scoped to docs.                          | Add Crown Labs Bible source directive.                                                          |
| `docs/REPORT_SITE_DOC_AUDIT.md`                                                 | KEEP           | Historical audit.                                                      | Preserve as a dated report.                                                                     |
| `crowndocs/docs/DEPRECATIONS.md`                                                | KEEP           | Deprecation ledger.                                                    | Update paths after relocation.                                                                  |
| `README.md` Crown Labs sections                                                 | MERGE          | Contains active instructions mixed with dated product inventory notes. | Replace duplicate product-count and product-list assumptions with generated metadata directive. |
| `assets/labs-data.json`                                                         | MERGE          | Delivery data should exist, but must be generated from canonical docs. | Regenerate from Bible and mark as generated.                                                    |
| `crownlabs/assets/data.js`                                                      | MERGE          | Duplicate manual inventory.                                            | Convert to generated/compatibility metadata or retire from authority.                           |
| `labs/products/*.html`                                                          | MERGE          | Generated briefs are useful public discovery layer.                    | Regenerate only from canonical metadata.                                                        |
| `References-ignore/`                                                            | ARCHIVE        | Reference code and zip assets outside active site.                     | Keep out of active navigation; consider long-term archive pruning.                              |
| `test/` HTML debug pages                                                        | ARCHIVE        | Debug/support pages.                                                   | Keep only if actively used by QA; otherwise archive later.                                      |
| Placeholder files such as `assets/badges/placeholder.txt`, `partials/Dummy.txt` | ARCHIVE        | Marker files, not active docs.                                         | Keep only if required for empty dirs; otherwise remove in a later hygiene pass.                 |

## Do-Not-Delete Decision

No documentation should be deleted before canonical metadata generation, navigation repair, and link validation are complete. Generated public product pages may be removed only when they are noncanonical outputs and no active navigation references them.
