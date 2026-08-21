# VoxVector AI Editing Guardrails

## Purpose

This document defines the safe editing discipline for AI agents modifying VoxVector. It exists to prevent visual regressions, accidental loss of existing functionality, formatting churn, and silent overwrites during iterative development.

## Surgical editing is the default

When changing an existing file:

1. Read the current file before editing it.
2. Identify the smallest exact region that satisfies the request.
3. Preserve all unrelated code, markup, classes, imports, comments, ordering, formatting, responsive rules, accessibility behavior, and existing visual treatments.
4. Prefer additive or narrowly targeted edits over reconstruction.
5. Never replace a large file from memory or from an earlier snapshot when only a small change is required.
6. Never remove existing functionality merely because it is not directly relevant to the current request.
7. Do not normalize, reformat, minify, reorder, or restyle unrelated code as part of a feature change.

## Before writing

Confirm:

- the current branch and source revision;
- the canonical project path;
- the current implementation of the feature being changed;
- related CSS and component dependencies;
- responsive behavior;
- reduced-motion and accessibility behavior;
- whether another recent change already touched the same area.

If a file is difficult to retrieve completely, do not reconstruct it from partial output. Retrieve the necessary ranges or use an appropriate repository editing workflow before writing.

## Frontend preservation rules

For landing-page and console work:

- preserve the existing component structure unless restructuring is explicitly requested;
- preserve the approved VoxVector palette and existing design tokens;
- preserve existing typography scale and spacing unless the request changes them;
- preserve mobile behavior while changing desktop behavior and vice versa;
- preserve existing animation timing unless the requested change specifically targets animation;
- avoid broad selectors that can unintentionally affect unrelated components;
- scope new CSS to the smallest stable component or feature selector;
- avoid duplicate competing implementations of the same interaction;
- do not introduce a second menu, header, waveform, or navigation system when one already exists.

## Animation rules

Animations must be purposeful and state-driven where possible.

- Scope animation to the requested surface.
- Do not apply a new scroll reveal globally when the request concerns a specific section.
- Keep reduced-motion behavior intact.
- Do not use animation to imply analysis, telemetry, scientific evidence, or system activity that did not occur.
- Decorative waveforms and analytical graphics must remain explicitly illustrative.

## Readback and integrity check

After every substantive edit:

1. Re-read the modified file.
2. Confirm the requested behavior is present.
3. Confirm unrelated sections remain present.
4. Check imports, selectors, component names, and referenced assets.
5. Inspect the resulting diff when the tooling permits.
6. Check for accidental deletions, duplicate rules, duplicate components, or formatting loss.
7. Run the applicable build, test, or browser verification when available.
8. Report what was actually verified and what remains unverified.

## Documentation preservation

Runtime changes must not silently erase project context. Preserve planned capabilities, historical decisions, and canonical terminology. If a change establishes a new development convention, update this document or the appropriate canonical project documentation rather than relying on conversation memory.

## Completion standard

A task is not complete merely because the edited file was successfully written. Completion requires a readback/integrity check and an honest statement of verification status.

When uncertain, make the smallest defensible change and inspect before proceeding to a broader change.
