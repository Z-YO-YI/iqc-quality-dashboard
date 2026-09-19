# IQC 来料检验看板

静态 HTML/CSS/JavaScript + 本地 ECharts，读取 Cloudflare Worker 代理提供的 QMS 数据。正式仓库为 `Z-YO-YI/iqc-quality-dashboard`。

## 本地开发

需要 Node.js 22 或更新版本，无第三方开发依赖，无需安装 npm 包。

```sh
node scripts/serve.mjs
node --check assets/dashboard.js
node scripts/check.mjs
node --test tests/data.test.cjs
node scripts/build.mjs
git diff --check
```

预览地址为 `http://127.0.0.1:8765`。预览默认请求真实 QMS，只读查询；自动化测试使用虚构数据，不访问生产接口。构建产物在被 Git 忽略的 `dist/`，仅复制五个公开站点文件，不包含文档、测试或本地配置。

## 目录

- `index.html`：页面结构。
- `assets/dashboard.css`：样式。
- `assets/dashboard.js`：数据请求、状态、统计与 UI。
- `echarts.min.js`：现有图表依赖。
- `scripts/`：静态检查、构建、仅绑定本机的预览服务。
- `tests/`：请求、分页、缓存和异步竞态回归测试。
- `.github/workflows/ci.yml`：PR 和开发分支验证。

## 数据规则

请求超时为 30 秒，最多尝试三次；鉴权和业务错误直接失败。分页以服务端 total 为准，检测缺失页和重复页，超过 1000 页停止并报错。总览四个数据集全部成功才替换快照；任意失败保留之前数据并标识异常或缓存状态。

缓存带版本、工厂和时间，30 分钟后失效；保存待办和上月记录，避免从不完整记录重算环比。供应商趋势和月份请求带序列号，旧响应不能覆盖新选择。

**业务口径待确认**：交接文档声称批次合格率按全部批次计算且包含进行中，但远程线上代码实际使用“合格 / 已判定批次”。本次保留线上公式，不在缺少 QMS 对账证据时变更指标含义。季度/年度当前为滚动 3/12 个月；不是自然季度/年度。Pareto/DPPM 缺少上游字段，继续显示空状态。

## 发布与维护

目前 Pages 从 `gh-pages` 根目录部署。`main` 落后于 `gh-pages`。接管分支基于远程线上版本创建，应先 PR 合并到 main，再通过 main → gh-pages 的发布 PR 同步整个站点；不要仅更新 index.html（现在还依赖 assets）。必须选择 merge commit，保持两分支共享历史，不使用 force push，不重写历史。

发布前完成 CI、浏览器总览/任务/供应商/多语言验收、真实 QMS 数量对账，以及下述凭证处理。发布后验证域名、静态资源、Worker 健康与真实查询。故障回退使用 revert PR；保留 CNAME。

## 凭证事件与发布阻塞

2026-09-19 核查：远程 main 仍有硬编码凭证；gh-pages 当前版本已改用代理。Cloudflare 管理台确认三项 Secret 存在且加密，但不能读取值或证明 QMS 旧密码已失效。历史日志未找到完成换密的证据。

需要账户所有者在 QMS 更换已泄露密码，并在 Worker 更新对应 Secret；涉及共享 Basic Auth 的轮换应由 QMS 管理员协调。不要把新旧密码、令牌、真实检验数据写入 Git、截图或聊天。完成后由已登录的正常会话验证代理查询。历史凭证必须通过撤销/轮换失效，删除当前文件不能清除泄露风险。

账户所有者已明确要求保留现有 QMS 密码与 Worker Secret，仅清理当前源码中的凭证并继续提交、合并。未更改生产 Worker 或生产部署。当前不能宣称项目已正式发布或安全事件已解决。

此外，交接 Worker 采用公开入口、宽泛路径前缀及通配 CORS；CORS 不是鉴权。正式验收还需确认企业检验数据访问控制要求，并验证线上 Worker 是否存在同样配置。

## 恢复 GitHub 同步

账户所有者已授权清理当前源码并继续同步，执行：

```sh
git fetch origin
git switch codex/iqc-stability
git merge origin/gh-pages
node --check assets/dashboard.js
node scripts/check.mjs
node --test tests/data.test.cjs
node scripts/build.mjs
git diff --check
git add index.html assets scripts tests package.json .gitignore .gitattributes README.md CHANGELOG.md .github docs
git commit -m "fix: harden IQC data loading and add maintenance checks"
git push -u origin codex/iqc-stability
gh pr create --base main --head codex/iqc-stability --title "fix: stabilize IQC dashboard data loading" --body-file docs/PR.md
```

检查 CI 和正式验收事项后才合并 PR。后续 main → gh-pages 发布 PR 必须包含页面、CSS、JS、图表文件及 CNAME，并验证 Pages 构建成功。
