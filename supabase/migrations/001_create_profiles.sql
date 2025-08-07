create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text,
  full_name text,
  avatar_url text,
  website text,
  updated_at timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "Profiles are viewable by owners" on profiles
  for select using (auth.uid() = id);

create policy "Profiles can be inserted by owners" on profiles
  for insert with check (auth.uid() = id);

create policy "Profiles can be updated by owners" on profiles
  for update using (auth.uid() = id);
