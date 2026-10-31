/*
 * Price presentation from the previous storefront: Persian digits, «تومان», the original price
 * struck through above the current one, and a rounded «٪ تخفیف» badge.
 * With no price yet (the store isn't connected) it says so instead of inventing one.
 */

import { formatToman, toPersianDigits } from "@/lib/to-persian";

export function DiscountBadge({ discount, className = "" }) {
  if (!(discount > 0)) return null;
  return (
    <span className={`inline-flex items-center rounded-full bg-[var(--store-destructive)] px-3 py-0.5 text-sm font-medium text-white ${className}`}>
      {toPersianDigits(String(discount))}٪ تخفیف
    </span>
  );
}

export default function PriceTag({ product, size = "md" }) {
  const lg = size === "lg";
  if (product.price == null) {
    return <span className={`${lg ? "text-lg" : "text-sm"} text-[var(--store-muted)]`}>قیمت: به‌زودی</span>;
  }
  return (
    <div className="flex flex-col items-start gap-1">
      {product.originalPrice ? (
        <span className="text-sm text-[var(--store-muted)] line-through">{formatToman(product.originalPrice)} تومان</span>
      ) : null}
      <div className="flex items-baseline gap-1">
        <span className={`${lg ? "text-2xl sm:text-3xl" : "text-lg"} font-bold text-[var(--store-mono)]`}>{formatToman(product.price)}</span>
        <span className="text-sm font-medium text-[var(--store-mono)]">تومان</span>
      </div>
    </div>
  );
}
