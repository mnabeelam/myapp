import { NextResponse } from "next/server";
import { activateLicense } from "@/lib/license-store";
import { autoSyncIfEnabled } from "@/lib/git-sync";

export async function POST(request: Request) {
  try {
    const { licenseKey } = (await request.json()) as { licenseKey: string };
    if (!licenseKey?.trim()) {
      return NextResponse.json(
        { ok: false, message: "License key is required." },
        { status: 400 }
      );
    }
    const license = await activateLicense(licenseKey);
    await autoSyncIfEnabled();
    return NextResponse.json({ ok: true, license });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Activation failed";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
