# Canonical Alignment Report

Generated: 2026-06-01

## Canonical Directive

The authoritative source of truth for Crown Labs products must be `./docs/crownlabsbible/`.

## Current-State Findings Before Modification

| Area                         | Finding                                                                                | Severity | Recommendation                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| Canonical docs path          | Crown Labs Bible exists at `./crownlabsbible/`, not `./docs/crownlabsbible/`.          | High     | Relocate to `docs/crownlabsbible/` and update all references.                                 |
| Public portfolio data        | `assets/labs-data.json` is a standalone duplicate inventory.                           | High     | Replace with generated data derived from `docs/crownlabsbible/`.                              |
| Product-page generation      | `scripts/generate-labs-product-pages.mjs` reads `assets/labs-data.json`.               | High     | Generate metadata from the Bible first, then build pages from generated metadata.             |
| Product listings             | `labs/products/` includes products not present in the Bible dossiers.                  | High     | Remove generated noncanonical product pages from active navigation and generation output.     |
| Separate microsite inventory | `crownlabs/assets/data.js` includes another product list.                              | High     | Convert to a compatibility re-export from generated metadata or remove from active authority. |
| Navigation links             | `labs.html` links to `crownlabsbible/docs/index.html`.                                 | Medium   | Update to `docs/crownlabsbible/docs/index.html`.                                              |
| Documentation references     | Multiple docs reference `crownlabsbible/` and duplicate Crown Labs architecture notes. | Medium   | Retain architecture docs but add canonical source directive and update paths.                 |

## Canonical Product Set

The repository currently has authoritative product dossiers for:

- AI Cherry Pie
- Crown Psychology
- Crown SOS
- Crown WatchTower
- CrownCam
- CrownCast
- Sentinel Vault

The repository also has a canonical platform document for:

- CrownCode.ai

## Products Requiring Dossier Creation Before Public Crown Labs Listing

These names appear in public or data surfaces but do not currently have a matching canonical dossier in the Bible:

- Phoenix
- Presence Architect
- Pic Detective
- Vibe Prism
- LumiLogix
- Couples Connection Playground
- JustUs Chat
- Judy
- CrownCode Intelligence / CrownCode Intelligence Suite

## Alignment Decision

Until canonical dossiers are created, the products above should not be presented as active Crown Labs portfolio products. They may be documented as future candidates only inside the Crown Labs Bible after an explicit dossier is added.

## Execution Plan

1. Establish `docs/crownlabsbible/` as the source location.
2. Create `scripts/generate-products-metadata.mjs` to parse product overview/classification documents.
3. Generate `data/products.json` from `docs/crownlabsbible/`.
4. Replace duplicate `assets/labs-data.json` with generated delivery data matching `data/products.json`.
5. Update Labs navigation and docs-source text to cite `docs/crownlabsbible/`.
6. Regenerate product pages only for products with canonical entries.
