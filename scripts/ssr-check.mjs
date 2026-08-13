import server from '../dist/server/server.js';

async function check(urlPath) {
  const req = new Request('https://syntroxi.com' + urlPath);
  // server is the default export (handler object with fetch method)
  const res = await server.fetch(req, {}, {});
  const text = await res.text();
  return { status: res.status, headers: Object.fromEntries(res.headers), text };
}

if (process.argv.includes('--list-only')) {
  console.log('Run with: node scripts/ssr-check.mjs');
  process.exit(0);
}

(async () => {
  const routes = ['/', '/about', '/ai-employees', '/ai-employees/aria-support', '/ai-employees/vero-sdr', '/ai-employees/nova-marketing', '/ai-employees/atlas-finance', '/ai-employees/orion-ops', '/ai-employees/sage-analyst', '/case-studies', '/connected-systems', '/contact', '/industries', '/pricing', '/resources', '/workforce-builder', '/robots.txt', '/sitemap.xml'];
  let failed = false;
  for (const r of routes) {
    try {
      if (r === '/robots.txt' || r === '/sitemap.xml') {
        // validate filesystem copies for these
        const fs = await import('fs/promises');
        const p = r === '/robots.txt' ? './robots.txt' : './sitemap.xml';
        try {
          const data = await fs.readFile(new URL(`../${p}`, import.meta.url), 'utf-8');
          console.log('===', r, 'file-size=', data.length);
          if (r === '/robots.txt' && !/Sitemap:\s*https?:\/\//i.test(data)) {
            console.error('  ERROR: robots.txt missing Sitemap directive');
            failed = true;
          }
          if (r === '/sitemap.xml' && !/<urlset[\s>]/i.test(data)) {
            console.error('  ERROR: sitemap.xml does not appear to be valid');
            failed = true;
          }
        } catch (fsErr) {
          console.error('  ERROR: cannot read', p, fsErr.message);
          failed = true;
        }
        continue;
      }

      const out = await check(r);
      console.log('===', r, 'status=', out.status, 'content-type=', out.headers['content-type'] || '');
      if (out.status !== 200) {
        console.error('ERROR: non-200 for', r);
        failed = true;
        continue;
      }

      if ((out.headers['content-type'] || '').includes('text/html')) {
        const html = out.text;
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';
        const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        const desc = descMatch ? descMatch[1].trim() : '';
        const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
        const canon = canonMatch ? canonMatch[1].trim() : '';
        console.log('  title:', title || '(missing)');
        console.log('  meta description:', desc ? desc.slice(0, 80) : '(missing)');
        console.log('  canonical:', canon || '(missing)');

        // Check for Product Offer leakage
        if (html.includes('"@type":"Offer"') || /"price"\s*:\s*"?0"?/.test(html) || html.includes('InStock')) {
          console.error('  ERROR: Found Offer/price=0/InStock in structured-data for', r);
          failed = true;
        }
      } else {
        console.error('  Unexpected content-type for', r);
        failed = true;
      }
    } catch (e) {
      console.error('Error fetching', r, e);
      failed = true;
    }
  }
  if (failed) process.exit(2);
  console.log('\nSSR verification completed: all checks passed (no Offer/price=0/InStock found).');
})();
