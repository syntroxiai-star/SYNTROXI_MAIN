import { createReadStream, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist', 'client');
const publicDir = path.join(rootDir, 'public');
const serverEntryPath = path.join(rootDir, 'dist', 'server', 'server.js');

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
};

function getMimeType(filePath) {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function sendFile(res, filePath) {
  const stream = createReadStream(filePath);
  res.setHeader('Content-Type', getMimeType(filePath));
  stream.pipe(res);
}

function resolveStaticFile(pathname) {
  const normalized = pathname.replace(/^\/+/, '');
  if (!normalized) return null;

  const candidatePaths = [
    path.join(distDir, normalized),
    path.join(publicDir, normalized),
  ];

  for (const candidatePath of candidatePaths) {
    if (existsSync(candidatePath) && !candidatePath.endsWith(path.sep)) {
      return candidatePath;
    }
  }

  if (pathname.startsWith('/assets/')) {
    const assetPath = path.join(distDir, normalized);
    if (existsSync(assetPath)) return assetPath;
  }

  return null;
}

async function writeResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.status === 204 || response.status === 205) {
    res.end();
    return;
  }

  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
  }

  res.end();
}

export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  const staticFilePath = resolveStaticFile(pathname);
  if (staticFilePath) {
    return sendFile(res, staticFilePath);
  }

  const serverModule = await import(pathToFileURL(serverEntryPath).href);
  const serverHandler = serverModule.default ?? serverModule;
  const request = new Request(url.toString(), {
    method: req.method || 'GET',
    headers: req.headers,
  });

  const response = await serverHandler.fetch(request);
  await writeResponse(res, response);
}

export const config = {
  runtime: 'nodejs',
};
