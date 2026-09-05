-- VoxVector developer profile + avatar storage schema
-- Applied to the canonical Supabase project on 2026-09-05.
-- This script records the operational schema change for reproducibility.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'voxvector-avatars',
  'voxvector-avatars',
  false,
  5242880,
  array['image/jpeg','image/png','image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types,
  updated_at = now();

create policy "profiles_self_insert"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id or public.is_developer_admin());

create policy "voxvector_avatars_self_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'voxvector-avatars'
  and (
    name like ((select auth.uid())::text || '/%')
    or public.is_developer_admin()
  )
);

create policy "voxvector_avatars_self_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'voxvector-avatars'
  and name like ((select auth.uid())::text || '/%')
);

create policy "voxvector_avatars_self_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'voxvector-avatars'
  and name like ((select auth.uid())::text || '/%')
)
with check (
  bucket_id = 'voxvector-avatars'
  and name like ((select auth.uid())::text || '/%')
);

create policy "voxvector_avatars_self_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'voxvector-avatars'
  and name like ((select auth.uid())::text || '/%')
);
