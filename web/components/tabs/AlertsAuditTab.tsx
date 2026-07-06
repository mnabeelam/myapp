"use client";

import type { Alert, AuditEntry } from "@/lib/types";
import { SectionHeader } from "../ui";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface AlertsProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

export function AlertsTab({ alerts, onAcknowledge }: AlertsProps) {
  const active = alerts.filter((a) => !a.acknowledged);
  const resolved = alerts.filter((a) => a.acknowledged);

  return (
    <div>
      <SectionHeader
        title="Alerts"
        description="Machine down, high latency, and proxy failure notifications."
      />

      {active.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-status-warn">
            Active ({active.length})
          </h3>
          <div className="space-y-3">
            {active.map((a) => (
              <div
                key={a.id}
                className="card flex items-start justify-between border-status-warn/30"
              >
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-status-warn" />
                  <div>
                    <div className="font-medium">{a.machineName}</div>
                    <div className="text-sm text-[#8b9cb3]">{a.message}</div>
                    <div className="mt-1 text-xs text-[#5a6a82]">{a.createdAt}</div>
                  </div>
                </div>
                <button
                  className="btn-secondary shrink-0 text-xs"
                  onClick={() => onAcknowledge(a.id)}
                >
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {resolved.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-[#8b9cb3]">
            Acknowledged ({resolved.length})
          </h3>
          <div className="space-y-2">
            {resolved.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 rounded-lg border border-[#2a3548] bg-surface-raised/50 px-4 py-3 opacity-60"
              >
                <CheckCircle className="h-4 w-4 text-green-400" />
                <div>
                  <div className="text-sm">{a.machineName} — {a.message}</div>
                  <div className="text-xs text-[#5a6a82]">{a.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div className="card text-center text-[#5a6a82]">
          No alerts. All systems operational.
        </div>
      )}
    </div>
  );
}

interface AuditProps {
  entries: AuditEntry[];
}

export function AuditTab({ entries }: AuditProps) {
  const actionColors: Record<string, string> = {
    shutdown: "text-red-400",
    wol: "text-green-400",
    proxy_restart: "text-yellow-400",
    machine_add: "text-accent",
    machine_edit: "text-accent",
    machine_delete: "text-red-400",
    gateway_apply: "text-purple-400",
    ping: "text-[#8b9cb3]",
  };

  return (
    <div>
      <SectionHeader
        title="Audit Log"
        description="Immutable record of all actions performed in the control panel."
      />

      <div className="overflow-x-auto rounded-xl border border-[#2a3548]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a3548] bg-surface-raised text-left text-xs uppercase tracking-wide text-[#8b9cb3]">
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr
                key={e.id}
                className="border-b border-[#2a3548]/50 hover:bg-surface-raised/50"
              >
                <td className="px-4 py-3 font-mono text-xs text-[#8b9cb3]">
                  {e.timestamp}
                </td>
                <td className="px-4 py-3">{e.user}</td>
                <td className={`px-4 py-3 font-mono text-xs ${actionColors[e.action] ?? ""}`}>
                  {e.action}
                </td>
                <td className="px-4 py-3 font-medium">{e.target}</td>
                <td className="px-4 py-3 text-[#8b9cb3]">{e.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
