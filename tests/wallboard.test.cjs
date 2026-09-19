const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
test('scroller caches layout, pauses when hidden, resumes, and cleans up', () => {
  let layoutReads = 0, next = 0, disconnected = false;
  const frames = new Map(), listeners = new Map();
  const body = { style: {} };
  const table = { get offsetHeight() { layoutReads++; return 800; }, querySelector: () => body };
  const wrap = { get clientHeight() { layoutReads++; return 200; }, querySelector: () => table, addEventListener() {}, removeEventListener() {} };
  const document = { hidden: false, addEventListener(k, fn) { listeners.set(k, fn); }, removeEventListener(k) { listeners.delete(k); } };
  const ctx = vm.createContext({ document, window: { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) }, performance: { now: () => 0 },
    requestAnimationFrame(fn) { frames.set(++next, fn); return next; }, cancelAnimationFrame(id) { frames.delete(id); },
    ResizeObserver: class { observe() {} disconnect() { disconnected = true; } }, wrap });
  vm.runInContext(fs.readFileSync('assets/wallboard.js','utf8') + ';this.scroller = createTableScroller(wrap)', ctx);
  const reads = layoutReads;
  for (const timestamp of [2600, 2616, 2632]) { const [id, fn] = frames.entries().next().value; frames.delete(id); fn(timestamp); }
  assert.equal(layoutReads, reads); assert.match(body.style.transform, /translate3d/);
  document.hidden = true; listeners.get('visibilitychange')(); assert.equal(frames.size, 0);
  document.hidden = false; listeners.get('visibilitychange')(); assert.equal(frames.size, 1);
  ctx.scroller.stop(); assert.equal(frames.size, 0); assert.equal(disconnected, true); assert.equal(body.style.transform, '');
});
