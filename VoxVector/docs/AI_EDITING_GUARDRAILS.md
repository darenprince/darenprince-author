# VoxVector AI Editing Guardrails

## Purpose

This document defines the editing discipline for AI agents modifying VoxVector. It exists to prevent visual regressions accidental loss of functionality incomplete changes formatting churn silent overwrites and inconsistent product communication during iterative development.

VoxVector is the end product being built. AI work should advance the complete product architecture rather than optimize for superficial completion of isolated screens.

## Surgical editing is the default

When changing an existing file:

1. Read the current file before editing it.
2. Identify the smallest exact region that satisfies the request.
3. Preserve all unrelated code markup classes imports comments ordering formatting responsive rules accessibility behavior and existing visual treatments.
4. Prefer additive or narrowly targeted edits over reconstruction.
5. Never replace a large file from memory or from an earlier snapshot when only a small change is required.
6. Never remove existing functionality merely because it is not directly relevant to the current request.
7. Do not normalize reformat minify reorder or restyle unrelated code as part of a feature change.
8. When a requested change affects architecture update every dependent surface that must remain synchronized rather than patching only the most visible file.

## Thoroughness standard

For substantive requests do not stop at the first matching file.

Trace the requested concept across:

- runtime implementation
- frontend components
- API contracts
- analysis engine
- method registries
- pipeline definitions
- capability status
- roadmap
- QA and validation records
- version documentation
- product documentation
- Crown Labs Bible mirrors
- deployment configuration
- customer-facing pages
- AI project instructions when the request establishes a persistent operating rule

Update all affected canonical surfaces. Do not create contradictory duplicate definitions.

When a request says `everywhere` `all` `update the docs` or equivalent treat it as a repository-wide synchronization task. Search for related terminology and inspect the relevant results before declaring completion.

## Before writing

Confirm:

- the current branch and source revision;
- the canonical project path;
- the current implementation of the feature being changed;
- related CSS and component dependencies;
- responsive behavior;
- reduced-motion and accessibility behavior;
- whether another recent change already touched the same area;
- the canonical documentation governing the change;
- dependent documentation and mirrors;
- the deployment surface affected by the change.

If a file is difficult to retrieve completely do not reconstruct it from partial output. Retrieve the necessary ranges or use an appropriate repository editing workflow before writing.

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
- do not introduce a second menu header waveform or navigation system when one already exists;
- make interactive analysis views genuinely functional rather than static mockups.

## Product communication rules

VoxVector customer-facing communication must be confident direct premium modern and technology-forward.

Lead with:

- capability
- technology
- intelligence
- workflow
- analysis depth
- multimethod evidence
- product value
- the complete end-state architecture

Do not turn public product pages into internal QA reports.

Keep implementation maturity validation records failure modes and engineering caveats in developer repository and QA documentation where they belong.

Avoid customer-facing limitation language that unnecessarily reduces confidence in the product. Do not frame VoxVector as merely experimental or as a generic audio analysis tool.

Do not replace negative framing with fabricated claims. Accuracy remains mandatory. If a capability is being engineered describe the product architecture and capability direction without falsely claiming an execution that did not occur.

## Animation rules

Animations must be purposeful and state-driven where possible.

- Scope animation to the requested surface.
- Do not apply a new scroll reveal globally when the request concerns a specific section.
- Keep reduced-motion behavior intact.
- Do not use animation to imply analysis telemetry scientific evidence or system activity that did not occur.
- Decorative waveforms and analytical graphics must remain explicitly illustrative.

## Readback and integrity check

After every substantive edit:

1. Re-read the modified file.
2. Confirm the requested behavior is present.
3. Confirm unrelated sections remain present.
4. Check imports selectors component names and referenced assets.
5. Search for dependent references to the changed concept.
6. Inspect the resulting diff when the tooling permits.
7. Check for accidental deletions duplicate rules duplicate components or formatting loss.
8. Run the applicable build test or browser verification when available.
9. Verify documentation synchronization.
10. Report what was actually verified internally and keep customer-facing copy focused on the product.

## Documentation preservation

Runtime changes must not silently erase project context. Preserve planned capabilities historical decisions and canonical terminology.

When a change establishes a new development convention update the appropriate canonical project documentation rather than relying on conversation memory.

When product language changes update the product messaging policy and relevant product mirrors.

When a pipeline changes synchronize the pipeline specification frontend pipeline view method index capability records and relevant product documentation.

## Completion standard

A task is not complete merely because an edited file was successfully written.

Completion requires:

- implementation review;
- dependency review;
- documentation synchronization;
- readback and integrity check;
- applicable build or test verification;
- confirmation that no duplicate or contradictory implementation was introduced.

If verification is unavailable record that internally. Do not use missing verification as customer-facing messaging.

When uncertain make the smallest defensible change and inspect before proceeding to a broader change.
