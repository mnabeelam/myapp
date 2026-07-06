# Step 6 — Development Phases

Step-by-step build plan. Complete each phase before moving to the next.

---

## Phase Overview

| Phase | Focus | Duration | Deliverable |
|-------|-------|----------|-------------|
| **1** | Foundation | 2–4 weeks | "Is my lab up?" dashboard |
| **2** | Power control | 2–3 weeks | Wake and shutdown from UI |
| **3** | Proxy visibility | 2 weeks | Proxy status and safe restart |
| **4** | Gateway & routing | 3–4 weeks | Controlled gateway changes |
| **5** | Enterprise polish | Ongoing | Alerts, topology, runbooks |

---

## Phase 1 — Foundation

**Goal:** Inventory, ping monitoring, auth, and audit skeleton.

### Step 1.1 — Project Scaffold

- [ ] Initialize monorepo (`apps/web`, `apps/api`, `agent/`)
- [ ] Docker Compose for local development
- [ ] PostgreSQL schema for machines, ping_results, users, audit_log
- [ ] Basic FastAPI project with health endpoint
- [ ] Basic Next.js dashboard shell

### Step 1.2 — Inventory Model

- [ ] `machines` table: hostname, IP, MAC, OS, role, tags, capabilities
- [ ] CRUD API for machines
- [ ] Manual add + CSV bulk import
- [ ] Inventory list page in dashboard

### Step 1.3 — Central Agent (Ping)

- [ ] Go agent binary with ICMP ping
- [ ] Agent registers with API on startup
- [ ] Celery job: enqueue ping for all machines every 30s
- [ ] Agent executes ping, returns latency + status
- [ ] Results stored in `ping_results`

### Step 1.4 — Dashboard — Machine Status

- [ ] Machines table: hostname, IP, status (UP/DOWN), latency
- [ ] Color-coded status indicators
- [ ] Latency sparkline or last-check timestamp
- [ ] WebSocket push on status change

### Step 1.5 — Auth + RBAC

- [ ] User login (JWT or Authentik)
- [ ] Roles: viewer, operator, admin
- [ ] Protect API endpoints by role
- [ ] Login page in dashboard

### Step 1.6 — Audit Log Skeleton

- [ ] `audit_log` table
- [ ] Middleware logs all API mutations
- [ ] Audit log viewer page (admin only)

### Phase 1 Deliverable

> Dashboard showing all lab machines with live ping status, uptime history, and role-based access.

---

## Phase 2 — Power Control

**Goal:** Wake-on-LAN and graceful shutdown with full audit.

### Step 2.1 — Wake-on-LAN

- [ ] Agent: send UDP magic packet to MAC address
- [ ] API endpoint: `POST /machines/{id}/wol`
- [ ] RBAC: operator+ only
- [ ] Audit log entry on every WoL
- [ ] UI: WoL button per machine (enabled when MAC is set)
- [ ] Handle cross-subnet: document relay requirement; add relay config if needed

### Step 2.2 — Graceful Shutdown — Linux

- [ ] Agent: SSH to machine, run `sudo shutdown -h now`
- [ ] Pre-requisite: SSH key deployed on target machines
- [ ] API endpoint: `POST /machines/{id}/shutdown`
- [ ] Confirmation dialog in UI
- [ ] Audit log entry

### Step 2.3 — Graceful Shutdown — Windows

- [ ] Agent: WinRM `Stop-Computer -Force`
- [ ] Pre-requisite: WinRM enabled on target machines
- [ ] Same API endpoint (OS detected from inventory)
- [ ] Same confirmation + audit flow

### Step 2.4 — Power Action Safety

- [ ] Confirmation modal: "Are you sure you want to shut down lab-pc-01?"
- [ ] Rate limit: max N shutdowns per hour per user
- [ ] Status refresh after action (expect DOWN within 60s)

### Phase 2 Deliverable

> Wake and shut down machines from the UI with confirmation and full audit trail.

---

## Phase 3 — Proxy Visibility

**Goal:** Proxy health monitoring and safe restart.

### Step 3.1 — Proxy Inventory

- [ ] `proxies` table: hostname, IP, port, type (squid/nginx/haproxy)
- [ ] CRUD API and dashboard page
- [ ] Link proxies to machines or standalone entries

### Step 3.2 — Proxy Health Checks

- [ ] Agent: TCP connect to proxy port
- [ ] Agent: HTTP request through proxy (verify it forwards)
- [ ] Scheduled check every 60s
- [ ] Status on dashboard: UP / DOWN / DEGRADED

### Step 3.3 — Read-Only Config Display

- [ ] Agent: SSH cat config file (e.g. `/etc/squid/squid.conf`)
- [ ] API endpoint: `GET /proxies/{id}/config`
- [ ] UI: view current config (read-only)

### Step 3.4 — Safe Restart

- [ ] API endpoint: `POST /proxies/{id}/restart`
- [ ] RBAC: operator+ only
- [ ] Confirmation dialog
- [ ] Audit log entry
- [ ] Health check after restart to confirm recovery

### Phase 3 Deliverable

> Proxy status panel with health checks and approved restart workflow.

---

## Phase 4 — Gateway & Routing

**Goal:** Controlled gateway changes with rollback.

### Step 4.1 — Gateway Profiles

- [ ] `gateway_profiles` table: name, gateway_ip, dns_servers, routes
- [ ] CRUD API and UI for managing profiles
- [ ] Assign profile to machine(s)

### Step 4.2 — Dry-Run Preview

- [ ] API endpoint: `POST /machines/{id}/gateway/preview`
- [ ] Returns: current config vs proposed config diff
- [ ] UI shows diff before apply

### Step 4.3 — Apply Gateway — Linux

- [ ] Agent: SSH script to update `/etc/netplan/` or `ip route`
- [ ] Generate rollback script before apply
- [ ] API endpoint: `POST /machines/{id}/gateway/apply`
- [ ] Confirmation + audit

### Step 4.4 — Apply Gateway — Windows

- [ ] Agent: WinRM to set static IP and gateway
- [ ] Same preview / apply / rollback flow

### Step 4.5 — Router Integration (Optional)

- [ ] Adapter for your router vendor (MikroTik API, etc.)
- [ ] Push DHCP reservation or static route at router level
- [ ] Document which method applies to which machines

### Step 4.6 — Rollback

- [ ] API endpoint: `POST /machines/{id}/gateway/rollback`
- [ ] Executes stored rollback script
- [ ] Automatic rollback if agent loses contact within timeout

### Phase 4 Deliverable

> Controlled gateway changes with preview, confirmation, audit, and rollback.

---

## Phase 5 — Enterprise Polish (Ongoing)

### Step 5.1 — Alerting

- [ ] Alert rules: machine down > N minutes, latency > threshold
- [ ] Notification channels: email, Slack webhook, generic webhook
- [ ] Alert inbox in dashboard with acknowledge

### Step 5.2 — Topology View

- [ ] Subnet and VLAN map
- [ ] Machine grouping by subnet/role
- [ ] Visual dependency lines (optional)

### Step 5.3 — Runbooks

- [ ] Define multi-step workflows (e.g. "Reset Lab 3")
- [ ] One-click execute with step-by-step progress
- [ ] Audit each step

### Step 5.4 — SNMP / Agent Metrics

- [ ] SNMP polling for supported devices
- [ ] Per-machine agent for heartbeat and process metrics
- [ ] Metrics dashboard (CPU, memory, disk)

### Step 5.5 — Config Drift Detection

- [ ] Store expected config per machine/proxy
- [ ] Periodic diff: expected vs live
- [ ] Alert on drift

### Step 5.6 — Multi-VLAN Agents

- [ ] Deploy agent per VLAN
- [ ] Agent registration and health in dashboard
- [ ] Route actions to correct agent by subnet

---

## Phase Dependency Graph

```
Phase 1 (Foundation)
    │
    ▼
Phase 2 (Power) ──────────────────┐
    │                             │
    ▼                             ▼
Phase 3 (Proxy)              Phase 4 (Gateway)
    │                             │
    └──────────┬──────────────────┘
               ▼
         Phase 5 (Polish)
```

Phases 3 and 4 can run in parallel after Phase 2.

---

**Previous:** [Step 5 — Tech Stack](./05-tech-stack.md)  
**Next:** [Step 7 — Design Decisions](./07-design-decisions.md)
