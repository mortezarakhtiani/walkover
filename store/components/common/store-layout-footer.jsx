'use client';

import { usePathname } from 'next/navigation';
import StoreFooter from '@/components/store-footer';

export default function StoreLayoutFooter() {
  const pathname = usePathname();

  // Checkout is intentionally a focused flow without the general storefront footer.
  if (pathname?.startsWith('/store/checkout')) return null;

  return <StoreFooter />;
}
