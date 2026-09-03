# VoxVector Cloud Platform Runtime Audit

**Audit date:** 2026-09-03  
**Source of truth:** `VoxVector/docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`

## Executive status

The active VoxVector production architecture remains intentionally split by function: the public React application is delivered through GitHub Pages, the canonical FastAPI analysis runtime is hosted on Render, and Supabase provides the configured authentication, persistence, diagnostics, and private media boundary.

The connected Render audit confirms that the API is live, but its current free runtime is constrained to approximately 0.15 CPU and 512 MiB memory with one instance. Recent sampled memory usage was approximately 92–100 MB and repeated `/health` requests returned HTTP 200. These observations are operational evidence, not a controlled workload benchmark.

An AWS ECS/Fargate benchmark foundation has now been assembled in `us-east-1` from the canonical repository. It is a benchmark environment, not a second production route.

## Current migration decision

The only production migration boundary under consideration is backend compute. GitHub Pages and Supabase remain unchanged during benchmarking.

Render remains the production baseline. AWS is being used as the explicitly requested controlled comparison environment. Production DNS, frontend API configuration, and persistence ownership must not change until measured results justify the change.

## Connected cloud findings

### Render

The live service is `voxvector-api`, rooted at `VoxVector`, on the `main` branch in the Oregon region. It uses Python/FastAPI, has automatic deploys enabled, and checks `/health`.

The latest live deploy observed in the audit is commit `ccbcbec261812c51920a9305ffb265607616d575`.

No Render Postgres or Key Value instances were present in the connected workspace.

### AWS

The benchmark foundation now includes:

* ECR repository `voxvector-api` with scan-on-push enabled
* ECS cluster `voxvector`
* CloudWatch log group `/ecs/voxvector-api`
* dedicated ECS execution role
* GitHub Actions OIDC deployment role restricted to the repository's `main` branch
* benchmark VPC subnets and security group
* canonical `VoxVector/Dockerfile`
* canonical `.github/workflows/voxvector-aws-ecs.yml`

The workflow builds the canonical image, pushes a commit-SHA tag to ECR, registers a 1 vCPU / 2 GiB Fargate task definition, creates or updates the benchmark service, and verifies `/health` against the running task.

At the time of this mirror update, the active workflow had successfully reached AWS credential configuration, identity verification, ECR login, and Docker build. ECS service and `/health` success remain pending direct workflow verification.

The task has no Render or Supabase secret values. Therefore health verification will not by itself establish authenticated case intake or full analysis parity.

### Azure / Cosmos DB

No usable Azure Cosmos DB inspection capability was exposed in the connected tool surface during this audit. No claim is therefore made about the user's Cosmos resources. Cosmos DB is not required for the first compute benchmark because replacing or duplicating the current Supabase persistence layer would enlarge the migration surface without addressing the observed Render compute constraint.

## Required benchmark measurements

The controlled comparison must capture startup/readiness, upload latency, analysis duration, peak CPU, peak memory, process stability, and request failure behavior using the same canonical API and representative test workload.

A cloud migration result must be reported separately from VoxVector's scientific validation status. Infrastructure measurements do not validate deception inference.

**Full canonical audit:** `VoxVector/docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`
