import assert from 'node:assert/strict';
import test from 'node:test';

import handler from '../api/index.js';

test('Vercel handler serves the homepage with SSR HTML', async () => {
  const req = {
    method: 'GET',
    url: 'https://syntroxi.com/',
    headers: {
      host: 'syntroxi.com',
    },
  };

  let body = '';
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    write(chunk) {
      body += chunk.toString();
    },
    end(chunk) {
      if (chunk) {
        body += chunk.toString();
      }
    },
  };

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.match(body, /SYNTROXI/i);
  assert.match(body, /Hire AI Employees/i);
});
