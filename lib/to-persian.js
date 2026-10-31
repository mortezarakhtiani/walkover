// export function toPersianDigits(value) {
//     return String(value).replace(
//         /\d/g,
//         (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]
//     );
// }

export function toPersianSplit(value) {
    const normalized = String(value)
        .replace(/,/g, '')
        .replace(/٬/g, '');

    return Number(normalized).toLocaleString('fa-IR');
}


/* Same API as the previous storefront's `@/lib/to-persian`. */
const FA = "۰۱۲۳۴۵۶۷۸۹";

export function toPersianDigits(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\d/g, (d) => FA[d]);
}

/** Old store formatting: en-US grouping, then Persian digits (e.g. ۱,۲۵۰,۰۰۰). */
export function formatToman(amount) {
  return toPersianDigits(Number(amount).toLocaleString("en-US"));
}
