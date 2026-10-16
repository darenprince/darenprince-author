# Emergency 911 Workspace

This mini-workspace houses the styling and scripts for the `911.html` rapid response portal.

## Development

```bash
npm install
npm run build:css
```

Use `npm run watch:css` during development to automatically rebuild the stylesheet.

## Secure live location sharing

The existing `911.html` page supports user-triggered GPS updates while open. Remote sharing is a separate, explicit action: the owner must obtain a GPS fix and select **Start Secure Live Sharing** before a viewer link is created.

- API Worker source: `worker.js`
- Static viewer page: `../911-share.html`
- Browser controller: `remote-live-sharing.js`
- Worker configuration: `wrangler.toml`
- Storage: dedicated Cloudflare KV namespace `SOS_911_LIVE_SHARING`
- Share lifetime: two hours maximum; the owner can revoke immediately.
- The owner and viewer use separate random bearer tokens. Only SHA-256 token digests are stored in KV.
- The viewer link token is placed in the URL fragment, which is not sent to the server in the HTTP request. The viewer script removes the fragment after reading it.
- The viewer page exposes only the latest shared GPS fix, accuracy, timestamp, and a map link. It does not load the emergency portal or personal/medical records.
- The browser sends location updates only after the owner starts sharing. The owner should use **Stop And Revoke Sharing** when finished.
- CORS is limited to `https://darenprince.com` and `https://www.darenprince.com`. A bearer link can still be forwarded by anyone who possesses it; send it only to a trusted contact.
- The worker is deployed on the account's `workers.dev` subdomain because `darenprince.com` is not a Cloudflare zone in the connected account. A custom-domain route has not been configured.

This is not an emergency dispatch service. It does not notify emergency services automatically. The existing incident-code gate on the main page remains client-side and must not be treated as authentication.
