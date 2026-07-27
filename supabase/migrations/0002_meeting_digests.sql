create table if not exists public.meeting_digests (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  transcript text not null check (char_length(trim(transcript)) > 0),
  overview text not null default '',
  decisions text[] not null default '{}',
  action_items jsonb not null default '[]',
  key_points text[] not null default '{}',
  open_questions text[] not null default '{}',
  attendees text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.meeting_digests enable row level security;

create policy "Allow anonymous read access"
  on public.meeting_digests
  for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on public.meeting_digests
  for insert
  to anon
  with check (true);
