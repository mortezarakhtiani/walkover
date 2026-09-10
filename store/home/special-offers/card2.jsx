'use client';

import {ShoppingCart} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from "@/lib/to-persian-digits";

export function Card2({
    bgColor,
    borderColor,
    title,
    total,
    logo,
    showAddButton = true,
}) {
    const {showCartSheet} = useStoreClient();

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
            `}
        >
            <CardContent className="flex flex-col items-center justify-center px-5 pb-0">

                <div className="mb-4 flex w-full items-center justify-between">
                    <Badge
                        size="sm"
                        variant="destructive"
                        className="uppercase"
                    >
                        {toPersianDigits('25%')}
                        <span>تخفیف</span>
                    </Badge>

                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-mono">
                            {toPersianDigits(total)}
                        </span>

                        <span className="text-sm font-medium text-mono">
                            تومان
                        </span>
                    </div>
                </div>


                <img
                    src={logo}
                    className="
                        mb-5
                        h-[200px]
                        rounded-xl
                        border
                        border-border
                        object-contain
                    "
                    alt="image"
                />

                <span className="m-3 text-base font-medium text-mono">
                    {title}
                </span>

            </CardContent>
        </Card>
    );
}