"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { Reports3DTab } from "@/components/tabs/Reports3DTab";
import { usePlatform } from "@/components/platform/PlatformContext";
import { StatCard } from "@/components/ui";
import { Activity, Server, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  const { machines, proxies, alerts } = usePlatform();
  const up = machines.filter((m) => m.status === "up").length;

  return (
    <SectionPage moduleId="M09">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Reportable Hosts" value={machines.length} icon={Server} />
        <StatCard label="Online" value={up} icon={Activity} color="text-emerald-400" />
        <StatCard label="Open Alerts" value={alerts.filter((a) => !a.acknowledged).length} icon={TrendingUp} />
      </div>
      <Reports3DTab />
    </SectionPage>
  );
}
