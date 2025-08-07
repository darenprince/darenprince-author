# 🔐 Supabase Integration

This stack uses [Supabase](https://supabase.com) for auth, secure file storage, and edge logic. Everything is wired for dark-mode defaults and plugs directly into the CodyHouse SCSS system.

## 🚀 Environment

Set these variables locally or in Netlify:

```bash
SUPABASE_URL=<project_url>
SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

## 🧠 Client Setup

`supabase/client.js` and `supabase/client.ts` read the env variables and expose a `supabase` client:

```javascript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
export const supabase = createClient(url, key);
```

The client is reused across `js/main.js`, `js/auth.js`, `js/dashboard.js`, and `js/profile-dropdown.js` for session checks, sign-ins, and secure storage.

## 🔑 Authentication Flow

* **Sign Up / Sign In** – `js/auth.js` handles both modes. New users are stored with metadata like name, phone, and shipping address.
* **Session Guard** – `js/dashboard.js` and `js/main.js` redirect visitors without a valid session.
* **Password Reset** – `js/auth.js` sends reset links and `reset-password.html` updates credentials via `supabaseClient.auth.updateUser`.

## 📦 Storage Operations

* **User Files** – `js/dashboard.js` uploads to the `user-data` bucket and lists files for the signed-in user.
* **Avatars** – `js/profile-dropdown.js` and `js/dashboard.js` read/write images in the `avatars` bucket.
* **Public URLs** – Every upload immediately retrieves a `getPublicUrl` for display.

## ⚙️ Edge Functions

`supabase/functions/secure-storage/index.ts` enforces JWT-based uploads. It verifies the bearer token, then streams the file into the requested bucket.

```ts
const { data: { user } } = await supabase.auth.getUser(token);
await supabase.storage.from(bucket).upload(`${user.id}/${file.name}`, file.stream());
```

## ✅ Tests

`tests/auth.spec.ts` and `tests/storage.spec.ts` validate sign-up, sign-in, password reset, and bucket permissions. They auto-skip when credentials are missing, keeping the CI pipeline fast.

---

### ⚙️ Next Steps

- Harden error messaging for edge cases.
- Add role-based access rules for collaborative folders.
- Expand test coverage to profile updates and edge functions.
