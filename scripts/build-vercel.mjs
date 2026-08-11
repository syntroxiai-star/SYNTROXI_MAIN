import { mkdir, readdir, readFile, rm, stat, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourceHtmlPath = path.join(rootDir, "index.html");
const distDir = path.join(rootDir, "dist", "client");
const publicDir = path.join(rootDir, "public");
const publicAssetsDir = path.join(publicDir, "assets");
const publicIndexPath = path.join(publicDir, "index.html");

const template = await readFile(sourceHtmlPath, "utf8");
const templateWithoutGeneratedAssets = template
  .replace(/<link rel="stylesheet" href="\/assets\/[^\"]+">/g, "")
  .replace(/<script type="module" src="\/assets\/[^\"]+"><\/script>/g, "");
let assetFiles = [];
try {
  assetFiles = (await readdir(path.join(distDir, "assets"))).filter((file) =>
    file.endsWith(".js") || file.endsWith(".css"),
  );
} catch {
  assetFiles = [];
}

const cssAsset = assetFiles.find((file) => file.endsWith(".css"));
const entryAsset = assetFiles.find((file) => /^index-[^.]+\.js$/.test(file)) ?? assetFiles.find((file) => file.endsWith(".js"));

const injectTag = [];
if (cssAsset) {
  injectTag.push(`<link rel="stylesheet" href="/assets/${cssAsset}">`);
}
if (entryAsset) {
  injectTag.push(`<script type="module" src="/assets/${entryAsset}"></script>`);
}

const htmlWithAssets = templateWithoutGeneratedAssets.replace("</body>", `${injectTag.join("\n")}\n</body>`);
await mkdir(publicDir, { recursive: true });
await mkdir(publicAssetsDir, { recursive: true });
await rm(publicAssetsDir, { recursive: true, force: true });
await mkdir(publicAssetsDir, { recursive: true });
await writeFile(publicIndexPath, htmlWithAssets);

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

console.log(`Published Vercel entry at ${path.relative(rootDir, publicIndexPath)} and copied assets to ${path.relative(rootDir, publicAssetsDir)} with ${entryAsset ?? "no entry asset"}`);
