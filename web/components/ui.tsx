import type { TabId } from "@/lib/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bell,
  ClipboardList,
  LayoutDashboard,
  Globe,
  Server,
  Sliders,
  Zap,
  BarChart3,
} from "lucide-react";
export const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "machines", label: "Machines", icon: Server },
  { id: "proxies", label: "Proxies", icon: Globe },
  { id: "control", label: "Control Panel", icon: Zap },
  { id: "reports", label: "Reports 3D", icon: BarChart3 },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "audit", label: "Audit Log", icon: ClipboardList },
  { id: "settings", label: "Settings", icon: Sliders },
];

export function StatusDot({ status }: { status: "up" | "down" | "unknown" }) {
  const cls =
    status === "up"
      ? "status-dot-up"
      : status === "down"
        ? "status-dot-down"
        : "status-dot-unknown";
  return <span className={cls} title={status} />;
}

export function StatusBadge({ status }: { status: "up" | "down" | "unknown" }) {
  const colors = {
    up: "badge-glow bg-emerald-500/15 text-emerald-300 border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.2)]",
    down: "badge-glow bg-red-500/15 text-red-300 border-red-400/40 shadow-[0_0_12px_rgba(248,113,113,0.2)]",
    unknown: "badge-glow bg-gray-500/15 text-gray-400 border-gray-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${colors[status]}`}
    >
      <StatusDot status={status} />
      {status}
    </span>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "text-accent",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: string;
}) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`icon-3d h-11 w-11 shrink-0 ${color}`}>
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <div>
        <div className="text-xs text-[var(--muted)]">{label}</div>
        <div className="text-2xl font-extrabold text-gradient-dynamic">{value}</div>
        {sub && <div className="text-xs text-[#5a6488]">{sub}</div>}
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          <span className="text-gradient-dynamic">{title}</span>
        </h2>
        {description && (
          <p className="mt-0.5 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-[#5a6a82]">
      <Activity className="mb-3 h-8 w-8 opacity-40" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
