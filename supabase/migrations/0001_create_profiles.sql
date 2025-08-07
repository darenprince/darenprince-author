create table profiles (
  id uuid references auth.users not null primary key,
  first_name text,
  last_name text,
  phone text,
  shipping_address text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Individuals can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Individuals can update own profile" on profiles
  for update using (auth.uid() = id);
