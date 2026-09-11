# VoxVector Project Decision — Behavior Preserving Architectural Migration

**Date:** 2026-08-26
**Status:** Active canonical decision
**Scope:** Frontend architecture, shared UI, CSS, runtime refinements, AI assisted development

## Decision

VoxVector architectural cleanup must consolidate ownership **without discarding behavior**.

A patch, refinement, override, recovery layer, compatibility layer, or workaround must never be deleted merely because its name or implementation mechanism does not fit the target architecture.

Before retirement, its complete contents, dependencies, consumers, runtime effects, and relevant git history must be inspected. Every behavior it introduces or modifies must be compared with the current canonical implementation.

Required or newer behavior must be migrated into the appropriate canonical owner before the old layer is removed.

## Required migration sequence

```text
legacy / patch / refinement / override
        ↓
read complete contents
        ↓
trace consumers, imports, selectors, assets, dependencies, runtime effects
        ↓
inspect git history and chronology
        ↓
identify the behavior actually provided
        ↓
compare against canonical implementation
        ↓
classify each behavior: canonical / missing / conflicting / obsolete / canonical fix required
        ↓
identify correct owner
        ↓
migrate required behavior into canonical owner
        ↓
read back and verify canonical implementation
        ↓
verify visual / functional / responsive / accessibility behavior
        ↓
search for competing ownership and stale references
        ↓
retire only the obsolete layer
```

## Rationale

A patch can be architecturally undesirable while containing the newest correct behavior. Examples include responsive logo sizing, spacing, breakpoints, alignment, animation, accessibility behavior, or interaction behavior.

File naming, age, aesthetic preference, or architectural preference is not sufficient evidence that behavior is obsolete.

The objective is not minimum file count. The objective is one appropriate canonical owner for each behavior while preserving the product's accumulated functionality.

## Canonical ownership rule

Shared behavior should have one appropriate canonical owner and multiple consumers.

Page-specific behavior remains page-specific.

The canonical public site header is `voxvector/src/components/SiteHeader.jsx`. When shared chrome is migrated into it, consumer-specific actions must be composed through explicit props rather than duplicated headers or runtime DOM manipulation.

The Developer Console remains a protected canonical product surface. Shared chrome may migrate into `SiteHeader`, but console-specific controls and analysis functionality remain owned by the console and its analysis workspace.

## Verification requirement

Architectural migration is incomplete until both conditions are demonstrated:

1. the canonical owner contains the required behavior migrated from the old layer;
2. retiring the old layer does not remove required behavior.

Build success alone is insufficient for visual migrations. Browser verification should confirm the resulting behavior on relevant desktop and mobile states when tooling permits.

## Supersession

This decision supplements and clarifies the existing surgical-editing, preservation, and canonical-source requirements. It does not authorize broad rewrites, duplicate implementations, or deletion of historical records.
