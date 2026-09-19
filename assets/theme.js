// Restore before styles load so the saved theme is applied on the first paint.
function normalizeTheme(value) { return ['glass', 'transparent'].includes(value) ? value : 'classic'; }
function normalizeTransparency(value) {
  if (value === null || value === undefined || value === '') return 70;
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(Math.max(0, Math.min(100, number)) * 10) / 10 : 70;
}
let transparency = 70;
function syncThemeControls() {
  const theme = document.documentElement.dataset.theme;
  document.querySelectorAll('[data-theme-choice]').forEach(button => {
    const active = button.dataset.themeChoice === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const range = document.querySelector('#transparencyRange');
  if (range) {
    range.value = transparency; range.disabled = theme === 'classic';
    document.querySelector('#transparencyValue').textContent = `${transparency}%`;
    const hint = theme === 'classic' ? '选择透明主题后可调节' : '仅调整背景，文字和图表保持清晰';
    document.querySelector('#transparencyHint').textContent = typeof ui === 'function' ? ui(hint) : hint;
  }
}
function applyTransparency(value, persist = true) {
  transparency = normalizeTransparency(value);
  const alpha = 1 - transparency / 100;
  const edge = alpha * (1 - alpha) * 0.5;
  const style = document.documentElement.style;
  style.setProperty('--surface-alpha', alpha.toFixed(4));
  style.setProperty('--surface-high', (alpha + edge).toFixed(4));
  style.setProperty('--surface-low', (alpha - edge).toFixed(4));
  if (persist) { try { localStorage.setItem('iqc_transparency', String(transparency)); } catch {} }
  syncThemeControls();
}
function applyTheme(value, persist = true) {
  const theme = normalizeTheme(value);
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'classic' ? '#f3f6fa' : '#e6effb');
  if (persist) { try { localStorage.setItem('iqc_theme', theme); } catch {} }
  syncThemeControls();
}
function bindThemeControls() {
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
    applyTheme(button.dataset.themeChoice);
  }));
  const range = document.querySelector('#transparencyRange');
  range.addEventListener('input', () => applyTransparency(range.value, false));
  range.addEventListener('change', () => applyTransparency(range.value));
  document.querySelector('#displaySettings').addEventListener('toggle', event => {
    document.querySelector('#displaySettingsToggle').setAttribute('aria-expanded', String(event.newState === 'open'));
  });
  window.addEventListener('storage', event => {
    if (event.key === 'iqc_theme' || event.key === null) applyTheme(event.newValue, false);
    if (event.key === 'iqc_transparency' || event.key === null) applyTransparency(event.newValue, false);
  });
  syncThemeControls();
}
let savedTheme, savedTransparency;
try { savedTheme = localStorage.getItem('iqc_theme'); savedTransparency = localStorage.getItem('iqc_transparency'); } catch {}
applyTransparency(savedTransparency, false);
applyTheme(savedTheme, false);
