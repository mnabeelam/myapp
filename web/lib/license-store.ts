import { readInventory, writeInventory } from "./inventory-store";
import {
  DEV_LICENSE_KEYS,
  getTierFromKey,
  LICENSE_TIERS,
  MODULES,
  type LicenseTier,
  type LicenseTierKey,
  type ModuleLimits,
} from "../../packages/shared/src/licensing";

export interface ActiveLicense {
  tierKey: LicenseTierKey;
  tierName: string;
  tagline: string;
  licenseKey: string;
  modules: string[];
  moduleKeys: string[];
  limits: ModuleLimits;
  activatedAt: string;
}

interface LicenseFile {
  tierKey: LicenseTierKey;
  licenseKey: string;
  activatedAt: string;
  tenantName?: string;
}

const DEFAULT: LicenseFile = {
  tierKey: "LICENSEA",
  licenseKey: DEV_LICENSE_KEYS.LICENSEA,
  activatedAt: new Date().toISOString(),
};

export async function getActiveLicense(): Promise<ActiveLicense> {
  const file = await readInventory<LicenseFile>("license.json", DEFAULT);
  const tier = LICENSE_TIERS[file.tierKey] ?? LICENSE_TIERS.LICENSEA;
  return toActiveLicense(file.licenseKey, tier, file.activatedAt);
}

export async function activateLicense(licenseKey: string): Promise<ActiveLicense> {
  const tier = getTierFromKey(licenseKey);
  if (!tier) {
    throw new Error(
      "Invalid license key. Must contain LICENSEA, LICENSEB, LICENSEC, or LICENSEZ."
    );
  }

  const file: LicenseFile = {
    tierKey: tier.key,
    licenseKey: licenseKey.trim(),
    activatedAt: new Date().toISOString(),
  };
  await writeInventory("license.json", file);
  return toActiveLicense(file.licenseKey, tier, file.activatedAt);
}

export function isModuleLicensed(
  license: ActiveLicense,
  moduleId: string
): boolean {
  return license.modules.includes(moduleId);
}

function toActiveLicense(
  licenseKey: string,
  tier: LicenseTier,
  activatedAt: string
): ActiveLicense {
  const moduleKeys = tier.modules
    .map((id) => MODULES[id]?.key)
    .filter(Boolean) as string[];

  return {
    tierKey: tier.key,
    tierName: tier.name,
    tagline: tier.tagline,
    licenseKey,
    modules: tier.modules,
    moduleKeys,
    limits: tier.limits,
    activatedAt,
  };
}
