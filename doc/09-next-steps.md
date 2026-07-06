# Step 9 — Next Steps

How to move forward and start development.

---

## 9.1 Pre-Development Checklist

Complete these **before writing code**:

### Document Your Lab

| Item | Your Value |
|------|------------|
| Total machine count | ___________ |
| Windows machines | ___________ |
| Linux machines | ___________ |
| Subnets / VLANs | ___________ |
| Proxy server type (Squid/nginx/other) | ___________ |
| Router model / vendor | ___________ |
| BMC available (iDRAC/iLO/IPMI)? | ___________ |
| WoL supported on machines? | ___________ |

### Choose Control Host

| Item | Your Value |
|------|------------|
| Control server hostname | ___________ |
| Control server IP | ___________ |
| Control server OS | ___________ |
| Docker available? | ___________ |
| Same subnet as lab machines? | ___________ |

### Define Roles

| Person / Team | Role |
|---------------|------|
| ___________ | admin |
| ___________ | operator |
| ___________ | viewer |

### Pre-Configure Lab Machines

- [ ] SSH key deployed on Linux machines (for shutdown in Phase 2)
- [ ] WinRM enabled on Windows machines (for shutdown in Phase 2)
- [ ] MAC addresses collected for WoL
- [ ] Machines imaged with consistent naming (`lab-pc-01`, etc.)

---

## 9.2 Development Kickoff Sequence

Follow this exact order:

```
Step A ──► Document lab (Section 9.1 above)
    │
Step B ──► Fill in design decisions (07-design-decisions.md)
    │
Step C ──► Scaffold monorepo (Phase 1, Step 1.1)
    │
Step D ──► Database schema + inventory API (Phase 1, Steps 1.2)
    │
Step E ──► Central agent — ping only (Phase 1, Step 1.3)
    │
Step F ──► Dashboard — machine status (Phase 1, Step 1.4)
    │
Step G ──► Auth + audit (Phase 1, Steps 1.5–1.6)
    │
Step H ──► MVP validation against acceptance criteria (08-mvp-scope.md)
    │
Step I ──► Phase 2: WoL + shutdown
```

---

## 9.3 Immediate Actions (This Week)

### Action 1 — Lab Inventory Spreadsheet

Create a CSV with columns:

```csv
hostname,ip,mac,os,role,tags
lab-pc-01,192.168.1.10,AA:BB:CC:DD:EE:01,linux,workstation,lab-a
lab-pc-02,192.168.1.11,AA:BB:CC:DD:EE:02,windows,workstation,lab-a
proxy-01,192.168.1.20,,linux,proxy,infra
```

### Action 2 — Control Server Setup

```bash
# On your chosen control server (Linux recommended)
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Verify
docker --version
docker compose version
```

### Action 3 — Scaffold the Project

When ready to code, initialize:

```
myapp/
├── apps/
│   ├── web/          # Next.js
│   └── api/          # FastAPI
├── agent/            # Go agent
├── doc/              # This documentation
├── docker-compose.yml
└── README.md
```

### Action 4 — First Docker Compose

Minimum services to start:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: labops
      POSTGRES_USER: labops
      POSTGRES_PASSWORD: changeme
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

  api:
    build: ./apps/api
    depends_on: [postgres, redis]
    ports:
      - "8000:8000"

  web:
    build: ./apps/web
    depends_on: [api]
    ports:
      - "3000:3000"

volumes:
  pgdata:
```

---

## 9.4 Success Milestones

| Milestone | Criteria | Target |
|-----------|----------|--------|
| **M1: Hello World** | API health endpoint responds | Week 1 |
| **M2: Inventory** | Machines in DB, visible in UI | Week 2 |
| **M3: Live Status** | Ping results updating every 30s | Week 3 |
| **M4: Auth** | Login works, roles enforced | Week 3 |
| **M5: MVP** | All v1.0 features pass acceptance criteria | Week 4–6 |
| **M6: Power** | WoL + shutdown working | Week 7–8 |

---

## 9.5 What to Share When Starting Development

When you are ready to scaffold the project, provide:

1. **Lab inventory CSV** (hostname, IP, MAC, OS)
2. **Control server details** (IP, OS, Docker yes/no)
3. **Preferred stack confirmation** (FastAPI + Next.js + Go agent, or alternatives)
4. **Auth choice** (local JWT for quick start, or LDAP/AD)
5. **Which phase to start** (recommend Phase 1)

---

## 9.6 Documentation Map

| Question | Read |
|----------|------|
| What can this platform do? | [02-capabilities](./02-capabilities-and-possibilities.md) |
| How is it architected? | [03-architecture](./03-architecture.md) |
| What will be hard? | [04-challenges](./04-challenges.md) |
| What tech to use? | [05-tech-stack](./05-tech-stack.md) |
| What to build and when? | [06-development-phases](./06-development-phases.md) |
| What decisions to make first? | [07-design-decisions](./07-design-decisions.md) |
| What is the first release? | [08-mvp-scope](./08-mvp-scope.md) |
| How do I start? | This document |

---

## 9.7 Summary

| Aspect | Verdict |
|--------|---------|
| **Feasible?** | Yes — standard control-plane + LAN agent pattern |
| **Hardest parts** | Security, gateway changes, cross-subnet WoL, device diversity |
| **Best approach** | Phased: monitor → power → proxy → routing → enterprise polish |
| **Enterprise on LAN** | RBAC, audit, alerting, inventory, runbooks |
| **Start here** | Phase 1 — inventory + ping + dashboard + auth |

---

**Previous:** [Step 8 — MVP Scope](./08-mvp-scope.md)  
**Back to index:** [00-index.md](./00-index.md)
