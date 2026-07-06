import { NextResponse } from "next/server";
import { readInventory } from "@/lib/inventory-store";
import type { GatewayProfile } from "@/lib/types";

export async function GET() {
  const gateways = await readInventory<GatewayProfile[]>("gateways.json", []);
  return NextResponse.json(gateways);
}
