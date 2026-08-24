# VoxVector — ChatGPT Agent Instructions

## PURPOSE

These instructions are for **AI agents working on VoxVector**. They are execution instructions, not a product policy document.

The agent's job is to make the requested change **in the correct existing place, without breaking anything else, and then prove what changed**.

The GitHub repository is the source of truth. Conversation memory, screenshots, previous assistant output, assumptions, and generated mockups are not authoritative.

## 1. FIRST RULE: FIND THE REAL CODE BEFORE TOUCHING ANYTHING

Never start editing because a filename looks likely.

Before changing anything:

1. Read `VoxVector/docs/OPERATING_CHARTER.md`.
2. Read `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`.
3. Read `VoxVector/docs/AI_EDITING_GUARDRAILS.md`.
4. Read the relevant architecture, pipeline, capability, or product documentation for the requested area.
5. Search the repository for the exact page, route, component, text, selector, asset, API endpoint, or feature being changed.
6. Open the actual implementation.
7. Trace imports, references, route registration, CSS, runtime refinements, and related files before deciding where the change belongs.

**Do not guess the implementation location.**

If multiple files appear to implement the same thing, determine which one is canonical before editing. Do not blindly modify the first match.

## 2. SECOND RULE: CLASSIFY THE USER'S REQUEST

Determine what the user actually asked for:

- copy/text change
- styling/visual change
- responsive change
- existing interaction change
- bug fix
- feature addition
- backend/API change
- analysis-engine change
- documentation change
- new page/route
- architecture change

Default to the **smallest change category** that satisfies the request.

If the request is "change this", do not interpret it as "redesign this".

If the request is "make this smaller", do not replace the component.

If the request is "fix this", do not rewrite unrelated code.

## 3. EDIT THE CANONICAL IMPLEMENTATION, NOT A COPY

When the requested thing already exists, edit the existing canonical implementation.

Never create:

- `v2`
- `new`
- `final`
- `backup`
- `old`
- `copy`
- `index2`
- `dashboard-new`
- `landing-new`
- alternate route copies
- duplicate components
- duplicate asset sources

These are not solutions. They create ambiguity and make future agents edit the wrong place.

A new file is appropriate only when the user requested genuinely new functionality or the architecture requires a new implementation.

## 4. NEVER RECREATE AN EXISTING PAGE FOR A SMALL CHANGE

This is a hard rule.

If an existing page contains 500 lines and the user asks to change one heading, button, image, spacing value, color, or component size, modify the relevant lines.

**Do not regenerate the entire page.**

Do not rebuild a page from:

- a screenshot
- an image reference
- conversation memory
- a description of the desired appearance
- an older version of the page
- a simplified approximation

A screenshot is a visual reference, not a replacement source file.

A page rewrite is permitted only when the user explicitly asks for a rewrite/replacement/migration or when an architectural change genuinely requires it.

## 5. PRESERVE EVERYTHING THE USER DID NOT ASK TO CHANGE

When making a targeted change, assume everything else is intentional and must survive.

Preserve:

- existing components
- routes
- navigation
- buttons
- forms
- state
- API calls
- authentication
- data loading
- event handlers
- responsive behavior
- accessibility
- keyboard behavior
- mobile behavior
- desktop behavior
- animations
- analytics
- error handling
- imports
- asset references
- existing copy
- existing visual hierarchy

Do not remove something merely because it is not visible in a screenshot or not mentioned in the latest request.

## 6. BEFORE EDITING A FILE, KNOW WHY THAT FILE IS THE RIGHT FILE

For every substantive change, be able to answer internally:

**"Why is this the canonical place for this change?"**

Examples:

- If text is rendered by a React component, change the component, not an unrelated HTML file.
- If styling is controlled by a component stylesheet or Tailwind classes, change the actual style source, not a generated artifact.
- If a runtime refinement changes a rendered component, modify the refinement responsible for that behavior rather than creating another component.
- If an asset is canonical under `VoxVector/Assets/`, do not create a second permanent copy under another directory.
- If a route is registered centrally, change the route registration and canonical page rather than creating a second route with a similar name.
- If behavior originates in the backend, do not fake the behavior in the frontend.

## 7. TRACE THE CHANGE THROUGH THE APPLICATION

For anything beyond a trivial copy edit, trace the complete path:

`user request → UI/component → state/event → API → backend/engine → response → UI`

Determine which layer actually owns the behavior.

Do not patch a symptom in the wrong layer simply because that file is easier to edit.

If the user reports that something "isn't changing", inspect:

1. whether the edited file is actually imported;
2. whether another implementation overrides it;
3. whether runtime code modifies it after render;
4. whether CSS specificity overrides the change;
5. whether the build is using a different asset;
6. whether the deployed site is serving the latest commit;
7. whether caching is involved.

Do not declare a fix until the actual cause is identified or the available evidence is clearly stated.

## 8. SEARCH BEFORE CREATE

Before creating a component, page, route, CSS rule, asset, API endpoint, utility, or documentation section:

1. Search for an existing implementation.
2. Search for related names and terminology.
3. Search for imports/usages.
4. Search for duplicate or competing implementations.
5. Reuse or modify the canonical implementation when possible.

This is especially important for landing pages, headers, footers, waveforms, dashboards, analysis views, navigation, and shared components.

## 9. MAKE THE SMALLEST SAFE DIFF

Prefer:

- one selector change over stylesheet replacement;
- one component edit over page reconstruction;
- one asset reference correction over copying assets;
- one route correction over adding another route;
- one API change over frontend simulation;
- one targeted text replacement over rewriting surrounding markup.

Avoid unrelated formatting changes.

Do not reformat entire files unless necessary.

Do not reorder imports or rewrite surrounding code just because a different structure looks cleaner.

The smaller the requested change, the smaller the expected diff.

## 10. READ BACK AFTER EVERY WRITE

After modifying a file:

1. Read the modified file back.
2. Confirm the requested change is actually present.
3. Confirm important surrounding code still exists.
4. Confirm imports and references remain valid.
5. Search for accidental duplicate components, selectors, routes, or assets.
6. Inspect the diff.

Never assume a successful write means a correct edit.

## 11. VERIFY THAT NOTHING BROKE

For substantive changes, verification is mandatory whenever tooling permits.

At minimum:

1. Build the application.
2. Check for build errors and warnings that affect the change.
3. Verify the changed page or component.
4. Verify the relevant desktop and mobile state.
5. Verify the requested behavior.
6. Verify that important pre-existing functionality remains present.
7. If the change affects runtime/API behavior, exercise the relevant path.
8. If deployment is involved, inspect the actual deployed result when tooling permits.

A build passing is not the same thing as the feature being correct.

A screenshot looking correct is not proof that the underlying application still works.

## 12. USE BROWSER VERIFICATION WHEN VISUAL BEHAVIOR MATTERS

For UI changes, browser verification should be used when available.

Check:

- the actual route;
- the changed element;
- mobile viewport;
- desktop viewport;
- console errors;
- missing assets;
- broken interactions;
- layout overflow;
- duplicated elements;
- responsive regressions.

Do not rely only on source code when the request concerns what the user sees.

## 13. DO NOT CONFUSE SOURCE CODE WITH GENERATED OUTPUT

Never make permanent edits to generated build output when the source implementation is elsewhere.

Never treat `dist/` as the canonical source.

Never edit generated deployment artifacts to hide a source problem.

Determine the actual source → build → deployment path before changing deployment-related files.

## 14. ASSET RULES

Before changing an image, logo, icon, waveform, or other asset:

1. Search for all copies.
2. Identify the canonical source asset.
3. Identify where the application references it.
4. Identify whether the build stages/copies it.
5. Change the canonical source/reference rather than creating another copy.
6. Verify the emitted asset exists after build.

Do not solve a missing asset by creating a duplicate in a random directory.

## 15. DEPLOYMENT RULES

Current architecture:

- frontend: GitHub Pages
- backend: Render
- operational/auth data: Supabase
- Vercel: retired

Production frontend comes from `main`.

Never deploy a feature branch directly over production.

Current review flow:

`feature branch → PR → build → artifact/isolated preview → review → merge → production`

A successful GitHub Actions run does not prove the live site is correct.

When a user says a change "isn't there", investigate the entire chain:

`source file → commit → workflow → build artifact → deployed revision → browser`

Do not immediately make another code change until you determine where the previous change disappeared.

## 16. DOCUMENTATION IS NOT THE IMPLEMENTATION

Documentation must describe the actual implementation. It must never be used as evidence that functionality exists.

When runtime behavior changes, update the affected canonical documentation after the implementation is verified.

Do not update documentation first and then assume the feature exists.

## 17. SCIENTIFIC INTEGRITY

No single vocal, acoustic, linguistic, behavioral, emotional, psychological, or temporal feature proves deception.

Never fabricate:

- analysis results
- probabilities
- confidence scores
- measurements
- validation
- datasets
- model performance
- telemetry
- completed pipeline stages

Keep eligibility, evidence collection, candidate classification, and final disposition separate.

Software verification is not scientific validation.

## 18. WHEN THE REQUEST IS AMBIGUOUS

Do not make a broad interpretation.

Inspect the repository and choose the smallest defensible interpretation.

Ask a clarification question only when the ambiguity materially changes which code should be changed or what behavior should result.

Otherwise make the narrow change that best matches the user's words and preserve everything else.

## 19. WHEN SOMETHING IS ALREADY BROKEN

Do not stack another workaround on top of an unknown problem.

First determine:

- what is broken;
- where it is implemented;
- what changed recently;
- whether the canonical implementation is actually being used;
- whether another file overrides it;
- whether the failure is source, build, deployment, or runtime.

Fix the underlying cause in the correct layer.

## 20. COMPLETION CHECKLIST

Before telling the user a change is done, confirm as applicable:

- [ ] Correct repository and canonical project path used.
- [ ] Current implementation inspected before editing.
- [ ] Correct canonical file/component/route identified.
- [ ] No duplicate implementation created.
- [ ] Change was scoped to the requested area.
- [ ] Existing functionality preserved.
- [ ] Modified file read back.
- [ ] Diff inspected.
- [ ] Related references searched.
- [ ] Build completed successfully when applicable.
- [ ] Browser/UI behavior checked when applicable.
- [ ] Mobile behavior checked when applicable.
- [ ] Runtime/API behavior checked when applicable.
- [ ] Deployment checked when applicable.
- [ ] Documentation synchronized when required.
- [ ] No unverified claim made.

If a check could not be performed, say so. Never imply that it happened.

## 21. RESPONSE TO THE USER

Do not bury the result in a long explanation.

When the work is complete, tell the user:

1. **what changed**;
2. **where it was changed**;
3. **what was verified**;
4. **anything that could not be verified**.

If something failed, say exactly what failed and why.

Do not say "done" merely because a file was edited.

## FINAL AGENT DIRECTIVE

**Find it. Understand it. Change the right place. Change only what was requested. Read it back. Build it. Verify it. Make sure the old functionality survived. Then report exactly what happened.**

Never rebuild an existing page when a targeted edit will do.

Never create a duplicate to avoid finding the canonical implementation.

Never fake behavior in a different layer because the correct layer is harder to reach.

Never assume a change deployed.

Never claim verification that did not happen.

When something goes wrong, investigate the chain instead of stacking workarounds.

The goal is not merely to produce code. The goal is to make the **correct change to the real VoxVector application without breaking the product around it**.
