# Step 20 — Complete Build Phases (All Phases)

Full phased build plan incorporating NMS features, modular licensing, and enterprise scale.

---

## Phase Map

```
E1 Foundation ──► E2 Operations ──► E3 Reports ──► E4 Scale ──► E5 Commercial
     │                  │               │              │              │
  M01,M02           M05-M07,M10    M08,M09,M11    M03,M15-M17    M12-M13,M20
  LicenseA          LicenseB       LicenseB       LicenseC       LicenseZ
```

---

## Phase E1 — Foundation + Licensing Core (Weeks 1–4)

### Goals
- Modular architecture live
- LicenseA/B/Z validation working
- Real data pipeline started

### Modules
| Module | Deliverable |
|--------|-------------|
| M01 | PostgreSQL inventory (migrate from JSON) |
| M02 | Go agent real ICMP → TimescaleDB |
| M14 | Audit log in DB |
| **LIC** | License service + ModuleGuard + UI gate |

### Tasks
- [ ] `packages/shared` module registry
- [ ] NestJS `LicensingModule` + `ModuleGuard`
- [ ] `POST /license/activate` endpoint
- [ ] Settings UI: enter license key
- [ ] `ModuleGate` React component
- [ ] Docker Postgres + Redis running
- [ ] Seed DB from inventory/machines.json
- [ ] Go agent ping → API ingest

### License tier unlocked: **LICENSEA** (default), activation for B/Z

---

## Phase E2 — Operations + LicenseB (Weeks 5–8)

### Modules
| Module | Deliverable |
|--------|-------------|
| M04 | TCP/HTTP port checks |
| M05 | WoL + shutdown (queued via BullMQ) |
| M06 | Proxy health + restart |
| M07 | Gateway apply + rollback |
| M10 | Alert rules + email/webhook |
| M09 | 2D charts (latency over time) |

### Tasks
- [ ] BullMQ workers for network ops
- [ ] WebSocket live status push
- [ ] Alert engine (down > N minutes)
- [ ] LICENSEB unlocks: M06, M07, M08, M10
- [ ] Enforce LICENSEA limits (10 machines, no shutdown)

### License tier: **LICENSEB** fully functional

---

## Phase E3 — 3D Reports + Analytics (Weeks 9–11)

### Modules
| Module | Deliverable |
|--------|-------------|
| M08 | 3D topology (enhanced — time slider, LOD) |
| M09 | PDF/PNG report export |
| M11 | NCM lite — config backup via SSH |

### Tasks
- [ ] 3D latency heatmap mode
- [ ] Historical replay on time slider
- [ ] Export 3D screenshot
- [ ] 2D network map (D3/visx)
- [ ] Config backup job for Linux proxies/routers

### License: M08 requires LICENSEB+

---

## Phase E4 — Scale + LicenseC (Weeks 12–16)

### Modules
| Module | Deliverable |
|--------|-------------|
| M03 | SNMP polling (CPU, memory, interfaces) |
| M01 | Auto-discovery (SNMP sweep subnet) |
| M13 | IPAM lite — subnet scanner |
| M15 | Keycloak OIDC + MFA |
| M16 | Multi-tenant (row-level security) |
| M17 | Multi-agent per site/VLAN |
| M19 | Runbook engine (multi-step) |

### Tasks
- [ ] Tenant isolation in all queries
- [ ] Load test: 2,000 machines, 10k pings/min
- [ ] Agent mTLS registration
- [ ] SNMP templates for common vendors
- [ ] LICENSEC limits enforced (2000 machines, 50 users)

### License tier: **LICENSEC** fully functional

---

## Phase E5 — Enterprise + LicenseZ (Weeks 17–24)

### Modules
| Module | Deliverable |
|--------|-------------|
| M12 | NetFlow/sFlow collector |
| M20 | Hop-by-hop path analysis |
| M18 | ServiceNow / Jira integration |
| M16 | White-label + unlimited tenants |
| — | Stripe billing |
| — | K8s HA manifests |
| — | Vault secrets |
| — | ClickHouse analytics (optional) |

### Tasks
- [ ] NetFlow basic top-talkers dashboard
- [ ] Traceroute path visualization in 3D
- [ ] SOC2 documentation pack
- [ ] License key generation admin portal
- [ ] LICENSEZ: all limits removed
- [ ] Load test: 50,000 machines target

### License tier: **LICENSEZ** — full enterprise

---

## Phase E6 — Continuous (Post-Launch)

- ML anomaly detection on metrics
- Mobile PWA
- MSP multi-customer billing
- Marketplace for community modules
- Hardware appliance image (on-prem)

---

## Module ↔ License Matrix (Quick Reference)

| Module | A | B | C | Z |
|--------|---|---|---|---|
| M01 Inventory | ✅ | ✅ | ✅+discovery | ✅ |
| M02 Ping | ✅ | ✅ | ✅ | ✅ |
| M03 SNMP | ❌ | ❌ | ✅ | ✅ |
| M04 Port checks | ❌ | ✅ | ✅ | ✅ |
| M05 Power | WoL only | ✅ | ✅ | ✅ |
| M06 Proxy | ❌ | ✅ | ✅ | ✅ |
| M07 Gateway | ❌ | ✅ | ✅ | ✅ |
| M08 3D Reports | ❌ | ✅ | ✅ | ✅ |
| M09 Analytics | ❌ | ✅ | ✅ | ✅ |
| M10 Alerting | ❌ | ✅ | ✅ | ✅ |
| M11 NCM Lite | ❌ | ❌ | ✅ | ✅ |
| M12 NetFlow | ❌ | ❌ | ❌ | ✅ |
| M13 IPAM | ❌ | ❌ | ✅ | ✅ |
| M14 Audit | 7d | 30d | 1y | ∞ |
| M15 SSO/MFA | ❌ | ❌ | ✅ | ✅+SAML |
| M16 Multi-tenant | ❌ | ❌ | ✅ | ✅ |
| M17 Agents | 1 | 3 | 20 | ∞ |
| M18 Integrations | ❌ | API | API+ | Full |
| M19 Runbooks | ❌ | ❌ | ✅ | ✅ |
| M20 Path Analysis | ❌ | ❌ | ❌ | ✅ |

---

## Success Criteria Per Phase

| Phase | Metric |
|-------|--------|
| E1 | License key activates; 10 machine limit enforced |
| E2 | LICENSEB unlocks 3D tab; shutdown works with audit |
| E3 | 3D export PNG; NCM backup one device |
| E4 | 2000 machines in load test; SSO login works |
| E5 | LICENSEZ passes 50k machine simulation; Stripe live |

---

**Previous:** [19-license-tiers.md](./19-license-tiers.md)  
**Back to index:** [00-index.md](./00-index.md)
