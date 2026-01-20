import type { Translations } from './en';

const zhCN: Translations = {
    // ==================== 通用 ====================
    common: {
        buttons: {
            save: '保存',
            cancel: '取消',
            delete: '删除',
            edit: '编辑',
            create: '创建',
            new: '新建',
            back: '返回',
            next: '下一步',
            confirm: '确认',
            close: '关闭',
            connect: '连接',
            disconnect: '断开连接',
            install: '安装',
            uninstall: '卸载',
            refresh: '刷新',
            run: '运行',
            stop: '停止',
            change: '更改',
        },
        status: {
            connected: '已连接',
            notConnected: '未连接',
            connecting: '连接中...',
            loading: '加载中...',
            error: '错误',
            success: '成功',
            idle: '空闲',
            running: '运行中',
            completed: '已完成',
            failed: '失败',
            enabled: '已启用',
            disabled: '已禁用',
            installed: '已安装',
            retry: '重试',
        },
        actions: {
            viewAll: '查看全部',
            showMore: '显示更多',
            showLess: '收起',
            search: '搜索',
            filter: '筛选',
            sort: '排序',
        },
        labels: {
            title: '标题',
            description: '描述',
            name: '名称',
            type: '类型',
            status: '状态',
            date: '日期',
            time: '时间',
            size: '大小',
            alpha: '测试版',
            beta: 'Beta',
        },
        toggles: {
            on: '开',
            off: '关',
            enabled: '已启用',
            disabled: '已禁用',
        },
    },

    // ==================== 引导流程 ====================
    onboarding: {
        title: 'OpenWork',
        mode: {
            subtitle: '您希望如何使用 OpenWork？',
            rememberChoice: '下次自动使用此选项',
            host: {
                title: '在本机运行',
                description: 'OpenWork 在本地运行 OpenCode，保护您的工作隐私。',
            },
            client: {
                link: '连接为客户端（远程协作）',
            },
            engineRunning: {
                title: '引擎正在运行',
                description: '连接到此设备上的现有会话。',
                button: '附加',
            },
        },
        workspace: {
            firstTitle: '创建您的第一个工作空间',
            title: '创建工作空间',
            description: '选择文件夹和预设来设置您的工作空间。',
            startButton: '启动 OpenWork',
        },
        client: {
            title: '连接到主机',
            description: '连接到现有的 OpenCode 服务器（局域网或隧道）。',
            urlLabel: '服务器 URL',
            urlPlaceholder: 'http://127.0.0.1:4096',
            directoryLabel: '目录（可选）',
            directoryPlaceholder: '/path/to/project',
            directoryHint: '如果主机运行多个工作空间则需填写。',
        },
        connecting: {
            hostTitle: '正在启动 OpenWork...',
            hostDescription: '正在准备就绪',
            clientTitle: '正在搜索主机...',
            clientDescription: '正在验证安全握手',
        },
        engine: {
            title: 'OpenCode 引擎',
            checking: '正在检查 OpenCode CLI...',
            notFound: '未找到 OpenCode CLI。',
            needsUpdate: 'OpenCode CLI 需要更新以支持 serve 功能。',
            ready: 'OpenCode CLI 就绪。',
            readyToStart: 'OpenCode 已准备好以本地模式启动。',
            installWindows: '请安装 Windows 版 OpenCode，然后重启 OpenWork。请确保 opencode.exe 在 PATH 中。',
            installHint: '安装 OpenCode 以启用本地模式（无需终端）。',
            installButton: '安装 OpenCode',
            windowsManual: 'Windows 上需要手动安装 OpenCode。',
            recheck: '重新检查',
            resolvedPath: '解析路径',
            version: '版本',
            searchNotes: '搜索备注',
            serveHelp: 'serve --help 输出',
        },
    },

    // ==================== 仪表盘 ====================
    dashboard: {
        nav: {
            dashboard: '仪表盘',
            sessions: '会话',
            templates: '模板',
            skills: '技能',
            plugins: '插件',
            mcps: 'MCP 服务器',
            settings: '设置',
        },
        connection: {
            title: '连接',
            localEngine: '本地引擎',
            clientMode: '客户端模式',
            stopAndDisconnect: '停止并断开',
        },
        home: {
            welcomeTitle: '今天要做什么？',
            welcomeDescription: '描述您想要的结果，OpenWork 将执行并保留审计记录。',
            newTaskButton: '新建任务',
            quickTemplates: '快速启动模板',
            noTemplates: '暂无模板。入门模板将显示在这里。',
            runWorkflow: '运行已保存的工作流',
        },
        sessions: {
            recent: '最近会话',
            empty: '暂无会话。',
            thisWorkspace: '此工作空间',
        },
    },

    // ==================== 设置 ====================
    settings: {
        connection: {
            title: '连接',
            developerMode: '启用开发者模式',
            developerModeDisable: '禁用开发者模式',
            stopEngine: '停止引擎',
            engineSource: '引擎源',
            engineSourceDescription:
                'PATH 使用已安装的 OpenCode（默认）。Sidecar 将使用捆绑的二进制文件（如可用）。',
            sidecarWindows: 'Sidecar 目前在 Windows 上不可用。',
        },
        model: {
            title: '模型',
            description: '运行的默认设置和思考控制。',
            thinking: '思考',
            thinkingDescription: '显示思考部分（仅开发者模式）。',
            variant: '模型变体',
        },
        demo: {
            title: '演示模式',
            description: '用于录制和审查的轻量级脚本状态。',
            enable: '启用演示模式',
            replacesData: '使用演示序列替换实时数据。',
            sequenceDescription: '演示序列交换脚本化的会话、构件和工作空间上下文。',
        },
        updates: {
            title: '更新',
            description: '保持 OpenWork 最新。',
            desktopOnly: '更新仅在桌面应用中可用。',
            autoCheck: '自动检查',
            frequency: '每天一次（静默）',
            checking: '检查中...',
            available: '可用更新：v{version}',
            downloading: '下载中...',
            ready: '准备安装：v{version}',
            error: '更新检查失败',
            upToDate: '已是最新',
            lastChecked: '上次检查 {time}',
            published: '发布于 {date}',
            checkButton: '检查',
            downloadButton: '下载',
            installButton: '安装并重启',
            stopRunsHint: '停止活动任务以更新',
        },
        startup: {
            title: '启动',
            hostMode: '本地模式',
            clientMode: '客户端模式',
            switch: '切换',
            reset: '重置默认启动模式',
            resetDescription: '这将清除您保存的偏好，下次启动时显示模式选择。',
        },
        advanced: {
            title: '高级',
            description: '重置 OpenWork 本地状态以重新测试引导流程。',
            resetOnboarding: '重置引导',
            resetOnboardingDescription: '清除 OpenWork 偏好设置并重启应用。',
            resetAppData: '重置应用数据',
            resetAppDataDescription: '更彻底。清除 OpenWork 缓存和应用数据。',
            resetButton: '重置',
            resetConfirmHint: '需要输入 RESET 并将重启应用。',
            stopRunsHint: '停止活动任务以重置',
        },
        developer: {
            title: '开发者',
            cache: 'OpenCode 缓存',
            cacheDescription: '修复用于启动引擎的缓存数据。安全运行。',
            repairCache: '修复缓存',
            repairingCache: '正在修复缓存',
            requiresDesktop: '缓存修复需要桌面应用',
            pendingPermissions: '待处理权限',
            recentEvents: '最近事件',
        },
        language: {
            title: '语言',
            description: '选择您偏好的语言',
            switchLanguage: '切换语言',
        },
    },

    // ==================== 模板 ====================
    templates: {
        workspace: '工作空间模板',
        global: '全局模板',
        empty: '暂无模板。',
        create: '创建模板',
        edit: '编辑模板',
        delete: '删除模板',
        run: '运行模板',
        scope: {
            workspace: '工作空间',
            global: '全局',
        },
    },

    // ==================== 技能 ====================
    skills: {
        installed: '已安装技能',
        installFromPackage: '从 OpenPackage 安装',
        importLocal: '导入本地技能',
        searchPackages: '搜索包',
        packageSource: '包源',
        empty: '尚未安装技能。',
    },

    // ==================== 插件 ====================
    plugins: {
        installed: '已安装插件',
        suggested: '推荐插件',
        addPlugin: '添加插件',
        configPath: '配置路径',
        projectScope: '项目作用域',
        globalScope: '全局作用域',
        empty: '尚未安装插件。',
    },

    // ==================== MCP ====================
    mcp: {
        title: 'MCP 服务器',
        quickConnect: '快速连接',
        advancedConfig: '高级配置',
        serverName: '服务器名称',
        serverUrl: '服务器 URL',
        oauth: 'OAuth 认证',
        testConnection: '测试连接',
        connecting: '连接中...',
        reloadRequired: '需要重载',
        reloadEngine: '重载引擎',
        empty: '尚未配置 MCP 服务器。',
    },

    // ==================== 验证 ====================
    validation: {
        required: '此字段为必填项',
        invalidUrl: 'URL 格式无效',
        invalidPath: '路径无效',
        tooShort: '太短',
        tooLong: '太长',
    },

    // ==================== 错误 ====================
    errors: {
        connection: {
            failed: '无法连接到服务器',
            timeout: '连接超时',
            notFound: '找不到服务器',
            authFailed: '认证失败',
        },
        fs: {
            readFailed: '无法读取文件',
            writeFailed: '无法写入文件',
            permissionDenied: '权限被拒绝',
            directoryNotFound: '找不到目录',
        },
        operation: {
            failed: '操作失败',
            generic: '出了点问题',
            retry: '请重试',
            unexpected: '发生了意外错误',
        },
    },
};

export default zhCN;
