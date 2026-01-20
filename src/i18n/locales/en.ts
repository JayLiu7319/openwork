const translations = {
    // ==================== 通用 ====================
    common: {
        buttons: {
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            create: 'Create',
            new: 'New',
            back: 'Back',
            next: 'Next',
            confirm: 'Confirm',
            close: 'Close',
            connect: 'Connect',
            disconnect: 'Disconnect',
            install: 'Install',
            uninstall: 'Uninstall',
            refresh: 'Refresh',
            run: 'Run',
            stop: 'Stop',
            change: 'Change',
        },
        status: {
            connected: 'Connected',
            notConnected: 'Not connected',
            connecting: 'Connecting...',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            idle: 'Idle',
            running: 'Running',
            completed: 'Completed',
            failed: 'Failed',
            enabled: 'Enabled',
            disabled: 'Disabled',
            installed: 'Installed',
            retry: 'Retry',
        },
        actions: {
            viewAll: 'View all',
            showMore: 'Show more',
            showLess: 'Show less',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
        },
        errors: {
            required: 'Required',
            invalid: 'Invalid value',
            unknown: 'Unknown error',
        },
        labels: {
            title: 'Title',
            description: 'Description',
            name: 'Name',
            type: 'Type',
            status: 'Status',
            date: 'Date',
            time: 'Time',
            size: 'Size',
            alpha: 'Alpha',
            beta: 'Beta',
        },
        toggles: {
            on: 'On',
            off: 'Off',
            enabled: 'Enabled',
            disabled: 'Disabled',
        },
    },

    // ==================== 引导流程 ====================
    onboarding: {
        title: 'OpenWork',
        mode: {
            subtitle: 'How would you like to run OpenWork today?',
            rememberChoice: 'Remember my choice for next time',
            host: {
                title: 'Run on this computer',
                description: 'OpenWork runs OpenCode locally and keeps your work private.',
            },
            client: {
                link: 'Connect as a Client (Remote Pairing)',
            },
            engineRunning: {
                title: 'Engine already running',
                description: 'Attach to the existing session on this device.',
                button: 'Attach',
            },
        },
        workspace: {
            firstTitle: 'Create your first workspace',
            title: 'Create a workspace',
            description: 'Choose a folder and preset to set up your workspace.',
            startButton: 'Start OpenWork',
        },
        client: {
            title: 'Connect to Host',
            description: 'Pair with an existing OpenCode server (LAN or tunnel).',
            urlLabel: 'Server URL',
            urlPlaceholder: 'http://127.0.0.1:4096',
            directoryLabel: 'Directory (optional)',
            directoryPlaceholder: '/path/to/project',
            directoryHint: 'Use if your host runs multiple workspaces.',
        },
        connecting: {
            hostTitle: 'Starting OpenWork...',
            hostDescription: 'Getting everything ready',
            clientTitle: 'Searching for Host...',
            clientDescription: 'Verifying secure handshake',
        },
        engine: {
            title: 'OpenCode engine',
            checking: 'Checking OpenCode CLI...',
            notFound: 'OpenCode CLI not found.',
            needsUpdate: 'OpenCode CLI needs an update for serve.',
            ready: 'OpenCode CLI ready.',
            readyToStart: 'OpenCode is ready to start in host mode.',
            installWindows: 'Install OpenCode for Windows, then restart OpenWork. Ensure opencode.exe is on PATH.',
            installHint: 'Install OpenCode to enable host mode (no terminal required).',
            installButton: 'Install OpenCode',
            windowsManual: 'OpenCode install is manual on Windows.',
            recheck: 'Re-check',
            resolvedPath: 'Resolved path',
            version: 'Version',
            searchNotes: 'Search notes',
            serveHelp: 'serve --help output',
        },
    },

    // ==================== 会话 ====================
    session: {
        noSelected: 'No session selected',
        backToDashboard: 'Back to dashboard',
        newTask: 'New task',
        recents: 'Recents',
        localOnly: "These tasks run locally and aren't synced across devices.",
        ready: 'Ready to work',
        describeTask: "Describe a task. I'll show progress and ask for permissions when needed.",
        steps: {
            hide: 'Hide steps',
            view: 'View steps',
            unfold: 'Steps will show as the task unfolds.',
        },
        artifacts: {
            label: 'Artifacts',
            open: 'Open',
            reveal: 'Reveal',
            opened: 'Opened in default app.',
            revealed: 'Revealed in file manager.',
            missingPath: 'Artifact path missing.',
            desktopOnly: 'Open is only available in the desktop app.',
            document: 'Document',
            empty: 'No artifacts yet.',
        },
        model: {
            label: 'Model',
            ready: 'Ready',
            connect: 'Connect a provider to customize this.',
            standard: 'Standard',
        },
        sidebar: {
            progress: 'Progress',
            artifacts: 'Artifacts',
            context: 'Context',
        },
        context: {
            activePlugins: 'Active plugins',
            noPlugins: 'No plugins loaded.',
            selectedFolders: 'Selected folders',
            workingFiles: 'Working files',
            noneYet: 'None yet.',
        },
        input: {
            placeholder: 'Ask OpenWork...',
            run: 'Run',
            tryNotion: 'Try it now: set up my CRM in Notion',
            insertPrompt: 'Insert prompt',
        },
        permissions: {
            required: 'Permission Required',
            requesting: 'OpenCode is requesting permission to continue.',
            permission: 'Permission',
            scope: 'Scope',
            details: 'Details',
            deny: 'Deny',
            once: 'Once',
            allowSession: 'Allow for session',
        },
    },

    // ==================== 仪表盘 ====================
    dashboard: {
        nav: {
            dashboard: 'Dashboard',
            sessions: 'Sessions',
            templates: 'Templates',
            skills: 'Skills',
            plugins: 'Plugins',
            mcps: 'MCPs',
            settings: 'Settings',
        },
        connection: {
            title: 'Connection',
            localEngine: 'Local Engine',
            clientMode: 'Client Mode',
            stopAndDisconnect: 'Stop & Disconnect',
        },
        home: {
            welcomeTitle: 'What should we do today?',
            welcomeDescription: 'Describe an outcome. OpenWork will run it and keep an audit trail.',
            newTaskButton: 'New Task',
            quickTemplates: 'Quick Start Templates',
            noTemplates: 'No templates yet. Starter templates will appear here.',
            runWorkflow: 'Run a saved workflow',
        },
        sessions: {
            recent: 'Recent Sessions',
            empty: 'No sessions yet.',
            thisWorkspace: 'this workspace',
        },
    },

    // ==================== 设置 ====================
    settings: {
        connection: {
            title: 'Connection',
            developerMode: 'Enable Developer Mode',
            developerModeDisable: 'Disable Developer Mode',
            stopEngine: 'Stop engine',
            engineSource: 'Engine source',
            engineSourceDescription:
                'PATH uses your installed OpenCode (default). Sidecar will use a bundled binary when available.',
            sidecarWindows: 'Sidecar is currently unavailable on Windows.',
        },
        model: {
            title: 'Model',
            description: 'Defaults + thinking controls for runs.',
            thinking: 'Thinking',
            thinkingDescription: 'Show thinking parts (Developer mode only).',
            variant: 'Model variant',
        },
        demo: {
            title: 'Demo mode',
            description: 'Lightweight scripted states for recording and review.',
            enable: 'Enable demo mode',
            replacesData: 'Replaces live data with demo sequences.',
            sequenceDescription:
                'Demo sequences swap in scripted sessions, artifacts, and workspace context.',
            sequences: {
                coldOpen: 'Cold open',
                scheduler: 'Scheduler',
                summaries: 'Summaries',
                groceries: 'Groceries',
            },
        },
        updates: {
            title: 'Updates',
            description: 'Keep OpenWork up to date.',
            desktopOnly: 'Updates are only available in the desktop app.',
            autoCheck: 'Automatic checks',
            frequency: 'Once per day (quiet)',
            checking: 'Checking...',
            available: 'Update available: v{version}',
            downloading: 'Downloading...',
            ready: 'Ready to install: v{version}',
            error: 'Update check failed',
            upToDate: 'Up to date',
            lastChecked: 'Last checked {time}',
            published: 'Published {date}',
            checkButton: 'Check',
            downloadButton: 'Download',
            installButton: 'Install & Restart',
            stopRunsHint: 'Stop active runs to update',
            notSupported: 'Updates are not supported in this environment.',
        },
        startup: {
            title: 'Startup',
            hostMode: 'host mode',
            clientMode: 'client mode',
            switch: 'Switch',
            reset: 'Reset default startup mode',
            resetDescription:
                'This clears your saved preference and shows mode selection on next launch.',
        },
        advanced: {
            title: 'Advanced',
            description: 'Reset OpenWork local state to retest onboarding.',
            resetOnboarding: 'Reset onboarding',
            resetOnboardingDescription: 'Clears OpenWork preferences and restarts the app.',
            resetAppData: 'Reset app data',
            resetAppDataDescription: 'More aggressive. Clears OpenWork cache + app data.',
            resetButton: 'Reset',
            resetConfirmHint: 'Requires typing RESET and will restart the app.',
            stopRunsHint: 'Stop active runs to reset',
        },
        developer: {
            title: 'Developer',
            cache: 'OpenCode cache',
            cacheDescription: 'Repairs cached data used to start the engine. Safe to run.',
            repairCache: 'Repair cache',
            repairingCache: 'Repairing cache',
            requiresDesktop: 'Cache repair requires the desktop app',
            pendingPermissions: 'Pending permissions',
            recentEvents: 'Recent events',
        },
        language: {
            title: 'Language',
            description: 'Choose your preferred language',
            switchLanguage: 'Switch language',
        },
        notion: {
            connected: 'Connected',
            reloadRequired: 'Reload required',
            connectionFailed: 'Connection failed',
            notConnected: 'Not connected',
        },
    },

    // ==================== 模板 ====================
    templates: {
        workspace: 'Workspace Templates',
        global: 'Global Templates',
        empty: 'No templates yet.',
        create: 'Create Template',
        edit: 'Edit Template',
        delete: 'Delete Template',
        run: 'Run Template',
        scope: {
            workspace: 'Workspace',
            global: 'Global',
        },
    },

    // ==================== 技能 ====================
    skills: {
        installed: 'Installed Skills',
        installFromPackage: 'Install from OpenPackage',
        importLocal: 'Import Local Skill',
        searchPackages: 'Search packages',
        packageSource: 'Package source',
        empty: 'No skills installed yet.',
    },

    // ==================== 插件 ====================
    plugins: {
        installed: 'Installed Plugins',
        suggested: 'Suggested Plugins',
        addPlugin: 'Add Plugin',
        configPath: 'Config path',
        projectScope: 'Project Scope',
        globalScope: 'Global Scope',
        empty: 'No plugins installed yet.',
    },

    // ==================== MCP ====================
    mcp: {
        title: 'MCP Servers',
        quickConnect: 'Quick Connect',
        advancedConfig: 'Advanced Configuration',
        serverName: 'Server Name',
        serverUrl: 'Server URL',
        oauth: 'OAuth Authentication',
        testConnection: 'Test Connection',
        connecting: 'Connecting...',
        reloadRequired: 'Reload required',
        reloadEngine: 'Reload Engine',
        empty: 'No MCP servers configured yet.',
    },

    // ==================== 验证 ====================
    validation: {
        required: 'This field is required',
        invalidUrl: 'Invalid URL format',
        invalidPath: 'Invalid path',
        tooShort: 'Too short',
        tooLong: 'Too long',
    },

    // ==================== 错误 ====================
    errors: {
        connection: {
            failed: 'Failed to connect to server',
            timeout: 'Connection timed out',
            notFound: 'Server not found',
            authFailed: 'Authentication failed',
        },
        fs: {
            readFailed: 'Failed to read file',
            writeFailed: 'Failed to write file',
            permissionDenied: 'Permission denied',
            directoryNotFound: 'Directory not found',
        },
        operation: {
            failed: 'Operation failed',
            generic: 'Something went wrong',
            retry: 'Please try again',
            unexpected: 'An unexpected error occurred',
        },
    },
};

/**
 * 导出类型以便在其他语言包中保持类型一致
 */
export type Translations = typeof translations;

export default translations;
