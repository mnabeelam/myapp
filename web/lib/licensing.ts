import { MODULES, type LicenseTierKey } from "../../packages/shared/src/licensing";
import type { TabId } from "./types";
import type { ActiveLicense } from "./license-store";

export type { ActiveLicense };

/** Maps dashboard tabs to required module IDs (null = always visible) */
export const TAB_MODULE_MAP: Record<TabId, string | null> = {
  overview: null,
  machines: "M01",
  proxies: "M06",
  control: "M05",
  reports: "M08",
  alerts: "M10",
  audit: "M14",
  settings: null,
};

export async function fetchLicense(): Promise<ActiveLicense> {
  const res = await fetch("/api/license");
  if (!res.ok) throw new Error("Failed to load license");
  return res.json();
}

export async function activateLicenseKey(
  licenseKey: string
): Promise<ActiveLicense> {
  const res = await fetch("/api/license/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ licenseKey }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Activation failed");
  return data.license;
}

export function hasModule(license: ActiveLicense | null, moduleId: string): boolean {
  if (!license) return false;
  return license.modules.includes(moduleId);
}

export function getVisibleTabs(license: ActiveLicense | null): TabId[] {
  return (Object.keys(TAB_MODULE_MAP) as TabId[]).filter((tab) => {
    const mod = TAB_MODULE_MAP[tab];
    return mod === null || hasModule(license, mod);
  });
}

export function getModuleName(moduleId: string): string {
  return MODULES[moduleId]?.name ?? moduleId;
}

export const TIER_COLORS: Record<LicenseTierKey, string> = {
  LICENSEA: "text-[var(--muted)]",
  LICENSEB: "text-accent",
  LICENSEC: "text-accent-purple",
  LICENSEZ: "text-gradient-dynamic",
};
