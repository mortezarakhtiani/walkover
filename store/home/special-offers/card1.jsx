
'use client';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/store/components/ui/button';
import { Card, CardContent } from '@/store/components/ui/card';
import { DiscountBadge } from '@/store/components/ui/discount-badge';
import { useStoreClient } from '@/store/components/context';
import { toPersianSplit } from '@/lib/to-persian';

export function Card1({ id, showAddButton = true }) {
    const { showCartSheet, showProductDetailsSheet } = useStoreClient();

    return (
        <Card
            className="relative isolate h-full cursor-pointer overflow-hidden rounded-md border border-white/10 bg-black p-0 text-white shadow-lg shadow-black/5 transition-shadow hover:shadow-xl"
            onClick={() => showProductDetailsSheet(id)}
        >
            {/* گرادینت کل کارت */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(255,255,255,0.3) -550%, transparent 100%)',
                }}
            />

            <CardContent className="relative z-10 !m-0 !h-full !p-0 flex flex-row items-stretch gap-0 bg-transparent text-white">
                {/* اطلاعات محصول */}
                <div
                    dir="rtl"
                    className="flex min-w-0 flex-1 flex-col p-3 text-right sm:p-5"
                >
                    {/* نشان تخفیف */}
                    <div className="mb-3">
                        <DiscountBadge discount={25} />
                    </div>

                    <h3 className="mb-2 text-base font-semibold leading-7 text-white sm:text-lg">
                        هودی ورزشی مدل SKY ELITE FF
                    </h3>

                    <p className="line-clamp-2 text-xs leading-6 text-white/65 sm:text-sm">
                        هودی ورزشی SKY ELITE FF با ظاهر اسپرت و رنگ‌بندی جذاب،
                        مناسب استایل‌های کژوال و ورزشی.
                    </p>

                    {/* قیمت‌ها و دکمه */}
                    <div className="mt-auto flex flex-col items-start gap-3 pt-5">
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-1 text-xs text-white/50">
                                <span className="line-through">
                                    {toPersianSplit('16,000,000')}
                                </span>
                                <span>تومان</span>
                            </div>

                            <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-bold text-white sm:text-xl">
                                    {toPersianSplit('14,000,000')}
                                </span>
                                <span className="text-xs font-medium text-white">
                                    تومان
                                </span>
                            </div>
                        </div>

                        {showAddButton && (
                            <Button
                                size="sm"
                                variant="mono"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    showCartSheet();
                                }}
                                className="h-10 shrink-0 gap-2 rounded-md border border-white/10 !bg-white px-3 text-sm text-black hover:bg-white/90"
                            >
                                <ShoppingCart className="size-4" />
                                افزودن به سبد خرید
                            </Button>
                        )}
                    </div>
                </div>

                {/* تصویر محصول */}
                <div className="relative w-[120px] shrink-0 self-stretch overflow-hidden sm:w-[220px] md:w-[280px]">
                    <img
                        src="/images/cloth%20(6).png"
                        alt="هودی ورزشی مدل SKY ELITE FF"
                        className="block h-full w-full object-cover object-top"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
