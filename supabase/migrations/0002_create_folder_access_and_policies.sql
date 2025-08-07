create table folder_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  file_name text not null check (char_length(file_name) > 0),
  created_at timestamptz default now()
);

alter table folder_access enable row level security;

create policy "Users can view own folder_access" on folder_access
  for select using (auth.uid() = user_id);

create policy "Users can insert own folder_access" on folder_access
  for insert with check (auth.uid() = user_id);

create policy "Users can update own folder_access" on folder_access
  for update using (auth.uid() = user_id);

create policy "Users can delete own folder_access" on folder_access
  for delete using (auth.uid() = user_id);

-- ensure phone numbers follow a basic format
alter table profiles
  add constraint phone_format_check
    check (phone is null or phone ~ '^[0-9\-\+\(\) ]*$');

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can delete own profile" on profiles
  for delete using (auth.uid() = id);

-- ensure storage buckets exist
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('user-data', 'user-data', false)
  on conflict (id) do nothing;

alter table storage.objects enable row level security;

-- storage policies for avatars bucket
create policy "Authenticated users can read own avatar" on storage.objects
  for select using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

create policy "Authenticated users can insert own avatar" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

create policy "Authenticated users can update own avatar" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

create policy "Authenticated users can delete own avatar" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and name = auth.uid() || '.jpg'
  );

-- storage policies for user-data bucket
create policy "Authenticated users can read own data" on storage.objects
  for select using (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

create policy "Authenticated users can insert own data" on storage.objects
  for insert with check (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

create policy "Authenticated users can update own data" on storage.objects
  for update using (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );

create policy "Authenticated users can delete own data" on storage.objects
  for delete using (
    bucket_id = 'user-data'
    and auth.role() = 'authenticated'
    and auth.uid() = owner
    and position(auth.uid()::text || '/' in name) = 1
  );
