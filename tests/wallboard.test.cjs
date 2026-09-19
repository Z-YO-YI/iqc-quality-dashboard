const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function setup({ speed = 36, onEnd, reduced = false, height = 800 } = {}) {
  let layoutReads = 0, next = 0, disconnected = false;
  const frames = new Map(), listeners = new Map(), pointerListeners = new Map();
  const body = { style: {} };
  const table = { get offsetHeight() { layoutReads++; return height; }, querySelector: () => body };
  const wrap = { get clientHeight() { layoutReads++; return 200; }, querySelector: () => table,
    addEventListener(k, fn) { pointerListeners.set(k, fn); }, removeEventListener(k) { pointerListeners.delete(k); } };
  const document = { hidden: false, addEventListener(k, fn) { listeners.set(k, fn); }, removeEventListener(k) { listeners.delete(k); } };
  const ctx = vm.createContext({ document, window: { matchMedia: () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }) }, performance: { now: () => 0 },
    requestAnimationFrame(fn) { frames.set(++next, fn); return next; }, cancelAnimationFrame(id) { frames.delete(id); },
    ResizeObserver: class { observe() {} disconnect() { disconnected = true; } }, wrap, options: { speed, onEnd } });
  vm.runInContext(fs.readFileSync('assets/wallboard.js','utf8') + ';this.scroller = createTableScroller(wrap, options)', ctx);
  return { frames, listeners, pointerListeners, body, document, scroller: ctx.scroller,
    get layoutReads() { return layoutReads; }, get disconnected() { return disconnected; },
    get offset() { return -Number(body.style.transform.match(/,\s*([-\d.]+)px/)[1]); },
    tick(timestamp) {
      assert.equal(frames.size, 1, 'exactly one animation frame is pending');
      const [id, fn] = frames.entries().next().value; frames.delete(id); fn(timestamp);
    }
  };
}

test('scroller caches layout, pauses when hidden, resumes, and cleans up', () => {
  const h = setup(), reads = h.layoutReads;
  for (const timestamp of [2600, 2616, 2632]) h.tick(timestamp);
  assert.equal(h.layoutReads, reads); assert.match(h.body.style.transform, /translate3d/);
  h.document.hidden = true; h.listeners.get('visibilitychange')(); assert.equal(h.frames.size, 0);
  h.document.hidden = false; h.listeners.get('visibilitychange')(); assert.equal(h.frames.size, 1);
  h.scroller.stop(); assert.equal(h.frames.size, 0); assert.equal(h.disconnected, true); assert.equal(h.body.style.transform, '');
  assert.equal(h.pointerListeners.size, 0); assert.equal(h.listeners.size, 0);
});

test('scroll speed is consistent at 60 Hz and 120 Hz without rounding away subpixels', () => {
  for (const hz of [60, 120]) {
    const h = setup(); h.tick(2600);
    for (let i = 1; i <= hz; i++) h.tick(2600 + i * 1000 / hz);
    assert.ok(Math.abs(h.offset - 36) < 0.0001);
    h.scroller.stop();
  }
});

test('hover stops frame scheduling and resumes without jumping or duplicating frames', () => {
  const h = setup(); h.tick(2600); h.tick(2616);
  const offset = h.offset;
  h.pointerListeners.get('pointerenter')(); assert.equal(h.frames.size, 0);
  h.document.hidden = true; h.listeners.get('visibilitychange')();
  h.document.hidden = false; h.listeners.get('visibilitychange')(); assert.equal(h.frames.size, 0);
  h.pointerListeners.get('pointerleave')(); h.pointerListeners.get('pointerleave')();
  h.tick(10000); assert.equal(h.offset, offset);
  h.tick(10016); assert.ok(Math.abs(h.offset - offset - 0.576) < 0.0001);
  h.scroller.stop();
});

test('end-of-page pauses before advancing exactly once', () => {
  let pages = 0;
  const h = setup({ height: 201, onEnd: () => { pages++; } });
  h.tick(2600); h.tick(2650); assert.equal(h.offset, 1);
  h.tick(4400); assert.equal(pages, 0);
  h.tick(4450); assert.equal(pages, 1); assert.equal(h.frames.size, 0);
  h.scroller.stop();
});

test('reduced motion never schedules automatic scrolling, including after hover', () => {
  const h = setup({ reduced: true });
  h.pointerListeners.get('pointerenter')(); h.pointerListeners.get('pointerleave')();
  assert.equal(h.frames.size, 0);
  h.scroller.stop();
});
