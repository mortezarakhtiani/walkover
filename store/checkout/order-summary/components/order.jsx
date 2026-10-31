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
        { label: 'جمع کل', amount: 492 },
        { label: 'هزینه ارسال', amount: 0 },
        { label: 'مالیات بر ارزش افزوده', amount: 0 },
    ];

    const total = 492;

    const renderItem = (item, index) => (
        <div
            key={index}
            className="flex items-center justify-between"
        >
            <span className="text-sm font-normal text-secondary-foreground">
                {item.label}
            </span>

            <span className="text-sm font-medium text-mono">
                {formatToman(item.amount)} تومان
            </span>
        </div>
    );

    return (
        <Card className="bg-muted-foreground/5">
            <CardHeader className="px-5">
                <CardTitle>اطلاعات سفارش شما</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 px-5 py-4">
                <h4 className="mb-3.5 text-sm font-medium text-mono">
                    جزئیات قیمت
                </h4>

                {items.map(renderItem)}
            </CardContent>

            <CardFooter className="flex items-center justify-between px-5">
                <span className="text-sm font-normal text-secondary-foreground">
                    جمع کل
                </span>

                <span className="text-base font-semibold text-mono">
                    {formatToman(total)} تومان
                </span>
            </CardFooter>
        </Card>
    );
}
