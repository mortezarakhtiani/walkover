'use client';

import {ShoppingCart, Star} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from "@/lib/to-persian-digits";


export function Card2({badge, logo, title, total, star, label, showAddButton = true}) {
    const {showCartSheet, showProductDetailsSheet} = useStoreClient();

    return (
        <Card>
            <CardContent className="flex flex-col justify-between p-2.5 gap-4">
                <div className="mb-2.5">
                    <Card
                        className="flex items-center justify-center relative bg-accent/50 w-full h-[180px] mb-4  shadow-none">
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
                            onClick={() => showProductDetailsSheet('productid')}
                            src={toAbsoluteUrl(`/media/store/client/600x600/${logo}`)}
                            className="h-[180px] shrink-0 cursor-pointer"
                            alt="image"
                        />
                    </Card>

                    <div
                        onClick={() => showProductDetailsSheet('productid')}
                        className="hover:text-primary text-sm font-medium text-mono px-2.5 leading-5.5 block cursor-pointer"
                    >
                        {title}
                    </div>
                </div>

                <div className="flex items-center flex-wrap justify-between gap-5 px-2.5 pb-1">
                    <Badge
                        size="sm"
                        variant="secondary"
                        shape="circle"
                        className="rounded-full gap-1 text-yellow-500 "

                    >
                        <Star
                            className="text-yellow-500 -mt-0.5"
                            style={{fill: 'currentColor'}}
                        />{' '}
                        <span>{toPersianDigits(star)}</span>
                    </Badge>

                    <div className="flex items-center flex-wrap gap-1.5">
                        {label && (
                            <span className="text-xs font-normal text-secondary-foreground line-through pt-[1px]">
                                {toPersianDigits(label)}
                            </span>
                        )}
                        <span className="text-sm font-medium text-mono">
                            {toPersianDigits(total)} تومان
                        </span>
                        {showAddButton && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="ms-1"
                                onClick={showCartSheet}

                            >
                                <ShoppingCart/> افزودن
                            </Button>)}

                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
