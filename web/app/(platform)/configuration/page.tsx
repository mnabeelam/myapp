"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { SectionPlaceholder } from "@/components/sections/SectionPage";
import { gatewayProfiles } from "@/lib/data";
import { usePathname } from "next/navigation";
import { getSectionByPath } from "@/lib/navigation";

export default function ConfigurationPage() {
  const section = getSectionByPath(usePathname());

  return (
    <SectionPage moduleId="M11">
      <div className="section-card mb-6 rounded-xl border p-5">
        <h3 className="mb-4 font-semibold" style={{ color: section.accent }}>
          Gateway Profiles
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {gatewayProfiles.map((g) => (
            <div
              key={g.id}
              className="rounded-lg border p-4"
              style={{ borderColor: section.border }}
            >
              <div className="font-medium">{g.name}</div>
              <div className="mt-2 space-y-1 font-mono text-xs text-[var(--muted)]">
                <div>Gateway: {g.gatewayIp}</div>
                <div>DNS: {g.dnsServers.join(", ")}</div>
                <div>Subnet: {g.subnet}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionPlaceholder
        features={[
          "NCM config backup via SSH",
          "Config diff and drift detection",
          "Compliance policy templates",
          "Scheduled config snapshots",
        ]}
      />
    </SectionPage>
  );
}
