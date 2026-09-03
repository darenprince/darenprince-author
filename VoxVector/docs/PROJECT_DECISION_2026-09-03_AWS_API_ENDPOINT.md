# Project Decision — 2026-09-03 AWS API Endpoint

## Decision

Preserve the existing VoxVector API domain `https://voxvector.crownlabs.tech` and introduce `https://awsapi.crownlabs.tech` as the separately addressed AWS API environment.

## Current endpoint ownership

- Public React application: `https://darenprince.com/voxvector/`
- Original API: `https://voxvector.crownlabs.tech`
- AWS API environment: `https://awsapi.crownlabs.tech`

## AWS runtime

The AWS endpoint is served by an internet-facing Application Load Balancer in `us-east-1`, terminating HTTPS and forwarding to the canonical VoxVector API container on ECS Fargate port 8000.

The ALB uses HTTP port 80 only for redirecting clients to HTTPS. The ECS application security group no longer allows unrestricted public access to port 8000; ingress is restricted to the ALB security group.

## Certificate and DNS

ACM issued a DNS validated certificate for `awsapi.crownlabs.tech`. DNS validation succeeded. The custom hostname is configured to resolve to the ALB DNS name.

## Migration rule

This change does not authorize a production API cutover. The original API domain remains intact. A future cutover requires an explicit source-controlled frontend/API configuration change, deployment verification, runtime verification, and documentation synchronization.

## Verification

At decision time, AWS infrastructure evidence showed the ALB active, HTTPS listener configured, HTTP redirect configured, and the ECS target healthy. CloudWatch logs showed repeated successful `/health` responses.

The infrastructure state does not constitute scientific validation and does not establish authenticated Supabase/media parity for the AWS environment.
