'use client';

import {ShoppingCart} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from "@/lib/to-persian-digits";

export function Card1({showAddButton = true}) {
    const {showCartSheet} = useStoreClient();

    return (
        <Card  className={`
                h-full
                rounded-2xl
                border
                border-border
                bg-background
                shadow-sm
                
            `}>
            <CardContent
                className="flex items-center flex-wrap sm:flex-nowrap justify-between gap-5 lg:gap-9 px-7.5 pb-0">
                <div className="flex flex-col">
                    <div className="mb-3">
                        <Badge size="sm" variant="destructive" className="uppercase">
                            {toPersianDigits('25%')}
                            <span>تخفیف</span>
                        </Badge>
                    </div>

                    <h3 className="text-[26px] font-semibold text-mono mb-1">
                        کفش ورزشی مدل SKY ELUTE FF
                    </h3>

                    <span className="text-sm font-normal text-foreground mb-5 leading-5.5">
            کفش ورزشی SKY ELITE FF با ظاهر اسپرت و رنگ‌بندی که در استایل‌های کژوال و ورزشی خوب دیده می‌شود
          </span>

                    <div className="flex items-center gap-4">
                        {showAddButton && (<Button size="sm" variant="mono" onClick={showCartSheet}>
                            <ShoppingCart/>
                            افزودن به سبد خرید
                        </Button>)}


                        <span className="text-base font-semibold text-mono">
                            {toPersianDigits('140,000')}
                            <span className="text-sm font-normal ms-1">تومان</span></span>
                    </div>
                </div>

                <img
                    src="/images/rozh.png"
                    className="h-[200px] rounded-xl border border-border object-contain"
                    alt="image"
                />
            </CardContent>
        </Card>
    );
}
