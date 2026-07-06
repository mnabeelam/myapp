import type { Alert, AuditEntry, GatewayProfile, Machine, Proxy } from "./types";

export const initialMachines: Machine[] = [
  {
    id: "1",
    hostname: "lab-pc-01",
    ip: "192.168.1.10",
    mac: "AA:BB:CC:DD:EE:01",
    os: "linux",
    role: "workstation",
    tags: ["lab-a", "dev"],
    status: "up",
    latencyMs: 2,
    lastChecked: "30 sec ago",
    subnet: "192.168.1.0/24",
  },
  {
    id: "2",
    hostname: "lab-pc-02",
    ip: "192.168.1.11",
    mac: "AA:BB:CC:DD:EE:02",
    os: "windows",
    role: "workstation",
    tags: ["lab-a"],
    status: "down",
    latencyMs: null,
    lastChecked: "30 sec ago",
    subnet: "192.168.1.0/24",
  },
  {
    id: "3",
    hostname: "lab-pc-03",
    ip: "192.168.1.12",
    mac: "AA:BB:CC:DD:EE:03",
    os: "linux",
    role: "server",
    tags: ["lab-b", "testing"],
    status: "up",
    latencyMs: 5,
    lastChecked: "30 sec ago",
    subnet: "192.168.1.0/24",
  },
  {
    id: "4",
    hostname: "lab-server-01",
    ip: "192.168.1.15",
    mac: "AA:BB:CC:DD:EE:04",
    os: "linux",
    role: "server",
    tags: ["infra"],
    status: "up",
    latencyMs: 1,
    lastChecked: "30 sec ago",
    subnet: "192.168.1.0/24",
  },
];

export const initialProxies: Proxy[] = [
  {
    id: "1",
    hostname: "proxy-01",
    ip: "192.168.1.20",
    port: 3128,
    type: "squid",
    status: "up",
    latencyMs: 1,
    lastChecked: "60 sec ago",
  },
  {
    id: "2",
    hostname: "proxy-02",
    ip: "192.168.1.21",
    port: 8080,
    type: "nginx",
    status: "up",
    latencyMs: 3,
    lastChecked: "60 sec ago",
  },
];

export const initialAlerts: Alert[] = [
  {
    id: "1",
    machineId: "2",
    machineName: "lab-pc-02",
    type: "down",
    message: "Machine unreachable for 12 minutes",
    acknowledged: false,
    createdAt: "2026-07-06 18:45",
  },
  {
    id: "2",
    machineId: "3",
    machineName: "lab-pc-03",
    type: "high_latency",
    message: "Latency exceeded 50ms threshold (current: 52ms)",
    acknowledged: true,
    createdAt: "2026-07-06 17:30",
  },
];

export const initialAuditLog: AuditEntry[] = [
  {
    id: "1",
    user: "admin",
    action: "shutdown",
    target: "lab-pc-02",
    details: "Graceful shutdown via SSH",
    timestamp: "2026-07-06 18:30",
  },
  {
    id: "2",
    user: "operator",
    action: "wol",
    target: "lab-pc-01",
    details: "Wake-on-LAN magic packet sent",
    timestamp: "2026-07-06 08:00",
  },
  {
    id: "3",
    user: "admin",
    action: "proxy_restart",
    target: "proxy-01",
    details: "Squid service restarted",
    timestamp: "2026-07-06 14:15",
  },
  {
    id: "4",
    user: "operator",
    action: "machine_add",
    target: "lab-server-01",
    details: "Added to inventory",
    timestamp: "2026-07-05 10:00",
  },
];

export const gatewayProfiles: GatewayProfile[] = [
  {
    id: "1",
    name: "Default Lab Gateway",
    gatewayIp: "192.168.1.1",
    dnsServers: ["8.8.8.8", "8.8.4.4"],
    subnet: "192.168.1.0/24",
  },
  {
    id: "2",
    name: "Filtered Proxy Gateway",
    gatewayIp: "192.168.1.254",
    dnsServers: ["192.168.1.20"],
    subnet: "192.168.2.0/24",
  },
];

export const stats = {
  totalMachines: 4,
  machinesUp: 3,
  machinesDown: 1,
  avgLatency: 2.7,
  activeAlerts: 1,
  proxiesUp: 2,
};
