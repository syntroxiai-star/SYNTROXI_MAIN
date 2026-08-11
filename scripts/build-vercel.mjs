import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourceHtmlPath = path.join(rootDir, "index.html");
const distDir = path.join(rootDir, "dist", "client");
const targetHtmlPath = path.join(distDir, "index.html");

const template = await readFile(sourceHtmlPath, "utf8");
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

const htmlWithAssets = template.replace("</body>", `${injectTag.join("\n")}\n</body>`);
await writeFile(targetHtmlPath, htmlWithAssets);

console.log(`Built Vercel entry at ${path.relative(rootDir, targetHtmlPath)} with ${entryAsset ?? "no entry asset"}`);
