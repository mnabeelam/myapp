import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Box,
  Flame,
  Globe,
  LayoutDashboard,
  Lock,
  Network,
  Server,
  Settings,
  Shield,
  Sliders,
  Workflow,
  Wrench,
} from "lucide-react";

export type NavSectionId =
  | "dashboard"
  | "network"
  | "monitoring"
  | "inventory"
  | "topology"
  | "configuration"
  | "traffic"
  | "security"
  | "firewall"
  | "proxy"
  | "services"
  | "automation"
  | "reports"
  | "administration"
  | "settings";

export interface SectionTheme {
  id: NavSectionId;
  path: string;
  label: string;
  description: string;
  icon: LucideIcon;
  moduleId: string | null;
  accent: string;
  accentHover: string;
  glow: string;
  bgGradient: string;
  border: string;
  badge: string;
}

export const NAV_SECTIONS: SectionTheme[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    description: "Operations overview and key metrics",
    icon: LayoutDashboard,
    moduleId: null,
    accent: "#00d4ff",
    accentHover: "#00b8e6",
    glow: "rgba(0,212,255,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(6,4,15,0.95))",
    border: "rgba(0,212,255,0.35)",
    badge: "bg-cyan-500/20 text-cyan-300",
  },
  {
    id: "network",
    path: "/network",
    label: "Network",
    description: "Subnets, gateways, and LAN topology",
    icon: Network,
    moduleId: "M07",
    accent: "#6366f1",
    accentHover: "#4f46e5",
    glow: "rgba(99,102,241,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(6,4,15,0.95))",
    border: "rgba(99,102,241,0.35)",
    badge: "bg-indigo-500/20 text-indigo-300",
  },
  {
    id: "monitoring",
    path: "/monitoring",
    label: "Monitoring",
    description: "Live ping, alerts, and health checks",
    icon: Activity,
    moduleId: "M02",
    accent: "#34d399",
    accentHover: "#10b981",
    glow: "rgba(52,211,153,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(6,4,15,0.95))",
    border: "rgba(52,211,153,0.35)",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  {
    id: "inventory",
    path: "/inventory",
    label: "Inventory",
    description: "Machines, assets, and git-synced records",
    icon: Server,
    moduleId: "M01",
    accent: "#a78bfa",
    accentHover: "#8b5cf6",
    glow: "rgba(167,139,250,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(6,4,15,0.95))",
    border: "rgba(167,139,250,0.35)",
    badge: "bg-violet-500/20 text-violet-300",
  },
  {
    id: "topology",
    path: "/topology",
    label: "Topology",
    description: "3D network map and node relationships",
    icon: Globe,
    moduleId: "M08",
    accent: "#f472b6",
    accentHover: "#ec4899",
    glow: "rgba(244,114,182,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(244,114,182,0.12), rgba(6,4,15,0.95))",
    border: "rgba(244,114,182,0.35)",
    badge: "bg-pink-500/20 text-pink-300",
  },
  {
    id: "configuration",
    path: "/configuration",
    label: "Configuration",
    description: "Gateway profiles, DNS, and NCM settings",
    icon: Sliders,
    moduleId: "M11",
    accent: "#fbbf24",
    accentHover: "#f59e0b",
    glow: "rgba(251,191,36,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(6,4,15,0.95))",
    border: "rgba(251,191,36,0.35)",
    badge: "bg-amber-500/20 text-amber-300",
  },
  {
    id: "traffic",
    path: "/traffic",
    label: "Traffic",
    description: "Bandwidth, NetFlow, and flow analysis",
    icon: BarChart3,
    moduleId: "M12",
    accent: "#2dd4bf",
    accentHover: "#14b8a6",
    glow: "rgba(45,212,191,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(6,4,15,0.95))",
    border: "rgba(45,212,191,0.35)",
    badge: "bg-teal-500/20 text-teal-300",
  },
  {
    id: "security",
    path: "/security",
    label: "Security",
    description: "Audit log, RBAC, and compliance",
    icon: Shield,
    moduleId: "M14",
    accent: "#f87171",
    accentHover: "#ef4444",
    glow: "rgba(248,113,113,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(248,113,113,0.1), rgba(6,4,15,0.95))",
    border: "rgba(248,113,113,0.35)",
    badge: "bg-red-500/20 text-red-300",
  },
  {
    id: "firewall",
    path: "/firewall",
    label: "Firewall",
    description: "Firewall rules and policy management",
    icon: Flame,
    moduleId: "M12",
    accent: "#fb923c",
    accentHover: "#f97316",
    glow: "rgba(251,146,60,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(251,146,60,0.1), rgba(6,4,15,0.95))",
    border: "rgba(251,146,60,0.35)",
    badge: "bg-orange-500/20 text-orange-300",
  },
  {
    id: "proxy",
    path: "/proxy",
    label: "Proxy",
    description: "Proxy health, config, and restart",
    icon: Lock,
    moduleId: "M06",
    accent: "#38bdf8",
    accentHover: "#0ea5e9",
    glow: "rgba(56,189,248,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(6,4,15,0.95))",
    border: "rgba(56,189,248,0.35)",
    badge: "bg-sky-500/20 text-sky-300",
  },
  {
    id: "services",
    path: "/services",
    label: "Services",
    description: "TCP, HTTP, and port service checks",
    icon: Box,
    moduleId: "M04",
    accent: "#c084fc",
    accentHover: "#a855f7",
    glow: "rgba(192,132,252,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(192,132,252,0.12), rgba(6,4,15,0.95))",
    border: "rgba(192,132,252,0.35)",
    badge: "bg-purple-500/20 text-purple-300",
  },
  {
    id: "automation",
    path: "/automation",
    label: "Automation",
    description: "Power ops, runbooks, and control panel",
    icon: Workflow,
    moduleId: "M05",
    accent: "#4ade80",
    accentHover: "#22c55e",
    glow: "rgba(74,222,128,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(74,222,128,0.1), rgba(6,4,15,0.95))",
    border: "rgba(74,222,128,0.35)",
    badge: "bg-green-500/20 text-green-300",
  },
  {
    id: "reports",
    path: "/reports",
    label: "Reports",
    description: "Analytics, exports, and 3D visualizations",
    icon: BarChart3,
    moduleId: "M09",
    accent: "#e879f9",
    accentHover: "#d946ef",
    glow: "rgba(232,121,249,0.25)",
    bgGradient: "linear-gradient(135deg, rgba(232,121,249,0.12), rgba(6,4,15,0.95))",
    border: "rgba(232,121,249,0.35)",
    badge: "bg-fuchsia-500/20 text-fuchsia-300",
  },
  {
    id: "administration",
    path: "/administration",
    label: "Administration",
    description: "Users, license, tenants, and roles",
    icon: Wrench,
    moduleId: "M16",
    accent: "#94a3b8",
    accentHover: "#64748b",
    glow: "rgba(148,163,184,0.2)",
    bgGradient: "linear-gradient(135deg, rgba(148,163,184,0.1), rgba(6,4,15,0.95))",
    border: "rgba(148,163,184,0.3)",
    badge: "bg-slate-500/20 text-slate-300",
  },
  {
    id: "settings",
    path: "/settings",
    label: "Settings",
    description: "Platform config, git sync, monitoring prefs",
    icon: Settings,
    moduleId: null,
    accent: "#8b9cb3",
    accentHover: "#e8edf4",
    glow: "rgba(139,156,179,0.15)",
    bgGradient: "linear-gradient(135deg, rgba(139,156,179,0.08), rgba(6,4,15,0.95))",
    border: "rgba(139,156,179,0.25)",
    badge: "bg-gray-500/20 text-gray-300",
  },
];

export function getSectionByPath(pathname: string): SectionTheme {
  return (
    NAV_SECTIONS.find((s) => pathname === s.path || pathname.startsWith(s.path + "/")) ??
    NAV_SECTIONS[0]
  );
}

export function getVisibleSections(
  hasModule: (moduleId: string) => boolean
): SectionTheme[] {
  return NAV_SECTIONS.filter(
    (s) => s.moduleId === null || hasModule(s.moduleId)
  );
}
