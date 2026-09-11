'use client';

import {ShoppingCart} from 'lucide-react';

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
                rounded-2xl
                border
                border-border
                bg-background
                shadow-sm
                ${bgColor || ''}
                ${borderColor || ''}
            `}
        >
            <CardContent className="flex flex-col items-center justify-center px-5 pb-5">

                {/* =========================
                    بخش قابل کلیک محصول
                    ========================= */}
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
                            mb-12
                            mt-5
                            h-[200px]
                            w-[200px]
                            rounded-xl
                            object-contain
                        "
                        alt={title}
                    />

                    {/* عنوان */}
                    <span className="mb-4 text-base font-medium text-mono text-center">
                        {title}
                    </span>

                    {/* قیمت و تخفیف */}
                    <div
                        className="mb-4 flex w-full items-end justify-between gap-3"
                        dir="rtl"
                    >

                        {/* تخفیف */}
                        {discount !== undefined && discount !== null && (
                            <Badge
                                size="sm"
                                variant="destructive"
                                className="uppercase"
                            >
                                {toPersianDigits(String(discount))}٪
                            </Badge>
                        )}

                        {/* قیمت‌ها */}
                        <div
                            className="flex flex-col items-end gap-1"
                            dir="rtl"
                        >
                            {originalPrice && (
                                <span className="text-xs font-normal text-muted-foreground line-through decoration-[1px]">
                                    {toPersianDigits(
                                        String(originalPrice)
                                    )}{' '}
                                    تومان
                                </span>
                            )}

                            <span className="text-sm font-semibold text-mono">
                                {toPersianDigits(String(total))} تومان
                            </span>
                        </div>

                    </div>
                </div>

                {/* =========================
                    دکمه افزودن به سبد
                    ========================= */}
                {showAddButton && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-full p-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            showCartSheet();
                        }}
                    >
                        <ShoppingCart className="size-4" />
                        افزودن به سبد خرید
                    </Button>
                )}

            </CardContent>
        </Card>
    );
}