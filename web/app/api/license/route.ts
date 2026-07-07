import { NextResponse } from "next/server";
import { getActiveLicense } from "@/lib/license-store";

export async function GET() {
  return NextResponse.json(await getActiveLicense());
}
