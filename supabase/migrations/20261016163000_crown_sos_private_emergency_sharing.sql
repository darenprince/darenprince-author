create extension if not exists pgcrypto;

create table if not exists public.crown_sos_profiles (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb check (jsonb_typeof(profile) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crown_sos_shares (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  location jsonb,
  last_location_at timestamptz,
  constraint crown_sos_share_expiry_check check (expires_at > created_at)
);

create index if not exists crown_sos_shares_owner_created_idx
  on public.crown_sos_shares (owner_id, created_at desc);
create index if not exists crown_sos_shares_active_expiry_idx
  on public.crown_sos_shares (expires_at)
  where revoked_at is null;

alter table public.crown_sos_profiles enable row level security;
alter table public.crown_sos_shares enable row level security;

-- Access is intentionally mediated by the Crown SOS Edge Function.
-- No browser role can directly read emergency records or bearer-token hashes.
revoke all on table public.crown_sos_profiles from anon, authenticated;
revoke all on table public.crown_sos_shares from anon, authenticated;
