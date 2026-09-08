# Repository Map — Crown Labs Canonical Alignment

Generated: 2026-06-01

## Audit Command Set

- `find . -iname '*crown*bible*' -o -iname '*bible*'`
- `find crownlabsbible -maxdepth 3 -type f | sort`
- `find docs crownlabs labs assets js css scss agents .github prompts scripts data content -maxdepth 3 -type f 2>/dev/null | sort`
- `rg -n "Crown Labs|crownlabs|CrownCode|Phoenix|Sentinel|Judy|Crown SOS|CrownSOS|Presence Architect|Vibe Prism|Pic Detective|Crown Psychology|LumiLogix|JustUs|CrownCast|CrownCam|AI Cherry|Couples Connection" -g '!node_modules' -g '!*.zip' -g '!package-lock.json'`

## Top-Level Crown Labs Surfaces

| Path                                      | Role                                        | Finding                                                                                                             |
| ----------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `crownlabsbible/`                         | Current Crown Labs Bible documentation tree | Canonical documentation exists, but not at requested canonical path `docs/crownlabsbible/`.                         |
| `docs/`                                   | Project documentation                       | Contains Crown Labs frontend docs and agent instructions, but no `docs/crownlabsbible/` directory before alignment. |
| `labs.html`                               | Public Crown Labs portfolio surface         | Uses `assets/labs-data.json` as a product inventory and links to `crownlabsbible/docs/index.html`.                  |
| `assets/labs-data.json`                   | Labs product delivery data                  | Duplicates product definitions and includes products not present in the Crown Labs Bible dossiers.                  |
| `scripts/generate-labs-product-pages.mjs` | Generated product-page builder              | Reads duplicate product inventory from `assets/labs-data.json`.                                                     |
| `labs/products/`                          | Generated product briefs                    | Includes canonical and noncanonical product pages.                                                                  |
| `crownlabs/`                              | Separate Crown Labs microsite               | Contains another manually maintained product inventory in `crownlabs/assets/data.js`.                               |
| `crowndocs/docs/`                         | Documentation platform notes                | Contains deprecation notes for old Crown Labs Bible docs paths.                                                     |
| `.github/`                                | Pull request and deploy automation          | No canonical Crown Labs source directive was present before alignment.                                              |

## Canonical Product Dossier Inventory Found

Current dossier source before relocation: `crownlabsbible/04-product-dossiers/`.

| Product          | Canonical dossier path                                 |
| ---------------- | ------------------------------------------------------ |
| AI Cherry Pie    | `crownlabsbible/04-product-dossiers/ai-cherry-pie/`    |
| Crown Psychology | `crownlabsbible/04-product-dossiers/crown-psychology/` |
| Crown SOS        | `crownlabsbible/04-product-dossiers/crown-sos/`        |
| Crown WatchTower | `crownlabsbible/04-product-dossiers/crown-watchtower/` |
| CrownCam         | `crownlabsbible/04-product-dossiers/crowncam/`         |
| CrownCast        | `crownlabsbible/04-product-dossiers/crowncast/`        |
| Sentinel Vault   | `crownlabsbible/04-product-dossiers/sentinel-vault/`   |

Additional canonical platform document:

| Product/System | Canonical path                               |
| -------------- | -------------------------------------------- |
| CrownCode.ai   | `crownlabsbible/02-products/crowncode-ai.md` |

## Noncanonical Product References Discovered

The scan found product names and inventory entries outside the canonical dossier list, including Phoenix, Presence Architect, Pic Detective, Vibe Prism, LumiLogix, Couples Connection Playground, JustUs Chat, Judy, and CrownCode Intelligence. These should not be treated as Crown Labs products unless and until corresponding canonical dossiers are added under the Crown Labs Bible.

## Required Structural Alignment

1. Move or otherwise establish the Crown Labs Bible at `docs/crownlabsbible/`.
2. Generate delivery metadata from `docs/crownlabsbible/`, not from hand-maintained parallel inventories.
3. Update public Crown Labs pages and generated product pages to consume the generated metadata layer.
4. Add explicit agent and automation instructions that `docs/crownlabsbible/` is authoritative.
