import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://darenprince.com",
  "https://www.darenprince.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);
const ALLOWED_ROLES = new Set(["admin", "developer", "user"]);
const DEFAULT_PERMISSIONS: Record<string, string[]> = {
  admin: ["developer.console", "users.manage", "cases.manage", "deploy.manage", "diagnostics.read"],
  developer: ["developer.console", "cases.manage", "deploy.manage", "diagnostics.read"],
  user: ["user.workspace"],
};

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://darenprince.com",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(origin: string, status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

function safeText(value: unknown, max = 160) {
  return String(value ?? "").replace(/\0/g, " ").trim().slice(0, max);
}

function normalizeRole(value: unknown) {
  const role = safeText(value, 32).toLowerCase();
  return ALLOWED_ROLES.has(role) ? role : null;
}

function normalizePermissions(value: unknown, role: string) {
  if (!Array.isArray(value)) return DEFAULT_PERMISSIONS[role] || [];
  return [...new Set(value.map(item => safeText(item, 64)).filter(Boolean))].slice(0, 32);
}

function trustedRole(user: any) {
  return normalizeRole(user?.app_metadata?.voxvector_role || user?.app_metadata?.role);
}

function safeUser(user: any, profile: any = null) {
  const role = trustedRole(user);
  return {
    id: user?.id || "",
    email: user?.email || "",
    role,
    permissions: Array.isArray(user?.app_metadata?.voxvector_permissions)
      ? user.app_metadata.voxvector_permissions.filter((item: unknown) => typeof item === "string")
      : (role ? DEFAULT_PERMISSIONS[role] || [] : []),
    display_name: profile?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || "",
    avatar_url: profile?.avatar_url || "",
    created_at: user?.created_at || null,
    updated_at: user?.updated_at || null,
    confirmed_at: user?.confirmed_at || null,
    last_sign_in_at: user?.last_sign_in_at || null,
    banned_until: user?.banned_until || null,
  };
}

Deno.serve(async req => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") {
    if (origin && !ALLOWED_ORIGINS.has(origin)) return json(origin, 403, { error: "Origin not allowed" });
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") return json(origin, 405, { error: "Method not allowed" });
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json(origin, 403, { error: "Origin not allowed" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!supabaseUrl || !anonKey || !serviceRoleKey) return json(origin, 503, { error: "User administration is not configured" });

  const authorization = req.headers.get("authorization") || "";
  if (!authorization.toLowerCase().startsWith("bearer ")) return json(origin, 401, { error: "Authentication required" });
  const token = authorization.slice(7).trim();
  const callerClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: callerData, error: callerError } = await callerClient.auth.getUser(token);
  const caller = callerData?.user;
  if (callerError || !caller) return json(origin, 401, { error: "Invalid or expired session" });
  if (trustedRole(caller) !== "admin") return json(origin, 403, { error: "Admin role required" });

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return json(origin, 400, { error: "A JSON request body is required" });
  }
  const action = safeText(body?.action, 40).toLowerCase();

  const audit = async (auditAction: string, resourceId: string, metadata: Record<string, unknown> = {}) => {
    await admin.from("audit_events").insert({
      user_id: caller.id,
      action: auditAction,
      resource_type: "auth_user",
      resource_id: resourceId,
      metadata,
    }).then(() => {}).catch(() => {});
  };

  if (action === "list") {
    const page = Math.max(1, Math.min(1000, Number(body?.page) || 1));
    const perPage = Math.max(1, Math.min(200, Number(body?.per_page) || 100));
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) return json(origin, 502, { error: "Unable to load users" });
    const ids = (data?.users || []).map(user => user.id);
    let profiles: any[] = [];
    if (ids.length) {
      const { data: profileRows } = await admin.from("profiles").select("id,email,display_name,avatar_url,created_at,updated_at").in("id", ids);
      profiles = profileRows || [];
    }
    const byId = new Map(profiles.map(profile => [profile.id, profile]));
    return json(origin, 200, {
      users: (data?.users || []).map(user => safeUser(user, byId.get(user.id))),
      page,
      per_page: perPage,
    });
  }

  if (action === "create") {
    const email = safeText(body?.email, 320).toLowerCase();
    const role = normalizeRole(body?.role);
    const displayName = safeText(body?.display_name, 120);
    const password = String(body?.password || "");
    const invite = body?.invite !== false && !password;
    if (!email || !email.includes("@")) return json(origin, 400, { error: "A valid email is required" });
    if (!role) return json(origin, 400, { error: "Role must be admin, developer, or user" });
    if (password && password.length < 8) return json(origin, 400, { error: "Passwords must contain at least 8 characters" });
    const permissions = normalizePermissions(body?.permissions, role);
    let createdUser: any = null;
    if (invite) {
      const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
        data: displayName ? { full_name: displayName, name: displayName } : {},
        redirectTo: "https://darenprince.com/voxvector/login",
      });
      if (inviteError || !inviteData?.user) return json(origin, 400, { error: safeText(inviteError?.message || "Unable to invite user") });
      createdUser = inviteData.user;
      const { data: updated, error: metadataError } = await admin.auth.admin.updateUserById(createdUser.id, {
        app_metadata: { ...(createdUser.app_metadata || {}), voxvector_role: role, voxvector_permissions: permissions },
      });
      if (metadataError || !updated?.user) return json(origin, 500, { error: "User was invited but role assignment failed" });
      createdUser = updated.user;
    } else {
      const { data: createData, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: displayName ? { full_name: displayName, name: displayName } : {},
        app_metadata: { voxvector_role: role, voxvector_permissions: permissions },
      });
      if (createError || !createData?.user) return json(origin, 400, { error: safeText(createError?.message || "Unable to create user") });
      createdUser = createData.user;
    }
    const profile = {
      id: createdUser.id,
      email,
      display_name: displayName || null,
      avatar_url: null,
      updated_at: new Date().toISOString(),
    };
    await admin.from("profiles").upsert(profile);
    await audit("user.created", createdUser.id, { role, invite });
    return json(origin, 201, { user: safeUser(createdUser, profile) });
  }

  if (action === "update") {
    const userId = safeText(body?.user_id, 80);
    if (!userId) return json(origin, 400, { error: "User ID is required" });
    const { data: targetData, error: targetError } = await admin.auth.admin.getUserById(userId);
    const target = targetData?.user;
    if (targetError || !target) return json(origin, 404, { error: "User not found" });
    const nextRole = body?.role == null ? trustedRole(target) : normalizeRole(body.role);
    if (!nextRole) return json(origin, 400, { error: "Role must be admin, developer, or user" });
    if (caller.id === userId && nextRole !== "admin") return json(origin, 409, { error: "You cannot remove your own admin role" });
    const permissions = normalizePermissions(body?.permissions, nextRole);
    const attributes: Record<string, unknown> = {
      app_metadata: { ...(target.app_metadata || {}), voxvector_role: nextRole, voxvector_permissions: permissions },
    };
    const email = body?.email == null ? "" : safeText(body.email, 320).toLowerCase();
    const password = body?.password == null ? "" : String(body.password);
    const displayName = body?.display_name == null ? null : safeText(body.display_name, 120);
    if (email) attributes.email = email;
    if (password) {
      if (password.length < 8) return json(origin, 400, { error: "Passwords must contain at least 8 characters" });
      attributes.password = password;
    }
    if (displayName !== null) attributes.user_metadata = { ...(target.user_metadata || {}), full_name: displayName, name: displayName };
    const { data: updatedData, error: updateError } = await admin.auth.admin.updateUserById(userId, attributes);
    if (updateError || !updatedData?.user) return json(origin, 400, { error: safeText(updateError?.message || "Unable to update user") });
    if (displayName !== null || email) {
      const { data: existingProfile } = await admin.from("profiles").select("avatar_url").eq("id", userId).maybeSingle();
      await admin.from("profiles").upsert({
        id: userId,
        email: email || updatedData.user.email || null,
        display_name: displayName ?? updatedData.user.user_metadata?.full_name ?? null,
        avatar_url: existingProfile?.avatar_url || null,
        updated_at: new Date().toISOString(),
      });
    }
    await audit("user.updated", userId, { role: nextRole, email_changed: Boolean(email), password_changed: Boolean(password) });
    return json(origin, 200, { user: safeUser(updatedData.user) });
  }

  if (action === "recovery") {
    const userId = safeText(body?.user_id, 80);
    const { data: targetData, error: targetError } = await admin.auth.admin.getUserById(userId);
    const target = targetData?.user;
    if (targetError || !target?.email) return json(origin, 404, { error: "User email not found" });
    const { error: recoveryError } = await admin.auth.resetPasswordForEmail(target.email, { redirectTo: "https://darenprince.com/voxvector/login" });
    if (recoveryError) return json(origin, 400, { error: safeText(recoveryError.message || "Unable to send recovery email") });
    await audit("user.recovery_requested", userId);
    return json(origin, 200, { sent: true });
  }

  if (action === "delete") {
    const userId = safeText(body?.user_id, 80);
    if (!userId) return json(origin, 400, { error: "User ID is required" });
    if (userId === caller.id) return json(origin, 409, { error: "You cannot delete your own admin account" });
    const { data: avatarFiles } = await admin.storage.from("voxvector-avatars").list(userId, { limit: 100 });
    if (avatarFiles?.length) {
      await admin.storage.from("voxvector-avatars").remove(avatarFiles.map(file => `${userId}/${file.name}`));
    }
    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
    if (deleteError) return json(origin, 400, { error: safeText(deleteError.message || "Unable to delete user") });
    await audit("user.deleted", userId);
    return json(origin, 200, { deleted: true, user_id: userId });
  }

  return json(origin, 400, { error: "Unknown user administration action" });
});
