import { mkdir, readdir, rm, stat, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist", "client");
const publicDir = path.join(rootDir, "public");
const publicAssetsDir = path.join(publicDir, "assets");

await mkdir(publicDir, { recursive: true });
await mkdir(publicAssetsDir, { recursive: true });
await rm(publicAssetsDir, { recursive: true, force: true });
await mkdir(publicAssetsDir, { recursive: true });

for (const entry of await readdir(path.join(distDir, "assets"))) {
  await copyFile(path.join(distDir, "assets", entry), path.join(publicAssetsDir, entry));
}
for (const file of ["favicon.png", "logo.svg", "og-image.png", "robots.txt", "sitemap.xml", "certificate.jpeg"]) {
  const sourcePath = path.join(distDir, file);
  try {
    await stat(sourcePath);
    await copyFile(sourcePath, path.join(publicDir, file));
  } catch {
    // Ignore missing optional files.
  }
}

console.log(`Copied static assets to ${path.relative(rootDir, publicAssetsDir)}`);
