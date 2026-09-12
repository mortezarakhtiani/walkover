'use client';

import Link from 'next/link';
import {ShoppingCart, Star} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {getProductById} from '@/store/product/services/product-service';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {ScrollArea} from '@/store/components/ui/scroll-area';
import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/store/components/ui/sheet';
import {toPersianDigits} from '@/lib/to-persian-digits';

const reviews = [
    {
        name: 'رضا',
        rating: 2,
        date: '۲ روز پیش',
        text: 'کفش خیلی راحت و باکیفیته. از خریدم کاملاً راضی هستم.',
    },
    {
        name: 'علی',
        rating: 4,
        date: '۵ روز پیش',
        text: 'ظاهر خیلی خوبی داره و کیفیت ساختش هم قابل قبوله.',
    },
    {
        name: 'محمد',
        rating: 3,
        date: '۱ هفته پیش',
        text: 'سایزش دقیق بود و برای استفاده روزمره خیلی راحته.',
    },
];

export function Rating({rating, outOf = 5}) {
    return (
        <div
            dir="ltr"
            className="flex items-center justify-end gap-1"
        >
            {Array.from({length: outOf}, (_, index) => {
                const filled = index + 1 <= rating;

                return (
                    <Star
                        key={index}
                        className={`size-4 ${
                            filled ? 'text-yellow-400' : 'text-input'
                        }`}
                        fill={filled ? 'currentColor' : 'none'}
                        strokeWidth={1.8}
                    />
                );
            })}
        </div>
    );
}

export function StoreClientProductDetailsSheet({
                                                   open,
                                                   onOpenChange,
                                                   productId,
                                                   addToCart,
                                               }) {
    const product = getProductById(productId);

    console.log('PRODUCT DETAILS:', {
        productId,
        product,
    });

    if (!product) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                    dir="rtl"
                    className="sm:w-[520px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5"
                >
                    <SheetHeader className="border-b border-border py-3.5 px-5 text-right">
                        <SheetTitle className="text-right">
                            جزئیات محصول
                        </SheetTitle>
                    </SheetHeader>

                    <SheetBody className="flex items-center justify-center px-5">
                        <span className="text-sm text-secondary-foreground">
                            محصول پیدا نشد.
                        </span>
                    </SheetBody>
                </SheetContent>
            </Sheet>
        );
    }

    const productItems = [
        {
            text: 'موجودی',
            info: (
                <Badge size="sm" variant="success">
                    {product.stock ? 'موجود است' : 'ناموجود'}
                </Badge>
            ),
        },
        {
            text: 'کد محصول',
            info: (
                <span className="text-xs font-medium text-foreground">
                    {product.sku}
                </span>
            ),
        },
        {
            text: 'دسته‌بندی',
            info: (
                <span className="text-xs font-medium text-foreground">
                    {product.category}
                </span>
            ),
        },

        {
            text: 'امتیاز',
            info: (
                <div
                    dir="rtl"
                    className="flex items-center justify-start gap-2"
                >
            <span className="text-xs font-medium text-foreground">
                {toPersianDigits(
                    String(product.rating ?? 0)
                )}
            </span>

                    <Rating
                        rating={Math.round(product.rating ?? 0)}
                    />
                </div>
            ),
        },


    ];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
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
                            <div
                                className="relative flex items-center justify-center bg-accent/50 mb-6.5 h-[280px] mb-15">
                                {product.discount > 0 && (
                                    <Badge
                                        size="sm"
                                        variant="destructive"
                                        className="absolute top-4 end-4 uppercase"
                                    >
                                        {toPersianDigits(
                                            String(product.discount)
                                        )}
                                        ٪ تخفیف
                                    </Badge>
                                )}

                                <Link
                                    href={`/store/product/${product.slug}`}
                                    onClick={() => onOpenChange(false)}
                                >
                                    <img
                                        src={toAbsoluteUrl(product.logo)}
                                        className="size-80 cursor-pointer object-contain"
                                        alt={product.title}
                                    />
                                </Link>

                                {/*<Card*/}
                                {/*    className="absolute flex items-center justify-center bg-light w-[75px] h-[45px] overflow-hidden rounded-sm bottom-4 end-4">*/}
                                {/*    <img*/}
                                {/*        src={toAbsoluteUrl(*/}
                                {/*            '/media/brand-logos/vector.svg'*/}
                                {/*        )}*/}
                                {/*        alt={product.brand}*/}
                                {/*    />*/}
                                {/*</Card>*/}
                            </div>

                            {/* نام محصول */}
                            <Link
                                href={`/store/product/${product.slug}`}
                                onClick={() => onOpenChange(false)}
                                className="block text-base font-medium text-mono text-right leading-6 mb-2 hover:text-primary"
                            >
                                {product.title}
                            </Link>

                            {/* توضیحات محصول */}
                            <p className="text-sm font-normal text-foreground text-right leading-6 mb-7">
                                {product.description}
                            </p>

                            {/* مشخصات محصول */}
                            <div className="flex flex-col gap-3 mb-8">
                                {productItems.map((item) => (
                                    <div
                                        key={item.text}
                                        className="flex items-start gap-30"
                                    >
                                        <div className="flex-1 text-right">
                                            {item.info}
                                        </div>

                                        <span
                                            className="w-24 shrink-0 text-xs font-normal text-secondary-foreground text-right">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* قیمت */}
                            <div className="flex flex-col items-start gap-1">
                                {product.originalPrice && (
                                    <span className="text-sm font-normal text-secondary-foreground line-through">
            {toPersianDigits(
                product.originalPrice.toLocaleString('en-US')
            )}{' '}
                                        تومان
        </span>
                                )}

                                <div className="flex items-center gap-1">
        <span className="text-lg font-medium text-mono">
            {toPersianDigits(
                product.price.toLocaleString('en-US')
            )}
        </span>

                                    <span className="text-lg font-medium">
            تومان
        </span>
                                </div>
                            </div>


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
                        disabled={!productId || !product.stock}
                        className="grow justify-center bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                        <ShoppingCart/>
                        افزودن به سبد خرید
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}