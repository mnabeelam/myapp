# Step 5 — Tech Stack

Recommended technologies for each layer of the LabOps platform.

---

## 5.1 Stack Overview

| Layer | Primary Choice | Alternative |
|-------|----------------|-------------|
| Frontend | React + Next.js | Vue 3 + Nuxt |
| Backend API | FastAPI (Python) | Fastify (Node.js) |
| Database | PostgreSQL | — |
| Cache / Queue | Redis + Celery | Redis + BullMQ |
| Central Agent | Go | Python |
| Auth | Authentik / Keycloak | Local LDAP/AD |
| Deployment | Docker Compose | Kubernetes (later) |

---

## 5.2 Frontend

### React + Next.js

**Why:**

- Server-side rendering for fast dashboard load
- Large ecosystem for charts (Recharts, Chart.js)
- WebSocket client libraries well supported
- Easy to add real-time status components

### Key Libraries

| Library | Purpose |
|---------|---------|
| TanStack Query | API data fetching and caching |
| Recharts / Chart.js | Latency and uptime charts |
| shadcn/ui or Radix | Accessible UI components |
| Socket.io client | Real-time status updates |
| React Hook Form + Zod | Forms and validation |

### UI Sections

- Machines table with status indicators
- Proxy panel
- Alerts inbox
- Audit log viewer
- Settings and inventory management

---

## 5.3 Backend API

### FastAPI (Python)

**Why:**

- Fast to develop; excellent for internal tools
- Native async for concurrent ping/port checks
- Strong typing with Pydantic
- Easy SSH/WinRM libraries (paramiko, pywinrm)
- Good Celery integration for job queues

### API Structure

```
/api/v1/
  /auth          — login, logout, token refresh
  /machines      — CRUD, status, actions (wol, shutdown)
  /proxies       — status, config, restart
  /gateways      — profiles, apply, rollback
  /alerts        — list, acknowledge
  /audit         — query audit log
  /inventory     — bulk import, tags
  /ws            — WebSocket for live updates
```

### Alternative: Fastify (Node.js)

Choose if your team is stronger in TypeScript. Use `node-ping`, `ssh2`, and BullMQ.

---

## 5.4 Database — PostgreSQL

### Core Tables (conceptual)

```sql
-- Inventory
machines (id, hostname, ip, mac, os, role, tags, capabilities, created_at)
subnets  (id, cidr, vlan, description)

-- Monitoring
ping_results   (machine_id, timestamp, latency_ms, packet_loss, status)
port_checks    (machine_id, port, timestamp, status)
metrics        (machine_id, metric_name, value, timestamp)

-- Operations
audit_log      (id, user_id, action, target, details, timestamp)
alerts         (id, machine_id, type, message, acknowledged, created_at)
scheduled_jobs (id, type, cron, payload, enabled)

-- Config
gateway_profiles (id, name, gateway_ip, dns_servers, routes_json)
proxy_configs    (id, proxy_id, config_text, version, deployed_at)

-- Auth
users (id, username, role, created_at)
```

### Why PostgreSQL

- JSON columns for flexible capability/config storage
- Strong audit and time-series query support
- Mature backup and replication if HA needed later

---

## 5.5 Cache & Job Queue — Redis

| Use | Implementation |
|-----|----------------|
| Ping job queue | Celery beat + worker (every 30s) |
| Status cache | Redis key per machine: `status:{id}` |
| Rate limiting | Redis counter for action throttling |
| WebSocket fan-out | Redis pub/sub → API → clients |

---

## 5.6 Central Agent — Go

**Why Go for the agent:**

- Single static binary — easy to deploy on lab hosts
- Excellent concurrency for parallel ping checks
- Low memory footprint
- Cross-compile for Windows/Linux

### Agent Responsibilities

```
labops-agent/
  ├── ping/       — ICMP and TCP checks
  ├── wol/        — Wake-on-LAN magic packet
  ├── ssh/        — Linux remote commands
  ├── winrm/      — Windows remote commands
  ├── proxy/      — Proxy health and config fetch
  ├── router/     — Vendor-specific adapters
  └── api/        — gRPC or HTTP client to control plane
```

### Alternative: Python Agent

Faster to prototype; use same language as API. Package with PyInstaller.

---

## 5.7 Authentication

### Options

| Option | Best For |
|--------|----------|
| **Authentik / Keycloak** | SSO, LDAP/AD integration, MFA |
| **Local JWT auth** | Small team, quick start |
| **LDAP/AD direct** | Existing domain infrastructure |

### RBAC Roles

| Role | Permissions |
|------|-----------|
| `viewer` | Read status, alerts, audit |
| `operator` | viewer + WoL, proxy restart, acknowledge alerts |
| `admin` | operator + shutdown, gateway change, config deploy, user mgmt |

---

## 5.8 Deployment

### Phase 1–4: Docker Compose

```yaml
services:
  api:        # FastAPI backend
  web:        # Next.js frontend
  postgres:   # Database
  redis:      # Cache + queue
  celery:     # Job worker
  agent:      # Central network agent (host network mode)
```

**Agent note:** Run with `network_mode: host` so it can send WoL broadcasts and ICMP on the LAN.

### Phase 5+: Kubernetes (optional)

Only if you have multiple sites or need orchestrated agent deployments.

---

## 5.9 Monorepo Structure

```
myapp/
├── doc/                  # This documentation
├── apps/
│   ├── web/              # Next.js dashboard
│   └── api/              # FastAPI backend
├── packages/
│   └── shared/           # Shared types, constants
├── agent/                # Go central agent
├── docker-compose.yml
└── README.md
```

---

**Previous:** [Step 4 — Challenges](./04-challenges.md)  
**Next:** [Step 6 — Development Phases](./06-development-phases.md)
