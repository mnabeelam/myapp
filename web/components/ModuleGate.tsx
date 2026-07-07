"use client";

import { getModuleName, hasModule, type ActiveLicense } from "@/lib/licensing";
import { Lock } from "lucide-react";

interface Props {
  moduleId: string;
  license: ActiveLicense | null;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ModuleGate({ moduleId, license, children, fallback }: Props) {
  if (hasModule(license, moduleId)) {
    return <>{children}</>;
  }

  if (fallback) return <>{fallback}</>;

  return (
    <div className="card flex flex-col items-center justify-center py-16 text-center">
      <div className="icon-3d mb-4 h-14 w-14">
        <Lock className="h-6 w-6 text-accent-purple" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">
        {getModuleName(moduleId)} — Module Locked
      </h3>
      <p className="mb-4 max-w-md text-sm text-[var(--muted)]">
        Your current license ({license?.tierName ?? "Starter"}) does not include
        this module. Upgrade to unlock {getModuleName(moduleId)}.
      </p>
      <p className="text-xs text-[#5a6488]">
        Go to <strong>Administration → License</strong> and enter a higher tier key
        (LICENSEB, LICENSEC, or LICENSEZ).
      </p>
    </div>
  );
}
