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
<<<<<<< ours

```bash
npm install
npm run dev
```
=======

```bash
cp .env.example .env
npm install
npm run dev
```

### Backend setup required for real login/join

- Configure Supabase project values in `.env`.
- Create a `membership_requests` table with columns used by the app:
  `legal_name`, `class_grade`, `github_handle`, `research_focus`, `status`.
- Add Row-Level Security policies allowing authenticated inserts for own requests.
>>>>>>> theirs
