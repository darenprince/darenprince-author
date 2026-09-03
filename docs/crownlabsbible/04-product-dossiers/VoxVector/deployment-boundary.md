# VoxVector Deployment Boundary

**Status:** Current product mirror
**Effective:** 2026-09-03

## Canonical hosting architecture

VoxVector has a deliberately separated deployment architecture:

- **Public frontend:** the React application in `voxvector/`, deployed through GitHub Pages at `https://darenprince.com/voxvector/`.
- **Original backend and analysis API:** the canonical `VoxVector/` workspace, served through Render at `https://voxvector.crownlabs.tech`.
- **AWS backend environment:** the canonical `VoxVector/` workspace deployed through GitHub Actions to ECS Fargate behind an AWS Application Load Balancer at `https://awsapi.crownlabs.tech`.
- **Operational and authentication data:** Supabase, using the existing project architecture.
- **Deployment automation:** GitHub Actions for the public GitHub Pages build and AWS container deployment workflows.

The original API hostname remains preserved. AWS does not silently replace it.

## Vercel

**Vercel is not part of VoxVector.**

Vercel is retired and is not a supported VoxVector production host, frontend host, backend host, preview host, build target, dependency, configuration source, deployment target, or troubleshooting workaround.

Agents and developers must not introduce Vercel into VoxVector or use Vercel as an alternative path when the canonical deployment has a problem.

## Historical references

Some historical VoxVector records mention Vercel because it was considered or used during earlier development exploration. Those records are retained for traceability. They are not current deployment instructions.

The active technical policy is `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`.

## Canonical paths

Public frontend:

`main → GitHub Actions → React build → GitHub Pages → https://darenprince.com/voxvector/`

Original API:

`VoxVector → Render → https://voxvector.crownlabs.tech`

AWS API environment:

`VoxVector → GitHub Actions → ECR → ECS Fargate → ALB HTTPS → https://awsapi.crownlabs.tech`

The frontend and backend hosting boundaries must remain distinct.

## AWS HTTPS state

The AWS Application Load Balancer terminates HTTPS for `awsapi.crownlabs.tech` using an ACM certificate validated through DNS. HTTP requests redirect to HTTPS. The ECS application port is protected behind the ALB security group.

At the last infrastructure verification, the ALB was active and its VoxVector target was healthy.

## Data-flow clarification and AUTO workflow

The existing production media path is:

`Browser → GitHub Pages frontend → Render-hosted FastAPI API → Supabase private media storage`

The AWS environment is separately addressed for controlled runtime evaluation. AWS container health does not by itself establish authenticated Supabase parity or a production routing cutover.

Render runs the original API and is not the durable media store. GitHub Pages serves the frontend and is not the API runtime.

The canonical technical architecture and evidence-first AUTO workflow are maintained in:

`VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`

The authoritative endpoint map is:

`VoxVector/docs/ENDPOINT_REGISTRY.md`
