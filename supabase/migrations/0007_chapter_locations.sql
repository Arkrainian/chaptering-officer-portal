create table if not exists public.chapter_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  created_at timestamptz not null default now()
);

alter table public.chapter_locations enable row level security;

create policy "Allow anonymous read access"
  on public.chapter_locations
  for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on public.chapter_locations
  for insert
  to anon
  with check (true);

alter table public.people
  add column if not exists location_id uuid references public.chapter_locations(id) on delete set null;
