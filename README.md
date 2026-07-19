# Chaptering Officer Portal (Prototype)

An early-stage starter application for the future Chaptering Officer Portal. This
build is **not** the final product — it proves out the architecture: a React
frontend talking to a live Supabase database, with a folder structure designed
to grow into the full portal.

## What this demo proves

1. The website loads.
2. The frontend is connected to a real database (Supabase).
3. Data can be read from and written to that database.
4. The codebase is organized in a way that scales to a much larger application.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Supabase](https://supabase.com/) (Postgres + auto-generated REST API) for the database
- [React Router](https://reactrouter.com/) for client-side routing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for linting/formatting

## Folder structure

```
src/
  components/
    layout/     Header, Footer, NavBar, Logo
    auth/       AuthProvider, ProtectedRoute (placeholders, see Authentication below)
    ui/         Reusable primitives (Button, Card, Input, PageHeading, ...)
  pages/        One file per route (Home, Dashboard, Officers, Login)
  layouts/      AppLayout (header/nav/footer shell shared by every page)
  hooks/        useAuth, useMessages (data-fetching hooks that wrap the service layer)
  services/
    supabase/   client.ts (Supabase client) + messageService.ts (all DB queries live here)
  lib/          Small framework-agnostic helpers (e.g. cn for class names)
  types/        Shared TypeScript types, including database row types
  utils/        General-purpose utilities (currently empty — extension point)
  assets/       Static assets bundled by Vite

supabase/
  migrations/   SQL migrations for the Supabase database schema

public/         Static files served as-is
```

Components never call Supabase directly — all database logic lives in
`src/services/supabase/`, so it's easy to swap or extend later without
touching UI code.

## Installation

```bash
npm install
```

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project's values
(Project Settings → API in the Supabase dashboard):

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

`.env` is git-ignored — never commit real credentials. The app still loads
without these set.

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the migration in
   [`supabase/migrations/0001_demo_messages.sql`](supabase/migrations/0001_demo_messages.sql)
   to create the `demo_messages` table (or apply it with the Supabase CLI:
   `supabase db push`).
3. Copy the Project URL and anon public key into `.env` as described above.

## Running locally

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build          # type-check + production build
npm run preview        # preview the production build locally
npm run lint           # ESLint
npm run format          # Prettier (writes changes)
npm run format:check    # Prettier (check only)
```

## Authentication (not yet implemented)

Full auth is intentionally out of scope for this prototype. The scaffolding
is in place so it can be added without restructuring:

- [`src/components/auth/AuthProvider.tsx`](src/components/auth/AuthProvider.tsx) — holds auth state; `TODO(auth)` comments mark where `supabase.auth.*` calls will go.
- [`src/components/auth/ProtectedRoute.tsx`](src/components/auth/ProtectedRoute.tsx) — route guard, ready to wrap pages once real auth exists.
- [`src/pages/Login.tsx`](src/pages/Login.tsx) — placeholder sign-in form (does not call Supabase yet).

Dashboard/Officers are currently open (not wrapped in `ProtectedRoute`) so
the whole app can be demoed without signing in.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel usually detects these automatically).
4. Add the environment variables under Project Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy, then verify the live URL loads.

## Future roadmap

This prototype leaves clear extension points (see `TODO` comments in the
code) for:

- Full Supabase Auth (email/password, magic link, or SSO)
- Role-based permissions (officer vs. admin)
- Case management (list, detail, workflow status)
- Officer directory and assignment history
- File uploads attached to cases
- Audit logs
- Notifications
- Search and filtering
- Reporting and dashboard analytics

None of these are built yet — the goal of this prototype is a clean,
typed, modular foundation they can be added to.
