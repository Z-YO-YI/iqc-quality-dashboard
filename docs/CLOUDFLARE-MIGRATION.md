# Cloudflare Pages 与 Access 迁移记录

## 当前状态（2026-09-20）

本文件记录迁移准备，不代表迁移或访问控制已经完成。正式网站仍由 GitHub Pages 发布，域名为 `iqc.namecheap.xin`；现有 QMS Worker 和生产 DNS 未变更。

目标是将静态站点迁移到 Cloudflare Pages，使用 Cloudflare Access 限制访问，并在验证通过后将 GitHub 源码仓库改为私有。所有者指定允许的邮箱域为 `sharetronic.com`，需要完成邮箱身份验证，不能仅在前端判断邮箱后缀。

## 开通前置条件

- 当前 Cloudflare 账户尚未开通 Zero Trust。已选择免费方案，但尚未激活。
- 当前账户的开通页显示每月基础费用为 0 美元、包含最多 50 位用户，同时要求支付方式、服务条款及超出免费额度后的扣费授权。账户所有者需自行核对并完成；Pages 静态托管免费不代表 Access 开通不需要支付方式。
- Cloudflare 官方 GitHub 应用尚未安装。授权范围已准备为仅 `Z-YO-YI/iqc-quality-dashboard`；页面列出元数据读取权限，以及管理、检查、代码、部署和 Pull Request 的读写权限，需要所有者确认后才可提交。
- 不应把银行卡信息、访问令牌、邮箱验证码或 QMS 凭证放入聊天、仓库或构建日志。

## 已核查的现有连接

- 域名和 `iqc-proxy` Worker 均在当前已登录的 Cloudflare 账户中。
- 浏览器当前直接向 Worker 的公开地址发送 `/api/qms` 请求。
- Worker 的 Access 页面要求先建立 Zero Trust 组织，目前未启用 Access。Worker 内部是否另有访问校验尚未完成审计。
- 前端通过只读代理访问 QMS，凭证仍由现有 Worker Secrets 保存；迁移不能把这些凭证复制到前端。

## 实施顺序

1. 完成 Zero Trust 开通及限定仓库的 GitHub 应用授权。
2. 创建 Pages 项目，保留现有静态构建白名单，生产分支为 `main`、输出目录为 `dist`。扩展构建前先验证与现有测试和 CI 兼容。
3. 审计并备份现有 Worker 配置与源代码，保留 Secret 绑定，不导出秘密值。
4. 为正式域名和 Pages 默认/预览入口配置 Access。Allow 规则仅允许经验证的 `sharetronic.com` 邮箱，其他访问默认拒绝；确认会话时长适合车间大屏。
5. 让网页和 QMS 请求共享已认证的访问链路，优先考虑同源 `/api/qms` 与服务绑定。服务端验证 Access 身份，确认旧 Worker 公共域名和版本预览地址不能绕过保护；不能把 CORS 或前端按钮隐藏当作鉴权。
6. 验证未登录、非公司邮箱、公司邮箱、会话过期、直接接口请求及默认/预览地址。成功登录后验证数据同步、筛选、两种大屏和语言设置。
7. 新环境通过验证后，切换 `iqc.namecheap.xin`，验证 HTTPS 与真实 QMS 数据；再停用旧 GitHub Pages 发布并将仓库设为私有。
8. 更新 README、维护指南、CI 与发布说明，记录最终部署和访问策略；保留配置备份。回退时不应默默恢复公开接口或绕过登录保护。

## 验收条件

- `sharetronic.com` 邮箱经验证后可正常访问，未授权访问被拒绝。
- 静态页面和接口的所有可用入口具有一致保护，不存在公开代理绕过路径。
- 登录成功、会话过期和重新登录时界面行为清晰，不将认证失败误报为正常同步。
- 原始 UI、统计口径、全任务循环、设置和自动刷新回归通过。
- CI、构建和部署通过；仓库私有后仍能自动发布。
- 上述条件完成前，不把迁移记录标记为完成，也不提前切换生产域名。

## 官方参考

- [Pages 免费额度](https://developers.cloudflare.com/pages/platform/limits/)
- [Pages Access 插件与令牌验证](https://developers.cloudflare.com/pages/functions/plugins/cloudflare-access/)
- [Access 自托管应用](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
- [Pages 预览部署保护](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
