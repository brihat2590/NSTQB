# Contributing to NSTQB

Thank you for your interest in contributing to NSTQB — the Nepal Software Testing Qualifications Board platform. This document outlines the guidelines and workflows to ensure a smooth collaboration experience.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)

- [Issue Reporting](#issue-reporting)
- [Environment & Tooling](#environment--tooling)

---

## Code of Conduct

All contributors are expected to conduct themselves professionally and respectfully. Harassment, offensive comments, and unprofessional behavior of any kind will not be tolerated.

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10
- **Docker** (for local PostgreSQL)
- **PostgreSQL** 16 (if running without Docker)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/NSTQB/Website.git
cd Website

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your local values

# 4. Start the database
docker compose up -d db

# 5. Run database migrations
npx prisma migrate dev

# 6. Start the development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Development Workflow

1. Pick or create an issue describing the change you plan to work on.
2. Create a feature branch from `main` following the [branching strategy](#branching-strategy).
3. Implement your changes, adhering to the [coding standards](#coding-standards).
4. Run linting and type checking before committing:
   ```bash
   pnpm lint
   npx tsc --noEmit
   ```
5. Commit using the [conventional commit](#commit-conventions) format.
6. Push your branch and open a pull request against `main`.
7. Ensure all CI checks pass and address any review feedback.

---

## Branching Strategy

| Branch Type | Pattern | Purpose |
| --- | --- | --- |
| Feature | `feat/description` | New features or enhancements |
| Bug Fix | `fix/description` | Bug fixes |
| Chore | `chore/description` | Tooling, dependencies, config |
| Docs | `docs/description` | Documentation changes |
| Refactor | `refactor/description` | Code restructuring without behavioral changes |

Always branch from an up-to-date `main` and keep branches focused on a single concern.

---

## Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]
```

**Types:**

| Type | Usage |
| --- | --- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `chore` | Maintenance, dependencies, tooling |
| `docs` | Documentation changes |
| `refactor` | Code changes that neither fix a bug nor add a feature |
| `style` | Formatting, whitespace, semicolons (no logic changes) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |

**Examples:**
```
feat(exams): add bulk registration flow
fix(auth): resolve session expiry on token refresh
chore(deps): upgrade prisma to v7.4
```

---

## Pull Request Process

1. Ensure your PR targets the `main` branch and has a descriptive title following commit conventions.
2. Fill out the PR template with:
   - **Summary** — what does this change do?
   - **Motivation** — why is this change needed?
   - **Screenshots** — if applicable (UI changes).
   - **Testing** — how was this verified?
3. Link the relevant issue(s) using GitHub keywords (e.g., `Closes #42`).
4. Request at least one review from a maintainer.
5. Address all review comments before merging.
6. Squash-merge your PR to keep a clean git history.

---



## Issue Reporting

### Bug Reports

When filing a bug report, include:

- **Description** — clear summary of the issue.
- **Steps to Reproduce** — numbered steps to trigger the bug.
- **Expected Behavior** — what should have happened.
- **Actual Behavior** — what actually happened.
- **Environment** — browser, OS, Node version.
- **Screenshots / Logs** — if available.

### Feature Requests

When proposing a feature:

- Describe the problem it solves and the value it adds.
- Provide a clear use case or user story.
- Suggest an implementation approach if you have one.
- Discuss scope and edge cases.

---

## Environment & Tooling

| Tool | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org) | Framework (App Router) |
| [TypeScript](https://www.typescriptlang.org) | Language |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Prisma](https://www.prisma.io) | ORM & migrations |
| [PostgreSQL](https://www.postgresql.org) | Database |
| [shadcn/ui](https://ui.shadcn.com) | UI components |
| [ESLint](https://eslint.org) | Linting |
| [Husky](https://typicode.github.io/husky/) | Git hooks |
| [pnpm](https://pnpm.io) | Package manager |
| [Docker Compose](https://docs.docker.com/compose/) | Local infrastructure |

---

## Support

If you have questions or need help, reach out via:

- [GitHub Issues](https://github.com/NSTQB/Website/issues)
- Email: info@nstqb.org
- [Discord Community](https://discord.gg/xWK3G2RRF)

Thank you for contributing to NSTQB.
