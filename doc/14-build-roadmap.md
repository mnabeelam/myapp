# Step 14 — Enterprise Build Roadmap

Phased plan to rebuild myapp as a commercial, high-security, high-load platform.

---

## Phase E1 — Foundation (Weeks 1–4) ← START HERE

- [x] Prototype UI (Next.js dashboard)
- [x] Git-synced inventory
- [ ] Docker Compose (Postgres, Redis, TimescaleDB)
- [ ] NestJS API scaffold + Prisma schema
- [ ] Migrate machines from JSON → PostgreSQL
- [ ] JWT auth + RBAC guards
- [ ] Go agent skeleton (ping only)

**Deliverable:** Real ping data from agent → DB → dashboard.

---

## Phase E2 — Operations & Queue (Weeks 5–8)

- [ ] BullMQ job workers (ping scheduler, WoL, shutdown)
- [ ] WebSocket live status
- [ ] Immutable audit log
- [ ] Keycloak OIDC integration
- [ ] Rate limiting + Helmet security

**Deliverable:** Production-safe power operations with audit.

---

## Phase E3 — 3D Reports (Weeks 9–11)

- [ ] `/dashboard/reports` — React Three Fiber scene
- [ ] Topology 3D API endpoint
- [ ] Latency heatmap visualization
- [ ] Click-to-detail side panel
- [ ] Export PNG

**Deliverable:** Interactive 3D network report.

---

## Phase E4 — Scale & Multi-Tenant (Weeks 12–16)

- [ ] Tenant isolation (row-level security)
- [ ] Horizontal API scaling (stateless + Redis)
- [ ] TimescaleDB retention policies
- [ ] Agent mTLS
- [ ] Load test: 5,000 machines, 50k pings/min

**Deliverable:** Commercial Pro tier ready.

---

## Phase E5 — Commercialization (Weeks 17–20)

- [ ] Stripe billing / license keys
- [ ] Tenant onboarding flow
- [ ] HA deployment (K8s manifests)
- [ ] Vault secrets integration
- [ ] SOC2 documentation pack
- [ ] Admin portal (tenant management)

**Deliverable:** Enterprise sellable product.

---

## What Exists Today

| Component | Status |
|-----------|--------|
| Next.js 15 UI + 3D theme | ✅ Done |
| JSON inventory + git sync | ✅ Done |
| NestJS API | 🔲 Scaffolded |
| PostgreSQL | 🔲 Docker ready |
| Go agent | 🔲 Skeleton |
| 3D Reports page | 🔲 Building |
| Keycloak / Vault | 📋 Documented |

---

## Run Enterprise Stack Locally

```powershell
cd "e:\Nabeel Data\myapp"
docker compose up -d          # Postgres + Redis
npm run install:all
npm run dev:api               # NestJS on :4000
npm run dev                   # Next.js on :3000
```

---

**Previous:** [13-3d-reporting.md](./13-3d-reporting.md)  
**Back to index:** [00-index.md](./00-index.md)
