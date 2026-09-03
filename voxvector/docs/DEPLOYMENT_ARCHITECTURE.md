# VoxVector Deployment Architecture

## Current endpoint roles

| Endpoint | Role | Status |
|---|---|---|
| https://www.darenprince.com/voxvector/ | Public VoxVector landing experience | Current public entry |
| https://voxvector.crownlabs.tech | Original VoxVector API domain | Preserved; not repointed by AWS migration |
| https://awsapi.crownlabs.tech | Dedicated AWS API hostname | DNS validation complete; AWS HTTPS listener configured |

## AWS runtime

The AWS API environment currently uses:

Internet
→ Application Load Balancer
→ HTTPS :443
→ ECS Fargate target group
→ VoxVector API :8000

HTTP :80 redirects to HTTPS with HTTP 301.

The ECS application port is not directly exposed publicly. The ECS security group permits API traffic from the Application Load Balancer security group.

## Certificate

AWS Certificate Manager certificate:

- Domain: awsapi.crownlabs.tech
- Region: us-east-1
- Validation: DNS
- Current validation status: SUCCESS
- Certificate status at last verification: ISSUED

## Verified infrastructure state

At the last verification:

- ALB state: active
- Target health: healthy
- HTTPS listener: configured on 443
- HTTP listener: configured to redirect to HTTPS

## Migration boundary

The AWS environment is an additional deployment target. It does not automatically replace the existing VoxVector API domain or existing Render services.

Any frontend API cutover must be explicitly configured and tested before changing production traffic.

## Cost discipline

The AWS environment should remain focused on workloads where AWS credits provide measurable value. Existing services should not be migrated merely for duplication. Before expanding infrastructure, record expected runtime cost, required capability, and the verification plan.
