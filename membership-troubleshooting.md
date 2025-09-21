# Membership access checklist

This guide walks you through verifying that the Daren Prince membership UI is wired up correctly and explains what you need to
configure on your end so login, registration, and logout flows are fully functional.

## 1. Supply Supabase credentials

The auth screens are powered entirely by your Supabase project. If the public URL and anon key are missing, the UI now keeps the
submit buttons disabled and shows a configuration warning so visitors never see a broken flow.

You can satisfy the requirement in either environment:

### Local development / Netlify builds

Create (or update) a `.env` file at the project root with the following keys. Netlify's build environment accepts these same
variables directly.

```bash
SUPABASE_DATABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Run `npm run build` whenever you change these values so the generated `assets/js/env.js` bundle picks them up for the browser.

### Direct browser overrides

If you prefer to commit a checked-in configuration for staging, create `assets/js/env.js` with a default export that exposes the
same keys (or provide a runtime object on `window._env_`, which the resolver now inspects automatically):

```js
export default {
  SUPABASE_DATABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
}

// Runtime-only alternative (e.g., injected before other scripts run)
window._env_ = {
  SUPABASE_DATABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
}
```

Keep real production secrets out of the repo—reserve this pattern for disposable testing environments.

### Quickly bootstrap an admin login

Once credentials are in place, run the helper script to create (or elevate) your own admin account so you can reach the gated
pages:

```bash
export SUPABASE_DATABASE_URL="https://<project>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
node scripts/bootstrap-admin.js --email you@example.com --name "Daren Prince"
```

The script confirms the account, sets your role to `admin`, and prints the password (generated when `--password` is omitted)
so you can sign in immediately.

## 2. Verify the UI states

With credentials present, load `login.html` and confirm the following:

- **Sign in mode** – The button is enabled immediately, and submitting with valid Supabase credentials redirects to the dashboard
  (or the `redirect` query string target when present).
- **Sign up mode** – The password checklist controls the button; once every requirement is green, the button activates and submits.
- **Missing credentials** – If you intentionally remove the Supabase URL or key, the warning returns and the buttons stay disabled
  no matter how the form is filled, preventing false positives.
- **Logout** – The profile dropdown exposes the logout action on every page where `js/profile-dropdown.js` is loaded; it continues to
  function independently of the admin helper classes.

## 3. Review logs when something fails

The Supabase logger runs silently until you opt in. Use whichever approach is most convenient when you need client-side insight:

- Append `?supabaseDebug=1` to any page URL.
- Call `window.supabaseDebug.enable()` from the console (optionally `{ persist: true }` to keep it on).
- Multi-tap the site logo seven times or enter the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) when you have access to a keyboard.

Logs persist in `localStorage` under the `supabaseLogBuffer` key so you can reload, copy them via `window.supabaseDebug.export()`, and
share them with support.

## 4. Automated confidence checks

Once Supabase credentials are available in the environment, run the Vitest suite to make sure real API calls succeed end-to-end:

```bash
npm test
```

The `tests/auth.spec.ts` script signs up a throwaway user, signs in, resends the verification email, and triggers a password reset
against your live project. Skip or adjust this file if you need to avoid touching production data.

## 5. Common troubleshooting steps

| Symptom                                                                | Likely cause                                            | Fix                                                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Buttons stay disabled and "Supabase is not configured" message appears | Missing URL/key or build step not run                   | Double-check environment variables and rerun `npm run build`                    |
| Sign up button never enables even with valid passwords                 | Confirmation field mismatch or missing symbol/number    | Follow the checklist until every icon switches to a checkmark                   |
| Successful login but redirect feels wrong                              | `redirect` query param points to a protected admin page | Confirm the target page is allowed for the signed-in role                       |
| Logger never shows                                                     | Debug mode not enabled                                  | Use any activation method in section 3 or check that `localStorage` is writable |

Following the steps above ensures the membership experience works as designed and gives you a repeatable procedure for validating
future changes.
