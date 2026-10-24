'use client';

import {ShoppingCart, Star} from 'lucide-react';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits, toPersianSplit} from '@/lib/to-persian';

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
                relative
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
            {/* نشان تخفیف در بالای سمت راست کارت */}
            {discount != null && Number(discount) > 0 && (
                <Badge
                    size="sm"
                    variant="destructive"
                    className="
            absolute
            right-2
            top-2
            z-10
            border-0
            bg-red-600
            px-1.5
            py-0.5
            text-white
            !text-[13px]
            md:px-2
            md:py-1
            md:text-xs
        "
                >
                    %{toPersianDigits(String(discount))}
                    <span className="!text-[10px]">تخفیف</span>
                </Badge>
            )}

            <CardContent
                className="
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-start
                    p-0
                    pb-2

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
                        <img
                            src={logo}
                            className="
                            m-50
      h-[300px]
w-[300px]
      shrink-0
      rounded-none
      object-contain
      sm:h-full
      sm:w-auto
      sm:max-w-full
      sm:rounded-2xl
    "
                            alt={title}
                        />
                    </div>

                    <div className="md:px-5">

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

                        {/* قیمت‌ها و امتیاز */}
                        <div
                            className="mb-2 flex w-full items-end justify-between gap-1 px-2 md:mb-4 md:gap-3 md:px-0"
                            dir="rtl"
                        >


                            {/* امتیاز روبه‌روی قیمت نهایی */}
                            <Badge
                                size="sm"
                                variant="secondary"
                                shape="circle"
                                className="rounded-full gap-0.5 text-yellow-500 text-[10px] md:gap-1 md:text-xs"
                            >
                                <Star
                                    className="size-3 text-yellow-500 -mt-0.5 md:size-4"
                                    style={{fill: 'currentColor'}}
                                />
                                <span>{toPersianDigits(star)}</span>
                            </Badge>

                            {/* قیمت‌ها */}
                            <div className="flex flex-col items-end gap-0.5 md:gap-1">
                                {/* فضای ثابت برای قیمت قبلی */}
                                <span
                                    className="h-3 text-[9px] font-normal leading-3 text-muted-foreground md:h-4 md:text-xs md:leading-normal">
        {originalPrice
            ? toPersianSplit(String(originalPrice))
            : '\u00A0'}
    </span>

                                {/* قیمت نهایی و تومان در یک ردیف */}
                                <div className="flex flex-row items-center gap-1 whitespace-nowrap">
        <span className="text-[11px] font-semibold leading-4 text-mono md:text-sm md:leading-normal">
            {toPersianSplit(String(total))}
        </span>

                                    <span className="text-[9px] sm:text-[11px]">
            تومان
        </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* دکمه افزودن به سبد */}
                    {showAddButton && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="
                            mt-auto
                            mb-2
                            h-8
                            w-[calc(100%-16px)]
                            px-2

                            text-[10px]
                            border-0
                            bg-foreground/3
                            transition-colors
                            duration-200
                            md:mb-0
                            md:h-auto
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

                </div>
            </CardContent>
        </Card>
    );
}