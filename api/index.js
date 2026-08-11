const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), 'dist', 'client');
const indexHtmlPath = path.join(distDir, 'index.html');

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
  const stream = fs.createReadStream(filePath);
  res.setHeader('Content-Type', getMimeType(filePath));
  stream.pipe(res);
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    const filePath = path.join(distDir, pathname.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      return sendFile(res, filePath);
    }
  }

  if (pathname.startsWith('/assets/')) {
    const assetPath = path.join(distDir, pathname.replace(/^\//, ''));
    if (fs.existsSync(assetPath)) {
      return sendFile(res, assetPath);
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = 200;
  res.end(fs.readFileSync(indexHtmlPath, 'utf8'));
};
