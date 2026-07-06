import { NextResponse } from "next/server";
import { autoSyncIfEnabled } from "@/lib/git-sync";
import { readInventory, writeInventory } from "@/lib/inventory-store";
import type { Machine } from "@/lib/types";

export async function GET() {
  const machines = await readInventory<Machine[]>("machines.json", []);
  return NextResponse.json(machines);
}

export async function PUT(request: Request) {
  const machines = (await request.json()) as Machine[];
  await writeInventory("machines.json", machines);

  const sync = await autoSyncIfEnabled();

  return NextResponse.json({
    ok: true,
    count: machines.length,
    sync,
  });
}
