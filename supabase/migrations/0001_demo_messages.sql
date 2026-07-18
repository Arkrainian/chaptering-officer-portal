-- Demo table used by the database read/write demonstration.
-- TODO: replace/extend with real domain tables (officers, cases, etc.)
-- as the Chaptering Officer Portal grows.
create table if not exists public.demo_messages (
  id uuid primary key default gen_random_uuid(),
  message text not null check (char_length(trim(message)) > 0),
  created_at timestamptz not null default now()
);

alter table public.demo_messages enable row level security;

-- Demo-only policies: open read/insert access for the anon key so the
-- prototype works without authentication. TODO: tighten these once
-- Supabase Auth + role-based permissions are introduced.
create policy "Allow anonymous read access"
  on public.demo_messages
  for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on public.demo_messages
  for insert
  to anon
  with check (true);
