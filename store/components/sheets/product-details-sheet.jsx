'use client';

import Link from 'next/link';
import {Heart, ShoppingCart, Star} from 'lucide-react';
import {toast} from 'sonner';
import {useState} from 'react';

import {toAbsoluteUrl} from '@/lib/helpers';
import {getProductById} from '@/store/product/services/product-service';
import {toPersianDigits, toPersianSplit} from '@/lib/to-persian';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {DiscountBadge} from '@/store/components/ui/discount-badge'
import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/store/components/ui/sheet';

export function Rating({rating, outOf = 5}) {
    return (
        <div dir="ltr" className="flex items-center gap-0.5">
            {Array.from({length: outOf}, (_, index) => {
                const filled = index + 1 <= rating;

                return (
                    <Star
                        key={index}
                        className={`size-3.5 ${
                            filled ? 'text-yellow-400' : 'text-muted-foreground/30'
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
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToWishlist = () => {
        const nextValue = !isFavorite;
        setIsFavorite(nextValue);

        toast.success(
            nextValue
                ? 'محصول به لیست علاقه‌مندی‌ها اضافه شد'
                : 'محصول از لیست علاقه‌مندی‌ها حذف شد',
        );
    };

    if (!product) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                    side="right"
                    dir="rtl"
                    className="
            inset-y-5 right-5 left-auto
            flex h-[calc(100%-2.5rem)] flex-col
            overflow-hidden rounded-xl p-0
            sm:w-[500px] sm:max-w-none
            max-sm:inset-y-0 max-sm:right-0
            max-sm:h-full max-sm:w-[85%]
            max-sm:max-w-[380px] max-sm:rounded-none
            max-sm:[&_[data-slot=sheet-close]]:hidden
          "
                >
                    <SheetHeader className="shrink-0 px-5 py-4 max-sm:hidden">
                        <SheetTitle className="text-right text-base font-semibold">
                            جزئیات محصول
                        </SheetTitle>
                    </SheetHeader>

                    <SheetBody className="flex flex-1 items-center justify-center">
            <span className="text-sm text-muted-foreground">
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
            info: product.stock ? (
                <span className="text-sm">
          {toPersianDigits(product.stock)} عدد
        </span>
            ) : (
                <Badge size="sm" variant="destructive" className="rounded-md">
                    ناموجود
                </Badge>
            ),
        },
        {
            text: 'کد محصول',
            info: (
                <span className="text-sm font-medium text-foreground">
          {product.sku}
        </span>
            ),
        },
        {
            text: 'امتیاز',
            info: (
                <div dir="rtl" className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {toPersianDigits(String(product.rating ?? 0))}
          </span>
                    <Rating rating={Math.round(product.rating ?? 0)}/>
                </div>
            ),
        },
    ];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                dir="rtl"
                className="
          inset-y-5 right-5 left-auto
          flex h-[calc(100%-2.5rem)] flex-col
          overflow-hidden rounded-xl p-0
          sm:w-[560px] sm:max-w-none
          max-sm:inset-y-0 max-sm:right-0
          max-sm:h-full max-sm:w-[85%]
          max-sm:max-w-[380px] max-sm:rounded-none
          max-sm:[&_[data-slot=sheet-close]]:hidden
        "
            >
                {/* Header */}
                <SheetHeader className="shrink-0 px-5 py-4 max-sm:hidden">
                    <SheetTitle className="text-right text-base font-semibold">
                        جزئیات محصول
                    </SheetTitle>
                </SheetHeader>

                {/* Body */}
                <SheetBody
                    className="
            flex min-h-0 flex-1 flex-col
            overflow-hidden px-4 py-0
            sm:px-5
          "
                >
                    <div className="min-h-0 flex-1 overflow-y-auto px-1">
                        {/* Product Image */}
                        <div
                            className="
                relative flex h-[180px] shrink-0
                items-center justify-center overflow-hidden
                rounded-md border border-border/70
                bg-muted/40 sm:h-[240px]
              "
                        >
                            {/* Wishlist */}
                            <button
                                type="button"
                                onClick={handleAddToWishlist}
                                aria-label={
                                    isFavorite
                                        ? 'حذف از لیست علاقه‌مندی‌ها'
                                        : 'افزودن به لیست علاقه‌مندی‌ها'
                                }
                                className="
                  absolute start-3 top-3 z-10
                  flex size-10 items-center justify-center
                  rounded-md border border-border/60
                  bg-background transition-colors
                  hover:bg-accent
                "
                            >
                                <Heart
                                    className={`size-5 ${
                                        isFavorite ? 'text-red-500' : 'text-muted-foreground'
                                    }`}
                                    strokeWidth={1.8}
                                    fill={isFavorite ? 'currentColor' : 'none'}
                                />
                            </button>

                            {/* Discount */}
                            <DiscountBadge discount={product.discount}/>

                            <Link
                                href={`/store/product/${product.slug}`}
                                onClick={() => onOpenChange(false)}
                                className="flex size-full items-center justify-center p-4"
                            >
                                <img
                                    src={toAbsoluteUrl(product.logo)}
                                    alt={product.title}
                                    className="size-28 object-contain sm:size-70"
                                />
                            </Link>
                        </div>

                        {/* Product Information */}
                        <div className="mt-5">
                            <Link
                                href={`/store/product/${product.slug}`}
                                onClick={() => onOpenChange(false)}
                                className="
                  block text-right text-base font-semibold
                  leading-6 text-foreground transition-colors
                  hover:text-indigo-600
                "
                            >
                                {product.title}
                            </Link>

                            {product.description && (
                                <p
                                    className="
                    mt-3 text-right text-sm leading-7
                    text-muted-foreground
                    max-sm:text-xs max-sm:leading-6
                  "
                                >
                                    {product.description}
                                </p>
                            )}

                            {/* Specifications */}
                            <div className="my-5 flex flex-col gap-3">
                                {productItems.map((item) => (
                                    <div
                                        key={item.text}
                                        className="
                      flex w-full items-center
                      justify-between gap-3 text-right
                    "
                                    >
                    <span className="text-sm text-muted-foreground">
                      {item.text}
                    </span>

                                        <div className="text-sm font-medium text-foreground">
                                            {item.info}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div
                        className="
            pt-3
              flex shrink-0 items-center justify-end

              gap-3 border-t border-border

            "
                    >

                        <div className="flex flex-col items-end gap-1">
                            {product.originalPrice != null && (
                                <span
                                    className="
                    text-sm text-muted-foreground
                    line-through
                  "
                                >
                  {toPersianSplit(
                      product.originalPrice.toLocaleString('en-US'),
                  )}{' '}
                                    تومان
                </span>
                            )}

                            <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-foreground">
                  {toPersianSplit(
                      product.price.toLocaleString('en-US'),
                  )}
                </span>
                                <span className="text-sm font-medium text-foreground">
                  تومان
                </span>
                            </div>
                        </div>
                    </div>
                </SheetBody>

                {/* Footer */}
                <SheetFooter
                    className="
            w-full shrink-0 border-0
            p-4
            bg-transparent
            max-sm:mb-16 max-sm:px-3
          "
                >
                    <Button
                        type="button"
                        onClick={() => {
                            if (productId && product.stock) {
                                addToCart({productId});
                            }
                        }}
                        disabled={!productId || !product.stock}
                        className="
              h-14 min-h-14 w-full gap-2
              rounded-md border border-indigo-500/20
              bg-indigo-600 px-5 text-base font-semibold
              text-white hover:bg-indigo-700
              focus-visible:bg-indigo-600
              disabled:cursor-not-allowed disabled:opacity-50
            "
                    >
                        <ShoppingCart className="size-5"/>
                        <span>
              {product.stock ? 'افزودن به سبد خرید' : 'ناموجود'}
            </span>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
