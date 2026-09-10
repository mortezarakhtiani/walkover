'use client';

import Link from 'next/link';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Card, CardContent} from '@/store/components/ui/card';

const toPersianDigits = (value) =>
    String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]);

export function Card4({limit}) {
    const items = [
        {
            logo: '11.png',
            title:
                'لپ‌تاپ مایکروسافت مدل Surface Laptop 7 Copilot Plus PC با پردازنده Snapdragon X Plus، رم LPDDR5x 16GB، حافظه SSD با ظرفیت 256GB، نمایشگر لمسی 13.8 اینچ',
            label: '۶۵٬۰۰۰٬۰۰۰ تومان',
            sku: 'MS-SL7-256',
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

    const renderItem = (item, index) => (
        <Card
            key={index}
            className="h-[150px] min-w-0"
        >
            <CardContent className="h-full flex items-center gap-4 p-3">

                {/* تصویر ثابت */}
                <Card className="shrink-0 flex items-center justify-center bg-accent/50 h-[90px] w-[110px] shadow-none">
                    <img
                        src={toAbsoluteUrl(
                            `/media/store/client/600x600/${item.logo}`
                        )}
                        className="h-full w-full object-contain"
                        alt={item.title}
                    />
                </Card>

                {/* اطلاعات محصول */}
                <div className="min-w-0 flex-1 h-full flex flex-col justify-center">

                    <Link
                        href="#"
                        className="block hover:text-primary text-sm font-medium text-mono leading-5.5 line-clamp-3"
                    >
                        {item.title}
                    </Link>

                    <div className="flex flex-col gap-1.5 mt-2">

                        {/* رنگ */}
                        <span className="flex items-center gap-1.5 text-xs text-secondary-foreground">
    رنگ:

    <span className="flex items-center gap-1.5 font-medium text-foreground">
      <span
          className="h-3.5 w-3.5 rounded-full border border-border shadow-sm"
          style={{backgroundColor: item.colorCode}}
      />

        {item.color}
    </span>
  </span>

                        {/* کد کالا */}
                        <span className="text-xs text-secondary-foreground">
    کد کالا:
    <span className="text-xs font-medium text-foreground ms-1">
      {item.sku}
    </span>
  </span>

                        {/* تخفیف */}
                        {item.badge && (
                            <div className="w-fit shrink-0">
                                <Badge
                                    size="sm"
                                    variant="destructive"
                                    className="text-[10px] w-fit"
                                >
                                    تخفیف
                                </Badge>
                            </div>
                        )}

                    </div>

                </div>

                {/* تعداد و قیمت */}
                <div className="shrink-0 w-[145px] h-full flex flex-col items-end justify-center gap-2">

          <span className="text-xs text-muted-foreground">
  تعداد: {toPersianDigits(item.quantity || 1)} عدد
</span>

                    <div className="flex flex-col items-end gap-0.5">

                        {item.total && (
                            <span className="text-xs text-muted-foreground line-through">
                {item.total}
              </span>
                        )}

                        <span className="text-sm font-semibold text-mono whitespace-nowrap">
              {item.label}
            </span>

                    </div>

                </div>

            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-1 gap-4">
            {items.slice(0, limit).map((item, index) =>
                renderItem(item, index)
            )}
        </div>
    );
}