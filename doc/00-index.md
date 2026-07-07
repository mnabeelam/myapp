# LabOps / myapp — Documentation Index

Enterprise local lab network monitoring, modular licensing, and 3D reporting platform.

Read documents **in order** within each section.

---

## Part 1 — MVP Foundation (Steps 1–9)

| Step | Document | Description |
|------|----------|-------------|
| 1 | [01-overview.md](./01-overview.md) | Project vision, goals, scope |
| 2 | [02-capabilities-and-possibilities.md](./02-capabilities-and-possibilities.md) | Platform capabilities |
| 3 | [03-architecture.md](./03-architecture.md) | System design |
| 4 | [04-challenges.md](./04-challenges.md) | Risks and mitigations |
| 5 | [05-tech-stack.md](./05-tech-stack.md) | MVP tech stack |
| 6 | [06-development-phases.md](./06-development-phases.md) | MVP build phases |
| 7 | [07-design-decisions.md](./07-design-decisions.md) | Design choices |
| 8 | [08-mvp-scope.md](./08-mvp-scope.md) | First release scope |
| 9 | [09-next-steps.md](./09-next-steps.md) | Getting started |

## Part 2 — Enterprise Rebuild (Steps 10–14)

| Step | Document | Description |
|------|----------|-------------|
| 10 | [10-enterprise-architecture.md](./10-enterprise-architecture.md) | Commercial v2 architecture |
| 11 | [11-enterprise-tech-stack.md](./11-enterprise-tech-stack.md) | NestJS, TimescaleDB, Go, R3F |
| 12 | [12-security-model.md](./12-security-model.md) | OIDC, MFA, mTLS, audit |
| 13 | [13-3d-reporting.md](./13-3d-reporting.md) | 3D report specifications |
| 14 | [14-build-roadmap.md](./14-build-roadmap.md) | Enterprise phases E1–E5 |

## Part 3 — NMS Research & Modular Licensing (Steps 15–20)

| Step | Document | Description |
|------|----------|-------------|
| 15 | [15-nms-market-research.md](./15-nms-market-research.md) | NMS market analysis |
| 16 | [16-nms-features-inventory.md](./16-nms-features-inventory.md) | Feature comparison matrix |
| 17 | [17-myapp-feature-roadmap.md](./17-myapp-feature-roadmap.md) | Features to build |
| 18 | [18-modular-architecture.md](./18-modular-architecture.md) | Module registry design |
| 19 | [19-license-tiers.md](./19-license-tiers.md) | LICENSEA → LICENSEZ tiers |
| 20 | [20-complete-build-phases.md](./20-complete-build-phases.md) | All phases with modules |

---

## License Tiers (Quick Reference)

| Tier | Machines | Key Modules |
|------|----------|-------------|
| **LICENSEA** | 10 | Inventory, Ping, WoL, Audit |
| **LICENSEB** | 100 | + Proxy, Gateway, 3D, Alerting |
| **LICENSEC** | 2,000 | + SNMP, SSO, Multi-tenant, Agents |
| **LICENSEZ** | Unlimited | All M01–M20 modules |

Dev keys: `MYAPP-LICENSEA-DEV-STARTER-001` … `MYAPP-LICENSEZ-DEV-ENTERPRISE-001`

---

*Updated: July 2026*
