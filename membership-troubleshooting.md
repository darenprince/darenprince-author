# Membership Troubleshooting (Migration Mode)

Authentication features are offline while we rebuild the data platform. Use this checklist to confirm downtime messaging is visible and avoid exposing broken flows.

## 1. Confirm migration messaging

- Visit `/login.html`, `/reset-password.html`, `/verify-email.html`, and `/dashboard.html`.
- Ensure each page displays the “Member accounts are temporarily offline” notice.
- Verify buttons are disabled and tooltips point users to `press@darenprince.com` for support.

## 2. Validate navigation fallbacks

- Open the profile dropdown. The primary action should route to `/login.html` with a tooltip explaining the outage.
- Confirm the auth toggle in the header directs to `/login.html` and no longer attempts to sign users out.

## 3. Test admin console messaging

- Load `/admin-user-management.html` and `/admin-dashboard.html`.
- Each surface should show an operations card describing the migration and listing the support contact.

## 4. Update stakeholders

- Notify the ops team before demos so they can set expectations about the temporary downtime.
- Direct engineering questions to the [data platform migration plan](docs/data-platform-migration.md).

> **Reality Check:** Do not re-enable sign-in or dashboard links until the new provider is wired through `js/auth-service.js`.
