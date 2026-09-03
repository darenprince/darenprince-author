# VoxVector System Architecture and AUTO Workflow

**Status:** Canonical active architecture and operating workflow  
**Effective:** 2026-09-03  
**Authority:** Technical implementation is controlled by the VoxVector repository. This document consolidates the current system boundary, deployment model, documentation structure, and mandatory engineering workflow.

## 1. System at a glance

```text
GitHub repository: darenprince/darenprince-author
│
├── voxvector/                         PUBLIC REACT APPLICATION
│   ├── React + Vite
│   ├── SiteHeader / shared UI
│   ├── public product surfaces
│   ├── Developer Console
│   ├── authenticated browser session
│   └── API client
│          │
│          └──────── HTTPS ────────┐
│                                  ▼
├── VoxVector/                        CANONICAL BACKEND + ANALYSIS
│   ├── api/                          FastAPI adapter
│   ├── src/voxvector/                canonical analysis engine
│   ├── tests/                        backend/software QA
│   └── docs/                         canonical technical documentation
│                                  │
│                                  ▼
│                              Supabase
│                         ┌────────┼────────┐
│                         ▼        ▼        ▼
│                       Auth    Database  Private Media
│
└── .github/workflows/
    ├── VoxVector QA
    ├── GitHub Pages deployment
    └── supporting build automation
```

## 2. Runtime and deployment boundaries

### Public application

The canonical public frontend is `voxvector/`.

Production path:

`GitHub main → GitHub Actions → Vite production build → GitHub Pages artifact → https://darenprince.com/voxvector/`

GitHub Pages owns public static delivery. It does not execute the FastAPI backend.

### Original API

The original VoxVector API remains:

`VoxVector/api + canonical engine → Render runtime → https://voxvector.crownlabs.tech`

This domain is preserved as the existing API endpoint.

### AWS API environment

The separately addressed AWS environment is:

`VoxVector/api + canonical engine → GitHub Actions → ECR → ECS Fargate → Application Load Balancer → https://awsapi.crownlabs.tech`

The AWS Application Load Balancer terminates HTTPS using the issued ACM certificate for `awsapi.crownlabs.tech`. HTTP requests on port 80 redirect to HTTPS. ECS application traffic remains on port 8000 behind the ALB security boundary.

AWS is an additional deployment environment. It does not automatically replace the original Render API domain.

### Operational data

Supabase is the operational persistence boundary for the configured architecture, including:

- authentication/session support
- case and operational persistence
- diagnostics where configured
- private media storage

The API mediates authenticated server-side operations between the browser and protected backend/storage resources.

### Critical upload clarification

Audio is **not persisted on Render**.

The existing production upload path is:

`Browser → GitHub Pages frontend → HTTPS API request → Render-hosted FastAPI runtime → Supabase private media storage`

The AWS environment has separate compute/ingress infrastructure. AWS runtime health does not establish authenticated Supabase parity unless those dependencies are deliberately configured and verified there.

## 3. Application design

### Shared ownership

Shared chrome must have one canonical owner with multiple consumers.

Use explicit React composition and props for contextual controls. Do not inject or mutate another component at runtime.

Current shared public header ownership is centered on:

`voxvector/src/components/SiteHeader.jsx`

Console-specific analysis controls remain in their canonical console/workspace owners.

### Protected product surfaces

The Developer Console and Analysis Workspace are behavior-preservation surfaces. Architectural cleanup must not rebuild them to make a migration easier.

Preserve real functionality including audio controls, waveform/spectrogram behavior, gain controls, analysis state, API handling, authentication, case workflow, Recharts 3 charts, and developer tooling unless a change explicitly targets them.

### Analysis architecture

The canonical analysis engine remains downstream of the HTTP adapter. The frontend never recreates the analysis engine.

The runtime must keep distinct:

1. eligibility and reliability
2. evidence collection and analysis
3. candidate classification
4. final classification/disposition

No individual vocal or behavioral signal is independently treated as proof of deception.

## 4. Repository and documentation structure

### Canonical technical layer

`VoxVector/docs/` contains the active technical governance and engineering records.

Core documents:

- `OPERATING_CHARTER.md` — authority and non-negotiable operating rules
- `PROJECT_DECISION_LOG.md` — durable architectural decisions
- `ARCHITECTURE.md` — application and analysis architecture
- `DEPLOYMENT_BOUNDARY.md` — production boundary and hosting responsibility
- `ENDPOINT_REGISTRY.md` — current endpoint ownership and migration boundary
- `DEVELOPMENT_WORKFLOW.md` — mandatory editing/migration workflow
- `STORAGE_AND_OBSERVABILITY.md` — storage and diagnostic architecture
- `SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md` — consolidated system map and AUTO workflow

Historical checkpoints remain traceability records. They are not automatically active instructions.

### Crown Labs synchronization layer

`docs/crownlabsbible/04-product-dossiers/VoxVector/` is the executive/product mirror.

The Crown Labs Bible does not override implementation. Material architecture, deployment, workflow, or product-boundary changes must be synchronized to the corresponding VoxVector dossier documents.

The mirror must identify its canonical technical source rather than silently diverging.

## 5. AUTO workflow

AUTO means **Architecture → Ownership → Trace → Operate/verify**. It is not permission to automate assumptions.

### A. Architecture

Before a substantive change:

1. read the Operating Charter
2. read relevant decisions
3. identify frontend/backend/storage/deployment boundaries
4. identify whether the issue is source, build, deployment, runtime, persistence, or browser behavior
5. inspect the current repository HEAD

Never diagnose a deployment issue by assuming all runtime surfaces are the same system.

### U. Understand ownership

For every affected behavior:

1. find the canonical owner
2. inspect its complete current contents
3. trace imports, consumers, routes, state, API calls, assets, and CSS
4. search for patches/refinements/overrides/duplicates
5. inspect each candidate's actual behavior and relevant git history

A patch name is not evidence that its behavior is obsolete.

### T. Trace the complete chain

Trace the exact chain:

`source → commit → workflow → artifact/runtime → external service → browser`

For data failures, trace:

`UI event → frontend request → API endpoint → canonical service → persistence/provider → response → UI state`

Do not stop at a green build. Do not stop at a healthy host. Identify the actual failing boundary.

### O. Operate and verify

Make the smallest safe change in the canonical owner.

Then:

1. read the modified source back
2. inspect the diff
3. search for competing ownership
4. run relevant tests/builds
5. verify the exact workflow run for the commit
6. verify the deployed artifact/runtime when tooling permits
7. verify the requested browser behavior
8. update canonical docs after implementation
9. synchronize Crown Labs mirrors where applicable

Never claim verification that did not occur.

## 6. Patch migration protocol

Before deleting any patch, refinement, override, recovery, compatibility layer, or duplicate:

1. inspect complete contents
2. identify every behavior it changes
3. compare behavior with the current canonical owner
4. inspect chronology where useful
5. migrate missing required behavior into the canonical owner
6. verify the canonical behavior
7. trace remaining dependencies
8. only then retire obsolete ownership

The objective is **behavior preservation plus ownership consolidation**, not file deletion.

## 7. Failure-debugging protocol

Classify failures before editing:

| Boundary | Primary evidence |
|---|---|
| Source | canonical file and git diff |
| Build | exact CI/build log |
| Deployment | workflow run and artifact/deployment state |
| Browser | deployed app/network/runtime behavior |
| API | endpoint request/response and server behavior |
| Storage | API-to-provider contract and provider result |
| Auth | session/token/authorization boundary |
| Analysis | canonical engine inputs, outputs, and tests |

A healthy Render service does not prove Supabase storage succeeded. A green GitHub Actions build does not prove browser behavior. A visible frontend error does not identify the backend boundary without tracing the request.

## 8. Completion standard

A change is complete only when the claimed scope has evidence.

- Build success is build verification.
- Runtime success is runtime verification.
- Browser success is browser verification.
- Scientific validation is scientific validation.

These are separate claims.

## 9. Current architectural baseline

As of this document:

- `voxvector/` is the canonical public React/Vite workspace.
- `VoxVector/` is the canonical FastAPI and analysis-engine workspace.
- GitHub Actions builds/tests and deploys the public frontend artifact to GitHub Pages.
- Render remains the original API host at `https://voxvector.crownlabs.tech`.
- AWS exposes a separately addressed API environment at `https://awsapi.crownlabs.tech` through an HTTPS Application Load Balancer and ECS Fargate.
- Supabase provides the configured authentication, persistence, diagnostics, and private media-storage services.
- The Developer Console is part of the React application and communicates with the configured API endpoint.
- Audio upload is mediated by the API and persisted through the storage architecture; it is not durable Render storage.
- Crown Labs documentation mirrors material architecture without overriding repository canon.
- `VoxVector/docs/ENDPOINT_REGISTRY.md` is the canonical endpoint map.

## 10. Mandatory agent rule

When uncertain:

**inspect first, trace second, edit the canonical owner third, verify the complete chain fourth, document after the implementation is real.**

Do not fill architectural gaps with assumptions.

## Observability architecture

Operational diagnostics follow: API runtime event → sanitized emitter → immutable Supabase Storage archive plus relational Supabase projection → authenticated diagnostics API → Developer Console. The archive supports provenance and fallback; relational projections support efficient Live Logs and Error Reports. Missing records are a tracing problem until the complete chain is verified.

## 11. Endpoint synchronization rule

The active endpoint roles are:

- Public frontend: `https://darenprince.com/voxvector/`
- Original API: `https://voxvector.crownlabs.tech`
- AWS API: `https://awsapi.crownlabs.tech`

Any production API cutover must be explicit, source controlled, tested, and documented. An AWS infrastructure change alone does not authorize changing the frontend API base or repointing the original API domain.
