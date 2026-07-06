"use client";

import type { Alert, Machine, Proxy } from "@/lib/types";
import { StatCard, StatusBadge } from "../ui";
import {
  Activity,
  AlertTriangle,
  Globe,
  Server,
  TrendingUp,
} from "lucide-react";

interface Props {
  machines: Machine[];
  proxies: Proxy[];
  alerts: Alert[];
}

export function OverviewTab({ machines, proxies, alerts }: Props) {
  const up = machines.filter((m) => m.status === "up").length;
  const down = machines.filter((m) => m.status === "down").length;
  const latencies = machines
    .map((m) => m.latencyMs)
    .filter((l): l is number => l !== null);
  const avgLatency =
    latencies.length > 0
      ? (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(1)
      : "—";
  const activeAlerts = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Machines Online"
          value={`${up}/${machines.length}`}
          sub={`${down} down`}
          icon={Server}
          color="text-green-400"
        />
        <StatCard
          label="Avg Latency"
          value={avgLatency === "—" ? "—" : `${avgLatency}ms`}
          sub="Across online hosts"
          icon={TrendingUp}
        />
        <StatCard
          label="Proxies Online"
          value={`${proxies.filter((p) => p.status === "up").length}/${proxies.length}`}
          icon={Globe}
          color="text-green-400"
        />
        <StatCard
          label="Active Alerts"
          value={activeAlerts}
          sub={activeAlerts > 0 ? "Requires attention" : "All clear"}
          icon={AlertTriangle}
          color={activeAlerts > 0 ? "text-status-warn" : "text-green-400"}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 flex items-center gap-2 font-medium">
            <Activity className="h-4 w-4 text-accent" /> Machine Status
          </h3>
          <div className="space-y-2">
            {machines.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg bg-surface px-3 py-2"
              >
                <div>
                  <div className="text-sm font-medium">{m.hostname}</div>
                  <div className="font-mono text-xs text-[#5a6a82]">{m.ip}</div>
                </div>
                <div className="flex items-center gap-3">
                  {m.latencyMs !== null && (
                    <span className="font-mono text-xs text-[#8b9cb3]">
                      {m.latencyMs}ms
                    </span>
                  )}
                  <StatusBadge status={m.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4 text-status-warn" /> Recent Alerts
          </h3>
          {alerts.length === 0 ? (
            <p className="text-sm text-[#5a6a82]">No alerts.</p>
          ) : (
            <div className="space-y-2">
              {alerts.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    a.acknowledged
                      ? "bg-surface text-[#5a6a82]"
                      : "bg-status-warn/10 text-status-warn"
                  }`}
                >
                  <div className="font-medium">{a.machineName}</div>
                  <div className="text-xs opacity-80">{a.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
