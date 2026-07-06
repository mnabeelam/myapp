# Step 3 — Architecture

Recommended system design for the LabOps platform.

---

## 3.1 High-Level Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTS                               │
│  ┌──────────────┐         ┌──────────────────┐          │
│  │ Web Dashboard│ ◄─────► │ REST / WebSocket │          │
│  └──────────────┘         │       API        │          │
│                           └────────┬─────────┘          │
└────────────────────────────────────┼────────────────────┘
                                     │
┌────────────────────────────────────┼────────────────────┐
│                    CONTROL PLANE   │                     │
│  ┌─────────┐  ┌───────────┐  ┌────▼────┐  ┌─────────┐  │
│  │  Auth   │  │ Scheduler │  │   DB    │  │  Redis  │  │
│  │ + RBAC  │  │  (jobs)   │  │(Postgres)│  │ (cache) │  │
│  └─────────┘  └─────┬─────┘  └─────────┘  └─────────┘  │
└─────────────────────┼───────────────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────────────┐
│              DATA / ACTION PLANE                        │
│  ┌──────────────────▼──────────────────┐                │
│  │      Central Network Agent          │                │
│  │  (ICMP, WoL, SSH, WinRM, router API)│                │
│  └──────────────┬──────────────────────┘                │
│                 │                                        │
│  ┌──────────────▼──────────────┐  (optional)          │
│  │   Per-Machine Agents        │                        │
│  └──────────────┬──────────────┘                        │
└─────────────────┼───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                  LOCAL LAB NETWORK                       │
│  Lab Machines │ Proxy Servers │ Routers │ PDUs / BMC    │
└─────────────────────────────────────────────────────────┘
```

---

## 3.2 Component Responsibilities

### Web Dashboard (Frontend)

- Machine list with live status
- Latency charts and uptime history
- Action buttons (WoL, shutdown, proxy restart)
- Alert inbox and audit log viewer
- Settings and inventory management

### API (Backend)

- REST endpoints for CRUD and actions
- WebSocket for real-time status updates
- Job queue integration for scheduled checks
- Authentication and authorization enforcement
- Audit log writes on every action

### Central Network Agent

**Must run on a trusted host inside the lab LAN.**

| Task | Protocol / Method |
|------|-------------------|
| Ping / ICMP | Native OS ping or raw sockets |
| TCP port check | Socket connect |
| Wake-on-LAN | UDP magic packet to MAC |
| Linux shutdown | SSH + sudo |
| Windows shutdown | WinRM / PowerShell remoting |
| Proxy health | HTTP request through proxy |
| Router config | Vendor API or SSH CLI |
| BMC power | IPMI / Redfish |

### Optional Per-Machine Agents

Use when:

- ICMP is blocked by firewall
- You need process-level metrics
- You want heartbeat without opening SSH to central agent

Lightweight binary (Go or Python) reporting to central API.

### Database (PostgreSQL)

| Data | Tables (conceptual) |
|------|---------------------|
| Inventory | machines, subnets, tags, capabilities |
| Monitoring | ping_results, port_checks, metrics |
| Operations | audit_log, scheduled_jobs, alerts |
| Config | proxy_configs, gateway_profiles, users/roles |

### Cache / Queue (Redis)

- Scheduled ping job queue
- Real-time status cache
- Rate limiting for actions
- Pub/sub for WebSocket fan-out

---

## 3.3 Why a Central Agent Is Required

| Browser Limitation | Agent Solution |
|--------------------|----------------|
| Cannot send ICMP | Agent runs ping from LAN host |
| Cannot send UDP WoL | Agent sends magic packet on correct subnet |
| Cannot SSH to machines | Agent holds credentials and executes remotely |
| Cannot call router APIs | Agent has LAN access to management interface |
| CORS blocks direct calls | All network I/O goes through backend |

---

## 3.4 Deployment Topology

### Single Subnet (simple lab)

```
[Lab Server] ── runs API + DB + Central Agent
      │
      └── same subnet ──► all lab machines
```

### Multi-VLAN (segmented lab)

```
[Control Server] ── API + DB
      │
      ├── [Agent VLAN-10] ──► machines in 10.x
      ├── [Agent VLAN-20] ──► machines in 20.x
      └── [Agent VLAN-30] ──► machines in 30.x
```

One agent per VLAN when routing/firewall blocks cross-VLAN actions (especially WoL).

---

## 3.5 Data Flow Examples

### Ping Check (every 30 seconds)

```
Scheduler → enqueue ping job → Central Agent → ICMP to target
     → result stored in DB → WebSocket push → Dashboard updates
```

### Wake-on-LAN

```
User clicks WoL → API validates RBAC → audit log entry
     → job queued → Agent sends magic packet → confirmation returned
```

### Gateway Change

```
User selects new gateway → dry-run preview → confirmation required
     → API queues job → Agent runs OS script or router API
     → result logged → rollback script available
```

---

**Previous:** [Step 2 — Capabilities](./02-capabilities-and-possibilities.md)  
**Next:** [Step 4 — Challenges](./04-challenges.md)
