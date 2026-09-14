'use client';

import Link from 'next/link';
import {Heart, ShoppingCart, Star} from 'lucide-react';
import {toast} from 'sonner';

import {toAbsoluteUrl} from '@/lib/helpers';
import {getProductById} from '@/store/product/services/product-service';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
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
import {useState} from 'react';


/* =========================================================
   Rating
========================================================= */

export function Rating({rating, outOf = 5}) {
    return (
        <div
            dir="ltr"
            className="flex items-center gap-0.5"
        >
            {Array.from({length: outOf}, (_, index) => {
                const filled = index + 1 <= rating;

                return (
                    <Star
                        key={index}
                        className={`size-3.5 ${
                            filled
                                ? 'text-yellow-400'
                                : 'text-muted-foreground/30'
                        }`}
                        fill={filled ? 'currentColor' : 'none'}
                        strokeWidth={1.8}
                    />
                );
            })}
        </div>
    );
}


/* =========================================================
   Product Details Sheet
========================================================= */

export function StoreClientProductDetailsSheet({
                                                   open,
                                                   onOpenChange,
                                                   productId,
                                                   addToCart,
                                               }) {
    const product = getProductById(productId);
    const [isFavorite, setIsFavorite] = useState(false);


    /* =====================================================
       Product Not Found
    ===================================================== */

    if (!product) {
        return (
            <Sheet
                open={open}
                onOpenChange={onOpenChange}
            >
                <SheetContent
                    dir="rtl"
                    className="
                        sm:w-[500px]
                        sm:max-w-none
                        inset-5
                        start-auto
                        h-auto
                        rounded-xl
                        p-0
                    "
                >
                    <SheetHeader className="border-b border-border px-5 py-4">
                        <SheetTitle className="text-right">
                            جزئیات محصول
                        </SheetTitle>
                    </SheetHeader>

                    <SheetBody className="flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">
                            محصول پیدا نشد.
                        </span>
                    </SheetBody>
                </SheetContent>
            </Sheet>
        );
    }


    /* =====================================================
       Product Information
    ===================================================== */

    const productItems = [
        {
            text: 'موجودی',
            info: (
                <Badge
                    size="sm"
                    variant={
                        product.stock
                            ? 'success'
                            : 'destructive'
                    }
                >
                    {product.stock
                        ? 'موجود است'
                        : 'ناموجود'}
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
                <div
                    dir="rtl"
                    className="flex items-center gap-2"
                >
                    <span className="text-sm font-medium text-foreground">
                        {toPersianDigits(
                            String(product.rating ?? 0)
                        )}
                    </span>

                    <Rating
                        rating={Math.round(
                            product.rating ?? 0
                        )}
                    />
                </div>
            ),
        },
    ];


    /* =====================================================
       Wishlist
    ===================================================== */

    const handleAddToWishlist = () => {
    if (isFavorite) {
        setIsFavorite(false);

        toast.success(
            'محصول از لیست علاقه‌مندی‌ها حذف شد'
        );

        return;
    }

    setIsFavorite(true);

    toast.success(
        'محصول به لیست علاقه‌مندی‌ها اضافه شد'
    );
};


    /* =====================================================
       Render
    ===================================================== */

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                dir="rtl"
                className="
                    sm:w-[500px]
                    sm:max-w-none
                    inset-5
                    start-auto
                    h-auto
                    rounded-xl
                    p-0
                    overflow-hidden
                    flex
                    flex-col
                    [&_[data-slot=sheet-close]]:top-4
                    [&_[data-slot=sheet-close]]:end-5
                "
            >

                {/* =================================================
                   Header
                ================================================= */}

                <SheetHeader
                    className="
                        shrink-0
                        border-b
                        border-border
                        px-5
                        py-4
                    "
                >
                    <SheetTitle className="text-right text-base">
                        جزئیات محصول
                    </SheetTitle>
                </SheetHeader>


                {/* =================================================
                   Body
                ================================================= */}

                <SheetBody
                    className="
                        min-h-0
                        flex-1
                        px-5
                        py-0
                        flex
                        flex-col
                    "
                >

                    <ScrollArea className="flex-1 min-h-0">
                        <div className="px-1 py-5">

                            {/* =================================================
                               Product Image
                            ================================================= */}

                            <div
                                className="
                                    relative
                                    flex
                                    items-center
                                    justify-center
                                    h-[250px]
                                    rounded-xl
                                    bg-accent/40
                                    mb-5
                                "
                            >

                                {/* Wishlist Button */}

                                <button
                                    type="button"
                                    onClick={handleAddToWishlist}
                                    aria-label={
                                        isFavorite
                                            ? 'حذف از لیست علاقه‌مندی‌ها'
                                            : 'افزودن به لیست علاقه‌مندی‌ها'
                                    }
                                    className="
        absolute
        top-3
        end-3
        z-10
        flex
        size-10
        items-center
        justify-center
        rounded-full
        bg-background
        shadow-sm
        ring-1
        ring-border
        transition-colors
        hover:bg-accent
    "
                                >
                                    <Heart
                                        className={`
            size-5
            transition-colors
            ${
                                            isFavorite
                                                ? 'text-red-500'
                                                : 'text-muted-foreground'
                                        }
        `}
                                        strokeWidth={1.8}
                                        fill={isFavorite ? 'currentColor' : 'none'}
                                    />
                                </button>


                                {/* Discount Badge */}

                                {product.discount > 0 && (
                                    <Badge
                                        size="sm"
                                        variant="destructive"
                                        className="
                                            absolute
                                            top-3
                                            start-3
                                            z-10
                                        "
                                    >
                                        {toPersianDigits(
                                            String(product.discount)
                                        )}
                                        ٪ تخفیف
                                    </Badge>
                                )}


                                {/* Product Image */}

                                <Link
                                    href={`/store/product/${product.slug}`}
                                    onClick={() =>
                                        onOpenChange(false)
                                    }
                                >
                                    <img
                                        src={toAbsoluteUrl(product.logo)}
                                        alt={product.title}
                                        className="
                                            size-60
                                            object-contain
                                            cursor-pointer
                                            transition-transform
                                            duration-200
                                            hover:scale-[1.02]
                                        "
                                    />
                                </Link>

                            </div>


                            {/* =================================================
                               Product Title
                            ================================================= */}

                            <div className="mb-3 text-right">
                                <Link
                                    href={`/store/product/${product.slug}`}
                                    onClick={() =>
                                        onOpenChange(false)
                                    }
                                    className="
                                        block
                                        text-right
                                        text-lg
                                        font-semibold
                                        leading-7
                                        text-foreground
                                        transition-colors
                                        hover:text-primary
                                    "
                                >
                                    {product.title}
                                </Link>
                            </div>


                            {/* =================================================
                               Description
                            ================================================= */}

                            {product.description && (
                                <p
                                    className="
                                        mb-5
                                        text-right
                                        text-sm
                                        leading-7
                                        text-muted-foreground
                                    "
                                >
                                    {product.description}
                                </p>
                            )}


                            {/* =================================================
                               Product Information
                            ================================================= */}

                            <div className="mt-5 mb-5 flex flex-col">
                                {productItems.map((item, index) => (
                                    <div
                                        key={item.text}
                                        className={`
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                            py-3
                                            ${
                                            index !==
                                            productItems.length - 1
                                                ? 'border-b border-border'
                                                : ''
                                        }
                                        `}
                                    >
                                        {/* Value */}

                                        <div className="text-right">
                                            {item.info}
                                        </div>


                                        {/* Label */}

                                        <span
                                            className="
                                                text-left
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </ScrollArea>


                    {/* =================================================
                       Price + Details
                    ================================================= */}

                    <div
                        className="
                            shrink-0
                            flex
                            items-end
                            justify-between
                            gap-4
                            px-1
                            pt-3
                            pb-3
                        "
                    >

                        {/* Product Details */}

                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="shrink-0"
                        >
                            <Link
                                href={`/store/product/${product.slug}`}
                                onClick={() =>
                                    onOpenChange(false)
                                }
                            >
                                مشاهده جزئیات
                            </Link>
                        </Button>


                        {/* Price */}

                        <div className="flex flex-col items-end">

                            {/* Original Price */}

                            {product.originalPrice && (
                                <span
                                    dir="rtl"
                                    className="
                                        flex
                                        flex-row-reverse
                                        items-center
                                        gap-1
                                        text-xs
                                        text-muted-foreground
                                        line-through
                                    "
                                >
                                    <span>
                                        تومان
                                    </span>

                                    <span>
                                        {toPersianDigits(
                                            product.originalPrice.toLocaleString(
                                                'en-US'
                                            )
                                        )}
                                    </span>
                                </span>
                            )}


                            {/* Current Price */}

                            <div className="mt-0.5 flex items-center gap-1">
                                <span className="text-xl font-bold text-foreground">
                                    {toPersianDigits(
                                        product.price.toLocaleString(
                                            'en-US'
                                        )
                                    )}
                                </span>

                                <span className="text-xs font-medium text-muted-foreground">
                                    تومان
                                </span>
                            </div>

                        </div>

                    </div>

                </SheetBody>


                {/* =================================================
                   Footer
                ================================================= */}

                <SheetFooter
                    className="
                        shrink-0
                        border-t
                        border-border
                        px-5
                        py-3
                    "
                >
                    <Button
                        onClick={() => {
                            if (productId) {
                                addToCart({
                                    productId,
                                });
                            }
                        }}
                        disabled={
                            !productId ||
                            !product.stock
                        }
                        className="
                            w-full
                            justify-center
                            bg-indigo-500
                            px-5
                            py-5
                            text-white
                            hover:bg-indigo-600
                        "
                    >
                        <ShoppingCart/>
                        افزودن به سبد خرید
                    </Button>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
}

