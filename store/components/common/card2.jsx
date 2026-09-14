
'use client';

import {ShoppingCart, Star} from 'lucide-react';

import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

export function Card2({
    id,
    badge,
    logo,
    title,
    total,
    star,
    label,
    showAddButton = true,
}) {
    const {showCartSheet, showProductDetailsSheet} = useStoreClient();

    return (
        <Card
            className="
                cursor-pointer
                group
                overflow-hidden
                rounded-2xl
            "
            onClick={() => showProductDetailsSheet(id)}
        >
            <CardContent
                className="
                    flex
                    flex-col
                    justify-between
                    gap-4
                    p-0

                    sm:p-2.5
                "
            >

                <div className="mb-[10px]">

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
                            mb-2
                            mt-0
                            shadow-none

                            sm:h-[180px]
                            sm:aspect-auto
                            sm:mb-5
                            sm:mt-5
                        "
                    >
                        {badge && (
                            <Badge
                                size="sm"
                                variant="destructive"
                                className="
                                    absolute
                                    top-2
                                    right-2
                                    uppercase
                                    text-[10px]

                                    sm:text-xs
                                "
                            >
                                <span>
                                    {toPersianDigits('40%')} تخفیف
                                </span>
                            </Badge>
                        )}

                        <img
                            src={toAbsoluteUrl(logo)}
                            className="
                                h-full
                                w-full
                                shrink-0
                                rounded-none
                                object-cover

                                sm:h-[180px]
                                sm:w-auto
                                sm:rounded-2xl
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
                            hover:text-primary
                            text-[11px]
                            font-medium
                            text-mono
                            px-2
                            leading-4
                            text-right

                            sm:text-sm
                            sm:px-2.5
                            sm:leading-5.5
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
    text-[10px]

    sm:h-auto
    sm:p-2.5
    sm:text-xs
"
                            onClick={(event) => {
                                event.stopPropagation();
                                showCartSheet();
                            }}
                        >
                            <ShoppingCart className="size-3.5 sm:size-4"/>
                            افزودن
                        </Button>
                    )}

                    {/* قیمت */}
                    <div
                        className="
                            flex
                            flex-col
                            items-end
                            gap-0.5
                        "
                    >

                        {/* قیمت خط خورده */}
                        {label && (
                            <span
                                className="
                                    text-[9px]
                                    font-normal
                                    leading-3
                                    text-secondary-foreground
                                    line-through

                                    sm:text-xs
                                    sm:leading-normal
                                "
                            >
                                {toPersianDigits(label)} تومان
                            </span>
                        )}

                        {/* قیمت اصلی */}
                        <span
                            className="
                                text-[11px]
                                font-medium
                                leading-4
                                text-mono

                                sm:text-sm
                                sm:leading-normal
                            "
                        >
                            {toPersianDigits(total)} تومان
                        </span>

                    </div>

                </div>

            </CardContent>
        </Card>
    );
}

