import {toPersianDigits} from '@/lib/to-persian';

/** Persian digits with Persian thousands grouping, e.g. 15000 → ۱۵٬۰۰۰. */
export function formatCount(value: number): string {
    return value.toLocaleString('fa-IR');
}

/** Human-readable file size in Persian, e.g. 2048 → «۲ کیلوبایت». */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${toPersianDigits(bytes)} بایت`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${toPersianDigits(Math.max(1, Math.round(kb)))} کیلوبایت`;
    return `${toPersianDigits((kb / 1024).toFixed(1))} مگابایت`;
}
