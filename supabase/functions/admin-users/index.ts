import { serve } from 'https://deno.land/std@0.182.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { resolveSupabaseConfig } from '../../env.js';
import { FOLDER_CATALOG } from '../../../js/folder-catalog.js';

const { url, key } = await resolveSupabaseConfig();

if (!url || !key) {
  console.error('Admin users function missing Supabase config.');
  throw new Error('Supabase configuration is required.');
}

const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type AdminActionPayload = {
  actor_user_id: string;
  target_user_id?: string | null;
  action: string;
  detail?: JsonValue;
};

const VALID_ROLES = new Set(['member', 'developer', 'admin']);

const FOLDER_KEYS = FOLDER_CATALOG.map((folder) => folder.id);

function normalizeRole(role: unknown) {
  if (typeof role !== 'string') return 'member';
  const normalized = role.trim().toLowerCase();
  return VALID_ROLES.has(normalized) ? normalized : 'member';
}

async function ensureAdmin(actorId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', actorId)
    .maybeSingle();
  if (error) throw error;
  const role = normalizeRole(data?.role);
  if (role !== 'admin') {
    const err = new Error('Forbidden');
    (err as Error & { status?: number }).status = 403;
    throw err;
  }
}

async function logAdminAction(payload: AdminActionPayload) {
  try {
    await supabase.from('private.admin_action_log').insert({
      actor_user_id: payload.actor_user_id,
      target_user_id: payload.target_user_id ?? null,
      action: payload.action,
      detail: payload.detail ?? null,
    });
  } catch (error) {
    console.warn('Failed to write admin action log', error);
  }
}

function withCors(init: ResponseInit = {}) {
  return {
    ...init,
    headers: {
      ...corsHeaders,
      ...(init.headers ?? {}),
    },
  } satisfies ResponseInit;
}

async function listUsers() {
  const perPage = 200;
  let page = 1;
  const users = [];
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const batch = data?.users ?? [];
    users.push(...batch);
    if (batch.length < perPage) {
      break;
    }
    page += 1;
  }

  if (users.length === 0) {
    return [];
  }
  const userIds = users.map((user) => user.id);
  const [{ data: profiles, error: profilesError }, { data: folderRows, error: folderError }] = await Promise.all([
    supabase
      .from('profiles')
      .select('user_id, first_name, last_name, role')
      .in('user_id', userIds),
    supabase
      .from('folder_access')
      .select('user_id, file_name')
      .in('user_id', userIds),
  ]);
  if (profilesError) throw profilesError;
  if (folderError) throw folderError;
  const profileMap = new Map(
    (profiles ?? []).map((profile) => [profile.user_id, profile]),
  );
  const folderMap = new Map<string, string[]>();
  for (const row of folderRows ?? []) {
    const list = folderMap.get(row.user_id) ?? [];
    list.push(row.file_name);
    folderMap.set(row.user_id, list);
  }
  return users.map((user) => {
    const profile = profileMap.get(user.id);
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at ?? null,
      role: normalizeRole(profile?.role ?? user.user_metadata?.role ?? user.app_metadata?.role),
      first_name: profile?.first_name ?? user.user_metadata?.first_name ?? null,
      last_name: profile?.last_name ?? user.user_metadata?.last_name ?? null,
      folder_access: folderMap.get(user.id) ?? [],
    };
  });
}

async function updateRole(targetUserId: string, role: string) {
  const normalized = normalizeRole(role);
  const [profileResult, authResult] = await Promise.all([
    supabase
      .from('profiles')
      .update({ role: normalized })
      .eq('user_id', targetUserId),
    supabase.auth.admin.updateUserById(targetUserId, {
      user_metadata: { role: normalized },
      app_metadata: { role: normalized },
    }),
  ]);
  if (profileResult.error) throw profileResult.error;
  if (authResult.error) throw authResult.error;
  return normalized;
}

async function replaceFolderAccess(targetUserId: string, folders: string[]) {
  const uniqueFolders = Array.from(new Set(folders.filter((folder) => FOLDER_KEYS.includes(folder))));
  const deleteResult = await supabase
    .from('folder_access')
    .delete()
    .eq('user_id', targetUserId);
  if (deleteResult.error) throw deleteResult.error;
  if (uniqueFolders.length === 0) {
    return uniqueFolders;
  }
  const insertPayload = uniqueFolders.map((file_name) => ({ user_id: targetUserId, file_name }));
  const insertResult = await supabase.from('folder_access').insert(insertPayload);
  if (insertResult.error) throw insertResult.error;
  return uniqueFolders;
}

async function sendPasswordReset(userId: string, redirectTo?: string | null) {
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    user_id: userId,
    options: redirectTo ? { redirectTo } : undefined,
  });
  if (error) throw error;
  return data?.action_link ?? null;
}

async function listFilesRecursive(bucket: string, path: string) {
  const pageSize = 100;
  const files: string[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase.storage.from(bucket).list(path, {
      limit: pageSize,
      offset,
    });
    if (error) throw error;
    const entries = data ?? [];
    if (entries.length === 0) {
      break;
    }

    for (const entry of entries) {
      const entryPath = path ? `${path}/${entry.name}` : entry.name;
      const isFolder = entry.id === null || entry.metadata === null;
      if (isFolder) {
        const nested = await listFilesRecursive(bucket, entryPath);
        files.push(...nested);
      } else {
        files.push(entryPath);
      }
    }

    if (entries.length < pageSize) {
      break;
    }
    offset += pageSize;
  }

  return files;
}

async function deleteUser(userId: string) {
  const [userDataPaths, avatarPaths] = await Promise.all([
    listFilesRecursive('user-data', userId),
    Promise.resolve([`${userId}.jpg`]),
  ]);

  if (userDataPaths.length > 0) {
    const removeData = await supabase.storage.from('user-data').remove(userDataPaths);
    if (removeData.error) throw removeData.error;
  }

  const removeAvatars = await supabase.storage.from('avatars').remove(avatarPaths);
  if (removeAvatars.error) {
    console.warn('Failed to remove avatar during user deletion', removeAvatars.error);
  }

  const [folderResult, profileResult, authResult] = await Promise.all([
    supabase.from('folder_access').delete().eq('user_id', userId),
    supabase.from('profiles').delete().eq('user_id', userId),
    supabase.auth.admin.deleteUser(userId),
  ]);
  if (folderResult.error) throw folderResult.error;
  if (profileResult.error) throw profileResult.error;
  if (authResult.error) throw authResult.error;
}

async function handleRequest(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', withCors());
  }

  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.replace('Bearer', '').trim();

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing access token' }), withCors({ status: 401 }));
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      withCors({ status: 401 }),
    );
  }

  try {
    await ensureAdmin(user.id);
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    if (status === 403) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), withCors({ status: 403 }));
    }
    console.error('Failed to verify admin privileges', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), withCors({ status: 500 }));
  }

  try {
    if (req.method === 'GET') {
      const users = await listUsers();
      return new Response(
        JSON.stringify({ users, folders: FOLDER_KEYS }),
        withCors({ status: 200, headers: { 'Content-Type': 'application/json' } }),
      );
    }

    const body = await req.json();
    const action = body?.action;

    if (typeof action !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing action' }),
        withCors({ status: 400 }),
      );
    }

    switch (action) {
      case 'update-role': {
        const targetId = body?.userId;
        const role = body?.role;
        if (typeof targetId !== 'string' || typeof role !== 'string') {
          return new Response(
            JSON.stringify({ error: 'userId and role are required' }),
            withCors({ status: 400 }),
          );
        }
        const newRole = await updateRole(targetId, role);
        await logAdminAction({
          actor_user_id: user.id,
          target_user_id: targetId,
          action: 'update-role',
          detail: { role: newRole },
        });
        return new Response(
          JSON.stringify({ role: newRole }),
          withCors({ status: 200, headers: { 'Content-Type': 'application/json' } }),
        );
      }
      case 'set-folder-access': {
        const targetId = body?.userId;
        const folders = Array.isArray(body?.folders) ? body.folders : [];
        if (typeof targetId !== 'string') {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            withCors({ status: 400 }),
          );
        }
        const applied = await replaceFolderAccess(targetId, folders);
        await logAdminAction({
          actor_user_id: user.id,
          target_user_id: targetId,
          action: 'set-folder-access',
          detail: { folders: applied },
        });
        return new Response(
          JSON.stringify({ folders: applied }),
          withCors({ status: 200, headers: { 'Content-Type': 'application/json' } }),
        );
      }
      case 'send-password-reset': {
        const targetId = body?.userId;
        if (typeof targetId !== 'string') {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            withCors({ status: 400 }),
          );
        }
        const actionLink = await sendPasswordReset(targetId, body?.redirectTo ?? null);
        await logAdminAction({
          actor_user_id: user.id,
          target_user_id: targetId,
          action: 'send-password-reset',
          detail: actionLink ? { actionLink } : undefined,
        });
        return new Response(
          JSON.stringify({ ok: true, actionLink }),
          withCors({ status: 200, headers: { 'Content-Type': 'application/json' } }),
        );
      }
      case 'delete-user': {
        const targetId = body?.userId;
        if (typeof targetId !== 'string') {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            withCors({ status: 400 }),
          );
        }
        await deleteUser(targetId);
        await logAdminAction({
          actor_user_id: user.id,
          target_user_id: targetId,
          action: 'delete-user',
        });
        return new Response(
          JSON.stringify({ ok: true }),
          withCors({ status: 200, headers: { 'Content-Type': 'application/json' } }),
        );
      }
      default:
        return new Response(
          JSON.stringify({ error: `Unsupported action: ${action}` }),
          withCors({ status: 400 }),
        );
    }
  } catch (error) {
    console.error('Admin users function failed', error);
    return new Response(
      JSON.stringify({ error: 'Internal error' }),
      withCors({ status: 500 }),
    );
  }
}

serve(handleRequest);
