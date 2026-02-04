import fs from "node:fs/promises";
import path from "node:path";

const dataDir = new URL("../data/", import.meta.url);
const entries = await fs.readdir(dataDir);
const jsonFiles = entries.filter((name) => name.endsWith(".json"));

let failed = false;
for (const file of jsonFiles) {
  const fullPath = new URL(file, dataDir);
  try {
    const raw = await fs.readFile(fullPath, "utf-8");
    JSON.parse(raw);
    console.log(`OK: ${file}`);
  } catch (err) {
    failed = true;
    console.error(`FAIL: ${file} -> ${err.message}`);
  }
}

if (failed) {
  process.exit(1);
}
