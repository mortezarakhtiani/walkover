export function toPersianDigits(value) {
    return String(value).replace(
        /\d/g,
        (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]
    );
}

export function toPersianSplit(value) {
    const normalized = String(value)
        .replace(/,/g, '')
        .replace(/٬/g, '');

    return Number(normalized).toLocaleString('fa-IR');
}