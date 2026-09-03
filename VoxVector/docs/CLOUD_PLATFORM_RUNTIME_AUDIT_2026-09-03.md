# VoxVector Cloud Platform Runtime Audit — 2026-09-03

## Purpose

Record the connected infrastructure observations used to evaluate the existing Render runtime and the AWS benchmark environment. This document is operational evidence only. It is not a scientific validation result and does not change VoxVector's inference capability status.

## Current production boundary

* public React application: `voxvector/` via GitHub Pages
* canonical API and analysis runtime: `VoxVector/` via FastAPI
* authentication, persistence, diagnostics, and private media storage: Supabase
* production API host: Render

AWS is a controlled compute benchmark only. GitHub Pages and Supabase remain unchanged.

## Render — observed production state

Connected Render inspection found the active `voxvector-api` service:

* service id: `srv-da2f88n40ujc73a8m26g`
* repository: `darenprince/darenprince-author`
* root directory: `VoxVector`
* branch: `main`
* runtime: Python
* region: Oregon
* plan: Free
* instances: 1
* health check: `/health`
* start: `uvicorn api.app:app --host 0.0.0.0 --port $PORT`
* build: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
* public URL: `https://voxvector-api.onrender.com`
* auto deploy: enabled on commits to `main`

No Render Postgres or Key Value resources were present in the connected workspace.

Observed resource envelope:

* CPU: `0.15` CPU
* memory: `536,870,900` bytes, approximately 512 MiB
* recent sampled memory: approximately 92–100 MB
* recent sampled CPU: approximately 0.0016–0.0018 CPU

These samples were idle/recent observations, not controlled analysis peaks.

Recent logs contained repeated HTTP 200 `/health` responses and no application error entries in the sampled 50 most recent records. A graceful shutdown was observed, but its cause was not established. Render request-count and latency metrics returned no usable time series in the sampled query, so controlled upload and analysis timing remains unmeasured.

## AWS — benchmark infrastructure assembled

The connected AWS account was used to create the benchmark foundation in `us-east-1`.

Created:

* ECR repository: `voxvector-api`
* ECR URI: `784917519733.dkr.ecr.us-east-1.amazonaws.com/voxvector-api`
* ECR scan-on-push: enabled
* ECS cluster: `voxvector`
* CloudWatch log group: `/ecs/voxvector-api`
* ECS execution role: `VoxVectorECSTaskExecutionRole`
* GitHub Actions OIDC deployment role: `VoxVectorGitHubActionsECSDeploy`
* benchmark security group: `sg-0c6668f81a485d251`
* benchmark subnets: `subnet-0807abba894e8616e`, `subnet-0abedef9ddf7a2314`

The benchmark security group permits public TCP port 8000 solely so the smoke-test workflow can reach a task directly. This is not an approved production security boundary.

## Canonical containerization

`VoxVector/Dockerfile` now packages the canonical FastAPI runtime using Python 3.11 slim, the same base and speech dependency files used by the Render build, FFmpeg support, and `api.app:app` on port 8000.

`VoxVector/.dockerignore` excludes repository metadata, caches, virtual environments, build artifacts, bytecode, and tests.

## Deployment automation

`.github/workflows/voxvector-aws-ecs.yml` now builds the canonical image from `VoxVector/Dockerfile`, authenticates through GitHub OIDC, pushes a commit-SHA-tagged image to ECR, registers a Fargate task definition, creates or updates the ECS service, waits for stability, resolves the running task endpoint, and verifies `/health`.

The benchmark task intentionally has no Render or Supabase secret values. Therefore an AWS health success establishes container/runtime reachability only. It does not establish authenticated case intake, private media persistence, or full analysis parity with Render.

The first workflow run after the workflow correction has reached AWS credential setup, AWS identity verification, ECR login, and Docker build. The ECS deployment and `/health` stages are not yet verified in this record until the workflow completes.

## Azure / Cosmos boundary

No usable Azure Cosmos resource-inspection tool was exposed in the connected tool surface. No claim is made about Cosmos account state, databases, containers, throughput, or cost.

Cosmos DB is not required for this compute benchmark and is not being introduced as a duplicate primary persistence layer.

## Decision

Do not change production routing yet.

The benchmark sequence is:

1. Keep GitHub Pages unchanged.
2. Keep Supabase unchanged.
3. Keep Render as production baseline.
4. Complete AWS ECS deployment from canonical source.
5. Verify AWS `/health`.
6. Measure controlled startup, readiness, upload, analysis duration, CPU, peak memory, and failure behavior where the environment is configured to support the workload.
7. Compare AWS observations with Render before any production routing decision.

## Scientific boundary

Infrastructure placement, CPU, memory, latency, startup behavior, and deployment reliability are operational measurements. They do not constitute scientific validation of deception detection. VoxVector's separation between eligibility/reliability, evidence analysis, candidate classification, and final disposition is unchanged.

## Verification status

**Status:** Render baseline partially observed; AWS benchmark infrastructure assembled; AWS workload deployment verification pending.

**Verified:** Render service configuration and health behavior; Render resource observations; no Render Postgres or Key Value; AWS ECR; AWS ECS cluster; AWS IAM/OIDC deployment foundations; benchmark networking; canonical Dockerfile; canonical Docker workflow through AWS authentication, identity, ECR login, and Docker build initiation.

**Not verified:** AWS ECS service running, AWS `/health`, controlled analysis performance, upload latency, peak memory under analysis, end-to-end failure rate, authenticated Supabase parity in AWS, AWS credit balance, complete AWS account inventory, Azure Container Apps performance, and Cosmos DB state.
