"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { ProxiesTab } from "@/components/tabs/ProxiesTab";
import { usePlatform } from "@/components/platform/PlatformContext";

export default function ProxyPage() {
  const { proxies, addAuditEntry } = usePlatform();

  return (
    <SectionPage moduleId="M06">
      <ProxiesTab proxies={proxies} onAction={addAuditEntry} />
    </SectionPage>
  );
}
