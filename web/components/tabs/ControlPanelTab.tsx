"use client";

import type { Machine, Proxy } from "@/lib/types";
import { gatewayProfiles as fallbackGateways } from "@/lib/data";
import { SectionHeader } from "../ui";
import { Globe, Network, Power, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchGateways } from "@/lib/api";
import type { GatewayProfile } from "@/lib/types";

interface Props {
  machines: Machine[];
  proxies: Proxy[];
  onAction: (action: string, target: string, details: string) => void;
}

export function ControlPanelTab({ machines, proxies, onAction }: Props) {
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedProxy, setSelectedProxy] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("");
  const [targetIp, setTargetIp] = useState("");
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [gateways, setGateways] = useState<GatewayProfile[]>(fallbackGateways);

  useEffect(() => {
    fetchGateways().then(setGateways).catch(() => {});
  }, []);

  const runPing = () => {
    if (!targetIp) return;
    const latency = Math.floor(Math.random() * 20) + 1;
    const up = Math.random() > 0.2;
    setPingResult(
      up
        ? `✓ ${targetIp} is reachable — ${latency}ms`
        : `✗ ${targetIp} is unreachable — request timed out`
    );
    onAction("ping", targetIp, up ? `Latency ${latency}ms` : "Host unreachable");
  };

  const runWoL = () => {
    const m = machines.find((x) => x.id === selectedMachine);
    if (!m) return alert("Select a machine first.");
    if (!m.mac) return alert("MAC address required for WoL.");
    onAction("wol", m.hostname, `Magic packet sent to ${m.mac}`);
    alert(`WoL sent to ${m.hostname}`);
  };

  const runShutdown = () => {
    const m = machines.find((x) => x.id === selectedMachine);
    if (!m) return alert("Select a machine first.");
    if (!confirm(`Shut down ${m.hostname}?`)) return;
    onAction("shutdown", m.hostname, "Graceful shutdown initiated");
    alert(`Shutdown command sent to ${m.hostname}`);
  };

  const runProxyRestart = () => {
    const p = proxies.find((x) => x.id === selectedProxy);
    if (!p) return alert("Select a proxy first.");
    if (!confirm(`Restart ${p.hostname}?`)) return;
    onAction("proxy_restart", p.hostname, "Service restart initiated");
    alert(`Restart initiated for ${p.hostname}`);
  };

  const applyGateway = () => {
    const m = machines.find((x) => x.id === selectedMachine);
    const g = gateways.find((x) => x.id === selectedGateway);
    if (!m || !g) return alert("Select both a machine and gateway profile.");
    if (
      !confirm(
        `Apply gateway ${g.gatewayIp} to ${m.hostname}? This may affect network connectivity.`
      )
    )
      return;
    onAction(
      "gateway_apply",
      m.hostname,
      `Gateway set to ${g.gatewayIp}, DNS: ${g.dnsServers.join(", ")}`
    );
    alert(`Gateway profile "${g.name}" applied to ${m.hostname}`);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Control Panel"
        description="Run network operations — power, ping, proxy, and gateway controls."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Ping Tool */}
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <Network className="h-4 w-4 text-accent" />
            <h3 className="font-medium">Ping Check</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="label-field">
                Target IP <span className="text-red-400">*</span>
              </label>
              <input
                className="input-field font-mono"
                placeholder="192.168.1.10"
                value={targetIp}
                onChange={(e) => setTargetIp(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full text-sm" onClick={runPing}>
              Run Ping
            </button>
            {pingResult && (
              <div
                className={`rounded-lg p-3 font-mono text-xs ${
                  pingResult.startsWith("✓")
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {pingResult}
              </div>
            )}
          </div>
        </div>

        {/* Power Control */}
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <Power className="h-4 w-4 text-accent" />
            <h3 className="font-medium">Power Control</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="label-field">
                Target Machine <span className="text-red-400">*</span>
              </label>
              <select
                className="input-field"
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
              >
                <option value="">— Select machine —</option>
                {machines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.hostname} ({m.ip})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn-secondary flex items-center justify-center gap-1.5 text-sm"
                onClick={runWoL}
              >
                <Wifi className="h-3.5 w-3.5" /> Wake (WoL)
              </button>
              <button
                className="btn-danger flex items-center justify-center gap-1.5 text-sm"
                onClick={runShutdown}
              >
                <Power className="h-3.5 w-3.5" /> Shutdown
              </button>
            </div>
          </div>
        </div>

        {/* Proxy Control */}
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-accent" />
            <h3 className="font-medium">Proxy Control</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="label-field">
                Proxy Server <span className="text-red-400">*</span>
              </label>
              <select
                className="input-field"
                value={selectedProxy}
                onChange={(e) => setSelectedProxy(e.target.value)}
              >
                <option value="">— Select proxy —</option>
                {proxies.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.hostname} ({p.ip}:{p.port})
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn-danger w-full text-sm"
              onClick={runProxyRestart}
            >
              Restart Proxy Service
            </button>
          </div>
        </div>

        {/* Gateway Control */}
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <Network className="h-4 w-4 text-accent" />
            <h3 className="font-medium">Gateway Control</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="label-field">
                Target Machine <span className="text-red-400">*</span>
              </label>
              <select
                className="input-field"
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
              >
                <option value="">— Select machine —</option>
                {machines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.hostname} ({m.ip})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-field">
                Gateway Profile <span className="text-red-400">*</span>
              </label>
              <select
                className="input-field"
                value={selectedGateway}
                onChange={(e) => setSelectedGateway(e.target.value)}
              >
                <option value="">— Select profile —</option>
                {gateways.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.gatewayIp}
                  </option>
                ))}
              </select>
            </div>
            {selectedGateway && (
              <div className="rounded-lg bg-surface p-3 text-xs text-[#8b9cb3]">
                {(() => {
                  const g = gateways.find((x) => x.id === selectedGateway);
                  return g ? (
                    <>
                      <div>Gateway: <span className="font-mono text-white">{g.gatewayIp}</span></div>
                      <div>DNS: <span className="font-mono text-white">{g.dnsServers.join(", ")}</span></div>
                      <div>Subnet: <span className="font-mono text-white">{g.subnet}</span></div>
                    </>
                  ) : null;
                })()}
              </div>
            )}
            <button className="btn-primary w-full text-sm" onClick={applyGateway}>
              Apply Gateway (with confirmation)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
