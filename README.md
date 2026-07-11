<div align="center">
  <img src="./public/logo.jpg" alt="NSTQB Logo" width="220" />

# NSTQB

**Nepal Software Testing Qualifications Board** — certification, exam scheduling, and registration platform.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](./README.Docker.md)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)

[Live Site](https://nstqb.org) · [GitHub](https://github.com/NSTQB) · [LinkedIn](https://www.linkedin.com/company/nstqb/) · [Facebook](https://www.facebook.com/NSTQB) · [WhatsApp Community](https://chat.whatsapp.com/E91hKG6LannBqKtvaCpzl1)

</div>

---

## Stack

| Layer | Tech |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router) + [React](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Database | [PostgreSQL](https://www.postgresql.org) via [Prisma](https://www.prisma.io) |
| Email | [Nodemailer](https://nodemailer.com) / [Resend](https://resend.com) |
| Payments | Khalti, eSewa, HamroPay |
| Package manager | [pnpm](https://pnpm.io) |
| Containers | [Docker Compose](https://docs.docker.com/compose/) |

## Quickstart

```bash
# 1. Clone and enter the project
git clone https://github.com/NSTQB/Website.git
cd Website

# 2. Install dependencies
npm i

# 3. Copy the env template and fill in your values
cp .env.example .env

# 4. Start Postgres in Docker
docker compose up -d db

# 5. Once the container is up, run the app locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Prefer running the whole stack (app + database) in Docker with one command? See **[README.Docker.md](./README.Docker.md)**.

## Links

- 🌐 Live site — [nstqb.org](https://nstqb.org)
- 🐙 GitHub — [github.com/NSTQB](https://github.com/NSTQB)
- 🐳 Docker guide — [README.Docker.md](./README.Docker.md)
- 💬 WhatsApp community — [Join](https://chat.whatsapp.com/E91hKG6LannBqKtvaCpzl1)
- 💼 LinkedIn — [NSTQB](https://www.linkedin.com/company/nstqb/)
- 📘 Facebook — [NSTQB](https://www.facebook.com/NSTQB)
- 🎓 ISTQB — [istqb.org](https://www.istqb.org)
