"use client";

import { SectionPage, SectionPlaceholder } from "@/components/sections/SectionPage";
import { usePlatform } from "@/components/platform/PlatformContext";
import { StatusBadge } from "@/components/ui";

const COMMON_PORTS = [
  { port: 22, service: "SSH" },
  { port: 80, service: "HTTP" },
  { port: 443, service: "HTTPS" },
  { port: 3389, service: "RDP" },
  { port: 3128, service: "Squid Proxy" },
];

export default function ServicesPage() {
  const { machines } = usePlatform();

  return (
    <SectionPage moduleId="M04">
      <div className="section-card mb-6 rounded-xl border p-5">
        <h3 className="mb-4 font-semibold">Service Port Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--section-border)] text-left text-xs uppercase text-[var(--muted)]">
                <th className="p-3">Host</th>
                {COMMON_PORTS.map((p) => (
                  <th key={p.port} className="p-3 text-center">
                    {p.service}
                    <div className="font-mono font-normal">:{p.port}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.id} className="border-b border-white/5">
                  <td className="p-3">
                    <div className="font-medium">{m.hostname}</div>
                    <StatusBadge status={m.status} />
                  </td>
                  {COMMON_PORTS.map((p) => (
                    <td key={p.port} className="p-3 text-center">
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full ${
                          m.status === "up" ? "bg-emerald-400" : "bg-red-400"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SectionPlaceholder
        features={[
          "Scheduled TCP/HTTP checks",
          "Custom service definitions",
          "SSL certificate expiry alerts",
          "DNS resolution checks",
        ]}
      />
    </SectionPage>
  );
}
