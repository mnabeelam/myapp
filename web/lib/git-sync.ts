import { execSync } from "child_process";
import { getProjectRoot, readInventory } from "./inventory-store";

export interface SyncConfig {
  autoSync: boolean;
  remote: string;
  branch: string;
}

const DEFAULT_CONFIG: SyncConfig = {
  autoSync: true,
  remote: "origin",
  branch: "main",
};

export async function getSyncConfig(): Promise<SyncConfig> {
  return readInventory<SyncConfig>("config.json", DEFAULT_CONFIG);
}

export interface SyncResult {
  ok: boolean;
  message: string;
  committed: boolean;
  pushed: boolean;
}

export async function syncInventoryToGit(
  forcePush = true
): Promise<SyncResult> {
  const root = getProjectRoot();
  const config = await getSyncConfig();

  try {
    execSync("git rev-parse --is-inside-work-tree", {
      cwd: root,
      stdio: "pipe",
    });
  } catch {
    return {
      ok: false,
      message: "Not a git repository.",
      committed: false,
      pushed: false,
    };
  }

  try {
    execSync("git add inventory/", { cwd: root, stdio: "pipe" });

    const status = execSync("git status --porcelain inventory/", {
      cwd: root,
      encoding: "utf-8",
    });

    if (!status.trim()) {
      return {
        ok: true,
        message: "Inventory up to date — no changes.",
        committed: false,
        pushed: false,
      };
    }

    const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    execSync(`git commit -m "sync: auto-update inventory ${timestamp}"`, {
      cwd: root,
      stdio: "pipe",
    });

    let pushed = false;
    if (forcePush) {
      try {
        execSync(`git push ${config.remote} ${config.branch}`, {
          cwd: root,
          stdio: "pipe",
          timeout: 60000,
        });
        pushed = true;
      } catch {
        return {
          ok: true,
          message: "Committed locally. Push failed — check git credentials.",
          committed: true,
          pushed: false,
        };
      }
    }

    return {
      ok: true,
      message: pushed
        ? `Synced to GitHub (${config.remote}/${config.branch}).`
        : "Committed to git.",
      committed: true,
      pushed,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Git sync failed";
    return { ok: false, message, committed: false, pushed: false };
  }
}

export async function autoSyncIfEnabled(): Promise<SyncResult | null> {
  const config = await getSyncConfig();
  if (!config.autoSync) return null;
  return syncInventoryToGit(true);
}
