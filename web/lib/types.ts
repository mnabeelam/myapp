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
  | "reports"
  | "alerts"
  | "audit"
  | "settings";

export interface TopologyNode3D {
  id: string;
  label: string;
  ip?: string;
  x: number;
  y: number;
  z: number;
  status: string;
  latencyMs?: number | null;
  color: string;
}

export interface TopologyEdge3D {
  from: string;
  to: string;
  type: string;
}

export interface Topology3DData {
  nodes: TopologyNode3D[];
  edges: TopologyEdge3D[];
  meta: { generatedAt: string; machineCount: number };
}

export interface MachineFormData {
  hostname: string;
  ip: string;
  mac: string;
  os: OSType;
  role: string;
  tags: string;
  subnet: string;
}
