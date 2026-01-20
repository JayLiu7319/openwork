# OpenWork i18n 翻译清单

## 📋 翻译进度总览

| 模块 | 文本数量 | 优先级 | 状态 | 负责人 |
|------|---------|--------|------|--------|
| OnboardingView | ~40 | 🔴 高 | ✅ 已完成 | - |
| DashboardView | ~80 | 🔴 高 | ✅ 已完成 | - |
| SessionView | ~60 | 🔴 高 | ✅ 已完成 | - |
| SettingsView | ~100 | 🔴 高 | ✅ 已完成 | - |
| TemplatesView | ~30 | 🟡 中 | ✅ 已完成 | - |
| SkillsView | ~40 | 🟡 中 | ✅ 已完成 | - |
| PluginsView | ~35 | 🟡 中 | ✅ 已完成 | - |
| McpView | ~45 | 🟡 中 | ✅ 已完成 | - |
| Components | ~50 | 🟡 中 | 🟡 进行中 | - |
| Utils & Helpers | ~20 | 🟢 低 | ⚪ 待开始 | - |

**总计**: 约 500 个翻译项

---

## 🎯 OnboardingView 翻译清单 ✅ 已完成

**文件:** `src/views/OnboardingView.tsx`

### 模式选择页面

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 主标题 | OpenWork | OpenWork | onboarding.title | ✅ |
| 副标题 | How would you like to run OpenWork today? | 您希望如何使用 OpenWork？ | onboarding.mode.subtitle | ✅ |
| Host模式标题 | Run on this computer | 在本机运行 | onboarding.mode.host.title | ✅ |
| Host模式描述 | OpenWork runs OpenCode locally and keeps your work private. | OpenWork 在本地运行 OpenCode，保护您的工作隐私。 | onboarding.mode.host.description | ✅ |
| Client模式链接 | Connect as a Client (Remote Pairing) | 连接为客户端（远程协作） | onboarding.mode.client.link | ✅ |
| 记住选择 | Remember my choice for next time | 下次自动使用此选项 | onboarding.mode.rememberChoice | ✅ |
| 已运行提示标题 | Engine already running | 引擎正在运行 | onboarding.mode.engineRunning.title | ✅ |
| 已运行提示描述 | Attach to the existing session on this device. | 连接到此设备上的现有会话。 | onboarding.mode.engineRunning.description | ✅ |
| 附加按钮 | Attach | 附加 | onboarding.mode.engineRunning.button | ✅ |

### Host模式 - 工作空间创建

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 首次标题 | Create your first workspace | 创建您的第一个工作空间 | onboarding.workspace.firstTitle | ✅ |
| 标题 | Create a workspace | 创建工作空间 | onboarding.workspace.title | ✅ |
| 描述 | Choose a folder and preset to set up your workspace. | 选择文件夹和预设来设置您的工作空间。 | onboarding.workspace.description | ✅ |
| 开始按钮 | Start OpenWork | 启动 OpenWork | onboarding.workspace.startButton | ✅ |
| 返回按钮 | Back | 返回 | common.buttons.back | ✅ |

### Client模式 - 连接配置

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 标题 | Connect to Host | 连接到主机 | onboarding.client.title | ✅ |
| 描述 | Pair with an existing OpenCode server (LAN or tunnel). | 连接到现有的 OpenCode 服务器（局域网或隧道）。 | onboarding.client.description | ✅ |
| URL标签 | Server URL | 服务器 URL | onboarding.client.urlLabel | ✅ |
| URL占位符 | http://127.0.0.1:4096 | http://127.0.0.1:4096 | onboarding.client.urlPlaceholder | ✅ |
| 目录标签 | Directory (optional) | 目录（可选） | onboarding.client.directoryLabel | ✅ |
| 目录占位符 | /path/to/project | /path/to/project | onboarding.client.directoryPlaceholder | ✅ |
| 目录提示 | Use if your host runs multiple workspaces. | 如果主机运行多个工作空间则需填写。 | onboarding.client.directoryHint | ✅ |
| 连接按钮 | Connect | 连接 | common.buttons.connect | ✅ |

### 连接中状态

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| Host加载 | Starting OpenWork... | 正在启动 OpenWork... | onboarding.connecting.hostTitle | ✅ |
| Host描述 | Getting everything ready | 正在准备就绪 | onboarding.connecting.hostDescription | ✅ |
| Client加载 | Searching for Host... | 正在搜索主机... | onboarding.connecting.clientTitle | ✅ |
| Client描述 | Verifying secure handshake | 正在验证安全握手 | onboarding.connecting.clientDescription | ✅ |

### 引擎状态（新增）

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 引擎标题 | OpenCode engine | OpenCode 引擎 | onboarding.engine.title | ✅ |
| 检查中 | Checking OpenCode CLI... | 正在检查 OpenCode CLI... | onboarding.engine.checking | ✅ |
| 未找到 | OpenCode CLI not found. | 未找到 OpenCode CLI。 | onboarding.engine.notFound | ✅ |
| 需要更新 | OpenCode CLI needs an update for serve. | OpenCode CLI 需要更新以支持 serve 功能。 | onboarding.engine.needsUpdate | ✅ |
| 就绪 | OpenCode CLI ready. | OpenCode CLI 就绪。 | onboarding.engine.ready | ✅ |
| 准备启动 | OpenCode is ready to start in host mode. | OpenCode 已准备好以本地模式启动。 | onboarding.engine.readyToStart | ✅ |
| Windows安装 | Install OpenCode for Windows... | 请安装 Windows 版 OpenCode... | onboarding.engine.installWindows | ✅ |
| 安装提示 | Install OpenCode to enable host mode... | 安装 OpenCode 以启用本地模式... | onboarding.engine.installHint | ✅ |
| 安装按钮 | Install OpenCode | 安装 OpenCode | onboarding.engine.installButton | ✅ |
| 重新检查 | Re-check | 重新检查 | onboarding.engine.recheck | ✅ |
| 解析路径 | Resolved path | 解析路径 | onboarding.engine.resolvedPath | ✅ |
| 版本 | Version | 版本 | onboarding.engine.version | ✅ |
| 搜索备注 | Search notes | 搜索备注 | onboarding.engine.searchNotes | ✅ |
| serve帮助 | serve --help output | serve --help 输出 | onboarding.engine.serveHelp | ✅ |

---

## 🎛️ DashboardView 翻译清单 ✅ 已完成

**文件:** `src/views/DashboardView.tsx`

### 导航标签

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 导航-仪表盘 | Dashboard | 仪表盘 | dashboard.nav.dashboard | ✅ |
| 导航-会话 | Sessions | 会话 | dashboard.nav.sessions | ✅ |
| 导航-模板 | Templates | 模板 | dashboard.nav.templates | ✅ |
| 导航-技能 | Skills | 技能 | dashboard.nav.skills | ✅ |
| 导航-插件 | Plugins | 插件 | dashboard.nav.plugins | ✅ |
| 导航-MCP | MCPs | MCP 服务器 | dashboard.nav.mcps | ✅ |
| 导航-设置 | Settings | 设置 | dashboard.nav.settings | ✅ |
| Alpha标签 | Alpha | 测试版 | common.labels.alpha | ✅ |

### 连接状态

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 连接标题 | Connection | 连接 | dashboard.connection.title | ✅ |
| 已连接 | Connected | 已连接 | common.status.connected | ✅ |
| 未连接 | Not connected | 未连接 | common.status.notConnected | ✅ |
| 本地引擎 | Local Engine | 本地引擎 | dashboard.connection.localEngine | ✅ |
| 客户端模式 | Client Mode | 客户端模式 | dashboard.connection.clientMode | ✅ |
| 停止并断开 | Stop & Disconnect | 停止并断开 | dashboard.connection.stopAndDisconnect | ✅ |
| 断开连接 | Disconnect | 断开连接 | common.buttons.disconnect | ✅ |

### 首页内容

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 欢迎标题 | What should we do today? | 今天要做什么？ | dashboard.home.welcomeTitle | ✅ |
| 欢迎描述 | Describe an outcome. OpenWork will run it and keep an audit trail. | 描述您想要的结果，OpenWork 将执行并保留审计记录。 | dashboard.home.welcomeDescription | ✅ |
| 新任务按钮 | New Task | 新建任务 | dashboard.home.newTaskButton | ✅ |
| 快速模板标题 | Quick Start Templates | 快速启动模板 | dashboard.home.quickTemplates | ✅ |
| 查看全部 | View all | 查看全部 | common.actions.viewAll | ✅ |
| 无模板提示 | No templates yet. Starter templates will appear here. | 暂无模板。入门模板将显示在这里。 | dashboard.home.noTemplates | ✅ |
| 运行工作流 | Run a saved workflow | 运行已保存的工作流 | dashboard.home.runWorkflow | ✅ |

### 会话列表

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 最近会话 | Recent Sessions | 最近会话 | dashboard.sessions.recent | ✅ |
| 无会话 | No sessions yet. | 暂无会话。 | dashboard.sessions.empty | ✅ |
| 此工作空间 | this workspace | 此工作空间 | dashboard.sessions.thisWorkspace | ✅ |
| 状态-空闲 | idle | 空闲 | common.status.idle | ✅ |
| 状态-运行中 | running | 运行中 | common.status.running | ✅ |
| 状态-完成 | completed | 已完成 | common.status.completed | ✅ |

---

## 💬 SessionView 翻译清单 ✅ 已完成

**文件:** `src/views/SessionView.tsx`

### 核心界面

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 未选择 | No session selected | 未选择会话 | session.noSelected | ✅ |
| 返回按钮 | Back to dashboard | 返回仪表盘 | session.backToDashboard | ✅ |
| 新建任务 | New task | 新建任务 | session.newTask | ✅ |
| 最近列表 | Recents | 最近 | session.recents | ✅ |
| 本地提示 | These tasks run locally... | 这些任务在本地运行... | session.localOnly | ✅ |

### 空状态

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 准备就好 | Ready to work | 准备工作 | session.ready | ✅ |
| 描述任务 | Describe a task... | 描述一个任务... | session.describeTask | ✅ |

### 消息与步骤

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 隐藏步骤 | Hide steps | 隐藏步骤 | session.steps.hide | ✅ |
| 查看步骤 | View steps | 查看步骤 | session.steps.view | ✅ |
| 步骤展开 | Steps will show as the task unfolds. | 步骤将随着任务的展开而显示。 | session.steps.unfold | ✅ |

### 产物与侧边栏

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 产物标签 | Artifacts | 产物 | session.artifacts.label | ✅ |
| 打开 | Open | 打开 | session.artifacts.open | ✅ |
| 显示 | Reveal | 显示 | session.artifacts.reveal | ✅ |
| 已打开提示 | Opened in default app. | 已在默认应用中打开。 | session.artifacts.opened | ✅ |
| 缺少路径 | Artifact path missing. | 缺少产物路径。 | session.artifacts.missingPath | ✅ |
| 仅桌面 | Open is only available in the desktop app. | “打开”仅在桌面应用中可用。 | session.artifacts.desktopOnly | ✅ |
| 文档类型 | Document | 文档 | session.artifacts.document | ✅ |
| 空产物 | No artifacts yet. | 暂无产物。 | session.artifacts.empty | ✅ |
| 侧边栏-进度 | Progress | 进度 | session.sidebar.progress | ✅ |
| 侧边栏-上下文 | Context | 上下文 | session.sidebar.context | ✅ |

### 上下文信息

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 活动插件 | Active plugins | 活动插件 | session.context.activePlugins | ✅ |
| 无插件 | No plugins loaded. | 未加载插件。 | session.context.noPlugins | ✅ |
| 选定文件夹 | Selected folders | 选定文件夹 | session.context.selectedFolders | ✅ |
| 工作文件 | Working files | 工作文件 | session.context.workingFiles | ✅ |
| 暂无 | None yet. | 暂无。 | session.context.noneYet | ✅ |

### 输入区域

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 占位符 | Ask OpenWork... | 询问 OpenWork... | session.input.placeholder | ✅ |
| 运行 | Run | 运行 | session.input.run | ✅ |
| Notion提示 | Try it now... | 立即尝试：在 Notion 中设置我的 CRM | session.input.tryNotion | ✅ |
| 插入提示 | Insert prompt | 插入提示词 | session.input.insertPrompt | ✅ |

### 权限请求

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 需要权限 | Permission Required | 需要权限 | session.permissions.required | ✅ |
| 请求中 | OpenCode is requesting... | OpenCode 请求权限以继续。 | session.permissions.requesting | ✅ |
| 权限 | Permission | 权限 | session.permissions.permission | ✅ |
| 范围 | Scope | 范围 | session.permissions.scope | ✅ |
| 详情 | Details | 详情 | session.permissions.details | ✅ |
| 拒绝 | Deny | 拒绝 | session.permissions.deny | ✅ |
| 仅一次 | Once | 仅一次 | session.permissions.once | ✅ |
| 允许会话 | Allow for session | 允许本次会话 | session.permissions.allowSession | ✅ |

---

## ⚙️ SettingsView 翻译清单 ✅ 已完成

**文件:** `src/views/SettingsView.tsx`

### 连接设置

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 连接 | Connection | 连接 | settings.connection.title | ✅ |
| 开发者模式 | Enable Developer Mode / Disable Developer Mode | 启用开发者模式 / 禁用开发者模式 | settings.connection.developerMode | ✅ |
| 停止引擎 | Stop engine | 停止引擎 | settings.connection.stopEngine | ✅ |
| 引擎源 | Engine source | 引擎源 | settings.connection.engineSource | ✅ |
| PATH说明 | PATH uses your installed OpenCode (default). Sidecar will use a bundled binary when available. | PATH 使用已安装的 OpenCode（默认）。Sidecar 将使用捆绑的二进制文件（如可用）。 | settings.connection.engineSourceDescription | ✅ |
| Windows提示 | Sidecar is currently unavailable on Windows. | Sidecar 目前在 Windows 上不可用。 | settings.connection.sidecarWindows | ✅ |

### 模型设置

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 模型 | Model | 模型 | settings.model.title | ✅ |
| 描述 | Defaults + thinking controls for runs. | 运行的默认设置和思考控制。 | settings.model.description | ✅ |
| 更改 | Change | 更改 | common.buttons.change | ✅ |
| 思考 | Thinking | 思考 | settings.model.thinking | ✅ |
| 思考描述 | Show thinking parts (Developer mode only). | 显示思考部分（仅开发者模式）。 | settings.model.thinkingDescription | ✅ |
| 开/关 | On / Off | 开 / 关 | common.toggles.onOff | ✅ |
| 模型变体 | Model variant | 模型变体 | settings.model.variant | ✅ |
| 编辑 | Edit | 编辑 | common.buttons.edit | ✅ |

### 演示模式

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 演示模式 | Demo mode | 演示模式 | settings.demo.title | ✅ |
| 描述 | Lightweight scripted states for recording and review. | 用于录制和审查的轻量级脚本状态。 | settings.demo.description | ✅ |
| 启用 | Enable demo mode | 启用演示模式 | settings.demo.enable | ✅ |
| 替换数据 | Replaces live data with demo sequences. | 使用演示序列替换实时数据。 | settings.demo.replacesData | ✅ |
| 序列说明 | Demo sequences swap in scripted sessions, artifacts, and workspace context. | 演示序列交换脚本化的会话、构件和工作空间上下文。 | settings.demo.sequenceDescription | ✅ |

### 更新设置

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 更新 | Updates | 更新 | settings.updates.title | ✅ |
| 描述 | Keep OpenWork up to date. | 保持 OpenWork 最新。 | settings.updates.description | ✅ |
| 仅桌面版 | Updates are only available in the desktop app. | 更新仅在桌面应用中可用。 | settings.updates.desktopOnly | ✅ |
| 自动检查 | Automatic checks | 自动检查 | settings.updates.autoCheck | ✅ |
| 频率 | Once per day (quiet) | 每天一次（静默） | settings.updates.frequency | ✅ |
| 检查中 | Checking... | 检查中... | settings.updates.checking | ✅ |
| 可用更新 | Update available: v{version} | 可用更新：v{version} | settings.updates.available | ✅ |
| 下载中 | Downloading... | 下载中... | settings.updates.downloading | ✅ |
| 准备安装 | Ready to install: v{version} | 准备安装：v{version} | settings.updates.ready | ✅ |
| 检查失败 | Update check failed | 更新检查失败 | settings.updates.error | ✅ |
| 已是最新 | Up to date | 已是最新 | settings.updates.upToDate | ✅ |
| 上次检查 | Last checked {time} | 上次检查 {time} | settings.updates.lastChecked | ✅ |
| 发布于 | Published {date} | 发布于 {date} | settings.updates.published | ✅ |
| 检查按钮 | Check | 检查 | settings.updates.checkButton | ✅ |
| 下载按钮 | Download | 下载 | settings.updates.downloadButton | ✅ |
| 安装按钮 | Install & Restart | 安装并重启 | settings.updates.installButton | ✅ |
| 停止运行提示 | Stop active runs to update | 停止活动任务以更新 | settings.updates.stopRunsHint | ✅ |

### 启动设置

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 启动 | Startup | 启动 | settings.startup.title | ✅ |
| 本地模式 | host mode | 本地模式 | settings.startup.hostMode | ✅ |
| 客户端模式 | client mode | 客户端模式 | settings.startup.clientMode | ✅ |
| 切换 | Switch | 切换 | settings.startup.switch | ✅ |
| 重置默认 | Reset default startup mode | 重置默认启动模式 | settings.startup.reset | ✅ |
| 重置说明 | This clears your saved preference and shows mode selection on next launch. | 这将清除您保存的偏好，下次启动时显示模式选择。 | settings.startup.resetDescription | ✅ |

### 高级设置

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 高级 | Advanced | 高级 | settings.advanced.title | ✅ |
| 重置说明 | Reset OpenWork local state to retest onboarding. | 重置 OpenWork 本地状态以重新测试引导流程。 | settings.advanced.description | ✅ |
| 重置引导 | Reset onboarding | 重置引导 | settings.advanced.resetOnboarding | ✅ |
| 重置引导说明 | Clears OpenWork preferences and restarts the app. | 清除 OpenWork 偏好设置并重启应用。 | settings.advanced.resetOnboardingDescription | ✅ |
| 重置应用数据 | Reset app data | 重置应用数据 | settings.advanced.resetAppData | ✅ |
| 重置数据说明 | More aggressive. Clears OpenWork cache + app data. | 更彻底。清除 OpenWork 缓存和应用数据。 | settings.advanced.resetAppDataDescription | ✅ |
| 重置按钮 | Reset | 重置 | settings.advanced.resetButton | ✅ |
| 需输入提示 | Requires typing RESET and will restart the app. | 需要输入 RESET 并将重启应用。 | settings.advanced.resetConfirmHint | ✅ |
| 停止运行提示 | Stop active runs to reset | 停止活动任务以重置 | settings.advanced.stopRunsHint | ✅ |

### 开发者板块

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 开发者 | Developer | 开发者 | settings.developer.title | ✅ |
| OpenCode缓存 | OpenCode cache | OpenCode 缓存 | settings.developer.cache | ✅ |
| 缓存说明 | Repairs cached data used to start the engine. Safe to run. | 修复用于启动引擎的缓存数据。安全运行。 | settings.developer.cacheDescription | ✅ |
| 修复缓存 | Repair cache / Repairing cache | 修复缓存 / 正在修复缓存 | settings.developer.repairCache | ✅ |
| 需要桌面版 | Cache repair requires the desktop app | 缓存修复需要桌面应用 | settings.developer.requiresDesktop | ✅ |
| 待处理权限 | Pending permissions | 待处理权限 | settings.developer.pendingPermissions | ✅ |
| 最近事件 | Recent events | 最近事件 | settings.developer.recentEvents | ✅ |

---

## 📝 Templates & Skills & Plugins 翻译清单

### TemplatesView ✅ 已完成

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 工作空间模板 | Workspace Templates | 工作空间模板 | templates.scope.workspace | ✅ |
| 全局模板 | Global Templates | 全局模板 | templates.scope.global | ✅ |
| 新建 | New | 新建 | common.buttons.new | ✅ |
| 运行 | Run | 运行 | common.buttons.run | ✅ |
| 删除 | Delete | 删除 | common.buttons.delete | ✅ |
| 标题 | Title | 标题 | common.labels.title | ✅ |
| 描述 | Description | 描述 | common.labels.description | ✅ |
| 提示词 | Prompt | 提示词 | common.labels.prompt | ✅ |
| 作用域 | Scope | 作用域 | common.labels.scope | ✅ |


### SkillsView ✅ 已完成

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 标题 | Skills | 技能 | skills.title | ✅ |
| 安装 | Install | 安装 | skills.install.button | ✅ |
| 导入 | Import | 导入 | skills.import.button | ✅ |
| 刷新 | Refresh | 刷新 | common.buttons.refresh | ✅ |
| 精选包 | Curated Packages | 精选包 | skills.curated.title | ✅ |

### PluginsView ✅ 已完成

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 标题 | OpenCode Plugins | OpenCode 插件 | plugins.title | ✅ |
| 作用域 | Scope | 作用域 | plugins.scope | ✅ |
| 推荐 | Suggested | 推荐 | plugins.suggested.title | ✅ |
| 配置 | Config | 配置 | plugins.config.label | ✅ |
| 列表 | Plugin List | 插件列表 | plugins.list | ✅ |

---

## 🔌 McpView 翻译清单 ✅ 已完成

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 标题 | MCP Servers | MCP 服务器 | settings.mcp.title | ✅ |
| 连接 | Connect | 连接 | settings.mcp.quickConnect.connect | ✅ |
| 高级 | Advanced | 高级 | settings.mcp.toggle.advanced.title | ✅ |
| 详细 | Details | 详细 | settings.mcp.details.title | ✅ |
| 服务器名称 | Server Name | 服务器名称 | mcp.serverName | ⚪ |
| 服务器URL | Server URL | 服务器 URL | mcp.serverUrl | ⚪ |
| OAuth认证 | OAuth Authentication | OAuth 认证 | mcp.oauth | ⚪ |
| 启用 | Enabled | 启用 | common.status.enabled | ⚪ |
| 禁用 | Disabled | 禁用 | common.status.disabled | ⚪ |
| 测试连接 | Test Connection | 测试连接 | mcp.testConnection | ⚪ |
| 连接中 | Connecting... | 连接中... | mcp.connecting | ⚪ |
| 需要重载 | Reload required | 需要重载 | mcp.reloadRequired | ⚪ |
| 重载引擎 | Reload Engine | 重载引擎 | mcp.reloadEngine | ⚪ |

---

## 🧩 通用组件翻译清单

### Button 组件

按钮文本通过props传入，不需要在组件内国际化

### WorkspacePicker ✅ 已完成

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 占位符 | Find workspace... | 查找工作空间... | common.placeholders.findWorkspace | ✅ |
| 标签 | Workspaces | 工作空间 | common.labels.workspaces | ✅ |
| 按钮 | New Workspace... | 新建工作空间... | common.buttons.newWorkspace | ✅ |

### CreateWorkspaceModal ✅ 已完成

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 标题 | Create Workspace | 创建工作空间 | workspace.create.title | ✅ |
| 步骤1 | Select Folder | 选择文件夹 | workspace.create.steps.selectFolder | ✅ |
| 步骤2 | Choose Preset | 选择预设 | workspace.create.steps.choosePreset | ✅ |
| 预设1 | Starter workspace | 入门工作空间 | workspace.create.presets.starter.name | ✅ |
| 预设2 | Empty workspace | 空工作空间 | workspace.create.presets.minimal.name | ✅ |

### Modal 组件

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 确认 | Confirm | 确认 | common.buttons.confirm | ⚪ |
| 取消 | Cancel | 取消 | common.buttons.cancel | ⚪ |
| 关闭 | Close | 关闭 | common.buttons.close | ⚪ |
| 保存 | Save | 保存 | common.buttons.save | ⚪ |

### 表单验证

| 位置 | 英文原文 | 中文翻译 | Key | 状态 |
|------|---------|---------|-----|------|
| 必填 | This field is required | 此字段为必填项 | validation.required | ⚪ |
| 无效URL | Invalid URL format | URL 格式无效 | validation.invalidUrl | ⚪ |
| 无效路径 | Invalid path | 路径无效 | validation.invalidPath | ⚪ |
| 太短 | Too short | 太短 | validation.tooShort | ⚪ |
| 太长 | Too long | 太长 | validation.tooLong | ⚪ |

---

## 🛠️ 工具函数翻译清单

### 时间格式化 (utils.ts)

| 英文 | 中文 | Key | 说明 |
|------|------|-----|------|
| just now | 刚刚 | time.justNow | |
| {n} seconds ago | {n}秒前 | time.secondsAgo | |
| {n} minutes ago | {n}分钟前 | time.minutesAgo | |
| {n} hours ago | {n}小时前 | time.hoursAgo | |
| {n} days ago | {n}天前 | time.daysAgo | |
| {n} weeks ago | {n}周前 | time.weeksAgo | |
| {n} months ago | {n}个月前 | time.monthsAgo | |
| {n} years ago | {n}年前 | time.yearsAgo | |

### 文件大小格式化

| 英文 | 中文 | Key | 说明 |
|------|------|-----|------|
| B | B | size.bytes | 字节 |
| KB | KB | size.kilobytes | |
| MB | MB | size.megabytes | |
| GB | GB | size.gigabytes | |
| TB | TB | size.terabytes | |

---

## 🚨 错误消息翻译清单

### 连接错误

| 英文 | 中文 | Key |
|------|------|-----|
| Failed to connect to server | 无法连接到服务器 | errors.connection.failed |
| Connection timed out | 连接超时 | errors.connection.timeout |
| Server not found | 找不到服务器 | errors.connection.notFound |
| Authentication failed | 认证失败 | errors.connection.authFailed |

### 文件系统错误

| 英文 | 中文 | Key |
|------|------|-----|
| Failed to read file | 无法读取文件 | errors.fs.readFailed |
| Failed to write file | 无法写入文件 | errors.fs.writeFailed |
| Permission denied | 权限被拒绝 | errors.fs.permissionDenied |
| Directory not found | 找不到目录 | errors.fs.directoryNotFound |

### 操作错误

| 英文 | 中文 | Key |
|------|------|-----|
| Operation failed | 操作失败 | errors.operation.failed |
| Something went wrong | 出了点问题 | errors.operation.generic |
| Please try again | 请重试 | errors.operation.retry |
| An unexpected error occurred | 发生了意外错误 | errors.operation.unexpected |

---

## 📊 翻译统计

### 按优先级统计

- 🔴 **高优先级**: 280项 (56%)
- 🟡 **中优先级**: 180项 (36%)
- 🟢 **低优先级**: 40项 (8%)

### 按类型统计

- 界面文本: 350项 (70%)
- 按钮/动作: 80项 (16%)
- 状态/提示: 40项 (8%)
- 错误消息: 30项 (6%)

---

## ✅ 验收标准

每个翻译项完成后需满足:

1. ✅ 翻译准确，符合上下文
2. ✅ 中文表达自然流畅
3. ✅ 术语使用统一
4. ✅ 文本长度适合UI展示
5. ✅ 格式占位符保留正确
6. ✅ 代码中key命名规范

---

**文档版本**: v1.0  
**创建日期**: 2026-01-20  
**最后更新**: 2026-01-20
