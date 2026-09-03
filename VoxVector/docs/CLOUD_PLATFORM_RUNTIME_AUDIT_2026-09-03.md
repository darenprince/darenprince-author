# VoxVector Cloud Platform Runtime Audit — 2026-09-03

## Purpose

Record the connected infrastructure observations used to evaluate the existing Render runtime and the readiness of AWS and Azure for a controlled compute benchmark. This document is operational evidence only. It is not a scientific validation result and does not change VoxVector's inference capability status.

## Canonical boundary

The active architecture remains:

* public React application: `voxvector/` via GitHub Pages
* canonical API and analysis runtime: `VoxVector/` via FastAPI
* authentication, persistence, diagnostics, and private media storage: Supabase
* current API host: Render

The first migration boundary remains compute only. GitHub Pages and Supabase are not migration targets for this benchmark.

## Render — observed production state

Inspection of the connected Render workspace on 2026-09-03 found one active service for the project:

* service: `voxvector-api`
* service id: `srv-da2f88n40ujc73a8m26g`
* repository: `darenprince/darenprince-author`
* root directory: `VoxVector`
* branch: `main`
* runtime: Python
* region: Oregon
* plan: Free
* instances configured: 1
* health check: `/health`
* start command: `uvicorn api.app:app --host 0.0.0.0 --port $PORT`
* build commands: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
* public URL: `https://voxvector-api.onrender.com`
* auto deploy: enabled for new commits on `main`

No Render Postgres instance and no Render Key Value instance were present in the connected workspace.

### Deployment verification

The latest live Render deployment is from commit `ccbcbec261812c51920a9305ffb265607616d575`, matching the current cloud platform architecture decision entry in the canonical decision log. The deployment completed at approximately 2026-09-03 07:51 UTC and is marked live by Render.

### Resource observations

The observed service limits are:

* CPU limit: `0.15` CPU
* memory limit: `536,870,900` bytes, approximately 512 MiB

Recent sampled runtime telemetry showed approximately 92–100 MB memory usage. The samples are idle/recent observations, not controlled analysis peaks and not evidence that the heaviest VoxVector workloads fit safely within the limit.

Recent CPU samples were approximately `0.0016–0.0018` CPU in the sampled window. This indicates low observed background utilization during the inspection period; it does not characterize an analysis workload.

### Health and logs

The sampled application logs contained repeated successful `/health` responses with HTTP 200. A graceful shutdown sequence was also observed at approximately 2026-09-03 08:06 UTC. The sampled 50 most recent application log records contained no application error entries. The graceful shutdown is recorded as an observation only; the inspection does not establish why the process restarted or whether it was caused by infrastructure, deploy lifecycle, or another event.

Render's HTTP request-count and HTTP latency metrics returned no usable time-series data in the sampled query. Therefore the audit does not claim request latency, throughput, upload time, analysis duration, or failure-rate baselines.

## AWS — controlled inspection boundary

The connected AWS surface was queried for selected resources rather than assuming that an account was empty. Direct CLI inspection successfully returned:

* S3 bucket inventory: zero buckets returned by `s3api list-buckets`.
* ECS cluster inventory in `us-east-1`: zero clusters returned.
* ECR repository inventory in `us-east-1`: zero repositories returned.

The higher-level `run_script` wrapper did not expose the expected boto3 operation names for several of the same discovery calls, so broader AWS account inventory was not treated as complete. No account identity, credit balance, or all-region resource count is claimed from this audit.

AWS remains a viable second controlled benchmark target. A production migration decision must not be based on the partial discovery above.

## Azure / Cosmos boundary

No usable Azure Cosmos DB resource-inspection tool was exposed in the connected tool surface during this audit. Therefore no claim is made about the user's Cosmos DB account, databases, containers, throughput, or cost.

More importantly, the current architecture does not require Cosmos DB for the first compute benchmark. Introducing a second primary persistence system before measuring the compute boundary would expand the migration surface without addressing the specific Render constraint under investigation.

## Decision

Do not migrate production routing yet.

The connected evidence supports the existing staged plan:

1. Keep GitHub Pages unchanged.
2. Keep Supabase unchanged.
3. Measure the current Render service with a controlled workload, including startup, readiness, upload, analysis duration, peak memory, CPU, and failure behavior.
4. Build the canonical API as a reproducible container without changing API contracts.
5. Benchmark the identical container on one candidate cloud compute platform.
6. Compare observed results before changing DNS, frontend API configuration, or persistence ownership.
7. Use the second cloud credit only if the first benchmark does not clearly meet the operational requirements.

## Scientific boundary

Cloud placement, CPU, memory, latency, startup behavior, and deployment reliability are infrastructure measurements. They do not constitute scientific validation of deception detection. VoxVector's existing separation between eligibility/reliability, evidence analysis, candidate classification, and final disposition remains unchanged.

## Verification status

**Status:** Render baseline partially observed; controlled workload benchmark pending.

**Verified:** Render service configuration, current live deployment, resource limits, recent memory/CPU samples, health log behavior, absence of Render Postgres/Key Value resources, and selected AWS resource inventories.

**Not verified:** controlled analysis performance, upload latency, peak memory under analysis, end-to-end failure rate, AWS account-wide inventory, AWS credit balance, Azure Container Apps runtime performance, and Cosmos DB account state.
