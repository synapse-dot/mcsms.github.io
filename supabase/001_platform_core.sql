-- Core schema for moving SMS platform from demo-state to database-driven state.

create extension if not exists pgcrypto;

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('member','committee')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  desc text not null,
  status text not null check (status in ('stable','research')),
  version text not null default '1.0.0',
  problem_statement text not null,
  math_model text not null,
  simulation_approach text not null,
  observations text not null,
  conclusion text not null,
  github_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.project_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  report_url text,
  summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  agenda text,
  session_date timestamptz not null,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists public.challenge_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_name text not null,
  repo_url text not null,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, challenge_name)
);

-- Enable RLS
alter table public.user_roles enable row level security;
alter table public.projects enable row level security;
alter table public.project_reports enable row level security;
alter table public.sessions enable row level security;
alter table public.challenge_submissions enable row level security;

-- Policies for user_roles
create policy "Users can read own role" on public.user_roles
for select to authenticated using (auth.uid() = user_id);

create policy "Committee can read all roles" on public.user_roles
for select to authenticated
using (exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'committee'));

-- Public read access for archive content.
create policy if not exists "projects public read" on public.projects
for select to anon, authenticated using (true);

create policy if not exists "project_reports public read" on public.project_reports
for select to anon, authenticated using (true);

create policy if not exists "sessions public read" on public.sessions
for select to anon, authenticated using (true);

-- Authenticated members can submit and view their own challenge submissions.
create policy if not exists "submissions own read" on public.challenge_submissions
for select to authenticated using (auth.uid() = user_id);

create policy if not exists "submissions own insert" on public.challenge_submissions
for insert to authenticated with check (auth.uid() = user_id);

create policy if not exists "submissions own update" on public.challenge_submissions
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Committee read access for all challenge submissions.
create policy if not exists "committee read submissions" on public.challenge_submissions
for select to authenticated
using (exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'committee'));

-- Grants
grant usage on schema public to anon, authenticated;
grant select on public.projects, public.project_reports, public.sessions to anon, authenticated;
grant select, insert, update on public.challenge_submissions to authenticated;
grant select on public.user_roles to authenticated;

create index if not exists idx_sessions_session_date on public.sessions(session_date);
create index if not exists idx_challenge_submissions_user_id on public.challenge_submissions(user_id);
create index if not exists idx_project_reports_project_id on public.project_reports(project_id);
