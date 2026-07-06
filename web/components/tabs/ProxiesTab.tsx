"use client";

import type { Proxy } from "@/lib/types";
import { SectionHeader, StatusBadge } from "../ui";
import { RefreshCw, RotateCcw } from "lucide-react";

interface Props {
  proxies: Proxy[];
  onAction: (action: string, target: string, details: string) => void;
}

export function ProxiesTab({ proxies, onAction }: Props) {
  const handleRestart = (p: Proxy) => {
    if (confirm(`Restart ${p.hostname}? Service will be briefly unavailable.`)) {
      onAction("proxy_restart", p.hostname, `${p.type} service restarted`);
      alert(`${p.hostname} restart initiated.`);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Proxy Servers"
        description="Monitor proxy health, view status, and restart services."
        action={
          <button className="btn-secondary flex items-center gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh All
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {proxies.map((p) => (
          <div key={p.id} className="card">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{p.hostname}</h3>
                <p className="font-mono text-xs text-[#8b9cb3]">
                  {p.ip}:{p.port}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-[#8b9cb3]">Type</div>
                <div className="capitalize">{p.type}</div>
              </div>
              <div>
                <div className="text-xs text-[#8b9cb3]">Latency</div>
                <div className="font-mono">
                  {p.latencyMs !== null ? `${p.latencyMs}ms` : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8b9cb3]">Last Check</div>
                <div>{p.lastChecked}</div>
              </div>
              <div>
                <div className="text-xs text-[#8b9cb3]">Port</div>
                <div className="font-mono">{p.port}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="btn-secondary flex flex-1 items-center justify-center gap-1.5 text-xs"
                onClick={() => alert(`Config for ${p.hostname}:\n\n# ${p.type} configuration\n# (read-only preview)`)}
              >
                View Config
              </button>
              <button
                className="btn-danger flex items-center gap-1.5 text-xs"
                onClick={() => handleRestart(p)}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
