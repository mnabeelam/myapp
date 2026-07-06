export type MachineStatus = "up" | "down" | "unknown";
export type UserRole = "viewer" | "operator" | "admin";
export type OSType = "linux" | "windows" | "other";

export interface Machine {
  id: string;
  hostname: string;
  ip: string;
  mac: string;
  os: OSType;
  role: string;
  tags: string[];
  status: MachineStatus;
  latencyMs: number | null;
  lastChecked: string;
  subnet: string;
}

export interface Proxy {
  id: string;
  hostname: string;
  ip: string;
  port: number;
  type: "squid" | "nginx" | "haproxy";
  status: MachineStatus;
  latencyMs: number | null;
  lastChecked: string;
}

export interface Alert {
  id: string;
  machineId: string;
  machineName: string;
  type: "down" | "high_latency" | "proxy_fail";
  message: string;
  acknowledged: boolean;
  createdAt: string;
}

export interface AuditEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
}

export interface GatewayProfile {
  id: string;
  name: string;
  gatewayIp: string;
  dnsServers: string[];
  subnet: string;
}

export type TabId =
  | "overview"
  | "machines"
  | "proxies"
  | "control"
  | "alerts"
  | "audit"
  | "settings";

export interface MachineFormData {
  hostname: string;
  ip: string;
  mac: string;
  os: OSType;
  role: string;
  tags: string;
  subnet: string;
}
