"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Topology3DData } from "@/lib/types";
import { fetchTopology3D } from "@/lib/reports-api";
import { SectionHeader } from "../ui";
import { Box, Globe, Loader2, Network } from "lucide-react";

const NetworkScene3D = dynamic(
  () =>
    import("../reports3d/NetworkScene3D").then((m) => m.NetworkScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] items-center justify-center text-[var(--muted)]">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading 3D engine…
      </div>
    ),
  }
);

export function Reports3DTab() {
  const [data, setData] = useState<Topology3DData | null>(null);
  const [view, setView] = useState<"topology" | "latency" | "uptime">("topology");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopology3D()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const upCount =
    data?.nodes.filter((n) => n.id !== "gateway" && n.status === "up").length ?? 0;
  const downCount =
    data?.nodes.filter((n) => n.id !== "gateway" && n.status === "down").length ?? 0;

  return (
    <div>
      <SectionHeader
        title="3D Network Reports"
        description="Interactive WebGL topology — node height = latency, color = status."
        action={
          <div className="flex gap-2">
            {(["topology", "latency", "uptime"] as const).map((v) => (
              <button
                key={v}
                className={`rounded-lg px-3 py-1.5 text-xs capitalize transition ${
                  view === v
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="stat-3d flex items-center gap-3 !p-4 text-left">
          <Network className="h-5 w-5 text-accent" />
          <div>
            <div className="text-xs text-[var(--muted)]">Nodes</div>
            <div className="text-xl font-bold text-gradient-dynamic">
              {data?.meta.machineCount ?? "—"}
            </div>
          </div>
        </div>
        <div className="stat-3d flex items-center gap-3 !p-4 text-left">
          <Box className="h-5 w-5 text-status-up" />
          <div>
            <div className="text-xs text-[var(--muted)]">Online</div>
            <div className="text-xl font-bold text-status-up">{upCount}</div>
          </div>
        </div>
        <div className="stat-3d flex items-center gap-3 !p-4 text-left">
          <Globe className="h-5 w-5 text-status-down" />
          <div>
            <div className="text-xs text-[var(--muted)]">Offline</div>
            <div className="text-xl font-bold text-status-down">{downCount}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-[520px] items-center justify-center text-[var(--muted)]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Building 3D report…
        </div>
      ) : data ? (
        <NetworkScene3D data={data} />
      ) : null}

      <p className="mt-3 text-xs text-[#5a6488]">
        Drag to orbit · Scroll to zoom · Click nodes for details ·
        Data from NestJS API or local inventory fallback
      </p>
    </div>
  );
}
