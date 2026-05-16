# Implementation Roadmap: from demo site to real club platform

This document explains how to implement **actual login, actual membership joining, and the rest of the promised features** from the two planning documents.

---

## 1) Product areas and what "done" means

### A. Authentication (actual login)

**Goal:** users can sign up, sign in, sign out, reset password, and stay logged in across refresh.

**Minimum done criteria**
- Email/password auth works.
- Sessions persist.
- Routes can be protected.
- User profiles exist in DB.

### B. Membership joining + committee approval

**Goal:** users submit a join request; committee reviews and approves/rejects with status tracking.

**Minimum done criteria**
- Join form writes to `membership_requests` table.
- Committee sees pending requests.
- Approve action grants `member` role.
- Request status transitions are auditable.

### C. Project lifecycle and archive

**Goal:** support project proposals, active projects, release milestones, observations, and conclusions.

**Minimum done criteria**
- Project records with state (proposed/active/released/archived).
- Release entries (`v1.0.0` etc.) linked to GitHub URL.
- Structured report fields: problem, model, approach, observations, conclusion.

### D. Learning & culture features

**Goal:** track workshops, challenges, mentorship, and peer review.

**Minimum done criteria**
- Session calendar and attendance.
- Challenge creation + submission.
- Peer review assignments and status.

### E. Public visibility

**Goal:** public pages showing current project, archives, and outcomes.

**Minimum done criteria**
- Public archive page from DB.
- Public project detail pages.
- Public "what we have done" summary.

---

## 2) Suggested architecture

- **Frontend:** this React app.
- **Backend:** Supabase (Auth + Postgres + policies).
- **Storage:** Supabase Storage for reports/assets.
- **Automation:** Edge Functions for role-safe actions (approve member, publish report).

Why: low ops overhead, built-in auth, good fit for student club workflows.

---

## 3) Database model (starter)

Create these tables:

1. `profiles`
   - `id uuid pk` (same as `auth.users.id`)
   - `full_name text`
   - `github_handle text`
   - `grade text`
   - `created_at timestamptz`

2. `roles`
   - `user_id uuid`
   - `role text` (`applicant`, `member`, `advisor`, `committee`, `admin`)

3. `membership_requests`
   - `id uuid pk`
   - `user_id uuid`
   - `research_focus text`
   - `motivation text`
   - `status text` (`pending`, `approved`, `rejected`)
   - `reviewed_by uuid null`
   - `reviewed_at timestamptz null`

4. `projects`
   - `id uuid pk`
   - `title text`
   - `status text` (`proposed`, `active`, `released`, `archived`)
   - `github_repo_url text`
   - `created_by uuid`

5. `project_reports`
   - `id uuid pk`
   - `project_id uuid`
   - `version text`
   - `problem_statement text`
   - `math_model text`
   - `simulation_approach text`
   - `observations text`
   - `conclusion text`
   - `published_at timestamptz`

6. `sessions`
   - `id uuid pk`
   - `title text`
   - `session_type text` (`weekly`, `workshop`, `competition`)
   - `starts_at timestamptz`

7. `challenge_submissions`
   - `id uuid pk`
   - `challenge_id uuid`
   - `submitted_by uuid`
   - `repo_url text`
   - `status text`

---

## 4) Security (Row-Level Security)

Enable RLS on all non-public tables.

Policy patterns:
- Users can read/update only their own profile.
- Anyone authenticated can create own membership request.
- Only committee/admin can review membership requests.
- Members can create project proposals.
- Committee/advisor can mark project lifecycle state.
- Public can read only published project reports.

---

## 5) Frontend implementation steps

### Step 1 — Replace fake login

Current `isLoggedIn` local toggle should be replaced with Supabase auth session state.

- Add auth context/provider.
- On app start, load session.
- Use real `signInWithPassword`, `signUp`, `signOut`.
- Guard dashboard route by session.

### Step 2 — Replace "open GitHub issue" join flow

Current join form should:

1. Require auth first.
2. Submit request to `membership_requests`.
3. Show request status badge on dashboard.

### Step 3 — Add committee dashboard

Committee page:
- list pending requests
- approve/reject with notes
- auto-assign role on approve (Edge Function or SQL function)

### Step 4 — Make project list database-driven

- Replace hardcoded `projects` array with table query.
- Keep modal design but bind fields from `project_reports`.
- Show only published reports on public pages.

### Step 5 — Add session/challenge modules

- Session cards + attendance check-in.
- Challenge creation and member submissions.

---

## 6) Shipping plan (6 short milestones)

1. **M1 (Auth):** login/signup/password reset + protected dashboard.
2. **M2 (Join):** authenticated membership request + status tracking.
3. **M3 (Committee):** review queue + approve/reject + role assignment.
4. **M4 (Projects):** DB-driven project + report model and public archive.
5. **M5 (Programs):** sessions/challenges + submission workflow.
6. **M6 (Quality):** audit logs, backups, moderation rules, docs.

---

## 7) Feature mapping to your proposal documents

- "website with ability to visit simulations" → DB-driven project pages + links/embed blocks.
- "archive on documents + conclusions" → `project_reports` public archive.
- "committee approves/declines projects" → role-protected project moderation flow.
- "group collaboration + PR + release" → project release records + GitHub repo fields.
- "weekly/bi-weekly sessions" → `sessions` module and attendance.
- "coding challenges" → `challenges` and `challenge_submissions`.

---

## 8) Practical next move

If you want to implement this quickly, start with only:

- Supabase auth
- `profiles`
- `membership_requests`
- `roles`
- one committee review screen

This gets you **real login + real joining** first, then everything else can be layered on top without redoing architecture.
