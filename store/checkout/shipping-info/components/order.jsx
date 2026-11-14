'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/store/components/ui/card';

import { formatToman } from '@/lib/to-persian';

export function Order() {
    const items = [
        { label: 'جمع کل', amount: 492000 },
        { label: 'هزینه ارسال', amount: 0 },
        { label: 'مالیات بر ارزش افزوده', amount: 0 },
    ];

    const renderItem = (item, index) => (
        <div
            key={index}
            className="flex items-center justify-between px-5"
        >
            <span className="text-sm font-normal text-secondary-foreground">

            </span>

            <span className="text-sm font-medium text-mono font-iransans">
                {formatToman(item.amount)} تومان
            </span>
        </div>
    );

    return (
        <Card className="bg-muted-foreground/5">
            <CardHeader className="px-5">
                <CardTitle>خلاصه سفارش</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 px-0 py-5">
                <div className="flex flex-col px-5">
                    <span className="mb-1.5 text-sm font-medium text-mono font-iransans">
                        ارسال به آدرس
                    </span>

                    <div className="flex flex-col gap-1 text-xs font-normal text-secondary-foreground">
                        <span className="font-iransans">رضا</span>
                        <span className="font-iransans">آدرس گیرنده</span>
                        <span className="font-iransans">کد پستی</span>
                        <span className="font-iransans">ایران</span>
                    </div>
                </div>

                <div className="mb-4 mt-5 border-b border-border" />

                <span className="mb-3.5 block px-5 text-sm font-medium text-mono font-iransans">
                    جزئیات پرداخت
                </span>

                {items.map(renderItem)}
            </CardContent>

            <CardFooter className="flex items-center justify-between px-5">
                <span className="text-sm font-normal text-secondary-foreground font-iransans">
                    مبلغ قابل پرداخت
                </span>

                <span className="text-base font-semibold text-mono font-iransans">
                    {formatToman(492000)} تومان
                </span>
            </CardFooter>
        </Card>
    );
}
