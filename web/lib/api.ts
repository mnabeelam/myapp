import type { GatewayProfile, Machine, Proxy } from "./types";

export async function fetchMachines(): Promise<Machine[]> {
  const res = await fetch("/api/inventory/machines");
  if (!res.ok) throw new Error("Failed to load machines");
  return res.json();
}

export async function saveMachines(machines: Machine[]): Promise<void> {
  const res = await fetch("/api/inventory/machines", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(machines),
  });
  if (!res.ok) throw new Error("Failed to save machines");
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

export async function syncInventoryToGit(): Promise<{
  ok: boolean;
  message: string;
}> {
  const res = await fetch("/api/inventory/sync", { method: "POST" });
  return res.json();
}
