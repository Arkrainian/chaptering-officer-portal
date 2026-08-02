create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  created_at timestamptz not null default now()
);

alter table public.people enable row level security;

create policy "Allow anonymous read access"
  on public.people
  for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on public.people
  for insert
  to anon
  with check (true);

alter table public.meeting_digests
  add column if not exists person_id uuid references public.people(id) on delete set null;
