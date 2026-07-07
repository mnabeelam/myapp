"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Alert, AuditEntry, Machine, Proxy } from "@/lib/types";
import { initialAlerts, initialAuditLog } from "@/lib/data";
import { fetchMachines, fetchProxies, saveMachines } from "@/lib/api";
import {
  activateLicenseKey,
  fetchLicense,
  type ActiveLicense,
} from "@/lib/licensing";

interface PlatformContextValue {
  machines: Machine[];
  proxies: Proxy[];
  alerts: Alert[];
  auditLog: AuditEntry[];
  license: ActiveLicense | null;
  loading: boolean;
  syncMsg: string | null;
  saving: boolean;
  setSyncMsg: (msg: string | null) => void;
  setLicense: (l: ActiveLicense) => void;
  activateLicense: (key: string) => Promise<boolean>;
  loadInventory: () => Promise<void>;
  handleMachinesChange: (updated: Machine[]) => Promise<void>;
  addAuditEntry: (action: string, target: string, details: string) => void;
  acknowledgeAlert: (id: string) => void;
  activeAlertCount: number;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(initialAuditLog);
  const [license, setLicense] = useState<ActiveLicense | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadInventory = useCallback(async () => {
    setLoading(true);
    try {
      const [m, p, lic] = await Promise.all([
        fetchMachines(),
        fetchProxies(),
        fetchLicense(),
      ]);
      setMachines(m);
      setProxies(p);
      setLicense(lic);
    } catch {
      setSyncMsg("Failed to load inventory.");
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
      if (sync?.pushed) setSyncMsg("Saved & auto-synced to GitHub");
      else if (sync?.committed) setSyncMsg("Saved & committed");
      else setSyncMsg("Inventory saved");
      setTimeout(() => setSyncMsg(null), 4000);
    } catch {
      setSyncMsg("Failed to save inventory.");
    } finally {
      setSaving(false);
    }
  };

  const addAuditEntry = (action: string, target: string, details: string) => {
    setAuditLog((prev) => [
      {
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
      },
      ...prev,
    ]);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
    addAuditEntry("alert_ack", id, "Alert acknowledged");
  };

  const activeAlertCount = alerts.filter((a) => !a.acknowledged).length;

  const activateLicense = async (key: string) => {
    try {
      const lic = await activateLicenseKey(key);
      setLicense(lic);
      setSyncMsg(`License activated: ${lic.tierName}`);
      setTimeout(() => setSyncMsg(null), 4000);
      return true;
    } catch (err) {
      setSyncMsg(err instanceof Error ? err.message : "Activation failed");
      setTimeout(() => setSyncMsg(null), 4000);
      return false;
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        machines,
        proxies,
        alerts,
        auditLog,
        license,
        loading,
        syncMsg,
        saving,
        setSyncMsg,
        setLicense,
        activateLicense,
        loadInventory,
        handleMachinesChange,
        addAuditEntry,
        acknowledgeAlert,
        activeAlertCount,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used within PlatformProvider");
  return ctx;
}
