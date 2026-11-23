
'use client';

import { ShoppingCart, Star } from 'lucide-react';

import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/store/components/ui/badge';
import { Button } from '@/store/components/ui/button';
import { Card, CardContent } from '@/store/components/ui/card';
import { useStoreClient } from '@/store/components/context';
import { toPersianDigits, toPersianSplit } from '@/lib/to-persian';
import {DiscountBadge} from "@/store/components/ui/discount-badge";

export function Card2({
    id,
    badge,
    logo,
    title,
    discount,
    total,
    star,
    label,
    showAddButton = true,
}) {
    const { showCartSheet, showProductDetailsSheet } = useStoreClient();

    return (
        <Card
            className="
                relative
                cursor-pointer
                group
                overflow-hidden
                rounded-3xl
                border-0
                border-blue-500/25
                transition-all
                duration-300
            "
            onClick={() => showProductDetailsSheet(id)}
        >

            <img
                src="/icons/frame5.jpg"
                alt=""
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        w-full
        rounded-md
        object-fill
        opacity-90
    "
            />
            {/* نور آبی اطراف کارت */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    opacity-70
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    {/*bg-[radial-gradient(ellipse_at_50%_25%,rgba(20,75,170,0.20)_0%,rgba(10,40,100,0.12)_35%,rgba(5,15,35,0.04)_65%,transparent_85%)]*/}
                "
            />

            {/* هاله آبی پایین کارت */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    left-1/2
                    z-0
                    h-48
                    w-[85%]
                    -translate-x-1/2
                    rounded-full
                    {/*bg-blue-600/10*/}
                    blur-[65px]
                    transition-all
                    duration-500
                    {/*group-hover:bg-blue-500/20*/}
                    {/*group-hover:blur-[75px]*/}
                "
            />

            {badge && <DiscountBadge discount={discount}/>}

            <CardContent
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    justify-between
                    gap-4
                    p-0
                    sm:p-2.5
                "
            >

                <div>
                    {/* تصویر */}
                    <div
                        className="
                            relative
                            flex
                            w-full
                            aspect-square
                            items-center
                            justify-center
                            overflow-hidden
                            mt-0
                            shadow-none
                            sm:h-[280px]
                            sm:aspect-auto
                        "
                    >

                        {/* فریم ترسناک سفید پشت تصویر */}

                        <img
                            src={toAbsoluteUrl(logo)}
                            className="
        relative
        z-10
        h-full
        w-full
        shrink-0
        rounded-none
        object-cover
        sm:h-[280px]
        sm:w-auto
        sm:rounded-md
        sm:object-contain
    "
                            alt={title}
                        />
                    </div>

                    {/* امتیاز */}
                    <div
                        className="
                            flex
                            justify-end
                            mb-2
                            px-2
                            sm:px-2.5
                        "
                        dir="ltr"
                    >
                        <Badge
                            size="sm"
                            variant="secondary"
                            shape="circle"
                            className="
                                rounded-full
                                gap-0.5
                                text-yellow-500
                                text-[10px]
                                sm:gap-1
                                sm:text-xs
                            "
                        >
                            <Star
                                className="
                                    size-3
                                    text-yellow-500
                                    -mt-0.5
                                    sm:size-4
                                "
                                style={{fill: 'currentColor'}}
                            />

                            <span>
                                {toPersianDigits(star)}
                            </span>
                        </Badge>
                    </div>

                    {/* عنوان */}
                    <div
                        className="
        hover:text-blue-300
        text-[11px]
        font-semibold
        text-mono
        px-2
        leading-4
        text-right
        transition-colors
        sm:text-base
        sm:px-2.5
        sm:leading-8
    "
                    >
                        {title}
                    </div>
                </div>

                {/* قیمت + دکمه افزودن */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-2
                        px-2
                        pb-1
                        sm:gap-4
                        sm:px-2.5
                    "
                >
                    {/* دکمه افزودن */}
                    {showAddButton && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="
                                shrink-0
                                h-8
                                px-3
                                py-1.5
                                border
                                border-blue-500/30
                                bg-blue-600/10
                                text-blue-300
                                transition-all
                                duration-300
                                hover:border-blue-400/10
                                hover:bg-blue-600/20
                                hover:text-white
                                hover:shadow-[0_0_16px_rgba(37,99,235,0.35)]
                                sm:h-11
                                sm:w-11
                                sm:p-0
                                sm:justify-center
                            "
                            onClick={(event) => {
                                event.stopPropagation();
                                showCartSheet();
                            }}
                        >
                            <ShoppingCart
                                className="
                                    size-3.5
                                    sm:size-5
                                    md:size-[22px]
                                "
                            />
                        </Button>
                    )}

                    {/* قیمت */}
                    <div className="flex flex-col items-end gap-0.5">
                        {/* قیمت قبلی */}
                        <span className="h-3 text-[9px] leading-3 md:h-4 md:text-xs md:leading-normal">
                            {label ? (
                                <span className="font-bold text-muted-foreground line-through decoration-[1px]">
                                    {toPersianSplit(label)}
                                </span>
                            ) : null}
                        </span>

                        {/* قیمت نهایی */}
                        <div className="flex flex-row items-center gap-1 whitespace-nowrap">
                            <span
                                className="text-[11px] font-medium leading-4 text-mono sm:text-base sm:leading-normal">
                                {toPersianSplit(total)}
                            </span>

                            <span className="text-[9px] sm:text-[11px]">
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
