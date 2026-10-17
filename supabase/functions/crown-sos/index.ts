import { createClient } from "npm:@supabase/supabase-js@2.95.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = new Set([
  "https://darenprince.com",
  "https://www.darenprince.com",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);
const MAX_SHARE_HOURS = 24;
const jsonHeaders = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store, max-age=0", "x-content-type-options": "nosniff", "referrer-policy": "no-referrer" };

function response(body: unknown, status = 200, origin: string | null = null) {
  const headers: Record<string, string> = { ...jsonHeaders, "access-control-allow-methods": "GET,POST,PUT,OPTIONS", "access-control-allow-headers": "authorization,content-type,x-share-token,apikey" };
  if (origin && ALLOWED_ORIGINS.has(origin)) headers["access-control-allow-origin"] = origin;
  return new Response(JSON.stringify(body), { status, headers });
}
function fail(message: string, status: number, origin: string | null) { return response({ error: message }, status, origin); }
function clientAdmin() { return createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } }); }
function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
async function digest(value: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}
async function requireOwner(req: Request) {
  const authorization = req.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) return null;
  const token = authorization.slice(7);
  const authClient = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
function parseBody(req: Request) { return req.json().catch(() => null); }
function validLocation(location: any) {
  return location && Number.isFinite(location.latitude) && location.latitude >= -90 && location.latitude <= 90 &&
    Number.isFinite(location.longitude) && location.longitude >= -180 && location.longitude <= 180 &&
    Number.isFinite(location.accuracy) && location.accuracy >= 0 &&
    typeof location.timestamp === "string" && Number.isFinite(Date.parse(location.timestamp));
}
function publicShare(row: any, profile: any) {
  return { shareId: row.id, expiresAt: row.expires_at, createdAt: row.created_at, profile, location: row.location ?? null, lastLocationAt: row.last_location_at ?? null };
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") {
    const headers: Record<string, string> = { ...jsonHeaders, "access-control-allow-methods": "GET,POST,PUT,OPTIONS", "access-control-allow-headers": "authorization,content-type,x-share-token,apikey" };
    if (origin && ALLOWED_ORIGINS.has(origin)) headers["access-control-allow-origin"] = origin;
    return new Response(null, { status: 204, headers });
  }
  if (origin && !ALLOWED_ORIGINS.has(origin)) return fail("Origin not allowed", 403, null);
  if (!SUPABASE_URL || !ANON_KEY || !SERVICE_KEY) return fail("Server configuration incomplete", 503, origin);

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/functions\/v1\/crown-sos/, "").replace(/\/$/, "") || "/";
  const admin = clientAdmin();

  try {

    if (path === "/profile/import-legacy-preview" && req.method === "POST") {
      const user = await requireOwner(req);
      if (!user) return fail("Sign in required", 401, origin);
      // Fixed historical source; only an authenticated owner can request this import.
      const legacyUrl = "https://raw.githubusercontent.com/darenprince/darenprince-author/e3ba6bf5fb3be8e461473281deb4d23615b15207/911.html";
      const legacyResponse = await fetch(legacyUrl, { headers: { "accept": "text/html" } });
      if (!legacyResponse.ok) return fail("Legacy source could not be retrieved", 502, origin);
      const legacyHtml = await legacyResponse.text();
      if (legacyHtml.length > 200_000) return fail("Legacy source exceeded the import limit", 413, origin);
      const decodeEntities = (value: string) => value
        .replace(/&nbsp;|&#160;/gi, " ")
        .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
        .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
        .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Math.min(Number(n), 0x10ffff)))
        .replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCodePoint(Math.min(parseInt(n, 16), 0x10ffff)));
      const textFromHtml = (html: string) => decodeEntities(html
        .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
        .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
        .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, " ")
        .replace(/<button\b[\s\S]*?<\/button>/gi, " ")
        .replace(/<input\b[^>]*>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim());
      const sectionText = (id: string) => {
        const marker = 'id="' + id + '"';
        const idPosition = legacyHtml.indexOf(marker);
        if (idPosition < 0) return "";
        const sectionStart = legacyHtml.lastIndexOf("<section", idPosition);
        if (sectionStart < 0 || sectionStart < legacyHtml.lastIndexOf("</section>", idPosition)) return "";
        const openingEnd = legacyHtml.indexOf(">", idPosition);
        if (openingEnd < 0) return "";
        const tail = legacyHtml.slice(openingEnd + 1);
        const nextSection = tail.search(/<section\b/i);
        const nextMain = tail.search(/<\/main\s*>/i);
        const ends = [nextSection, nextMain].filter(n => n >= 0);
        const end = ends.length ? Math.min(...ends) : tail.length;
        return textFromHtml(tail.slice(0, end));
      };
      const sections: Record<string, string> = {
        emergencySummary: sectionText("alert-overview"),
        currentSituation: sectionText("sos-intel"),
        locationContext: sectionText("device-location"),
        emergencyContacts: sectionText("emergency-contacts"),
        recentContext: sectionText("recent-context"),
        importantLinks: sectionText("live-links"),
        evidenceAndMedia: sectionText("evidence"),
        medical: sectionText("medical"),
        ifUnresponsive: sectionText("if-unresponsive"),
        trackersAndContingencies: sectionText("trackers"),
        recentPhotos: sectionText("recent-photos"),
      };
      for (const [key, value] of Object.entries(sections)) {
        if (!value) delete sections[key];
        else sections[key] = value.slice(0, 12_000);
      }
      if (!Object.keys(sections).length) return fail("No importable emergency sections were found in the legacy page", 422, origin);
      const profile = {
        ...sections,
        legacyImportNotice: "Imported from the historical Crown SOS portal for owner review. Treat all dates, locations, device status, links, medical details, and instructions as unverified until checked. No legacy telemetry is represented as current live location.",
        legacySourceRevision: "e3ba6bf5fb3be8e461473281deb4d23615b15207",
        legacyImportedAt: new Date().toISOString(),
        legacyReviewRequired: true
      };
      return response({ profile, sectionCount: Object.keys(sections).length, requiresOwnerReview: true }, 200, origin);
    }

    if (path === "/profile" && req.method === "GET") {
      const user = await requireOwner(req);
      if (!user) return fail("Sign in required", 401, origin);
      const { data, error } = await admin.from("crown_sos_profiles").select("profile,updated_at").eq("owner_id", user.id).maybeSingle();
      if (error) throw error;
      return response({ profile: data?.profile ?? {}, updatedAt: data?.updated_at ?? null }, 200, origin);
    }

    if (path === "/profile" && req.method === "PUT") {
      const user = await requireOwner(req);
      if (!user) return fail("Sign in required", 401, origin);
      const body = await parseBody(req);
      if (!body || !body.profile || typeof body.profile !== "object" || Array.isArray(body.profile)) return fail("Profile must be a JSON object", 400, origin);
      if (JSON.stringify(body.profile).length > 100_000) return fail("Emergency profile is too large (100 KB maximum)", 413, origin);
      const { data, error } = await admin.from("crown_sos_profiles").upsert({ owner_id: user.id, profile: body.profile, updated_at: new Date().toISOString() }, { onConflict: "owner_id" }).select("profile,updated_at").single();
      if (error) throw error;
      return response({ profile: data.profile, updatedAt: data.updated_at }, 200, origin);
    }

    if (path === "/shares" && req.method === "POST") {
      const user = await requireOwner(req);
      if (!user) return fail("Sign in required", 401, origin);
      const body = await parseBody(req);
      const hours = Number(body?.hours ?? 2);
      if (!Number.isFinite(hours) || hours < 1 || hours > MAX_SHARE_HOURS) return fail("Share duration must be between 1 and 24 hours", 400, origin);
      const { data: profileRow, error: profileError } = await admin.from("crown_sos_profiles").select("profile").eq("owner_id", user.id).maybeSingle();
      if (profileError) throw profileError;
      if (!profileRow?.profile || Object.keys(profileRow.profile).length === 0) return fail("Save your emergency profile before creating an SOS link", 409, origin);
      const token = randomToken();
      const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      const { data, error } = await admin.from("crown_sos_shares").insert({ owner_id: user.id, token_hash: await digest(token), expires_at: expiresAt }).select("id,expires_at,created_at").single();
      if (error) throw error;
      return response({ shareId: data.id, token, expiresAt: data.expires_at, createdAt: data.created_at, shareUrl: "https://darenprince.com/911.html#" + new URLSearchParams({ id: data.id, token }).toString() }, 201, origin);
    }

    const locationMatch = path.match(/^\/shares\/([0-9a-f-]+)\/location$/i);
    if (locationMatch && req.method === "PUT") {
      const user = await requireOwner(req);
      if (!user) return fail("Sign in required", 401, origin);
      const body = await parseBody(req);
      if (!validLocation(body?.location)) return fail("Location fix is invalid", 400, origin);
      const { data, error } = await admin.from("crown_sos_shares").update({ location: body.location, last_location_at: new Date().toISOString() }).eq("id", locationMatch[1]).eq("owner_id", user.id).is("revoked_at", null).gt("expires_at", new Date().toISOString()).select("id").maybeSingle();
      if (error) throw error;
      if (!data) return fail("Share is expired or revoked", 404, origin);
      return response({ ok: true }, 200, origin);
    }

    const revokeMatch = path.match(/^\/shares\/([0-9a-f-]+)\/revoke$/i);
    if (revokeMatch && req.method === "POST") {
      const user = await requireOwner(req);
      if (!user) return fail("Sign in required", 401, origin);
      const { data, error } = await admin.from("crown_sos_shares").update({ revoked_at: new Date().toISOString() }).eq("id", revokeMatch[1]).eq("owner_id", user.id).is("revoked_at", null).select("id").maybeSingle();
      if (error) throw error;
      if (!data) return fail("Share not found or already revoked", 404, origin);
      return response({ ok: true }, 200, origin);
    }

    const viewMatch = path.match(/^\/shares\/([0-9a-f-]+)$/i);
    if (viewMatch && req.method === "GET") {
      const token = req.headers.get("x-share-token") ?? "";
      if (!/^[a-f0-9]{64}$/.test(token)) return fail("Invalid or missing SOS link token", 401, origin);
      const { data: share, error } = await admin.from("crown_sos_shares").select("id,owner_id,created_at,expires_at,revoked_at,location,last_location_at,token_hash").eq("id", viewMatch[1]).maybeSingle();
      if (error) throw error;
      if (!share || share.revoked_at || Date.parse(share.expires_at) <= Date.now() || share.token_hash !== await digest(token)) return fail("This SOS link is invalid, expired, or revoked", 404, origin);
      const { data: profileRow, error: profileError } = await admin.from("crown_sos_profiles").select("profile,updated_at").eq("owner_id", share.owner_id).maybeSingle();
      if (profileError) throw profileError;
      return response({ ...publicShare(share, profileRow?.profile ?? {}), profileUpdatedAt: profileRow?.updated_at ?? null }, 200, origin);
    }

    return fail("Not found", 404, origin);
  } catch (error) {
    console.error("crown-sos request failed", error);
    return fail("Request could not be completed", 500, origin);
  }
});
