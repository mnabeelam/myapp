# Step 4 — Challenges

Risks, constraints, and mitigations for building the LabOps platform.

---

## 4.1 Security (Highest Priority)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Remote shutdown abuse | Lab disruption, data loss | RBAC, MFA, IP allowlist, action approval |
| Stored credentials leaked | Full lab compromise | Vault, encrypted secrets, short-lived tokens |
| App compromise → lateral movement | Attacker controls all lab machines | Least privilege, separate service accounts per role |
| No audit trail | Cannot trace incidents | Immutable audit log for every destructive action |
| Gateway change mistakes | Network isolation | Dry-run, confirmation, rollback scripts |

### Security Rules

1. Treat this as **internal infra tooling**, not a hobby dashboard.
2. **Never** store plaintext passwords in the database.
3. **Destructive actions** require explicit confirmation and audit logging.
4. **Admin actions** should support optional two-person approval for production-like labs.
5. Bind API to internal network only; use VPN or reverse proxy with TLS for remote access.

---

## 4.2 Network Constraints

| Constraint | Problem | Solution |
|------------|---------|----------|
| WoL across subnets | Magic packet is broadcast; routers don't forward it | WoL relay agent on each subnet |
| ICMP blocked | Ping appears as "down" when machine is up | TCP port checks + agent heartbeat |
| Windows firewall | WinRM blocked by default | Pre-configure WinRM during machine imaging |
| Linux SSH | Key-based auth required for automation | Deploy SSH keys during provisioning |
| Router diversity | MikroTik vs Cisco vs UniFi vs pfSense | Adapter pattern per vendor |
| VLAN isolation | Agent cannot reach machines in other VLANs | Deploy one agent per VLAN |

---

## 4.3 Heterogeneous Environment

Labs typically mix:

- Windows desktops and servers
- Linux workstations and VMs
- Bare metal and virtual machines
- Different BMC types (iDRAC, iLO, IPMI)
- Various proxy software (Squid, nginx, 3proxy)

### Mitigation Strategy

1. **Adapter pattern** — one interface per OS/device type
2. **Capability matrix** — record what each machine supports (WoL yes/no, SSH yes/no, BMC type)
3. **Graceful degradation** — show "not supported" instead of failing silently
4. **Test matrix** — maintain a checklist of tested OS + action combinations

---

## 4.4 Real-Time vs Polling

| Concern | Guidance |
|---------|----------|
| Ping frequency | Every 30s is sufficient for dashboards |
| Live updates | WebSockets for status changes |
| Scale | Don't ping thousands of hosts every 1 second |
| Agent load | Batch checks; use connection pooling for SSH |

---

## 4.5 Gateway Changes Are Dangerous

Changing the default gateway can **isolate machines** from the network.

### Required Safeguards

- [ ] Confirmation dialog with clear warning
- [ ] Dry-run / preview mode
- [ ] Rollback script generated before apply
- [ ] Timeout with automatic rollback if agent loses contact
- [ ] Optional two-person approval
- [ ] Test on a single machine before bulk apply

---

## 4.6 Proxy Management Complexity

Proxies are not simple on/off switches.

| Challenge | Detail |
|-----------|--------|
| Config syntax | Squid vs nginx vs HAProxy — all different |
| Reload vs restart | Reload may not pick up all changes |
| Upstream health | Proxy may be "up" but upstream is down |
| ACL mistakes | Bad rule can block all traffic |

### Recommended Approach

1. **Phase 3a:** Read-only status and config display
2. **Phase 3b:** Controlled restart/reload with approval
3. **Phase 3c:** Versioned config templates with diff before deploy

---

## 4.7 Enterprise Features on a Local Network

| Enterprise Need | Local Reality |
|-----------------|---------------|
| High availability | Single server + backups is often enough |
| Multi-site | One deployment per site, or federated agents later |
| Compliance | Audit logs + RBAC still apply |
| Scale | Hundreds of hosts, not millions |
| SLA monitoring | Self-hosted; no external dependency |

---

## 4.8 Operational Challenges

| Challenge | Mitigation |
|-----------|------------|
| Credential rotation | Vault integration; document rotation procedure |
| Agent updates | Package agent as versioned binary; rolling update |
| Database backups | Daily Postgres backup; test restore |
| Network changes | Inventory sync job to detect IP/MAC changes |
| Onboarding new machines | Standard imaging script that registers machine in inventory |

---

## Challenge Priority Matrix

| Priority | Challenge | When to Address |
|----------|-----------|-----------------|
| P0 | Security / RBAC / audit | Phase 1 |
| P0 | Central agent design | Phase 1 |
| P1 | Cross-subnet WoL | Phase 2 |
| P1 | Windows WinRM setup | Phase 2 |
| P2 | Proxy config management | Phase 3 |
| P2 | Gateway change rollback | Phase 4 |
| P3 | Multi-vendor router adapters | Phase 4–5 |
| P3 | SNMP / per-machine agents | Phase 5 |

---

**Previous:** [Step 3 — Architecture](./03-architecture.md)  
**Next:** [Step 5 — Tech Stack](./05-tech-stack.md)
