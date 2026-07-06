"use client";

import { gatewayProfiles as fallbackGateways } from "@/lib/data";
import {
  fetchGateways,
  fetchSyncConfig,
  saveSyncConfig,
  syncInventoryToGit,
} from "@/lib/api";
import { SectionHeader } from "../ui";
import { GitBranch, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import type { GatewayProfile } from "@/lib/types";

export function SettingsTab({
  onSyncMessage,
}: {
  onSyncMessage?: (msg: string | null) => void;
}) {
  const [pingInterval, setPingInterval] = useState("30");
  const [alertThreshold, setAlertThreshold] = useState("5");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [gateways, setGateways] = useState<GatewayProfile[]>(fallbackGateways);
  const [autoSync, setAutoSync] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  useEffect(() => {
    fetchGateways().then(setGateways).catch(() => {});
    fetchSyncConfig()
      .then((c) => setAutoSync(c.autoSync))
      .catch(() => {});
  }, []);

  const handleAutoSyncToggle = async (enabled: boolean) => {
    setAutoSync(enabled);
    try {
      await saveSyncConfig({
        autoSync: enabled,
        remote: "origin",
        branch: "main",
      });
      onSyncMessage?.(
        enabled ? "Auto-sync enabled" : "Auto-sync disabled"
      );
    } catch {
      setAutoSync(!enabled);
      onSyncMessage?.("Failed to update auto-sync setting.");
    }
  };

  const handleGitSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const result = await syncInventoryToGit();
      setSyncResult(result.message);
      onSyncMessage?.(result.message);
    } catch {
      setSyncResult("Git sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Settings"
        description="Platform configuration, users, and gateway profiles."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Monitoring Settings */}
        <div className="card space-y-4">
          <h3 className="font-medium">Monitoring</h3>
          <div>
            <label className="label-field">
              Ping Interval (seconds) <span className="text-red-400">*</span>
            </label>
            <select
              className="input-field"
              value={pingInterval}
              onChange={(e) => setPingInterval(e.target.value)}
            >
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
              <option value="120">2 minutes</option>
            </select>
          </div>
          <div>
            <label className="label-field">
              Alert Threshold (minutes down) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="1"
              required
              className="input-field"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Webhook URL (alerts)</label>
            <input
              className="input-field font-mono text-xs"
              placeholder="https://hooks.slack.com/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          <button className="btn-primary text-sm">Save Monitoring Settings</button>
        </div>

        {/* User Roles */}
        <div className="card space-y-4">
          <h3 className="font-medium">User Roles</h3>
          <div className="space-y-3 text-sm">
            {[
              {
                role: "Viewer",
                perms: "Read status, alerts, audit log",
                color: "text-[#8b9cb3]",
              },
              {
                role: "Operator",
                perms: "Viewer + WoL, proxy restart, acknowledge alerts",
                color: "text-accent",
              },
              {
                role: "Admin",
                perms: "Operator + shutdown, gateway, config, user management",
                color: "text-status-warn",
              },
            ].map((r) => (
              <div
                key={r.role}
                className="rounded-lg border border-[#2a3548] bg-surface p-3"
              >
                <div className={`font-medium ${r.color}`}>{r.role}</div>
                <div className="text-xs text-[#8b9cb3]">{r.perms}</div>
              </div>
            ))}
          </div>
          <button className="btn-secondary text-sm">Manage Users</button>
        </div>

        {/* Git Inventory Sync */}
        <div className="card space-y-4">
          <h3 className="flex items-center gap-2 font-medium">
            <GitBranch className="h-4 w-4 text-accent" />
            Git Auto-Sync
          </h3>

          <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[#2a3548] bg-surface p-4">
            <div>
              <div className="font-medium">Auto-sync to GitHub</div>
              <div className="text-xs text-[#8b9cb3]">
                Commit & push inventory on every save
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoSync}
              onClick={() => handleAutoSyncToggle(!autoSync)}
              className={`relative h-6 w-11 rounded-full transition ${
                autoSync ? "bg-accent" : "bg-[#2a3548]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  autoSync ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </label>

          <p className="text-sm text-[#8b9cb3]">
            Remote:{" "}
            <a
              href="https://github.com/mnabeelam/myapp"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              github.com/mnabeelam/myapp
            </a>
          </p>

          <button
            className="btn-secondary flex items-center gap-2 text-sm"
            onClick={handleGitSync}
            disabled={syncing}
          >
            {syncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Sync Now (manual)
          </button>
          {syncResult && (
            <p className="text-xs text-[#8b9cb3]">{syncResult}</p>
          )}
        </div>

        {/* Gateway Profiles */}
        <div className="card lg:col-span-2">
          <h3 className="mb-4 font-medium">Gateway Profiles</h3>
          <div className="overflow-x-auto rounded-lg border border-[#2a3548]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a3548] bg-surface text-left text-xs uppercase tracking-wide text-[#8b9cb3]">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Gateway IP</th>
                  <th className="px-4 py-3">DNS Servers</th>
                  <th className="px-4 py-3">Subnet</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gateways.map((g) => (
                  <tr key={g.id} className="border-b border-[#2a3548]/50">
                    <td className="px-4 py-3 font-medium">{g.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{g.gatewayIp}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {g.dnsServers.join(", ")}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{g.subnet}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-accent hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-secondary mt-4 text-sm">+ Add Gateway Profile</button>
        </div>
      </div>
    </div>
  );
}
