# Step 15 — NMS Market Research

Research into Network Management System (NMS) software — what exists, who leads, and how the market is structured.

---

## 15.1 What Is an NMS?

A **Network Management System** is software that discovers, monitors, configures, and operates network infrastructure — routers, switches, servers, firewalls, proxies, and endpoints — from a central control plane.

Core NMS functions (ITU-T FCAPS model):

| Function | Description |
|----------|-------------|
| **Fault** | Detect failures, alert operators |
| **Configuration** | Manage device configs, backups, compliance |
| **Accounting** | Track usage, bandwidth, billing (optional) |
| **Performance** | Latency, throughput, CPU, memory metrics |
| **Security** | Access control, anomaly detection, audit |

---

## 15.2 Major NMS Platforms (2025–2026)

| Platform | Type | License Model | Best For |
|----------|------|---------------|----------|
| [SolarWinds NPM/Observability](https://www.solarwinds.com/network-management-software) | Commercial | Per node (~$7+/node/mo) | Large enterprise, Cisco-heavy |
| [PRTG](https://www.paessler.com/prtg) | Commercial | Per sensor (100 free) | SMB, fast deploy |
| [Zabbix](https://www.zabbix.com/) | Open-source + support | Free / support contract | Skilled ops teams, scale |
| [LibreNMS](https://www.librenms.org/) | Open-source | Free | SNMP device fleets |
| [ManageEngine OpManager](https://www.manageengine.com/network-monitoring/) | Commercial | Per device ($95–$4595/yr) | Mid-market, modular add-ons |
| [Datadog](https://www.datadoghq.com/) | SaaS | Per host ($15–34/mo) | Cloud-native observability |
| [LogicMonitor](https://www.logicmonitor.com/) | SaaS | Per hybrid unit ($16–53/mo) | Hybrid infra |
| [Nagios](https://www.nagios.org/) | Open-source + commercial | Free / per node | Legacy, plugin ecosystem |

Sources: [SolarWinds blog comparison](https://www.solarwinds.com/blog/the-best-network-monitoring-tools), [Fortra licensing guide](https://www.fortra.com/resources/articles/take-confusion-out-network-monitoring-software-licensing-models), [ManageEngine editions](https://www.manageengine.com/network-monitoring/opmanager-editions.html).

---

## 15.3 SolarWinds Module Ecosystem

SolarWinds sells **modular add-ons** on the Orion platform — a pattern myapp should follow:

| Module | Function |
|--------|----------|
| **NPM** | Network performance monitoring |
| **NCM** | Network configuration management |
| **NTA** | NetFlow traffic analyzer |
| **IPAM** | IP address management |
| **NTM** | Network topology mapper |
| **SAM** | Server & application monitor |
| **VoIP NQM** | Voice quality monitoring |
| **UDT** | User device tracker |
| **Log Analyzer** | Centralized log analysis |

Each module is a **separate license** bundled into platform packages.

---

## 15.4 PRTG Sensor Model

PRTG counts **one sensor per metric** (ping, CPU, disk, HTTP, etc.):

- 100 sensors free
- Paid tiers by sensor count
- 250+ pre-built sensor types
- Custom sensors via PowerShell/Python

**Lesson for myapp:** Granular metering option for cloud SaaS billing.

---

## 15.5 Zabbix Architecture

| Component | Role |
|-----------|------|
| **Server** | Central processing, alerting |
| **Proxy** | Distributed polling (like myapp Go agent) |
| **Agent** | Per-host metrics collection |
| **Templates** | Reusable monitor configs per vendor |

**Strengths:** No license fees, scales to very large deployments, strong community templates.

**Weakness:** Steep learning curve, requires engineering time.

---

## 15.6 LibreNMS Focus

- Auto-discovery via SNMP
- Clean network-device dashboards
- Billing module (optional)
- Simpler than Zabbix, network-focused

**Lesson:** Fast SNMP discovery is a high-value module for lab router/switch fleets.

---

## 15.7 ManageEngine Tier Structure

| Edition | Devices | Key Difference |
|---------|---------|----------------|
| Free | 3 | Basic monitoring |
| Standard | 10–1000 | Single site |
| Professional | 10–1000 | + distributed monitoring |
| Enterprise | 250–50k | Multi-site, 50k devices |

Add-ons sold separately: NCM, NetFlow, IP SLA, firewall management.

Source: [OpManager editions](https://www.manageengine.com/network-monitoring/opmanager-editions.html)

---

## 15.8 Common Licensing Models

| Model | Used By | Pros | Cons |
|-------|---------|------|------|
| **Per device/node** | SolarWinds, OpManager | Predictable | Cost grows with fleet |
| **Per sensor/metric** | PRTG | Granular | Hard to estimate |
| **Per interface/port** | Some enterprise NMS | Detailed | Expensive at scale |
| **Per host (cloud)** | Datadog, LogicMonitor | Simple SaaS | Module costs add up |
| **Open + support** | Zabbix, LibreNMS | No license fee | Engineering cost |
| **Modular add-ons** | SolarWinds, OpManager | Pay for what you use | Complex to manage |

Source: [Fortra licensing models article](https://www.fortra.com/resources/articles/take-confusion-out-network-monitoring-software-licensing-models)

---

## 15.9 Key Takeaways for myapp

1. **Modular beats monolithic** — sell/core packages + optional modules
2. **License tiers control features AND limits** — devices, users, sites, retention
3. **Distributed agents/proxies** are standard for scale (Zabbix proxy = myapp Go agent)
4. **Topology + 3D maps** differentiate enterprise products (SolarWinds Network Atlas)
5. **NCM, NetFlow, IPAM** are high-value paid add-ons
6. **Audit + RBAC** required for regulated enterprise sales

---

**Previous:** [14-build-roadmap.md](./14-build-roadmap.md)  
**Next:** [16-nms-features-inventory.md](./16-nms-features-inventory.md)
