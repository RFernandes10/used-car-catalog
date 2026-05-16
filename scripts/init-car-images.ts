import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = resolve(__dirname, "..");
const CARS_DATA_PATH = resolve(ROOT, "client", "src", "data", "cars.ts");
const IMAGES_DIR = resolve(ROOT, "client", "public", "images", "cars");
const MANIFEST_PATH = resolve(IMAGES_DIR, "manifest.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic", ".heif"]);

interface CarEntry {
  id: string;
  make: string;
  model: string;
}

function extractCars(filePath: string): CarEntry[] {
  const content = readFileSync(filePath, "utf-8");
  const cars: CarEntry[] = [];

  for (const block of content.split(/\{\s*\n/)) {
    const lines = block.split("\n").map((l) => l.trim());
    const id = lines.find((l) => l.startsWith("id:"))?.match(/id:\s*["'](.+?)["']/)?.[1];
    const make = lines.find((l) => l.startsWith("make:"))?.match(/make:\s*["'](.+?)["']/)?.[1];
    const model = lines.find((l) => l.startsWith("model:"))?.match(/model:\s*["'](.+?)["']/)?.[1];
    if (id && make && model) cars.push({ id, make, model });
  }

  return cars;
}

function getImageFiles(carId: string): string[] {
  const dir = resolve(IMAGES_DIR, carId);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(extname(e.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => e.name);
}

function createFolders(cars: CarEntry[]): number {
  let count = 0;
  for (const car of cars) {
    const dir = resolve(IMAGES_DIR, car.id);
    if (!existsSync(dir)) { mkdirSync(dir, { recursive: true }); count++; }
  }
  return count;
}

function generateManifest(cars: CarEntry[]): ImageManifest {
  const manifest: ImageManifest = {};
  for (const car of cars) {
    const files = getImageFiles(car.id);
    if (files.length) manifest[car.id] = files;
  }
  return manifest;
}

interface ImageManifest {
  [carId: string]: string[];
}

function main() {
  console.log("=== Car Image Manager ===\n");

  const cars = extractCars(CARS_DATA_PATH);
  console.log(`Cars found: ${cars.length}`);

  const created = createFolders(cars);
  if (created) console.log(`Folders created: ${created}`);

  const manifest = generateManifest(cars);
  const totalImages = Object.values(manifest).reduce((s, f) => s + f.length, 0);
  const carsWithImages = Object.keys(manifest).length;

  console.log(`Cars with images: ${carsWithImages}`);
  console.log(`Total image files: ${totalImages}`);

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`Manifest written: ${MANIFEST_PATH}`);

  console.log("\n=== Done ===");
  console.log("To add images:");
  console.log(`  1. Copy photos to: ${IMAGES_DIR}/{car-id}/`);
  console.log(`  2. Run: npm run images:init`);
}

main();
