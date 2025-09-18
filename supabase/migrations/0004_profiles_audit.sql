begin;

create type if not exists public.profile_role as enum ('member', 'developer', 'admin');

alter table public.profiles
  add column if not exists role public.profile_role;

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

-- Restructure profiles table to use an identity primary key and retain auth linkage
alter table public.profiles drop constraint if exists profiles_pkey;
alter table public.profiles rename column id to user_id;
alter table public.profiles add column if not exists id bigint generated always as identity;
alter table public.profiles add constraint profiles_pkey primary key (id);

alter table public.profiles
  alter column user_id set not null;

alter table public.profiles
  add column if not exists avatar_url text;

alter table public.profiles drop constraint if exists profiles_user_id_key;
alter table public.profiles add constraint profiles_user_id_key unique (user_id);

alter table public.profiles drop constraint if exists profiles_user_id_fkey;
alter table public.profiles
  add constraint profiles_user_id_fkey foreign key (user_id)
  references auth.users(id) on delete cascade;

create index if not exists idx_profiles_user_id on public.profiles(user_id);

alter table public.profiles drop constraint if exists phone_format_check;
alter table public.profiles
  add constraint phone_format_check
    check (phone is null or phone ~ '^[0-9\\-\\+\\(\\) ]*$');

alter table public.profiles enable row level security;

drop policy if exists "Individuals can view own profile" on public.profiles;
drop policy if exists "Individuals can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can delete own profile" on public.profiles;
drop policy if exists "Profiles: select owner" on public.profiles;
drop policy if exists "Profiles: insert owner" on public.profiles;
drop policy if exists "Profiles: update owner" on public.profiles;
drop policy if exists "Profiles: delete owner" on public.profiles;

create policy "Profiles: select owner" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Profiles: insert owner" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Profiles: update owner" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Profiles: delete owner" on public.profiles
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Updated profile sync trigger to honour the new schema and metadata fields
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

-- Audit log infrastructure
create schema if not exists private;

create table if not exists private.profile_audit (
  id bigint generated always as identity primary key,
  profile_id bigint references public.profiles(id) on delete cascade,
  user_id uuid,
  full_name text,
  avatar_url text,
  phone text,
  action text not null check (action in ('insert', 'update', 'delete')),
  changed_at timestamptz not null default timezone('utc', now()),
  changed_by uuid
);

create or replace function private.log_profile_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := (select auth.uid());
begin
  if tg_op = 'INSERT' then
    insert into private.profile_audit (profile_id, user_id, full_name, avatar_url, phone, action, changed_by)
    values (new.id, new.user_id, concat_ws(' ', new.first_name, new.last_name), new.avatar_url, new.phone, 'insert', actor);
    return new;
  elsif tg_op = 'UPDATE' then
    insert into private.profile_audit (profile_id, user_id, full_name, avatar_url, phone, action, changed_by)
    values (new.id, new.user_id, concat_ws(' ', new.first_name, new.last_name), new.avatar_url, new.phone, 'update', actor);
    return new;
  elsif tg_op = 'DELETE' then
    insert into private.profile_audit (profile_id, user_id, full_name, avatar_url, phone, action, changed_by)
    values (old.id, old.user_id, concat_ws(' ', old.first_name, old.last_name), old.avatar_url, old.phone, 'delete', actor);
    return old;
  end if;

  return null;
end;
$$;

revoke execute on function private.log_profile_change() from public;
revoke execute on function private.log_profile_change() from anon;
revoke execute on function private.log_profile_change() from authenticated;

drop trigger if exists trg_profiles_audit on public.profiles;
create trigger trg_profiles_audit
  after insert or update or delete on public.profiles
  for each row execute function private.log_profile_change();

commit;
