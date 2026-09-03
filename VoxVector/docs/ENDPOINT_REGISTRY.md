# VoxVector Endpoint Registry

**Effective:** 2026-09-03  
**Status:** Canonical active endpoint map

This document is the authoritative endpoint map for the current VoxVector deployment architecture.

## Public product

`https://darenprince.com/voxvector/`

GitHub Pages hosts the canonical public React application and Developer Console.

## Existing API

`https://voxvector.crownlabs.tech`

This is the original VoxVector API domain and remains preserved. It is not repointed to AWS by the current AWS benchmark work.

The existing frontend API client continues to default to this endpoint unless `VITE_VOXVECTOR_API_URL` is explicitly configured.

## AWS API

`https://awsapi.crownlabs.tech`

This is the dedicated AWS VoxVector API hostname.

Current AWS path:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

HTTP on port 80 redirects to HTTPS.

The AWS ACM certificate for `awsapi.crownlabs.tech` is issued and DNS validated.

## Persistence boundary

Supabase remains the configured authentication, persistence, diagnostics, and private media-storage boundary. The AWS compute environment has not been granted Render or Supabase secret parity merely because the container runs successfully.

## Deployment and migration rule

The AWS endpoint is a separate deployment environment and benchmark target. Do not silently replace `voxvector.crownlabs.tech` or change the production frontend API base as part of the AWS infrastructure work.

Any future cutover must explicitly update configuration, deploy from canonical GitHub source, verify the exact runtime, and document the result.

## Engineering verification

At the time this registry was written:

- AWS ALB state: active
- AWS target health: healthy
- AWS HTTPS listener: configured
- AWS HTTP listener: redirects to HTTPS
- ACM certificate: issued
- Render original API domain: preserved
- Public React application: GitHub Pages at `/voxvector/`

Infrastructure verification does not constitute scientific validation of VoxVector's analytical or deception-classification capability.
