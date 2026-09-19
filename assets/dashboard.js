/*
     * QMS integration contract (replace demo data with API responses):
     * const QMS_CONFIG = {
     *   enabled: true,
     *   baseUrl: '/api/qms',
     *   endpoints: {
     *     dashboard: '/iqc/dashboard/summary',
     *     inspections: '/iqc/incoming-inspections',
     *     inspectors: '/iqc/inspectors/pending',
     *     suppliers: '/iqc/suppliers/ranking'
     *   }
     * };
     * Expected inspection fields: inspectionNo, materialNo, materialName,
     * category, factory, supplierName, supplierCode, quantity, urgent,
     * submitTime, inspector, processNode, slaStatus, result.
     */
    const FACTORY_NAME = 'SHARETRONIC DATA TECHNOLOGY (THAILAND)CO.,LTD.';
    const QMS_CONFIG = window.QMS_CONFIG || {
      enabled: true,
      baseUrl: 'https://qms.sharetronic.com',
      ssoUrl: 'https://qms.sharetronic.com/qmsSso/oauth/login',
      supplierQualityUrl: 'https://qms.sharetronic.com/qmsSupplierQuality',
      dataUrl: 'https://qms.sharetronic.com/qmsData',
      proxyUrl: 'https://iqc-proxy.yyiqc1927.workers.dev',
      factoryCode: 'STTH',
      factoryName: 'SHARETRONIC DATA TECHNOLOGY (THAILAND)CO.,LTD.'
    };
    window.QMS_CONFIG = QMS_CONFIG;

    const I18N = {
      zh: {
        current_plant: '当前工厂', navigation: '导航菜单', menu_overview: '质量总览', menu_tasks: '检验任务', menu_supplier: '供应商质量', menu_reports: '报表中心', menu_settings: '系统设置', sync_copy: '已连接 QMS 数据源 · 每 5 分钟自动同步。', role_label: '质量管理员', breadcrumb_parent: '质量运营', breadcrumb_current: 'IQC 来料检验', hero_kicker: '来料质量运营', hero_title: 'SHARETRONIC.IQC 来料检验看板', hero_subtitle: '连接 QMS 的实时质量看板，快速识别待检、超时与供应商风险。', date_today: '—', refresh: '刷新数据', export: '导出看板', kpi_incoming: '今日送检批次', kpi_pending: '待检总批次', kpi_overdue: '超时未完成', kpi_passrate: '本月一次合格率', kpi_urgent: '加急批次', unit_lot: '批', unit_urgent: '加急', vs_yesterday: '较昨日', need_assignment: '需及时分配', vs_last_week: '较上周', vs_last_month: '较上月', of_today_incoming: '占今日送检', flow_title: '检验流转总览', flow_subtitle: '按检验状态实时分布', range_today_short: '今日', range_week_short: '本周', range_month_short: '本月', unit_lot_full: '检验批次', flow_caption: '今日累计送检', status_pending: '待检', status_processing: '检验中', status_done: '已完成', status_overdue: '超时未完成', trend_title: '一次合格率趋势', trend_subtitle: '近 7 日来料质量变化', legend_passrate: '一次合格率', legend_lots: '送检批次', trend_note: '根据近 7 日检验数据动态计算', alert_title: '异常与预警', alert_subtitle: '需要质量团队及时关注', alert_count: '3 条需关注', alert_overdue: '时效已超 SLA', alert_urgent: '加急任务待分配', alert_fail: '供应商批次不合格', view_all_alerts: '查看全部预警', table_title: '来料检验任务', table_subtitle: '接入 QMS 的最新检验任务 · 支持按状态、加急与关键字快速定位', search_placeholder: '搜索单号 / 料号 / 供应商', range_today: '今日', range_week: '本周', range_month: '本月', all_status: '全部状态', urgent_only: '仅看加急', live_data: 'QMS 实时同步', refresh_every: '每 5 分钟刷新', unit_task: '条任务', col_id: '单号', col_part: '料号', col_name: '物料名称', col_category: '物料类别', col_factory: '收料工厂', col_supplier: '供应商 / 编码', col_qty: '来料数量', col_urgent: '加急', col_date: '送检日期', col_inspector: '检验员', col_node: '流程节点', col_sla: '时效状态', col_result: '检验结果', col_action: '操作', yes: '是', no: '否', result_processing: '进行中', result_pending: '未开始', result_pass: '合格', empty_state: '没有符合当前筛选条件的任务', inspector_title: '检验员待检统计', inspector_subtitle: '当前待检任务 · 按数量排序', unit_waiting_lot: '个待检批次', capacity_label: '团队产能使用率', result_title: '检验结果统计', result_subtitle: '本月累计', total_inspections: '总检验批次', result_special: '特采', result_fail: '不合格', result_note: '一次合格率', supplier_title: '供应商质量排名', supplier_subtitle: '按本月一次合格率', top_rank: '正向排名', bottom_rank: '倒数排名', bottom_risk: '倒数第一供应商', supplier_batches: '批', close: '关闭', detail_kicker: 'QMS 检验记录', detail_part: '料号', detail_material: '物料名称', detail_category: '物料类别', detail_supplier: '供应商', detail_quantity: '来料数量', detail_inspector: '检验员', detail_date: '送检日期', detail_status: '当前状态', detail_sla: 'SLA 时限', detail_timeline: '流程轨迹', timeline_received: '收料登记', timeline_submitted: '送检申请', timeline_inspecting: 'IQC 检验', timeline_closed: '结果关闭', open_qms: '打开 QMS 检验单', last_refresh: '上次更新', refresh_done: '数据已刷新', export_done: '已导出当前筛选任务', alert_done: '暂无更多预警', qms_demo: '演示模式：请在 QMS_CONFIG 中开启真实接口。'
      },
      th: {
        current_plant: 'โรงงานปัจจุบัน', navigation: 'เมนูนำทาง', menu_overview: 'ภาพรวมคุณภาพ', menu_tasks: 'งานตรวจรับเข้า', menu_supplier: 'คุณภาพซัพพลายเออร์', menu_reports: 'ศูนย์รายงาน', menu_settings: 'ตั้งค่าระบบ', sync_copy: 'เชื่อมต่อ QMS แล้ว · ซิงค์อัตโนมัติทุก 5 นาที', role_label: 'ผู้ดูแลคุณภาพ', breadcrumb_parent: 'การดำเนินงานคุณภาพ', breadcrumb_current: 'ตรวจรับเข้า IQC', hero_kicker: 'การดำเนินงานคุณภาพขาเข้า', hero_title: 'SHARETRONIC.IQC แดชบอร์ดตรวจรับเข้า IQC', hero_subtitle: 'แดชบอร์ดคุณภาพแบบเรียลไทม์จาก QMS เพื่อค้นหางานรอตรวจ งานเกินเวลา และความเสี่ยงซัพพลายเออร์', date_today: '—', refresh: 'รีเฟรชข้อมูล', export: 'ส่งออกแดชบอร์ด', kpi_incoming: 'ล็อตส่งตรวจวันนี้', kpi_pending: 'ล็อตรอตรวจ', kpi_overdue: 'เกินกำหนด', kpi_passrate: 'อัตราผ่านครั้งแรกเดือนนี้', kpi_urgent: 'ล็อตเร่งด่วน', unit_lot: 'ล็อต', unit_urgent: 'เร่งด่วน', vs_yesterday: 'เทียบเมื่อวาน', need_assignment: 'ต้องจัดสรรทันที', vs_last_week: 'เทียบสัปดาห์ก่อน', vs_last_month: 'เทียบเดือนก่อน', of_today_incoming: 'ของงานส่งตรวจวันนี้', flow_title: 'ภาพรวมการไหลของการตรวจสอบ', flow_subtitle: 'กระจายตามสถานะการตรวจแบบเรียลไทม์', range_today_short: 'วันนี้', range_week_short: 'สัปดาห์นี้', range_month_short: 'เดือนนี้', unit_lot_full: 'ล็อตตรวจสอบ', flow_caption: 'ส่งตรวจสะสมวันนี้', status_pending: 'รอตรวจ', status_processing: 'กำลังตรวจ', status_done: 'เสร็จสิ้น', status_overdue: 'เกินกำหนด', trend_title: 'แนวโน้มอัตราผ่านครั้งแรก', trend_subtitle: 'การเปลี่ยนแปลงคุณภาพขาเข้า 7 วันล่าสุด', legend_passrate: 'อัตราผ่านครั้งแรก', legend_lots: 'ล็อตส่งตรวจ', trend_note: 'คำนวณจากข้อมูลตรวจ 7 วันล่าสุด', alert_title: 'ความผิดปกติและการแจ้งเตือน', alert_subtitle: 'ประเด็นที่ทีมคุณภาพควรติดตาม', alert_count: '3 รายการต้องติดตาม', alert_overdue: 'เกิน SLA แล้ว', alert_urgent: 'งานเร่งด่วนรอจัดสรร', alert_fail: 'ล็อตซัพพลายเออร์ไม่ผ่าน', view_all_alerts: 'ดูการแจ้งเตือนทั้งหมด', table_title: 'งานตรวจรับเข้าวัตถุดิบ', table_subtitle: 'งานตรวจล่าสุดจาก QMS · ค้นหาตามสถานะ งานเร่งด่วน และคำสำคัญได้', search_placeholder: 'ค้นหาเลขที่ / รหัสวัสดุ / ซัพพลายเออร์', range_today: 'วันนี้', range_week: 'สัปดาห์นี้', range_month: 'เดือนนี้', all_status: 'ทุกสถานะ', urgent_only: 'เฉพาะเร่งด่วน', live_data: 'ซิงค์ QMS แบบเรียลไทม์', refresh_every: 'รีเฟรชทุก 5 นาที', unit_task: 'งาน', col_id: 'เลขที่', col_part: 'รหัสวัสดุ', col_name: 'ชื่อวัสดุ', col_category: 'ประเภทวัสดุ', col_factory: 'โรงงานรับของ', col_supplier: 'ซัพพลายเออร์ / รหัส', col_qty: 'จำนวนรับเข้า', col_urgent: 'เร่งด่วน', col_date: 'วันที่ส่งตรวจ', col_inspector: 'ผู้ตรวจสอบ', col_node: 'ขั้นตอน', col_sla: 'สถานะเวลา', col_result: 'ผลตรวจ', col_action: 'ดำเนินการ', yes: 'ใช่', no: 'ไม่ใช่', result_processing: 'กำลังดำเนินการ', result_pending: 'ยังไม่เริ่ม', result_pass: 'ผ่าน', empty_state: 'ไม่พบงานตามเงื่อนไขที่เลือก', inspector_title: 'สถิติงานรอตรวจตามผู้ตรวจ', inspector_subtitle: 'งานรอตรวจปัจจุบัน · เรียงตามจำนวน', unit_waiting_lot: 'ล็อตรอตรวจ', capacity_label: 'อัตราใช้กำลังการตรวจของทีม', result_title: 'สถิติผลการตรวจ', result_subtitle: 'สะสมเดือนนี้', total_inspections: 'ล็อตตรวจทั้งหมด', result_special: 'ยอมรับพิเศษ', result_fail: 'ไม่ผ่าน', result_note: 'อัตราผ่านครั้งแรก', supplier_title: 'อันดับคุณภาพซัพพลายเออร์', supplier_subtitle: 'ตามอัตราผ่านครั้งแรกเดือนนี้', top_rank: 'อันดับสูงสุด', bottom_rank: 'อันดับท้าย', bottom_risk: 'ซัพพลายเออร์อันดับสุดท้าย', supplier_batches: 'ล็อต', close: 'ปิด', detail_kicker: 'บันทึกการตรวจ QMS', detail_part: 'รหัสวัสดุ', detail_material: 'ชื่อวัสดุ', detail_category: 'ประเภทวัสดุ', detail_supplier: 'ซัพพลายเออร์', detail_quantity: 'จำนวนรับเข้า', detail_inspector: 'ผู้ตรวจสอบ', detail_date: 'วันที่ส่งตรวจ', detail_status: 'สถานะปัจจุบัน', detail_sla: 'เวลา SLA', detail_timeline: 'เส้นทางกระบวนการ', timeline_received: 'ลงทะเบียนรับของ', timeline_submitted: 'ยื่นคำขอตรวจ', timeline_inspecting: 'ตรวจ IQC', timeline_closed: 'ปิดผลตรวจ', open_qms: 'เปิดใบตรวจใน QMS', last_refresh: 'อัปเดตล่าสุด', refresh_done: 'รีเฟรชข้อมูลแล้ว', export_done: 'ส่งออกงานตามตัวกรองแล้ว', alert_done: 'ไม่มีการแจ้งเตือนเพิ่มเติม', qms_demo: 'โหมดสาธิต: เปิดใช้อินเทอร์เฟซจริงได้ใน QMS_CONFIG'
      }
    };

    Object.assign(I18N.zh, {
      factory_label: '当前工厂', factory_sub: '泰国 · 工厂 01 · IQC', supplier_board_subtitle: '独立供应商质量看板 · 柱状图可横向滚动，排名列表可纵向滚动', supplier_chart_hint: '批次合格率 · 供应商 Top 10', score: '合格率', enter_wallboard: '来料检验看板', exit_wallboard: '退出看板', wallboard_live: '来料检验看板 · 实时', sidebar_hide: '收起导航', sidebar_show: '展开导航', top_risk: '正向第一供应商'
    });
    Object.assign(I18N.th, {
      factory_label: 'โรงงานปัจจุบัน', factory_sub: 'ประเทศไทย · โรงงาน 01 · IQC', supplier_board_subtitle: 'แดชบอร์ดคุณภาพซัพพลายเออร์แยกต่างหาก · เลื่อนกราฟแนวนอนและรายการแนวตั้งได้', supplier_chart_hint: 'อัตราผ่านรายล็อต · ซัพพลายเออร์ Top 10', score: 'อัตราผ่าน', enter_wallboard: 'โหมดแดชบอร์ด', exit_wallboard: 'ออกจากโหมดแดชบอร์ด', wallboard_live: 'โหมดแดชบอร์ด · เรียลไทม์', sidebar_hide: 'ซ่อนเมนูนำทาง', sidebar_show: 'แสดงเมนูนำทาง', top_risk: 'ซัพพลายเออร์อันดับหนึ่ง'
    });
    I18N.en = {
      current_plant: 'Current plant', factory_sub: 'Thailand · Plant 01 · IQC', navigation: 'Navigation', menu_overview: 'Quality overview', menu_tasks: 'Inspection tasks', menu_supplier: 'Supplier quality', menu_reports: 'Reports center', menu_settings: 'System settings', sync_copy: 'QMS connected · auto-sync every 5 min.', role_label: 'Quality administrator', breadcrumb_parent: 'Quality operations', breadcrumb_current: 'IQC incoming inspection', hero_kicker: 'Incoming quality operations', hero_title: 'SHARETRONIC.IQC IQC Incoming Inspection', hero_subtitle: 'A real-time quality cockpit connected to QMS for quickly identifying pending, overdue, and supplier risks.', date_today: '—', refresh: 'Refresh data', export: 'Export dashboard', kpi_incoming: 'Today’s inspection lots', kpi_pending: 'Pending lots', kpi_overdue: 'Overdue / incomplete', kpi_passrate: 'Monthly first-pass yield', kpi_urgent: 'Urgent lots', unit_lot: 'lots', unit_urgent: 'urgent', vs_yesterday: 'vs yesterday', need_assignment: 'Needs assignment', vs_last_week: 'vs last week', vs_last_month: 'vs last month', of_today_incoming: 'of today’s intake', flow_title: 'Inspection flow overview', flow_subtitle: 'Real-time distribution by inspection status', range_today_short: 'Today', range_week_short: 'This week', range_month_short: 'This month', unit_lot_full: 'inspection lots', flow_caption: 'Today’s cumulative intake', status_pending: 'Pending', status_processing: 'In inspection', status_done: 'Completed', status_overdue: 'Overdue / incomplete', trend_title: 'First-pass yield trend', trend_subtitle: 'Incoming quality change over the last 7 days', legend_passrate: 'First-pass yield', legend_lots: 'Inspection lots', trend_note: 'Computed from the last 7 days of inspection data', alert_title: 'Exceptions & alerts', alert_subtitle: 'Items requiring quality team attention', alert_count: '3 need attention', alert_overdue: 'SLA exceeded', alert_urgent: 'Urgent task awaiting assignment', alert_fail: 'Supplier lot failed', view_all_alerts: 'View all alerts', table_title: 'Incoming inspection tasks', table_subtitle: 'Latest QMS inspection tasks · filter quickly by status, urgency, or keyword', search_placeholder: 'Search no. / material / supplier', range_today: 'Today', range_week: 'This week', range_month: 'This month', all_status: 'All statuses', urgent_only: 'Urgent only', live_data: 'QMS live sync', refresh_every: 'Refreshes every 5 min', unit_task: 'tasks', col_id: 'Inspection no.', col_part: 'Material no.', col_name: 'Material name', col_category: 'Category', col_factory: 'Receiving factory', col_supplier: 'Supplier / code', col_qty: 'Received qty.', col_urgent: 'Urgent', col_date: 'Submitted at', col_inspector: 'Inspector', col_node: 'Process node', col_sla: 'SLA status', col_result: 'Inspection result', col_action: 'Action', yes: 'Yes', no: 'No', result_processing: 'In progress', result_pending: 'Not started', result_pass: 'Pass', empty_state: 'No tasks match the current filters', inspector_title: 'Pending lots by inspector', inspector_subtitle: 'Current pending tasks · sorted by count', unit_waiting_lot: 'pending lots', capacity_label: 'Team capacity utilization', result_title: 'Inspection result statistics', result_subtitle: 'Month to date', total_inspections: 'Total inspected lots', result_special: 'Special acceptance', result_fail: 'Fail', result_note: 'First-pass yield', supplier_title: 'Supplier quality ranking', supplier_subtitle: 'By monthly first-pass yield', supplier_board_subtitle: 'Standalone supplier quality board · horizontal chart and vertical list scrolling', supplier_chart_hint: 'Batch pass rate · Supplier Top 10', score: 'Pass rate', top_rank: 'Top ranking', bottom_rank: 'Bottom ranking', bottom_risk: 'Lowest-ranked supplier', supplier_batches: 'lots', close: 'Close', detail_kicker: 'QMS INSPECTION RECORD', detail_part: 'Material no.', detail_material: 'Material name', detail_category: 'Category', detail_supplier: 'Supplier', detail_quantity: 'Received quantity', detail_inspector: 'Inspector', detail_date: 'Submitted at', detail_status: 'Current status', detail_sla: 'SLA limit', detail_timeline: 'Process timeline', timeline_received: 'Goods received', timeline_submitted: 'Inspection request', timeline_inspecting: 'IQC inspection', timeline_closed: 'Result closed', open_qms: 'Open QMS inspection', last_refresh: 'Last updated', refresh_done: 'Data refreshed', export_done: 'Current filtered tasks exported', alert_done: 'No more alerts', qms_demo: 'Demo mode: enable the real API in QMS_CONFIG.', flow_week_caption: 'Week-to-date intake', flow_month_caption: 'Month-to-date intake', factory_label: 'Current factory', enter_wallboard: 'Wallboard mode', exit_wallboard: 'Exit wallboard', wallboard_live: 'Wallboard live', sidebar_hide: 'Hide navigation', sidebar_show: 'Show navigation', top_risk: 'Top-ranked supplier'
    };
    Object.assign(I18N.zh, { supplier_wallboard_entry: '供应商看板', supplier_wallboard_live: '供应商质量看板 · 实时', exit_supplier_wallboard: '退出供应商看板' });
    Object.assign(I18N.th, { supplier_wallboard_entry: 'แดชบอร์ดซัพพลายเออร์', supplier_wallboard_live: 'แดชบอร์ดคุณภาพซัพพลายเออร์ · เรียลไทม์', exit_supplier_wallboard: 'ออกจากแดชบอร์ดซัพพลายเออร์' });
    Object.assign(I18N.en, { supplier_wallboard_entry: 'Supplier board', supplier_wallboard_live: 'Supplier quality board · Live', exit_supplier_wallboard: 'Exit supplier board' });
    Object.assign(I18N.zh, { range_todo: '待办任务' });
    Object.assign(I18N.th, { range_todo: 'งานที่ต้องทำ' });
    Object.assign(I18N.en, { range_todo: 'To-do tasks' });
    Object.assign(I18N.zh, {
      breadcrumb_overview: 'IQC 来料检验', breadcrumb_tasks: '检验任务', breadcrumb_suppliers: '供应商质量', supplier_page_kicker: '供应商质量运营', supplier_page_title: '供应商质量分析', supplier_page_subtitle: '按工厂、月份与 QMS 检验结果全面追踪供应商质量表现。', supplier_kpi_total: '供应商总数', supplier_unit_company: '家', supplier_kpi_total_note: '已纳入本月质量评价', supplier_kpi_average: '平均批次合格率', supplier_kpi_average_note: '按供应商加权计算 · 较上月提升', supplier_kpi_risk: '风险供应商', supplier_kpi_risk_note: '需要重点跟进与改善', supplier_kpi_lots: '本月检验批次', supplier_kpi_lots_note: 'QMS 已完成及在检批次', supplier_detail_title: '供应商质量明细', supplier_detail_subtitle: '按供应商汇总本月来料质量、缺陷率、批次与改进状态', supplier_col_name: '供应商', supplier_col_code: '供应商编码', supplier_col_lots: '检验批次', supplier_col_passrate: '批次合格率', supplier_col_defect: '缺陷率', supplier_col_trend: '月度趋势', supplier_col_status: '质量状态', supplier_status_stable: '稳定', supplier_status_watch: '关注', supplier_status_risk: '高风险', supplier_board_subtitle: '供应商质量排名 · 柱状图可横向滚动，排名列表可纵向滚动'
    });
    Object.assign(I18N.th, {
      breadcrumb_overview: 'ตรวจรับเข้า IQC', breadcrumb_tasks: 'งานตรวจรับเข้า', breadcrumb_suppliers: 'คุณภาพซัพพลายเออร์', supplier_page_kicker: 'การดำเนินงานคุณภาพซัพพลายเออร์', supplier_page_title: 'การวิเคราะห์คุณภาพซัพพลายเออร์', supplier_page_subtitle: 'ติดตามผลคุณภาพซัพพลายเออร์อย่างครบถ้วนตามโรงงาน เดือน และผลการตรวจจาก QMS', supplier_kpi_total: 'จำนวนซัพพลายเออร์', supplier_unit_company: 'ราย', supplier_kpi_total_note: 'รวมในการประเมินคุณภาพเดือนนี้', supplier_kpi_average: 'อัตราผ่านรายล็อตเฉลี่ย', supplier_kpi_average_note: 'คำนวณแบบถ่วงน้ำหนัก · ดีขึ้นจากเดือนก่อน', supplier_kpi_risk: 'ซัพพลายเออร์ความเสี่ยง', supplier_kpi_risk_note: 'ต้องติดตามและปรับปรุงเป็นพิเศษ', supplier_kpi_lots: 'ล็อตตรวจเดือนนี้', supplier_kpi_lots_note: 'ล็อตที่เสร็จแล้วและกำลังตรวจจาก QMS', supplier_detail_title: 'รายละเอียดคุณภาพซัพพลายเออร์', supplier_detail_subtitle: 'สรุปคุณภาพขาเข้า อัตราข้อบกพร่อง จำนวนล็อต และสถานะการปรับปรุงรายซัพพลายเออร์', supplier_col_name: 'ซัพพลายเออร์', supplier_col_code: 'รหัสซัพพลายเออร์', supplier_col_lots: 'ล็อตตรวจ', supplier_col_passrate: 'อัตราผ่านรายล็อต', supplier_col_defect: 'อัตราข้อบกพร่อง', supplier_col_trend: 'แนวโน้มรายเดือน', supplier_col_status: 'สถานะคุณภาพ', supplier_status_stable: 'คงที่', supplier_status_watch: 'ต้องติดตาม', supplier_status_risk: 'ความเสี่ยงสูง', supplier_board_subtitle: 'อันดับคุณภาพซัพพลายเออร์ · เลื่อนกราฟแนวนอนและรายการแนวตั้งได้'
    });
    Object.assign(I18N.en, {
      breadcrumb_overview: 'IQC incoming inspection', breadcrumb_tasks: 'Inspection tasks', breadcrumb_suppliers: 'Supplier quality', supplier_page_kicker: 'Supplier quality operations', supplier_page_title: 'Supplier quality analysis', supplier_page_subtitle: 'Track supplier quality performance comprehensively by plant, month, and QMS inspection results.', supplier_kpi_total: 'Total suppliers', supplier_unit_company: 'suppliers', supplier_kpi_total_note: 'Included in this month’s evaluation', supplier_kpi_average: 'Average batch pass rate', supplier_kpi_average_note: 'Weighted by supplier · improved vs last month', supplier_kpi_risk: 'Risk suppliers', supplier_kpi_risk_note: 'Require focused follow-up and improvement', supplier_kpi_lots: 'Inspection lots this month', supplier_kpi_lots_note: 'Completed and in-progress lots from QMS', supplier_detail_title: 'Supplier quality details', supplier_detail_subtitle: 'Monthly incoming quality, defect rate, lots, and improvement status by supplier', supplier_col_name: 'Supplier', supplier_col_code: 'Supplier code', supplier_col_lots: 'Inspection lots', supplier_col_passrate: 'Batch pass rate', supplier_col_defect: 'Defect rate', supplier_col_trend: 'Monthly trend', supplier_col_status: 'Quality status', supplier_status_stable: 'Stable', supplier_status_watch: 'Watch', supplier_status_risk: 'High risk', supplier_board_subtitle: 'Supplier quality ranking · horizontal chart and vertical list scrolling'
    });

    let locale = 'zh';
    let currentFlowRange = 'today';
    let sidebarHidden = false;
    let wallboardMode = false;
    let supplierWallboardMode = false;
    const validPages = ['overview', 'tasks', 'suppliers'];
    let currentPage = validPages.includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'overview';
    const nf = new Intl.NumberFormat('en-US');
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const getTableRows = () => $$('#iqcTableBody tr[data-status]');

    /* ===================== QMS 数据层 ===================== */
    let qmsLoading = false;
    let loadSeq = 0;
    let FACTORIES = [];
    let currentFactory = { code: 'STTH', name: '泰国协创' };
    const DASH = {
      records: [], today: [], week: [], month: [], prevMonth: [],
      byDate: {}, suppliers: [], inspectors: [], alerts: [],
      flow: { today: { pending: 0, processing: 0, done: 0, overdue: 0 }, week: { pending: 0, processing: 0, done: 0, overdue: 0 }, month: { pending: 0, processing: 0, done: 0, overdue: 0 } },
      pendingTotal: 0, overdueTotal: 0,
      resultStats: { pass: 0, special: 0, fail: 0, total: 0, passRate: 0 }, prevPassRate: null,
      prevResultStats: { pass: 0, special: 0, fail: 0, total: 0, passRate: 0 }, prevSupplierCount: 0
    };

    function pad2(n) { return String(n).padStart(2, '0'); }
    function fmtDate(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
    function todayStr() { return fmtDate(new Date()); }
    function daysAgoStr(n) { const d = new Date(); d.setDate(d.getDate() - n); return fmtDate(d); }
    function monthPrefix(offset = 0) { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + offset); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; }

    async function qmsLogin() {
      // 登录已迁移到 Cloudflare Worker 代理（凭证保存在服务端 Secrets），前端不再持有凭证
      return null;
    }
    function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
    async function qmsRequest(url, retry = true) {
      // 走 Cloudflare Worker 代理：前端只传路径 + 查询参数，凭证保存在服务端 Secrets
      let u;
      try { u = new URL(url); } catch (e) { throw new Error('QMS 请求地址无效'); }
      const path = u.pathname;
      const query = {};
      u.searchParams.forEach((v, k) => { query[k] = v; });
      let lastErr = null;
      const MAX = retry ? 3 : 1;
      for (let attempt = 0; attempt < MAX; attempt++) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        try {
          const res = await fetch(QMS_CONFIG.proxyUrl + '/api/qms', {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path, query })
          });
          // 5xx / 429：代理或服务端繁忙，退避重试
          if (res.status >= 500 || res.status === 429) {
            lastErr = new Error('代理服务繁忙 (' + res.status + ')');
            await sleep(300 * (attempt + 1));
            continue;
          }
          if (!res.ok) throw new Error('QMS HTTP 请求失败 ' + res.status);
          const data = await res.json();
          if (!data || typeof data !== 'object') throw new Error('QMS 响应格式无效');
          if (data.error) throw new Error('QMS 代理请求失败');
          if (data.status != null && String(data.status) !== '200') throw new Error('QMS 请求失败 ' + data.status);
          return data;
        } catch (e) {
          // 业务错误（QMS 返回非 200）不重试，直接抛
          if (e && e.message && String(e.message).indexOf('QMS') === 0) throw e;
          lastErr = e;
          if (attempt < MAX - 1) await sleep(300 * (attempt + 1));
        } finally { clearTimeout(timeout); }
      }
      throw lastErr || new Error('QMS 请求失败');
    }

    /* ===================== 工厂管理 ===================== */
    function loadSavedFactory() {
      try {
        const saved = localStorage.getItem('qms_factory');
        if (saved) { const f = JSON.parse(saved); if (f && f.code) currentFactory = { code: f.code, name: f.name || f.code }; }
      } catch (e) {}
    }
    async function loadFactories() {
      try {
        const cached = localStorage.getItem('qms_factories_cache');
        if (cached) { const arr = JSON.parse(cached); if (Array.isArray(arr) && arr.length) { FACTORIES = arr; return; } }
      } catch (e) {}
      try {
        const res = await qmsRequest(QMS_CONFIG.dataUrl + '/sys/dict/type/factory');
        if (res && res.data && Array.isArray(res.data)) {
          FACTORIES = res.data.map((f) => ({ code: f.code, name: f.name || f.code }));
          try { localStorage.setItem('qms_factories_cache', JSON.stringify(FACTORIES)); } catch (e) {}
        }
      } catch (e) { console.error('loadFactories', e); }
    }
    function applyFactory() {
      QMS_CONFIG.factoryCode = currentFactory.code;
      QMS_CONFIG.factoryName = currentFactory.name;
      const pn = $('#plantName'); if (pn) pn.textContent = currentFactory.name;
      const ps = $('#plantSub'); if (ps) ps.textContent = `${currentFactory.code} · ${currentFactory.name}`;
      $$('.factory-name').forEach((el) => { el.textContent = currentFactory.name; });
    }
    function renderFactoryList() {
      const el = $('#factoryList'); if (!el) return;
      if (!FACTORIES.length) { el.innerHTML = '<div class="settings-hint">工厂列表加载中…</div>'; return; }
      el.innerHTML = FACTORIES.map((f) => {
        const active = f.code === currentFactory.code;
        return `<div class="factory-item ${active ? 'active' : ''}" data-code="${escHtml(f.code)}" role="button" tabindex="0">
          <span class="factory-item-name">${escHtml(f.name)}</span>
          <span class="factory-item-code">${escHtml(f.code)}</span>
          <svg class="factory-item-check" width="16" height="16"><use href="#icon-check"/></svg>
        </div>`;
      }).join('');
    }
    function openSettingsModal() {
      renderFactoryList();
      if (!FACTORIES.length) loadFactories().then(() => renderFactoryList());
      $('#settingsModalBackdrop').classList.add('open');
    }
    function closeSettingsModal() { $('#settingsModalBackdrop').classList.remove('open'); }
    function clearDash() {
      DASH.records = []; DASH.today = []; DASH.week = []; DASH.month = []; DASH.prevMonth = [];
      DASH.byDate = {}; DASH.suppliers = []; DASH.inspectors = []; DASH.alerts = [];
      DASH.flow = { today: { pending: 0, processing: 0, done: 0, overdue: 0 }, week: { pending: 0, processing: 0, done: 0, overdue: 0 }, month: { pending: 0, processing: 0, done: 0, overdue: 0 } };
      DASH.pendingTotal = 0; DASH.overdueTotal = 0;
      DASH.resultStats = { pass: 0, special: 0, fail: 0, total: 0, passRate: 0 }; DASH.prevPassRate = null;
    }
    function selectFactory(code) {
      const f = FACTORIES.find((x) => x.code === code);
      if (!f) return;
      if (f.code === currentFactory.code) { closeSettingsModal(); return; }
      currentFactory = { code: f.code, name: f.name };
      try { localStorage.setItem('qms_factory', JSON.stringify(currentFactory)); } catch (e) {}
      applyFactory();
      renderFactoryList();
      supplierMonthOffset = 0;
      sbRequestSeq += 1;
      sbTrendSeq += 1;
      sbTrendLoading = false;
      detailTrendSeq += 1;
      sbSuppliersData = []; sbTrend12 = []; sbPrevMap = new Map();
      closeSupplierDetail();
      try { localStorage.removeItem('qms_dash_cache'); } catch (e) {}
      clearDash();
      renderAll();
      closeSettingsModal();
      showToast(`已切换到 ${f.name}`);
      loadDashboardData();
    }

    function qmsSelectPageUrl(searchParams, pageSize = 2000, pageNum = 1, sort = 'create_date', order = 'desc') {
      const sp = new URLSearchParams();
      sp.set('pageSize', String(pageSize)); sp.set('pageNum', String(pageNum));
      if (sort) sp.set('sort', sort);
      if (order) sp.set('order', order);
      Object.entries(searchParams || {}).forEach(([k, v]) => { if (v !== null && v !== undefined && v !== '') sp.set('searchParams[' + k + ']', v); });
      return QMS_CONFIG.supplierQualityUrl + '/iqc/documents/selectPage?' + sp.toString();
    }
    async function qmsSelectAll(searchParams, pageSize = 2000) {
      const all = [];
      let pageNum = 1;
      let previousPage = null;
      while (true) {
        const res = await qmsRequest(qmsSelectPageUrl(searchParams, pageSize, pageNum));
        const d = res.data || {};
        const rows = d.resultData;
        const total = Number(d.total);
        if (!Array.isArray(rows) || d.total == null || !Number.isSafeInteger(total) || total < 0) {
          throw new Error('QMS 分页响应格式无效');
        }
        const fingerprint = JSON.stringify(rows);
        if ((!rows.length && all.length < total) || (rows.length && fingerprint === previousPage)) {
          throw new Error('QMS 分页数据不完整，请重试');
        }
        previousPage = fingerprint;
        all.push(...rows);
        if (all.length >= total) break;
        if (pageNum >= 1000) throw new Error('QMS 分页超过安全上限');
        pageNum += 1;
      }
      return all;
    }
    async function qmsCount(searchParams) {
      const res = await qmsRequest(qmsSelectPageUrl(searchParams, 1, 1));
      const total = res.data && res.data.total;
      if (total == null || !Number.isSafeInteger(Number(total)) || Number(total) < 0) throw new Error('QMS 计数响应格式无效');
      return Number(total);
    }

    function cleanSupplierName(name) {
      const s = String(name || '').trim();
      const i = s.indexOf('_');
      return i > 0 ? s.slice(0, i) : s;
    }
    function escHtml(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function fmtQty(n) { return nf.format(Math.round(Number(n) || 0)); }
    function parseTotalHours(tt) {
      if (!tt) return null;
      const m = String(tt).match(/(\d+)天(?:(\d+)时)?(?:(\d+)分)?/);
      if (!m) return null;
      return (parseInt(m[1]) || 0) * 24 + (parseInt(m[2]) || 0) + (parseInt(m[3]) || 0) / 60;
    }
    function mapStatus(r) {
      const s = r.inspectionStatus;
      if (s === '2') return { key: 'overdue', i18n: 'status_overdue', label: t('status_overdue') };
      if (s === '0') {
        // 24 小时时效：进行中但已超 24 小时 -> 超时未完成
        const h = parseTotalHours(r.totalTime);
        if ((h !== null && h >= 24) || (r.createDate && r.createDate < daysAgoStr(1))) {
          return { key: 'overdue', i18n: 'status_overdue', label: t('status_overdue') };
        }
        if (['组长确认', '配置模板'].includes(r.taskName)) return { key: 'pending', i18n: 'status_pending', label: t('status_pending') };
        return { key: 'processing', i18n: 'status_processing', label: t('status_processing') };
      }
      return { key: 'done', i18n: 'status_done', label: t('status_done') };
    }
    function mapResult(r) {
      if (r.inspectionStatus === '0') return { key: 'processing', i18n: 'result_processing', label: t('result_processing') };
      const res = r.syncInspectionResultName;
      if (res === '合格') return { key: 'pass', i18n: 'result_pass', label: t('result_pass') };
      if (res === '退货') return { key: 'fail', i18n: 'result_fail', label: t('result_fail') };
      if (res === '特采') return { key: 'special', i18n: 'result_special', label: t('result_special') };
      return { key: 'pending', i18n: 'result_pending', label: t('result_pending') };
    }

    /* ===================== 聚合 ===================== */
    function computeFlow(records) {
      const f = { pending: 0, processing: 0, done: 0, overdue: 0 };
      records.forEach((r) => {
        const s = mapStatus(r).key;
        if (s === 'pending') f.pending += 1;
        else if (s === 'processing') f.processing += 1;
        else if (s === 'overdue') f.overdue += 1;
        else f.done += 1;
      });
      return f;
    }
    function computeResultStats(records) {
      const s = { pass: 0, special: 0, fail: 0, total: 0, passRate: 0 };
      records.forEach((r) => {
        const res = r.syncInspectionResultName;
        if (res === '合格') s.pass += 1; else if (res === '退货') s.fail += 1; else if (res === '特采') s.special += 1;
      });
      s.total = s.pass + s.special + s.fail;
      s.passRate = s.total > 0 ? (s.pass / s.total * 100) : 0;
      return s;
    }
    function computeSuppliers(records) {
      const map = new Map();
      records.forEach((r) => {
        // 分组键对齐 QMS 官方口径：supplierName（供应商_料号，如"路菲电子_RMBM60"）
        const rawName = r.supplierName || '';
        const key = rawName || r.supplierCode || '未知';
        if (!map.has(key)) {
          map.set(key, { code: key, supplierCode: r.supplierCode || '', name: cleanSupplierName(rawName) || key, rawName: key, batches: 0, pass: 0, fail: 0, special: 0 });
        }
        const e = map.get(key);
        e.batches += 1;
        const res = r.syncInspectionResultName;
        if (res === '合格') e.pass += 1; else if (res === '退货') e.fail += 1; else if (res === '特采') e.special += 1;
      });
      return Array.from(map.values()).map((e) => {
        const total = e.pass + e.fail + e.special;
        // 批次合格率 = 合格 / 总批次（特采、退货均不计合格），对齐 QMS batchPassRates
        const rate = total > 0 ? (e.pass / total * 100) : 0;
        // 不合格批次数 = 退货 + 特采，用于倒数排名
        const nonconforming = e.fail + e.special;
        return { ...e, total, nonconforming, rate, score: rate.toFixed(1) + '%', raw: rate };
      }).sort((a, b) => (b.nonconforming - a.nonconforming) || (b.rate - a.rate));
    }
    function computeInspectors(records) {
      const map = new Map();
      records.forEach((r) => { const n = r.inspectorName || '未分配'; map.set(n, (map.get(n) || 0) + 1); });
      return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5);
    }
    function computeAlerts() {
      const alerts = [];
      DASH.records.filter((r) => mapStatus(r).key === 'overdue').forEach((r) => {
        alerts.push({ type: 'danger', titleKey: 'alert_overdue', copy: `${r.orderNumber} · ${cleanSupplierName(r.supplierName)} · ${r.totalTime || '超时'}` });
      });
      const urgentPending = DASH.records.filter((r) => r.expeditedFlagName === '是' && r.inspectionStatus === '0' && ['组长确认', '配置模板'].includes(r.taskName));
      if (urgentPending.length) alerts.push({ type: 'warn', titleKey: 'alert_urgent', copy: `${urgentPending.length} ${t('unit_lot_full')}等待检验员接单` });
      DASH.month.filter((r) => r.syncInspectionResultName === '退货').forEach((r) => {
        alerts.push({ type: 'info', titleKey: 'alert_fail', copy: `${cleanSupplierName(r.supplierName)} · ${r.materialNumber} · ${t('result_fail')}` });
      });
      return alerts;
    }

    /* ===================== 渲染 ===================== */
    function computeTableRows() {
      const range = $('#rangeFilter').value;
      const status = $('#statusFilter').value;
      const query = $('#globalSearch').value.trim().toLowerCase();
      // 检验任务表只显示未完成（待检/检验中/超时未完成），已完成不展示
      let rows = applyRangeFilter(DASH.records, range)
        .filter((r) => r.inspectionStatus === '0' || r.inspectionStatus === '2');
      if (status !== 'all') rows = rows.filter((r) => mapStatus(r).key === status);
      if (urgentOnly) rows = rows.filter((r) => r.expeditedFlagName === '是');
      if (query) {
        rows = rows.filter((r) => {
          const name = r.materialName || '';
          const s = [r.orderNumber, r.materialNumber, name, r.materialCategory, QMS_CONFIG.factoryName, r.supplierName, r.supplierCode].join(' ').toLowerCase();
          return s.includes(query);
        });
      }
      if (tableSort) {
        const { type, direction } = tableSort;
        rows.sort((a, b) => {
          let av = '', bv = '';
          if (type === 'id') { av = a.orderNumber || ''; bv = b.orderNumber || ''; }
          if (type === 'part') { av = a.materialNumber || ''; bv = b.materialNumber || ''; }
          if (type === 'qty') { av = Number(a.qty) || 0; bv = Number(b.qty) || 0; }
          if (type === 'date') { av = a.createDate || ''; bv = b.createDate || ''; }
          return (av > bv ? 1 : av < bv ? -1 : 0) * direction;
        });
      }
      return rows;
    }
    function rowHtml(r) {
      const st = mapStatus(r), res = mapResult(r);
      const urgent = r.expeditedFlagName === '是' ? '1' : '0';
      const name = r.materialName || '';
      const supplier = cleanSupplierName(r.supplierName), code = r.supplierCode || '';
      const factory = QMS_CONFIG.factoryName;
      const search = [r.orderNumber, r.materialNumber, name, r.materialCategory, factory, r.supplierName, code].join(' ');
      return `<tr data-status="${st.key}" data-urgent="${urgent}" data-id="${escHtml(r.orderNumber)}" data-search="${escHtml(search)}">
        <td><span class="id-link mono">${escHtml(r.orderNumber)}</span></td>
        <td class="mono">${escHtml(r.materialNumber)}</td>
        <td title="${escHtml(name)}"><span class="material-name">${escHtml(name)}</span></td>
        <td>${escHtml(r.materialCategory || '')}</td>
        <td><span class="factory-cell" title="${escHtml(factory)}">${escHtml(factory)}</span></td>
        <td class="supplier-cell"><strong>${escHtml(supplier)}</strong><small>${escHtml(code)}</small></td>
        <td class="qty">${fmtQty(r.qty)}</td>
        <td><span class="tag ${urgent === '1' ? 'yes' : 'no'}" data-i18n="${urgent === '1' ? 'yes' : 'no'}">${urgent === '1' ? t('yes') : t('no')}</span></td>
        <td class="mono">${escHtml(r.createDate || '')}</td>
        <td>${escHtml(r.inspectorName || '—')}</td>
        <td>${escHtml(r.taskName || '')}</td>
        <td><span class="status-pill ${st.key}" data-i18n="${st.i18n}">${st.label}</span></td>
        <td><span class="status-pill ${res.key}" data-i18n="${res.i18n}">${res.label}</span></td>
        <td><button class="action-btn detail-btn" title="View"><svg width="13" height="13"><use href="#icon-external"/></svg></button></td>
      </tr>`;
    }
    function renderTableRows() {
      tableRows = computeTableRows();
      const total = tableRows.length;
      const totalPages = Math.max(1, Math.ceil(total / TABLE_PAGE_SIZE));
      // 看板模式不分页（自动滚动显示全部）；普通模式每页 20 条
      if (wallboardMode) { tablePage = 1; }
      else { if (tablePage > totalPages) tablePage = totalPages; if (tablePage < 1) tablePage = 1; }
      const rows = wallboardMode ? tableRows : tableRows.slice((tablePage - 1) * TABLE_PAGE_SIZE, tablePage * TABLE_PAGE_SIZE);
      const body = $('#iqcTableBody');
      body.innerHTML = rows.map(rowHtml).join('') + `<tr class="empty-row" id="emptyRow"><td colspan="14"><span data-i18n="empty_state">${t('empty_state')}</span></td></tr>`;
      // 侧边栏徽章 = 待办任务总数
      const badge = $('#tasksBadge');
      if (badge) badge.textContent = total;
      $('#visibleCount').textContent = total;
      const pageRange = $('#pageRange');
      if (pageRange) {
        if (!wallboardMode && total > 0) {
          const start = (tablePage - 1) * TABLE_PAGE_SIZE + 1;
          const end = Math.min(tablePage * TABLE_PAGE_SIZE, total);
          pageRange.textContent = ` · 当前 ${start}-${end} 条`;
        } else {
          pageRange.textContent = '';
        }
      }
      $('#emptyRow').style.display = rows.length ? 'none' : 'table-row';
      const pag = $('#tablePagination');
      if (pag) {
        if (wallboardMode) { pag.style.display = 'none'; }
        else {
          pag.style.display = 'flex';
          $('#pageInfo').textContent = `${tablePage} / ${totalPages}`;
          $('#prevPageBtn').disabled = tablePage <= 1;
          $('#nextPageBtn').disabled = tablePage >= totalPages;
        }
      }
    }
    function gotoPage(p) {
      tablePage = p;
      renderTableRows();
    }
    function applyRangeFilter(records, range) {
      const today = todayStr();
      if (range === 'todo') return records.filter((r) => r.inspectionStatus === '0' || r.inspectionStatus === '2');
      if (range === 'week') return records.filter((r) => (r.createDate || '') >= daysAgoStr(6));
      if (range === 'month') return records.filter((r) => (r.createDate || '').startsWith(monthPrefix(0)));
      if (range === 'custom') {
        const s = $('#dateStart').value, e = $('#dateEnd').value;
        return records.filter((r) => {
          const d = r.createDate || '';
          if (s && d < s) return false;
          if (e && d > e) return false;
          return true;
        });
      }
      return records.filter((r) => r.createDate === today);
    }
    async function loadDateRange(start, end) {
      if (!start && !end) return;
      const sp = { factoryCode: QMS_CONFIG.factoryCode };
      if (start) sp.createDateStart = start;
      if (end) sp.createDateEnd = end;
      const fetched = await qmsSelectAll(sp);
      const map = new Map(DASH.records.map((r) => [r.orderNumber, r]));
      fetched.forEach((r) => { if (r.orderNumber) map.set(r.orderNumber, r); });
      DASH.records = Array.from(map.values()).sort((a, b) => (b.createDate || '').localeCompare(a.createDate || ''));
    }

    function renderKpis() {
      const today = DASH.today;
      const urgentToday = today.filter((r) => r.expeditedFlagName === '是').length;
      const prevToday = DASH.byDate[daysAgoStr(1)] || [];
      const rs = DASH.resultStats, pr = DASH.prevPassRate;
      $('#kpiIncoming').innerHTML = `${today.length}<small data-i18n="unit_lot">${t('unit_lot')}</small>`;
      if (prevToday.length) {
        const d = (today.length - prevToday.length) / prevToday.length * 100;
        $('#kpiIncomingFoot').textContent = (d >= 0 ? '↗ ' : '↘ ') + Math.abs(d).toFixed(1) + '%';
        $('#kpiIncomingFoot').className = d >= 0 ? 'trend-up' : 'trend-down';
      } else {
        $('#kpiIncomingFoot').textContent = '—';
        $('#kpiIncomingFoot').className = 'trend-flat';
      }
      $('#kpiPending').innerHTML = `${DASH.pendingTotal}<small data-i18n="unit_lot">${t('unit_lot')}</small>`;
      const urgentPending = DASH.records.filter((r) => r.expeditedFlagName === '是' && r.inspectionStatus === '0').length;
      $('#kpiPendingFoot').innerHTML = `${urgentPending} <span data-i18n="unit_urgent">${t('unit_urgent')}</span>`;
      $('#kpiOverdue').innerHTML = `${DASH.overdueTotal}<small data-i18n="unit_lot">${t('unit_lot')}</small>`;
      $('#kpiOverdueFoot').textContent = '—';
      $('#kpiPassrate').innerHTML = `${rs.total ? rs.passRate.toFixed(1) : '—'}<small>%</small>`;
      if (pr !== null) { const d = rs.passRate - pr; $('#kpiPassrateFoot').textContent = (d >= 0 ? '↗ ' : '↘ ') + Math.abs(d).toFixed(1) + '%'; $('#kpiPassrateFoot').className = d >= 0 ? 'trend-up' : 'trend-down'; }
      else { $('#kpiPassrateFoot').textContent = '—'; }
      $('#kpiUrgent').innerHTML = `${urgentToday}<small data-i18n="unit_lot">${t('unit_lot')}</small>`;
      $('#kpiUrgentFoot').textContent = today.length ? (urgentToday / today.length * 100).toFixed(1) + '%' : '0%';
    }

    function flowConic(f) {
      const total = (f.pending + f.processing + f.done + f.overdue) || 1;
      const p = f.pending / total * 100, pr = f.processing / total * 100, d = f.done / total * 100, o = f.overdue / total * 100;
      return `conic-gradient(#3977ef 0 ${p}%, #14b39e ${p}% ${p + pr}%, #77a4f3 ${p + pr}% ${p + pr + d}%, #e55d68 ${p + pr + d}% 100%)`;
    }
    function setFlowRange(range) {
      currentFlowRange = range;
      const data = DASH.flow[range] || { pending: 0, processing: 0, done: 0, overdue: 0 };
      const total = data.pending + data.processing + data.done + data.overdue;
      $('#flowTotal').textContent = nf.format(total);
      $('#flowPending').textContent = nf.format(data.pending);
      $('#flowProcessing').textContent = nf.format(data.processing);
      $('#flowDone').textContent = nf.format(data.done);
      $('#flowOverdue').textContent = nf.format(data.overdue);
      $('#flowDonut').style.background = flowConic(data);
      const now = new Date(); const p = (n) => String(n).padStart(2, '0');
      const timeStr = `${p(now.getHours())}:${p(now.getMinutes())}`;
      $('.donut-caption').textContent = (locale === 'th' ? 'ส่งตรวจสะสม · ถึง ' : locale === 'en' ? 'Cumulative intake · as of ' : '累计送检 · 截止 ') + timeStr;
      $$('[data-range]').forEach((b) => b.classList.toggle('active', b.dataset.range === range));
    }

    function renderTrend() {
      const days = []; for (let i = 6; i >= 0; i--) days.push(daysAgoStr(i));
      const pts = days.map((d) => {
        const recs = DASH.byDate[d] || [];
        const rs = computeResultStats(recs);
        return { d, passRate: rs.total ? rs.passRate : null, lots: recs.length };
      });
      const valid = pts.filter((p) => p.passRate !== null);
      const avg = valid.length ? valid.reduce((a, b) => a + b.passRate, 0) / valid.length : 0;
      $('#trendNumber').textContent = (avg ? avg.toFixed(1) : '—') + '%';
      const L = 30, R = 685, T = 20, B = 125;
      const max = 100;
      let min = valid.length ? Math.floor(Math.min(...valid.map((p) => p.passRate)) - 2) : 88;
      if (max - min < 4) min = max - 4;
      if (min < 0) min = 0;
      const xFor = (i) => L + (i / 6) * (R - L);
      const yFor = (v) => T + (1 - (v - min) / (max - min)) * (B - T);
      const linePts = pts.map((p, i) => ({ x: xFor(i), y: p.passRate !== null ? yFor(p.passRate) : null }));
      const pts2 = linePts.filter((c) => c.y !== null);
      let lineD = '', areaD = '';
      if (pts2.length) {
        lineD = pts2.map((c, i) => `${i ? 'L' : 'M'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
        areaD = `M${pts2[0].x.toFixed(1)} ${B} L` + pts2.map((c) => `${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' L ') + ` L${pts2[pts2.length - 1].x.toFixed(1)} ${B} Z`;
      }
      const circles = pts2.map((c) => `<circle class="point" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.5"/>`).join('');
      const gridVals = [max, max - (max - min) / 3, max - 2 * (max - min) / 3, min];
      const grid = gridVals.map((v) => `<line class="grid" x1="${L}" y1="${yFor(v).toFixed(1)}" x2="${R}" y2="${yFor(v).toFixed(1)}"/>`).join('');
      const labels = gridVals.map((v) => `<text class="axis-label" x="0" y="${(yFor(v) + 3).toFixed(1)}">${v.toFixed(0)}%</text>`).join('');
      $('#iqcTrendChart').innerHTML = `${grid}${labels}<path class="area" d="${areaD}"/><path class="line" d="${lineD}"/>${circles}`;
      $('#iqcTrendFoot').innerHTML = days.map((d) => `<span>${d.slice(5)}</span>`).join('');
      const note = $('#trendNote span');
      if (note) {
        if (valid.length >= 2) note.textContent = locale === 'th' ? `มีข้อมูล ${valid.length} วัน · เฉลี่ย ${avg.toFixed(1)}%` : locale === 'en' ? `${valid.length} days with data · avg ${avg.toFixed(1)}%` : `近 7 日 ${valid.length} 天有数据 · 均值 ${avg.toFixed(1)}%`;
        else if (valid.length === 1) note.textContent = locale === 'th' ? `มีข้อมูลเฉพาะ ${valid[0].d.slice(5)} · ${valid[0].passRate.toFixed(1)}%` : locale === 'en' ? `Only ${valid[0].d.slice(5)} · ${valid[0].passRate.toFixed(1)}%` : `仅 ${valid[0].d.slice(5)} 有数据 · ${valid[0].passRate.toFixed(1)}%`;
        else note.textContent = locale === 'th' ? 'ไม่มีข้อมูลในช่วง 7 วัน' : locale === 'en' ? 'No data in the last 7 days' : '近 7 日暂无送检数据';
      }
    }

    function renderResultStats() {
      const rs = DASH.resultStats;
      $('#resultTotal').textContent = nf.format(rs.total);
      const total = rs.total || 1;
      const p = rs.pass / total * 100, s = rs.special / total * 100, f = rs.fail / total * 100;
      $('#resultDonut').style.background = `conic-gradient(var(--green) 0 ${p}%, var(--amber) ${p}% ${p + s}%, var(--red) ${p + s}% 100%)`;
      $('#resultLegend').innerHTML = `
        <div class="result-row"><i class="result-mark green"></i><span data-i18n="result_pass">${t('result_pass')}</span><strong>${nf.format(rs.pass)}</strong><small>${(p).toFixed(1)}%</small></div>
        <div class="result-row"><i class="result-mark amber"></i><span data-i18n="result_special">${t('result_special')}</span><strong>${nf.format(rs.special)}</strong><small>${(s).toFixed(1)}%</small></div>
        <div class="result-row"><i class="result-mark red"></i><span data-i18n="result_fail">${t('result_fail')}</span><strong>${nf.format(rs.fail)}</strong><small>${(f).toFixed(1)}%</small></div>`;
      $('#resultPassRate').textContent = (rs.total ? rs.passRate.toFixed(1) : '—') + '%';
    }

    function renderInspectors() {
      const list = DASH.inspectors;
      $('#inspectorTotal').textContent = nf.format(list.reduce((a, b) => a + b.count, 0));
      if (!list.length) { $('#inspectorColumns').innerHTML = '<div style="color:var(--muted);font-size: 12px;align-self:center">暂无待检任务</div>'; $('#capacityValue').textContent = '0%'; return; }
      const max = list[0].count || 1;
      $('#inspectorColumns').innerHTML = list.map((e, i) => `<div class="inspector-column"><strong>${e.count}</strong><i style="--h:${Math.max(14, e.count / max * 93)}%"></i><span title="${escHtml(e.name)}">${escHtml(e.name)}</span></div>`).join('');
      $('#capacityValue').textContent = (list.reduce((a, b) => a + b.count, 0) / (list.length * max) * 100).toFixed(1) + '%';
    }

    /* ===================== 供应商质量看板 ===================== */
    const SB_TARGET = 98.5;
    const SB_MIN_SAMPLE = 5;
    let sbPeriod = 'month';
    let sbSelectedSupplier = null;
    let sbTrend12 = [];
    let sbSuppliersData = [];
    let sbPrevMap = new Map();
    let sbCategories = [];
    const sbCharts = {};

    function ensureSbChart(key, el) {
      // 空态/加载提示替换了 canvas DOM 后，旧实例不能继续使用。
      if (el.querySelector('.sb-empty')) {
        if (sbCharts[key]) sbCharts[key].dispose();
        delete sbCharts[key];
        el.replaceChildren();
      }
      if (!sbCharts[key]) sbCharts[key] = echarts.init(el);
      return sbCharts[key];
    }

    function monthRange(offset) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + offset);
      const start = fmtDate(d);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      return { start, end: fmtDate(end) };
    }
    function sbEmptyHtml(title, sub) {
      return `<div class="sb-empty"><strong>${escHtml(title)}</strong><span>${escHtml(sub)}</span></div>`;
    }

    // 当前周期（月/季/年）的明细记录
    function sbPeriodRecords() {
      if (sbPeriod === 'quarter') { const from = monthRange(-2).start; return DASH.records.filter((r) => (r.createDate || '') >= from); }
      if (sbPeriod === 'year') { const from = monthRange(-11).start; return DASH.records.filter((r) => (r.createDate || '') >= from); }
      return DASH.month;
    }

    // 供应商聚合（含环比、风险、物料类别、最近批次日期）
    function computeSbSuppliers(records) {
      const map = new Map();
      records.forEach((r) => {
        const rawName = r.supplierName || '';
        const key = rawName || r.supplierCode || '未知';
        if (!map.has(key)) map.set(key, { code: key, supplierCode: r.supplierCode || '', name: cleanSupplierName(rawName) || key, rawName: key, batches: 0, pass: 0, fail: 0, special: 0, _cats: new Set(), recent: '' });
        const e = map.get(key);
        e.batches += 1;
        const res = r.syncInspectionResultName;
        if (res === '合格') e.pass += 1; else if (res === '退货') e.fail += 1; else if (res === '特采') e.special += 1;
        if (r.materialCategory) e._cats.add(r.materialCategory);
        if ((r.createDate || '') > (e.recent || '')) e.recent = r.createDate || '';
      });
      return Array.from(map.values()).map((e) => {
        const total = e.pass + e.fail + e.special;
        const rate = total > 0 ? (e.pass / total * 100) : null;
        const nonconforming = e.fail + e.special;
        const insufficient = e.batches < SB_MIN_SAMPLE;
        const prevRate = sbPrevMap.has(e.code) ? sbPrevMap.get(e.code) : null;
        const delta = (rate !== null && prevRate !== null) ? (rate - prevRate) : null;
        const categories = Array.from(e._cats || []);
        const obj = { ...e, categories, total, nonconforming, rate, raw: rate === null ? 0 : rate, score: rate === null ? '无数据' : rate.toFixed(1) + '%', insufficient, delta };
        delete obj._cats;
        obj.risk = sbRiskInfo(obj); // 预计算风险，避免渲染时对 200+ 供应商重复计算
        return obj;
      }).sort((a, b) => (b.nonconforming - a.nonconforming) || (a.rate - b.rate) || (b.batches - a.batches));
    }

    function sbRiskInfo(s) {
      if (s && s.risk) return s.risk; // 预计算缓存命中
      const reasons = [];
      let level = 'normal';
      if (s.insufficient) {
        level = 'insufficient';
        reasons.push('检验批次不足 5 批，暂不参与正式排名');
      } else {
        if (s.rate === null) { level = 'insufficient'; reasons.push('无检验结果'); }
        else {
          if (s.rate < 90 || s.fail >= 2 || (s.fail === 1 && s.batches <= 2)) level = 'high';
          else if (s.rate < SB_TARGET || (s.delta !== null && s.delta < -2) || (s.total > 0 && s.special / s.total > 0.15)) level = 'mid';
          if (s.rate < SB_TARGET) reasons.push(`合格率 ${s.rate.toFixed(1)}% 低于目标 ${SB_TARGET}%`);
          if (s.fail >= 2) reasons.push(`连续 ${s.fail} 批不合格`);
          if (s.fail === 1 && s.batches === 1) reasons.push('单批严重异常');
          if (s.delta !== null && s.delta < -2) reasons.push(`环比下降 ${Math.abs(s.delta).toFixed(1)}pp`);
          if (s.total > 0 && s.special / s.total > 0.15) reasons.push(`特采率 ${(s.special / s.total * 100).toFixed(0)}% 偏高`);
        }
      }
      return { level, reasons };
    }

    // 12 个月趋势：按月查 total，分批并发（每批 3 个月=12 请求），防 QMS 限流 + 防工厂切换竞态
    let sbTrendLoading = false;
    let sbTrendSeq = 0;
    let sbRequestSeq = 0;
    let detailTrendSeq = 0;
    async function fetchSbTrend() {
      const seq = ++sbTrendSeq;
      sbTrendLoading = true;
      const fc = QMS_CONFIG.factoryCode;
      try {
        const months = [];
        for (let i = 11; i >= 0; i--) months.push(monthRange(-i));
        const results = [];
        for (let b = 0; b < months.length; b += 3) {
          if (seq !== sbTrendSeq || QMS_CONFIG.factoryCode !== fc) return;
          const batch = months.slice(b, b + 3);
          const batchResults = await Promise.all(batch.flatMap((m) => {
            const base = { factoryCode: fc, createDateStart: m.start, createDateEnd: m.end };
            return [
              qmsCount({ ...base }).then((v) => ({ m: m.start, key: 'total', v })),
              qmsCount({ ...base, syncInspectionResult: 1 }).then((v) => ({ m: m.start, key: 'pass', v })),
              qmsCount({ ...base, syncInspectionResult: 2 }).then((v) => ({ m: m.start, key: 'fail', v })),
              qmsCount({ ...base, syncInspectionResult: 3 }).then((v) => ({ m: m.start, key: 'special', v }))
            ];
          }));
          results.push(...batchResults);
        }
        if (seq !== sbTrendSeq || QMS_CONFIG.factoryCode !== fc) return;
        const agg = {};
        results.forEach((r) => { if (!agg[r.m]) agg[r.m] = {}; agg[r.m][r.key] = r.v; });
        sbTrend12 = months.map((m) => {
          const d = agg[m.start] || {};
          const decided = (d.pass || 0) + (d.fail || 0) + (d.special || 0);
          return { month: m.start.slice(0, 7), batches: d.total || 0, pass: d.pass || 0, fail: d.fail || 0, special: d.special || 0, passRate: decided > 0 ? ((d.pass || 0) / decided * 100) : null, nonconforming: (d.fail || 0) + (d.special || 0) };
        });
        renderSbTrendChart();
        return true;
      } catch (e) { console.error('fetchSbTrend', e); return false; }
      finally { if (seq === sbTrendSeq) sbTrendLoading = false; }
    }

    function renderSbKpis() {
      const list = sbSuppliersData;
      const totalLots = list.reduce((a, b) => a + b.batches, 0);
      const totalPass = list.reduce((a, b) => a + b.pass, 0);
      const totalFail = list.reduce((a, b) => a + b.fail, 0);
      const totalSpecial = list.reduce((a, b) => a + b.special, 0);
      const decided = totalPass + totalFail + totalSpecial;
      const passRate = decided > 0 ? (totalPass / decided * 100) : null;
      const failRate = decided > 0 ? (totalFail / decided * 100) : null;
      const risks = list.filter((s) => { const r = sbRiskInfo(s); return r.level === 'high' || r.level === 'mid'; });
      const prev = DASH.prevResultStats || { pass: 0, special: 0, fail: 0, total: 0, passRate: 0 };
      const prevCount = DASH.prevSupplierCount || 0;
      const set = (id, val, subEl, subText, subCls) => {
        const el = $('#' + id); if (el) el.innerHTML = val;
        const sub = $('#' + subEl); if (sub) { sub.textContent = subText || '—'; sub.className = 'sb-kpi-sub' + (subCls ? ' ' + subCls : ''); }
      };
      const sign = (v) => (v >= 0 ? '+' : '') + v;
      // 供应商数环比
      const supDelta = prevCount ? (list.length - prevCount) : null;
      set('sbKpiSuppliers', `${nf.format(list.length)}<small>家</small>`, 'sbKpiSuppliersSub', supDelta === null ? '本月检验供应商' : `环比 ${sign(supDelta)} 家`, supDelta === null ? '' : (supDelta >= 0 ? 'up' : 'down'));
      // 批次环比
      const lotDelta = prev.total ? ((totalLots - prev.total) / prev.total * 100) : null;
      set('sbKpiLots', `${nf.format(totalLots)}<small>批</small>`, 'sbKpiLotsSub', lotDelta === null ? '本月来料检验批次' : `环比 ${sign(lotDelta.toFixed(1))}%`, lotDelta === null ? '' : (lotDelta >= 0 ? 'up' : 'down'));
      // 合格率（环比用 pp）
      const passDelta = (passRate !== null && prev.total > 0) ? (passRate - prev.passRate) : null;
      set('sbKpiPassrate', passRate === null ? '无数据' : `${passRate.toFixed(1)}<small>%</small>`, 'sbKpiPassrateSub', passDelta === null ? `目标：${SB_TARGET}%` : `目标：${SB_TARGET}% · 环比 ${sign(passDelta.toFixed(1))}pp`, passDelta !== null && passDelta >= 0 ? 'up' : 'down');
      // 不合格批次率（越低越好，环比用 pp）
      const prevFailRate = prev.total > 0 ? (prev.fail / prev.total * 100) : null;
      const failDelta = (failRate !== null && prevFailRate !== null) ? (failRate - prevFailRate) : null;
      set('sbKpiFailrate', failRate === null ? '无数据' : `${failRate.toFixed(1)}<small>%</small>`, 'sbKpiFailrateSub', failDelta === null ? '不合格批次 / 总批次' : `环比 ${sign(failDelta.toFixed(1))}pp`, failDelta !== null && failDelta <= 0 ? 'up' : 'down');
      // 特采批次（越多越需关注）
      const spDelta = prev.total ? (totalSpecial - prev.special) : null;
      set('sbKpiSpecial', `${nf.format(totalSpecial)}<small>批</small>`, 'sbKpiSpecialSub', spDelta === null ? '本月特采批次' : `环比 ${sign(spDelta)} 批`, spDelta === null ? '' : (spDelta <= 0 ? 'up' : 'down'));
      set('sbKpiRisk', `${nf.format(risks.length)}<small>家</small>`, 'sbKpiRiskSub', '重点关注');
    }

    function sbLevelTag(level) {
      const map = { high: ['高风险', 'high'], mid: ['中风险', 'mid'], low: ['低风险', 'low'], normal: ['正常', 'normal'], insufficient: ['样本不足', 'insufficient'] };
      const [label, cls] = map[level] || map.normal;
      return `<span class="sb-tag ${cls}">${label}</span>`;
    }

    function renderSbTrendChart() {
      const el = $('#sbTrendChart'); if (!el) return;
      if (!window.echarts) { el.innerHTML = sbEmptyHtml('图表库未加载', '请检查网络后重试'); return; }
      ensureSbChart('trend', el);
      const c = sbCharts.trend;
      const months = sbTrend12.map((d) => d.month);
      const batches = sbTrend12.map((d) => d.batches);
      const rates = sbTrend12.map((d) => d.passRate === null ? null : Number(d.passRate.toFixed(1)));
      c.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, formatter: (params) => { const i = params && params[0] ? params[0].dataIndex : -1; const d = sbTrend12[i]; if (!d) return ''; const prevD = sbTrend12[i - 1]; const momTxt = (d.passRate !== null && prevD && prevD.passRate !== null) ? ((d.passRate - prevD.passRate >= 0 ? '+' : '') + (d.passRate - prevD.passRate).toFixed(1) + 'pp') : '—'; const rateTxt = d.passRate === null ? '无数据' : d.passRate.toFixed(1) + '%'; return `<strong>${d.month}</strong><br/>合格率：${rateTxt}<br/>检验批次：${nf.format(d.batches)}<br/>不合格批次：${nf.format(d.nonconforming)}<br/>环比：${momTxt}`; } },
        legend: { data: ['检验批次', '批次合格率'], top: 0, textStyle: { color: '#64748B', fontSize: 12 } },
        grid: { left: 50, right: 50, top: 34, bottom: 28 },
        xAxis: { type: 'category', data: months, axisLabel: { color: '#64748B', fontSize: 11 }, axisLine: { lineStyle: { color: '#E5E7EB' } } },
        yAxis: [
          { type: 'value', name: '合格率%', min: 0, max: 100, splitLine: { lineStyle: { color: '#F1F5F9' } }, axisLabel: { color: '#64748B', fontSize: 11 } },
          { type: 'value', name: '批次', splitLine: { show: false }, axisLabel: { color: '#64748B', fontSize: 11 } }
        ],
        series: [
          { name: '检验批次', type: 'bar', yAxisIndex: 1, data: batches, barMaxWidth: 22, itemStyle: { color: '#BFDBFE' } },
          { name: '批次合格率', type: 'line', data: rates, connectNulls: false, symbol: 'circle', symbolSize: 6, itemStyle: { color: '#2563EB' }, lineStyle: { width: 2.5 }, markLine: { silent: true, symbol: 'none', label: { show: true, formatter: '目标 ' + SB_TARGET + '%', color: '#F59E0B', fontSize: 11, position: 'insideEndTop' }, lineStyle: { color: '#F59E0B', type: 'dashed', width: 1.5 }, data: [{ yAxis: SB_TARGET }] } }
        ]
      });
    }

    function renderSbMatrixChart() {
      const el = $('#sbMatrixChart'); if (!el) return;
      if (!window.echarts) { el.innerHTML = sbEmptyHtml('图表库未加载', '请检查网络后重试'); return; }
      const list = sbSuppliersData.filter((s) => s.batches > 0);
      if (!list.length) { el.innerHTML = sbEmptyHtml('暂无供应商质量数据', '请调整时间范围或筛选条件'); if (sbCharts.matrix) { sbCharts.matrix.clear(); } return; }
      ensureSbChart('matrix', el);
      const c = sbCharts.matrix;
      // 4 象限：X=检验批次，Y=合格率，气泡大小=不合格批次；颜色按风险等级
      const col = { high: '#EF4444', mid: '#F59E0B', normal: '#16A34A', insufficient: '#94A3B8' };
      const groups = { high: [], mid: [], normal: [], insufficient: [] };
      list.forEach((s) => { const r = sbRiskInfo(s); (groups[r.level] || groups.normal).push([s.batches, s.rate === null ? 0 : Number(s.rate.toFixed(1)), Math.max(s.nonconforming, 1), s.code, s.nonconforming, s.name]); });
      const series = Object.keys(groups).filter((k) => groups[k].length).map((k) => ({
        name: { high: '高风险', mid: '重点观察', normal: '稳定供应商', insufficient: '样本不足' }[k],
        type: 'scatter', data: groups[k].map((d) => ({ value: [d[0], d[1], d[2]], name: d[5], code: d[3], nc: d[4] })),
        symbolSize: (v) => Math.min(40, 10 + v[2] * 3), itemStyle: { color: col[k], opacity: .72 },
        label: { show: false }
      }));
      c.setOption({
        tooltip: { formatter: (p) => { const d = p.data; return `${d.name}<br/>合格率：${d.value[1]}%<br/>检验批次：${d.value[0]}<br/>不合格批次：${d.nc}<br/>风险等级：${p.seriesName}`; } },
        legend: { top: 0, textStyle: { color: '#64748B', fontSize: 11 } },
        grid: { left: 50, right: 20, top: 34, bottom: 32 },
        xAxis: { type: 'value', name: '检验批次', splitLine: { lineStyle: { color: '#F1F5F9' } }, axisLabel: { color: '#64748B', fontSize: 11 } },
        yAxis: { type: 'value', name: '合格率%', min: 0, max: 100, splitLine: { lineStyle: { color: '#F1F5F9' } }, axisLabel: { color: '#64748B', fontSize: 11 } },
        series: series.concat([{ name: '参考线', type: 'line', data: [], markLine: { silent: true, symbol: 'none', label: { show: true, fontSize: 11, color: '#94A3B8' }, lineStyle: { color: '#94A3B8', type: 'dashed' }, data: [{ yAxis: SB_TARGET, label: { formatter: '目标 ' + SB_TARGET + '%', color: '#F59E0B', position: 'insideEndTop' } }, { xAxis: SB_MIN_SAMPLE, label: { formatter: '样本 ' + SB_MIN_SAMPLE + ' 批', color: '#94A3B8', position: 'insideEndBottom' } }] } }])
      });
      c.off('click'); c.on('click', (p) => { if (p.data && p.data.code) selectSbSupplier(p.data.code); });
    }

    function renderSbTop10Chart() {
      const el = $('#sbTop10Chart'); if (!el) return;
      if (!window.echarts) { el.innerHTML = sbEmptyHtml('图表库未加载', '请检查网络后重试'); return; }
      ensureSbChart('top10', el);
      const c = sbCharts.top10;
      // 与来料检验看板右下角 supplierRankBoard 同口径：不合格批次(退货+特采)降序 + 合格率=(总批次-不合格)/总批次
      const refRate = (s) => (s.batches > 0 ? (s.batches - s.nonconforming) / s.batches * 100 : 0);
      const list = [...sbSuppliersData].filter((s) => s.nonconforming > 0).sort((a, b) => (b.nonconforming - a.nonconforming) || (refRate(a) - refRate(b))).slice(0, 10);
      if (!list.length) { el.innerHTML = sbEmptyHtml(sbSuppliersData.length ? '暂无不合格批次' : '暂无供应商质量数据', sbSuppliersData.length ? '当前范围内没有退货或特采批次' : '请调整时间范围或筛选条件'); c.clear(); return; }
      const names = list.map((s) => s.name);
      const barData = list.map((s) => s.nonconforming);
      const rateData = list.map((s) => (Math.floor(refRate(s)) / 100));
      c.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (ps) => {
            const s = list[ps[0].dataIndex];
            return `<b>${s.name}</b><br/>批次合格率：${Math.floor(refRate(s))}%<br/>不合格批次：${s.nonconforming}<br/>检验批次：${s.batches}`;
          }
        },
        legend: { top: 0, right: 0, textStyle: { color: '#64748B', fontSize: 11 } },
        grid: { left: 6, right: 6, top: 34, bottom: 2, containLabel: true },
        xAxis: { type: 'category', data: names, axisTick: { show: false }, axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#475569', fontSize: 11, interval: 0, rotate: 40, width: 64, overflow: 'truncate' } },
        yAxis: [
          { type: 'value', name: '不合格批次', minInterval: 1, axisLabel: { color: '#64748B', fontSize: 11 }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
          { type: 'value', name: '合格率', min: 0, max: 1, axisLabel: { color: '#64748B', fontSize: 11, formatter: (v) => (v * 100).toFixed(0) + '%' }, splitLine: { show: false } }
        ],
        series: [
          { name: '不合格批次', type: 'bar', data: barData, barMaxWidth: 22, itemStyle: { color: '#EF4444', borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'top', color: '#334155', fontSize: 11 } },
          { name: '合格率', type: 'line', yAxisIndex: 1, data: rateData, symbolSize: 6, lineStyle: { color: '#F59E0B', width: 2 }, itemStyle: { color: '#F59E0B' }, label: { show: true, position: 'top', formatter: (p) => (p.value * 100).toFixed(0) + '%', color: '#F59E0B', fontSize: 11 } }
        ]
      });
      c.off('click'); c.on('click', (p) => { if (list[p.dataIndex]) selectSbSupplier(list[p.dataIndex].code); });
    }

    function renderSbPareto() {
      const el = $('#sbParetoChart'); if (!el) return;
      if (sbCharts.pareto) { sbCharts.pareto.dispose(); delete sbCharts.pareto; }
      el.innerHTML = sbEmptyHtml('暂无不良项目数据', 'QMS 接口未提供不良类型字段');
    }

    function renderSbRiskList() {
      const el = $('#sbRiskBody'); if (!el) return;
      const risks = sbApplyFilters().filter((s) => { const r = sbRiskInfo(s); return r.level === 'high' || r.level === 'mid'; });
      if (!risks.length) { el.innerHTML = '<tr><td colspan="6" class="empty">暂无风险供应商</td></tr>'; return; }
      el.innerHTML = risks.map((s) => {
        const r = sbRiskInfo(s);
        const deltaTxt = s.delta === null ? (sbPrevMap.has(s.code) ? '0.0pp' : '新增') : (s.delta >= 0 ? '+' : '') + s.delta.toFixed(1) + 'pp';
        const deltaCls = s.delta === null ? '' : (s.delta < 0 ? 'down' : 'up');
        return `<tr data-code="${escHtml(s.code)}" data-name="${escHtml(s.name)}" role="button" tabindex="0"><td>${escHtml(s.name)}</td><td>${s.score}</td><td>${nf.format(s.batches)}批</td><td class="sb-kpi-sub ${deltaCls}" style="margin:0">${deltaTxt}</td><td>${escHtml(r.reasons[0] || '—')}</td><td>${sbLevelTag(r.level)}</td></tr>`;
      }).join('');
      $$('#sbRiskBody tr[data-code]').forEach((tr) => { tr.addEventListener('click', () => selectSbSupplier(tr.dataset.code)); });
    }

    function renderSbAlerts() {
      const el = $('#sbAlertCards'); if (!el) return;
      const alerts = [];
      sbApplyFilters().forEach((s) => {
        const r = sbRiskInfo(s);
        if (r.level === 'high' || r.level === 'mid') {
          const recent = s.recent;
          alerts.push({ s, r, recent, type: r.level === 'high' ? 'danger' : 'warn' });
        }
      });
      alerts.sort((a, b) => (a.r.level === 'high' ? 0 : 1) - (b.r.level === 'high' ? 0 : 1));
      const top = alerts.slice(0, 5);
      if (!top.length) { el.innerHTML = '<div class="sb-empty" style="grid-column:1/-1;min-height:80px"><strong>暂无质量预警</strong></div>'; return; }
      el.innerHTML = top.map((a) => `<div class="sb-alert-card ${a.type === 'danger' ? '' : 'warn'}" data-code="${escHtml(a.s.code)}">
        <span class="sb-alert-dot"></span>
        <div><div class="sb-alert-main">${escHtml(a.s.name)}：${escHtml(a.r.reasons[0] || '存在风险')}</div><div class="sb-alert-sub">最近批次：${escHtml(a.recent || '—')}</div></div>
      </div>`).join('');
      $$('#sbAlertCards .sb-alert-card').forEach((card) => { card.addEventListener('click', () => selectSbSupplier(card.dataset.code)); });
    }

    function renderSbFilters() {
      const catEl = $('#sbCategoryFilter'), supEl = $('#sbSupplierFilter'), facEl = $('#sbFactoryFilter');
      sbCategories = Array.from(new Set(sbSuppliersData.flatMap((s) => s.categories || []))).sort();
      if (catEl) { const cur = catEl.value; catEl.innerHTML = '<option value="">物料类别</option>' + sbCategories.map((c) => `<option value="${escHtml(c)}">${escHtml(c)}</option>`).join(''); catEl.value = cur; }
      if (supEl) { const cur = supEl.value; const names = sbSuppliersData.map((s) => s.name).sort(); supEl.innerHTML = '<option value="">供应商</option>' + names.map((n) => `<option value="${escHtml(n)}">${escHtml(n)}</option>`).join(''); supEl.value = cur; }
      if (facEl) { const cur = facEl.value; facEl.innerHTML = '<option value="">工厂</option>' + FACTORIES.map((f) => `<option value="${escHtml(f.code)}">${escHtml(f.name)}</option>`).join(''); facEl.value = cur; }
    }

    function sbApplyFilters() {
      const cat = $('#sbCategoryFilter') ? $('#sbCategoryFilter').value : '';
      const sup = $('#sbSupplierFilter') ? $('#sbSupplierFilter').value : '';
      let list = sbSuppliersData;
      if (sbSelectedSupplier) list = list.filter((s) => s.code === sbSelectedSupplier);
      if (cat) list = list.filter((s) => (s.categories || []).includes(cat));
      if (sup) list = list.filter((s) => s.code === sup || s.name === sup);
      return list;
    }

    function renderSbBoard() {
      // 趋势懒加载兜底：若为空且未在加载，后台拉取
      if (!sbTrend12.length && !sbTrendLoading) fetchSbTrend();
      renderSbKpis();
      renderSbTrendChart();
      renderSbMatrixChart();
      renderSbTop10Chart();
      renderSbPareto();
      renderSbRiskList();
      renderSbAlerts();
      renderSbFilters();
      renderSbFilterTags();
      const upd = $('#sbUpdated'); if (upd) { const now = new Date(); const pad = (v) => String(v).padStart(2, '0'); upd.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`; }
    }

    function renderSbFilterTags() {
      const el = $('#sbFilterTags'); if (!el) return;
      const tags = [];
      if (sbSelectedSupplier) { const s = sbSuppliersData.find((x) => x.code === sbSelectedSupplier); tags.push(`<span class="sb-filter-tag">供应商：${escHtml(s ? s.name : sbSelectedSupplier)}<button data-clear-supplier="1" title="取消">×</button></span>`); }
      const cat = $('#sbCategoryFilter') ? $('#sbCategoryFilter').value : '';
      if (cat) tags.push(`<span class="sb-filter-tag">物料类别：${escHtml(cat)}</span>`);
      el.innerHTML = tags.join('');
      const clearBtn = el.querySelector('[data-clear-supplier]');
      if (clearBtn) clearBtn.addEventListener('click', () => { sbSelectedSupplier = null; $('#sbCategoryFilter').value = ''; $('#sbSupplierFilter').value = ''; renderSbBoard(); });
    }

    function selectSbSupplier(code) {
      if (sbSelectedSupplier === code) { sbSelectedSupplier = null; } else { sbSelectedSupplier = code; }
      renderSbBoard();
      openSupplierDetail(code);
    }

    function initSupplierBoard() {
      // 初始化月份标签 + 下月按钮禁用（当前月为最新）
      const lbl = $('#sbMonthLabel'); if (lbl) { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + supplierMonthOffset); lbl.textContent = `${d.getFullYear()}年${d.getMonth() + 1}月`; }
      const nextBtn = $('#sbNextMonth'); if (nextBtn) nextBtn.disabled = supplierMonthOffset >= 0;
      // 周期切换
      $$('#sbPeriodSeg button').forEach((b) => b.addEventListener('click', () => {
        sbPeriod = b.dataset.period;
        $$('#sbPeriodSeg button').forEach((x) => x.classList.toggle('active', x === b));
        rebuildSbSuppliers();
      }));
      $$('#sbParetoSeg button').forEach((b) => b.addEventListener('click', () => { $$('#sbParetoSeg button').forEach((x) => x.classList.toggle('active', x === b)); renderSbPareto(); }));
      $('#sbPrevMonth').addEventListener('click', () => setSbMonth(supplierMonthOffset - 1));
      $('#sbNextMonth').addEventListener('click', () => setSbMonth(supplierMonthOffset + 1));
      $('#sbRefreshBtn').addEventListener('click', () => {
        const b = $('#sbRefreshBtn');
        if (b.classList.contains('is-loading')) return;
        b.classList.add('is-loading');
        showToast('正在刷新数据…');
        const done = () => { b.classList.remove('is-loading'); };
        loadDashboardData().then((ok) => {
          done();
          showToast(ok ? '数据已更新' : '刷新未完成，请检查同步状态');
        }).catch(() => { done(); showToast('刷新失败，请重试'); });
      });
      $('#sbWallboardBtn').addEventListener('click', () => setSupplierWallboardMode(!supplierWallboardMode));
      $('#sbCategoryFilter').addEventListener('change', () => renderSbBoard());
      $('#sbSupplierFilter').addEventListener('change', () => renderSbBoard());
      $('#sbFactoryFilter').addEventListener('change', (e) => { if (e.target.value) { const f = FACTORIES.find((x) => x.code === e.target.value); if (f) selectFactory(f.code); } });
      window.addEventListener('resize', () => { Object.values(sbCharts).forEach((c) => { try { c.resize(); } catch (e) {} }); });
    }

    async function rebuildSbSuppliers() {
      const seq = ++sbRequestSeq;
      const factory = QMS_CONFIG.factoryCode;
      let records;
      if (sbPeriod === 'month') {
        return setSbMonth(supplierMonthOffset);
      } else {
        // 季/年需拉取对应范围明细（异步），大分页减少请求次数
        const months = sbPeriod === 'quarter' ? 3 : 12;
        const from = monthRange(-(months - 1)).start;
        showToast(sbPeriod === 'quarter' ? '正在加载季度数据…' : '正在加载年度数据…');
        try { records = await qmsSelectAll({ factoryCode: factory, createDateStart: from, createDateEnd: todayStr() }, 2000); }
        catch (e) { if (seq === sbRequestSeq) showToast('周期数据加载失败，请重试'); return false; }
      }
      if (seq !== sbRequestSeq || factory !== QMS_CONFIG.factoryCode) return false;
      sbPrevMap = new Map();
      sbSuppliersData = computeSbSuppliers(records);
      renderSbBoard();
      return true;
    }

    async function setSbMonth(offset) {
      if (offset > 0) return;
      const seq = ++sbRequestSeq;
      const factory = QMS_CONFIG.factoryCode;
      sbPeriod = 'month';
      $$('#sbPeriodSeg button').forEach((b) => b.classList.toggle('active', b.dataset.period === 'month'));
      supplierMonthOffset = offset;
      // 立即更新月份标签与下月按钮，避免等待数据时显示旧状态
      const lbl = $('#sbMonthLabel'); if (lbl) { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + offset); lbl.textContent = `${d.getFullYear()}年${d.getMonth() + 1}月`; }
      const next = $('#sbNextMonth'); if (next) next.disabled = offset >= 0;
      let records;
      if (offset === 0) records = DASH.month;
      else {
        // 切历史月份时环比无对应上月数据，清空避免显示错误的 0.0pp
        sbPrevMap = new Map();
        const r = monthRange(offset);
        try { records = await qmsSelectAll({ factoryCode: factory, createDateStart: r.start, createDateEnd: r.end }, 2000); }
        catch (e) { if (seq === sbRequestSeq) showToast('月份数据加载失败，请重试'); return false; }
      }
      if (seq !== sbRequestSeq || factory !== QMS_CONFIG.factoryCode) return false;
      sbPrevMap = new Map();
      if (offset === 0) computeSuppliers(DASH.prevMonth).forEach((s) => sbPrevMap.set(s.code, s.raw));
      sbSuppliersData = computeSbSuppliers(records);
      renderSbBoard();
      return true;
    }

    function openSupplierDetail(code) {
      const s = sbSuppliersData.find((x) => x.code === code) || supplierRankings.find((x) => x.code === code);
      if (!s) return;
      $('#supplierDetailModalName').textContent = `${s.name} · ${s.code}`;
      const r = sbRiskInfo(s);
      $('#supplierDetailModalStats').innerHTML = `
        <div class="sms-item"><label>检验批次</label><strong>${nf.format(s.batches)}</strong></div>
        <div class="sms-item"><label>合格</label><strong>${nf.format(s.pass)}</strong></div>
        <div class="sms-item"><label>特采</label><strong>${nf.format(s.special)}</strong></div>
        <div class="sms-item bad"><label>不合格</label><strong>${nf.format(s.fail)}</strong></div>
        <div class="sms-item good"><label>批次合格率</label><strong>${s.score}</strong></div>`;
      // 风险等级 + 环比 + 物料类别
      const deltaTxt = s.delta === null ? (sbPrevMap.has(s.code) ? '0.0pp' : '新增') : (s.delta >= 0 ? '+' : '') + s.delta.toFixed(1) + 'pp';
      const cats = (s.categories && s.categories.length) ? s.categories : Array.from(new Set(DASH.month.filter((x) => (x.supplierName || '') === code).map((x) => x.materialCategory).filter(Boolean)));
      $('#supplierDetailModalMeta').innerHTML = `<span class="m-label">风险等级</span><span>${sbLevelTag(r.level)}</span><span class="m-label">环比</span><strong>${deltaTxt}</strong><span class="m-label">物料类别</span><strong>${escHtml(cats.join('、') || '—')}</strong>`;
      // 风险提示
      const reasons = r.reasons;
      const riskBox = $('#supplierDetailModalStats');
      if (reasons.length) {
        const el = document.createElement('div');
        el.className = 'supplier-risk-box';
        el.style.gridColumn = '1 / -1';
        el.innerHTML = `<strong>风险提示</strong><ul>${reasons.map((x) => `<li>${escHtml(x)}</li>`).join('')}</ul>`;
        riskBox.appendChild(el);
      }
      // 主要不良 TOP5（数据缺失）
      $('#supplierDetailModalDefects').innerHTML = '暂无不良类型数据（QMS 接口未提供不良类型字段）';
      // 最近检验记录（按 supplierName 匹配）
      const recs = DASH.records
        .filter((x) => (x.supplierName || '') === code)
        .sort((a, b) => (b.createDate || '').localeCompare(a.createDate || ''))
        .slice(0, 10);
      if (!recs.length) {
        $('#supplierDetailModalRecords').innerHTML = '<div class="empty">当前筛选范围内暂无该供应商的检验记录</div>';
      } else {
        $('#supplierDetailModalRecords').innerHTML = `<table><thead><tr><th>单号</th><th>料号</th><th>物料</th><th>送检日期</th><th>检验结果</th></tr></thead><tbody>${recs.map((x) => {
          const res = mapResult(x);
          return `<tr><td class="mono">${escHtml(x.orderNumber)}</td><td class="mono">${escHtml(x.materialNumber)}</td><td title="${escHtml(x.materialName || '')}">${escHtml(x.materialName || '—')}</td><td class="mono">${escHtml(x.createDate || '')}</td><td><span class="status-pill ${res.key}">${res.label}</span></td></tr>`;
        }).join('')}</tbody></table>`;
      }
      // 最近 6 个月趋势（异步）
      $('#supplierDetailModalTrend').innerHTML = '<div class="sb-empty" style="min-height:120px"><span>趋势加载中…</span></div>';
      loadSupplierTrend6(code);
      $('#supplierDetailModalBackdrop').classList.add('open');
    }
    function closeSupplierDetail() { detailTrendSeq += 1; $('#supplierDetailModalBackdrop').classList.remove('open'); }

    async function loadSupplierTrend6(code) {
      const seq = ++detailTrendSeq;
      const factory = QMS_CONFIG.factoryCode;
      const el = $('#supplierDetailModalTrend');
      if (!el) return;
      try {
        const from = monthRange(-5).start;
        const recs = await qmsSelectAll({ factoryCode: QMS_CONFIG.factoryCode, supplierName: code, createDateStart: from, createDateEnd: todayStr() }, 2000);
        if (seq !== detailTrendSeq || factory !== QMS_CONFIG.factoryCode) return;
        const byMonth = {};
        recs.forEach((x) => {
          const m = (x.createDate || '').slice(0, 7);
          if (!byMonth[m]) byMonth[m] = { pass: 0, fail: 0, special: 0 };
          const res = x.syncInspectionResultName;
          if (res === '合格') byMonth[m].pass += 1; else if (res === '退货') byMonth[m].fail += 1; else if (res === '特采') byMonth[m].special += 1;
        });
        const months = [];
        for (let i = 5; i >= 0; i--) months.push(monthRange(-i).start.slice(0, 7));
        const data = months.map((m) => { const d = byMonth[m]; const decided = d ? (d.pass + d.fail + d.special) : 0; return { m, batches: decided, passRate: decided > 0 ? (d.pass / decided * 100) : null }; });
        if (!window.echarts) { el.innerHTML = ''; return; }
        ensureSbChart('detailTrend', el);
        const c = sbCharts.detailTrend;
        c.setOption({
          tooltip: { trigger: 'axis' },
          legend: { data: ['检验批次', '合格率'], top: 0, textStyle: { color: '#64748B', fontSize: 11 } },
          grid: { left: 46, right: 42, top: 32, bottom: 22 },
          xAxis: { type: 'category', data: data.map((d) => d.m), axisLabel: { color: '#64748B', fontSize: 11 } },
          yAxis: [
            { type: 'value', name: '合格率%', min: 0, max: 100, splitLine: { lineStyle: { color: '#F1F5F9' } }, axisLabel: { color: '#64748B', fontSize: 11 } },
            { type: 'value', name: '批次', splitLine: { show: false }, axisLabel: { color: '#64748B', fontSize: 11 } }
          ],
          series: [
            { name: '检验批次', type: 'bar', yAxisIndex: 1, data: data.map((d) => d.batches), barMaxWidth: 18, itemStyle: { color: '#BFDBFE' } },
            { name: '合格率', type: 'line', data: data.map((d) => d.passRate), symbol: 'circle', symbolSize: 6, itemStyle: { color: '#2563EB' }, lineStyle: { width: 2 }, markLine: { silent: true, symbol: 'none', label: { show: false }, lineStyle: { color: '#F59E0B', type: 'dashed' }, data: [{ yAxis: SB_TARGET }] } }
          ]
        });
      } catch (e) { if (seq === detailTrendSeq) el.innerHTML = '<div class="sb-empty" style="min-height:120px"><span>趋势加载失败</span></div>'; }
    }

    function renderAlerts() {
      const all = DASH.alerts;
      if (!all.length) { $('#alertList').innerHTML = '<div class="alert-item"><span class="alert-icon"><svg width="14" height="14"><use href="#icon-check"/></svg></span><div><div class="alert-main"><span class="alert-title">暂无异常</span></div></div></div>'; $('#alertCount').textContent = '0 条需关注'; return; }
      const list = all.slice(0, 3);
      $('#alertList').innerHTML = list.map((a) => {
        const icon = a.type === 'danger' ? 'icon-alert' : a.type === 'info' ? 'icon-info' : 'icon-clock';
        return `<div class="alert-item ${a.type === 'danger' ? 'danger' : a.type === 'info' ? 'info' : ''}"><span class="alert-icon"><svg width="14" height="14"><use href="#${icon}"/></svg></span><div><div class="alert-main"><span class="alert-title" data-i18n="${a.titleKey}">${t(a.titleKey)}</span><span class="alert-time"></span></div><div class="alert-copy">${escHtml(a.copy)}</div></div></div>`;
      }).join('');
      $('#alertCount').textContent = `${all.length} ${locale === 'th' ? 'รายการ' : locale === 'en' ? 'items' : '条需关注'}`;
    }
    function openAlertsModal() {
      const all = DASH.alerts;
      const body = $('#alertsModalList');
      if (!body) return;
      if (!all.length) { body.innerHTML = '<div class="alert-item"><span class="alert-icon"><svg width="14" height="14"><use href="#icon-check"/></svg></span><div><div class="alert-main"><span class="alert-title">暂无异常</span></div></div></div>'; }
      else {
        body.innerHTML = all.map((a) => {
          const icon = a.type === 'danger' ? 'icon-alert' : a.type === 'info' ? 'icon-info' : 'icon-clock';
          return `<div class="alert-item ${a.type === 'danger' ? 'danger' : a.type === 'info' ? 'info' : ''}"><span class="alert-icon"><svg width="14" height="14"><use href="#${icon}"/></svg></span><div><div class="alert-main"><span class="alert-title" data-i18n="${a.titleKey}">${t(a.titleKey)}</span></div><div class="alert-copy">${escHtml(a.copy)}</div></div></div>`;
        }).join('');
      }
      $('#alertsModalBackdrop').classList.add('open');
    }
    function closeAlertsModal() { $('#alertsModalBackdrop').classList.remove('open'); }
    function updateDatePill() {
      const now = new Date();
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const zh = `${now.getFullYear()}年${pad2(now.getMonth() + 1)}月${pad2(now.getDate())}日 · 周${weekdays[now.getDay()]}`;
      $$('.date-pill span[data-i18n="date_today"]').forEach((el) => { el.textContent = zh; });
      const rs = $('#resultSubtitle');
      if (rs) rs.textContent = t('result_subtitle') + ' · ' + monthPrefix(0).replace('-', '.');
    }

    function setSyncState(loading, error, mode) {
      const dot = $('.sync-head .live-dot'), live = $('.sync-live'), copy = $('.sync-copy');
      if (loading) {
        dot.style.background = '#e5a43b'; live.textContent = 'SYNC'; live.style.color = '#b27b1d'; live.style.background = '#fff5de';
        copy.textContent = '正在同步 QMS 数据…';
      } else if (error) {
        dot.style.background = '#e55d68'; live.textContent = 'ERR'; live.style.color = '#cf3f50'; live.style.background = '#ffedef';
        copy.textContent = 'QMS 连接异常，请检查账号或网络。';
      } else if (mode === 'cached') {
        dot.style.background = '#e5a43b'; live.textContent = 'CACHE'; live.style.color = '#b27b1d'; live.style.background = '#fff5de';
        copy.textContent = '显示上次缓存数据 · 实时接口暂不可用';
      } else {
        dot.style.background = '#46d7ad'; live.textContent = 'LIVE'; live.style.color = '#238e70'; live.style.background = '#e8f7f1';
        copy.textContent = '已连接 QMS 数据源 · 每 5 分钟自动同步';
      }
    }

    function slimRecord(r) {
      return {
        orderNumber: r.orderNumber, materialNumber: r.materialNumber, materialName: r.materialName,
        materialCategory: r.materialCategory, supplierName: r.supplierName, supplierCode: r.supplierCode,
        qty: r.qty, expeditedFlagName: r.expeditedFlagName, createDate: r.createDate,
        inspectorName: r.inspectorName, taskName: r.taskName, inspectionStatus: r.inspectionStatus,
        inspectionStatusName: r.inspectionStatusName, syncInspectionResultName: r.syncInspectionResultName,
        totalTime: r.totalTime
      };
    }
    function renderSupplierRankings() {
      const board = $('#supplierRankBoard');
      const el = $('#supplierRankChart');
      if (!board || !el) return;
      const isBottom = supplierMode === 'bottom';
      // 与 QMS 看板同口径：合格率 = (总批次 - 不合格批次) / 总批次，不合格批次 = 退货 + 特采（进行中批次默认算合格）
      const refRate = (s) => (s.batches > 0 ? (s.batches - s.nonconforming) / s.batches * 100 : 0);
      // 倒数=按不合格批次数降序取前10；正向=按合格率降序取前10
      const list = isBottom
        ? [...DASH.suppliers].filter((s) => s.nonconforming > 0).sort((a, b) => (b.nonconforming - a.nonconforming) || (refRate(a) - refRate(b))).slice(0, 10)
        : [...DASH.suppliers].sort((a, b) => (refRate(b) - refRate(a)) || (b.batches - a.batches)).slice(0, 10);
      const now = new Date();
      const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const titleEl = $('#supplierRankTitle');
      if (titleEl) titleEl.textContent = (isBottom ? '倒数前10名供应商' : '正向前10名供应商') + '-' + ym;
      if (!window.echarts) { el.innerHTML = '<div class="sb-empty" style="padding:20px"><strong>图表库未加载</strong></div>'; return; }
      if (!list.length) { el.innerHTML = '<div class="sb-empty" style="padding:20px"><strong>暂无供应商质量数据</strong></div>'; if (sbCharts.supplierRank) { try { sbCharts.supplierRank.clear(); } catch (e) {} } return; }
      ensureSbChart('supplierRank', el);
      const c = sbCharts.supplierRank;
      const names = list.map((s) => s.name);
      // 柱：倒数=不合格批次数，正向=合格批次数；线：合格率(0~1)，与 QMS 同口径截断到整数百分比
      const barData = list.map((s) => (isBottom ? s.nonconforming : s.pass));
      const barName = isBottom ? '不合格批次' : '合格批次';
      const rateData = list.map((s) => (Math.floor(refRate(s)) / 100));
      c.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (ps) => {
            const s = list[ps[0].dataIndex];
            return `<b>${s.name}</b><br/>批次合格率：${Math.floor(refRate(s))}%<br/>${barName}：${isBottom ? s.nonconforming : s.pass}<br/>检验批次：${s.batches}`;
          }
        },
        legend: { top: 0, right: 0, textStyle: { color: '#64748B', fontSize: 11 } },
        grid: { left: 6, right: 6, top: 34, bottom: 2, containLabel: true },
        xAxis: { type: 'category', data: names, axisTick: { show: false }, axisLine: { lineStyle: { color: '#E5E7EB' } }, axisLabel: { color: '#475569', fontSize: 11, interval: 0, rotate: 40, width: 64, overflow: 'truncate' } },
        yAxis: [
          { type: 'value', name: barName, minInterval: 1, axisLabel: { color: '#64748B', fontSize: 11 }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
          { type: 'value', name: '合格率', min: 0, max: 1, axisLabel: { color: '#64748B', fontSize: 11, formatter: (v) => (v * 100).toFixed(0) + '%' }, splitLine: { show: false } }
        ],
        series: [
          { name: barName, type: 'bar', data: barData, barMaxWidth: 22, itemStyle: { color: isBottom ? '#EF4444' : '#16A34A', borderRadius: [3, 3, 0, 0] }, label: { show: true, position: 'top', color: '#334155', fontSize: 11 } },
          { name: '合格率', type: 'line', yAxisIndex: 1, data: rateData, symbolSize: 6, lineStyle: { color: '#F59E0B', width: 2 }, itemStyle: { color: '#F59E0B' }, label: { show: true, position: 'top', formatter: (p) => (p.value * 100).toFixed(0) + '%', color: '#F59E0B', fontSize: 11 } }
        ]
      });
      try { c.resize(); } catch (e) {}
    }
    function renderAll() {
      renderKpis();
      setFlowRange(currentFlowRange);
      renderTrend();
      renderResultStats();
      renderInspectors();
      renderAlerts();
      renderTableRows();
      updateDatePill();
      $('#lastRefresh').textContent = currentTimeString();
      renderSbBoard();
      renderSupplierRankings();
    }
    function computeDerived(records, active, overdueTotal) {
      const today = todayStr();
      const mp = monthPrefix(0), pmp = monthPrefix(-1);
      DASH.records = records;
      DASH.today = records.filter((r) => r.createDate === today);
      DASH.week = records.filter((r) => (r.createDate || '') >= daysAgoStr(6));
      DASH.month = records.filter((r) => (r.createDate || '').startsWith(mp));
      DASH.prevMonth = records.filter((r) => (r.createDate || '').startsWith(pmp));
      DASH.byDate = {};
      records.forEach((r) => { const k = r.createDate; (DASH.byDate[k] = DASH.byDate[k] || []).push(r); });
      DASH.flow.today = computeFlow(DASH.today);
      DASH.flow.week = computeFlow(DASH.week);
      DASH.flow.month = computeFlow(DASH.month);
      DASH.resultStats = computeResultStats(DASH.month);
      const prevRs = computeResultStats(DASH.prevMonth);
      DASH.prevPassRate = prevRs.total > 0 ? prevRs.passRate : null;
      DASH.suppliers = computeSuppliers(DASH.month);
      if (supplierMonthOffset === 0) supplierRankings = DASH.suppliers;
      const act = active || records.filter((r) => r.inspectionStatus === '0');
      DASH.inspectors = computeInspectors(act);
      DASH.alerts = computeAlerts();
      DASH.pendingTotal = act.length;
      if (overdueTotal != null) DASH.overdueTotal = overdueTotal;
    }
    function loadCachedDash() {
      try {
        const raw = localStorage.getItem('qms_dash_cache');
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (data && data.version === 2 && data.factoryCode === QMS_CONFIG.factoryCode &&
            Number.isFinite(data.ts) && Date.now() >= data.ts && Date.now() - data.ts < 30 * 60 * 1000 &&
            Array.isArray(data.records) && Array.isArray(data.active) && Array.isArray(data.prevMonth)) {
          computeDerived(data.records, data.active, data.overdueTotal);
          DASH.prevMonth = data.prevMonth;
          DASH.prevResultStats = computeResultStats(data.prevMonth);
          DASH.prevPassRate = DASH.prevResultStats.total ? DASH.prevResultStats.passRate : null;
          DASH.prevSupplierCount = new Set(data.prevMonth.map((r) => r.supplierName || r.supplierCode || '')).size;
          // 补齐供应商看板数据（缓存路径原先漏算，导致 sb-page 图表空白）
          sbPrevMap = new Map();
          computeSuppliers(DASH.prevMonth).forEach((s) => sbPrevMap.set(s.code, s.raw));
          if (sbPeriod === 'month' && supplierMonthOffset === 0) sbSuppliersData = computeSbSuppliers(DASH.month);
          renderAll();
          setSyncState(false, null, 'cached');
          return true;
        }
      } catch (e) {}
      return false;
    }
    function saveDashCache(active, prevMonth) {
      try {
        localStorage.setItem('qms_dash_cache', JSON.stringify({ version: 2, factoryCode: QMS_CONFIG.factoryCode, ts: Date.now(), records: DASH.records.map(slimRecord), active: active.map(slimRecord), prevMonth: prevMonth.map(slimRecord), overdueTotal: DASH.overdueTotal }));
      } catch (e) {}
    }
    async function loadDashboardData(silent = false) {
      const mySeq = ++loadSeq;
      qmsLoading = true;
      // 先用本地缓存立即渲染，打开即见上次数据
      const fromCache = loadCachedDash();
      if (!fromCache) setSyncState(true);
      try {
        if (mySeq !== loadSeq) return;
        const today = todayStr();
        const monthStart = monthPrefix(0) + '-01';
        const prevRange = monthRange(-1);
        // 待办 = 进行中(0) + 超时未完成(2)；本月 = 合格率/结果/供应商统计；上月 = 环比
        // 四个数据集必须完整，避免把接口失败当作零数据并覆盖有效缓存。
        const settled = await Promise.allSettled([
          qmsSelectAll({ factoryCode: QMS_CONFIG.factoryCode, inspectionStatus: '0' }),
          qmsSelectAll({ factoryCode: QMS_CONFIG.factoryCode, inspectionStatus: '2' }),
          qmsSelectAll({ factoryCode: QMS_CONFIG.factoryCode, createDateStart: monthStart, createDateEnd: today }, 5000),
          qmsSelectAll({ factoryCode: QMS_CONFIG.factoryCode, createDateStart: prevRange.start, createDateEnd: prevRange.end }, 5000)
        ]);
        if (mySeq !== loadSeq) return;
        const failed = settled.find((r) => r.status === 'rejected');
        if (failed) throw failed.reason;
        const [active, overdue, month, prevMonth] = settled.map((r) => r.value);
        const map = new Map();
        [...month, ...overdue, ...active].forEach((r) => { if (r.orderNumber) map.set(r.orderNumber, r); });
        const records = Array.from(map.values()).sort((a, b) => (b.createDate || '').localeCompare(a.createDate || ''));
        const overdueTotal = overdue.length;
        computeDerived(records, active, overdueTotal);
        // 上月汇总（KPI 环比用）
        DASH.prevResultStats = computeResultStats(prevMonth);
        DASH.prevMonth = prevMonth;
        DASH.prevPassRate = DASH.prevResultStats.total ? DASH.prevResultStats.passRate : null;
        DASH.prevSupplierCount = new Set(prevMonth.map((r) => r.supplierName || r.supplierCode || '')).size;
        sbPrevMap = new Map();
        computeSuppliers(prevMonth).forEach((s) => sbPrevMap.set(s.code, s.raw));
        if (sbPeriod === 'month' && supplierMonthOffset === 0) sbSuppliersData = computeSbSuppliers(DASH.month);
        renderAll();
        saveDashCache(active, prevMonth);
        setSyncState(false);
        if (!sbTrendLoading) fetchSbTrend();
        return true;
      } catch (err) {
        if (mySeq !== loadSeq) return;
        console.error(err);
        if (fromCache) { setSyncState(false, null, 'cached'); }
        else { setSyncState(false, err); if (!silent) showToast('数据加载失败：' + (err.message || err)); }
        return false;
      } finally { if (mySeq === loadSeq) qmsLoading = false; }
    }

    /* ===================== 原有 UI 逻辑 ===================== */
    function t(key) {
      if (locale === 'mix') return `${I18N.zh[key] || key} · ${I18N.th[key] || key}`;
      return I18N[locale][key] || I18N.zh[key] || key;
    }
    function updatePageUi() {
      document.body.dataset.page = currentPage;
      const breadcrumbKey = currentPage === 'tasks' ? 'breadcrumb_tasks' : currentPage === 'suppliers' ? 'breadcrumb_suppliers' : 'breadcrumb_overview';
      const breadcrumb = $('#breadcrumbCurrent');
      if (breadcrumb) breadcrumb.textContent = t(breadcrumbKey);
      $$('.nav-item[data-page]').forEach((item) => {
        const active = item.dataset.page === currentPage;
        item.classList.toggle('active', active);
        if (active) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
      });
    }
    function setPage(page, updateHash = true) {
      currentPage = validPages.includes(page) ? page : 'overview';
      updatePageUi();
      if (updateHash && window.location.hash !== `#${currentPage}`) history.pushState(null, '', `#${currentPage}`);
      // 切换到供应商页时，ECharts 图表从 display:none 变为可见，需重新 resize
      if (currentPage === 'suppliers') setTimeout(() => { Object.values(sbCharts).forEach((c) => { try { c.resize(); } catch (e) {} }); }, 60);
    }
    function updateSidebarUi() {
      const shell = $('.app-shell'), button = $('#sidebarToggle');
      shell.classList.toggle('sidebar-hidden', sidebarHidden);
      button.setAttribute('aria-pressed', sidebarHidden ? 'true' : 'false');
      button.setAttribute('aria-label', t(sidebarHidden ? 'sidebar_show' : 'sidebar_hide'));
      button.title = t(sidebarHidden ? 'sidebar_show' : 'sidebar_hide');
    }
    function updateWallboardUi() {
      const button = $('#wallboardToggle'), label = $('#wallboardToggleText');
      const supplierButton = $('#supplierWallboardToggle');
      const actionKey = wallboardMode ? 'exit_wallboard' : 'enter_wallboard';
      button.setAttribute('aria-pressed', wallboardMode ? 'true' : 'false');
      button.title = t(actionKey); label.textContent = t(actionKey);
      supplierButton.setAttribute('aria-pressed', supplierWallboardMode ? 'true' : 'false');
      supplierButton.title = t(supplierWallboardMode ? 'exit_supplier_wallboard' : 'supplier_wallboard_entry');
      $('#supplierWallboardToggleText').textContent = t(supplierWallboardMode ? 'exit_supplier_wallboard' : 'supplier_wallboard_entry');
      $('#wallboardModeLabel').textContent = t(supplierWallboardMode ? 'supplier_wallboard_live' : 'wallboard_live');
      $('#wallboardExitText').textContent = t(supplierWallboardMode ? 'exit_supplier_wallboard' : 'exit_wallboard');
    }
    let tableAutoScrollTimer = null;
    function stopTableAutoScroll() {
      if (tableAutoScrollTimer) { cancelAnimationFrame(tableAutoScrollTimer); tableAutoScrollTimer = null; }
    }
    function startTableAutoScroll() {
      stopTableAutoScroll();
      const wrap = $('.table-card .table-wrap');
      if (!wrap) return;
      let last = performance.now();
      let acc = 0;
      const speed = 40; // 像素/秒
      const step = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        if (!wrap.matches(':hover')) {
          const max = wrap.scrollHeight - wrap.clientHeight;
          if (max > 0) {
            acc += speed * dt;
            const stepPx = Math.floor(acc);
            if (stepPx > 0) {
              acc -= stepPx;
              wrap.scrollTop = wrap.scrollTop >= max - 1 ? 0 : wrap.scrollTop + stepPx;
            }
          }
        }
        tableAutoScrollTimer = requestAnimationFrame(step);
      };
      tableAutoScrollTimer = requestAnimationFrame(step);
    }
    let sbAutoScrollTimer = null;
    function stopSbAutoScroll() {
      if (sbAutoScrollTimer) { cancelAnimationFrame(sbAutoScrollTimer); sbAutoScrollTimer = null; }
      const wrap = $('.sb-risk-table-wrap');
      const table = wrap ? wrap.querySelector('table') : null;
      if (table) table.style.transform = '';
    }
    function startSbAutoScroll() {
      stopSbAutoScroll();
      const wrap = $('.sb-risk-table-wrap');
      if (!wrap) return;
      const table = wrap.querySelector('table');
      if (!table) return;
      table.style.willChange = 'transform';
      let last = performance.now();
      let pos = 0;
      const speed = 22; // 像素/秒，慢速轮播
      const step = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        const max = wrap.scrollHeight - wrap.clientHeight;
        if (!wrap.matches(':hover') && max > 0) {
          pos += speed * dt;
          if (pos >= max) pos = 0;
          // 用 transform 亚像素平移，避免 scrollTop 整数截断导致的卡顿/低帧率
          table.style.transform = `translateY(${-pos}px)`;
        }
        sbAutoScrollTimer = requestAnimationFrame(step);
      };
      sbAutoScrollTimer = requestAnimationFrame(step);
    }
    function syncWallboardClasses() {
      document.body.classList.toggle('wallboard-mode', wallboardMode);
      document.body.classList.toggle('supplier-wallboard-mode', supplierWallboardMode);
      const supplierBoard = $('#suppliers');
      if (supplierBoard) {
        if (supplierWallboardMode) supplierBoard.style.setProperty('display', 'block', 'important');
        else supplierBoard.style.removeProperty('display');
      }
      if (wallboardMode) startTableAutoScroll();
      else stopTableAutoScroll();
      if (supplierWallboardMode) startSbAutoScroll();
      else stopSbAutoScroll();
      // 看板模式切换后，图表从 display:none 变为可见，需重绘；但全屏切换尚未完成，
      // 这里只作兜底延迟（正常由 fullscreenchange 更早触发），避免"先错后对"的跳变
      if (wallboardMode || supplierWallboardMode) {
        setTimeout(() => {
          Object.values(sbCharts).forEach((c) => { try { c.resize(); } catch (e) {} });
        }, 400);
      }
    }
    function setWallboardMode(enabled, useFullscreen = true) {
      if (enabled) supplierWallboardMode = false;
      wallboardMode = Boolean(enabled);
      syncWallboardClasses(); updateWallboardUi();
      renderTableRows();
      if (wallboardMode && useFullscreen && document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      if (!wallboardMode && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
    function setSupplierWallboardMode(enabled, useFullscreen = true) {
      if (enabled) wallboardMode = false;
      supplierWallboardMode = Boolean(enabled);
      syncWallboardClasses(); updateWallboardUi();
      if (supplierWallboardMode && useFullscreen && document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      if (!supplierWallboardMode && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
    function updateWallboardClock() {
      const now = new Date(); const pad = (v) => String(v).padStart(2, '0');
      $('#wallboardClock').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    function applyLocale() {
      document.documentElement.lang = locale === 'th' ? 'th' : locale === 'en' ? 'en' : 'zh-CN';
      $$('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
      $$('[data-i18n-placeholder]').forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
      $$('[data-locale]').forEach((button) => { button.classList.toggle('active', button.dataset.locale === locale); button.setAttribute('aria-pressed', button.dataset.locale === locale ? 'true' : 'false'); });
      setFlowRange(currentFlowRange);
      updateSidebarUi(); updatePageUi(); updateWallboardUi();
      if (DASH.records.length) { renderKpis(); renderTrend(); renderResultStats(); renderInspectors(); renderAlerts(); renderTableRows(); applyFilters(); renderSbBoard(); }
      updateDatePill();
    }
    function showToast(message) {
      $('#toastText').textContent = message;
      $('#toast').classList.add('show');
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => $('#toast').classList.remove('show'), 2600);
    }
    function currentTimeString() {
      const now = new Date(); const pad = (v) => String(v).padStart(2, '0');
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    function openDetail(row) {
      const id = row.dataset.id;
      const rec = DASH.records.find((r) => r.orderNumber === id) || {};
      const c = row.cells;
      $('#detailTitle').textContent = id;
      $('#detailPart').textContent = rec.materialNumber != null ? rec.materialNumber : c[1].textContent.trim();
      $('#detailMaterial').textContent = rec.materialName != null ? rec.materialName : c[2].textContent.trim();
      $('#detailCategory').textContent = rec.materialCategory != null ? rec.materialCategory : c[3].textContent.trim();
      $('#detailSupplier').textContent = `${cleanSupplierName(rec.supplierName || '')} / ${rec.supplierCode || ''}`;
      $('#detailQuantity').textContent = rec.qty != null ? fmtQty(rec.qty) : c[6].textContent.trim();
      $('#detailInspector').textContent = rec.inspectorName || c[9].textContent.trim();
      $('#detailDate').textContent = rec.createDate || c[8].textContent.trim();
      $('#detailStatus').innerHTML = c[11].innerHTML;
      $('#detailSla').textContent = rec.totalTime ? rec.totalTime : (row.dataset.status === 'overdue' ? (locale === 'th' ? 'เกินเวลา' : '已超时') : (locale === 'th' ? 'อยู่ใน SLA' : 'SLA 内'));
      const done = (rec.inspectionStatus === '1' || rec.inspectionStatus === '3');
      $$('.timeline-step').forEach((step, i) => { step.classList.toggle('current', done ? i === 3 : i === 2); step.classList.toggle('done', done ? i < 4 : i < 2); });
      $('#detailBackdrop').classList.add('open');
    }
    function closeDetail() { $('#detailBackdrop').classList.remove('open'); }
    function downloadCsv() {
      const headers = ['单号', '料号', '物料名称', '物料类别', '收料工厂', '供应商', '供应商编码', '来料数量', '是否加急', '送检日期', '检验员', '流程节点', '时效状态', '检验结果'];
      const values = tableRows.map((r) => {
        const st = mapStatus(r), res = mapResult(r);
        return [r.orderNumber, r.materialNumber, r.materialName || '', r.materialCategory || '', QMS_CONFIG.factoryName, cleanSupplierName(r.supplierName), r.supplierCode || '', r.qty != null ? r.qty : '', r.expeditedFlagName === '是' ? t('yes') : t('no'), r.createDate || '', r.inspectorName || '', r.taskName || '', st.label, res.label];
      });
      const csv = [headers, ...values].map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
      const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = `iqc-inspection-${todayStr()}.csv`; link.click();
      URL.revokeObjectURL(url);
      showToast(t('export_done'));
    }
    function applyFilters() {
      tablePage = 1;
      renderTableRows();
    }
    function enableSorting() {
      $$('th[data-sort]').forEach((header) => {
        header.addEventListener('click', () => {
          const type = header.dataset.sort;
          if (tableSort && tableSort.type === type) tableSort.direction *= -1;
          else tableSort = { type, direction: -1 };
          tablePage = 1;
          renderTableRows();
        });
      });
    }
    function bindEvents() {
      $$('[data-locale]').forEach((button) => button.addEventListener('click', () => { locale = button.dataset.locale; applyLocale(); }));
      $$('.nav-item[data-page]').forEach((item) => item.addEventListener('click', (event) => { event.preventDefault(); setPage(item.dataset.page); }));
      window.addEventListener('hashchange', () => setPage(window.location.hash.slice(1), false));
      window.addEventListener('popstate', () => setPage(window.location.hash.slice(1), false));
      $('#sidebarToggle').addEventListener('click', () => { sidebarHidden = !sidebarHidden; updateSidebarUi(); });
      $('#wallboardToggle').addEventListener('click', () => setWallboardMode(!wallboardMode));
      $('#supplierWallboardToggle').addEventListener('click', () => setSupplierWallboardMode(!supplierWallboardMode));
      $('#wallboardExit').addEventListener('click', () => supplierWallboardMode ? setSupplierWallboardMode(false) : setWallboardMode(false));
      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          // 进入全屏后，等布局稳定再统一重绘所有图表，消除"先错后对"的缩放跳变
          requestAnimationFrame(() => requestAnimationFrame(() => {
            Object.values(sbCharts).forEach((c) => { try { c.resize(); } catch (e) {} });
          }));
        }
        if (!document.fullscreenElement && wallboardMode) setWallboardMode(false, false);
        if (!document.fullscreenElement && supplierWallboardMode) setSupplierWallboardMode(false, false);
      });
      updateWallboardClock(); setInterval(updateWallboardClock, 1000);
      $$('[data-range]').forEach((button) => button.addEventListener('click', () => setFlowRange(button.dataset.range)));
      const searchInput = $('#globalSearch'), statusFilter = $('#statusFilter'), rangeFilter = $('#rangeFilter');
      [searchInput, statusFilter].forEach((control) => control.addEventListener('input', applyFilters));
      rangeFilter.addEventListener('change', () => {
        const isCustom = rangeFilter.value === 'custom';
        $('#dateStart').hidden = !isCustom;
        $('#dateEnd').hidden = !isCustom;
        $('#dateSep').hidden = !isCustom;
        if (DASH.records.length) { tablePage = 1; renderTableRows(); }
      });
      const onCustomDate = async () => {
        await loadDateRange($('#dateStart').value, $('#dateEnd').value);
        tablePage = 1; renderTableRows();
      };
      $('#dateStart').addEventListener('change', onCustomDate);
      $('#dateEnd').addEventListener('change', onCustomDate);
      urgentFilter = $('#urgentFilter');
      urgentFilter.addEventListener('click', () => { urgentOnly = !urgentOnly; urgentFilter.classList.toggle('active', urgentOnly); applyFilters(); });
      $('#refreshBtn').addEventListener('click', () => {
        const button = $('#refreshBtn'); button.classList.add('is-loading');
        loadDashboardData().then(() => { button.classList.remove('is-loading'); });
      });
      $('#exportBtn').addEventListener('click', downloadCsv);
      $('#prevPageBtn').addEventListener('click', () => { if (tablePage > 1) gotoPage(tablePage - 1); });
      $('#nextPageBtn').addEventListener('click', () => { if (tablePage < Math.ceil(tableRows.length / TABLE_PAGE_SIZE)) gotoPage(tablePage + 1); });
      $('#notificationBtn').addEventListener('click', openAlertsModal);
      $('#alertLink').addEventListener('click', openAlertsModal);
      $('#alertsModalClose').addEventListener('click', closeAlertsModal);
      $('#alertsModalBackdrop').addEventListener('click', (event) => { if (event.target === $('#alertsModalBackdrop')) closeAlertsModal(); });
      $('#plantSwitch').addEventListener('click', () => openSettingsModal());
      $('#plantSwitch').addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openSettingsModal(); } });
      $('#settingsModalClose').addEventListener('click', closeSettingsModal);
      $('#settingsModalBackdrop').addEventListener('click', (event) => { if (event.target === $('#settingsModalBackdrop')) closeSettingsModal(); });
      $('#factoryList').addEventListener('click', (event) => {
        const item = event.target.closest('.factory-item');
        if (item) selectFactory(item.dataset.code);
      });
      $('#supplierDetailModalClose').addEventListener('click', closeSupplierDetail);
      $('#supplierDetailModalBackdrop').addEventListener('click', (event) => { if (event.target === $('#supplierDetailModalBackdrop')) closeSupplierDetail(); });
      $$('#supplierRankBoard [data-supplier-mode]').forEach((button) => button.addEventListener('click', () => {
        supplierMode = button.dataset.supplierMode;
        $$('#supplierRankBoard [data-supplier-mode]').forEach((x) => x.classList.toggle('active', x === button));
        renderSupplierRankings();
      }));
      document.addEventListener('click', (event) => {
        const btn = event.target.closest('.detail-btn');
        if (btn) { event.stopPropagation(); openDetail(btn.closest('tr')); }
      });
      document.addEventListener('dblclick', (event) => {
        const row = event.target.closest('tr[data-status]');
        if (row) openDetail(row);
      });
      $('#modalClose').addEventListener('click', closeDetail);
      $('#modalCloseSecondary').addEventListener('click', closeDetail);
      $('#detailBackdrop').addEventListener('click', (event) => { if (event.target === $('#detailBackdrop')) closeDetail(); });
      $('#openQms').addEventListener('click', () => window.open('https://qms.sharetronic.com/qms-front/iqc/iqcDocuments', '_blank'));
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeDetail(); closeAlertsModal(); closeSupplierDetail(); } });
      enableSorting();
    }

    let supplierMode = 'bottom';
    let supplierMonthOffset = 0;
    let supplierRankings = [];
    let urgentOnly = false;
    let urgentFilter = null;
    let tablePage = 1;
    let tableRows = [];
    let tableSort = null;
    const TABLE_PAGE_SIZE = 20;

    applyLocale();
    loadSavedFactory();
    applyFactory();
    loadFactories();
    bindEvents();
    initSupplierBoard();
    applyFilters();
    loadDashboardData();
    setInterval(() => { if (!qmsLoading) loadDashboardData(true); }, 5 * 60 * 1000);
