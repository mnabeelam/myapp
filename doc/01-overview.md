# Step 1 — Overview

## Project Vision

Build a **web application** to control and manage local lab machines at an **enterprise level** for **local network monitoring**.

The platform acts as a central operations console for lab infrastructure — not a hobby dashboard, but internal infra tooling with proper security, audit, and role-based access.

---

## Primary Goals

1. **Monitor** lab machine health (ping, ports, uptime, metrics)
2. **Control** machine power (wake-on-LAN, graceful shutdown, scheduled power)
3. **Manage** proxy servers (status, config, failover)
4. **Configure** network routing (gateways, static routes, DNS)
5. **Operate** at enterprise standards (RBAC, audit logs, alerting, inventory)

---

## Scope

| In Scope | Out of Scope (initially) |
|----------|--------------------------|
| Local LAN / lab subnets | Multi-region cloud scale |
| Hundreds of hosts | Millions of endpoints |
| Windows + Linux mix | Single-OS-only assumptions |
| Central + optional per-machine agents | Browser-only control (not possible) |
| One deployment per site | Federated multi-site (Phase 5+) |

---

## Core Principle

> Browsers **cannot** ping, SSH, or send Wake-on-LAN directly.

You need a **backend service on the LAN** (control/data plane) that performs network operations. The web app is the **control plane UI**; agents are the **data and action plane**.

---

## Target Users

| Role | Typical Actions |
|------|-----------------|
| **Viewer** | See machine status, latency, uptime history |
| **Operator** | Wake machines, restart proxies, acknowledge alerts |
| **Admin** | Shutdown, gateway changes, config deploy, user management |

---

## Success Criteria (v1)

- [ ] Machine inventory with live ping status
- [ ] Historical uptime and latency data
- [ ] Wake-on-LAN and graceful shutdown (with audit)
- [ ] Role-based access control
- [ ] Audit log for all destructive actions
- [ ] Basic alerting when machines go down

---

**Next:** [Step 2 — Capabilities & Possibilities](./02-capabilities-and-possibilities.md)
