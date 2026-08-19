# Crown Labs Master Executive Bible

This directory contains the executive and product documentation system for Crown Labs and Daren M. Prince Holdings.

## Purpose

This documentation system functions as:

- product inventory source of truth
- intellectual property archive
- investor documentation system
- operational governance reference
- product architecture documentation
- brand and editorial standards archive
- valuation and monetization framework

The GitHub application repositories remain the technical source of truth for implementation. The Bible mirrors current product state and preserves executive context.

## Current structure

- `01-corporate-foundation/`
- `02-products/`
- `02-writing-standards/`
- `03-investor-framework/`
- `04-product-dossiers/`
- `05-corporate-infrastructure/`
- `docs/`

## VoxVector synchronization

VoxVector is a canonical active Crown Labs product entry.

- Product inventory: `02-products/voxvector.md`
- Master product dossier: `04-product-dossiers/VoxVector.md`
- Companion dossier: `04-product-dossiers/VoxVector/`
- Technical source of truth: `VoxVector/` in `darenprince-author`
- Intended public target: `voxvector.crownlabs.tech`

The companion dossier now follows the established Crown Labs product pattern with overview, executive summary, monetization, valuation, licensing, positioning, architecture, website copy, and ecosystem-role sections.

The VoxVector technical documentation distinguishes implemented capabilities, primary-pipeline integration, planned research, and validated inference. Planned features must not be removed simply because implementation is pending.

## Editorial standards

Documentation should:

- use clean professional prose
- avoid em dashes and en dashes
- separate active functionality from roadmap items
- preserve factual traceability
- avoid unsupported measurements and valuations
- avoid presenting research candidates as validated product capabilities
- maintain investor-grade clarity

## Synchronization rule

When a material VoxVector runtime or architecture change occurs, update `VoxVector/docs/` and the relevant Crown Labs Bible product records. The parallel `crowndocs/content/` mirror should remain synchronized where the same product dossier is maintained. Do not allow the executive mirror to contradict the canonical repository.

## Status

Active and maintained. VoxVector dossier expansion and CrownDocs synchronization added 2026-08-19.
