# Step 19 — License Tiers (LicenseA → LicenseZ)

Complete license tier definitions controlling features, limits, and commercial packaging.

---

## 19.1 Tier Overview

| Tier Key | Product Name | Target Customer | Price Model |
|----------|--------------|-----------------|-------------|
| **LICENSEA** | Starter | Small lab, hobby | Free / $0 |
| **LICENSEB** | Professional | Growing team | $49/mo or $499/yr |
| **LICENSEC** | Business | Mid-market IT | $199/mo or $1,999/yr |
| **LICENSEZ** | Enterprise | Large org, heavy load | Custom / $4,999+/yr |

---

## 19.2 LICENSEA — Starter

**Tagline:** *Monitor your lab. Free forever.*

| Limit | Value |
|-------|-------|
| Max machines | **10** |
| Max users | **2** |
| Max sites | **1** |
| Max agents | **1** |
| Ping interval | 60s minimum |
| Max pings/minute | **20** |
| Metric retention | **7 days** |
| Max proxies | **1** |

### Enabled Modules

| Module | Feature |
|--------|---------|
| M01 | Core Inventory (manual + CSV) |
| M02 | Ping Monitor (basic) |
| M05 | Power Ops (WoL only, no shutdown) |
| M14 | Audit Log (7 days) |

### Disabled (show upgrade prompt)

M03 SNMP, M06 Proxy, M07 Gateway, M08 3D Reports, M10 Alerting, M15 SSO, M16 Multi-tenant, M17 Distributed agents

---

## 19.3 LICENSEB — Professional

**Tagline:** *Full control for growing labs.*

| Limit | Value |
|-------|-------|
| Max machines | **100** |
| Max users | **10** |
| Max sites | **3** |
| Max agents | **3** |
| Ping interval | 30s |
| Max pings/minute | **500** |
| Metric retention | **30 days** |
| Max proxies | **5** |

### Enabled Modules

All LICENSEA modules **plus:**

| Module | Feature |
|--------|---------|
| M05 | Power Ops (full — WoL + shutdown) |
| M06 | Proxy Manager |
| M07 | Gateway Controller (with rollback) |
| M08 | 3D Topology Reports |
| M09 | 2D Analytics Dashboards |
| M10 | Alerting (email + webhook) |
| M04 | Service Port Checks |
| M18 | API access (read + ops) |

---

## 19.4 LICENSEC — Business

**Tagline:** *Multi-site operations at scale.*

| Limit | Value |
|-------|-------|
| Max machines | **2,000** |
| Max users | **50** |
| Max sites | **20** |
| Max agents | **20** |
| Ping interval | 15s |
| Max pings/minute | **10,000** |
| Metric retention | **90 days** |
| Max proxies | **50** |

### Enabled Modules

All LICENSEB modules **plus:**

| Module | Feature |
|--------|---------|
| M03 | SNMP Metrics |
| M01 | Auto-discovery (SNMP sweep) |
| M11 | NCM Lite (config backup) |
| M13 | IPAM Lite (subnet scanner) |
| M15 | SSO (OIDC) + MFA |
| M16 | Multi-Tenant (up to 5 sub-tenants) |
| M17 | Distributed Agents |
| M19 | Runbook Automation |
| M14 | Audit Log (1 year, SIEM export) |

---

## 19.5 LICENSEZ — Enterprise Unlimited

**Tagline:** *Unlimited scale. Every module. Enterprise SLA.*

| Limit | Value |
|-------|-------|
| Max machines | **Unlimited (50,000+)** |
| Max users | **Unlimited** |
| Max sites | **Unlimited** |
| Max agents | **Unlimited** |
| Ping interval | **5s** |
| Max pings/minute | **500,000+** |
| Metric retention | **2 years** (configurable) |
| Max proxies | **Unlimited** |

### Enabled Modules

**ALL modules M01–M20** including:

| Module | Enterprise-Only Feature |
|--------|----------------------|
| M12 | NetFlow / sFlow analysis |
| M15 | SAML + SCIM provisioning |
| M16 | Unlimited tenants + white-label |
| M17 | HA agent clusters + mTLS |
| M18 | ITSM (ServiceNow), full API |
| M20 | Hop-by-hop path analysis (NetPath) |
| — | Dedicated support SLA |
| — | On-prem + air-gapped deploy |
| — | Custom module development |

---

## 19.6 Side-by-Side Comparison

| Capability | LICENSEA | LICENSEB | LICENSEC | LICENSEZ |
|------------|----------|----------|----------|----------|
| Machines | 10 | 100 | 2,000 | ∞ |
| Users | 2 | 10 | 50 | ∞ |
| 3D Reports | ❌ | ✅ | ✅ | ✅ |
| Gateway control | ❌ | ✅ | ✅ | ✅ |
| SNMP | ❌ | ❌ | ✅ | ✅ |
| SSO/MFA | ❌ | ❌ | ✅ | ✅ |
| Multi-tenant | ❌ | ❌ | ✅ | ✅ |
| NetFlow | ❌ | ❌ | ❌ | ✅ |
| mTLS agents | ❌ | ❌ | ❌ | ✅ |
| SLA support | Community | Email | Priority | Dedicated |

---

## 19.7 Sample License Keys (Development)

```
MYAPP-LICENSEA-DEV-STARTER-001
MYAPP-LICENSEB-DEV-PRO-001
MYAPP-LICENSEC-DEV-BUSINESS-001
MYAPP-LICENSEZ-DEV-ENTERPRISE-001
```

Stored in: `inventory/license.json` (dev) and `License` table (production).

---

## 19.8 Upgrade Path

```
LICENSEA ──upgrade──► LICENSEB ──upgrade──► LICENSEC ──upgrade──► LICENSEZ
   Free                 $49/mo               $199/mo              Custom
```

Activation flow:
1. User enters key in **Settings → License**
2. API validates signature + tier
3. Modules enabled instantly (Redis cache refresh)
4. UI unlocks tabs and features
5. Limits enforced on next API call

---

**Previous:** [18-modular-architecture.md](./18-modular-architecture.md)  
**Next:** [20-complete-build-phases.md](./20-complete-build-phases.md)
