import { NextResponse } from "next/server";
import { autoSyncIfEnabled } from "@/lib/git-sync";
import { readInventory, writeInventory } from "@/lib/inventory-store";
import type { Proxy } from "@/lib/types";

export async function GET() {
  const proxies = await readInventory<Proxy[]>("proxies.json", []);
  return NextResponse.json(proxies);
}

export async function PUT(request: Request) {
  const proxies = (await request.json()) as Proxy[];
  await writeInventory("proxies.json", proxies);

  const sync = await autoSyncIfEnabled();

  return NextResponse.json({
    ok: true,
    count: proxies.length,
    sync,
  });
}
