import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
for (const path of ['assets/dashboard.js', 'assets/ui-i18n.js', 'assets/wallboard.js', 'scripts/build.mjs', 'scripts/serve.mjs']) {
  execFileSync(process.execPath, ['--check', path], { stdio: 'inherit' });
}
const html = readFileSync('index.html', 'utf8');
for (const path of ['assets/dashboard.js', 'assets/dashboard.css', 'assets/ui-i18n.js', 'assets/wallboard.js', 'assets/settings.css', 'assets/incoming-wallboard.css', 'echarts.min.js']) {
  if (!html.includes(path)) throw new Error(`Missing asset reference: ${path}`);
  readFileSync(path);
}
const js = readFileSync('assets/dashboard.js', 'utf8');
if (/(?:password|basicAuth|username)\s*:\s*['"][^'"]+['"]/i.test(js)) throw new Error('Literal credentials found in frontend');
console.log('Asset references and frontend credential check passed');
