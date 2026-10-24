import Link from 'next/link';
import {ShoppingCart, TrashIcon} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {toPersianDigits, toPersianSplit} from '@/lib/to-persian';

import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {ScrollArea} from '@/store/components/ui/scroll-area';
import {DiscountBadge} from '@/store/components/ui/discount-badge'
import {motion} from 'framer-motion';
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

export function StoreClientCartSheet({
                                         open,
                                         onOpenChange,
                                         items = [],
                                         onRemoveItem,
                                     }) {
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
                        سبد خرید
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
                    <ScrollArea className="min-h-0 flex-1">
                        <div className="px-1 py-4 max-sm:pt-2">
                            {items.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {items.map((item) => (
                                        <Card
                                            key={item.id}
                                            className="
                        rounded-md shadow-none
                        max-sm:relative max-sm:pb-[68px]
                      "
                                        >
                                            <CardContent
                                                dir="rtl"
                                                className="
                          flex w-full items-center justify-between
                          gap-3 p-3
                        "
                                            >
                                                {/* Product */}
                                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                                    {/* Image */}
                                                    <Card
                                                        className="
                              flex size-[88px] shrink-0
                              items-center justify-center
                              rounded-md bg-muted/40
                              shadow-none
                              max-sm:size-[72px]
                            "
                                                    >
                                                        <img
                                                            src={toAbsoluteUrl(
                                                                `/media/store/client/600x600/${item.product.logo}`,
                                                            )}
                                                            alt={item.product.title}
                                                            className="
                                size-full p-1.5 object-contain
                              "
                                                        />
                                                    </Card>

                                                    {/* Info */}
                                                    <div className="flex min-w-0 flex-col justify-center gap-2">
                                                        <Link
                                                            href={`/store/product/${item.product.slug}`}
                                                            onClick={() => onOpenChange(false)}
                                                            className="
                                text-right text-base font-semibold
                                leading-6 text-foreground
                                transition-colors hover:text-primary
                                max-sm:text-sm max-sm:leading-5
                              "
                                                        >
                                                            {item.product.title}
                                                        </Link>

                                                        <div className="flex flex-wrap items-center gap-2">
                              <span
                                  className="
                                  text-sm text-muted-foreground
                                  max-sm:text-xs
                                "
                              >
                                کد:{' '}
                                  <span className="font-medium text-foreground">
                                  {item.product.sku}
                                </span>
                              </span>

                                                            <DiscountBadge discount={item.product.discount}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div
                                                    className="
                            flex shrink-0 flex-col items-end gap-3
                            max-sm:absolute max-sm:inset-x-3
                            max-sm:bottom-3 max-sm:flex-row
                            max-sm:items-center max-sm:justify-between
                          "
                                                >
                                                    {/* Quantity + Delete */}
                                                    <div className="flex items-center gap-2">
                                                        <Select
                                                            defaultValue={String(item.quantity)}
                                                        >
                                                            <SelectTrigger
                                                                size="sm"
                                                                className="h-9 w-[56px] rounded-md text-xs max-sm:h-8 max-sm:w-[48px]"
                                                            >
                                                                <SelectValue/>
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
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => onRemoveItem(item.id)}
                                                            aria-label="حذف محصول از سبد خرید"
                                                            className="size-9 rounded-md max-sm:size-8"
                                                        >
                                                            <TrashIcon className="size-4 max-sm:size-3.5"/>
                                                        </Button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="flex flex-col items-end gap-0.5">
                                                        {item.originalPrice != null && (
                                                            <span
                                                                className="
                                  text-sm text-muted-foreground
                                  line-through max-sm:text-xs
                                "
                                                            >
                                {toPersianSplit(item.originalPrice)}
                                                                {' '}تومان
                              </span>
                                                        )}

                                                        <span
                                                            className="
                                text-base font-bold text-foreground
                                max-sm:text-sm
                              "
                                                        >
                              {toPersianSplit(item.price)} تومان
                            </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
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

                    {/* Total */}
                    <div
                        className="
              mt-2 flex shrink-0 items-center justify-between
              gap-4 rounded-md
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
              {toPersianSplit('492,000')} تومان
            </span>
                    </div>
                </SheetBody>

                {/* Footer */}
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
              rounded-md border border-indigo-500/20
              bg-indigo-600 px-4 text-base font-semibold
              text-white hover:bg-indigo-700
              focus-visible:bg-indigo-600
            "
                    >
                        <Link
                            href="/store/checkout/order-summary"
                            onClick={() => onOpenChange(false)}
                        >
                            <ShoppingCart className="size-5"/>
                            ادامه و پرداخت
                        </Link>
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="
              h-14 min-h-14 shrink-0
              rounded-md border-border
              px-4 text-sm font-medium
            "
                    >
                        ادامه خرید
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
