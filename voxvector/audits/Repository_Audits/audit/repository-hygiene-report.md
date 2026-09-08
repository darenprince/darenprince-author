# Repository Hygiene Report

Generated: 2026-06-01

## Hygiene Findings

| Category                      | Evidence                                                                              | Risk                                        | Recommendation                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| Duplicate product inventories | `assets/labs-data.json`, `crownlabs/assets/data.js`, generated `labs/products/*.html` | Conflicting public product truth.           | Generate all product metadata from `docs/crownlabsbible/`.                 |
| Misplaced canonical docs      | `crownlabsbible/` at repo root                                                        | Developers may miss required source path.   | Move to `docs/crownlabsbible/`.                                            |
| Legacy generated pages        | Noncanonical files in `labs/products/`                                                | Public listings can drift from source docs. | Regenerate from canonical metadata and remove stale generated outputs.     |
| Placeholder files             | `assets/badges/placeholder.txt`, `partials/Dummy.txt`, `email/Place.txt`              | Low-grade clutter.                          | Review in future cleanup; remove only if not preserving empty directories. |
| Archive/reference code        | `References-ignore/`, `archive/`, zips in `Vault/`                                    | Repository weight and unclear ownership.    | Keep archived for now; document as non-active.                             |
| Duplicate search indexes      | `public/search/*` and `search/*`                                                      | Possible stale deploy artifacts.            | Confirm deploy target before pruning.                                      |
| Asset naming inconsistency    | Spaces, mixed case, screenshots in root and assets.                                   | Harder path maintenance.                    | Long-term asset manifest normalization, not part of product truth fix.     |

## Broken-Link/Reference Risks To Validate

- Links to `crownlabsbible/docs/index.html` after moving docs.
- Product pages linked from `labs.html` and scripts after regenerating canonical product set.
- Any references to noncanonical products removed from generated data.

## Recommended Follow-Up

1. Add a link checker to CI.
2. Add metadata generation to `build:labs`.
3. Add generated-file headers to delivery JSON.
4. Build a manifest of active assets used by public HTML before deleting images or zips.
