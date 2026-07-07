import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("reports")
@Controller("reports")
export class ReportsController {
  constructor(private prisma: PrismaService) {}

  @Get("topology-3d")
  async topology3d() {
    const machines = await this.prisma.machine.findMany({ take: 500 });

    const nodes = machines.map((m, i) => {
      const angle = (i / Math.max(machines.length, 1)) * Math.PI * 2;
      const radius = 4 + (i % 3) * 1.5;
      return {
        id: m.id,
        label: m.hostname,
        ip: m.ip,
        x: Math.cos(angle) * radius,
        y: (m.latencyMs ?? 0) / 10,
        z: Math.sin(angle) * radius,
        status: m.status.toLowerCase(),
        latencyMs: m.latencyMs,
        color:
          m.status === "UP"
            ? "#34d399"
            : m.status === "DOWN"
              ? "#f87171"
              : "#8b5cf6",
      };
    });

    const gateway = {
      id: "gateway",
      label: "Gateway",
      x: 0,
      y: 0,
      z: 0,
      status: "up",
      color: "#00d4ff",
    };

    const edges = machines.map((m) => ({
      from: m.id,
      to: "gateway",
      type: "network",
    }));

    return {
      nodes: [gateway, ...nodes],
      edges,
      meta: {
        generatedAt: new Date().toISOString(),
        machineCount: machines.length,
      },
    };
  }
}
