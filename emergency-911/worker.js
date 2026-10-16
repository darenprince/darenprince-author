const ALLOWED_ORIGINS = new Set([
  "https://darenprince.com",
  "https://www.darenprince.com"
]);
const TTL = 7200;

function respond(data, status, origin) {
  return new Response(JSON.stringify(data), { status, headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    "vary": "Origin"
  }});
}
async function digest(value) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), x => x.toString(16).padStart(2, "0")).join("");
}
function validId(value) { return /^[a-f0-9-]{36}$/i.test(value || ""); }
function getBearer(request) { return (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, ""); }
async function readSession(env, id) {
  const value = await env.SOS_SESSIONS.get("s:" + id);
  if (!value) return null;
  try {
    const data = JSON.parse(value);
    if (data.expiresAt <= Date.now()) {
      await env.SOS_SESSIONS.delete("s:" + id);
      return null;
    }
    return data;
  } catch {
    await env.SOS_SESSIONS.delete("s:" + id);
    return null;
  }
}
async function saveSession(env, session) {
  const ttl = Math.max(1, Math.ceil((session.expiresAt - Date.now()) / 1000));
  await env.SOS_SESSIONS.put("s:" + session.id, JSON.stringify(session), { expirationTtl: ttl });
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("origin") || "";
    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "authorization, content-type",
        "access-control-max-age": "600", "vary": "Origin"
      }});
    }
    if (url.pathname === "/api/health" && request.method === "GET") {
      return respond({ ok: true, ttlSeconds: TTL }, 200, ALLOWED_ORIGINS.has(origin) ? origin : "*");
    }
    if (!ALLOWED_ORIGINS.has(origin)) return respond({ error: "Origin not allowed." }, 403, "");
    if (url.pathname === "/api/sessions" && request.method === "POST") {
      const ip = request.headers.get("cf-connecting-ip") || "unknown";
      const rateKey = "rate:" + await digest(ip + ":" + new Date().toISOString().slice(0, 13));
      const rateCount = Number(await env.SOS_SESSIONS.get(rateKey) || 0);
      if (rateCount >= 8) return respond({ error: "Too many share sessions. Try again later." }, 429, origin);
      await env.SOS_SESSIONS.put(rateKey, String(rateCount + 1), { expirationTtl: 3600 });
      let body;
      try { body = await request.json(); } catch { return respond({ error: "Invalid request." }, 400, origin); }
      const { id, ownerToken, viewerToken } = body || {};
      if (!validId(id) || typeof ownerToken !== "string" || ownerToken.length < 32 ||
          typeof viewerToken !== "string" || viewerToken.length < 32) {
        return respond({ error: "Invalid session request." }, 400, origin);
      }
      if (await readSession(env, id)) return respond({ error: "Session already exists." }, 409, origin);
      const session = { id, ownerHash: await digest(ownerToken), viewerHash: await digest(viewerToken),
        createdAt: Date.now(), expiresAt: Date.now() + TTL * 1000, location: null };
      await saveSession(env, session);
      return respond({ id, expiresAt: session.expiresAt, ttlSeconds: TTL }, 201, origin);
    }
    const locationPath = url.pathname.match(/^\/api\/sessions\/([a-f0-9-]{36})\/location$/i);
    const sessionPath = url.pathname.match(/^\/api\/sessions\/([a-f0-9-]{36})$/i);
    const id = locationPath?.[1] || sessionPath?.[1];
    if (!id) return respond({ error: "Not found." }, 404, origin);
    const session = await readSession(env, id);
    if (!session) return respond({ error: "Share expired or revoked." }, 404, origin);
    const tokenHash = await digest(getBearer(request));
    const owner = tokenHash === session.ownerHash;
    const viewer = tokenHash === session.viewerHash;
    if (locationPath && request.method === "PUT") {
      if (!owner) return respond({ error: "Access denied." }, 403, origin);
      let body;
      try { body = await request.json(); } catch { return respond({ error: "Invalid location." }, 400, origin); }
      const { latitude, longitude, accuracy, timestamp } = body || {};
      if (session.lastUpdateAt && Date.now() - session.lastUpdateAt < 1000) return respond({ error: "Location updates are arriving too quickly." }, 429, origin);
      if (![latitude, longitude, accuracy].every(Number.isFinite) || latitude < -90 || latitude > 90 ||
          longitude < -180 || longitude > 180 || accuracy < 0 || accuracy > 100000) {
        return respond({ error: "Invalid location." }, 400, origin);
      }
      session.location = { latitude, longitude, accuracy, timestamp: Number.isFinite(timestamp) ? timestamp : Date.now() };
      session.lastUpdateAt = Date.now();
      await saveSession(env, session);
      return respond({ ok: true, expiresAt: session.expiresAt }, 200, origin);
    }
    if (locationPath && request.method === "GET") {
      if (!viewer) return respond({ error: "Access denied." }, 403, origin);
      return respond({ location: session.location, expiresAt: session.expiresAt }, 200, origin);
    }
    if (sessionPath && request.method === "DELETE") {
      if (!owner) return respond({ error: "Access denied." }, 403, origin);
      await env.SOS_SESSIONS.delete("s:" + id);
      return respond({ ok: true, revoked: true }, 200, origin);
    }
    return respond({ error: "Method not allowed." }, 405, origin);
  }
};
