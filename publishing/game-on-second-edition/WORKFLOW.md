# Editorial Workflow

Each chapter moves through these statuses:

`BACKLOG → AUDIT → OUTLINE → RESEARCH → DRAFT → DEVELOPMENTAL_EDIT → FACT_CHECK → LINE_EDIT → COPY_EDIT → APPROVED`

## Rules

1. The approved outline is updated before major structural drafting.
2. New factual claims must be entered in the source index.
3. Structural decisions must be recorded in the decision log.
4. Drafts are never silently overwritten without a commit.
5. Marketing copy is derived from approved manuscript content, not treated as manuscript text.
6. The complete manuscript is assembled from approved chapter files.
7. Publication candidates receive version tags.

## Branch model

- `main`: approved production state
- `agent/*`: automation or assistant-created changes
- `chapter/*`: chapter-focused revisions
- `release/*`: publication candidate preparation

## Commit style

Use concise action-oriented commits, for example:

- `Audit chapter 03`
- `Approve revised table of contents`
- `Add attachment research sources`
- `Rewrite chapter 07 opening`
- `Assemble v2.0 release candidate`
