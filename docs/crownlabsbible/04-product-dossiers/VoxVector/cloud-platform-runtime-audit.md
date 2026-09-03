# VoxVector Cloud Platform Runtime Audit

**Audit date:** 2026-09-03  
**Source of truth:** `VoxVector/docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`

## Executive status

The active VoxVector production architecture remains intentionally split by function: the public React application is delivered through GitHub Pages, the canonical FastAPI analysis runtime is hosted on Render, and Supabase provides the configured authentication, persistence, diagnostics, and private media boundary.

The connected Render audit confirms that the API is live, but its current free runtime is constrained to approximately 0.15 CPU and 512 MiB memory with one instance. Recent sampled memory usage was approximately 92–100 MB and recent CPU usage was low, while repeated `/health` requests returned HTTP 200. These observations are operational evidence, not a controlled workload benchmark.

## Current migration decision

The only production migration boundary under consideration is backend compute. GitHub Pages and Supabase remain unchanged during benchmarking.

The next engineering step is to containerize the canonical API reproducibly and benchmark the identical runtime on one candidate cloud platform. Production DNS, frontend API configuration, and persistence ownership should not change until measured results justify the change.

## Connected cloud findings

### Render

The live service is `voxvector-api`, rooted at `VoxVector`, on the `main` branch in the Oregon region. It uses Python/FastAPI, has automatic deploys enabled, and checks `/health`.

The latest live deploy is commit `ccbcbec261812c51920a9305ffb265607616d575`.

No Render Postgres or Key Value instances were present in the connected workspace.

### AWS

Selected connected AWS inventory checks returned zero S3 buckets, zero ECS clusters in `us-east-1`, and zero ECR repositories in `us-east-1`. The available wrapper did not provide a reliable complete account-wide enumeration for every requested service, so no broader resource, identity, or credit conclusion is recorded here.

AWS remains a second benchmark option rather than an immediate production path.

### Azure / Cosmos DB

No usable Azure Cosmos DB inspection capability was exposed in the connected tool surface during this audit. No claim is therefore made about the user's Cosmos resources. Cosmos DB is not required for the first compute benchmark because replacing or duplicating the current Supabase persistence layer would enlarge the migration surface without addressing the observed Render compute constraint.

## Required benchmark measurements

The controlled comparison must capture startup/readiness, upload latency, analysis duration, peak CPU, peak memory, process stability, and request failure behavior using the same API container and representative test workload.

A cloud migration result must be reported separately from VoxVector's scientific validation status. Infrastructure measurements do not validate deception inference.

**Full canonical audit:** `VoxVector/docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`
