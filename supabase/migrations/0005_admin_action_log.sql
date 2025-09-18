begin;

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
