import { mkdirSync, copyFileSync } from 'node:fs';
mkdirSync('dist/assets', { recursive: true });
for (const path of ['index.html', 'CNAME', 'echarts.min.js', 'assets/dashboard.js', 'assets/dashboard.css']) copyFileSync(path, `dist/${path}`);
console.log('Static site built in dist/');
