# LabOps Platform — Documentation Index

Enterprise-style local lab network monitoring and control platform.

Read these documents **in order** for the full picture.

---

## Step-by-Step Guide

| Step | Document | Description |
|------|----------|-------------|
| 1 | [01-overview.md](./01-overview.md) | Project vision, goals, and scope |
| 2 | [02-capabilities-and-possibilities.md](./02-capabilities-and-possibilities.md) | What the platform can do |
| 3 | [03-architecture.md](./03-architecture.md) | System design and components |
| 4 | [04-challenges.md](./04-challenges.md) | Risks, constraints, and mitigations |
| 5 | [05-tech-stack.md](./05-tech-stack.md) | Recommended technologies |
| 6 | [06-development-phases.md](./06-development-phases.md) | Phased build plan (step by step) |
| 7 | [07-design-decisions.md](./07-design-decisions.md) | Early architectural choices |
| 8 | [08-mvp-scope.md](./08-mvp-scope.md) | Minimum viable first release |
| 9 | [09-next-steps.md](./09-next-steps.md) | How to move forward |

---

## Quick Summary

| Aspect | Verdict |
|--------|---------|
| **Feasible?** | Yes — standard control-plane + LAN agent pattern |
| **Hardest parts** | Security, gateway changes, cross-subnet WoL, device diversity |
| **Best approach** | Phased: monitor → power → proxy → routing → enterprise polish |
| **Enterprise on LAN** | RBAC, audit, alerting, inventory, runbooks |

---

*Generated: July 2026*
