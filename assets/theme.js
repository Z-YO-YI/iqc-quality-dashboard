// Restore before styles load so the saved theme is applied on the first paint.
function normalizeTheme(value) { return value === 'glass' ? 'glass' : 'classic'; }
function syncThemeControls() {
  const theme = document.documentElement.dataset.theme;
  const label = theme === 'glass' ? '液态玻璃' : '经典';
  document.querySelectorAll('[data-theme-current]').forEach(node => { node.textContent = typeof ui === 'function' ? ui(label) : label; });
  document.querySelectorAll('[data-theme-choice]').forEach(button => {
    const active = button.dataset.themeChoice === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function applyTheme(value, persist = true) {
  const theme = normalizeTheme(value);
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'glass' ? '#e6effb' : '#f3f6fa');
  if (persist) { try { localStorage.setItem('iqc_theme', theme); } catch {} }
  syncThemeControls();
}
function bindThemeControls() {
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
    applyTheme(button.dataset.themeChoice);
    const menu = button.closest('details');
    if (menu) { menu.open = false; menu.querySelector('summary').focus(); }
  }));
  window.addEventListener('storage', event => {
    if (event.key === 'iqc_theme' || event.key === null) applyTheme(event.newValue, false);
  });
  syncThemeControls();
}
let savedTheme;
try { savedTheme = localStorage.getItem('iqc_theme'); } catch {}
applyTheme(savedTheme, false);
