'use client';

import { motion } from 'framer-motion';
import { toPersianDigits } from '@/lib/to-persian';

type DiscountBadgeProps = {
  discount?: number | null;
};

export function DiscountBadge({
  discount,
}: DiscountBadgeProps) {
  if (discount == null || discount <= 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="
        absolute left-3 top-3 z-10
        rounded-xl bg-red-600
        px-3 py-1 text-xs font-bold text-white
      "
    >
      ٪{toPersianDigits(String(discount))} تخفیف
    </motion.div>
  );
}
