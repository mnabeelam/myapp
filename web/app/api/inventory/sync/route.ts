import { NextResponse } from "next/server";
import { syncInventoryToGit } from "@/lib/git-sync";

export async function POST() {
  const result = await syncInventoryToGit(true);
  const status = result.ok ? 200 : 500;
  return NextResponse.json(result, { status });
}
