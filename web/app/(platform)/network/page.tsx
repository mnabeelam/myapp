"use client";

import { SectionPage } from "@/components/sections/SectionPage";
import { usePlatform } from "@/components/platform/PlatformContext";
import { gatewayProfiles } from "@/lib/data";
import { StatusBadge } from "@/components/ui";

export default function NetworkPage() {
  const { machines } = usePlatform();
  const subnets = [...new Set(machines.map((m) => m.subnet))];

  return (
    <SectionPage moduleId="M07">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subnets.map((subnet) => {
          const hosts = machines.filter((m) => m.subnet === subnet);
          const up = hosts.filter((h) => h.status === "up").length;
          return (
            <div
              key={subnet}
              className="section-card rounded-xl border p-5"
            >
              <div className="font-mono text-sm text-[var(--section-accent)]">
                {subnet}
              </div>
              <div className="mt-2 text-2xl font-bold">{hosts.length} hosts</div>
              <div className="mt-1 text-sm text-[var(--muted)]">
                {up} online · {hosts.length - up} offline
              </div>
            </div>
          );
        })}
      </div>
      <div className="section-card mt-6 rounded-xl border p-5">
        <h3 className="mb-4 font-semibold">Gateway Profiles</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {gatewayProfiles.map((g) => (
            <div
              key={g.id}
              className="rounded-lg border border-[var(--section-border)] bg-black/20 p-4"
            >
              <div className="font-medium">{g.name}</div>
              <div className="font-mono text-xs text-[var(--muted)]">
                GW {g.gatewayIp} · DNS {g.dnsServers.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-card mt-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--section-border)] text-left text-xs uppercase text-[var(--muted)]">
              <th className="p-3">Host</th>
              <th className="p-3">IP</th>
              <th className="p-3">Subnet</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr key={m.id} className="border-b border-white/5">
                <td className="p-3 font-medium">{m.hostname}</td>
                <td className="p-3 font-mono text-xs">{m.ip}</td>
                <td className="p-3 font-mono text-xs">{m.subnet}</td>
                <td className="p-3">
                  <StatusBadge status={m.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionPage>
  );
}
