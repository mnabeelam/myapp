# Step 8 — MVP Scope

Minimum viable first release — what to ship before anything else.

---

## 8.1 MVP Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────┐
│  LabOps Dashboard                          [User] [Logout]│
├─────────────────────────────────────────────────────────┤
│  [Machines]  [Proxies]  [Alerts]  [Audit]  [Settings]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Machine          IP              Status   Latency  Actions │
│  ─────────────────────────────────────────────────────────  │
│  lab-pc-01        192.168.1.10    ● UP      2ms    [WoL][▼] │
│  lab-pc-02        192.168.1.11    ● DOWN     —     [WoL]    │
│  lab-pc-03        192.168.1.12    ● UP      5ms    [WoL][▼] │
│  proxy-01         192.168.1.20    ● UP      1ms    [Restart] │
│                                                          │
│  Last checked: 30 seconds ago          [Refresh]         │
└─────────────────────────────────────────────────────────┘
```

---

## 8.2 MVP Feature List

### Must Have (v1.0)

| # | Feature | Phase |
|---|---------|-------|
| 1 | Machine inventory (add, edit, delete, bulk CSV import) | 1 |
| 2 | Live ping status (UP / DOWN) with latency | 1 |
| 3 | Ping history (last 24 hours per machine) | 1 |
| 4 | WebSocket real-time status updates | 1 |
| 5 | User login with JWT | 1 |
| 6 | RBAC: viewer, operator, admin | 1 |
| 7 | Audit log for all actions | 1 |
| 8 | Wake-on-LAN (operator+) | 2 |
| 9 | Graceful shutdown — Linux (admin, with confirmation) | 2 |
| 10 | Basic alert: machine down > 5 minutes | 5 (minimal) |

### Should Have (v1.1)

| # | Feature | Phase |
|---|---------|-------|
| 11 | Graceful shutdown — Windows | 2 |
| 12 | Proxy status panel | 3 |
| 13 | Proxy restart with confirmation | 3 |
| 14 | Email or webhook alert notification | 5 |

### Won't Have in v1

| Feature | Reason |
|---------|--------|
| Gateway changes | Too risky for first release |
| Config deploy | Complex; needs templates and versioning |
| Topology map | Nice-to-have; not core |
| SNMP metrics | Phase 5 |
| Multi-VLAN agents | Deploy when needed |
| Mobile app | Web dashboard is sufficient |

---

## 8.3 MVP User Stories

### Viewer

```
As a viewer,
I want to see which lab machines are online,
So that I know if the lab is ready for use.
```

```
As a viewer,
I want to see ping latency for each machine,
So that I can identify slow or problematic hosts.
```

### Operator

```
As an operator,
I want to wake a machine using Wake-on-LAN,
So that I can power on lab PCs remotely before a session.
```

```
As an operator,
I want to receive an alert when a machine has been down for 5 minutes,
So that I can investigate issues promptly.
```

### Admin

```
As an admin,
I want to shut down a machine with confirmation,
So that I can safely power off lab PCs remotely.
```

```
As an admin,
I want to see an audit log of all actions,
So that I can trace who did what and when.
```

```
As an admin,
I want to import machines from a CSV file,
So that I can onboard the lab inventory quickly.
```

---

## 8.4 MVP Acceptance Criteria

### Machine Monitoring

- [ ] Dashboard loads in < 2 seconds
- [ ] Ping status updates within 35 seconds of a change
- [ ] UP/DOWN indicator is accurate (verified against manual ping)
- [ ] Latency displayed in milliseconds
- [ ] History chart shows last 24 hours

### Wake-on-LAN

- [ ] WoL button sends magic packet to correct MAC
- [ ] Machine powers on within 60 seconds (hardware permitting)
- [ ] Action logged in audit trail with user and timestamp
- [ ] Only operator and admin roles can trigger WoL

### Shutdown

- [ ] Confirmation dialog appears before shutdown
- [ ] Machine status changes to DOWN within 60 seconds
- [ ] Action logged in audit trail
- [ ] Only admin role can trigger shutdown

### Auth & Audit

- [ ] Unauthenticated users redirected to login
- [ ] Viewer cannot access shutdown or WoL endpoints
- [ ] Every mutation creates an audit log entry
- [ ] Audit log is searchable by user, action, and date

---

## 8.5 MVP Data Model (Minimum Tables)

```
machines
  id, hostname, ip, mac, os, role, tags, status, last_seen, created_at

ping_results
  id, machine_id, timestamp, latency_ms, status

users
  id, username, password_hash, role, created_at

audit_log
  id, user_id, action, target_type, target_id, details, timestamp

alerts
  id, machine_id, type, message, acknowledged, created_at
```

---

## 8.6 MVP Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Machines supported | Up to 100 |
| Ping interval | 30 seconds |
| API response time | < 200ms (non-ping endpoints) |
| Uptime of platform | Best effort (lab server) |
| Browsers supported | Chrome, Firefox, Edge (latest) |
| Deployment | Docker Compose, single server |

---

## 8.7 Out of Scope for MVP

Document these explicitly to avoid scope creep:

- Gateway or routing changes
- Proxy config editing
- Mobile application
- Multi-site federation
- SNMP or per-machine agents
- Automated machine discovery (manual inventory only)
- Integration with external ticketing systems

---

**Previous:** [Step 7 — Design Decisions](./07-design-decisions.md)  
**Next:** [Step 9 — Next Steps](./09-next-steps.md)
