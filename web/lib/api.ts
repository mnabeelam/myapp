import type { GatewayProfile, Machine, Proxy } from "./types";

export interface SyncResult {
  ok: boolean;
  message: string;
  committed?: boolean;
  pushed?: boolean;
}

export interface SyncConfig {
  autoSync: boolean;
  remote: string;
  branch: string;
}

export async function fetchMachines(): Promise<Machine[]> {
  const res = await fetch("/api/inventory/machines");
  if (!res.ok) throw new Error("Failed to load machines");
  return res.json();
}

export async function saveMachines(
  machines: Machine[]
): Promise<{ sync: SyncResult | null }> {
  const res = await fetch("/api/inventory/machines", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(machines),
  });
  if (!res.ok) throw new Error("Failed to save machines");
  const data = await res.json();
  return { sync: data.sync ?? null };
}

export async function fetchProxies(): Promise<Proxy[]> {
  const res = await fetch("/api/inventory/proxies");
  if (!res.ok) throw new Error("Failed to load proxies");
  return res.json();
}

export async function fetchGateways(): Promise<GatewayProfile[]> {
  const res = await fetch("/api/inventory/gateways");
  if (!res.ok) throw new Error("Failed to load gateways");
  return res.json();
}

export async function fetchSyncConfig(): Promise<SyncConfig> {
  const res = await fetch("/api/inventory/config");
  if (!res.ok) throw new Error("Failed to load sync config");
  return res.json();
}

export async function saveSyncConfig(
  config: SyncConfig
): Promise<SyncConfig> {
  const res = await fetch("/api/inventory/config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error("Failed to save sync config");
  const data = await res.json();
  return data.config;
}

export async function syncInventoryToGit(): Promise<SyncResult> {
  const res = await fetch("/api/inventory/sync", { method: "POST" });
  return res.json();
}
