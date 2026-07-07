"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { AlertsTab } from "@/components/tabs/AlertsAuditTab";
import { usePlatform } from "@/components/platform/PlatformContext";
import { StatusBadge } from "@/components/ui";

export default function MonitoringPage() {
  const { machines, alerts, acknowledgeAlert } = usePlatform();

  return (
    <SectionPage moduleId="M02">
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {machines.map((m) => (
          <div
            key={m.id}
            className="section-card rounded-xl border p-4"
          >
            <div className="truncate text-sm font-medium">{m.hostname}</div>
            <div className="mt-2 flex items-center justify-between">
              <StatusBadge status={m.status} />
              <span className="font-mono text-xs text-[var(--muted)]">
                {m.latencyMs != null ? `${m.latencyMs}ms` : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <AlertsTab alerts={alerts} onAcknowledge={acknowledgeAlert} />
    </SectionPage>
  );
}
