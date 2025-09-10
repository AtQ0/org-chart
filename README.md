# Org-Chart (Next.js + Postgres + NextAuth)

A minimal org chart app using Next.js 15, NextAuth (Credentials), and PostgreSQL. The repo includes Docker for local dev and SQL init/seed scripts that auto-provision the DB.

## Tech stack

Next.js (App Router)
NextAuth (credentials provider)
PostgreSQL with SQL bootstrap + seeds
TypeScript, Tailwind, ESLint/Prettier

## Getting started (Docker)

Prereqs: Docker Desktop, Git. Ensure ports 3000 (web) and 5432 (Postgres) are free.

```bash
git clone <your-repo-url> org-chart
cd org-chart
```

1. ### Environment files

   You’ll receive .env and (optionally) .env.local privately from the project owner.
   Copy them into the repo root (same folder as docker-compose.yml).

2. ### Start the stack

```bash
docker compose up -d --build
```

Open: http://localhost:3000

#### Sample login (from seed data)

Email: alex.johnson@example.com
Password: sommar2025

## Running without Docker (optional)

Requires a local Postgres running and a filled .env.local.

```bash
npm ci
npm run dev
# app: http://localhost:3000
```

.env.local should include:

```bash
PGURI=postgres://postgres:<password>@localhost:5432/org_chart_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret>
NODE_ENV=development
```

## Project structure

```bash
/
├─ db/
│  └─ init/
│     ├─ 01_schema.sql      # extensions, tables, triggers (NO 'CREATE DATABASE')
│     └─ 02_seed.sql        # mock/demo inserts (idempotent if possible)
├─ src/
│  ├─ server/
│  │  └─ db.ts              # pg Pool (reads PGURI)
│  └─ app/
│     ├─ api/               # Next.js API routes
│     └─ page.tsx           # landing page
├─ public/                  # static assets (e.g., /images/…)
├─ docker-compose.yml
├─ Dockerfile
├─ .env.example
└─ .env.local.example
```

## Environment variables

.env → used by Docker Compose (containers)
.env.local → used when running Next.js on your host (optional)

Inside Docker the app gets PGURI from Compose (host db:5432).
Outside Docker set PGURI to …@localhost:5432… in .env.local.

## API endpoints

GET /api/roles
GET /api/teams
GET /api/titles
GET /api/users
NextAuth: GET/POST /api/auth/[...nextauth]

## Database notes

Files in db/init/ run once on first startup (new Docker volume).

To wipe & reseed:

```bash
docker compose down -v   # DANGER: deletes DB data
docker compose up -d
```
