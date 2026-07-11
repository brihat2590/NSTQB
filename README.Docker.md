# Running this project with Docker (beginner guide)

This guide walks you through running the whole app — the Next.js website **and**
a Postgres database — with a single command, using Docker Compose. You don't
need Node.js, pnpm, or Postgres installed on your machine; Docker handles all
of it inside containers.

## 1. Install Docker

Install **Docker Desktop** for your OS:

- Windows/Mac: https://www.docker.com/products/docker-desktop/
- Linux: https://docs.docker.com/engine/install/

Once installed, confirm it works:

```bash
docker --version
docker compose version
```

## 2. Get the project and set up your environment file

```bash
git clone https://github.com/NSTQB/Website.git
cd Website
cp .env.example .env
```

Open the new `.env` file and fill in any values you have (payment keys, email
credentials, etc.). The defaults for `DATABASE_URL`, `POSTGRES_USER`,
`POSTGRES_PASSWORD`, and `POSTGRES_DB` already work out of the box for local
development — you don't need to touch them just to get the site running.

## 3. Start everything with one command

```bash
docker compose up --build
```

This single command will:

1. Build the Next.js app image (installs dependencies, generates the Prisma
   client, builds the app).
2. Start a local Postgres 16 database in its own container and wait until
   it's healthy.
3. Run any pending Prisma migrations against that database.
4. Start the Next.js app.

When you see something like `Ready in ...ms` in the logs, open:

http://localhost:3000

## 4. Stopping the app

Press `Ctrl+C` in the terminal, then run:

```bash
docker compose down
```

Your database data is kept between restarts in a Docker volume named
`postgres_data`. To wipe it and start completely fresh (empty database):

```bash
docker compose down -v
```

## 5. Everyday commands

| What you want to do                       | Command                              |
| ------------------------------------------ | ------------------------------------- |
| Start the app (rebuild if code changed)    | `docker compose up --build`           |
| Start the app (no rebuild)                 | `docker compose up`                   |
| Start it in the background                 | `docker compose up -d`                |
| View logs (when running in the background) | `docker compose logs -f`              |
| Stop the app                               | `docker compose down`                 |
| Stop the app and delete database data      | `docker compose down -v`              |
| Open a shell inside the app container      | `docker compose exec web sh`          |
| Open a psql shell inside the database      | `docker compose exec db psql -U myuser -d mydatabase` |

## Troubleshooting

- **Port already in use (3000 or 5432)** — Something else on your machine is
  already using that port. Stop it, or edit `compose.yaml` and change the left
  side of the port mapping, e.g. `"3001:3000"`.
- **Changed the Prisma schema?** Create a migration on your machine first
  (`pnpm exec prisma migrate dev`), commit the new file in
  `prisma/migrations`, then re-run `docker compose up --build` — the
  container applies migrations automatically on startup.
- **Want a totally clean slate?** `docker compose down -v` removes the
  database volume; the next `docker compose up --build` starts from an empty
  database and re-applies every migration.

## Deploying to the cloud

The `db` service in `compose.yaml` is meant for local development only. In
production, point `DATABASE_URL` at your real hosted Postgres instance
instead (e.g. Neon, RDS, Supabase) via your hosting provider's environment
variables — don't reuse the local `db` container for production data.

To build just the app image for pushing to a registry:

```bash
docker build -t myapp .
# If your build machine's CPU architecture differs from your cloud provider's:
docker build --platform=linux/amd64 -t myapp .
docker push myregistry.com/myapp
```
