-- Supabase SQL setup: cinematic legacy site
-- Run in Supabase SQL editor. Requires pgcrypto for gen_random_uuid().

create extension if not exists pgcrypto;

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  story_text text,
  media_url text,
  date_occurred date,
  category text
);

create index if not exists memories_date_occurred_idx on public.memories (date_occurred);
create index if not exists memories_category_idx on public.memories (category);

alter table public.memories enable row level security;

-- RLS policies (adjust to your needs)
-- Public read is common for memorial sites; restrict writes to service role / admin UI.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public' and tablename = 'memories' and policyname = 'Public can read memories'
  ) then
    create policy "Public can read memories"
      on public.memories
      for select
      to anon, authenticated
      using (true);
  end if;
end $$;

