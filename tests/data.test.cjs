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
  vm.runInContext(source.slice(0, source.lastIndexOf('    applyLocale();')), ctx);
  vm.runInContext('const originalRenderSbBoard = renderSbBoard;', ctx);
  vm.runInContext('renderAll = () => {}; renderSbBoard = () => {}; renderSbTrendChart = () => {}; showToast = () => {}; sleep = async () => {};', ctx);
  return { ctx, store, run: (s) => vm.runInContext(s, ctx) };
}
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
