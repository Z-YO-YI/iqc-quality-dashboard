import { mkdirSync, copyFileSync, rmSync } from 'node:fs';
mkdirSync('dist/assets', { recursive: true });
// Remove retired generated assets when rebuilding in an existing checkout.
for (const path of ['dist/assets/theme.js', 'dist/assets/theme.css']) rmSync(path, { force: true });
for (const path of ['index.html', 'CNAME', 'echarts.min.js', 'assets/dashboard.js', 'assets/dashboard.css', 'assets/ui-i18n.js', 'assets/wallboard.js', 'assets/settings.css']) copyFileSync(path, `dist/${path}`);
console.log('Static site built in dist/');
