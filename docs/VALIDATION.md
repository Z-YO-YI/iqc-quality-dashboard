# 本轮验证与待验收项

日期：2026-09-19。基线：远程 gh-pages `3ddea818f45ef2a5ff61315b6ffdd951efb088f8`。本地分支：`codex/iqc-stability`。

## 已通过

- `node --check assets/dashboard.js`
- `node scripts/check.mjs`
- `node --test tests/data.test.cjs`：14/14 通过。
- `node scripts/build.mjs`
- `git diff --check`
- Chrome 本地预览：总览成功读取真实 QMS 数据并呈现 LIVE 状态；供应商页、任务页导航及中英文切换可用。
- 浏览器联调发现并修复趋势加载状态变量遗漏；新增看板渲染调度回归测试。
- 缓存加载显示 CACHE，实时请求成功后恢复 LIVE；供应商无退货/特采时显示明确空态。
- 图表空态恢复通过独立实例生命周期测试；检验任务页面完成视觉检查。

环境 PATH 无 npm，因此使用以上等价 Node 命令直接执行，无需安装依赖。验证过程未导出或提交真实检验数据。

## 尚未完成

- QMS 旧凭证失效核实/轮换、Worker Secret 同步。Cloudflare 已确认三项 Secret 存在并加密，无法据此证明已换密。
- 合格率公式与 QMS 官方口径对账。现有不同图表口径亦有差异，本轮未改业务公式。
- 大工厂滚动季度/年度性能、全屏/移动端完整回归，以及各筛选组合一致性。
- 供应商界面及部分任务提示仍有硬编码中文，多语言尚不完整。
- Worker 实际代码与交接副本一致性、数据访问鉴权策略及服务端异常处理审查。
- GitHub CI 远程执行、PR、合并与 Pages 发布；当前阶段尚未执行。

本轮属于本地稳定性修复，不能作为全部正式验收通过的结论。线上分支、Worker 和部署配置未修改。
