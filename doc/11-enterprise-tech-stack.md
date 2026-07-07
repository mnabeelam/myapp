# Step 11 — Enterprise Tech Stack

Latest **stable** technologies selected for production, security, and scale.

---

## 11.1 Stack Summary

| Layer | Technology | Version | Why |
|-------|------------|---------|-----|
| **Frontend** | Next.js | 15.x | SSR, App Router, stable LTS track |
| **UI** | React | 19.x | Concurrent features, ecosystem |
| **3D Reports** | Three.js + React Three Fiber | r170+ | Industry standard WebGL 3D |
| **API** | NestJS | 11.x | Enterprise modules, guards, DI |
| **ORM** | Prisma | 6.x | Type-safe, migrations, PostgreSQL |
| **Database** | PostgreSQL + TimescaleDB | 16 / 2.x | Relational + time-series at scale |
| **Cache/Queue** | Redis + BullMQ | 7.x | Jobs, pub/sub, rate limits |
| **Agent** | Go | 1.23+ | Single binary, concurrency, ICMP |
| **Auth** | Keycloak (OIDC) | 26.x | SSO, MFA, LDAP/AD federation |
| **Secrets** | HashiCorp Vault | 1.17+ | Credential rotation, encryption |
| **Containers** | Docker Compose → K8s | — | Local dev → production HA |
| **Observability** | OpenTelemetry + Grafana | — | Metrics, traces, SLAs |

---

## 11.2 Frontend — Next.js 15

```
apps/web/
├── app/
│   ├── dashboard/          # Control panel (existing)
│   ├── reports/3d/         # 3D network visualization
│   └── api/                # BFF proxy (dev only → NestJS in prod)
├── components/
│   ├── reports3d/          # R3F scene, nodes, edges
│   └── DynamicBackground.tsx
└── lib/
    └── api-client.ts       # Typed fetch to NestJS
```

**3D libraries:**
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — helpers (OrbitControls, Text, Html)
- `three` — WebGL engine

**Data viz (2D supplement):**
- Recharts for time-series sparklines
- TanStack Query for server state

---

## 11.3 Backend — NestJS 11

```
services/api/
├── src/
│   ├── auth/               # JWT + OIDC guards
│   ├── tenants/            # Multi-tenant isolation
│   ├── machines/           # Inventory CRUD
│   ├── metrics/            # TimescaleDB ingest/query
│   ├── operations/         # WoL, shutdown, gateway (queued)
│   ├── audit/              # Immutable audit log
│   ├── reports/            # 3D report data aggregation
│   └── agents/             # Agent registration, mTLS
├── prisma/
│   └── schema.prisma
└── test/
```

**Key packages:**
- `@nestjs/throttler` — rate limiting
- `helmet` — HTTP security headers
- `@nestjs/bullmq` — job queue
- `class-validator` — input validation
- `@nestjs/passport` + `passport-jwt`

---

## 11.4 Data Layer

### PostgreSQL + TimescaleDB

| Table | Purpose |
|-------|---------|
| `tenants` | Commercial multi-tenancy |
| `users` | RBAC, linked to Keycloak `sub` |
| `machines` | Inventory |
| `ping_metrics` | Hypertable — time-series ping data |
| `audit_events` | Append-only, partitioned by month |
| `agents` | Registered LAN agents |
| `jobs` | Operation job tracking |

### Redis

- BullMQ queues: `ping`, `wol`, `shutdown`, `report-build`
- Session cache, rate limit counters
- WebSocket pub/sub fan-out

### Phase 2: ClickHouse

When metric volume exceeds ~100M rows/month — OLAP for 3D heatmap pre-aggregation.

---

## 11.5 Agent — Go 1.23

```
services/agent/
├── cmd/agent/main.go
├── internal/
│   ├── ping/       # ICMP + TCP
│   ├── wol/        # Magic packet
│   ├── ssh/        # Linux ops
│   ├── winrm/      # Windows ops
│   ├── snmp/       # Device metrics
│   └── api/        # mTLS client to NestJS
└── go.mod
```

**Why Go for agent:** Low memory, static binary, goroutines for 10k parallel pings.

---

## 11.6 Infrastructure

### Local dev — Docker Compose

```yaml
services:
  postgres:    # TimescaleDB image
  redis:
  keycloak:    # Auth (optional dev)
  api:         # NestJS
  worker:      # BullMQ processors
  web:         # Next.js
```

### Production — Kubernetes

- HPA on API and worker pods
- Agent as DaemonSet per site (not in K8s — runs on LAN host)
- Ingress with TLS (cert-manager)
- External Secrets Operator → Vault

---

## 11.7 API Versioning & Contracts

```
/api/v1/machines
/api/v1/metrics/ping?machineId=&from=&to=
/api/v1/operations/wol
/api/v1/reports/topology-3d
/api/v1/reports/latency-heatmap
/ws/v1/events
```

OpenAPI 3.1 spec generated from NestJS Swagger module.

---

**Previous:** [10-enterprise-architecture.md](./10-enterprise-architecture.md)  
**Next:** [12-security-model.md](./12-security-model.md)
