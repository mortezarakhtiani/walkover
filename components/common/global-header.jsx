'use client';

import { usePathname } from 'next/navigation';
import { StoreHeader } from '@/store/components/common/store-header';

export function GlobalHeader() {
    const pathname = usePathname();

    // لندینگ اصلی و لندینگ جدید
    if (pathname === '/' || pathname === '/landing-v2') {
        return null;
    }

    // return <StoreHeader />;
}