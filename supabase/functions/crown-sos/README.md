# Crown SOS Edge Function

The `crown-sos` function verifies owner JWTs with Supabase Auth and mediates profile and share data using server-only credentials. Public viewers authenticate with a random bearer token, stored only as a SHA-256 digest in `crown_sos_shares`. Responses are no-store and CORS is limited to the Crown SOS site and local preview.

Routes:
- `GET /profile` owner read
- `PUT /profile` owner save
- `POST /shares` owner creates a 1–24 hour link
- `PUT /shares/:id/location` owner updates GPS
- `POST /shares/:id/revoke` owner revokes
- `GET /shares/:id` viewer reads full profile and latest location with `x-share-token`

The gateway has JWT verification disabled only because public viewers do not sign in; every owner route independently validates the bearer JWT with `auth.getUser(token)`. Keep this explicit validation. Never expose the service-role key to browser code.