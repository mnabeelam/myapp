"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { ControlPanelTab } from "@/components/tabs/ControlPanelTab";
import { usePlatform } from "@/components/platform/PlatformContext";

export default function AutomationPage() {
  const { machines, proxies, license, addAuditEntry } = usePlatform();

  return (
    <SectionPage moduleId="M05">
      <ControlPanelTab
        machines={machines}
        proxies={proxies}
        onAction={addAuditEntry}
        license={license}
      />
    </SectionPage>
  );
}
