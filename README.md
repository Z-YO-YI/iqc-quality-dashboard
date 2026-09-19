# IQC 来料检验看板

面向工厂质量团队的来料检验与供应商质量可视化平台。连接 QMS 检验数据，集中展示检验任务、质量指标与供应商风险，支持日常业务查看和车间大屏展示。

[![CI](https://github.com/Z-YO-YI/iqc-quality-dashboard/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Z-YO-YI/iqc-quality-dashboard/actions/workflows/ci.yml)
[![Deploy Pages](https://github.com/Z-YO-YI/iqc-quality-dashboard/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/Z-YO-YI/iqc-quality-dashboard/actions/workflows/pages.yml)

[在线访问](https://iqc.namecheap.xin/) · [快速开始](#快速开始) · [维护指南](docs/MAINTENANCE.md) · [更新日志](CHANGELOG.md)

## 项目概览

项目采用轻量级静态前端架构，通过 Cloudflare Worker 代理读取 QMS 数据，使用 ECharts 展示质量趋势与供应商分析，并由 GitHub Actions 自动验证、构建和发布。

| 模块 | 功能 |
| --- | --- |
| 质量总览 | 今日送检、待检、超时、合格率与加急指标，检验流转、质量趋势及异常预警 |
| 检验任务 | 按日期、状态、加急和关键词筛选，支持排序、分页、详情查看及 CSV 导出 |
| 供应商质量 | 供应商指标、月度趋势、风险矩阵、质量排名、风险列表与供应商详情 |
| 来料检验大屏 | 全部筛选任务连续循环滚动，无分页切换；放大结果环图、批次数和占比，便于远距离查看 |
| 供应商质量大屏 | 固定高度的图表与风险区域，列表在区域内部滚动，适用于持续展示 |
| 多工厂与多语言 | 支持切换工厂；通过右下角设置选择中文、英文、泰文和中泰双语 |
| 外观主题 | 右下角设置集中管理经典、液态玻璃、普通透明三种主题；背景透明度连续可调，自动保存 |

数据每 5 分钟自动同步，也可手动刷新。界面保留 QMS 返回的供应商名称、料号等业务原始信息，不自动翻译业务数据。

点击右下角 **设置** 可展开显示设置面板，普通页面及两种大屏均可使用。液态玻璃提供柔和高光与背景模糊，普通透明使用无模糊的平面透明背景；两种透明主题支持拖动滑杆实时调整背景透明度，范围为 0%（不透明）至 100%（完全透明），精度为 0.1%。文字和图表不随背景变淡，设置面板及数据弹窗保留清晰底色。经典主题不使用透明度调节。点击面板外部、关闭按钮或按 Escape 可收起设置。

## 技术架构

| 层级 | 技术 | 职责 |
| --- | --- | --- |
| 页面与交互 | HTML、CSS、原生 JavaScript | 页面布局、筛选、状态管理与多语言 |
| 数据可视化 | ECharts | 趋势、排名及风险图表 |
| 接口代理 | Cloudflare Worker | 服务端认证与 QMS 请求转发 |
| 数据源 | QMS | 提供工厂字典与检验记录 |
| 检查与测试 | Node.js 内置工具 | 语法检查、资源校验与回归测试 |
| 持续集成与部署 | GitHub Actions、GitHub Pages | 验证、构建及静态站点发布 |

浏览器只向代理发送查询条件，QMS 登录凭证保存在 Worker Secrets 中。本仓库包含前端、开发工具与发布配置；Worker 独立部署，其服务代码不在本仓库内。

## 快速开始

### 环境要求

- Git
- Node.js 22 或更新版本
- 支持现代 JavaScript、Canvas 与 Popover API 的新版浏览器

项目无额外开发依赖，无需执行 `npm install`。

### 获取代码并启动

```sh
git clone https://github.com/Z-YO-YI/iqc-quality-dashboard.git
cd iqc-quality-dashboard
node scripts/serve.mjs
```

启动后访问 [本地看板](http://127.0.0.1:8765/)。默认页面使用项目配置的真实 QMS 代理，需要代理和上游服务可用。

如需使用其他端口：

```sh
node scripts/serve.mjs 8766
```

### 使用测试数据

访问 [本地测试页面](http://127.0.0.1:8765/__test__/)，可在不连接 QMS 的情况下查看页面并验证大数据量展示。

测试场景包含 6,000 条虚构记录、1,500 条待检任务和 300 家风险供应商，使用独立的内存缓存。测试入口与数据不会进入生产构建。

## 常用命令

在项目根目录执行：

| 命令 | 说明 |
| --- | --- |
| `node scripts/serve.mjs` | 启动本地预览服务 |
| `node scripts/check.mjs` | 检查脚本语法、静态资源引用及前端凭证字面量 |
| `node --test tests/*.test.cjs` | 运行自动化回归测试 |
| `node scripts/build.mjs` | 生成静态站点构建产物 |
| `git diff --check` | 检查差异中的空白格式问题 |

构建输出位于 `dist/`，包含页面、样式、业务脚本、ECharts 及域名配置。测试、文档和本地开发配置不包含在构建产物中。

## 项目结构

```text
iqc-quality-dashboard/
├── .github/workflows/
│   ├── ci.yml                 # 持续集成检查
│   └── pages.yml              # GitHub Pages 构建与发布
├── assets/
│   ├── dashboard.css          # 页面与大屏样式
│   ├── dashboard.js           # 数据请求、业务统计与页面渲染
│   ├── ui-i18n.js             # 补充界面翻译与日期格式化
│   ├── theme.js               # 显示设置、透明度、记忆与首屏恢复
│   ├── theme.css              # 设置面板、透明主题与降级样式
│   └── wallboard.js           # 自动滚动与图表尺寸调度
├── docs/                      # 维护及验证文档
├── scripts/                   # 预览、检查与构建脚本
├── tests/                     # 回归测试与本地测试数据
├── index.html                 # 页面入口
├── echarts.min.js             # 图表库
├── CNAME                      # GitHub Pages 自定义域名
├── package.json               # 项目信息与命令入口
└── CHANGELOG.md               # 更新日志
```

## 配置与部署

### 数据接入

默认数据源配置位于 `assets/dashboard.js` 的 `QMS_CONFIG` 中，包括代理地址、QMS 接口地址和默认工厂。部署到其他环境时，应同步核对前端配置与 Worker 的上游设置。

账号、密码和认证密钥应仅在服务端配置，不应写入前端文件、提交记录或构建产物。当前前端无需填写 QMS 登录凭证。

### 自动发布

`main` 是正式源码分支。变更通过 Pull Request 与 CI 验证后合并，随后由 **Deploy Pages** 工作流执行检查、测试、构建和部署。

仓库的 GitHub Pages 发布方式应设为 **GitHub Actions**，发布环境为 `github-pages`。当前生产域名为 [iqc.namecheap.xin](https://iqc.namecheap.xin/)。其他环境需使用对应的 `CNAME` 与域名配置。

生产发布应使用完整构建产物，确保 HTML、CSS 和 JavaScript 来自同一版本。具体发布检查与回退方式见[维护指南](docs/MAINTENANCE.md)。

## 开发协作

1. 同步远程 `main`，创建独立开发分支。
2. 完成修改，并运行检查、测试和构建命令。
3. 涉及界面时，使用本地测试数据验证语言切换、筛选和大屏展示。
4. 更新相关文档，以 Conventional Commits 格式提交变更。
5. 推送分支并创建 Pull Request，说明变更范围与验证结果。

问题反馈可提交至 [Issues](https://github.com/Z-YO-YI/iqc-quality-dashboard/issues)。请说明页面、语言、工厂范围及复现步骤；涉及业务数据的截图应先脱敏。

## 数据口径与使用说明

- 指标与趋势依赖 QMS 返回的数据及字段，缺少上游字段时显示空状态，不生成替代业务数据。
- 部分 KPI 与排名图采用不同合格率统计口径，比较前应确认分母与统计范围。
- 季度和年度筛选当前分别表示滚动 3 个月与 12 个月。
- 大屏自动滚动支持鼠标悬停暂停；页面切到后台时暂停动画，系统启用“减少动态效果”时保留手动操作。

详细的统计口径、缓存机制和运维边界见[维护指南](docs/MAINTENANCE.md)；验证记录见[验证文档](docs/VALIDATION.md)。
