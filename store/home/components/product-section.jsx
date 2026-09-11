
'use client';

import Link from 'next/link';
import {ChevronRight, ShoppingBag} from 'lucide-react';

import {Button} from '@/store/components/ui/button';
import {Card2} from '@/store/components/common/card2';

export function ProductSection({
    title = 'پرفروش‌ترین‌ها',
    items = [],
    showAddButton = true,
    showSeeAll = true,
    moreButton = 'نمایش بیشتر',
    moreButtonHref = '/store/search-results-grid',
}) {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                p-5
                shadow-sm
            "
        >
            {/* Header */}
            {/* Header */}
<div
    className="
        relative
        mb-5
        rounded-xl
        p-3
        bg-primary/5
        dark:bg-indigo-600/10
    "
>
    <div
        className="
            flex
            items-center
            justify-between
            gap-4
        "
    >
        {/* Title */}
        <div className="flex items-center gap-3">
            <div
                className="
                    flex
                    size-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-primary
                "
            >
                {/* آیکون پرفروش‌ترین‌ها */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m12 3 1.912 5.813a2 2 0 0 0 1.902 1.37h6.11l-4.94 3.59a2 2 0 0 0-.727 2.236l1.888 5.806-4.933-3.598a2 2 0 0 0-2.424 0l-4.933 3.598 1.888-5.806a2 2 0 0 0-.727-2.236l-4.94-3.59h6.11a2 2 0 0 0 1.902-1.37L12 3z"/>
                </svg>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-mono">
                    {title}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                    محبوب‌ترین محصولات فروشگاه
                </p>
            </div>
        </div>

        {/* See All */}
        {showSeeAll && (
            <Button mode="link" asChild>
                <Link
                    href={moreButtonHref}
                    className="flex items-center gap-1 text-xs"
                >
                    <ChevronRight className="size-4"/>
                    {moreButton}

                </Link>
            </Button>
        )}
    </div>
</div>

            {/* Products */}
            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >
                {items.map((item) => (
                    <Card2
                        key={item.id}
                        id={item.id}
                        logo={item.logo}
                        star={item.rating}
                        title={item.title}
                        total={item.price}
                        showAddButton={showAddButton}
                    />
                ))}
            </div>
        </div>
    );
}

