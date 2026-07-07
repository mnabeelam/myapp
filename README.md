# myapp

**Enterprise lab network operations platform** — monitor, control, and visualize local networks at scale with 3D reports, high security, and commercial multi-tenancy.

## Architecture

```
Next.js 15 (UI + 3D Reports)
        │
NestJS 11 API ── PostgreSQL/TimescaleDB + Redis
        │
Go Agent (LAN) ── ping, WoL, SSH, WinRM
```

## Quick start

```powershell
# 1. Infrastructure
docker compose up -d

# 2. Install dependencies
npm run install:all

# 3. API setup
copy services\api\.env.example services\api\.env
npm run db:migrate --prefix services/api

# 4. Run everything
npm run dev:all
```

| Service | URL |
|---------|-----|
| Web UI | http://localhost:3000 |
| Dashboard | http://localhost:3000/dashboard |
| **Reports 3D** | Dashboard → Reports 3D tab |
| API | http://localhost:4000/api/v1 |
| Swagger | http://localhost:4000/api/docs |

## Features

| Area | Status |
|------|--------|
| Control panel + 3D UI theme | ✅ |
| Git-synced inventory | ✅ |
| NestJS API + Prisma | ✅ Scaffold |
| PostgreSQL + Redis (Docker) | ✅ |
| Go LAN agent | ✅ Skeleton |
| 3D topology reports (R3F) | ✅ |
| Keycloak MFA / SSO | 📋 Phase E2 |
| Multi-tenant commercial | 📋 Phase E4 |

## Documentation

Full enterprise blueprint: [doc/00-index.md](./doc/00-index.md)

| Doc | Topic |
|-----|-------|
| [10-enterprise-architecture.md](./doc/10-enterprise-architecture.md) | Commercial v2 design |
| [11-enterprise-tech-stack.md](./doc/11-enterprise-tech-stack.md) | Latest stable stack |
| [12-security-model.md](./doc/12-security-model.md) | Security controls |
| [13-3d-reporting.md](./doc/13-3d-reporting.md) | 3D report specs |
| [14-build-roadmap.md](./doc/14-build-roadmap.md) | Build phases |

## Commercial tiers

| Tier | Machines | Features |
|------|----------|----------|
| Community | 100 | Monitor, inventory, git sync |
| Pro | 5,000 | 3D reports, alerting, RBAC |
| Enterprise | 50,000+ | SSO, MFA, mTLS, HA, Vault |

## Repo structure

```
myapp/
├── apps/web/           → web/ (Next.js)
├── services/api/       NestJS + Prisma
├── services/agent/     Go network agent
├── inventory/          Git-synced JSON
├── docker-compose.yml  Postgres + Redis
└── doc/                Architecture docs
```
