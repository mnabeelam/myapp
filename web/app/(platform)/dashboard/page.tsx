"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { DashboardView } from "@/components/dashboard";
import { usePlatform } from "@/components/platform/PlatformContext";

export default function DashboardPage() {
  const { machines, proxies, alerts, auditLog } = usePlatform();
  return (
    <SectionPage>
      <DashboardView
        machines={machines}
        proxies={proxies}
        alerts={alerts}
        auditLog={auditLog}
      />
    </SectionPage>
  );
}
