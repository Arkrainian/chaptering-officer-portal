drop table if exists public.notes;

alter table public.meeting_digests
  add column if not exists notes text not null default '';
