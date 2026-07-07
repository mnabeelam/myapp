# Step 16 — NMS Features Inventory

Complete feature inventory from leading NMS platforms — mapped for myapp development decisions.

---

## 16.1 Discovery & Inventory

| Feature | SolarWinds | PRTG | Zabbix | LibreNMS | OpManager |
|---------|------------|------|--------|----------|-----------|
| Auto-discovery (SNMP) | ✅ | ✅ | ✅ | ✅ Strong | ✅ |
| Auto-discovery (ICMP) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Multi-vendor templates | ✅ 200+ | ✅ 250 sensors | ✅ Community | ✅ | ✅ 53k templates |
| Manual inventory | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dependency mapping | ✅ | Basic | ✅ | ❌ | ✅ |
| CSV/API import | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cloud/hybrid discovery | ✅ | ✅ | ✅ | ❌ | ✅ |

**myapp status:** Manual inventory ✅ | Auto-discovery 📋 | API import 📋

---

## 16.2 Monitoring & Performance

| Feature | SolarWinds | PRTG | Zabbix | LibreNMS | OpManager |
|---------|------------|------|--------|----------|-----------|
| ICMP ping | ✅ | ✅ | ✅ | ✅ | ✅ |
| SNMP v1/v2c/v3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| TCP port checks | ✅ | ✅ | ✅ | ✅ | ✅ |
| HTTP/HTTPS checks | ✅ | ✅ | ✅ | ❌ | ✅ |
| Agent-based metrics | ✅ | ✅ | ✅ | ❌ | ✅ |
| WMI (Windows) | ✅ | ✅ | ✅ | ❌ | ✅ |
| IPMI/BMC | ✅ | ✅ | ✅ | ❌ | ✅ |
| NetFlow/sFlow/IPFIX | ✅ NTA module | ✅ | Template | Plugin | Add-on |
| Dynamic baselines | ✅ ML | ✅ | ✅ | ❌ | ✅ |
| Custom scripts | ✅ | ✅ PS/Python | ✅ | ✅ | ✅ |

**myapp status:** Ping (mock) ✅ | SNMP 📋 | Agent 📋 | NetFlow 📋

---

## 16.3 Fault Management & Alerting

| Feature | SolarWinds | PRTG | Zabbix | LibreNMS | OpManager |
|---------|------------|------|--------|----------|-----------|
| Threshold alerts | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anomaly/ML alerts | ✅ | Basic | ✅ | ❌ | ✅ |
| Alert escalation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Email notifications | ✅ | ✅ | ✅ | ✅ | ✅ |
| Slack/Teams/webhook | ✅ | ✅ | ✅ | ✅ | ✅ |
| SMS | ✅ | ✅ | ✅ | Plugin | ✅ |
| Alert suppression | ✅ | ✅ | ✅ | ✅ | ✅ |
| On-call schedules | ✅ | ❌ | ✅ | ❌ | ✅ |
| Ticket integration | ✅ ServiceNow | ✅ | ✅ | ✅ | ✅ |

**myapp status:** Basic alerts ✅ | Webhook 📋 | Escalation 📋

---

## 16.4 Visualization & Reporting

| Feature | SolarWinds | PRTG | Zabbix | LibreNMS | OpManager |
|---------|------------|------|--------|----------|-----------|
| Real-time dashboards | ✅ | ✅ | ✅ | ✅ | ✅ |
| Network topology map | ✅ Advanced | Basic | Manual | ✅ | ✅ |
| 3D / interactive maps | ✅ Atlas | ❌ | ❌ | ❌ | ❌ |
| Custom dashboards | ✅ | ✅ | ✅ | ✅ | ✅ |
| Historical reports | ✅ | ✅ | ✅ | ✅ | ✅ |
| PDF/CSV export | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mobile app | ✅ | ✅ | Third-party | ❌ | ✅ |
| PerfStack correlation | ✅ Unique | ❌ | ❌ | ❌ | ❌ |
| Path analysis (hop-by-hop) | ✅ NetPath | ❌ | ❌ | ❌ | Add-on |

**myapp status:** 3D topology ✅ | 2D dashboards ✅ | PDF export 📋 | NetPath 📋

---

## 16.5 Configuration Management (NCM)

| Feature | SolarWinds NCM | PRTG | Zabbix | LibreNMS | OpManager |
|---------|----------------|------|--------|----------|-----------|
| Config backup | ✅ | ❌ | Script | ❌ | Add-on |
| Config diff | ✅ | ❌ | ❌ | ❌ | Add-on |
| Compliance policies | ✅ | ❌ | ❌ | ❌ | Add-on |
| Change notifications | ✅ | ❌ | ❌ | ❌ | Add-on |
| Automated remediation | ✅ | ❌ | ❌ | ❌ | ❌ |
| Multi-vendor CLI | ✅ | ❌ | ❌ | ❌ | Add-on |

**myapp status:** Proxy config view ✅ | Full NCM 📋

---

## 16.6 IP & Address Management

| Feature | SolarWinds IPAM | Others |
|---------|-----------------|--------|
| IPv4/IPv6 tracking | ✅ | OpManager add-on |
| Subnet scanning | ✅ | Limited elsewhere |
| DHCP/DNS integration | ✅ | Rare |
| Switch port mapping | ✅ UDT | OpManager SPM |

**myapp status:** Subnet field in inventory ✅ | Full IPAM 📋

---

## 16.7 Operations & Control

| Feature | SolarWinds | PRTG | Zabbix | myapp |
|---------|------------|------|--------|-------|
| Wake-on-LAN | Script | ✅ Sensor | Script | ✅ |
| Remote shutdown | Script | ✅ | Script | ✅ |
| Gateway change | ❌ | ❌ | ❌ | ✅ Unique |
| Proxy control | ❌ | ✅ | ❌ | ✅ Unique |
| Scheduled maintenance | ✅ | ✅ | ✅ | 📋 |
| Runbooks/automation | ✅ | ✅ | ✅ | 📋 |
| Bulk operations | ✅ | ✅ | ✅ | 📋 |

**myapp differentiators:** Gateway control, proxy management, git-synced inventory.

---

## 16.8 Security & Compliance

| Feature | Enterprise NMS | myapp |
|---------|----------------|-------|
| RBAC | ✅ | ✅ Basic |
| SSO (SAML/OIDC) | ✅ | 📋 Phase E2 |
| MFA | ✅ | 📋 Phase E2 |
| Audit log | ✅ | ✅ |
| mTLS agents | Rare | 📋 Phase E4 |
| SOC2-ready | ✅ | 📋 Phase E5 |
| Tenant isolation | SaaS only | 📋 Phase E4 |

---

## 16.9 Scalability Features

| Feature | SolarWinds | Zabbix | myapp target |
|---------|------------|--------|--------------|
| Distributed polling | ✅ Engines | ✅ Proxies | ✅ Go agents |
| HA / failover | ✅ | ✅ | 📋 K8s Phase E5 |
| 50k+ devices | ✅ | ✅ | 📋 LicenseZ |
| Time-series DB | Proprietary | Built-in + ext | TimescaleDB ✅ |
| Horizontal API scale | ✅ | ✅ | 📋 Phase E4 |

---

## 16.10 Feature Categories for myapp Modules

Group features into **sellable modules**:

| Module ID | Name | NMS Equivalent |
|-----------|------|----------------|
| `M01` | Core Inventory | Discovery + CMDB |
| `M02` | Ping Monitor | Availability |
| `M03` | SNMP Metrics | Performance |
| `M04` | Port & Service Checks | PRTG sensors |
| `M05` | Power Operations | Custom (WoL/shutdown) |
| `M06` | Proxy Manager | Custom |
| `M07` | Gateway Controller | Custom differentiator |
| `M08` | 3D Topology Reports | SolarWinds Atlas+ |
| `M09` | 2D Analytics | Standard dashboards |
| `M10` | Alerting Engine | Fault management |
| `M11` | NCM Lite | Config view/backup |
| `M12` | NetFlow Basic | NTA lite |
| `M13` | IPAM Lite | Subnet/IP tracking |
| `M14` | Audit & Compliance | Security |
| `M15` | SSO & MFA | Enterprise auth |
| `M16` | Multi-Tenant | SaaS commercial |
| `M17` | Distributed Agents | Zabbix proxy |
| `M18` | API & Integrations | Webhooks, ITSM |
| `M19` | Runbook Automation | NAM |
| `M20` | Path Analysis | NetPath |

---

**Previous:** [15-nms-market-research.md](./15-nms-market-research.md)  
**Next:** [17-myapp-feature-roadmap.md](./17-myapp-feature-roadmap.md)
