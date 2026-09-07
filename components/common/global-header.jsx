'use client';

import { usePathname } from 'next/navigation';
import { StoreHeader } from '@/store/components/common/store-header';

export function GlobalHeader() {
    const pathname = usePathname();

    // لندینگ اصلی سایت
    if (pathname === '/') {
        return null;
    }

    return <StoreHeader />;
}