# VoxVector Cloud Platform Runtime Audit — 2026-09-03

## Purpose

Record the connected infrastructure observations used to evaluate the existing Render runtime and the AWS deployment environment. This document is operational evidence only. It is not a scientific validation result and does not change VoxVector's inference capability status.

## Current application boundary

- public React application: `voxvector/` via GitHub Pages at `https://darenprince.com/voxvector/`
- original VoxVector API: Render at `https://voxvector.crownlabs.tech`
- AWS API environment: Application Load Balancer + ECS Fargate at `https://awsapi.crownlabs.tech`
- authentication, persistence, diagnostics, and private media storage: Supabase
- canonical source: GitHub `darenprince/darenprince-author`, `main`

The original API domain is preserved. AWS is an additional deployment environment and has not silently replaced the Render endpoint.

## Render — observed baseline

Connected Render inspection found the active `voxvector-api` service:

- service id: `srv-da2f88n40ujc73a8m26g`
- repository: `darenprince/darenprince-author`
- root directory: `VoxVector`
- branch: `main`
- runtime: Python
- region: Oregon
- plan: Free
- instances: 1
- health check: `/health`
- start: `uvicorn api.app:app --host 0.0.0.0 --port $PORT`
- build: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- public Render URL: `https://voxvector-api.onrender.com`
- original custom API domain: `https://voxvector.crownlabs.tech`
- auto deploy: enabled on commits to `main`

No Render Postgres or Key Value resources were present in the connected workspace.

Observed resource envelope:

- CPU: `0.15` CPU
- memory: `536,870,900` bytes, approximately 512 MiB
- recent sampled memory: approximately 92–100 MB
- recent sampled CPU: approximately 0.0016–0.0018 CPU

These samples were idle/recent observations, not controlled analysis peaks.

Recent logs contained repeated HTTP 200 `/health` responses and no application error entries in the sampled 50 most recent records. A graceful shutdown was observed, but its cause was not established. Render request-count and latency metrics returned no usable time series in the sampled query, so controlled upload and analysis timing remains unmeasured.

## AWS — deployment and HTTPS state

The connected AWS account was used to create and verify a VoxVector deployment in `us-east-1`.

### Container/runtime infrastructure

- ECR repository: `voxvector-api`
- ECR URI: `784917519733.dkr.ecr.us-east-1.amazonaws.com/voxvector-api`
- ECR scan-on-push: enabled
- ECS cluster: `voxvector`
- ECS service: `voxvector-api`
- Fargate task definition: `voxvector-api:1`
- allocated task size: 1 vCPU / 2 GiB
- CloudWatch log group: `/ecs/voxvector-api`
- ECS execution role: `VoxVectorECSTaskExecutionRole`
- GitHub Actions OIDC deployment role: `VoxVectorGitHubActionsECSDeploy`

### Application Load Balancer

- ALB: `voxvector-api-alb`
- DNS name: `voxvector-api-alb-1429252425.us-east-1.elb.amazonaws.com`
- scheme: internet-facing
- state: `active`
- listener: HTTP `:80` redirecting to HTTPS `:443`
- listener: HTTPS `:443` forwarding to the VoxVector target group
- target group: `voxvector-api-tg`
- target protocol: HTTP `:8000`
- health check: `GET /health`
- target health: `healthy`

### DNS and certificate

- public AWS hostname: `awsapi.crownlabs.tech`
- ACM certificate: `awsapi.crownlabs.tech`
- certificate status: `ISSUED`
- DNS validation status: `SUCCESS`
- certificate region: `us-east-1`

The custom hostname is expected to resolve by CNAME to the ALB DNS name. The current ALB hostname remains the infrastructure endpoint; the custom domain is the supported client-facing name.

### Network boundary

A dedicated ALB security group receives public HTTP/HTTPS traffic. The ECS security group no longer permits unrestricted public access to port 8000; port 8000 ingress is restricted to the ALB security group.

This is the intended security boundary for the AWS HTTPS environment.

## AWS runtime evidence

The ECS service reached a steady state with one running task. CloudWatch application logs repeatedly recorded successful `/health` requests with HTTP 200. ECS and ALB target-health APIs both reported the task as healthy.

CloudWatch CPU samples during the current low-load period showed approximately 1.2% average utilization in recent five-minute periods, with observed maxima around 3–4% and one startup/window maximum under 10%. These are low-load operational observations, not workload capacity benchmarks.

The ECR image observed for the current AWS deployment is approximately 3.6 GB. Image-size optimization is an identified engineering follow-up because deployment and pull times can be materially affected by large images.

## Deployment automation

`.github/workflows/voxvector-aws-ecs.yml` builds the canonical image from `VoxVector/Dockerfile`, authenticates through GitHub OIDC, pushes a commit-SHA-tagged image to ECR, registers the Fargate task definition, updates the ECS service, and verifies runtime health.

The AWS task intentionally has not been granted Render or Supabase secret parity merely because the container runs successfully. Therefore the current AWS evidence establishes infrastructure, ingress, container startup, and health-check reachability. It does not establish authenticated case intake, private media persistence, or full analysis parity with the existing Render environment.

## Hugging Face research boundary

Hugging Face remains a research and model-discovery source for candidate speech, audio, language, and multimodal methods. No Hugging Face model is promoted to a validated VoxVector deception method solely because it is available or popular on the Hub. Candidate methods require compatibility review, reproducible evaluation, provenance, and validation before production promotion.

## AWS Data Analytics boundary

No separate AWS analytics data lake or production analytical warehouse is introduced as part of this API runtime deployment. S3, Glue, Athena, or other analytics services should only be added when a concrete auditable analytical workload requires them and the data governance boundary is defined.

## Azure / Cosmos boundary

No usable Azure Cosmos resource-inspection tool was exposed in the connected tool surface. No claim is made about Cosmos account state, databases, containers, throughput, or cost.

## Decision

Keep the current separation of environments.

1. Keep `https://darenprince.com/voxvector/` as the public React application.
2. Preserve `https://voxvector.crownlabs.tech` as the original API domain.
3. Use `https://awsapi.crownlabs.tech` as the dedicated AWS API environment.
4. Keep Supabase as the configured authentication, persistence, diagnostics, and private media boundary.
5. Measure controlled application workloads before making any production routing or platform migration decision.
6. Treat AWS operational measurements separately from scientific validation.

## Verification status

**Verified:** AWS ECR image; ECS cluster/service; Fargate task; ALB; HTTPS listener; HTTP-to-HTTPS redirect; ACM DNS validation and issued certificate; healthy target; dedicated network security boundary; repeated CloudWatch `/health` 200 responses; original Render API domain preserved; canonical GitHub deployment workflow.

**Not yet verified:** public browser request to `https://awsapi.crownlabs.tech/health` from an external client through the current tool surface; authenticated AWS case workflow; AWS Supabase/private-media parity; controlled upload/analysis performance; analysis peak memory; failure rate under workload; cost under sustained workload.

Infrastructure readiness is not scientific validation. VoxVector's separation of eligibility/reliability, evidence analysis, candidate classification, and final disposition is unchanged.
