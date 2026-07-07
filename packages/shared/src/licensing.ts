export interface ModuleLimits {
  maxMachines?: number;
  maxUsers?: number;
  maxSites?: number;
  maxAgents?: number;
  maxProxies?: number;
  maxPingsPerMinute?: number;
  minPingIntervalSec?: number;
  maxRetentionDays?: number;
}

export interface AppModule {
  id: string;
  key: string;
  name: string;
  description: string;
  dependencies: string[];
}

export const MODULES: Record<string, AppModule> = {
  M01: { id: "M01", key: "inventory", name: "Core Inventory", description: "Machine and asset inventory", dependencies: [] },
  M02: { id: "M02", key: "ping_monitor", name: "Ping Monitor", description: "ICMP availability monitoring", dependencies: ["M01"] },
  M03: { id: "M03", key: "snmp_metrics", name: "SNMP Metrics", description: "SNMP device performance", dependencies: ["M01"] },
  M04: { id: "M04", key: "service_checks", name: "Service Checks", description: "TCP/HTTP port monitoring", dependencies: ["M01"] },
  M05: { id: "M05", key: "power_ops", name: "Power Operations", description: "WoL and shutdown control", dependencies: ["M01"] },
  M06: { id: "M06", key: "proxy_manager", name: "Proxy Manager", description: "Proxy health and control", dependencies: ["M01"] },
  M07: { id: "M07", key: "gateway_controller", name: "Gateway Controller", description: "Gateway routing control", dependencies: ["M01"] },
  M08: { id: "M08", key: "reports_3d", name: "3D Reports", description: "3D network topology visualization", dependencies: ["M01", "M02"] },
  M09: { id: "M09", key: "analytics_2d", name: "2D Analytics", description: "Charts and dashboards", dependencies: ["M01", "M02"] },
  M10: { id: "M10", key: "alerting", name: "Alerting Engine", description: "Rules, notifications, escalation", dependencies: ["M02"] },
  M11: { id: "M11", key: "ncm_lite", name: "NCM Lite", description: "Config backup and diff", dependencies: ["M01"] },
  M12: { id: "M12", key: "netflow", name: "NetFlow Analysis", description: "Traffic flow analysis", dependencies: ["M01"] },
  M13: { id: "M13", key: "ipam_lite", name: "IPAM Lite", description: "Subnet and IP tracking", dependencies: ["M01"] },
  M14: { id: "M14", key: "audit", name: "Audit & Compliance", description: "Immutable audit log", dependencies: [] },
  M15: { id: "M15", key: "sso_mfa", name: "SSO & MFA", description: "OIDC, SAML, multi-factor auth", dependencies: [] },
  M16: { id: "M16", key: "multi_tenant", name: "Multi-Tenant", description: "Tenant isolation and billing", dependencies: [] },
  M17: { id: "M17", key: "distributed_agents", name: "Distributed Agents", description: "Multi-site LAN agents", dependencies: ["M02"] },
  M18: { id: "M18", key: "integrations", name: "API & Integrations", description: "Webhooks, ITSM, public API", dependencies: [] },
  M19: { id: "M19", key: "runbooks", name: "Runbook Automation", description: "Multi-step workflows", dependencies: ["M01"] },
  M20: { id: "M20", key: "path_analysis", name: "Path Analysis", description: "Hop-by-hop network path", dependencies: ["M02"] },
};

export type LicenseTierKey = "LICENSEA" | "LICENSEB" | "LICENSEC" | "LICENSEZ";

export interface LicenseTier {
  key: LicenseTierKey;
  name: string;
  tagline: string;
  modules: string[];
  limits: ModuleLimits;
}

export const LICENSE_TIERS: Record<LicenseTierKey, LicenseTier> = {
  LICENSEA: {
    key: "LICENSEA",
    name: "Starter",
    tagline: "Monitor your lab — free forever",
    modules: ["M01", "M02", "M05", "M14"],
    limits: {
      maxMachines: 10,
      maxUsers: 2,
      maxSites: 1,
      maxAgents: 1,
      maxProxies: 1,
      maxPingsPerMinute: 20,
      minPingIntervalSec: 60,
      maxRetentionDays: 7,
    },
  },
  LICENSEB: {
    key: "LICENSEB",
    name: "Professional",
    tagline: "Full control for growing labs",
    modules: ["M01", "M02", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M14", "M18"],
    limits: {
      maxMachines: 100,
      maxUsers: 10,
      maxSites: 3,
      maxAgents: 3,
      maxProxies: 5,
      maxPingsPerMinute: 500,
      minPingIntervalSec: 30,
      maxRetentionDays: 30,
    },
  },
  LICENSEC: {
    key: "LICENSEC",
    name: "Business",
    tagline: "Multi-site operations at scale",
    modules: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M13", "M14", "M15", "M16", "M17", "M18", "M19"],
    limits: {
      maxMachines: 2000,
      maxUsers: 50,
      maxSites: 20,
      maxAgents: 20,
      maxProxies: 50,
      maxPingsPerMinute: 10000,
      minPingIntervalSec: 15,
      maxRetentionDays: 90,
    },
  },
  LICENSEZ: {
    key: "LICENSEZ",
    name: "Enterprise",
    tagline: "Unlimited scale — every module",
    modules: Object.keys(MODULES),
    limits: {
      maxMachines: 999999,
      maxUsers: 999999,
      maxSites: 999999,
      maxAgents: 999999,
      maxProxies: 999999,
      maxPingsPerMinute: 500000,
      minPingIntervalSec: 5,
      maxRetentionDays: 730,
    },
  },
};

export const DEV_LICENSE_KEYS: Record<LicenseTierKey, string> = {
  LICENSEA: "MYAPP-LICENSEA-DEV-STARTER-001",
  LICENSEB: "MYAPP-LICENSEB-DEV-PRO-001",
  LICENSEC: "MYAPP-LICENSEC-DEV-BUSINESS-001",
  LICENSEZ: "MYAPP-LICENSEZ-DEV-ENTERPRISE-001",
};

export function parseLicenseKey(key: string): LicenseTierKey | null {
  const upper = key.trim().toUpperCase();
  if (upper.includes("LICENSEZ")) return "LICENSEZ";
  if (upper.includes("LICENSEC")) return "LICENSEC";
  if (upper.includes("LICENSEB")) return "LICENSEB";
  if (upper.includes("LICENSEA")) return "LICENSEA";
  return null;
}

export function getTierFromKey(key: string): LicenseTier | null {
  const tierKey = parseLicenseKey(key);
  return tierKey ? LICENSE_TIERS[tierKey] : null;
}

export function isModuleEnabled(tier: LicenseTier, moduleId: string): boolean {
  return tier.modules.includes(moduleId);
}

export function moduleKeyToId(key: string): string | undefined {
  return Object.values(MODULES).find((m) => m.key === key)?.id;
}
