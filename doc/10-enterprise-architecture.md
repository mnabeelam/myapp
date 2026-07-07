# Step 10 — Enterprise Architecture (v2)

Commercial-grade rebuild of **myapp** for heavy network operations, large datasets, and 3D reporting.

---

## 10.1 Vision

Transform the prototype into a **commercial SaaS / on-prem product** that:

- Handles **thousands of machines** and **millions of metric data points**
- Executes **high-volume network operations** (ping, port scan, WoL, routing) safely
- Meets **enterprise security** standards (SOC2-ready patterns)
- Delivers **3D interactive reports** for topology, latency, and capacity
- Supports **multi-tenant licensing** for commercialization

---

## 10.2 Target Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                      │
│   Next.js 15 Web  │  Mobile (future)  │  Public API (partners)      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS / WSS (TLS 1.3)
┌──────────────────────────────▼──────────────────────────────────────┐
│                      EDGE / API GATEWAY                              │
│   Rate limiting │ WAF │ JWT/OIDC │ Tenant routing │ mTLS (agents)   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Core API     │    │  Worker Service │    │  Report Engine  │
│  NestJS 11    │    │  Job processors │    │  3D + analytics │
│  REST + WS    │    │  ping/WoL/SSH   │    │  aggregations   │
└───────┬───────┘    └────────┬────────┘    └────────┬────────┘
        │                     │                      │
        └─────────────────────┼──────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                   │
│  PostgreSQL + TimescaleDB  │  Redis  │  S3/MinIO (exports)         │
│  ClickHouse (Phase 2 analytics at billions of rows)                  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                    LAN AGENTS (Go 1.23)                              │
│  Per-site / per-VLAN │ ICMP │ WoL │ SSH │ WinRM │ SNMP │ mTLS      │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼
                    Lab Network (machines, proxies, routers)
```

---

## 10.3 Monorepo Layout

```
myapp/
├── apps/
│   └── web/                 # Next.js 15 — dashboard, 3D reports UI
├── services/
│   ├── api/                 # NestJS 11 — core API, auth, tenants
│   ├── worker/              # NestJS/BullMQ — async network jobs
│   └── agent/               # Go — LAN data/action plane
├── packages/
│   └── shared/              # Types, constants, API contracts
├── infrastructure/
│   ├── docker/              # Compose, K8s manifests (later)
│   └── migrations/          # DB migrations
├── inventory/               # Git-synced config (dev/small deploys)
└── doc/                     # Architecture documentation
```

---

## 10.4 Scale Targets

| Metric | MVP | Commercial v1 | Enterprise |
|--------|-----|---------------|------------|
| Machines | 100 | 5,000 | 50,000+ |
| Ping checks/min | 200 | 50,000 | 500,000+ |
| Metric retention | 7 days | 90 days | 2+ years |
| Concurrent users | 10 | 500 | 5,000+ |
| API latency (p99) | <500ms | <200ms | <100ms |
| Tenants | 1 | 100 | 1,000+ |

---

## 10.5 Commercialization Model

| Tier | Deployment | Features |
|------|------------|----------|
| **Community** | Self-hosted, single tenant | Monitor, inventory, basic control |
| **Pro** | Self-hosted or cloud | Multi-site, 3D reports, alerting, RBAC |
| **Enterprise** | On-prem / private cloud | SSO, MFA, HA, audit export, SLA, support |

**Billing integration:** Stripe (cloud) or license keys (on-prem).

**Multi-tenancy:** `tenant_id` on every row; row-level security in PostgreSQL.

---

## 10.6 Migration Path (prototype → v2)

| Current | v2 Replacement |
|---------|----------------|
| JSON inventory files | PostgreSQL + optional git sync for IaC |
| Next.js API routes | NestJS Core API |
| Mock ping/status | Go agent + worker queue |
| In-memory audit | Append-only audit table + export |
| Static dashboard | Live WS + TimescaleDB metrics |
| 2D tables only | 3D topology + heatmap reports |

---

**Previous:** [09-next-steps.md](./09-next-steps.md)  
**Next:** [11-enterprise-tech-stack.md](./11-enterprise-tech-stack.md)
