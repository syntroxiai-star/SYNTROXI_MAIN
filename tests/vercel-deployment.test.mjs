import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicIndexHtml = await readFile(path.join(rootDir, 'public', 'index.html'), 'utf8');

test('Vercel public shell does not advertise a client-only SPA entry for page routes', () => {
  assert.equal(publicIndexHtml.includes('<div id="root"></div>'), false);
  assert.equal(publicIndexHtml.includes('/assets/index-'), false);
});
