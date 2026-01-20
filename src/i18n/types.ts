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
