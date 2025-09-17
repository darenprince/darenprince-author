-- Ensure profiles table can store the role supplied in user metadata
alter table public.profiles
  add column if not exists role text;

-- Synchronize auth user metadata into the public.profiles table without
-- preventing fields from being cleared explicitly by the user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  new_first_name text := nullif(trim(meta->>'first_name'), '');
  new_last_name text := nullif(trim(meta->>'last_name'), '');
  new_phone text := nullif(trim(meta->>'phone'), '');
  new_shipping_address text := nullif(trim(meta->>'shipping_address'), '');
  new_role text := nullif(trim(meta->>'role'), '');
begin
  insert into public.profiles as p (id, first_name, last_name, phone, shipping_address, role)
  values (new.id, new_first_name, new_last_name, new_phone, new_shipping_address, new_role)
  on conflict (id) do update
    set first_name = case when meta ? 'first_name' then excluded.first_name else p.first_name end,
        last_name = case when meta ? 'last_name' then excluded.last_name else p.last_name end,
        phone = case when meta ? 'phone' then excluded.phone else p.phone end,
        shipping_address = case when meta ? 'shipping_address' then excluded.shipping_address else p.shipping_address end,
        role = case when meta ? 'role' then excluded.role else p.role end;

  return new;
end;
$$;
