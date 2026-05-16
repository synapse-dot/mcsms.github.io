# Simulation & Modeling Society Platform

This repository contains the public website for the Simulation & Modeling Society.

## Current status

The current frontend is a static/demo experience. A few flows are currently mocked:

- "Sign In" only toggles local React state.
- "Join" opens a prefilled GitHub issue.
- "Dashboard" is static content.

## How to add real product features

See [`docs/implementation-roadmap.md`](docs/implementation-roadmap.md) for a full production blueprint that maps directly to the club proposals:

- real login & role-based access
- actual membership joining/approval
- project archive with observations/conclusions
- workshop/session scheduling
- challenge & submission workflows
- committee review and moderation
- public visibility pages

## Recommended stack

- Frontend: React + Vite (already present)
- Auth + DB + storage: Supabase (Postgres + Row-Level Security)
- Optional server workflows: Supabase Edge Functions
- Deployment: Vercel or Netlify (frontend) + Supabase (backend)

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

### Backend setup required for real login/join

- Configure Supabase project values in `.env`.
- Create a `membership_requests` table with columns used by the app:
  `user_id`, `legal_name`, `class_grade`, `github_handle`, `research_focus`, `status`.
- Add Row-Level Security policies allowing authenticated inserts for own requests (`auth.uid() = user_id`).

Example SQL:

```sql
create table if not exists public.membership_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  legal_name text not null,
  class_grade text not null,
  github_handle text not null,
  research_focus text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

alter table public.membership_requests enable row level security;

create policy "insert own membership request"
on public.membership_requests
for insert
to authenticated
with check (auth.uid() = user_id);
```

> Note: this repository uses Vite + React (not Next.js), so Next.js-specific files like `middleware.ts`/`page.tsx` are not used here.
