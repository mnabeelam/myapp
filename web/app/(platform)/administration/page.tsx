"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { usePlatform } from "@/components/platform/PlatformContext";
import { ModuleGate } from "@/components/ModuleGate";
import { TIER_COLORS } from "@/lib/licensing";
import { KeyRound, Shield, Users } from "lucide-react";

export default function AdministrationPage() {
  const { license, activateLicense, addAuditEntry } = usePlatform();

  return (
    <SectionPage moduleId="M16">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="section-card rounded-xl border p-6">
          <div className="mb-4 flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-[var(--section-accent)]" />
            <h3 className="font-semibold">License Management</h3>
          </div>
          {license ? (
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[var(--muted)]">Tier: </span>
                <span
                  className={`font-medium ${TIER_COLORS[license.tierKey]}`}
                >
                  {license.tierName} ({license.tierKey})
                </span>
              </div>
              <div>
                <span className="text-[var(--muted)]">Modules: </span>
                <span>{license.modules.length} active</span>
              </div>
              <div>
                <span className="text-[var(--muted)]">Max machines: </span>
                <span>{license.limits.maxMachines}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">No active license</p>
          )}
          <form
            className="mt-4 flex gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const key = String(fd.get("key") ?? "");
              const ok = await activateLicense(key);
              if (ok) addAuditEntry("license", key, "License activated");
            }}
          >
            <input
              name="key"
              placeholder="MYAPP-LICENSEZ-DEV-ENTERPRISE-001"
              className="flex-1 rounded-lg border border-[var(--section-border)] bg-black/30 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: "var(--section-accent)" }}
            >
              Activate
            </button>
          </form>
        </div>

        <div className="section-card rounded-xl border p-6">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-[var(--section-accent)]" />
            <h3 className="font-semibold">User & Role Management</h3>
          </div>
          <ModuleGate moduleId="M14" license={license}>
            <div className="space-y-2 text-sm">
              {[
                { user: "admin@lab.local", role: "Administrator" },
                { user: "ops@lab.local", role: "Operator" },
                { user: "view@lab.local", role: "Viewer" },
              ].map((u) => (
                <div
                  key={u.user}
                  className="flex items-center justify-between rounded-lg border border-[var(--section-border)] bg-black/20 px-3 py-2"
                >
                  <span>{u.user}</span>
                  <span className="text-xs text-[var(--section-accent)]">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </ModuleGate>
        </div>

        <div className="section-card rounded-xl border p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-[var(--section-accent)]" />
            <h3 className="font-semibold">System Policies</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { label: "Session timeout", value: "30 min" },
              { label: "Password policy", value: "Strong (12+ chars)" },
              { label: "API rate limit", value: "100 req/min" },
            ].map((p) => (
              <div
                key={p.label}
                className="rounded-lg border border-[var(--section-border)] p-4"
              >
                <div className="text-xs text-[var(--muted)]">{p.label}</div>
                <div className="mt-1 font-medium">{p.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
