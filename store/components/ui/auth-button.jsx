'use client';

import Link from 'next/link';
import {User} from 'lucide-react';

export function AuthButton() {
    return (
        <Link
            href="/login"
            dir="rtl"
            aria-label="ورود یا ثبت‌نام"
            className="
    inline-flex
    h-12
    shrink-0
    items-center
    justify-center
    gap-2
    rounded-md
    border
    border-border/70
    bg-foreground
    px-3
    text-sm
    font-medium
    text-background
    transition-colors
    duration-200
    sm:px-4
"
        >
            <User
                className="size-[17px] shrink-0"
                strokeWidth={1.8}
            />

            <span className="whitespace-nowrap">
                ورود | ثبت‌نام
            </span>
        </Link>
    );
}
