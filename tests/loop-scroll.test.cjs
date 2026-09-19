const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

function setup({ count = 1500, reduced = false, speed = 72, initialIndex = 0, initialOffset = 0 } = {}) {
  const frames = new Map(), pointer = new Map(), events = new Map();
  const windows = []; let id = 0, reads = 0, resize, motionChange;
  const body = { style: {}, querySelector: () => ({ get offsetHeight() { reads++; return 44; } }) };
  const table = { querySelector: selector => selector === 'tbody' ? body : { get offsetHeight() { reads++; return 32; } } };
  const wrap = { height: 252, get clientHeight() { reads++; return this.height; }, querySelector: () => table,
    addEventListener: (key, fn) => pointer.set(key, fn), removeEventListener: key => pointer.delete(key) };
  const document = { hidden: false, addEventListener: (key, fn) => events.set(key, fn), removeEventListener: key => events.delete(key) };
  const motion = { matches: reduced, addEventListener: (_, fn) => { motionChange = fn; }, removeEventListener: () => { motionChange = null; } };
  const ctx = vm.createContext({ wrap, document, window: { matchMedia: () => motion },
    requestAnimationFrame: fn => { frames.set(++id, fn); return id; }, cancelAnimationFrame: key => frames.delete(key),
    ResizeObserver: class { constructor(fn) { resize = fn; } observe() {} disconnect() { resize = null; } },
    options: { count, speed, initialIndex, initialOffset, renderWindow: (start, size) => windows.push({ start, size }) } });
  vm.runInContext(fs.readFileSync('assets/wallboard.js', 'utf8') + ';this.scroller = createLoopingTableScroller(wrap, options)', ctx);
  return { body, frames, windows, pointer, events, document, motion, wrap, scroller: ctx.scroller,
    get reads() { return reads; }, resize: () => resize(), motionChange: () => motionChange(),
    tick(now) { assert.equal(frames.size, 1); const [key, fn] = frames.entries().next().value; frames.delete(key); fn(now); },
    get offset() { return -Number(body.style.transform.match(/,\s*([-\d.]+)px/)[1]) || 0; } };
}

test('loop visits every task and wraps without a page pause or growing the DOM', () => {
  const h = setup({ speed: 880 }); const reads = h.reads;
  h.tick(0);
  for (let i = 1; i <= 1500; i++) h.tick(i * 50);
  assert.equal(h.windows.length, 1501);
  assert.deepEqual(h.windows.map(w => w.start), [...Array(1500).keys(), 0]);
  assert.ok(h.windows.every(w => w.size === 7));
  assert.equal(h.reads, reads); assert.equal(h.offset, 0);
  h.scroller.stop();
});

test('loop runs at 72 px/s at 60 Hz and 120 Hz', () => {
  for (const hz of [60, 120]) {
    const h = setup(); h.tick(0);
    for (let i = 1; i <= hz; i++) h.tick(i * 1000 / hz);
    assert.equal(h.windows.at(-1).start, 1);
    assert.ok(Math.abs(h.offset - 28) < 0.0001);
    h.scroller.stop();
  }
});

test('loop restores its current task and fractional offset after refresh', () => {
  const h = setup({ initialIndex: 1499, initialOffset: 12.5 });
  assert.equal(h.windows.at(-1).start, 1499); assert.equal(h.offset, 12.5);
  h.tick(0); h.tick(50);
  assert.ok(Math.abs(h.scroller.position().offset - 16.1) < 0.0001);
  assert.equal(h.scroller.position().index, 1499); h.scroller.stop();
});

test('loop suspends on hover and hidden tabs, resumes without jumps, and cleans up', () => {
  const h = setup(); h.tick(0); h.tick(20); const offset = h.offset;
  h.pointer.get('pointerenter')(); assert.equal(h.frames.size, 0);
  h.document.hidden = true; h.events.get('visibilitychange')();
  h.pointer.get('pointerleave')(); assert.equal(h.frames.size, 0);
  h.document.hidden = false; h.events.get('visibilitychange')(); h.tick(10000);
  assert.equal(h.offset, offset); h.tick(10020); assert.ok(h.offset > offset);
  h.scroller.stop(); assert.equal(h.frames.size, 0); assert.equal(h.pointer.size, 0);
  assert.equal(h.events.size, 0); assert.equal(h.body.style.transform, '');
});

test('short lists stay static; resize and reduced motion provide all records', () => {
  const short = setup({ count: 3 }); assert.equal(short.frames.size, 0); assert.equal(short.windows.at(-1).size, 3); short.scroller.stop();
  const empty = setup({ count: 0 }); assert.equal(empty.frames.size, 0); empty.scroller.stop();
  const h = setup(); h.wrap.height = 472; h.resize(); assert.equal(h.windows.at(-1).size, 12);
  h.motion.matches = true; h.motionChange(); assert.equal(h.frames.size, 0);
  assert.deepEqual(h.windows.at(-1), { start: 0, size: 1500 }); assert.equal(h.body.style.transform, '');
  h.motion.matches = false; h.motionChange(); assert.equal(h.frames.size, 1); assert.equal(h.windows.at(-1).size, 12);
  h.scroller.stop();
});
