create policy "Allow anonymous update access"
  on public.meeting_digests
  for update
  to anon
  using (true)
  with check (true);

create policy "Allow anonymous delete access"
  on public.meeting_digests
  for delete
  to anon
  using (true);
