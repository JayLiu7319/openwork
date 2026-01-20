# OpenWork i18n 代码示例与最佳实践

本文档提供在 OpenWork 项目中实施 i18n 的详细代码示例和最佳实践。

---

## 📚 目录

1. [基础配置](#1-基础配置)
2. [语言包结构](#2-语言包结构)
3. [在组件中使用](#3-在组件中使用)
4. [高级用法](#4-高级用法)
5. [最佳实践](#5-最佳实践)
6. [常见问题](#6-常见问题)

---

## 1. 基础配置

### 1.1 类型定义 (src/i18n/types.ts)

```typescript
/**
 * 支持的语言代码
 */
export type Locale = 'en' | 'zh-CN';

/**
 * 语言选项配置
 */
export interface LocaleOption {
  /** ISO语言代码 */
  code: Locale;
  /** 英文标签 */
  label: string;
  /** 本地语言标签 */
  nativeLabel: string;
  /** 语言图标(可选) */
  icon?: string;
}

/**
 * 翻译字典类型
 */
export type TranslationDict = {
  [key: string]: string | TranslationDict;
};

/**
 * 翻译函数类型
 */
export type TranslateFn = (
  key: string,
  params?: Record<string, string | number>,
  defaultValue?: string
) => string;

/**
 * 语言上下文
 */
export interface I18nContext {
  locale: () => Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
}
```

### 1.2 工具函数 (src/i18n/utils.ts)

```typescript
import type { Locale } from './types';

/**
 * localStorage key
 */
const LOCALE_STORAGE_KEY = 'openwork-locale';

/**
 * 从localStorage加载保存的语言
 */
export function loadSavedLocale(): Locale | null {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'en' || saved === 'zh-CN') {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to load saved locale:', error);
  }
  return null;
}

/**
 * 保存语言选择到localStorage
 */
export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (error) {
    console.warn('Failed to save locale:', error);
  }
}

/**
 * 检测浏览器语言，映射到支持的语言
 */
export function getBrowserLocale(): Locale {
  const browserLang = navigator.language.toLowerCase();
  
  // 中文变体都映射到简体中文
  if (browserLang.startsWith('zh')) {
    return 'zh-CN';
  }
  
  // 默认英文
  return 'en';
}

/**
 * 自动检测语言：
 * 1. 优先使用保存的选择
 * 2. 其次使用浏览器语言
 * 3. 最后默认英文
 */
export function detectLocale(): Locale {
  return loadSavedLocale() || getBrowserLocale();
}

/**
 * 格式化相对时间（支持i18n）
 */
export function formatRelativeTime(
  timestamp: number,
  locale: Locale = 'en'
): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const formats = {
    en: {
      justNow: 'just now',
      secondsAgo: (n: number) => `${n} second${n > 1 ? 's' : ''} ago`,
      minutesAgo: (n: number) => `${n} minute${n > 1 ? 's' : ''} ago`,
      hoursAgo: (n: number) => `${n} hour${n > 1 ? 's' : ''} ago`,
      daysAgo: (n: number) => `${n} day${n > 1 ? 's' : ''} ago`,
      weeksAgo: (n: number) => `${n} week${n > 1 ? 's' : ''} ago`,
      monthsAgo: (n: number) => `${n} month${n > 1 ? 's' : ''} ago`,
      yearsAgo: (n: number) => `${n} year${n > 1 ? 's' : ''} ago`,
    },
    'zh-CN': {
      justNow: '刚刚',
      secondsAgo: (n: number) => `${n}秒前`,
      minutesAgo: (n: number) => `${n}分钟前`,
      hoursAgo: (n: number) => `${n}小时前`,
      daysAgo: (n: number) => `${n}天前`,
      weeksAgo: (n: number) => `${n}周前`,
      monthsAgo: (n: number) => `${n}个月前`,
      yearsAgo: (n: number) => `${n}年前`,
    },
  };

  const format = formats[locale];

  if (seconds < 10) return format.justNow;
  if (seconds < 60) return format.secondsAgo(seconds);
  if (minutes < 60) return format.minutesAgo(minutes);
  if (hours < 24) return format.hoursAgo(hours);
  if (days < 7) return format.daysAgo(days);
  if (weeks < 4) return format.weeksAgo(weeks);
  if (months < 12) return format.monthsAgo(months);
  return format.yearsAgo(years);
}

/**
 * 格式化文件大小（支持i18n）
 */
export function formatBytes(
  bytes: number,
  locale: Locale = 'en',
  decimals: number = 2
): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const value = bytes / Math.pow(k, i);
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${formatted} ${sizes[i]}`;
}
```

### 1.3 i18n初始化 (src/i18n/index.ts)

```typescript
import { createSignal, createContext, useContext } from 'solid-js';
import type { Accessor, Setter, ParentComponent } from 'solid-js';
import type { Locale, TranslateFn, I18nContext } from './types';
import { detectLocale, saveLocale } from './utils';

// 导入语言包
import enDict from './locales/en';
import zhCNDict from './locales/zh-CN';

/**
 * 所有语言字典
 */
const dictionaries = {
  en: enDict,
  'zh-CN': zhCNDict,
};

/**
 * 创建i18n上下文
 */
const I18nContext = createContext<I18nContext>();

/**
 * I18n Provider 组件
 */
export const I18nProvider: ParentComponent = (props) => {
  const [locale, setLocaleSignal] = createSignal<Locale>(detectLocale());

  /**
   * 设置语言并保存
   */
  const setLocale = (newLocale: Locale) => {
    setLocaleSignal(newLocale);
    saveLocale(newLocale);
  };

  /**
   * 翻译函数
   * @param key - 翻译key，支持嵌套，如 'common.buttons.save'
   * @param params - 插值参数，如 { name: 'John', count: 5 }
   * @param defaultValue - 当key不存在时的默认值
   */
  const t: TranslateFn = (key, params, defaultValue) => {
    const currentLocale = locale();
    const dict = dictionaries[currentLocale];
    
    // 解析嵌套key
    const keys = key.split('.');
    let value: any = dict;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // key不存在，使用默认值或key本身
        console.warn(`Translation key not found: ${key} (locale: ${currentLocale})`);
        return defaultValue || key;
      }
    }
    
    // 如果最终值不是字符串，返回key
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return defaultValue || key;
    }
    
    // 处理插值
    if (params) {
      return Object.entries(params).reduce((result, [paramKey, paramValue]) => {
        const placeholder = `{${paramKey}}`;
        return result.replace(new RegExp(placeholder, 'g'), String(paramValue));
      }, value);
    }
    
    return value;
  };

  const value: I18nContext = {
    locale,
    setLocale,
    t,
  };

  return (
    <I18nContext.Provider value={value}>
      {props.children}
    </I18nContext.Provider>
  );
};

/**
 * 使用i18n的Hook
 */
export function useI18n(): I18nContext {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

/**
 * 便捷导出
 */
export { detectLocale, saveLocale, loadSavedLocale } from './utils';
export type { Locale, I18nContext, TranslateFn } from './types';
```

---

## 2. 语言包结构

### 2.1 英文语言包 (src/i18n/locales/en.ts)

```typescript
export default {
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
    },
    actions: {
      viewAll: 'View all',
      showMore: 'Show more',
      showLess: 'Show less',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
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
} as const;

/**
 * 导出类型以便在其他语言包中保持类型一致
 */
export type Translations = typeof import('./en').default;
```

### 2.2 中文语言包 (src/i18n/locales/zh-CN.ts)

```typescript
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
```

---

## 3. 在组件中使用

### 3.1 基础用法

```typescript
import { useI18n } from '../i18n';

function MyComponent() {
  const { t } = useI18n();

  return (
    <div>
      <h1>{t('dashboard.home.welcomeTitle')}</h1>
      <p>{t('dashboard.home.welcomeDescription')}</p>
      <button>{t('common.buttons.save')}</button>
    </div>
  );
}
```

### 3.2 带插值的翻译

```typescript
import { useI18n } from '../i18n';

function UpdateStatus() {
  const { t } = useI18n();
  const version = '1.2.3';

  return (
    <div>
      {/* 英文: "Update available: v1.2.3" */}
      {/* 中文: "可用更新：v1.2.3" */}
      <p>{t('settings.updates.available', { version })}</p>
    </div>
  );
}
```

### 3.3 条件渲染与翻译

```typescript
import { useI18n } from '../i18n';
import { Show } from 'solid-js';

function ConnectionStatus(props: { connected: boolean }) {
  const { t } = useI18n();

  return (
    <Show
      when={props.connected}
      fallback={<span>{t('common.status.notConnected')}</span>}
    >
      <span>{t('common.status.connected')}</span>
    </Show>
  );
}
```

### 3.4 动态Key翻译

```typescript
import { useI18n } from '../i18n';
import { For } from 'solid-js';

type TabName = 'dashboard' | 'sessions' | 'templates';

function TabNavigation() {
  const { t } = useI18n();
  const tabs: TabName[] = ['dashboard', 'sessions', 'templates'];

  return (
    <nav>
      <For each={tabs}>
        {(tab) => (
          <button>
            {t(`dashboard.nav.${tab}`)}
          </button>
        )}
      </For>
    </nav>
  );
}
```

---

## 4. 高级用法

### 4.1 语言切换UI

```typescript
import { useI18n } from '../i18n';
import type { Locale } from '../i18n/types';

function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  const languages: Array<{ code: Locale; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'zh-CN', label: '简体中文' },
  ];

  return (
    <div>
      <label>{t('settings.language.title')}</label>
      <select
        value={locale()}
        onChange={(e) => setLocale(e.currentTarget.value as Locale)}
      >
        <For each={languages}>
          {(lang) => (
            <option value={lang.code}>{lang.label}</option>
          )}
        </For>
      </select>
    </div>
  );
}
```

### 4.2 时间格式化集成

```typescript
import { useI18n } from '../i18n';
import { formatRelativeTime } from '../i18n/utils';

function TimestampDisplay(props: { timestamp: number }) {
  const { locale } = useI18n();

  return (
    <span>
      {formatRelativeTime(props.timestamp, locale())}
    </span>
  );
}
```

### 4.3 表单验证消息

```typescript
import { useI18n } from '../i18n';
import { createSignal, Show } from 'solid-js';

function LoginForm() {
  const { t } = useI18n();
  const [url, setUrl] = createSignal('');
  const [error, setError] = createSignal<string | null>(null);

  const validate = () => {
    if (!url().trim()) {
      setError(t('validation.required'));
      return false;
    }
    try {
      new URL(url());
      setError(null);
      return true;
    } catch {
      setError(t('validation.invalidUrl'));
      return false;
    }
  };

  return (
    <form>
      <input
        type="text"
        value={url()}
        onInput={(e) => setUrl(e.currentTarget.value)}
        onBlur={validate}
      />
      <Show when={error()}>
        <span class="error">{error()}</span>
      </Show>
    </form>
  );
}
```

### 4.4 错误处理消息

```typescript
import { useI18n } from '../i18n';
import { createSignal } from 'solid-js';

function DataLoader() {
  const { t } = useI18n();
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

  const loadData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Network error');
      }
      // 处理数据...
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMessage(t('errors.connection.failed'));
      } else {
        setErrorMessage(t('errors.operation.unexpected'));
      }
    }
  };

  return (
    <div>
      <Show when={errorMessage()}>
        <div class="error-banner">
          {errorMessage()}
          <button onClick={() => setErrorMessage(null)}>
            {t('common.buttons.close')}
          </button>
        </div>
      </Show>
    </div>
  );
}
```

---

## 5. 最佳实践

### 5.1 Key命名规范

✅ **推荐做法:**
```typescript
// 使用层级结构，清晰表达含义
t('dashboard.nav.settings')
t('settings.connection.title')
t('common.buttons.save')
```

❌ **不推荐做法:**
```typescript
// 避免过于扁平或过于深层
t('settings')  // 太模糊
t('features.dashboard.navigation.items.settings.label')  // 太深
```

### 5.2 代码组织

**每个组件中:**
```typescript
function MyComponent() {
  // ✅ 在组件顶部调用useI18n
  const { t, locale } = useI18n();
  
  // 其他hooks和状态...
  
  return (
    // JSX...
  );
}
```

### 5.3 默认值处理

```typescript
// ✅ 为不存在的key提供合理的默认值
const description = t(
  'features.newFeature.description',
  undefined,
  'Feature description coming soon'
);

// ✅ 或者使用可选链和空值合并
const title = t('features.newFeature.title') || 'Untitled';
```

### 5.4 避免硬编码

❌ **不推荐:**
```typescript
// 硬编码字符串
<button>保存</button>
<p>Welcome to OpenWork</p>
```

✅ **推荐:**
```typescript
// 使用翻译函数
<button>{t('common.buttons.save')}</button>
<p>{t('onboarding.welcome')}</p>
```

### 5.5 插值变量清晰命名

✅ **推荐:**
```typescript
// 语言包
{
  message: "Hello {userName}, you have {count} new messages"
}

// 使用
t('message', { userName: 'Alice', count: 5 })
```

❌ **不推荐:**
```typescript
// 语言包
{
  message: "Hello {0}, you have {1} new messages"
}

// 使用(难以理解)
t('message', { '0': 'Alice', '1': 5 })
```

### 5.6 保持翻译简洁

```typescript
// ✅ 简洁明了
{
  button: "Save changes"
}

// ❌ 冗长复杂
{
  button: "Click this button to save all the changes you have made to your profile settings"
}
```

---

## 6. 常见问题

### Q1: 如何处理复数形式？

**方案1: 条件渲染**
```typescript
function MessageCount(props: { count: number }) {
  const { t } = useI18n();
  
  return (
    <span>
      {props.count === 1 
        ? t('messages.singular', { count: props.count })
        : t('messages.plural', { count: props.count })
      }
    </span>
  );
}

// 语言包
{
  messages: {
    singular: "{count} message",
    plural: "{count} messages"
  }
}
```

**方案2: 使用Intl.PluralRules**
```typescript
function formatPlural(count: number, locale: Locale, key: string) {
  const pr = new Intl.PluralRules(locale);
  const rule = pr.select(count);
  return t(`${key}.${rule}`, { count });
}

// 语言包
{
  items: {
    one: "{count} item",
    other: "{count} items"
  }
}
```

### Q2: 如何处理富文本翻译？

```typescript
import { splitProps } from 'solid-js';

function RichTextTranslation() {
  const { t } = useI18n();
  
  return (
    <p>
      {t('onboarding.description.part1')}
      {' '}
      <strong>{t('onboarding.description.emphasis')}</strong>
      {' '}
      {t('onboarding.description.part2')}
    </p>
  );
}

// 或者使用innerHTML (需谨慎，注意XSS)
function HtmlTranslation() {
  const { t } = useI18n();
  
  return (
    <div innerHTML={t('rich.content')} />
  );
}
```

### Q3: 如何测试翻译覆盖率？

**创建测试脚本:**
```typescript
// scripts/check-i18n-coverage.ts
import en from './src/i18n/locales/en';
import zhCN from './src/i18n/locales/zh-CN';

function flattenKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object') {
      keys = keys.concat(flattenKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = flattenKeys(en);
const zhKeys = flattenKeys(zhCN);

const missingInZh = enKeys.filter(k => !zhKeys.includes(k));
const extraInZh = zhKeys.filter(k => !enKeys.includes(k));

console.log('Missing in zh-CN:', missingInZh);
console.log('Extra in zh-CN:', extraInZh);
console.log(`Coverage: ${Math.round((zhKeys.length / enKeys.length) * 100)}%`);
```

### Q4: 性能优化建议？

1. **懒加载大语言包**
```typescript
// 动态导入
const loadLocale = async (locale: Locale) => {
  const dict = await import(`./locales/${locale}.ts`);
  return dict.default;
};
```

2. **缓存翻译结果**
```typescript
import { createMemo } from 'solid-js';

function MyComponent() {
  const { t } = useI18n();
  
  // 缓存翻译结果
  const title = createMemo(() => t('page.title'));
  
  return <h1>{title()}</h1>;
}
```

3. **避免在循环中重复翻译**
```typescript
// ❌ 不推荐
<For each={items}>
  {(item) => <div>{t('common.label')}: {item.name}</div>}
</For>

// ✅ 推荐
const label = t('common.label');
<For each={items}>
  {(item) => <div>{label}: {item.name}</div>}
</For>
```

---

**文档版本**: v1.0  
**创建日期**: 2026-01-20  
**最后更新**: 2026-01-20
