import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const files = { '/assets/ui-i18n.js': ['assets/ui-i18n.js', 'text/javascript'], '/assets/wallboard.js': ['assets/wallboard.js', 'text/javascript'], '/': ['index.html', 'text/html'], '/index.html': ['index.html', 'text/html'], '/assets/dashboard.js': ['assets/dashboard.js', 'text/javascript'], '/assets/dashboard.css': ['assets/dashboard.css', 'text/css'], '/echarts.min.js': ['echarts.min.js', 'text/javascript'] };
files['/assets/incoming-wallboard.css'] = ['assets/incoming-wallboard.css', 'text/css'];
files['/assets/settings.css'] = ['assets/settings.css', 'text/css'];
createServer(async (req, res) => {
  if (req.url === '/__test__/') {
    const html = (await readFile('index.html', 'utf8')).replaceAll('src="assets/', 'src="/assets/').replaceAll('href="assets/', 'href="/assets/').replace('src="echarts.min.js"', 'src="/echarts.min.js"').replace('<head>', '<head><script src="/__test__/fixture.js"></script>');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(html); return;
  }
  if (req.url === '/__test__/fixture.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(await readFile('tests/browser-fixture.js')); return;
  }
  const entry = files[new URL(req.url, 'http://localhost').pathname];
  if (!entry) { res.writeHead(404); res.end(); return; }
  try { const body = await readFile(entry[0]); res.writeHead(200, { 'Content-Type': entry[1] + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(body); }
  catch { res.writeHead(500); res.end(); }
}).listen(Number(process.argv[2] || 8765), '127.0.0.1', () => console.log('Preview server ready'));
