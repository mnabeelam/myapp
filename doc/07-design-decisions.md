# Step 7 — Design Decisions

Architectural choices to make **before** writing code. Document your decisions here.

---

## 7.1 Agent vs Agentless

| Approach | Pros | Cons |
|----------|------|------|
| **Agentless** (SSH/WinRM/SNMP only) | Simpler deployment, no agent to maintain | Less detail, fails when ICMP blocked |
| **Agent on every machine** | Rich metrics, heartbeat, works without ICMP | Ops overhead, agent updates |
| **Hybrid** (recommended) | Central agent for ping/WoL/SSH; optional per-machine agent for metrics | Slightly more complex architecture |

### Decision

```
[ ] Agentless only
[ ] Agent on every machine
[x] Hybrid — central agent + optional per-machine agents
```

**Rationale:** Central agent covers 80% of needs. Add per-machine agents in Phase 5 for metrics.

---

## 7.2 One Agent vs Many Agents

| Scenario | Recommendation |
|----------|----------------|
| Single flat subnet | One central agent on a trusted lab server |
| Multiple VLANs with firewall rules | One agent per VLAN |
| WoL needed across subnets | WoL relay agent on each target subnet |

### Decision

```
Number of subnets/VLANs: ___________
Agents needed: ___________
WoL relay required: [ ] Yes  [ ] No
```

---

## 7.3 Credential Model

| Approach | Pros | Cons |
|----------|------|------|
| **Shared service account** | Simple | Blast radius if compromised |
| **Per-machine keys** | Least privilege | More key management |
| **Vault integration** | Secure, rotatable | Additional infrastructure |

### Decision

```
[ ] Shared service account (SSH key + WinRM creds)
[ ] Per-machine keys
[ ] Vault (HashiCorp Vault / Bitwarden Secrets Manager)
```

**Recommendation:** Start with shared service account for Phase 1–2. Move to Vault in Phase 4+.

---

## 7.4 Windows vs Linux Strategy

Do **not** assume one script fits all. Plan separate modules from day one.

| Action | Linux | Windows |
|--------|-------|---------|
| Shutdown | SSH + `sudo shutdown` | WinRM + `Stop-Computer` |
| Gateway change | netplan / `ip route` | `netsh` / PowerShell |
| Config fetch | SSH cat | WinRM Get-Content |
| WoL | Same (MAC-based) | Same (MAC-based) |

### Decision

```
Primary OS in lab: ___________
Windows count: ___________
Linux count: ___________
Build Linux first: [ ] Yes  [ ] No
```

---

## 7.5 Authentication Strategy

| Option | When to Use |
|--------|-------------|
| Local JWT | Small team, quick start, Phase 1 |
| LDAP/AD | Existing domain, enterprise users |
| Authentik / Keycloak | SSO, MFA, multiple apps |

### Decision

```
[ ] Local JWT (username/password in DB)
[ ] LDAP / Active Directory
[ ] Authentik
[ ] Keycloak
```

---

## 7.6 API Style

| Style | Use Case |
|-------|----------|
| REST | CRUD, actions, standard HTTP |
| WebSocket | Real-time status push to dashboard |
| gRPC | Agent ↔ API communication (optional, high performance) |

### Decision

```
API ↔ Dashboard: REST + WebSocket
Agent ↔ API: [ ] REST  [ ] gRPC
```

**Recommendation:** REST for both initially. Switch agent to gRPC if performance becomes an issue.

---

## 7.7 Database for Time-Series

| Option | When |
|--------|------|
| PostgreSQL only | < 100 machines, 30s ping interval — sufficient |
| TimescaleDB extension | > 100 machines or need long retention analytics |
| Separate InfluxDB | Heavy metrics (SNMP, per-second data) |

### Decision

```
[ ] PostgreSQL only (start here)
[ ] TimescaleDB
[ ] InfluxDB for metrics
```

---

## 7.8 Deployment Target

| Target | Notes |
|--------|-------|
| Docker Compose on one lab server | Recommended for Phase 1–4 |
| Bare metal install | If Docker not available |
| Kubernetes | Phase 5+ if multi-site |

### Decision

```
Control server hostname/IP: ___________
OS: ___________
Docker available: [ ] Yes  [ ] No
```

---

## Decision Record Template

Use this template when making and recording each decision:

```markdown
## Decision: [Title]
**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded

### Context
[What situation requires a decision?]

### Options Considered
1. [Option A] — [pros/cons]
2. [Option B] — [pros/cons]

### Decision
[What was chosen and why]

### Consequences
[What follows from this decision]
```

---

**Previous:** [Step 6 — Development Phases](./06-development-phases.md)  
**Next:** [Step 8 — MVP Scope](./08-mvp-scope.md)
