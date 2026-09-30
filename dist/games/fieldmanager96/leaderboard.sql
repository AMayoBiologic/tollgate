-- Field Manager '96 shared leaderboard (Supabase).
-- Run once in the Supabase SQL Editor. Anyone can read and add scores; nobody can edit or delete them from the game.
create table if not exists public.scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 20),
  score integer not null check (score between 0 and 99999),
  ending text not null default '' check (char_length(ending) <= 40),
  seasons integer check (seasons between 1 and 50),
  created_at timestamptz not null default now()
);
alter table public.scores enable row level security;
create policy "anyone can read scores" on public.scores for select using (true);
create policy "anyone can add a score" on public.scores for insert with check (true);
create index if not exists scores_score_idx on public.scores (score desc);
