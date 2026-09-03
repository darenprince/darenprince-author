# VoxVector System State Report

**State date:** 2026-09-03
**Repository:** `darenprince/darenprince-author`
**Canonical branch:** `main`
**Backend root:** `VoxVector/`
**Frontend root:** `voxvector/`
**Backend software version:** `0.2.26`
**Frontend version:** `0.2.36`

## Executive summary

VoxVector is a functional vocal and audio analysis foundation being developed into a complete deception analysis product.

The repository uses a case-centered architecture with one canonical analysis engine, one case identity chain, and one 21-stage product pipeline. The architecture keeps eligibility/reliability, evidence analysis, candidate classification, and final disposition separate.

## Current verified state

### Repository and deployment boundary

- `VoxVector/` is the canonical backend and analysis-engine root.
- `voxvector/` is the canonical public React application.
- `VoxVector/api/app.py` is the HTTP adapter.
- `VoxVector/src/voxvector/` is the canonical analysis engine.
- GitHub Pages hosts the public React application at `https://darenprince.com/voxvector/`.
- The original API remains on Render at `https://voxvector.crownlabs.tech`.
- A separately addressed AWS API environment is available at `https://awsapi.crownlabs.tech` through AWS Application Load Balancer and ECS Fargate.
- Supabase provides authentication, persistence, diagnostics, and private media storage for the configured architecture.
- Vercel is retired.

### AWS runtime

The AWS deployment currently has:

- ECR repository `voxvector-api`
- ECS cluster `voxvector`
- ECS service `voxvector-api`
- Fargate task definition `voxvector-api:1`
- Application Load Balancer `voxvector-api-alb`
- target group `voxvector-api-tg`
- HTTPS listener on port 443
- HTTP port 80 redirecting to HTTPS
- ACM certificate for `awsapi.crownlabs.tech`
- DNS certificate validation status `SUCCESS`
- certificate status `ISSUED`
- healthy ECS target on port 8000

The ECS application port is restricted to the ALB security group. Direct unrestricted public ingress to port 8000 was removed.

AWS-side verification confirms the ALB is active and the target is healthy. CloudWatch application logs show repeated successful `/health` HTTP 200 responses.

The public custom-domain request itself has not been independently browser-tested through the current tool surface. Therefore public DNS/HTTPS reachability is not recorded as browser-verified.

### Current CI verification

GitHub Actions verification must be tied to the exact source revision being evaluated. A green CI run does not by itself establish browser behavior, runtime parity, or scientific validity.

### Case spine and intake

The connected case path is implemented:

`create case → upload WAV → persist private source → obtain signed playback → execute case-bound analysis → persist run`

Case records preserve ownership, source metadata, SHA-256 provenance, run identity, status, and current run state. Private media uses Supabase Storage and signed URLs.

### Current analysis pipeline

The primary `VoxVectorPipeline` integrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux and rolloff, MFCC, formant tracking, pause topology, optional baseline comparison, optional response latency, and optional transcript disfluency observations.

Current 21-stage implementation state remains:

- 14 implemented runtime foundations;
- 4 conditional or intentionally not invoked without required inputs;
- 3 queued for deeper integration.

### Analysis Results / Review Evidence

The current product priority has moved from intake reliability to the post-analysis review path. The existing case result persists the run result, observations, evidence, candidate state, disposition, limitations, and provenance. The next engineering layer is to make that composed result a first-class review contract and expose it directly in the Analysis Workspace.

### Developer Console

The console is connected to:

- `/health`
- case creation/list/retrieval
- source upload
- signed playback
- case-bound analysis
- diagnostics
- GitHub-backed QA/deployment status
- the 21-stage engineering status surface

The engineering status component compares workflow SHA to the runtime source revision and marks mismatches as `STALE` rather than presenting unrelated workflow results as current. It also exposes the distinct AWS endpoint configuration without changing the frontend's default API base.

## Current engineering priorities

1. Complete the canonical composed Analysis Results contract.
2. Expose Review Evidence immediately after successful analysis.
3. Instrument true per-stage lifecycle timing and outcome telemetry.
4. Verify production relational diagnostic projections and Developer Console rendering.
5. Build speaker identification/diarization.
6. Integrate production transcription and alignment.
7. Expose real analytical tracks and normalized evidence.
8. Implement evidence synthesis, assessment, reporting, and history/reopen.
9. Complete browser-level production verification for both the existing and AWS deployment environments where configured.
10. Advance the separate scientific validation program.

## Endpoint registry

The authoritative endpoint map is `docs/ENDPOINT_REGISTRY.md`.

```text
Public frontend
https://darenprince.com/voxvector/

Original API
https://voxvector.crownlabs.tech

AWS API environment
https://awsapi.crownlabs.tech
```

The original API domain remains preserved. AWS is a separately addressed deployment environment.

## Verification boundaries

CI passing does not prove browser functionality, production deployment health, or scientific validity.

AWS container and ALB health prove cloud runtime readiness at those boundaries. They do not establish authenticated Supabase parity or end-to-end analysis parity with the original Render environment.

Scientific validation remains separate and requires task-specific operational definitions, speaker-disjoint evaluation, out-of-sample testing, calibration, uncertainty, leakage controls, robustness analysis, and replication as applicable.

## Canonical synchronization

Current endpoint and cloud architecture records:

- `docs/ENDPOINT_REGISTRY.md`
- `docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`
- `docs/DEPLOYMENT_BOUNDARY.md`
- `docs/ARCHITECTURE.md`
- `docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`

Historical checkpoints remain preserved for traceability and must not be used as current status evidence.
