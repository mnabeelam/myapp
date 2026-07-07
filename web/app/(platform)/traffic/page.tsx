"use client";

import { SectionPage, SectionPlaceholder } from "@/components/sections/SectionPage";

export default function TrafficPage() {
  return (
    <SectionPage moduleId="M12">
      <SectionPlaceholder
        features={[
          "NetFlow / sFlow collector",
          "Top talkers dashboard",
          "Bandwidth utilization charts",
          "Interface traffic heatmap",
          "Flow export to reports",
        ]}
      />
    </SectionPage>
  );
}
