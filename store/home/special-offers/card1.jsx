'use client';

import {ShoppingCart} from 'lucide-react';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

export function Card1({
                          id,
                          showAddButton = true,
                      }) {
    const {
        showCartSheet,
        showProductDetailsSheet,
    } = useStoreClient();

    return (
        <Card
            className="
                h-full
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background
                shadow-sm
                p-0
            "
            onClick={() => showProductDetailsSheet(id)}
        >
            <CardContent
                className="
        !m-0
        !h-full
        !p-0
        flex
        flex-row
        flex-nowrap
        items-stretch
        gap-0
    "
            >
                {/* متن */}
                <div
                    dir="rtl"
                    className="flex min-w-0 flex-1 flex-col p-4 text-right md:p-7.5"
                >

                    {/* تخفیف */}
                    <div className="mb-3">
                        <Badge
                            size="sm"
                            variant="destructive"
                            className="uppercase"
                        >
                            {toPersianDigits('25%')}
                            <span>تخفیف</span>
                        </Badge>
                    </div>

                    {/* عنوان */}
                    <h3 className="mb-1 text-lg font-semibold text-mono md:text-[26px]">
                        هودی ورزشی مدل SKY ELUTE FF
                    </h3>

                    {/* توضیحات */}
                    <span className="text-xs font-normal leading-5 md:text-sm md:leading-5.5 text-foreground">
            هودی ورزشی SKY ELITE FF با ظاهر اسپرت و رنگ‌بندی که در
            استایل‌های کژوال و ورزشی خوب دیده می‌شود
        </span>

                    {/* قیمت + سبد خرید */}
                    <div className="mt-auto flex flex-col items-start gap-3 pt-6">

                        {/* قیمت */}
                        <div className="flex flex-col items-start gap-1">

                <span
                    dir="rtl"
                    className="
                        flex
                        flex-row-reverse
                        items-center
                        gap-1
                        text-xs
                        text-muted-foreground
                        line-through
                    "
                >
                    <span>تومان</span>

                    <span>
                        {toPersianDigits('16,000,000')}
                    </span>
                </span>

                            <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-foreground md:text-xl">
                        {toPersianDigits('14,000,000')}
                    </span>

                                <span className="text-base font-bold text-foreground md:text-xl">
                        تومان
                    </span>
                            </div>
                        </div>

                        {/* سبد خرید */}
                        {showAddButton && (
                            <Button
                                size="sm"
                                variant="mono"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    showCartSheet();
                                }}
                                className="shrink-0 p-3 md:p-4"
                            >
                                <ShoppingCart/>
                                افزودن به سبد خرید
                            </Button>
                        )}

                    </div>
                </div>

                {/* کادر تصویر - سمت چپ */}
                <div
                    className="
        w-[180px]
        shrink-0
        self-stretch
        overflow-hidden
        border-r
        border-border
        md:w-[300px]
    "
                >
                    <img
                        src="/images/mainblackhoodi.webp"
                        alt="هودی ورزشی"
                        className="
            block
            h-full
            w-full
            object-cover
            object-top
        "
                    />
                </div>

            </CardContent>
        </Card>
    );
}