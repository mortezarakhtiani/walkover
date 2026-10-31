'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function HeaderSearch({ className, ...props }) {
    return (
        <div
            className={cn(
                'relative mr-auto min-w-0 w-full max-w-[480px] flex-1',
                className
            )}
        >
            <Search
                aria-hidden="true"
                className="absolute right-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
            />

            <Input
                id="search-input"
                type="search"
                placeholder="جستجو"
                aria-label="جستجو"
                className="h-12 w-full rounded-md border-0 !bg-white/5 px-3 pr-9 text-right text-sm"
                {...props}
            />
        </div>
    );
}
