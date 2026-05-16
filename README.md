# Simulation & Modeling Society Platform

This repository contains the public website for the Simulation & Modeling Society.

## Current status

The current frontend now supports:

- Supabase email/password sign in + sign up
- Session token persistence in browser localStorage
- Membership request submit to Supabase membership_requests

Still pending:

- committee review UI (approve/reject)
- role-based dashboard data
- DB-driven projects archive

## How to add real product features

See [docs/implementation-roadmap.md](docs/implementation-roadmap.md) for a full production blueprint that maps directly to the club proposals:

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

- Configure Supabase project values in .env.
- Create a membership_requests table with columns used by the app:
  user_id, legal_name, class_grade, github_handle, research_focus, status.
- Add Row-Level Security policies allowing authenticated inserts for own requests (auth.uid() = user_id).

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

> Note: this repository uses Vite + React (not Next.js), so Next.js-specific files like middleware.ts/page.tsx are not used here.

## GitHub Pages + Supabase: production setup

Yes — this app can work on GitHub Pages with sign-in and join submission.

### 1) Add Supabase env vars as GitHub Actions secrets

In GitHub repo settings, add:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

The anon key is safe for frontend use (RLS must protect data).

### 2) Add your GitHub Pages URL in Supabase Auth settings

Supabase Dashboard → Authentication → URL Configuration:

- Site URL: https://<your-username>.github.io/mcsms.github.io/
- Additional redirect URLs:
  - http://localhost:5173
  - https://<your-username>.github.io/mcsms.github.io/

Without this, hosted sign-in can fail due to redirect/CORS restrictions.

### 3) Keep Vite base path

This repo already has:

- base: '/mcsms.github.io/'

which is required for GitHub Pages project-site hosting.

### 4) Deploy

Use:

```bash
npm run deploy
```

This runs predeploy (build) then publishes dist/ via gh-pages.

### 5) Verify in production

- open the GitHub Pages URL
- sign up/sign in
- submit membership form
- confirm row appears in Supabase table
