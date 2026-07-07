"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { MachinesTab } from "@/components/tabs/MachinesTab";
import { usePlatform } from "@/components/platform/PlatformContext";

export default function InventoryPage() {
  const {
    machines,
    license,
    handleMachinesChange,
    addAuditEntry,
  } = usePlatform();

  return (
    <SectionPage moduleId="M01">
      <MachinesTab
        machines={machines}
        onMachinesChange={handleMachinesChange}
        onAction={addAuditEntry}
        maxMachines={license?.limits.maxMachines}
      />
    </SectionPage>
  );
}
