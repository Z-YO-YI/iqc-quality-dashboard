import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const files = { '/': ['index.html', 'text/html'], '/index.html': ['index.html', 'text/html'], '/assets/dashboard.js': ['assets/dashboard.js', 'text/javascript'], '/assets/dashboard.css': ['assets/dashboard.css', 'text/css'], '/echarts.min.js': ['echarts.min.js', 'text/javascript'] };
createServer(async (req, res) => {
  const entry = files[new URL(req.url, 'http://localhost').pathname];
  if (!entry) { res.writeHead(404); res.end(); return; }
  try { const body = await readFile(entry[0]); res.writeHead(200, { 'Content-Type': entry[1] + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(body); }
  catch { res.writeHead(500); res.end(); }
}).listen(8765, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:8765'));
