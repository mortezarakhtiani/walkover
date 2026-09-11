'use client';

import {ShoppingCart} from 'lucide-react';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

export function Card1({showAddButton = true}) {
    const {showCartSheet} = useStoreClient();

    const {showCartSheet: openCart} = useStoreClient();

    return (
        <Card
            className="
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background
                shadow-sm
                p-0
            "
        >
            <CardContent
                className="
                    !m-0
                    !h-full
                    !p-0
                    flex
                    flex-wrap
                    items-stretch
                    justify-between
                    gap-5
                    sm:flex-nowrap
                "
            >
                {/* متن */}
                <div className="flex h-full flex-1 flex-col p-7.5">
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
                    <h3 className="mb-1 text-[26px] font-semibold text-mono">
                        کفش ورزشی مدل SKY ELUTE FF
                    </h3>

                    {/* توضیحات */}
                    <span className="text-sm font-normal leading-5.5 text-foreground">
        کفش ورزشی SKY ELITE FF با ظاهر اسپرت و رنگ‌بندی که در
        استایل‌های کژوال و ورزشی خوب دیده می‌شود
    </span>

                    <span className="text-base font-semibold text-mono mt-5">
            {toPersianDigits('14,000,000')}
                        <span className="ms-1 text-sm font-normal">
                تومان
            </span>
        </span>

                    {/* قیمت + سبد خرید */}
                    <div className="mt-auto flex items-center gap-4 pt-6">
                        {showAddButton && (
                            <Button
                                size="sm"
                                variant="mono"
                                onClick={showCartSheet}
                                className="p-4"
                            >
                                <ShoppingCart/>
                                افزودن به سبد خرید
                            </Button>
                        )}


                    </div>
                </div>

                {/* کادر تصویر */}
                <div
                    className="
                    w-[230px]
        shrink-0
        self-stretch
        overflow-hidden
        border-s
        border-border
    "
                >
                    <img
                        src="/images/hoodifront.webp"
                        alt="کفش ورزشی"
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

