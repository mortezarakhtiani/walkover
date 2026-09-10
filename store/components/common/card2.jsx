
'use client';

import {ShoppingCart, Star} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

export function Card2({
    id,
    badge,
    logo,
    title,
    total,
    star,
    label,
    showAddButton = true,
}) {
    const {showCartSheet, showProductDetailsSheet} = useStoreClient();

    return (
        <Card>
            <CardContent className="flex flex-col justify-between p-2.5 gap-4">
                <div className="mb-[10px]">
                    <div
                        className=" flex items-center justify-center relative w-full h-[180px] mb-4 shadow-none"
                    >
                        {badge && (
                            <Badge
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 uppercase"
                            >
                                <span>{toPersianDigits('40%')} تخفیف</span>
                            </Badge>
                        )}

                        <img
                            onClick={() => showProductDetailsSheet(id)}
                            src={logo}
                            className="h-[180px] shrink-0 cursor-pointer rounded-2xl object-contain "
                            alt={title}
                        />
                    </div>

                    <div className="flex sm:justify-end mb-2">
                        <Badge
                            size="sm"
                            variant="secondary"
                            shape="circle"
                            className="rounded-full gap-1 text-yellow-500"
                        >
                            <Star
                                className="text-yellow-500 -mt-0.5"
                                style={{fill: 'currentColor'}}
                            />

                            <span>{toPersianDigits(star)}</span>
                        </Badge>
                    </div>

                    <div
                        onClick={() => showProductDetailsSheet(id)}
                        className="hover:text-primary text-sm font-medium text-mono px-2.5 leading-5.5 block cursor-pointer"
                    >
                        {title}
                    </div>
                </div>

                <div className="flex items-center flex-wrap justify-between gap-5 px-2.5 pb-1">
                    {showAddButton && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="ms-1"
                            onClick={showCartSheet}
                        >
                            <ShoppingCart />
                            افزودن
                        </Button>
                    )}

                    <div className="flex items-center flex-wrap gap-1.5">
                        {label && (
                            <span className="text-xs font-normal text-secondary-foreground line-through pt-[1px]">
                                {toPersianDigits(label)}
                            </span>
                        )}

                        <span className="text-sm font-medium text-mono">
                            {toPersianDigits(total)} تومان
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

