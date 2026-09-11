'use client';

import {ShoppingCart} from 'lucide-react';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

export function Card2({
    bgColor,
    borderColor,
    title,
    discount,
    total,
    logo,
    originalPrice,
    showAddButton = true,
}) {
    const {showCartSheet} = useStoreClient();

    return (
        <Card
            className={`
                h-full
                rounded-2xl
                border
                border-border
                bg-background
                shadow-sm
                ${bgColor || ''}
            `}
        >
            <CardContent className="flex flex-col items-center justify-center px-5 pb-5">

                {/* تصویر */}
                <img
                    src={logo}
                    className="
                        mb-12
                        mt-5
                        h-[200px]
                        rounded-xl
                        object-contain
                    "
                    alt={title}
                />

                {/* عنوان */}
                <span className="mb-4 text-base font-medium text-mono">
                    {title}
                </span>

                {/* قیمت و تخفیف */}
                <div className="mb-4 flex w-full items-end justify-between gap-3">

                    {/* تخفیف */}
                    <Badge
                        size="sm"
                        variant="destructive"
                        className="uppercase"
                    >
                        {toPersianDigits(discount)}%
                    </Badge>

                    {/* قیمت‌ها */}
                    <div
                        className="flex flex-col items-end gap-1"
                        dir="rtl"
                    >

                        {originalPrice && (
                            <span className="text-xs font-normal text-muted-foreground line-through decoration-[1px]">
                {toPersianDigits(originalPrice)} تومان
            </span>
                        )}
        <span className="text-sm font-semibold text-mono">
            {toPersianDigits(total)} تومان
        </span>


                    </div>

                </div>

                {/* افزودن به سبد خرید */}
                {showAddButton && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-full p-4"
                        onClick={showCartSheet}
                    >
                        <ShoppingCart className="size-4"/>
                        افزودن به سبد خرید
                    </Button>
                )}

            </CardContent>
        </Card>
    );
}