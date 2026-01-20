# i18n 国际化使用指南

OpenWork 项目已集成完整的i18n（国际化）支持，目前支持英文和简体中文两种语言。

---

## 快速开始

### 在组件中使用翻译

```typescript
import { useI18n } from '../i18n';

export default function MyComponent() {
  const { t } = useI18n();

  return (
    <div>
      <h1>{t('dashboard.home.welcomeTitle')}</h1>
      <button>{t('common.buttons.save')}</button>
    </div>
  );
}
```

### 带参数的翻译

```typescript
const { t } = useI18n();
const version = '1.2.3';

// 英文: "Update available: v1.2.3"
// 中文: "可用更新：v1.2.3"
<p>{t('settings.updates.available', { version })}</p>
```

### 语言切换

```typescript
const { locale, setLocale } = useI18n();

// 获取当前语言
console.log(locale()); // 'en' 或 'zh-CN'

// 切换语言
setLocale('zh-CN'); // 自动保存到 localStorage
```

---

## 翻译Key命名规范

使用点号分隔的命名空间结构：

```
模块.子模块.具体内容
```

### 示例
- `common.buttons.save` - 通用保存按钮
- `dashboard.nav.settings` - 仪表盘导航设置
- `settings.connection.title` - 设置页连接标题
- `errors.connection.failed` - 连接失败错误

---

## 可用的翻译模块

- `common` - 通用文本（按钮、状态、操作等）
- `onboarding` - 引导流程
- `dashboard` - 仪表盘
- `settings` - 设置
- `templates` - 模板
- `skills` - 技能
- `plugins` - 插件
- `mcp` - MCP服务器
- `validation` - 表单验证
- `errors` - 错误消息

完整翻译列表请查看：
- `src/i18n/locales/en.ts`
- `src/i18n/locales/zh-CN.ts`

---

## 添加新翻译

1. 在 `src/i18n/locales/en.ts` 添加英文翻译
2. 在 `src/i18n/locales/zh-CN.ts` 添加对应的中文翻译
3. 确保两个文件的结构完全一致

### 示例

**en.ts:**
```typescript
export const translations = {
  // ...
  myFeature: {
    title: 'My Feature',
    description: 'This is a description',
  },
};
```

**zh-CN.ts:**
```typescript
const zhCN: Translations = {
  // ...
  myFeature: {
    title: '我的功能',
    description: '这是描述',
  },
};
```

---

## 工具函数

### 时间格式化
```typescript
import { formatRelativeTime } from '../i18n/utils';
const { locale } = useI18n();

formatRelativeTime(timestamp, locale());
// 英文: "2 hours ago"
// 中文: "2小时前"
```

### 文件大小格式化
```typescript
import { formatBytes } from '../i18n/utils';
const { locale } = useI18n();

formatBytes(1024 * 1024, locale());
// 英文: "1.00 MB"
// 中文: "1.00 MB"
```

---

## TypeScript 支持

所有i18n相关的类型都已导出：

```typescript
import type { Locale, I18nContext, TranslateFn } from '../i18n';

// Locale: 'en' | 'zh-CN'
// I18nContext: { locale, setLocale, t }
// TranslateFn: (key, params?, defaultValue?) => string
```

---

## 常见问题

### Q: 如何处理翻译缺失？
A: `t()` 函数会自动返回key本身作为降级，也可以提供默认值：
```typescript
t('unknown.key', undefined, 'Default text')
```

### Q: 语言切换后需要刷新页面吗？
A: 不需要，i18n是响应式的，语言切换会立即反映到UI上。

### Q: 首次启动时如何选择语言？
A: 系统会自动按以下优先级选择：
1. 用户之前保存的选择（localStorage）
2. 浏览器/系统语言
3. 默认英文

---

## 更多文档

- [实施计划](./prd/i18n/i18n_implementation_plan.md)
- [翻译清单](./prd/i18n/translation_checklist.md)
- [代码示例](./prd/i18n/i18n_code_examples.md)
- [阶段1完成报告](./prd/i18n/phase1_completion_report.md)

---

**最后更新**: 2026-01-20
