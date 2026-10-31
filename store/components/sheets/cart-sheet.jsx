'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, TrashIcon } from 'lucide-react';

import { toAbsoluteUrl } from '@/lib/helpers';
import { toPersianDigits, toPersianSplit } from '@/lib/to-persian';

import { useStoreClient } from '@/store/components/context';

import { Button } from '@/store/components/ui/button';
import { Card, CardContent } from '@/store/components/ui/card';
import { ScrollArea } from '@/store/components/ui/scroll-area';
import { DiscountBadge } from '@/store/components/ui/discount-badge';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/store/components/ui/select';

import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/store/components/ui/sheet';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/store/components/ui/alert-dialog';

export function StoreClientCartSheet({
    open,
    onOpenChange,
    items = [],
    onRemoveItem,
}) {
    const {
        showProductDetailsSheet,
        setCartSheetOpen,
    } = useStoreClient();

    const [itemToRemove, setItemToRemove] = useState(null);

    const handleSheetChange = (isOpen) => {
        onOpenChange(isOpen);
        setCartSheetOpen?.(isOpen);
    };

    const handleProductClick = (productId) => {
        if (productId == null) return;

        showProductDetailsSheet(productId);
    };

    const handleRemoveClick = (item) => {
        setItemToRemove(item);
    };

    const handleConfirmRemove = () => {
        if (itemToRemove == null) return;

        onRemoveItem?.(itemToRemove.id);
        setItemToRemove(null);
    };

    return (
        <>
            <Sheet
                open={open}
                onOpenChange={handleSheetChange}
            >
                <SheetContent
                    side="right"
                    dir="rtl"
                    className="
                        inset-y-5 right-5 left-auto
                        flex h-[calc(100%-2.5rem)] flex-col
                        overflow-hidden rounded-md p-0
                        sm:w-[560px] sm:max-w-none
                        max-sm:inset-y-0 max-sm:right-0
                        max-sm:h-full max-sm:w-[85%]
                        max-sm:max-w-[380px] max-sm:rounded-none
                        max-sm:[&_[data-slot=sheet-close]]:hidden
                    "
                >
                    <SheetHeader className="shrink-0 px-5 py-4 max-sm:hidden">
                        <SheetTitle className="text-right text-base font-semibold">
                            سبد خرید
                        </SheetTitle>
                    </SheetHeader>

                    <SheetBody
                        className="
                            flex min-h-0 flex-1 flex-col
                            overflow-hidden px-4 py-0
                            sm:px-5
                        "
                    >
                        <ScrollArea className="min-h-0 flex-1">
                            <div className="px-1 py-4 max-sm:pt-2">
                                {items.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {items.map((item) => {
                                            const product = item.product;

                                            return (
                                                <Card
                                                    key={item.id}
                                                    className="
                                                        py-3 shadow-none
                                                        max-sm:relative
                                                        max-sm:pb-[62px]
                                                    "
                                                >
                                                    <CardContent
                                                        dir="rtl"
                                                        className="
                                                            p-2 pe-4
                                                            flex items-center
                                                            justify-between gap-3
                                                            w-full
                                                        "
                                                    >
                                                        <div
                                                            className="
                                                                flex items-center gap-3
                                                                min-w-0 flex-1
                                                            "
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleProductClick(product.id)
                                                                }
                                                                aria-label={`مشاهده جزئیات ${product.title}`}
                                                                className="
                                                                    flex items-center justify-center
                                                                    bg-accent/50
                                                                    h-[70px] w-[90px]
                                                                    rounded-md border shadow-none
                                                                    shrink-0 overflow-hidden cursor-pointer
                                                                    transition-colors hover:bg-muted/60
                                                                    focus-visible:outline-none
                                                                    focus-visible:ring-2
                                                                    focus-visible:ring-ring
                                                                    max-sm:h-[65px] max-sm:w-[70px]
                                                                "
                                                            >
                                                                <img
                                                                    src={toAbsoluteUrl(
                                                                        `/media/store/client/600x600/${product.logo}`
                                                                    )}
                                                                    className="
                                                                        h-[65px] w-full object-contain
                                                                        max-sm:h-[55px]
                                                                    "
                                                                    alt={product.title}
                                                                />
                                                            </button>

                                                            <div
                                                                className="
                                                                    flex flex-col justify-center gap-2
                                                                    min-w-0
                                                                "
                                                            >
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleProductClick(product.id)
                                                                    }
                                                                    className="
                                                                        text-right text-sm font-medium
                                                                        text-mono leading-5.5
                                                                        hover:text-primary cursor-pointer
                                                                        focus-visible:outline-none
                                                                        focus-visible:underline
                                                                        max-sm:text-xs max-sm:leading-5
                                                                    "
                                                                >
                                                                    {product.title}
                                                                </button>

                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span
                                                                        className="
                                                                            text-xs text-secondary-foreground
                                                                            max-sm:text-[10px]
                                                                        "
                                                                    >
                                                                        کد:{' '}
                                                                        <span className="font-medium text-foreground">
                                                                            {product.sku}
                                                                        </span>
                                                                    </span>

                                                                    {product.discount > 0 && (
                                                                        <DiscountBadge
                                                                            discount={product.discount}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="
                                                                flex flex-col items-end gap-2 shrink-0
                                                                max-sm:absolute max-sm:start-4
                                                                max-sm:end-4 max-sm:bottom-3
                                                                max-sm:flex-row max-sm:items-center
                                                                max-sm:justify-between
                                                            "
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Select
                                                                    defaultValue={String(item.quantity)}
                                                                >
                                                                    <SelectTrigger
                                                                        size="sm"
                                                                        className="px-3 rounded-md text-xs"
                                                                    >
                                                                        <SelectValue />
                                                                    </SelectTrigger>

                                                                    <SelectContent>
                                                                        {[1, 2, 3, 4].map((quantity) => (
                                                                            <SelectItem
                                                                                key={quantity}
                                                                                value={String(quantity)}
                                                                            >
                                                                                {toPersianDigits(quantity)}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>

                                                                <Button
                                                                    type="button"
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        handleRemoveClick(item)
                                                                    }
                                                                    aria-label="حذف محصول از سبد خرید"
                                                                    className="
                                                                        rounded-md max-sm:size-9
                                                                    "
                                                                >
                                                                    <TrashIcon className="size-4" />
                                                                </Button>
                                                            </div>

                                                            <div className="flex flex-col items-end gap-0.5">
                                                                {item.originalPrice != null &&
                                                                    item.originalPrice > item.price && (
                                                                        <span
                                                                            className="
                                                                                text-xs text-secondary-foreground
                                                                                line-through max-sm:text-[10px]
                                                                            "
                                                                        >
                                                                            {toPersianSplit(item.originalPrice)} تومان
                                                                        </span>
                                                                    )}

                                                                <span
                                                                    className="
                                                                        text-sm font-semibold text-mono
                                                                        max-sm:text-sm
                                                                    "
                                                                >
                                                                    {toPersianSplit(item.price)} تومان
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex h-[300px] items-center justify-center">
                                        <span className="text-sm text-muted-foreground">
                                            سبد خرید شما خالی است
                                        </span>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        <div
                            className="
                                mt-2 flex shrink-0 items-center
                                justify-between gap-4 rounded-md
                                bg-muted/40 px-4 py-3
                            "
                        >
                            <span className="text-sm font-medium text-muted-foreground">
                                جمع کل
                            </span>

                            <span
                                className="
                                    text-lg font-bold text-foreground
                                    max-sm:text-base
                                "
                            >
                                {toPersianSplit(
                                    items.reduce(
                                        (total, item) =>
                                            total +
                                            Number(item.price || 0) *
                                                Number(item.quantity || 1),
                                        0
                                    )
                                )}{' '}
                                تومان
                            </span>
                        </div>
                    </SheetBody>

                    <SheetFooter
                        className="
                            flex w-full shrink-0 flex-row gap-2
                            border-0 bg-transparent p-4
                            max-sm:mb-16 max-sm:px-3
                        "
                    >
                        <Button
                            asChild
                            className="
                                h-14 min-h-14 flex-1 gap-2
                                rounded-md border border-red-600/20
                                bg-red-600 px-4
                                text-base font-semibold text-white
                                hover:bg-red-700
                                focus-visible:bg-red-600
                            "
                        >
                            <Link
                                href="/store/checkout/order-summary"
                                onClick={() => handleSheetChange(false)}
                            >
                                <ShoppingCart className="size-5" />
                                ادامه و پرداخت
                            </Link>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSheetChange(false)}
                            className="
                                h-14 min-h-14 shrink-0 rounded-md
                                border-border px-4 text-sm font-medium
                            "
                        >
                            ادامه خرید
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <AlertDialog
                open={itemToRemove !== null}
                onOpenChange={(isOpen) => {
                    if (!isOpen) setItemToRemove(null);
                }}
            >
                <AlertDialogContent
                    dir="rtl"
                    className="sm:max-w-[420px]"
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-right">
                            حذف محصول از سبد خرید؟
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-right leading-7">
                            آیا مطمئنی که می‌خوای{' '}
                            <span className="font-medium text-foreground">
                                {itemToRemove?.product?.title}
                            </span>{' '}
                            رو از سبد خرید حذف کنی؟
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-row-reverse gap-2 sm:justify-start">
                        <AlertDialogCancel>
                            انصراف
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleConfirmRemove}
                            className="
                                bg-destructive text-destructive-foreground
                                hover:bg-destructive/90
                            "
                        >
                            بله، حذف کن
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}