begin;

-- Ensure uuid helpers are available
create extension if not exists "pgcrypto";

-- Define role enum once so profiles can classify access
create type if not exists public.profile_role as enum ('member', 'developer', 'admin');

-- Profiles table stores member contact info keyed to the auth user
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  phone text,
  shipping_address text,
  role public.profile_role not null default 'member',
  created_at timestamptz not null default timezone('utc', now())
);

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'role'
  ) then
    alter table public.profiles
      add column role public.profile_role not null default 'member';
  elsif exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'role'
      and udt_name <> 'profile_role'
  ) then
    alter table public.profiles
      alter column role type public.profile_role using (
        case lower(trim(role::text))
          when 'admin' then 'admin'::public.profile_role
          when 'developer' then 'developer'::public.profile_role
          when 'member' then 'member'::public.profile_role
          else 'member'::public.profile_role
        end
      ),
      alter column role set default 'member',
      alter column role set not null;
  end if;
end $$;

-- Keep phone numbers reasonably formatted
alter table public.profiles
  drop constraint if exists phone_format_check;

alter table public.profiles
  add constraint phone_format_check
    check (phone is null or phone ~ '^[0-9\\-\\+\\(\\) ]*$');

-- Lock down profile access
alter table public.profiles enable row level security;

drop policy if exists "Individuals can view own profile" on public.profiles;
create policy "Individuals can view own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Individuals can update own profile" on public.profiles;
create policy "Individuals can update own profile" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can delete own profile" on public.profiles;
create policy "Users can delete own profile" on public.profiles
  for delete using (auth.uid() = id);

-- Maintain profiles in sync with auth metadata for role-based navigation
create or replace function public.sync_profile_from_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta_first text;
  meta_last text;
  meta_phone text;
  meta_shipping text;
  meta_role text;
  resolved_role public.profile_role := 'member';
begin
  if new.raw_user_meta_data ? 'first_name' then
    meta_first := nullif(trim(new.raw_user_meta_data->>'first_name'), '');
  end if;
  if new.raw_user_meta_data ? 'last_name' then
    meta_last := nullif(trim(new.raw_user_meta_data->>'last_name'), '');
  end if;
  if new.raw_user_meta_data ? 'phone' then
    meta_phone := nullif(trim(new.raw_user_meta_data->>'phone'), '');
  end if;
  if new.raw_user_meta_data ? 'shipping_address' then
    meta_shipping := nullif(trim(new.raw_user_meta_data->>'shipping_address'), '');
  end if;
  if new.raw_user_meta_data ? 'role' then
    meta_role := lower(trim(new.raw_user_meta_data->>'role'));
    if meta_role = any (array['member', 'developer', 'admin']) then
      resolved_role := meta_role::public.profile_role;
    end if;
  end if;

  insert into public.profiles (id, first_name, last_name, phone, shipping_address, role)
  values (new.id, meta_first, meta_last, meta_phone, meta_shipping, resolved_role)
  on conflict (id) do update
    set first_name = coalesce(excluded.first_name, public.profiles.first_name),
        last_name = coalesce(excluded.last_name, public.profiles.last_name),
        phone = coalesce(excluded.phone, public.profiles.phone),
        shipping_address = coalesce(excluded.shipping_address, public.profiles.shipping_address),
        role = excluded.role;

  return new;
end;
$$;

drop trigger if exists sync_profile_from_auth on auth.users;
create trigger sync_profile_from_auth
  after insert or update on auth.users
  for each row execute function public.sync_profile_from_auth();

insert into public.profiles (id, first_name, last_name, phone, shipping_address, role)
select
  u.id,
  nullif(trim(u.raw_user_meta_data->>'first_name'), ''),
  nullif(trim(u.raw_user_meta_data->>'last_name'), ''),
  nullif(trim(u.raw_user_meta_data->>'phone'), ''),
  nullif(trim(u.raw_user_meta_data->>'shipping_address'), ''),
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
left join public.profiles p on p.id = u.id
where p.id is null;

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
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own folder_access" on public.folder_access;
create policy "Users can insert own folder_access" on public.folder_access
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own folder_access" on public.folder_access;
create policy "Users can update own folder_access" on public.folder_access
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own folder_access" on public.folder_access;
create policy "Users can delete own folder_access" on public.folder_access
  for delete using (auth.uid() = user_id);

-- Provision storage buckets used by the dashboard
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('user-data', 'user-data', false)
on conflict (id) do nothing;

alter table storage.objects enable row level security;

drop policy if exists "Authenticated users can read own avatar" on storage.objects;
create policy "Authenticated users can read own avatar" on storage.objects
  for select using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

drop policy if exists "Authenticated users can insert own avatar" on storage.objects;
create policy "Authenticated users can insert own avatar" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

drop policy if exists "Authenticated users can update own avatar" on storage.objects;
create policy "Authenticated users can update own avatar" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

drop policy if exists "Authenticated users can delete own avatar" on storage.objects;
create policy "Authenticated users can delete own avatar" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

drop policy if exists "Authenticated users can read own data" on storage.objects;
create policy "Authenticated users can read own data" on storage.objects
  for select using (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

drop policy if exists "Authenticated users can insert own data" on storage.objects;
create policy "Authenticated users can insert own data" on storage.objects
  for insert with check (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

drop policy if exists "Authenticated users can update own data" on storage.objects;
create policy "Authenticated users can update own data" on storage.objects
  for update using (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

drop policy if exists "Authenticated users can delete own data" on storage.objects;
create policy "Authenticated users can delete own data" on storage.objects
  for delete using (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

commit;
