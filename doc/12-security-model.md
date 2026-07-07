# Step 12 — Security Model

High-security design for commercial deployment and heavy network operations.

---

## 12.1 Security Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: Network — TLS, firewall, VPN  │
├─────────────────────────────────────────┤
│  Layer 2: Identity — OIDC, MFA, RBAC  │
├─────────────────────────────────────────┤
│  Layer 3: Application — validation,    │
│           rate limits, CSRF, CSP         │
├─────────────────────────────────────────┤
│  Layer 4: Data — encryption at rest,    │
│           tenant isolation, audit        │
├─────────────────────────────────────────┤
│  Layer 5: Operations — approval flows,  │
│           least privilege, rollback      │
└─────────────────────────────────────────┘
```

---

## 12.2 Authentication & Authorization

| Feature | Implementation |
|---------|----------------|
| **SSO** | Keycloak OIDC — LDAP, AD, Google Workspace |
| **MFA** | TOTP + WebAuthn via Keycloak |
| **RBAC** | Roles: `viewer`, `operator`, `admin`, `superadmin` |
| **ABAC** | Per-machine tags — operator only on `lab-a` machines |
| **API keys** | Scoped keys for integrations (read-only default) |
| **Session** | Short-lived JWT (15m) + refresh token (7d, rotating) |

### NestJS guards

```typescript
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('admin')
@Post('operations/shutdown')
```

---

## 12.3 Agent Security

| Threat | Mitigation |
|--------|------------|
| Rogue agent | mTLS — agent cert signed by internal CA |
| Stolen agent cert | Cert rotation, revocation list in Redis |
| Command injection | Allowlisted operations only; no arbitrary shell |
| Credential exposure | Vault dynamic secrets; never in DB plaintext |

**Agent ↔ API:** Mutual TLS + signed job payloads.

---

## 12.4 Data Protection

| Data | Protection |
|------|------------|
| Passwords | bcrypt (local) or delegated to Keycloak |
| SSH keys | Vault transit encryption |
| API secrets | AES-256-GCM, key in Vault |
| Metrics | Tenant-scoped queries; RLS in PostgreSQL |
| Audit log | Append-only; no UPDATE/DELETE for app role |
| Backups | Encrypted at rest (S3 SSE or volume encryption) |

---

## 12.5 Application Hardening

| Control | Tool |
|---------|------|
| HTTP headers | Helmet (CSP, HSTS, X-Frame-Options) |
| Rate limiting | `@nestjs/throttler` — 100 req/min per user |
| Input validation | `class-validator` + whitelist |
| SQL injection | Prisma parameterized queries |
| XSS | React auto-escape + strict CSP |
| CORS | Allowlist origins per tenant |
| Dependency scan | `npm audit`, Dependabot, Snyk |
| Container scan | Trivy in CI |

---

## 12.6 Destructive Operations

| Operation | Required Controls |
|-----------|-------------------|
| Shutdown | Admin role + confirmation + audit |
| Gateway change | Dry-run + rollback script + optional 2-person approval |
| Bulk WoL | Rate limit 50/hour per operator |
| Config deploy | Versioned templates + diff preview |

---

## 12.7 Audit & Compliance

| Requirement | Implementation |
|-------------|----------------|
| Who did what | `audit_events` table — user, action, target, IP, timestamp |
| Immutable | DB trigger blocks UPDATE/DELETE on audit table |
| Export | CSV/JSON export for SIEM (Splunk, Elastic) |
| Retention | Configurable per tenant (90d – 7y) |
| SOC2 prep | Access logs, change management, encryption docs |

---

## 12.8 Commercial Security Features

| Feature | Tier |
|---------|------|
| RBAC | All |
| Audit log | All |
| MFA | Pro+ |
| SSO (SAML/OIDC) | Enterprise |
| mTLS agents | Enterprise |
| Vault integration | Enterprise |
| IP allowlist | Enterprise |
| Dedicated tenant DB | Enterprise |

---

**Previous:** [11-enterprise-tech-stack.md](./11-enterprise-tech-stack.md)  
**Next:** [13-3d-reporting.md](./13-3d-reporting.md)
