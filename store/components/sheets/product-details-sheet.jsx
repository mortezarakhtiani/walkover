'use client';

import {ShoppingCart, Star} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {ScrollArea} from '@/store/components/ui/scroll-area';
import {
    Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle,
} from '@/store/components/ui/sheet';
import {toPersianDigits} from '@/lib/to-persian-digits';

const items = [{
    text: 'موجودی', info: (<Badge size="sm" variant="success">
        موجود است
    </Badge>),
}, {
    text: 'کد محصول', info: (<span className="text-xs font-medium text-foreground">
                SH-001-BLK-42
            </span>),
}, {
    text: 'دسته‌بندی', info: (<span className="text-xs font-medium text-foreground">
                کفش ورزشی
            </span>),
}, {
    text: 'امتیاز', info: null,
}, {
    text: 'توضیحات بیشتر', info: (<span className="text-xs font-normal text-foreground leading-6">
                کفش سبک و راحت مناسب استفاده روزمره، ورزش و پیاده‌روی.
            </span>),
},];

const reviews = [{
    name: 'رضا', rating: 2, date: '۲ روز پیش', text: 'کفش خیلی راحت و باکیفیته. از خریدم کاملاً راضی هستم.',
}, {
    name: 'علی', rating: 4, date: '۵ روز پیش', text: 'ظاهر خیلی خوبی داره و کیفیت ساختش هم قابل قبوله.',
}, {
    name: 'محمد', rating: 3, date: '۱ هفته پیش', text: 'سایزش دقیق بود و برای استفاده روزمره خیلی راحته.',
},];

export function Rating({rating, outOf = 4}) {
    return (<div
        dir="ltr"
        className="flex items-center justify-end gap-1"
    >
        {Array.from({length: outOf}, (_, index) => {
            const filled = index + 1 <= rating;

            return (<Star
                key={index}
                className={`size-4 ${filled ? 'text-yellow-400' : 'text-input'}`}
                fill={filled ? 'currentColor' : 'none'}
                strokeWidth={1.8}
            />);
        })}
    </div>);
}

export function StoreClientProductDetailsSheet({
                                                   open, onOpenChange, productId, addToCart,
                                               }) {
    return (<Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
            dir="rtl"
            className="sm:w-[520px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5"
        >
            {/* Header */}
            <SheetHeader className="border-b border-border py-3.5 px-5 text-right">
                <SheetTitle className="text-right">
                    جزئیات محصول
                </SheetTitle>
            </SheetHeader>

            <SheetBody className="px-5 py-0">
                <ScrollArea className="h-[calc(100dvh-11.75rem)] pe-3 -me-3">

                    <div className="p-5 text-right">

                        {/* تصویر محصول */}
                        <Card className="relative flex items-center justify-center bg-accent/50 mb-6.5 h-[280px]">
                            <Badge
                                size="sm"
                                variant="destructive"
                                className="absolute top-4 end-4 uppercase"
                            >
                                ۴۰٪ تخفیف
                            </Badge>

                            <img
                                src={toAbsoluteUrl('/media/store/client/600x600/1.png')}
                                className="size-80"
                                alt="تصویر محصول"
                            />

                            <Card
                                className="absolute flex items-center justify-center bg-light w-[75px] h-[45px] overflow-hidden rounded-sm bottom-4 end-4"
                            >
                                <img
                                    src={toAbsoluteUrl('/media/brand-logos/vector.svg')}
                                    alt="برند محصول"
                                />
                            </Card>
                        </Card>


                        {/* نام محصول */}
                        <h3 className="text-base font-medium text-mono text-right leading-6 mb-2">
                            کفش ورزشی Cloud Shift Lightweight Runner Pro Edition
                        </h3>

                        {/* توضیحات محصول */}
                        <p className="text-sm font-normal text-foreground text-right leading-6 mb-7">
                            کفش سبک و شیک با راحتی مناسب برای استفاده روزمره.
                            دارای رویه مشبک، کفی نرم و زیره مقاوم با چسبندگی مناسب.
                            مناسب برای استفاده روزمره، ورزش و پیاده‌روی.
                        </p>


                        {/* مشخصات محصول */}
                        <div className="flex flex-col gap-3 mb-8">

                            {items.map((item, index) => (<div
                                key={index}
                                className="flex items-start gap-30"
                            >

                                <div className="flex-1 text-right">
                                    {item.text === 'امتیاز' ? (<div className="flex items-center justify-start gap-2">
                                        <Rating rating={5}/>

                                        <span className="text-xs font-medium text-foreground">
                                                        {toPersianDigits('5.0')}
                                                    </span>
                                    </div>) : (item.info)}
                                </div>
                                {/* عنوان */}
                                <span
                                    className="w-24 shrink-0 text-xs font-normal text-secondary-foreground text-right">
                                            {item.text}
                                        </span>


                            </div>))}

                        </div>

                        <div className="flex items-center justify-start gap-">

                            <div className="flex items-center gap-1">
                                <span className="text-lg font-medium text-mono">
                    {toPersianDigits('99,000')}
                                </span>
                                <span className="text-lg font-medium">
                                    تومان
                                </span>
                            </div>

                            <span className="text-lg font-normal text-secondary-foreground line-through">
                {toPersianDigits('140,000')}
                            </span>

                        </div>


                        {/* نظرات کاربران */}
                        <section className="border-t mt-5 border-border pt-6">

                            {/* عنوان */}
                            <div className="flex items-center justify-between mb-5">
                                    <span className="text-base font-semibold text-mono">
                                        نظرات کاربران
                                    </span>

                                <span className="text-xs text-secondary-foreground">
                                        {toPersianDigits('24')} نظر
                                    </span>
                            </div>

                            {/* امتیاز کلی */}
                            <Card className="mb-5 bg-accent/30 border-border">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">

                                        <div className="flex flex-col items-start gap-2">
                                                <span className="text-2xl font-semibold text-mono">
                                                    {toPersianDigits('4.8')}
                                                </span>

                                            <Rating rating={5}/>

                                            <span className="text-xs text-secondary-foreground">
                                                    بر اساس {toPersianDigits('24')} نظر
                                                </span>
                                        </div>

                                        <span className="text-sm text-secondary-foreground">
                                                امتیاز کاربران
                                            </span>

                                    </div>
                                </CardContent>
                            </Card>

                            {/* لیست نظرات */}
                            <div className="flex flex-col gap-4">

                                {reviews.map((review, index) => (<Card key={index}>
                                    <CardContent className="p-4">

                                        {/* نام، تاریخ و امتیاز */}
                                        <div dir="rtl" className="flex items-start justify-between gap-3">

                                            <div className="flex flex-col items-start gap-1 text-right">
                                                        <span className="text-sm font-medium text-mono">
                                                            {review.name}
                                                        </span>

                                                <span className="text-xs text-secondary-foreground">
                                                            {review.date}
                                                        </span>
                                            </div>

                                            <Rating
                                                rating={review.rating}
                                            />

                                        </div>

                                        {/* متن نظر */}
                                        <p className="mt-3 text-sm font-normal text-foreground text-right leading-6">
                                            {review.text}
                                        </p>

                                    </CardContent>
                                </Card>))}

                            </div>

                            {/* مشاهده همه نظرات */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-5 justify-center py-4"
                            >
                                مشاهده همه نظرات
                            </Button>

                        </section>

                        {/* قیمت */}


                    </div>

                </ScrollArea>
            </SheetBody>

            {/* Footer */}
            <SheetFooter className="border-t border-border py-3.5 px-5">
                <Button
                    onClick={() => {
                        if (productId) {
                            addToCart({productId});
                        }
                    }}
                    disabled={!productId}
                    className="grow justify-center"
                >
                    <ShoppingCart/>
                    افزودن به سبد خرید
                </Button>
            </SheetFooter>

        </SheetContent>
    </Sheet>);
}

