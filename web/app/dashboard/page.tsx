"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Alert, AuditEntry, Machine, Proxy, TabId } from "@/lib/types";
import { initialAlerts, initialAuditLog } from "@/lib/data";
import { fetchMachines, fetchProxies, saveMachines } from "@/lib/api";
import { tabs } from "@/components/ui";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { MachinesTab } from "@/components/tabs/MachinesTab";
import { ProxiesTab } from "@/components/tabs/ProxiesTab";
import { ControlPanelTab } from "@/components/tabs/ControlPanelTab";
import { AlertsTab, AuditTab } from "@/components/tabs/AlertsAuditTab";
import { SettingsTab } from "@/components/tabs/SettingsTab";
import { Bell, GitBranch, LogOut, RefreshCw, Server } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [machines, setMachines] = useState<Machine[]>([]);
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(initialAuditLog);
  const [loading, setLoading] = useState(true);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadInventory = useCallback(async () => {
    setLoading(true);
    try {
      const [m, p] = await Promise.all([fetchMachines(), fetchProxies()]);
      setMachines(m);
      setProxies(p);
    } catch {
      setSyncMsg("Failed to load inventory from disk.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const handleMachinesChange = async (updated: Machine[]) => {
    setMachines(updated);
    setSaving(true);
    try {
      const { sync } = await saveMachines(updated);
      if (sync?.pushed) {
        setSyncMsg("Saved & auto-synced to GitHub");
      } else if (sync?.committed) {
        setSyncMsg("Saved & committed — push pending");
      } else if (sync) {
        setSyncMsg(sync.message);
      } else {
        setSyncMsg("Inventory saved locally");
      }
      setTimeout(() => setSyncMsg(null), 4000);
    } catch {
      setSyncMsg("Failed to save inventory.");
    } finally {
      setSaving(false);
    }
  };

  const activeAlertCount = alerts.filter((a) => !a.acknowledged).length;

  const addAuditEntry = (action: string, target: string, details: string) => {
    const entry: AuditEntry = {
      id: Date.now().toString(),
      user: "admin",
      action,
      target,
      details,
      timestamp: new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setAuditLog((prev) => [entry, ...prev]);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
    addAuditEntry("alert_ack", id, "Alert acknowledged");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-[#2a3548] bg-[#0a0e14]/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Server className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">myapp</div>
              <div className="text-xs text-[#5a6a82]">Local Network Control Panel</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {syncMsg && (
              <span className="hidden text-xs text-green-400 md:inline">{syncMsg}</span>
            )}
            {saving && (
              <span className="text-xs text-[#8b9cb3]">Saving…</span>
            )}
            <button
              onClick={loadInventory}
              className="btn-secondary flex items-center gap-1.5 px-2 py-1 text-xs"
              title="Reload from disk"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
            {activeAlertCount > 0 && (
              <button
                className="flex items-center gap-1.5 rounded-full bg-status-warn/15 px-3 py-1 text-xs text-status-warn"
                onClick={() => setActiveTab("alerts")}
              >
                <Bell className="h-3.5 w-3.5" />
                {activeAlertCount}
              </button>
            )}
            <div className="text-right">
              <div className="text-sm">admin</div>
              <div className="text-xs text-accent">Administrator</div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-[#8b9cb3] hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" /> Exit
            </Link>
          </div>
        </div>

        <nav className="flex gap-0 overflow-x-auto px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-1.5 px-4 py-3 text-sm font-medium transition ${
                  isActive ? "tab-active" : "tab-inactive"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.id === "alerts" && activeAlertCount > 0 && (
                  <span className="rounded-full bg-status-warn/20 px-1.5 text-xs text-status-warn">
                    {activeAlertCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-[#8b9cb3]">
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading inventory from git-synced files…
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewTab machines={machines} proxies={proxies} alerts={alerts} />
              )}
              {activeTab === "machines" && (
                <MachinesTab
                  machines={machines}
                  onMachinesChange={handleMachinesChange}
                  onAction={addAuditEntry}
                />
              )}
              {activeTab === "proxies" && (
                <ProxiesTab proxies={proxies} onAction={addAuditEntry} />
              )}
              {activeTab === "control" && (
                <ControlPanelTab
                  machines={machines}
                  proxies={proxies}
                  onAction={addAuditEntry}
                />
              )}
              {activeTab === "alerts" && (
                <AlertsTab alerts={alerts} onAcknowledge={acknowledgeAlert} />
              )}
              {activeTab === "audit" && <AuditTab entries={auditLog} />}
              {activeTab === "settings" && (
                <SettingsTab onSyncMessage={setSyncMsg} />
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-[#2a3548] px-6 py-2 text-center text-xs text-[#5a6a82]">
        <GitBranch className="mr-1 inline h-3 w-3" />
        Inventory auto-sync enabled — changes push to <code className="text-accent">github.com/mnabeelam/myapp</code>
      </footer>
    </div>
  );
}
