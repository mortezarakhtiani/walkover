
'use client';

import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/helpers';
import { toPersianDigits } from '@/lib/to-persian';
import { Badge } from '@/store/components/ui/badge';
import { Card, CardContent } from '@/store/components/ui/card';
import {DiscountBadge} from '@/store/components/ui/discount-badge'

export function Card4({limit}) {
    const items = [
        {
            logo: '11.png',
            title:
                'لپ‌تاپ مایکروسافت مدل Surface Laptop 7 Copilot Plus PC با پردازنده Snapdragon X Plus، رم LPDDR5x 16GB، حافظه SSD با ظرفیت 256GB، نمایشگر لمسی 13.8 اینچ',
            label: '۶۵٬۰۰۰٬۰۰۰ تومان',
            sku: 'MS-SL7-256    ',
            color: 'نقره‌ای',
            colorCode: '#C0C0C0',
            quantity: 1,
        },
        {
            logo: '12.png',
            title:
                'لپ‌تاپ مایکروسافت مدل Surface Laptop 7 Copilot Plus PC',
            label: '۵۸٬۵۰۰٬۰۰۰ تومان',
            sku: 'MS-SL7-512',
            color: 'نقره‌ای',
            colorCode: '#C0C0C0',
            quantity: 1,
        },
        {
            logo: '13.png',
            title:
                'لپ‌تاپ مایکروسافت مدل Surface Laptop 7 با پردازنده قدرتمند، نمایشگر لمسی و حافظه پرسرعت SSD',
            label: '۶۲٬۰۰۰٬۰۰۰ تومان',
            sku: 'MS-SL7-512',
            color: 'نقره‌ای',
            colorCode: '#C0C0C0',
            quantity: 2,
        },
        {
            logo: '15.png',
            title:
                'لپ‌تاپ مایکروسافت Surface Laptop 7 Copilot Plus PC با پردازنده Snapdragon X Plus',
            total: '۷۵٬۰۰۰٬۰۰۰ تومان',
            label: '۶۹٬۰۰۰٬۰۰۰ تومان',
            badge: true,
            sku: 'MS-SL7-256',
            color: 'نقره‌ای',
            colorCode: '#C0C0C0',
            quantity: 1,
        },
    ];

    const renderItem = (item, index) => {
        const mobileTitle =
            item.title.length > 55
                ? `${item.title.slice(0, 55)}...`
                : item.title;

        return (
            <Card
                key={index}
                className="
                    min-w-0
                    overflow-hidden
                    h-auto
                    min-h-[145px]
                    sm:h-[150px]
                "
            >
                <CardContent
                    className="
                        flex
                        min-w-0
                        h-full
                        items-center
                        gap-3
                        p-3
                        sm:gap-4
                    "
                >

                    {/* تصویر محصول */}
                    <Card className="relative flex h-[78px] w-[82px] shrink-0 items-center justify-center bg-muted-foreground/10 shadow-none sm:h-[90px] sm:w-[110px]">
    <img
        src={toAbsoluteUrl(
            `/media/store/client/600x600/${item.logo}`
        )}
        className="h-full w-full object-contain"
        alt={item.title}
    />

    <DiscountBadge discount={item.discount} />
</Card>

                    {/* اطلاعات محصول */}
                    <div
                        className="
                            flex
                            min-w-0
                            flex-1
                            flex-col
                            justify-center
                            overflow-hidden
                        "
                    >

                        {/* عنوان */}
                        <Link
                            href="#"
                            title={item.title}
                            className="
                                block
                                min-w-0
                                text-sm
                                font-medium
                                leading-6
                                text-mono
                                hover:text-primary
                                sm:line-clamp-3
                                line-clamp-2
                            "
                        >
                            {/* موبایل */}
                            <span className="sm:hidden">
                                {mobileTitle}
                            </span>

                            {/* دسکتاپ */}
                            <span className="hidden sm:inline">
                                {item.title}
                            </span>
                        </Link>

                        {/* مشخصات */}
                        <div
                            className="
                                mt-2
                                flex
                                min-w-0
                                flex-wrap
                                items-center
                                gap-x-4
                                gap-y-1.5
                                text-xs
                                text-secondary-foreground
                            "
                        >

                            {/* رنگ */}
                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                                <span>رنگ:</span>

                                <span className="flex items-center gap-1.5 font-medium text-foreground">
                                    <span
                                        className="
                                            h-3.5
                                            w-3.5
                                            shrink-0
                                            rounded-full
                                            border
                                            border-border
                                            shadow-sm
                                        "
                                        style={{
                                            backgroundColor: item.colorCode,
                                        }}
                                    />

                                    {item.color}
                                </span>
                            </span>

                            {/* کد کالا */}
                            <span className="whitespace-nowrap">
                                کد کالا:
                                <span className="ms-1 font-medium text-foreground">
                                    {item.sku}
                                </span>
                            </span>

                            {/* تخفیف */}
                            {item.badge && (
                                <div className="w-fit shrink-0">
                                    <Badge
                                        size="sm"
                                        variant="destructive"
                                        className="w-fit text-[10px]"
                                    >
                                        تخفیف
                                    </Badge>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* تعداد و قیمت */}
                    <div
                        className="
                            flex
                            h-full
                            w-[105px]
                            shrink-0
                            flex-col
                            items-end
                            justify-center
                            gap-2
                            sm:w-[145px]
                        "
                    >

                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                            تعداد: {toPersianDigits(item.quantity || 1)} عدد
                        </span>

                        <div className="flex flex-col items-end gap-0.5">

                            {item.total && (
                                <span className="whitespace-nowrap text-xs text-muted-foreground line-through">
                                    {item.total}
                                </span>
                            )}

                            <span className="whitespace-nowrap text-sm font-semibold text-mono">
                                {item.label}
                            </span>

                        </div>
                    </div>

                </CardContent>
            </Card>
        );
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {items.slice(0, limit).map((item, index) =>
                renderItem(item, index)
            )}
        </div>
    );
}

