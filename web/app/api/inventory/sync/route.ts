import { execSync } from "child_process";
import { NextResponse } from "next/server";
import { getProjectRoot } from "@/lib/inventory-store";

export async function POST() {
  const root = getProjectRoot();

  try {
    execSync("git rev-parse --is-inside-work-tree", {
      cwd: root,
      stdio: "pipe",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Not a git repository. Run: git init" },
      { status: 400 }
    );
  }

  try {
    execSync("git add inventory/", { cwd: root, stdio: "pipe" });

    const status = execSync("git status --porcelain inventory/", {
      cwd: root,
      encoding: "utf-8",
    });

    if (!status.trim()) {
      return NextResponse.json({
        ok: true,
        message: "Inventory already synced — no changes to commit.",
      });
    }

    const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    execSync(`git commit -m "sync: update inventory ${timestamp}"`, {
      cwd: root,
      stdio: "pipe",
    });

    return NextResponse.json({
      ok: true,
      message: "Inventory committed to git successfully.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Git sync failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
