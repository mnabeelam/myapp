import type { Alert, AuditEntry, GatewayProfile, Machine, Proxy } from "./types";

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function pseudoPercent(id: string, min: number, max: number): number {
  const range = max - min;
  return min + (hashSeed(id) % (range + 1));
}

export interface InfraStatus {
  label: string;
  status: "up" | "down" | "degraded";
  detail: string;
  metric?: string;
}

export interface BandwidthUser {
  hostname: string;
  ip: string;
  mbps: number;
  pct: number;
}

export interface ServerResource {
  hostname: string;
  ip: string;
  status: Machine["status"];
  cpu: number;
  memory: number;
}

export interface DashboardMetrics {
  healthScore: number;
  healthLabel: string;
  machinesOnline: number;
  machinesTotal: number;
  machinesDown: number;
  avgLatency: number | null;
  proxiesOnline: number;
  proxiesTotal: number;
  activeAlerts: number;
  deviceBreakdown: { up: number; down: number; unknown: number };
  servers: Machine[];
  bandwidthUsers: BandwidthUser[];
  serverResources: ServerResource[];
  infra: InfraStatus[];
}

export function computeDashboardMetrics(
  machines: Machine[],
  proxies: Proxy[],
  alerts: Alert[],
  gateways: GatewayProfile[]
): DashboardMetrics {
  const up = machines.filter((m) => m.status === "up").length;
  const down = machines.filter((m) => m.status === "down").length;
  const unknown = machines.filter((m) => m.status === "unknown").length;
  const latencies = machines
    .map((m) => m.latencyMs)
    .filter((l): l is number => l !== null);
  const avgLatency =
    latencies.length > 0
      ? latencies.reduce((a, b) => a + b, 0) / latencies.length
      : null;

  const proxiesOnline = proxies.filter((p) => p.status === "up").length;
  const activeAlerts = alerts.filter((a) => !a.acknowledged).length;
  const servers = machines.filter((m) => m.role === "server");

  const uptimeRatio = machines.length ? up / machines.length : 1;
  const proxyRatio = proxies.length ? proxiesOnline / proxies.length : 1;
  const alertPenalty = Math.min(activeAlerts * 8, 40);
  const latencyPenalty =
    avgLatency !== null && avgLatency > 30
      ? Math.min((avgLatency - 30) * 0.5, 15)
      : 0;

  const healthScore = Math.round(
    Math.max(
      0,
      Math.min(100, uptimeRatio * 55 + proxyRatio * 25 + 20 - alertPenalty - latencyPenalty)
    )
  );

  const healthLabel =
    healthScore >= 90
      ? "Excellent"
      : healthScore >= 75
        ? "Good"
        : healthScore >= 50
          ? "Degraded"
          : "Critical";

  const maxBw = Math.max(
    ...machines.map((m) => (m.status === "up" ? pseudoPercent(m.id, 12, 98) : 0)),
    1
  );

  const bandwidthUsers = [...machines]
    .filter((m) => m.status === "up")
    .map((m) => {
      const mbps = pseudoPercent(m.id, 12, 98);
      return {
        hostname: m.hostname,
        ip: m.ip,
        mbps,
        pct: Math.round((mbps / maxBw) * 100),
      };
    })
    .sort((a, b) => b.mbps - a.mbps)
    .slice(0, 5);

  const serverResources: ServerResource[] = servers.map((m) => ({
    hostname: m.hostname,
    ip: m.ip,
    status: m.status,
    cpu: m.status === "up" ? pseudoPercent(m.id + "cpu", 18, 82) : 0,
    memory: m.status === "up" ? pseudoPercent(m.id + "mem", 24, 76) : 0,
  }));

  const gatewayUp = gateways.length > 0 && up > 0;
  const internetUp = up >= Math.ceil(machines.length * 0.5) && gatewayUp;

  const infra: InfraStatus[] = [
    {
      label: "Internet",
      status: internetUp ? "up" : down > 0 ? "degraded" : "down",
      detail: internetUp ? "WAN link stable" : "Connectivity issues",
      metric: internetUp ? "42ms RTT" : "—",
    },
    {
      label: "Gateway",
      status: gatewayUp ? "up" : "down",
      detail: gateways[0]?.name ?? "No gateway",
      metric: gateways[0]?.gatewayIp ?? "—",
    },
    {
      label: "Firewall",
      status: activeAlerts > 2 ? "degraded" : "up",
      detail: activeAlerts > 0 ? `${activeAlerts} policy alerts` : "All rules active",
      metric: "iptables",
    },
    {
      label: "Wireless",
      status: up > 0 ? "up" : "down",
      detail: "Lab WLAN",
      metric: `${Math.max(up, 1)} clients`,
    },
    {
      label: "VPN",
      status: proxiesOnline > 0 ? "up" : "degraded",
      detail: proxiesOnline > 0 ? "Tunnel established" : "No tunnel",
      metric: `${proxiesOnline} tunnels`,
    },
  ];

  return {
    healthScore,
    healthLabel,
    machinesOnline: up,
    machinesTotal: machines.length,
    machinesDown: down,
    avgLatency,
    proxiesOnline,
    proxiesTotal: proxies.length,
    activeAlerts,
    deviceBreakdown: { up, down, unknown },
    servers,
    bandwidthUsers,
    serverResources,
    infra,
  };
}

export function formatActionLabel(action: string): string {
  return action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function recentEvents(auditLog: AuditEntry[], limit = 6): AuditEntry[] {
  return auditLog.slice(0, limit);
}
