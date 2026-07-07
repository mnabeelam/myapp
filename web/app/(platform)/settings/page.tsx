"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { SettingsTab } from "@/components/tabs/SettingsTab";
import { usePlatform } from "@/components/platform/PlatformContext";

export default function SettingsPage() {
  const { license, setLicense, setSyncMsg } = usePlatform();

  return (
    <SectionPage>
      <SettingsTab
        license={license}
        onLicenseChange={setLicense}
        onSyncMessage={setSyncMsg}
        hideLicensePanel
      />
    </SectionPage>
  );
}
