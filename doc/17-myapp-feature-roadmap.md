# Step 17 — myapp Feature Roadmap (NMS-Informed)

Features to develop in myapp based on NMS research — prioritized by market demand and differentiation.

---

## 17.1 myapp Unique Strengths (Keep & Expand)

These features are **rare in commercial NMS** — core differentiators:

| Feature | Why Unique | Priority |
|---------|------------|----------|
| **Gateway controller** | No major NMS offers safe gateway change + rollback | P0 |
| **Proxy manager** | Integrated proxy health + restart | P0 |
| **Git-synced inventory** | IaC-friendly lab config | P1 |
| **3D topology reports** | Most NMS only have 2D maps | P0 |
| **Lab-focused control panel** | WoL + shutdown in one UI | P0 |

---

## 17.2 Must-Have (Parity with NMS Leaders)

| Feature | Module | Phase | NMS Reference |
|---------|--------|-------|---------------|
| Real ICMP ping from agent | M02 | E1 | All NMS |
| SNMP device metrics | M03 | E2 | LibreNMS, Zabbix |
| Auto-discovery (SNMP sweep) | M01 | E2 | SolarWinds, OpManager |
| TCP/HTTP service checks | M04 | E2 | PRTG sensors |
| Threshold alerting | M10 | E2 | All NMS |
| Email/Slack/webhook alerts | M10 | E2 | All NMS |
| Historical metrics (90d+) | M09 | E2 | All NMS |
| Network topology 2D map | M09 | E3 | SolarWinds |
| Config backup (NCM lite) | M11 | E3 | SolarWinds NCM |
| Multi-site / distributed agents | M17 | E4 | Zabbix proxy |
| SSO + MFA | M15 | E4 | Enterprise NMS |
| Audit export (SIEM) | M14 | E4 | Enterprise |

---

## 17.3 Nice-to-Have (Commercial Upsell)

| Feature | Module | Phase | NMS Reference |
|---------|--------|-------|---------------|
| NetFlow/sFlow analysis | M12 | E5 | SolarWinds NTA |
| IPAM (subnet scanner) | M13 | E5 | SolarWinds IPAM |
| Hop-by-hop path analysis | M20 | E5 | SolarWinds NetPath |
| PerfStack correlation view | M09 | E5 | SolarWinds unique |
| Mobile app | — | E5+ | PRTG, SolarWinds |
| ITSM integration (ServiceNow) | M18 | E5 | Enterprise |
| ML anomaly detection | M10 | E5 | SolarWinds Observability |
| Billing/usage metering | M16 | E5 | LibreNMS, SaaS |

---

## 17.4 Feature vs Module Map

```
M01 Core Inventory ──────── machines, proxies, CSV import, discovery
M02 Ping Monitor ────────── ICMP, latency, uptime %
M03 SNMP Metrics ────────── CPU, memory, interfaces
M04 Service Checks ──────── TCP port, HTTP, DNS
M05 Power Operations ────── WoL, shutdown, BMC
M06 Proxy Manager ───────── health, config, restart
M07 Gateway Controller ──── profiles, apply, rollback
M08 3D Reports ──────────── topology, latency heightmap
M09 2D Analytics ────────── dashboards, charts, export
M10 Alerting Engine ─────── rules, escalation, webhooks
M11 NCM Lite ───────────── config backup, diff
M12 NetFlow Basic ───────── flow stats, top talkers
M13 IPAM Lite ───────────── subnet scan, IP tracking
M14 Audit & Compliance ──── immutable log, export
M15 SSO & MFA ───────────── Keycloak OIDC
M16 Multi-Tenant ────────── tenant isolation, billing
M17 Distributed Agents ──── per-VLAN/site agents
M18 API & Integrations ──── REST, webhooks, ITSM
M19 Runbook Automation ──── multi-step workflows
M20 Path Analysis ───────── traceroute, hop latency
```

---

## 17.5 Competitive Positioning

| Competitor | myapp Advantage |
|------------|-----------------|
| SolarWinds | Lower cost, gateway/proxy control, git inventory, 3D reports |
| PRTG | No sensor counting complexity, integrated ops (not just monitor) |
| Zabbix | Easier setup, commercial support option, built-in control panel |
| LibreNMS | Broader ops (power, gateway), 3D viz, modular licensing |
| OpManager | Modern stack, 3D reports, developer-friendly API |

---

## 17.6 What NOT to Build (Initially)

| Feature | Reason to Defer |
|---------|-----------------|
| Full IPAM/DHCP integration | Complex, niche; M13 lite is enough for v1 |
| Mobile native app | Web responsive is sufficient until E5+ |
| Full NCM compliance engine | SolarWinds NCM is mature; start with M11 lite |
| Custom scripting engine | Phase E5; Zabbix already does this for power users |
| Billing module | Only if targeting MSP market |

---

**Previous:** [16-nms-features-inventory.md](./16-nms-features-inventory.md)  
**Next:** [18-modular-architecture.md](./18-modular-architecture.md)
