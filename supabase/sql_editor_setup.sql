begin;

-- Ensure uuid + crypto helpers are available
create extension if not exists "pgcrypto";

-- Private schema stores audit tables and security-definer helpers
create schema if not exists private;

-- Define role enum once so profiles can classify access. Supabase/Postgres lacks
-- CREATE TYPE IF NOT EXISTS for enums, so guard creation inside a DO block.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'profile_role'
      AND n.nspname = 'public'
  ) THEN
    EXECUTE $$CREATE TYPE public.profile_role AS ENUM ('member', 'developer', 'admin')$$;
  END IF;
END
$$;

-- Profiles table stores member contact info keyed to the auth user
create table if not exists public.profiles (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  phone text,
  shipping_address text,
  avatar_url text,
  role public.profile_role not null default 'member',
  created_at timestamptz not null default timezone('utc', now())
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles
      ADD COLUMN role public.profile_role NOT NULL DEFAULT 'member';
  ELSIF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'role'
      AND udt_name <> 'profile_role'
  ) THEN
    ALTER TABLE public.profiles
      ALTER COLUMN role TYPE public.profile_role USING (
        CASE lower(trim(role::text))
          WHEN 'admin' THEN 'admin'::public.profile_role
          WHEN 'developer' THEN 'developer'::public.profile_role
          WHEN 'member' THEN 'member'::public.profile_role
          ELSE 'member'::public.profile_role
        END
      ),
      ALTER COLUMN role SET DEFAULT 'member',
      ALTER COLUMN role SET NOT NULL;
  END IF;
END
$$;

-- Legacy table support: convert uuid primary key to identity + user_id column
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'id'
      AND data_type = 'uuid'
  ) THEN
    ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
    ALTER TABLE public.profiles RENAME COLUMN id TO user_id;
    ALTER TABLE public.profiles ADD COLUMN id bigint GENERATED ALWAYS AS IDENTITY;
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  END IF;
END
$$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS user_id uuid;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url text;

ALTER TABLE public.profiles
  ALTER COLUMN user_id SET NOT NULL;

-- Guarantee the auth reference exists even if table pre-dated the FK
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_schema = 'public'
      AND tc.table_name = 'profiles'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'user_id'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_user_id_key'
      AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_profiles_user_id
  ON public.profiles(user_id);

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS phone_format_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT phone_format_check
    CHECK (phone IS NULL OR phone ~ '^[0-9\\-\\+\\(\\) ]*$');

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Individuals can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Individuals can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: select owner" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: insert owner" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: update owner" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: delete owner" ON public.profiles;

CREATE POLICY "Profiles: select owner" ON public.profiles
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Profiles: insert owner" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Profiles: update owner" ON public.profiles
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Profiles: delete owner" ON public.profiles
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Maintain profiles in sync with auth metadata for role-based navigation
create or replace function public.sync_profile_from_auth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  meta_first text := nullif(trim(meta->>'first_name'), '');
  meta_last text := nullif(trim(meta->>'last_name'), '');
  meta_phone text := nullif(trim(meta->>'phone'), '');
  meta_shipping text := nullif(trim(meta->>'shipping_address'), '');
  meta_avatar text := nullif(trim(meta->>'avatar_url'), '');
  meta_role text := nullif(trim(meta->>'role'), '');
  resolved_role public.profile_role := 'member';
begin
  if meta_role is not null then
    case lower(meta_role)
      when 'admin' then resolved_role := 'admin';
      when 'developer' then resolved_role := 'developer';
      when 'member' then resolved_role := 'member';
      else resolved_role := 'member';
    end case;
  end if;

  insert into public.profiles as p (user_id, first_name, last_name, phone, shipping_address, avatar_url, role)
  values (new.id, meta_first, meta_last, meta_phone, meta_shipping, meta_avatar, resolved_role)
  on conflict (user_id) do update
    set first_name = case when meta ? 'first_name' then excluded.first_name else p.first_name end,
        last_name = case when meta ? 'last_name' then excluded.last_name else p.last_name end,
        phone = case when meta ? 'phone' then excluded.phone else p.phone end,
        shipping_address = case when meta ? 'shipping_address' then excluded.shipping_address else p.shipping_address end,
        avatar_url = case when meta ? 'avatar_url' then excluded.avatar_url else p.avatar_url end,
        role = case when meta ? 'role' then excluded.role else p.role end;

  return new;
end;
$$;

drop trigger if exists sync_profile_from_auth on auth.users;
create trigger sync_profile_from_auth
  after insert or update on auth.users
  for each row execute function public.sync_profile_from_auth();

insert into public.profiles (user_id, first_name, last_name, phone, shipping_address, avatar_url, role)
select
  u.id,
  nullif(trim(u.raw_user_meta_data->>'first_name'), ''),
  nullif(trim(u.raw_user_meta_data->>'last_name'), ''),
  nullif(trim(u.raw_user_meta_data->>'phone'), ''),
  nullif(trim(u.raw_user_meta_data->>'shipping_address'), ''),
  nullif(trim(u.raw_user_meta_data->>'avatar_url'), ''),
  coalesce(
    case
      when u.raw_user_meta_data ? 'role' then
        case lower(trim(u.raw_user_meta_data->>'role'))
          when 'admin' then 'admin'::public.profile_role
          when 'developer' then 'developer'::public.profile_role
          when 'member' then 'member'::public.profile_role
          else null
        end
    end,
    'member'::public.profile_role
  )
from auth.users u
left join public.profiles p on p.user_id = u.id
where p.user_id is null;

-- Track which files are shared with a member
create table if not exists public.folder_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null check (char_length(file_name) > 0),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.folder_access enable row level security;

drop policy if exists "Users can view own folder_access" on public.folder_access;
create policy "Users can view own folder_access" on public.folder_access
  for select using ((SELECT auth.uid()) = user_id);

drop policy if exists "Users can insert own folder_access" on public.folder_access;
create policy "Users can insert own folder_access" on public.folder_access
  for insert with check ((SELECT auth.uid()) = user_id);

drop policy if exists "Users can update own folder_access" on public.folder_access;
create policy "Users can update own folder_access" on public.folder_access
  for update using ((SELECT auth.uid()) = user_id);

drop policy if exists "Users can delete own folder_access" on public.folder_access;
create policy "Users can delete own folder_access" on public.folder_access
  for delete using ((SELECT auth.uid()) = user_id);

-- Profiles audit trail (private schema)
create table if not exists private.profile_audit (
  id bigint generated always as identity primary key,
  profile_id bigint references public.profiles(id) on delete cascade,
  user_id uuid,
  full_name text,
  avatar_url text,
  phone text,
  action text,
  changed_at timestamptz not null default timezone('utc', now()),
  changed_by uuid
);

alter table private.profile_audit
  add column if not exists profile_id bigint references public.profiles(id) on delete cascade,
  add column if not exists user_id uuid,
  add column if not exists full_name text,
  add column if not exists avatar_url text,
  add column if not exists phone text,
  add column if not exists action text,
  add column if not exists changed_at timestamptz not null default timezone('utc', now()),
  add column if not exists changed_by uuid;

alter table private.profile_audit
  alter column changed_at set default timezone('utc', now());

update private.profile_audit
set changed_at = timezone('utc', now())
where changed_at is null;

alter table private.profile_audit
  alter column changed_at set not null;

update private.profile_audit
set action = 'update'
where action is null;

update private.profile_audit
set action = lower(action)
where action is not null
  and action <> lower(action);

update private.profile_audit
set action = 'update'
where action is not null
  and btrim(action) = '';

update private.profile_audit
set action = 'update'
where action is not null
  and action not in ('insert', 'update', 'delete');

alter table private.profile_audit
  alter column action set not null;

alter table private.profile_audit
  drop constraint if exists profile_audit_action_check;

alter table private.profile_audit
  add constraint profile_audit_action_check
    check (action in ('insert', 'update', 'delete')) not valid;

alter table private.profile_audit
  validate constraint profile_audit_action_check;

create or replace function private.log_profile_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := (select auth.uid());
  snapshot record;
begin
  if tg_op = 'DELETE' then
    snapshot := old;
  else
    snapshot := new;
  end if;

  insert into private.profile_audit (profile_id, user_id, full_name, avatar_url, phone, action, changed_by)
  values (
    snapshot.id,
    snapshot.user_id,
    concat_ws(' ', snapshot.first_name, snapshot.last_name),
    snapshot.avatar_url,
    snapshot.phone,
    lower(tg_op),
    actor
  );

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

revoke execute on function private.log_profile_change() from public;
revoke execute on function private.log_profile_change() from anon;
revoke execute on function private.log_profile_change() from authenticated;

drop trigger if exists trg_profiles_audit on public.profiles;
create trigger trg_profiles_audit
  after insert or update or delete on public.profiles
  for each row execute function private.log_profile_change();

-- Provision storage buckets used by the dashboard
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('user-data', 'user-data', false)
on conflict (id) do nothing;

DO $$
DECLARE
  can_alter boolean;
  owner_column text;
BEGIN
  SELECT has_table_privilege('storage.objects', 'ALTER') INTO can_alter;

  IF NOT can_alter THEN
    RAISE NOTICE 'Skipping storage.objects policy configuration because current role lacks ALTER privilege.';
    RETURN;
  END IF;

  SELECT column_name INTO owner_column
  FROM information_schema.columns
  WHERE table_schema = 'storage'
    AND table_name = 'objects'
    AND column_name IN ('owner', 'owner_id')
  ORDER BY CASE column_name WHEN 'owner' THEN 1 ELSE 2 END
  LIMIT 1;

  IF owner_column IS NULL THEN
    RAISE NOTICE 'Skipping storage.objects policy configuration because owner column was not found.';
    RETURN;
  END IF;

  EXECUTE 'ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY';

  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can read own avatar" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can insert own avatar" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can update own avatar" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can delete own avatar" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can read own data" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can insert own data" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can update own data" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can delete own data" ON storage.objects';

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can read own avatar" ON storage.objects
      FOR SELECT USING (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND name = auth.uid() || '.jpg'
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can insert own avatar" ON storage.objects
      FOR INSERT WITH CHECK (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND name = auth.uid() || '.jpg'
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can update own avatar" ON storage.objects
      FOR UPDATE USING (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND name = auth.uid() || '.jpg'
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can delete own avatar" ON storage.objects
      FOR DELETE USING (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND name = auth.uid() || '.jpg'
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can read own data" ON storage.objects
      FOR SELECT USING (
        bucket_id = 'user-data'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND position(auth.uid()::text || '/' in name) = 1
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can insert own data" ON storage.objects
      FOR INSERT WITH CHECK (
        bucket_id = 'user-data'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND position(auth.uid()::text || '/' in name) = 1
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can update own data" ON storage.objects
      FOR UPDATE USING (
        bucket_id = 'user-data'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND position(auth.uid()::text || '/' in name) = 1
      );
  $f$, owner_column);

  EXECUTE format($f$
    CREATE POLICY "Authenticated users can delete own data" ON storage.objects
      FOR DELETE USING (
        bucket_id = 'user-data'
        AND auth.role() = 'authenticated'
        AND auth.uid() = %I
        AND position(auth.uid()::text || '/' in name) = 1
      );
  $f$, owner_column);
END;
$$;

-- Admin action audit log
create schema if not exists private;

create table if not exists private.admin_action_log (
  id bigint generated always as identity primary key,
  actor_user_id uuid not null,
  target_user_id uuid,
  action text not null check (char_length(action) between 1 and 120),
  detail jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_admin_action_log_actor on private.admin_action_log(actor_user_id);
create index if not exists idx_admin_action_log_target on private.admin_action_log(target_user_id);
create index if not exists idx_admin_action_log_created on private.admin_action_log(created_at desc);

commit;
