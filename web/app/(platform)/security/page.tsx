"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { AuditTab } from "@/components/tabs/AlertsAuditTab";
import { usePlatform } from "@/components/platform/PlatformContext";

export default function SecurityPage() {
  const { auditLog } = usePlatform();

  return (
    <SectionPage moduleId="M14">
      <div className="section-card mb-6 grid grid-cols-3 gap-4 rounded-xl border p-5">
        {[
          { label: "RBAC", value: "Admin / Operator / Viewer" },
          { label: "Audit retention", value: "Per license tier" },
          { label: "MFA", value: "LICENSEC+" },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-xs text-[var(--muted)]">{item.label}</div>
            <div className="text-sm font-medium">{item.value}</div>
          </div>
        ))}
      </div>
      <AuditTab entries={auditLog} />
    </SectionPage>
  );
}
