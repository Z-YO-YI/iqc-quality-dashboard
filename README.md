# IQC 来料检验看板

正式仓库：[Z-YO-YI/iqc-quality-dashboard](https://github.com/Z-YO-YI/iqc-quality-dashboard)。静态 HTML/CSS/JavaScript + ECharts，通过既有 Cloudflare Worker 只读访问 QMS；前端不持有登录凭证。

## 开发与验证

需要 Node.js 22+，无开发依赖，无需安装 npm 包。

```sh
node scripts/serve.mjs
node scripts/check.mjs
node --test tests/*.test.cjs
node scripts/build.mjs
git diff --check
```

默认预览 http://127.0.0.1:8765，可用第二个命令行参数指定端口。普通预览连接真实只读接口。访问 /__test__/ 使用 6000 条虚构记录、1500 条待检任务与 300 家风险供应商，不访问 QMS，不使用真实浏览器缓存。测试入口与测试代码仅用于本机，生产构建不会复制它们。

## 代码结构

- index.html：页面结构与声明式翻译标记。
- assets/dashboard.js：请求、统计、状态和渲染。
- assets/ui-i18n.js：补充界面文案、中文/英文/泰文/中泰翻译；业务原始名称不改写。
- assets/wallboard.js：表格自动滚动与图表尺寸调度。
- assets/dashboard.css：布局与固定看板行高。
- tests/：请求、分页、缓存、语言、风险缓存及滚动回归。
- scripts/：静态检查、构建、只绑定本机的预览服务。

## 看板行为

供应商看板以视口高度分配两个图表行与预警区，下方三张卡片等高，风险列表在卡片内滚动，行数不会撑高页面。两个大屏均有语言按钮。

来料看板每页最多 20 条，自动滚动到尾部后停留再翻页，所有筛选结果都可轮播；也能手动翻页。鼠标停留暂停移动，后台页面停止动画。启用系统“减少动态效果”时关闭自动滚动，保留手动滚动与分页。动画使用 tbody 的 transform，布局尺寸仅在尺寸变化时测量。退出看板清理监听器和动画。

请求超时 30 秒，最多三次尝试；总览四个数据集全部成功才替换快照。分页以 total 为准，检测重复页与缺失页。缓存按工厂、版本和 30 分钟有效期隔离，保留待办与上月数据。

## 分支与发布

main 是正式源码，功能在独立分支经 PR、CI 验证后合并。Deploy Pages 工作流再次执行检查和测试，再构建 dist 并发布 GitHub Pages。Pages 应配置为 GitHub Actions（build_type=workflow）；自定义域名保持 iqc.namecheap.xin。gh-pages 保留为旧部署历史，不再作为开发或发布源。

构建仅复制 index.html、CNAME、echarts.min.js 与三个脚本及样式文件，不发布 tests、文档或本地设置。禁止通过 API 单独覆盖 index.html，否则会遗漏 assets。回退通过 revert PR，不 force push、不覆盖历史。

## 凭证处理

接管时 main 的旧 HTML 内嵌登录凭证，gh-pages 最新代码已经迁移到 Worker。此次合并用不含凭证的代理版替换旧 HTML，忽略 .env、.dev.vars 等敏感配置，不提交旧 HANDOVER 或历史工作日志。

所有者明确要求不改 QMS 密码；本次未修改 QMS 账户及 Worker Secret。删除当前源码不能撤销已泄露凭证，也不能清除 Git 历史；本次未重写历史。Cloudflare 三个 Secret 已确认加密保存，但其轮换状态仍未知。

## 已知边界

保留现有业务算法：主要 KPI 使用“合格 / 已判定批次”，部分排名图使用“(全部批次 - 退货 - 特采) / 全部批次”。统一前需要对照 QMS 官方业务口径。季/年目前为滚动 3/12 个月；大工厂性能及 Worker 访问控制属于后续独立事项。Pareto/DPPM 缺少上游字段时显示空状态。
