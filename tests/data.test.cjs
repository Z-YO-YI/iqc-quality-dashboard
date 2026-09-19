const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/dashboard.js', 'utf8');
function app() {
  const elements = new Map();
  const store = new Map();
  const ctx = vm.createContext({ URL, URLSearchParams, AbortController, setTimeout, clearTimeout, Intl,
    console: { error() {} }, window: { location: { hash: '' } },
    document: { querySelector(s) { if (!elements.has(s)) elements.set(s, { style: {}, classList: { toggle() {}, remove() {} } }); return elements.get(s); }, querySelectorAll() { return []; } },
    localStorage: { getItem(k) { return store.get(k) || null; }, setItem(k, v) { store.set(k, v); } }
  });
  vm.runInContext(fs.readFileSync('assets/ui-i18n.js', 'utf8'), ctx);
  vm.runInContext(source.slice(0, source.lastIndexOf('    applyLocale();')), ctx);
  vm.runInContext('const originalRenderSbBoard = renderSbBoard;', ctx);
  vm.runInContext('renderAll = () => {}; renderSbBoard = () => {}; renderSbTrendChart = () => {}; showToast = () => {}; sleep = async () => {};', ctx);
  return { ctx, store, elements, run: (s) => vm.runInContext(s, ctx) };
}
test('solid donut segments retain proportions, omit zero categories and show neutral empty states', () => {
  const a = app();
  const markup = a.run("donutSegments([3, 0, 1], ['green', 'amber', 'red'])");
  assert.equal((markup.match(/<circle /g) || []).length, 2);
  assert.match(markup, /stroke="green"[^>]*stroke-dasharray="75 25"[^>]*stroke-dashoffset="0"/);
  assert.match(markup, /stroke="red"[^>]*stroke-dasharray="25 75"[^>]*stroke-dashoffset="-75"/);
  const empty = a.run("donutSegments([0, 0, 0], ['green', 'amber', 'red'])");
  assert.match(empty, /stroke="#e4eaf2"/);
  assert.doesNotMatch(empty, /NaN|stroke-dasharray/);
  assert.match(a.run("donutSegments([1], ['green'])"), /stroke-dasharray="100 0"/);
});

test('inspector totals include everyone when more than five inspectors have pending tasks', () => {
  const a = app();
  const result = a.run("computeInspectors([...Array.from({length: 7}, (_, i) => ({inspectorName: `Inspector ${i}`})), {inspectorName: 'Inspector 6'}, {}])");
  assert.equal(result.length, 8);
  assert.equal(result.reduce((sum, item) => sum + item.count, 0), 9);
  assert.equal(result[0].name, 'Inspector 6');
  assert.equal(result[0].count, 2);
  assert.ok(result.some(item => item.name === '未分配'));
});

test('pagination respects server total even when server caps page size', async () => {
  const a = app(); let calls = 0;
  a.ctx.qmsRequest = async () => ({ data: { total: 3, resultData: calls++ === 0 ? [{ id: 1 }, { id: 2 }] : [{ id: 3 }] } });
  assert.equal((await a.run('qmsSelectAll({}, 5000)')).length, 3);
  assert.equal(calls, 2);
});
test('malformed and prematurely empty pages fail instead of publishing partial data', async () => {
  for (const data of [{}, { total: 2, resultData: [] }]) {
    const a = app(); a.ctx.qmsRequest = async () => ({ data });
    await assert.rejects(a.run('qmsSelectAll({})'), /QMS/);
  }
});
test('repeated pages fail without looping indefinitely', async () => {
  const a = app(); a.ctx.qmsRequest = async () => ({ data: { total: 5, resultData: [{ id: 1 }] } });
  await assert.rejects(a.run('qmsSelectAll({})'), /不完整/);
});
test('numeric and string success statuses are accepted', async () => {
  for (const status of [200, '200']) {
    const a = app(); a.ctx.fetch = async () => ({ ok: true, status: 200, json: async () => ({ status }) });
    assert.equal((await a.run("qmsRequest('https://qms.sharetronic.com/qmsData/test')")).status, status);
  }
});
test('HTTP authorization failure is never accepted or retried', async () => {
  const a = app(); let calls = 0;
  a.ctx.fetch = async () => { calls++; return { ok: false, status: 401 }; };
  await assert.rejects(a.run("qmsRequest('https://qms.sharetronic.com/qmsData/test')"), /401/);
  assert.equal(calls, 1);
});
test('request timeouts abort and exhaust bounded retries', async () => {
  const a = app(); let calls = 0;
  a.ctx.setTimeout = (fn) => setTimeout(fn, 1);
  a.ctx.fetch = (_url, opts) => new Promise((_resolve, reject) => { calls++; opts.signal.addEventListener('abort', () => reject(new Error('aborted'))); });
  await assert.rejects(a.run("qmsRequest('https://qms.sharetronic.com/qmsData/test')"), /aborted/);
  assert.equal(calls, 3);
});
test('partial dashboard failure preserves previous data and cache', async () => {
  const a = app(); a.run("DASH.records = [{orderNumber:'previous'}]");
  a.ctx.qmsSelectAll = async (q) => { if (q.inspectionStatus === '2') throw new Error('offline'); return []; };
  assert.equal(await a.run('loadDashboardData(true)'), false);
  assert.equal(a.run('DASH.records[0].orderNumber'), 'previous');
  assert.equal(a.store.has('qms_dash_cache'), false);
});
test('cache rejects wrong factories, expired snapshots, and legacy payloads', () => {
  const a = app();
  for (const extra of [{ factoryCode: 'OTHER' }, { ts: Date.now() - 3600000 }, { version: 1 }]) {
    a.store.set('qms_dash_cache', JSON.stringify({ version: 2, factoryCode: 'STTH', ts: Date.now(), records: [], active: [], prevMonth: [], ...extra }));
    assert.equal(a.run('loadCachedDash()'), false);
  }
});
test('complete empty snapshot is valid and preserves prior-month statistics', () => {
  const a = app();
  a.store.set('qms_dash_cache', JSON.stringify({ version: 2, factoryCode: 'STTH', ts: Date.now(), records: [], active: [], prevMonth: [{ supplierName: 'fixture', syncInspectionResultName: '合格' }], overdueTotal: 0 }));
  assert.equal(a.run('loadCachedDash()'), true);
  assert.equal(a.run('DASH.prevPassRate'), 100);
});
test('late historical-month response cannot overwrite the latest month', async () => {
  const a = app(); const pending = [];
  a.ctx.qmsSelectAll = () => new Promise(resolve => pending.push(resolve));
  const older = a.run('setSbMonth(-1)'); const newer = a.run('setSbMonth(-2)');
  pending[1]([{ supplierName: 'newer', syncInspectionResultName: '合格' }]); await newer;
  pending[0]([{ supplierName: 'older', syncInspectionResultName: '退货' }]); await older;
  assert.equal(a.run('sbSuppliersData[0].code'), 'newer');
});
test('board orchestration starts only one pending trend request', () => {
  const a = app(); let requests = 0;
  for (const name of ['renderSbKpis', 'renderSbMatrixChart', 'renderSbTop10Chart', 'renderSbPareto', 'renderSbRiskList', 'renderSbAlerts', 'renderSbFilters', 'renderSbFilterTags']) a.ctx[name] = () => {};
  a.ctx.qmsCount = () => { requests++; return new Promise(() => {}); };
  a.run('originalRenderSbBoard(); originalRenderSbBoard();');
  assert.equal(requests, 12);
  assert.equal(a.run('sbTrendLoading'), true);
});
test('switching factory while old trend is pending still loads new factory', async () => {
  const a = app(); let finishOld;
  a.ctx.qmsCount = (query) => query.factoryCode === 'STTH' ? new Promise(r => { finishOld = r; }) : Promise.resolve(0);
  a.run('fetchSbTrend()');
  a.run("QMS_CONFIG.factoryCode = 'OTHER'");
  assert.equal(await a.run('fetchSbTrend()'), true);
  assert.equal(a.run('sbTrend12.length'), 12);
  assert.equal(a.run('sbTrendLoading'), false);
  finishOld(0);
});
test('complete refresh populates previous-month statistics and cache', async () => {
  const a = app();
  a.ctx.fetchSbTrend = async () => true;
  a.ctx.qmsSelectAll = async (q) => q.createDateStart && !q.createDateStart.startsWith(a.run('monthPrefix(0)')) ? [{ supplierName: 'fixture', syncInspectionResultName: '合格' }] : [];
  assert.equal(await a.run('loadDashboardData()'), true);
  assert.equal(a.run('DASH.prevPassRate'), 100);
  assert.equal(JSON.parse(a.store.get('qms_dash_cache')).prevMonth.length, 1);
});
test('chart recovers after empty-state markup replaced its canvas', () => {
  const a = app(); let disposed = false, cleared = false, created = 0;
  a.ctx.oldChart = { dispose() { disposed = true; } };
  a.ctx.chartElement = { querySelector() { return !cleared; }, replaceChildren() { cleared = true; } };
  a.ctx.echarts = { init() { created++; return { current: true }; } };
  a.run("sbCharts.top10 = oldChart; ensureSbChart('top10', chartElement); ensureSbChart('top10', chartElement)");
  assert.equal(disposed, true); assert.equal(cleared, true); assert.equal(created, 1);
});
test('all added interface messages provide English and Thai with matching placeholders', () => {
  const a = app();
  for (const [source, translations] of Object.entries(a.run('UI_TEXT'))) {
    const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort();
    for (const translated of translations) {
      assert.ok(translated.trim(), source);
      assert.deepEqual(placeholders(translated), placeholders(source), source);
      assert.doesNotMatch(translated, /[\u4e00-\u9fff]/, source);
    }
  }
});
test('risk reasons update on language change without changing numeric risk classification', () => {
  const a = app();
  a.run("sbSuppliersData = computeSbSuppliers(Array.from({length: 6}, () => ({supplierName:'Example',syncInspectionResultName:'退货'})))");
  const level = a.run('sbSuppliersData[0].risk.level');
  a.run("locale = 'en'");
  const en = a.run('sbRiskInfo(sbSuppliersData[0])');
  assert.equal(en.level, level); assert.match(en.reasons[0], /Pass rate/);
  a.run("locale = 'th'");
  assert.match(a.run('sbRiskInfo(sbSuppliersData[0]).reasons[0]'), /อัตราผ่าน/);
  a.run("locale = 'mix'");
  assert.match(a.run("ui('质量预警')"), /质量预警 · /);
});
test('wallboard cycles the full filtered list and overview retains pagination', () => {
  const a = app(); let options;
  a.ctx.createLoopingTableScroller = (_, value) => { options = value; return { stop() {} }; };
  a.ctx.computeTableRows = () => Array.from({length: 1500}, (_, id) => ({ id }));
  a.ctx.rowHtml = r => `<tr data-row="${r.id}"></tr>`;
  a.run('wallboardMode = true; renderTableRows()');
  assert.equal(options.count, 1500); assert.equal(options.speed, 72);
  assert.equal(a.elements.get('#tablePagination').style.display, 'none');
  options.renderWindow(1499, 3);
  assert.match(a.elements.get('#iqcTableBody').innerHTML, /data-row="1499".*data-row="0".*data-row="1"/);
  a.run('wallboardMode = false; gotoPage(75)');
  assert.match(a.elements.get('#iqcTableBody').innerHTML, /data-row="1499"/);
  assert.equal((a.elements.get('#iqcTableBody').innerHTML.match(/data-row=/g) || []).length, 20);
  assert.equal(a.elements.get('#pageInfo').textContent, '75 / 75');
  assert.equal(a.elements.get('#tablePagination').style.display, 'flex');
});

test('legacy tasks route resolves to overview', () => {
  const a = app(); let hash;
  a.ctx.history = { replaceState(_, __, value) { hash = value; } };
  a.ctx.scheduleChartResize = () => {}; a.ctx.updatePageUi = () => {};
  a.run("setPage('tasks', false)");
  assert.equal(a.run('currentPage'), 'overview'); assert.equal(hash, '#overview');
});

test('refresh retains the current task after insertion; explicit filtering resets the loop', () => {
  const a = app(); let options;
  a.ctx.createLoopingTableScroller = (_, value) => {
    options = value; return { position: () => ({ index: 2, offset: 12 }), stop() {} };
  };
  let rows = ['A', 'B', 'C', 'D'].map(orderNumber => ({ orderNumber }));
  a.ctx.computeTableRows = () => rows; a.ctx.rowHtml = r => `<tr>${r.orderNumber}</tr>`;
  a.run('wallboardMode = true; renderTableRows()');
  rows = [{ orderNumber: 'NEW' }, ...rows]; a.run('renderTableRows()');
  assert.equal(options.initialIndex, 3); assert.equal(options.initialOffset, 12);
  a.run('applyFilters()'); assert.equal(options.initialIndex, undefined);
});
