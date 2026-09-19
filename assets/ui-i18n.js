// Interface copy only. QMS names, identifiers and status codes remain source data.
const UI_TEXT = {
  '设置': ['Settings', 'ตั้งค่า'], '显示设置': ['Display settings', 'ตั้งค่าการแสดงผล'],
  '关闭设置': ['Close settings', 'ปิดการตั้งค่า'], '语言': ['Language', 'ภาษา'], '主题效果': ['Appearance', 'รูปแบบธีม'],
  '普通透明': ['Transparent', 'โปร่งใส'], '背景透明度': ['Background transparency', 'ความโปร่งใสของพื้นหลัง'],
  '不透明': ['Opaque', 'ทึบแสง'], '完全透明': ['Fully transparent', 'โปร่งใสทั้งหมด'],
  '更改即时生效，自动保存': ['Changes apply instantly and save automatically', 'ใช้การเปลี่ยนแปลงทันทีและบันทึกอัตโนมัติ'],
  '仅调整背景，文字和图表保持清晰': ['Only backgrounds change; text and charts stay clear', 'ปรับเฉพาะพื้นหลัง ข้อความและกราฟยังคงชัดเจน'],
  '选择透明主题后可调节': ['Choose a transparent theme to adjust', 'เลือกธีมโปร่งใสเพื่อปรับค่า'],
  '主题': ['Theme', 'ธีม'], '经典': ['Classic', 'คลาสสิก'], '液态玻璃': ['Liquid Glass', 'กระจกใส'],
  '全部任务循环滚动': ['Cycling through all tasks', 'เลื่อนวนงานทั้งหมด'],
  '供应商质量看板': ['Supplier quality dashboard', 'แดชบอร์ดคุณภาพซัพพลายเออร์'],
  '来料质量 / 供应商绩效 / 风险预警': ['Incoming quality / Supplier performance / Risk alerts', 'คุณภาพขาเข้า / ผลงานซัพพลายเออร์ / การแจ้งเตือนความเสี่ยง'],
  '月': ['Month', 'เดือน'], '季': ['Quarter', 'ไตรมาส'], '年': ['Year', 'ปี'],
  '物料类别': ['Material category', 'ประเภทวัสดุ'], '供应商': ['Supplier', 'ซัพพลายเออร์'], '工厂': ['Factory', 'โรงงาน'],
  '刷新': ['Refresh', 'รีเฟรช'], '看板模式': ['Wallboard', 'โหมดแดชบอร์ด'], '更新于': ['Updated', 'อัปเดตเมื่อ'],
  '检验供应商数': ['Inspected suppliers', 'ซัพพลายเออร์ที่ตรวจแล้ว'], '来料检验批次': ['Incoming lots', 'ล็อตตรวจรับเข้า'],
  '批次合格率': ['Batch pass rate', 'อัตราผ่านรายล็อต'], '不合格批次率': ['Rejected lot rate', 'อัตราล็อตไม่ผ่าน'],
  '特采批次': ['Special acceptance lots', 'ล็อตยอมรับพิเศษ'], '风险供应商': ['At-risk suppliers', 'ซัพพลายเออร์เสี่ยง'],
  '最近12个月供应商质量趋势': ['Supplier quality · Last 12 months', 'แนวโน้มคุณภาพซัพพลายเออร์ 12 เดือน'],
  '目标 98.5%': ['Target 98.5%', 'เป้าหมาย 98.5%'], '供应商质量风险矩阵': ['Supplier risk matrix', 'เมทริกซ์ความเสี่ยงซัพพลายเออร์'],
  '倒数供应商 TOP10': ['Bottom 10 suppliers', 'ซัพพลายเออร์ 10 อันดับท้าย'], '不良项目 Pareto': ['Defect Pareto', 'พาเรโตข้อบกพร่อง'],
  '按不良项目': ['By defect', 'ตามข้อบกพร่อง'], '按物料类别': ['By category', 'ตามประเภทวัสดุ'],
  '重点风险供应商': ['Priority risk suppliers', 'ซัพพลายเออร์เสี่ยงที่ต้องติดตาม'], '质量预警': ['Quality alerts', 'การแจ้งเตือนคุณภาพ'],
  '合格率': ['Pass rate', 'อัตราผ่าน'], '检验批次': ['Inspection lots', 'ล็อตตรวจสอบ'], '环比': ['vs prior period', 'เทียบช่วงก่อน'],
  '风险原因': ['Risk reason', 'สาเหตุความเสี่ยง'], '风险等级': ['Risk level', 'ระดับความเสี่ยง'],
  '工厂选择': ['Select factory', 'เลือกโรงงาน'],
  '选择要查看的收料工厂，切换后看板数据将重新加载。': ['Select a receiving factory. The dashboard will reload its data.', 'เลือกโรงงานรับสินค้า ระบบจะโหลดข้อมูลแดชบอร์ดใหม่'],
  '供应商质量分析': ['Supplier quality analysis', 'วิเคราะห์คุณภาพซัพพลายเออร์'], '最近 6 个月趋势': ['Last 6 months', 'แนวโน้ม 6 เดือนล่าสุด'],
  '主要不良 TOP5': ['Top 5 defects', 'ข้อบกพร่อง 5 อันดับแรก'], '最近检验记录': ['Recent inspections', 'การตรวจล่าสุด'],
  '自定义日期': ['Custom dates', 'กำหนดวันที่'], '开始日期': ['Start date', 'วันที่เริ่ม'], '结束日期': ['End date', 'วันที่สิ้นสุด'],
  '上个月': ['Previous month', 'เดือนก่อน'], '下个月': ['Next month', 'เดือนถัดไป'], '上一页': ['Previous page', 'หน้าก่อน'], '下一页': ['Next page', 'หน้าถัดไป'],
  '切换工厂': ['Switch factory', 'เปลี่ยนโรงงาน'], '取消': ['Clear', 'ล้าง'], '操作完成': ['Done', 'เสร็จแล้ว'],
  '柱 = 不合格批次数 · 折线 = 批次合格率（与 QMS 看板同口径）': ['Bars: nonconforming lots · Line: batch pass rate (QMS definition)', 'แท่ง: ล็อตไม่ผ่าน · เส้น: อัตราผ่านรายล็อต (ตาม QMS)'],
  'SHARETRONIC.IQC · IQC 来料检验看板': ['SHARETRONIC.IQC · Incoming quality dashboard', 'SHARETRONIC.IQC · แดชบอร์ดคุณภาพขาเข้า'],
  '共': ['Total', 'รวม'], '家': ['suppliers', 'ราย'], '批': ['lots', 'ล็อต'], '批次': ['Lots', 'ล็อต'],
  '本月检验供应商': ['Suppliers inspected this month', 'ซัพพลายเออร์ที่ตรวจเดือนนี้'], '本月来料检验批次': ['Incoming lots this month', 'ล็อตขาเข้าเดือนนี้'],
  '本月特采批次': ['Special acceptance this month', 'ล็อตยอมรับพิเศษเดือนนี้'], '重点关注': ['Needs attention', 'ต้องติดตาม'],
  '不合格批次 / 总批次': ['Rejected lots / All lots', 'ล็อตไม่ผ่าน / ล็อตทั้งหมด'],
  '无数据': ['No data', 'ไม่มีข้อมูล'], '图表库未加载': ['Charts unavailable', 'โหลดกราฟไม่ได้'], '请检查网络后重试': ['Check the connection and retry', 'ตรวจสอบเครือข่ายแล้วลองใหม่'],
  '暂无供应商质量数据': ['No supplier quality data', 'ไม่มีข้อมูลคุณภาพซัพพลายเออร์'], '请调整时间范围或筛选条件': ['Adjust the period or filters', 'เปลี่ยนช่วงเวลาหรือตัวกรอง'],
  '暂无不合格批次': ['No nonconforming lots', 'ไม่มีล็อตไม่ผ่าน'], '当前范围内没有退货或特采批次': ['No returns or special acceptance in this period', 'ไม่มีการคืนหรือยอมรับพิเศษในช่วงนี้'],
  '暂无不良项目数据': ['No defect data', 'ไม่มีข้อมูลข้อบกพร่อง'], 'QMS 接口未提供不良类型字段': ['QMS does not provide defect categories', 'QMS ไม่ได้ส่งข้อมูลประเภทข้อบกพร่อง'],
  '暂无不良类型数据（QMS 接口未提供不良类型字段）': ['No defect categories available from QMS', 'ไม่มีข้อมูลประเภทข้อบกพร่องจาก QMS'],
  '暂无风险供应商': ['No at-risk suppliers', 'ไม่มีซัพพลายเออร์เสี่ยง'], '暂无质量预警': ['No quality alerts', 'ไม่มีการแจ้งเตือนคุณภาพ'],
  '暂无异常': ['No exceptions', 'ไม่มีความผิดปกติ'], '暂无待检任务': ['No pending inspections', 'ไม่มีงานรอตรวจ'], '工厂列表加载中…': ['Loading factories…', 'กำลังโหลดโรงงาน…'],
  '趋势加载中…': ['Loading trend…', 'กำลังโหลดแนวโน้ม…'], '趋势加载失败': ['Trend could not be loaded', 'โหลดแนวโน้มไม่สำเร็จ'],
  '当前筛选范围内暂无该供应商的检验记录': ['No inspections for this supplier in the selected period', 'ไม่มีรายการตรวจของซัพพลายเออร์นี้ในช่วงที่เลือก'],
  '高风险': ['High risk', 'เสี่ยงสูง'], '中风险': ['Medium risk', 'เสี่ยงปานกลาง'], '低风险': ['Low risk', 'เสี่ยงต่ำ'], '正常': ['Normal', 'ปกติ'],
  '样本不足': ['Insufficient sample', 'ตัวอย่างไม่เพียงพอ'], '重点观察': ['Watch closely', 'เฝ้าระวัง'], '稳定供应商': ['Stable supplier', 'ซัพพลายเออร์เสถียร'],
  '检验批次不足 5 批，暂不参与正式排名': ['Fewer than 5 lots; excluded from formal ranking', 'น้อยกว่า 5 ล็อต ไม่ร่วมการจัดอันดับ'],
  '无检验结果': ['No inspection results', 'ไม่มีผลการตรวจ'], '单批严重异常': ['Single-lot critical issue', 'ปัญหารุนแรงในล็อตเดียว'],
  '新增': ['New', 'รายใหม่'], '存在风险': ['Risk detected', 'พบความเสี่ยง'], '风险提示': ['Risk notes', 'ข้อควรระวัง'], '最近批次': ['Latest lot', 'ล็อตล่าสุด'],
  '合格': ['Pass', 'ผ่าน'], '不合格': ['Fail', 'ไม่ผ่าน'], '特采': ['Special acceptance', 'ยอมรับพิเศษ'], '合格批次': ['Passed lots', 'ล็อตผ่าน'],
  '不合格批次': ['Nonconforming lots', 'ล็อตไม่ผ่าน'], '合格率%': ['Pass rate %', 'อัตราผ่าน %'], '参考线': ['Reference', 'เส้นอ้างอิง'],
  '目标 ': ['Target ', 'เป้าหมาย '], '样本 ': ['Sample ', 'ตัวอย่าง '], ' 批': [' lots', ' ล็อต'],
  '单号': ['Inspection no.', 'เลขที่ใบตรวจ'], '料号': ['Material no.', 'รหัสวัสดุ'], '物料': ['Material', 'วัสดุ'],
  '物料名称': ['Material name', 'ชื่อวัสดุ'], '收料工厂': ['Receiving factory', 'โรงงานรับสินค้า'], '供应商编码': ['Supplier code', 'รหัสซัพพลายเออร์'],
  '来料数量': ['Received quantity', 'จำนวนรับเข้า'], '是否加急': ['Urgent', 'เร่งด่วน'], '送检日期': ['Submitted at', 'วันที่ส่งตรวจ'],
  '检验员': ['Inspector', 'ผู้ตรวจ'], '流程节点': ['Process stage', 'ขั้นตอน'], '时效状态': ['SLA status', 'สถานะ SLA'], '检验结果': ['Result', 'ผลตรวจ'],
  '已超时': ['Overdue', 'เกินเวลา'], 'SLA 内': ['Within SLA', 'ภายใน SLA'], '未分配': ['Unassigned', 'ยังไม่มอบหมาย'],
  '正在刷新数据…': ['Refreshing…', 'กำลังรีเฟรช…'], '数据已更新': ['Data updated', 'อัปเดตข้อมูลแล้ว'],
  '刷新未完成，请检查同步状态': ['Refresh incomplete; check sync status', 'รีเฟรชไม่ครบ โปรดตรวจสอบสถานะซิงค์'], '刷新失败，请重试': ['Refresh failed; retry', 'รีเฟรชไม่สำเร็จ โปรดลองใหม่'],
  '正在加载季度数据…': ['Loading quarterly data…', 'กำลังโหลดข้อมูลไตรมาส…'], '正在加载年度数据…': ['Loading yearly data…', 'กำลังโหลดข้อมูลรายปี…'],
  '周期数据加载失败，请重试': ['Period data failed; retry', 'โหลดข้อมูลช่วงเวลาไม่สำเร็จ โปรดลองใหม่'], '月份数据加载失败，请重试': ['Month data failed; retry', 'โหลดข้อมูลรายเดือนไม่สำเร็จ โปรดลองใหม่'],
  '正在同步 QMS 数据…': ['Syncing QMS data…', 'กำลังซิงค์ข้อมูล QMS…'], 'QMS 连接异常，请检查账号或网络。': ['QMS connection failed; check account or network.', 'เชื่อมต่อ QMS ไม่สำเร็จ ตรวจสอบบัญชีหรือเครือข่าย'],
  '显示上次缓存数据 · 实时接口暂不可用': ['Showing cached data · Live connection unavailable', 'แสดงข้อมูลแคช · การเชื่อมต่อสดไม่พร้อม'],
  '已连接 QMS 数据源 · 每 5 分钟自动同步': ['QMS connected · Auto-sync every 5 minutes', 'เชื่อมต่อ QMS แล้ว · ซิงค์ทุก 5 นาที'],
  '倒数前10名供应商': ['Bottom 10 suppliers', 'ซัพพลายเออร์ 10 อันดับท้าย'], '正向前10名供应商': ['Top 10 suppliers', 'ซัพพลายเออร์ 10 อันดับแรก'],
  '正在显示 {start}-{end} / {total}': ['Showing {start}-{end} / {total}', 'แสดง {start}-{end} / {total}'],
  '已切换到 {name}': ['Switched to {name}', 'เปลี่ยนเป็น {name}'], '环比 {value}': ['vs prior period {value}', 'เทียบช่วงก่อน {value}'],
  '目标：{value}%': ['Target: {value}%', 'เป้าหมาย: {value}%'],
  '合格率 {value}% 低于目标 {target}%': ['Pass rate {value}% below target {target}%', 'อัตราผ่าน {value}% ต่ำกว่าเป้าหมาย {target}%'],
  '{value} 批不合格': ['{value} nonconforming lots', 'ล็อตไม่ผ่าน {value} ล็อต'],
  '环比下降 {value}pp': ['Down {value}pp vs prior period', 'ลดลง {value}pp จากช่วงก่อน'], '特采率 {value}% 偏高': ['Special acceptance rate {value}% is high', 'อัตรายอมรับพิเศษ {value}% สูง'],
  '{value} 条需关注': ['{value} items need attention', 'ต้องติดตาม {value} รายการ'], '{value} 批等待检验员接单': ['{value} lots awaiting an inspector', '{value} ล็อตรอผู้ตรวจรับงาน'],
  '累计送检 · 截止 {time}': ['Cumulative intake · as of {time}', 'ส่งตรวจสะสม · ถึง {time}'],
  '近 7 日 {days} 天有数据 · 均值 {rate}%': ['{days} days with data · average {rate}%', 'มีข้อมูล {days} วัน · เฉลี่ย {rate}%'],
  '仅 {date} 有数据 · {rate}%': ['Only {date} has data · {rate}%', 'มีข้อมูลเฉพาะ {date} · {rate}%'],
  '近 7 日暂无送检数据': ['No inspections in the last 7 days', 'ไม่มีข้อมูลการตรวจใน 7 วันล่าสุด'],
  '数据加载失败': ['Data loading failed', 'โหลดข้อมูลไม่สำเร็จ'], 'View': ['View', 'ดูรายละเอียด']
};

function ui(source, params = {}) {
  const pair = UI_TEXT[source];
  const text = !pair ? source : locale === 'en' ? pair[0] : locale === 'th' ? pair[1] : locale === 'mix' ? `${source} · ${pair[1]}` : source;
  return text.replace(/\{(\w+)\}/g, (match, key) => params[key] ?? match);
}

function translateStaticUi(root = document) {
  root.querySelectorAll('[data-ui]').forEach(node => { node.textContent = ui(node.dataset.ui); });
  for (const attr of ['title', 'aria-label']) {
    root.querySelectorAll(`[data-ui-${attr}]`).forEach(node => node.setAttribute(attr, ui(node.getAttribute(`data-ui-${attr}`))));
  }
}

function supplierMonthLabel(offset) {
  const date = new Date(); date.setDate(1); date.setMonth(date.getMonth() + offset);
  const format = lang => new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', calendar: 'gregory' }).format(date);
  return locale === 'mix' ? `${format('zh-CN')} · ${format('th')}` : format(locale === 'zh' ? 'zh-CN' : locale);
}
