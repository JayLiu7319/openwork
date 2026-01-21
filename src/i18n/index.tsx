import { createSignal, createContext, useContext, createRoot } from 'solid-js';
import type { ParentComponent } from 'solid-js';
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
 * 全局 locale signal（用于 Provider 外部使用）
 */
const [globalLocale, setGlobalLocaleSignal] = createRoot(() => createSignal<Locale>(detectLocale()));

/**
 * 获取当前全局语言
 */
export const currentLocale = (): Locale => globalLocale();

/**
 * 设置全局语言并持久化
 */
export const setLocale = (newLocale: Locale) => {
    setGlobalLocaleSignal(newLocale);
    saveLocale(newLocale);
};

/**
 * 全局翻译函数（用于 Provider 外部使用）
 * @param key - 翻译key，支持嵌套，如 'common.buttons.save'
 * @param params - 插值参数，如 { name: 'John', count: 5 }
 * @param defaultValue - 当key不存在时的默认值
 */
export const t = (key: string, params?: Record<string, string | number>, defaultValue?: string): string => {
    const locale = globalLocale();
    const dict = dictionaries[locale];

    // 解析嵌套key
    const keys = key.split('.');
    let value: any = dict;

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // key不存在，使用默认值或key本身
            return defaultValue || key;
        }
    }

    // 如果最终值不是字符串，返回key
    if (typeof value !== 'string') {
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

/**
 * 创建i18n上下文
 */
const I18nContextObject = createContext<I18nContext>();

/**
 * I18n Provider 组件
 */
export const I18nProvider: ParentComponent = (props) => {
    // 使用全局信号同步
    const locale = globalLocale;
    const setLocaleLocal = (newLocale: Locale) => {
        setLocale(newLocale);
    };

    /**
     * 翻译函数（使用全局函数）
     */
    const tLocal: TranslateFn = (key, params, defaultValue) => {
        return t(key, params, defaultValue);
    };

    const value: I18nContext = {
        locale,
        setLocale: setLocaleLocal,
        t: tLocal,
    };

    return (
        <I18nContextObject.Provider value={value}>
            {props.children}
        </I18nContextObject.Provider>
    );
};

/**
 * 使用i18n的Hook
 */
export function useI18n(): I18nContext {
    const context = useContext(I18nContextObject);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}

/**
 * 便捷导出
 */
export { detectLocale, saveLocale, loadSavedLocale, formatRelativeTime, formatBytes } from './utils';
export type { Locale, I18nContext, TranslateFn, LocaleOption } from './types';

