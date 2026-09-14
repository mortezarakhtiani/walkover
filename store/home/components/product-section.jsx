'use client';

import Link from 'next/link';
import {ChevronRight, Flame} from 'lucide-react';

import {Button} from '@/store/components/ui/button';
import {Card2} from '@/store/components/common/card2';

export function ProductSection({
                                   title = 'پرفروش‌ترین‌ها',
                                   items = [],
                                   showAddButton = true,
                                   showSeeAll = true,
                                   moreButton = 'نمایش بیشتر',
                                   moreButtonHref = '/store/search-results-grid',
                                   showHeader = true,
                               }) {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                shadow-sm
                max-md:rounded-l-none
                md:pl-5
                mt-16
            "
        >

            {/* Header - خارج از px-5 */}
            {showHeader && (
                <div
                    className="
                    mr-5
                    relative
                    mb-3
                    rounded-xl
                    bg-white/8
                    p-3
                    md:p-5
                    max-md:rounded-l-none
                "
                >
                    <div
                        className="
                        flex
                        items-center
                        justify-between
                        gap-2
                    "
                    >

                        {/* Title */}
                        <div className="flex items-center gap-1.5 md:gap-3">
                            <div
                                className="
                                flex
                                size-8
                                shrink-0
                                items-center
                                justify-center
                                md:size-11
                            "
                            >
                                <div
                                    className="
        relative
        flex
        size-8
        shrink-0
        items-center
        justify-center
        md:size-11
    "
                                >
                                    {/* شعله نارنجی */}
                                    <Flame
                                        className="absolute size-6 text-orange-500 md:size-8"
                                        fill="currentColor"
                                    />

                                    {/* شعله زرد داخلی */}
                                    <Flame
                                        className="absolute size-3.5 translate-y-[2px] text-yellow-300 md:size-4.5"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>

                            <div>
                                <h2
                                    className="
                                    text-sm
                                    font-semibold
                                    text-mono
                                    md:text-lg
                                "
                                >
                                    {title}
                                </h2>

                                <p
                                    className="
                                    mt-0.5
                                    text-[9px]
                                    text-muted-foreground
                                    md:mt-1
                                    md:text-xs
                                "
                                >
                                    ببین چه طرح های خفنی داریم
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

            )}

            {/* Products - داخل px-5 */}
            <div className="pr-5">
                <div
                    dir="rtl"
                    className="
                        flex
                        w-full
                        gap-3
                        overflow-x-auto
                        snap-x
                        snap-mandatory
                        pb-2
                        [scrollbar-width:none]
                        [-ms-overflow-style:none]
                        [&::-webkit-scrollbar]:hidden

                        sm:grid
                        sm:grid-cols-2
                        sm:gap-5
                        sm:overflow-visible
                        sm:pb-0

                        xl:grid-cols-4
                    "
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="
                                w-[39vw]
                                min-w-[39vw]
                                shrink-0
                                snap-start

                                sm:w-auto
                                sm:min-w-0
                                sm:shrink
                            "
                        >
                            <Card2
                                id={item.id}
                                logo={item.logo}
                                star={item.rating}
                                title={item.title}
                                total={item.price}
                                showAddButton={showAddButton}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}