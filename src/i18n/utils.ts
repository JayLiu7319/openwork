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
            secondsAgo: (n: number) => `${n}s ago`,
            minutesAgo: (n: number) => `${n}m ago`,
            hoursAgo: (n: number) => `${n}h ago`,
            daysAgo: (n: number) => `${n}d ago`,
            weeksAgo: (n: number) => `${n}w ago`,
            monthsAgo: (n: number) => `${n}mo ago`,
            yearsAgo: (n: number) => `${n}y ago`,
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
