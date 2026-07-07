import type { Topology3DData } from "@/lib/types";
import { initialMachines } from "@/lib/data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function buildFromInventory(): Topology3DData {
  const machines = initialMachines;
  const nodes = machines.map((m, i) => {
    const angle = (i / machines.length) * Math.PI * 2;
    const radius = 4;
    return {
      id: m.id,
      label: m.hostname,
      ip: m.ip,
      x: Math.cos(angle) * radius,
      y: (m.latencyMs ?? 0) / 8,
      z: Math.sin(angle) * radius,
      status: m.status,
      latencyMs: m.latencyMs,
      color:
        m.status === "up"
          ? "#34d399"
          : m.status === "down"
            ? "#f87171"
            : "#8b5cf6",
    };
  });

  return {
    nodes: [
      {
        id: "gateway",
        label: "Gateway",
        x: 0,
        y: 0,
        z: 0,
        status: "up",
        color: "#00d4ff",
      },
      ...nodes,
    ],
    edges: machines.map((m) => ({
      from: m.id,
      to: "gateway",
      type: "network",
    })),
    meta: {
      generatedAt: new Date().toISOString(),
      machineCount: machines.length,
    },
  };
}

export async function fetchTopology3D(): Promise<Topology3DData> {
  try {
    const res = await fetch(`${API_URL}/api/v1/reports/topology-3d`);
    if (res.ok) return res.json();
  } catch {
    /* API offline — use local inventory */
  }
  return buildFromInventory();
}
