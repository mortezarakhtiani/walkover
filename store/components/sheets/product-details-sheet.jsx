'use client';

import Link from 'next/link';
import {useState} from 'react';
import {Heart, ShoppingCart, Star, Package} from 'lucide-react';
import {toast} from 'sonner';

import {cn} from '@/lib/utils';
import {toAbsoluteUrl} from '@/lib/helpers';
import {getProductById} from '@/store/product/services/product-service';
import {toPersianDigits, toPersianSplit} from '@/lib/to-persian';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {DiscountBadge} from '@/store/components/ui/discount-badge';

import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/store/components/ui/sheet';

export function Rating({rating = 0, outOf = 5}) {
    return (
        <div dir="ltr" className="flex items-center gap-0.5">
            {Array.from({length: outOf}, (_, index) => {
                const filled = index + 1 <= rating;

                return (
                    <Star
                        key={index}
                        className={cn(
                            'size-3.5',
                            filled
                                ? 'text-amber-400'
                                : 'text-muted-foreground/20',
                        )}
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
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleAddToWishlist = () => {
        const nextValue = !isFavorite;
        setIsFavorite(nextValue);

        toast.success(
            nextValue
                ? 'محصول به لیست علاقه‌مندی‌ها اضافه شد'
                : 'محصول از لیست علاقه‌مندی‌ها حذف شد',
        );
    };

    const closeSheet = () => onOpenChange(false);

    if (!product) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                    side="right"
                    dir="rtl"
                    className="
                        inset-y-5 right-5 left-auto flex h-[calc(100%-2.5rem)]
                        flex-col overflow-hidden rounded-md p-0
                        sm:w-[520px] sm:max-w-none
                        max-sm:inset-y-0 max-sm:right-0 max-sm:h-full
                        max-sm:w-[85%] max-sm:max-w-[380px] max-sm:rounded-none
                        max-sm:[&_[data-slot=sheet-close]]:hidden
                    "
                >
                    <SheetHeader className="shrink-0 border-b px-5 py-4">
                        <SheetTitle className="text-right text-base">
                            جزئیات محصول
                        </SheetTitle>
                    </SheetHeader>

                    <SheetBody className="flex flex-1 items-center justify-center">
                        <div className="text-center">
                            <Package className="mx-auto mb-3 size-10 text-muted-foreground/40"/>
                            <p className="text-sm text-muted-foreground">
                                محصول پیدا نشد.
                            </p>
                        </div>
                    </SheetBody>
                </SheetContent>
            </Sheet>
        );
    }

    const productItems = [
        {
            text: 'موجودی',
            info: product.stock ? (
                <span className="font-semibold">
                    {toPersianDigits(product.stock)} عدد
                </span>
            ) : (
                <Badge variant="destructive" className="rounded-full px-2.5">
                    ناموجود
                </Badge>
            ),
        },
        ...(product.sku
            ? [
                {
                    text: 'کد محصول',
                    info: (
                        <span dir="ltr" className="font-medium">
                              {product.sku}
                          </span>
                    ),
                },
            ]
            : []),
        {
            text: 'امتیاز کاربران',
            info: (
                <div dir="rtl" className="flex items-center gap-2">
                    <Rating rating={Math.round(product.rating ?? 0)}/>
                    <span className="font-semibold">
                        {toPersianDigits(String(product.rating ?? 0))}
                    </span>
                </div>
            ),
        },
    ];

    const hasColors = Boolean(product.colors?.length);
    const hasSizes = Boolean(product.sizes?.length);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                dir="rtl"
                className="
                    inset-y-5 right-5 left-auto flex h-[calc(100%-2.5rem)]
                    flex-col overflow-hidden rounded-md border-border/70 p-0
                    shadow-2xl
                    sm:w-[560px] sm:max-w-none
                    max-sm:inset-y-0 max-sm:right-0 max-sm:h-full
                    max-sm:w-[85%] max-sm:max-w-[380px] max-sm:rounded-none
                    max-sm:[&_[data-slot=sheet-close]]:hidden

                "
            >
                <SheetHeader className="shrink-0 border-b border-border/60 px-5 py-4">
                    <SheetTitle className="text-right text-base font-semibold">
                        جزئیات محصول
                    </SheetTitle>
                </SheetHeader>

                <SheetBody
                    className="
                        flex min-h-0 flex-1 flex-col overflow-hidden
                        px-4 py-0 sm:px-5
                    "
                >
                    {/* این wrapper اسکرول‌بار را از لبه‌ها جدا می‌کند */}
                    <div className="min-h-0 flex-1 py-3">
                        {/* ناحیه مستقل اسکرول */}
                        <div
                            dir="rtl"
                            className="
                                h-full min-h-0 overflow-y-auto
                                overscroll-contain rounded-md
                                pl-2
                            "
                        >
                            {/* تصویر محصول */}
                            <div className="relative">
                                <div
                                    className="
                                        relative flex h-52 items-center justify-center
                                        overflow-hidden rounded-md sm:h-64
                                    "
                                >
                                    <Link
                                        href={`/store/product/${product.slug}`}
                                        onClick={closeSheet}
                                        aria-label={`مشاهده ${product.title}`}
                                        className="flex size-full items-center justify-center p-5"
                                    >
                                        <img
                                            src={toAbsoluteUrl(product.logo)}
                                            alt={product.title}
                                            className="
                                                size-40 object-contain
                                                transition-transform duration-300
                                                hover:scale-105 sm:size-80
                                            "
                                        />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleAddToWishlist}
                                        aria-label={
                                            isFavorite
                                                ? 'حذف از علاقه‌مندی‌ها'
                                                : 'افزودن به علاقه‌مندی‌ها'
                                        }
                                        aria-pressed={isFavorite}
                                        className="
                                            absolute right-3 top-3 flex size-10
                                            items-center justify-center rounded-full
                                            border border-border/60 bg-background/90
                                            text-muted-foreground transition-colors
                                            hover:bg-background
                                        "
                                    >
                                        <Heart
                                            className={cn(
                                                'size-[18px] transition-colors',
                                                isFavorite && 'text-rose-500',
                                            )}
                                            fill={
                                                isFavorite
                                                    ? 'currentColor'
                                                    : 'none'
                                            }
                                        />
                                    </button>

                                    {product.discount > 0 && (
                                        <div className="absolute left-3 top-3">
                                            <DiscountBadge
                                                discount={product.discount}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* عنوان و توضیحات */}
                            <div className="mt-5">
                                <h2
                                    className="
        text-right text-lg font-bold
        leading-8 text-foreground
    "
                                >
                                    {product.title}
                                </h2>

                                {product.description && (
                                    <p className="mt-2 text-right text-sm leading-7 text-muted-foreground">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* مشخصات محصول */}
                            <section className="mt-6">
                                <div className="w-fit rounded-md">
                                    {productItems.map((item) => (
                                        <div
                                            key={item.text}
                                            className="flex min-h-12 items-center gap-3 py-3 last:border-b-0"
                                        >
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                    {item.text}
                </span>

                                            <div className="whitespace-nowrap text-sm text-foreground">
                                                {item.info}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* رنگ‌ها */}
                            {hasColors && (
                                <section className="mt-6 mr-3">
                                    <h3 className="mb-3 text-sm font-bold text-foreground">
                                        انتخاب رنگ
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-3">
                                        {product.colors.map((color, index) => {
                                            const colorName =
                                                color.name ??
                                                color.label ??
                                                'رنگ محصول';

                                            const colorValue =
                                                color.hex ??
                                                color.value ??
                                                color.color ??
                                                '#e5e7eb';

                                            const isSelected =
                                                selectedColor === color;

                                            return (
                                                <button
                                                    key={
                                                        color.value ??
                                                        color.name ??
                                                        index
                                                    }
                                                    type="button"
                                                    title={colorName}
                                                    aria-label={`انتخاب رنگ ${colorName}`}
                                                    aria-pressed={isSelected}
                                                    onClick={() =>
                                                        setSelectedColor(color)
                                                    }
                                                    className={cn(
                                                        'flex size-9 items-center justify-center rounded-full border transition-all',
                                                        isSelected
                                                            ? ' ring-2 ring-red-600/20 ring-offset-2'
                                                            : 'border-border/70',
                                                    )}
                                                >
                                                    <span
                                                        className="size-7 rounded-full border border-black/5"
                                                        style={{
                                                            backgroundColor:
                                                            colorValue,
                                                        }}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {selectedColor && (
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            {' '}
                                            {selectedColor.name ??
                                                selectedColor.label ??
                                                ''}
                                        </p>
                                    )}
                                </section>
                            )}

                            {/* سایزها */}
                            {hasSizes && (
                                <section className="mt-6 mr-3">
                                    <h3 className="mb-3 text-sm font-bold text-foreground">
                                        انتخاب سایز
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size, index) => {
                                            const sizeValue =
                                                typeof size === 'string'
                                                    ? size
                                                    : size.value;

                                            const isSelected =
                                                selectedSize === sizeValue;

                                            return (
                                                <button
                                                    key={sizeValue ?? index}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() =>
                                                        setSelectedSize(
                                                            sizeValue,
                                                        )
                                                    }
                                                    className={cn(
                                                        'flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors',
                                                        isSelected
                                                            ? 'bg-foreground text-background'
                                                            : 'border-border bg-background text-foreground hover:bg-accent',
                                                    )}
                                                >
                                                    {sizeValue}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* نظرات کاربران */}
                            <section className="mt-7 pb-2 pt-5">


                                {product.reviews?.length > 0 ? (
                                    <div className="flex flex-col gap-3">
                                        {product.reviews.map((review) => (
                                            <article
                                                key={review.id}
                                                className="rounded-md border border-border p-4 bg-muted-foreground/5"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <div className="
                                                            flex size-9 shrink-0
                                                            items-center justify-center
                                                            rounded-full bg-red-600/10
                                                            text-sm font-bold text-red-600
                                                        ">
                                                            {review.name?.charAt(0) ?? 'ک'}
                                                        </div>

                                                        <p className="truncate text-sm font-semibold text-foreground">
                                                            {review.name ?? 'کاربر'}
                                                        </p>
                                                    </div>

                                                    <div
                                                        dir="ltr"
                                                        className="flex shrink-0 items-center gap-1.5"
                                                    >
                                                        <Star
                                                            className="size-3.5 text-amber-400"
                                                            fill="currentColor"
                                                        />
                                                        <span className="text-xs font-medium text-foreground">
                                                            {toPersianDigits(
                                                                String(
                                                                    review.rating ?? 0,
                                                                ),
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="mt-3 text-right text-sm leading-7">
                                                    {review.comment}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-md bg-muted/30 px-4 py-7 text-center">
                                        <Star className="mx-auto mb-2 size-6 text-muted-foreground/40"/>
                                        <p className="text-sm text-muted-foreground">
                                            هنوز نظری برای این محصول ثبت نشده است.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>

                    {/* قیمت ثابت پایین؛ خارج از محدوده اسکرول */}
                    <div
                        dir="ltr"
                        className="
                            flex shrink-0 items-center justify-start
                            border-t border-border/60 bg-background py-4
                        "
                    >
                        <div
                            dir="rtl"
                            className="flex flex-col items-end gap-1"
                        >
                            {product.originalPrice != null &&
                                product.originalPrice > product.price && (
                                    <span className="text-xs text-muted-foreground line-through">
                                        {toPersianSplit(
                                            product.originalPrice.toLocaleString(
                                                'en-US',
                                            ),
                                        )}
                                    </span>
                                )}

                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-extrabold text-foreground">
                                    {toPersianSplit(
                                        product.price.toLocaleString('en-US'),
                                    )}
                                </span>
                                <span className="text-xs font-medium text-foreground">
                                    تومان
                                </span>
                            </div>
                        </div>
                    </div>
                </SheetBody>

                {/* دکمه خرید */}
                <SheetFooter
                    className="
                        w-full shrink-0
                        bg-background p-4 max-sm:mb-16 max-sm:px-3
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
                            h-12 min-h-12 w-full gap-2 rounded-md
                            border-0 bg-red-600 text-sm font-semibold text-white
                            shadow-sm transition-colors hover:bg-red-700
                            focus-visible:bg-red-700
                            disabled:cursor-not-allowed disabled:opacity-50
                        "
                    >
                        <ShoppingCart className="size-[18px]"/>
                        <span>
                            {product.stock
                                ? 'افزودن به سبد خرید'
                                : 'ناموجود'}
                        </span>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

