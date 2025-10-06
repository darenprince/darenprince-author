# 🔄 Data Platform Migration Plan

_Last updated: 2025-02-14_

The legacy database integration has been removed. This document outlines the milestones for wiring in the next provider so member experiences, dashboards, and admin utilities can return without surprises.

## 🎯 Objectives

- Replace all authentication, storage, and realtime needs with a single managed provider.
- Keep the public site stable while clearly communicating downtime across gated surfaces.
- Ship an adapter layer that mirrors the `js/auth-service.js` interface so pages stay framework-agnostic.

## 🧱 Current State

- `js/auth-service.js` returns `null` and surfaces the global downtime message.
- Login, dashboard, admin console, and verification pages display migration notices instead of breaking.
- Legacy database-specific scripts, docs, and Netlify functions have been removed.

## 🗺️ Migration Phases

1. **Provider Selection**
   - Audit requirements: passwordless login, role-based routing, file storage, realtime messaging.
   - Confirm data residency and compliance obligations.
   - Capture SDK footprint and edge/runtime support.
2. **Adapter Design**
   - Implement a drop-in replacement for `getAuthService()` that exposes `signIn`, `signOut`, `getSession`, and role helpers.
   - Restore dashboard APIs via a dedicated module (e.g., `js/data-service.js`) instead of page-level fetch calls.
   - Reintroduce realtime messaging with event emitters that degrade gracefully when offline.
3. **Environment Wiring**
   - Update `.env` (see `.env.example`) with provider URL, public key, and admin key.
   - Sync Netlify env vars and secrets; avoid bundling private keys into the client build.
   - Add health checks to CI to confirm credentials before deploying protected routes.
4. **Feature Re-enablement**
   - Re-enable login and verification flows once session APIs pass manual QA.
   - Restore dashboard uploads, profile edits, and folder access.
   - Bring the admin console back online with audit logging.

## ✅ Success Criteria

- Authenticated pages load without placeholder notices.
- Admin console lists users, manages roles, and logs actions.
- Private broadcast room (shhh.html) syncs messages using the new realtime channel.
- Documentation and onboarding notes reference the new provider exclusively.

## 📬 Owners & Next Steps

- **Primary:** Ops + Engineering
- **Support:** Netlify deployment owners, content team for announcement copy

**Immediate actions**

- Lock down Netlify env access while credentials are rotated.
- Prototype candidate provider adapters in a separate branch.
- Draft member communication outlining expected downtime and benefits.
