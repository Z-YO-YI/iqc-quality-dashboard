import { readFileSync } from 'node:fs';
const html = readFileSync('index.html', 'utf8');
for (const path of ['assets/dashboard.js', 'assets/dashboard.css', 'echarts.min.js']) {
  if (!html.includes(path)) throw new Error(`Missing asset reference: ${path}`);
  readFileSync(path);
}
const js = readFileSync('assets/dashboard.js', 'utf8');
if (/(?:password|basicAuth|username)\s*:\s*['"][^'"]+['"]/i.test(js)) throw new Error('Literal credentials found in frontend');
console.log('Asset references and frontend credential check passed');
