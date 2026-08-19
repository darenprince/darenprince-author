# VoxVector Free Hosting Research — 2026-08-18

## Hard requirement

VoxVector development deployment must cost $0 and must not require Daren to enter payment information.

## Providers checked

### Render — rejected for user setup
Render documents a Free Web Service tier, but the current onboarding flow encountered by the user requested payment information. Because no-card is a hard requirement, Render is not an acceptable user setup path at this time.

### Koyeb — rejected
Koyeb's current pricing FAQ states that account validation requires a credit card and describes a $29 authorization hold. This violates the requirement.

### Railway — rejected as primary path
Railway currently advertises a $0 Free plan and a no-card signup/trial, but its free trial is a one-time $5 credit and its documentation says plan subscriptions use credit cards. It is not sufficiently predictable for a strict $0/no-card deployment requirement.

### Hugging Face Spaces — rejected for the primary FastAPI service
Current Hugging Face Spaces documentation says Static Spaces are free, while Gradio and Docker Spaces that run compute require a paid plan for personal accounts. CPU Basic hardware may have no hourly compute cost, but the account-level requirement does not match the required no-card deployment path.

## Current decision

Do not ask the user to configure another provider until a Python/FastAPI host has passed all of these gates:

1. No payment method required to create and run the free service.
2. GitHub deployment supported.
3. Python/FastAPI supported.
4. HTTPS endpoint provided.
5. Environment secrets supported.
6. Sufficient CPU/RAM for current VoxVector runtime.
7. Clear free-tier limits.
8. No surprise billing path.
9. Compatible with the existing repository layout.

## Architecture remains

- Vercel: Next.js frontend
- Supabase: Auth + database + private audio storage
- Python host: pending verification
- GitHub: canonical source

## Evidence checked

- Render Free documentation and first-deploy documentation
- Koyeb pricing FAQ and instance documentation
- Railway pricing, free-trial, and pricing FAQ documentation
- Hugging Face Spaces overview and Space-management documentation

## Next engineering action

Continue provider research and simultaneously prepare the repository so the Python API can be deployed to a provider-neutral container/runtime. Do not claim a deployment target is free until the actual account path has been verified.
