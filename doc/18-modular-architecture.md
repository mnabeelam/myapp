# Step 18 — Modular Architecture

myapp is built as a **modular platform** where each feature area is an independent, licensable module.

---

## 18.1 Module Design Principles

1. **Every feature belongs to a module** — no orphan features
2. **Modules declare dependencies** — e.g. M08 3D Reports requires M01 + M02
3. **License unlocks modules** — runtime check before API and UI render
4. **Modules can be enabled per tenant** — multi-tenant commercial SaaS
5. **Modules version independently** — semver per module (M02 v1.2.0)

---

## 18.2 Module Registry Structure

```typescript
interface Module {
  id: string;              // "M02"
  key: string;             // "ping_monitor"
  name: string;            // "Ping Monitor"
  description: string;
  version: string;
  dependencies: string[]; // ["M01"]
  apiRoutes: string[];    // ["/api/v1/metrics/ping"]
  uiTabs: string[];       // ["machines"]
  limits?: ModuleLimits;
}

interface ModuleLimits {
  maxMachines?: number;
  maxPingsPerMinute?: number;
  maxRetentionDays?: number;
  maxUsers?: number;
  maxSites?: number;
  maxAgents?: number;
}
```

---

## 18.3 Runtime Module Check Flow

```
Request → Auth Guard → Tenant Guard → License Guard → Module Guard → Handler
                                          │
                                    License Service
                                          │
                              ┌───────────┴───────────┐
                              │  license.key → tier   │
                              │  tier → modules[]     │
                              │  module → limits      │
                              └───────────────────────┘
```

---

## 18.4 UI Module Gating

```tsx
<ModuleGate module="M08">
  <Reports3DTab />
</ModuleGate>
```

- Locked modules show upgrade prompt with tier name
- Tabs hidden if module not licensed
- API returns `403 MODULE_NOT_LICENSED` with upgrade info

---

## 18.5 Code Organization

```
services/api/src/modules/
├── registry/
│   ├── module.registry.ts    # All module definitions
│   └── module.guard.ts         # NestJS guard
├── m01-inventory/
├── m02-ping/
├── m05-power/
├── m06-proxy/
├── m07-gateway/
├── m08-reports-3d/
├── m10-alerting/
├── m14-audit/
├── m15-auth/
└── m16-tenant/

packages/shared/
├── modules.ts                  # Shared module constants
└── licenses.ts                 # License tier definitions
```

---

## 18.6 License Key Format

```
MYAPP-{TIER}-{SIGNATURE}

Examples:
  MYAPP-LICENSEA-7f3a9c2e1b4d   → Starter
  MYAPP-LICENSEB-8a4b0d3f2c5e   → Professional
  MYAPP-LICENSEZ-9b5c1e4a3d6f   → Enterprise Unlimited
```

Validation:
1. Parse tier from key prefix
2. Verify HMAC signature against secret
3. Load tier config (modules + limits)
4. Store in DB linked to tenant
5. Cache in Redis (TTL 5 min)

---

## 18.7 Database Schema (License)

```prisma
model License {
  id          String   @id @default(uuid())
  tenantId    String   @unique
  tierKey     String   // LICENSEA, LICENSEZ
  licenseKey  String   @unique
  modules     String[] // enabled module keys
  limits      Json     // { maxMachines: 10, ... }
  expiresAt   DateTime?
  activatedAt DateTime @default(now())
}
```

---

## 18.8 API Endpoints

```
GET  /api/v1/license           # Current license info
POST /api/v1/license/activate  # Activate license key
GET  /api/v1/modules           # List all modules + enabled status
GET  /api/v1/modules/:key      # Module detail + limits
```

---

## 18.9 Enforcement Points

| Layer | Check |
|-------|-------|
| NestJS Guard | API route → required module |
| Prisma middleware | Tenant row isolation |
| BullMQ worker | Job type → module license |
| Next.js UI | ModuleGate component |
| Go agent | Register only if M17 licensed |

---

**Previous:** [17-myapp-feature-roadmap.md](./17-myapp-feature-roadmap.md)  
**Next:** [19-license-tiers.md](./19-license-tiers.md)
