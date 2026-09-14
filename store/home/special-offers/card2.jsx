'use client';

import {ShoppingCart, Star} from 'lucide-react';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

export function Card2({
                          productId,
                          bgColor,
                          borderColor,
                          title,
                          discount,
                          total,
                          logo,
                          originalPrice,
                          star,
                          showAddButton = true,
                      }) {
    const {
        showCartSheet,
        showProductDetailsSheet,
    } = useStoreClient();

    const handleProductClick = () => {
        if (!productId) {
            console.warn('Card2: productId is missing');
            return;
        }

        showProductDetailsSheet(productId);
    };

    return (
        <Card
            className={`
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background
                shadow-sm
                ${bgColor || ''}
                ${borderColor || ''}
            `}
        >
            <CardContent
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    p-0

                    md:px-5
                    md:pb-5
                "
            >

                {/* بخش قابل کلیک محصول */}
                <div
                    className="flex w-full cursor-pointer flex-col items-center"
                    onClick={handleProductClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleProductClick();
                        }
                    }}
                >

                    {/* تصویر */}
                    <img
                        src={logo}
                        className="
                            mt-0
                            mb-2
                            h-auto
                            w-full
                            aspect-square
                            rounded-none
                            object-cover

                            md:mt-4
                            md:mb-3
                            md:size-36
                            md:h-auto
                            md:w-auto
                            md:aspect-auto
                            md:rounded-xl
                            md:object-contain

                            lg:mt-5
                            lg:mb-8
                            lg:size-40

                            xl:mb-12
                            xl:size-[200px]
                        "
                        alt={title}
                    />

                    {/* امتیاز */}
<div
    className="
        mb-2
        flex
        w-full
        justify-end
        px-2

        md:px-0
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

            md:gap-1
            md:text-xs
        "
    >
        <Star
            className="
                size-3
                text-yellow-500
                -mt-0.5

                md:size-4
            "
            style={{fill: 'currentColor'}}
        />

        <span>
            {toPersianDigits(star)}
        </span>
    </Badge>
</div>

                    {/* عنوان */}
                    <span
                        className="
        mb-2
        line-clamp-2
        w-full
        px-2
        text-[11px]
        font-medium
        leading-4
        text-mono
        text-right

        md:mb-4
        md:w-auto
        md:px-0
        md:text-base
        md:leading-normal
    "
                    >
                        {title}
                    </span>

                    {/* قیمت و تخفیف */}
                    <div
                        className="
                            mb-2
                            flex
                            w-full
                            items-end
                            justify-between
                            gap-1
                            px-2

                            md:mb-4
                            md:gap-3
                            md:px-0
                        "
                        dir="rtl"
                    >

                        {/* تخفیف */}
                        {discount !== undefined && discount !== null && (
                            <Badge
                                size="sm"
                                variant="destructive"
                                className="
    px-1.5
    py-0.5
    text-[10px]

    md:px-2
    md:py-1
    md:text-xs
"
                            >
                                {toPersianDigits(String(discount))}٪
                            </Badge>
                        )}

                        {/* قیمت‌ها */}
                        <div
                            className="
                                flex
                                flex-col
                                items-end
                                gap-0.5

                                md:gap-1
                            "
                            dir="rtl"
                        >
                            {originalPrice && (
                                <span
                                    className="
    text-[9px]
    font-normal
    leading-3
    text-muted-foreground
    line-through
    decoration-[1px]

    md:text-xs
    md:leading-normal
"
                                >
                                    {toPersianDigits(
                                        String(originalPrice)
                                    )}{' '}
                                    تومان
                                </span>
                            )}

                            <span
                                className="
    text-[11px]
    font-semibold
    leading-4
    text-mono

    md:text-sm
    md:leading-normal
"
                            >
                                {toPersianDigits(String(total))} تومان
                            </span>
                        </div>

                    </div>
                </div>

                {/* دکمه افزودن به سبد */}
                {showAddButton && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="
        mb-2
        h-8
        w-[calc(100%-16px)]
        px-2
        text-[10px]

        md:mb-0
        md:h-auto
        md:w-full
        md:p-2.5
        md:text-xs
    "
                        onClick={(e) => {
                            e.stopPropagation();
                            showCartSheet();
                        }}
                    >
                        <ShoppingCart className="size-3.5 md:size-4"/>
                        افزودن به سبد خرید
                    </Button>
                )}

            </CardContent>
        </Card>
    );
}

