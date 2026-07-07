import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("machines")
@Controller("machines")
export class MachinesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.machine.findMany({
      orderBy: { hostname: "asc" },
      take: 5000,
    });
  }
}
