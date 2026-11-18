import {BODY_MAX, TEXT_FILE_MAX_BYTES} from './constants';
import {formatCount, formatFileSize} from './format';

export type TextFileReadResult =
    | {ok: true; text: string; encoding: string}
    | {ok: false; error: string};

const isTxtName = (name: string) => /\.txt$/i.test(name.trim());
const isTextMime = (type: string) => type === '' || type.startsWith('text/plain');

/** Fast checks that need no file reading (name, type, size). Returns a Persian error or null. */
export function validateTextFileMeta(file: Pick<File, 'name' | 'type' | 'size'>): string | null {
    if (!isTxtName(file.name) || !isTextMime(file.type)) {
        return 'فقط فایل متنی با پسوند ‎.txt‎ قابل قبوله.';
    }
    if (file.size === 0) {
        return 'این فایل خالیه؛ یه فایل متنی که داخلش نوشته داره انتخاب کن.';
    }
    if (file.size > TEXT_FILE_MAX_BYTES) {
        return `حجم فایل (${formatFileSize(file.size)}) بیشتر از حد مجاز (${formatFileSize(TEXT_FILE_MAX_BYTES)}) است.`;
    }
    return null;
}

function decode(bytes: Uint8Array, encoding: string, fatal: boolean): string | null {
    try {
        return new TextDecoder(encoding, {fatal}).decode(bytes);
    } catch {
        return null;
    }
}

/**
 * Decodes a plain-text file. UTF-8 (with or without BOM) and UTF-16 (with BOM) are read directly;
 * files that are not valid UTF-8 fall back to Windows-1256, the legacy encoding Persian Windows
 * editors (e.g. Notepad on older systems) still produce.
 */
export function decodeTextBytes(bytes: Uint8Array): {text: string; encoding: string} | null {
    if (bytes[0] === 0xff && bytes[1] === 0xfe) {
        const text = decode(bytes, 'utf-16le', true);
        return text === null ? null : {text, encoding: 'utf-16le'};
    }
    if (bytes[0] === 0xfe && bytes[1] === 0xff) {
        const text = decode(bytes, 'utf-16be', true);
        return text === null ? null : {text, encoding: 'utf-16be'};
    }

    const utf8 = decode(bytes, 'utf-8', true);
    if (utf8 !== null) return {text: utf8, encoding: 'utf-8'};

    const legacy = decode(bytes, 'windows-1256', false);
    return legacy === null ? null : {text: legacy, encoding: 'windows-1256'};
}

function looksBinary(text: string): boolean {
    // NUL and other C0 control characters (except tab/newlines/form feed) never appear in real prose.
    // eslint-disable-next-line no-control-regex
    const controls = text.match(/[-\u0008\u000E-\u001F]/g);
    return text.includes('') || (controls?.length ?? 0) > Math.max(4, text.length * 0.01);
}

export function normalizeText(text: string): string {
    return text
        .replace(/^\uFEFF/, '')
        .replace(/\r\n?/g, '\n')
        .replace(/[ \t]+$/gm, '')
        .replace(/\n{4,}/g, '\n\n\n')
        .trim();
}

export async function readTextFile(file: File): Promise<TextFileReadResult> {
    const metaError = validateTextFileMeta(file);
    if (metaError) return {ok: false, error: metaError};

    let buffer: ArrayBuffer;
    try {
        buffer = await file.arrayBuffer();
    } catch {
        return {ok: false, error: 'خوندن فایل ممکن نشد. دوباره امتحان کن یا فایل دیگه‌ای انتخاب کن.'};
    }

    const decoded = decodeTextBytes(new Uint8Array(buffer));
    if (!decoded || looksBinary(decoded.text)) {
        return {ok: false, error: 'محتوای این فایل متن معتبری نیست. یه فایل ‎.txt‎ معمولی انتخاب کن.'};
    }

    const text = normalizeText(decoded.text);
    if (!text) {
        return {ok: false, error: 'این فایل خالیه؛ یه فایل متنی که داخلش نوشته داره انتخاب کن.'};
    }
    if (text.length > BODY_MAX) {
        return {
            ok: false,
            error: `متن این فایل ${formatCount(text.length)} کاراکتره؛ حداکثر ${formatCount(BODY_MAX)} کاراکتر مجازه.`,
        };
    }

    return {ok: true, text, encoding: decoded.encoding};
}
