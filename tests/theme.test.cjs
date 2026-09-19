const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/theme.js', 'utf8');

function setup(saved = {}, blocked = false) {
  const properties = {}, storage = new Map(Object.entries(saved));
  const root = { dataset: {}, style: { setProperty(key, value) { properties[key] = value; } } };
  const context = vm.createContext({ document: {
    documentElement: root, querySelector: () => null, querySelectorAll: () => []
  }, localStorage: {
    getItem(key) { if (blocked) throw Error('Storage unavailable'); return storage.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw Error('Storage unavailable'); storage.set(key, value); }
  } });
  vm.runInContext(source, context);
  return { context, root, properties, storage };
}

test('saved appearance restores before the controls exist, including a zero transparency value', () => {
  const h = setup({ iqc_theme: 'transparent', iqc_transparency: '0' });
  assert.equal(h.root.dataset.theme, 'transparent');
  assert.equal(Number(h.properties['--surface-alpha']), 1);
  const restored = setup({ iqc_theme: 'glass', iqc_transparency: '67.3' });
  assert.equal(restored.root.dataset.theme, 'glass');
  assert.equal(Number(restored.properties['--surface-alpha']), .327);
});

test('invalid preferences and unavailable storage leave theme switching usable', () => {
  const h = setup({ iqc_theme: 'unknown', iqc_transparency: 'bad' });
  assert.equal(h.root.dataset.theme, 'classic');
  assert.equal(Number(h.properties['--surface-alpha']), .3);
  const blocked = setup({}, true);
  vm.runInContext("applyTheme('transparent'); applyTransparency(80)", blocked.context);
  assert.equal(blocked.root.dataset.theme, 'transparent');
  assert.equal(Number(blocked.properties['--surface-alpha']), .2);
});

test('live preview avoids storage writes, commits persist, and values stay within bounds', () => {
  const h = setup({ iqc_transparency: '70' });
  vm.runInContext('applyTransparency(42.7, false)', h.context);
  assert.equal(Number(h.properties['--surface-alpha']), .573);
  assert.equal(h.storage.get('iqc_transparency'), '70');
  vm.runInContext('applyTransparency(42.7)', h.context);
  assert.equal(h.storage.get('iqc_transparency'), '42.7');
  for (const [input, expected] of [[-1, 1], [200, 0]]) {
    h.context.input = input;
    vm.runInContext('applyTransparency(input)', h.context);
    for (const value of Object.values(h.properties)) assert.equal(Number(value), expected);
  }
});
