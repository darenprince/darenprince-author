# VoxVector Deployment Boundary

**Status:** Current product mirror  
**Effective:** 2026-09-08

## Canonical hosting architecture

VoxVector has a deliberately separated deployment architecture:

- **Public frontend:** the React application in `voxvector/`, deployed through GitHub Pages at `https://darenprince.com/voxvector/`.
- **Original backend and analysis API:** the canonical `VoxVector/` workspace, served through Render at `https://voxvector.crownlabs.tech`.
- **AWS backend environment:** the canonical `VoxVector/` workspace deployed through GitHub Actions to ECS Fargate behind an AWS Application Load Balancer at `https://awsapi.crownlabs.tech`.
- **Operational and authentication data:** Supabase, using the existing project architecture.
- **Deployment automation:** GitHub Actions for the public GitHub Pages build and AWS container deployment workflows. The original Render API is deliberately **not** auto-deployed from GitHub pushes.

The original API hostname remains preserved. AWS does not silently replace it.

## Vercel

**Vercel is not part of VoxVector.**

Vercel is retired and is not a supported VoxVector production host, frontend host, backend host, preview host, build target, dependency, configuration source, deployment target, or troubleshooting workaround.

Agents and developers must not introduce Vercel into VoxVector or use Vercel as an alternative path when the canonical deployment has a problem.

## Historical references

Some historical VoxVector records mention Vercel because it was considered or used during earlier development exploration. Those records are retained for traceability. They are not current deployment instructions.

Historical records that describe Render as automatically deploying from `main` are also preserved as dated evidence rather than rewritten. Connected Render inspection on September 8, 2026 confirmed that the current original API service has auto-deploy disabled.

The active technical policy is `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`.

## Canonical paths

As of September 8, 2026, deployment tasks use [tracker #915](https://github.com/darenprince/darenprince-author/issues/915) and the canonical [issue workflow](../../../../VoxVector/docs/DEVELOPMENT_WORKFLOW.md#10-development-flow). Link issue, PR, source revision and target environment. Record build, publish, trigger acceptance, runtime and browser results separately with observation timestamps. Update [the audit report](../../../../voxvector/audits/AUDIT_REPORT.md) after each task. Keep production acceptance gates open until verified; a PR or closed issue does not authorize deployment or cutover. [#920](https://github.com/darenprince/darenprince-author/issues/920) is the active manual Render deploy-hook repair. The earlier Pages trigger investigation [#911](https://github.com/darenprince/darenprince-author/issues/911) is closed. Historical infrastructure observations below are not rewritten by this policy update.

Public frontend:

`main → GitHub Actions → React build → GitHub Pages → https://darenprince.com/voxvector/`

Original API:

`approved main revision → Developer Console/API deploy request → protected Render deploy hook → Render deployment → https://voxvector.crownlabs.tech`

AWS API environment:

`VoxVector → GitHub Actions → ECR → ECS Fargate → ALB HTTPS → https://awsapi.crownlabs.tech`

The frontend and backend hosting boundaries must remain distinct.

## Original Render API deployment control

The original Render API is manually deployed. Current connected inspection identified one workspace, `My Workspace`, and one VoxVector service, `voxvector-api`; the service reports `autoDeploy=no` and its automatic deploy trigger is off.

The canonical manual path is:

`Developer Console Deploy Now → POST /v1/developer/render/deploy → authenticated FastAPI route → protected RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The hook secret is never sent to the browser. Hook acceptance is not a completed deployment. After the hook accepts a request, VoxVector must observe the resulting Render deployment, match the intended commit, wait for `live`, verify the backend source revision and `/health`, and complete any required browser/runtime verification before describing production as verified.

A September 5 runtime diagnostic captured a `JSONDecodeError` on the deploy route when a hook response body was not JSON. Issue #920 adds regression coverage and a backend parsing repair so successful empty, JSON, or text hook responses can be treated as trigger acceptance without exposing the hook value. The repair remains distinct from production deployment verification.

At the September 8 inspection checkpoint, production Render deploy `dep-dafg5nv40ujc73b5l400` was live on commit `73ac03ded08c161e092ee2a4ecbbed7d036771c8`. GitHub `main` was later at `66a1616d49e228c6ec57d3cfc4855898675fae2c`; the intervening five commits were documentation, audit and workflow changes rather than new runtime implementation. That is a dated observation, not a permanent parity claim.

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
