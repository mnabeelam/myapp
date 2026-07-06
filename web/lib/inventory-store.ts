import fs from "fs/promises";
import path from "path";

const INVENTORY_DIR = path.resolve(process.cwd(), "..", "inventory");

async function ensureDir() {
  await fs.mkdir(INVENTORY_DIR, { recursive: true });
}

export function inventoryPath(file: string) {
  return path.join(INVENTORY_DIR, file);
}

export async function readInventory<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(inventoryPath(file), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await ensureDir();
    await writeInventory(file, fallback);
    return fallback;
  }
}

export async function writeInventory<T>(file: string, data: T): Promise<void> {
  await ensureDir();
  const target = inventoryPath(file);
  await fs.writeFile(target, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getProjectRoot() {
  return path.resolve(process.cwd(), "..");
}
