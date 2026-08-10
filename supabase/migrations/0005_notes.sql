create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

alter table public.notes enable row level security;

create policy "Allow anonymous read access"
  on public.notes
  for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on public.notes
  for insert
  to anon
  with check (true);
