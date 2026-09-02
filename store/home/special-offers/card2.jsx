'use client';

import {ShoppingCart} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from "@/lib/to-persian-digits";

export function Card2({bgColor, borderColor, title, total, logo, showAddButton = true,}) {
    const {showCartSheet} = useStoreClient();

    return (
        <Card className={`h-full ${bgColor} ${borderColor}`}>
            <CardContent className="flex flex-col items-center justify-center px-5 pb-0">
                <div className="mb-3.5">
                    <Badge size="sm" variant="destructive" className="uppercase">
                        {toPersianDigits('25%')}
                        <span>تخفیف</span>
                    </Badge>
                </div>

                <span className="text-base font-medium text-mono mb-3">{title}</span>
                {showAddButton && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="mb-2.5"
                        onClick={showCartSheet}
                    >
                        <ShoppingCart/> افزودن به سبد خرید
                    </Button>
                )}
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-mono">
                        {toPersianDigits(total)}
                    </span>

                    <span className="text-sm font-medium text-mono">
                        تومان
                    </span>
                </div>

                <img
                    src={toAbsoluteUrl(`/media/store/client/600x600/${logo}`)}
                    className="size-48"
                    alt="image"
                />
            </CardContent>
        </Card>
    );
}
