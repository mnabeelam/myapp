import { NextResponse } from "next/server";
import { readInventory, writeInventory } from "@/lib/inventory-store";
import type { SyncConfig } from "@/lib/git-sync";

export async function GET() {
  const config = await readInventory<SyncConfig>("config.json", {
    autoSync: true,
    remote: "origin",
    branch: "main",
  });
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  const config = (await request.json()) as SyncConfig;
  await writeInventory("config.json", config);
  return NextResponse.json({ ok: true, config });
}
