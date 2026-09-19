// Local-only synthetic QMS responses. This file is excluded from production builds.
(() => {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const rows = Array.from({ length: 6000 }, (_, i) => ({
    orderNumber: `TEST-${i}`, materialNumber: `MAT-${i}`, materialName: 'Synthetic inspection material',
    supplierName: `Fixture supplier ${Math.floor(i / 20)}`, supplierCode: `S-${Math.floor(i / 20)}`,
    materialCategory: 'Fixture category', qty: 10, createDate: date,
    inspectionStatus: i % 4 === 0 ? '0' : '1', syncInspectionResultName: i % 4 === 0 ? '' : i % 3 === 0 ? '退货' : '合格',
    expeditedFlagName: '否', inspectorName: `Fixture inspector ${Math.floor(i / 4) % 7}`, taskName: 'IQC', totalTime: '1天2时'
  }));
  // Do not reuse real browser cache or persist fixture records.
  const store = new Map();
  Object.defineProperty(window, 'localStorage', { value: {
    getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k)
  } });
  window.fetch = async (_url, init) => {
    const { path, query: q } = JSON.parse(init.body);
    if (path.endsWith('/factory')) return Response.json({ status: 200, data: [{ dictValue: 'STTH', dictLabel: 'Fixture factory' }] });
    let list = rows;
    const param = k => q[`searchParams[${k}]`];
    if (param('createDateStart')) list = list.filter(r => r.createDate >= param('createDateStart'));
    if (param('createDateEnd')) list = list.filter(r => r.createDate <= param('createDateEnd'));
    if (param('inspectionStatus')) list = list.filter(r => r.inspectionStatus === param('inspectionStatus'));
    if (param('supplierName')) list = list.filter(r => r.supplierName === param('supplierName'));
    if (param('syncInspectionResult')) list = list.filter(r => r.syncInspectionResultName === ({ 1: '合格', 2: '退货', 3: '特采' })[param('syncInspectionResult')]);
    const size = Math.min(Number(q.pageSize), 500), start = (Number(q.pageNum) - 1) * size;
    return Response.json({ status: 200, data: { total: list.length, resultData: list.slice(start, start + size) } });
  };
})();
