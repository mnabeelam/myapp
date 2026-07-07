"use client";

import Link from "next/link";
import type { Alert, AuditEntry, Machine, Proxy } from "@/lib/types";
import { gatewayProfiles } from "@/lib/data";
import {
  computeDashboardMetrics,
  formatActionLabel,
  recentEvents,
} from "@/lib/dashboard-metrics";
import { StatusBadge } from "@/components/ui";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Cpu,
  Flame,
  Globe,
  HardDrive,
  LayoutGrid,
  Network,
  Power,
  RefreshCw,
  Router,
  Server,
  Shield,
  TrendingUp,
  Wifi,
  Zap,
} from "lucide-react";

interface Props {
  machines: Machine[];
  proxies: Proxy[];
  alerts: Alert[];
  auditLog: AuditEntry[];
}

function WidgetShell({
  title,
  icon: Icon,
  children,
  className = "",
  action,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={`dashboard-widget section-card rounded-2xl border p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--section-accent)]">
          <Icon className="h-4 w-4" />
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function HealthRing({ score, label }: { score: number; label: string }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color =
    score >= 90 ? "#34d399" : score >= 75 ? "#00d4ff" : score >= 50 ? "#fbbf24" : "#f87171";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="140" height="140" className="-rotate-90">
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="health-ring-progress"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold" style={{ color }}>
            {score}%
          </span>
          <span className="text-xs text-[var(--muted)]">{label}</span>
        </div>
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  sub,
  icon: Icon,
  tone = "cyan",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  const tones = {
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-400/30 text-cyan-300",
    green: "from-emerald-500/20 to-emerald-500/5 border-emerald-400/30 text-emerald-300",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-400/30 text-amber-300",
    red: "from-red-500/20 to-red-500/5 border-red-400/30 text-red-300",
  };

  return (
    <div
      className={`dashboard-stat-pill flex items-center gap-3 rounded-xl border bg-gradient-to-br p-4 ${tones[tone]}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/25">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-wider opacity-70">
          {label}
        </div>
        <div className="text-xl font-bold text-white">{value}</div>
        {sub && <div className="truncate text-[10px] opacity-60">{sub}</div>}
      </div>
    </div>
  );
}

function InfraCard({
  label,
  status,
  detail,
  metric,
  icon: Icon,
}: {
  label: string;
  status: "up" | "down" | "degraded";
  detail: string;
  metric?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const statusColors = {
    up: "text-emerald-400 bg-emerald-500/15 border-emerald-400/30",
    down: "text-red-400 bg-red-500/15 border-red-400/30",
    degraded: "text-amber-400 bg-amber-500/15 border-amber-400/30",
  };

  return (
    <div className="infra-card rounded-xl border border-[var(--section-border)] bg-black/20 p-3">
      <div className="mb-2 flex items-center justify-between">
        <Icon className="h-4 w-4 text-[var(--section-accent)]" />
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-0.5 truncate text-[10px] text-[var(--muted)]">{detail}</div>
      {metric && (
        <div className="mt-1 font-mono text-xs text-[var(--section-accent)]">{metric}</div>
      )}
    </div>
  );
}

function ResourceBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px]">
        <span className="text-[var(--muted)]">{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="resource-bar-fill h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

const QUICK_ACTIONS = [
  { href: "/automation", label: "Wake Machine", icon: Power, color: "#34d399" },
  { href: "/automation", label: "Run Ping", icon: Activity, color: "#00d4ff" },
  { href: "/proxy", label: "Restart Proxy", icon: RefreshCw, color: "#38bdf8" },
  { href: "/monitoring", label: "View Alerts", icon: AlertTriangle, color: "#fbbf24" },
  { href: "/inventory", label: "Add Machine", icon: Server, color: "#a78bfa" },
  { href: "/reports", label: "3D Topology", icon: BarChart3, color: "#f472b6" },
];

export function DashboardView({ machines, proxies, alerts, auditLog }: Props) {
  const m = computeDashboardMetrics(machines, proxies, alerts, gatewayProfiles);
  const events = recentEvents(auditLog);

  return (
    <div className="dashboard-grid space-y-5">
      {/* Widgets header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          <LayoutGrid className="h-4 w-4 text-[var(--section-accent)]" />
          Live Widgets
        </div>
        <span className="rounded-full border border-[var(--section-border)] px-3 py-1 text-[10px] text-[var(--muted)]">
          Auto-refresh · 30s
        </span>
      </div>

      {/* Row 1: Health hero + KPI pills */}
      <div className="grid gap-4 lg:grid-cols-12">
        <WidgetShell
          title="Overall Network Health"
          icon={Network}
          className="lg:col-span-4"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
            <HealthRing score={m.healthScore} label={m.healthLabel} />
            <div className="grid grid-cols-2 gap-3 text-center sm:text-left">
              {[
                { k: "Uptime", v: `${Math.round((m.machinesOnline / Math.max(m.machinesTotal, 1)) * 100)}%` },
                { k: "Proxies", v: `${m.proxiesOnline}/${m.proxiesTotal}` },
                { k: "Gateways", v: `${gatewayProfiles.length}` },
                { k: "Subnets", v: `${new Set(machines.map((x) => x.subnet)).size}` },
              ].map((item) => (
                <div key={item.k} className="rounded-lg bg-black/20 px-3 py-2">
                  <div className="text-[10px] text-[var(--muted)]">{item.k}</div>
                  <div className="font-mono text-sm font-bold text-[var(--section-accent)]">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WidgetShell>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          <StatPill
            label="Machines Online"
            value={`${m.machinesOnline}/${m.machinesTotal}`}
            sub={m.machinesDown > 0 ? `${m.machinesDown} offline` : "All reachable"}
            icon={Server}
            tone={m.machinesDown > 0 ? "amber" : "green"}
          />
          <StatPill
            label="Avg. Latency"
            value={m.avgLatency !== null ? `${m.avgLatency.toFixed(1)}ms` : "—"}
            sub="Across online hosts"
            icon={TrendingUp}
            tone="cyan"
          />
          <StatPill
            label="Proxy Online"
            value={`${m.proxiesOnline}/${m.proxiesTotal}`}
            sub="Squid & nginx"
            icon={Globe}
            tone={m.proxiesOnline === m.proxiesTotal ? "green" : "amber"}
          />
          <StatPill
            label="Active Alerts"
            value={m.activeAlerts}
            sub={m.activeAlerts > 0 ? "Needs attention" : "All clear"}
            icon={AlertTriangle}
            tone={m.activeAlerts > 0 ? "red" : "green"}
          />
        </div>
      </div>

      {/* Row 2: Infrastructure status strip */}
      <WidgetShell title="Infrastructure Status" icon={Router}>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <InfraCard {...m.infra[0]} icon={Globe} />
          <InfraCard {...m.infra[1]} icon={Router} />
          <InfraCard {...m.infra[2]} icon={Flame} />
          <InfraCard {...m.infra[3]} icon={Wifi} />
          <InfraCard {...m.infra[4]} icon={Shield} />
        </div>
      </WidgetShell>

      {/* Row 3: Device / Server / Resources */}
      <div className="grid gap-4 lg:grid-cols-3">
        <WidgetShell title="Device Status" icon={HardDrive}>
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                {[
                  { count: m.deviceBreakdown.up, color: "#34d399" },
                  { count: m.deviceBreakdown.down, color: "#f87171" },
                  { count: m.deviceBreakdown.unknown, color: "#6b7280" },
                ].map((seg, i, arr) => {
                  const total = m.machinesTotal || 1;
                  const pct = (seg.count / total) * 100;
                  const prev = arr
                    .slice(0, i)
                    .reduce((s, x) => s + (x.count / total) * 100, 0);
                  return (
                    <circle
                      key={seg.color}
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="3.2"
                      strokeDasharray={`${pct} ${100 - pct}`}
                      strokeDashoffset={-prev}
                      className="device-donut-segment"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                {m.machinesTotal}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: "Online", count: m.deviceBreakdown.up, color: "#34d399" },
                { label: "Offline", count: m.deviceBreakdown.down, color: "#f87171" },
                { label: "Unknown", count: m.deviceBreakdown.unknown, color: "#6b7280" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: row.color, boxShadow: `0 0 6px ${row.color}` }}
                  />
                  <span className="text-[var(--muted)]">{row.label}</span>
                  <span className="ml-auto font-mono font-semibold">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </WidgetShell>

        <WidgetShell title="Server Status" icon={Server}>
          {m.servers.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No servers in inventory.</p>
          ) : (
            <div className="space-y-2">
              {m.servers.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--section-border)] bg-black/20 px-3 py-2"
                >
                  <div>
                    <div className="text-sm font-medium">{s.hostname}</div>
                    <div className="font-mono text-[10px] text-[var(--muted)]">{s.ip}</div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>
          )}
        </WidgetShell>

        <WidgetShell title="CPU & Memory Usage" icon={Cpu}>
          {m.serverResources.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No server metrics available.</p>
          ) : (
            <div className="space-y-4">
              {m.serverResources.map((s) => (
                <div key={s.hostname}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium">{s.hostname}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="space-y-2">
                    <ResourceBar label="CPU" value={s.cpu} color="#00d4ff" />
                    <ResourceBar label="Memory" value={s.memory} color="#a78bfa" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </WidgetShell>
      </div>

      {/* Row 4: Bandwidth, Machine Status, Alerts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <WidgetShell title="Top Bandwidth Users" icon={BarChart3}>
          {m.bandwidthUsers.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No active traffic.</p>
          ) : (
            <div className="space-y-3">
              {m.bandwidthUsers.map((u, i) => (
                <div key={u.ip}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium">
                      <span className="mr-2 font-mono text-[var(--muted)]">#{i + 1}</span>
                      {u.hostname}
                    </span>
                    <span className="font-mono text-[var(--section-accent)]">{u.mbps} Mbps</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="bandwidth-bar h-full rounded-full"
                      style={{
                        width: `${u.pct}%`,
                        background: `linear-gradient(90deg, var(--section-accent), #8b5cf6)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </WidgetShell>

        <WidgetShell
          title="Machine Status"
          icon={Activity}
          action={
            <Link
              href="/inventory"
              className="text-[10px] text-[var(--section-accent)] hover:underline"
            >
              View all
            </Link>
          }
        >
          <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
            {machines.map((machine) => (
              <div
                key={machine.id}
                className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 transition hover:bg-black/30"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{machine.hostname}</div>
                  <div className="font-mono text-[10px] text-[var(--muted)]">{machine.ip}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {machine.latencyMs !== null && (
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      {machine.latencyMs}ms
                    </span>
                  )}
                  <StatusBadge status={machine.status} />
                </div>
              </div>
            ))}
          </div>
        </WidgetShell>

        <WidgetShell
          title="Active Alerts"
          icon={AlertTriangle}
          action={
            <Link
              href="/monitoring"
              className="text-[10px] text-[var(--section-accent)] hover:underline"
            >
              Open monitoring
            </Link>
          }
        >
          {alerts.filter((a) => !a.acknowledged).length === 0 ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-emerald-300">All clear</p>
              <p className="text-xs text-[var(--muted)]">No unacknowledged alerts</p>
            </div>
          ) : (
            <div className="space-y-2">
              {alerts
                .filter((a) => !a.acknowledged)
                .slice(0, 5)
                .map((a) => (
                  <div
                    key={a.id}
                    className="rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2"
                  >
                    <div className="text-sm font-medium text-amber-200">{a.machineName}</div>
                    <div className="text-xs text-amber-200/70">{a.message}</div>
                    <div className="mt-1 text-[10px] text-[var(--muted)]">{a.createdAt}</div>
                  </div>
                ))}
            </div>
          )}
        </WidgetShell>
      </div>

      {/* Row 5: Events + Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        <WidgetShell title="Recent Events" icon={Zap}>
          <div className="space-y-0">
            {events.map((e, i) => (
              <div
                key={e.id}
                className="event-row flex gap-3 border-b border-white/5 py-3 last:border-0"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: "var(--section-accent)",
                      boxShadow: "0 0 8px var(--section-glow)",
                    }}
                  />
                  {i < events.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-white/10" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-[var(--section-accent)]">
                      {formatActionLabel(e.action)}
                    </span>
                    <span className="text-[var(--muted)]">→</span>
                    <span className="truncate font-medium">{e.target}</span>
                  </div>
                  <div className="text-xs text-[var(--muted)]">{e.details}</div>
                  <div className="mt-0.5 text-[10px] text-[#5a6488]">
                    {e.user} · {e.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </WidgetShell>

        <WidgetShell title="Quick Actions" icon={Zap}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="quick-action-card group flex flex-col items-center gap-2 rounded-xl border border-[var(--section-border)] bg-black/20 p-4 text-center transition hover:-translate-y-0.5"
                  style={{ ["--qa-color" as string]: action.color }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:scale-110"
                    style={{
                      background: `${action.color}22`,
                      border: `1px solid ${action.color}44`,
                      boxShadow: `0 0 16px ${action.color}22`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-medium text-[var(--text)]">{action.label}</span>
                  <ArrowRight className="h-3 w-3 text-[var(--muted)] opacity-0 transition group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </WidgetShell>
      </div>
    </div>
  );
}
