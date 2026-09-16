import Link from 'next/link';
import {ShoppingCart, TrashIcon} from 'lucide-react';
import {toAbsoluteUrl} from '@/lib/helpers';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {ScrollArea} from '@/store/components/ui/scroll-area';
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
import {toPersianDigits, toPersianSplit} from '@/lib/to-persian';

export function StoreClientCartSheet({
                                         open,
                                         onOpenChange,
                                         items = [],
                                         onRemoveItem,
                                     }) {
    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="left"
                dir="rtl"
                className="
                    sm:w-[560px]
                    sm:max-w-none
                    inset-y-5
                    right-5
                    left-auto
                    h-[calc(100%-2.5rem)]
                    rounded-xl
                    p-0
                    overflow-hidden
                    flex
                    flex-col

                    max-sm:inset-y-0
                    max-sm:right-0
                    max-sm:left-auto
                    max-sm:h-full
                    max-sm:w-[85%]
                    max-sm:max-w-[380px]
                    max-sm:rounded-none

                    max-sm:[&_[data-slot=sheet-close]]:hidden
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
                        max-sm:hidden
                    "
                >
                    <SheetTitle className="text-right text-base">
                        سبد خرید
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

                        <div className="px-1 py-5 max-sm:pt-2">

                            {items.length > 0 ? (
                                <div className="flex flex-col gap-4">

                                    {items.map((item) => (
                                        <Card
    key={item.id}
    className="
        py-3
        shadow-none
        max-sm:relative
        max-sm:pb-[70px]
    "
>
                                            <CardContent
                                                dir="rtl"
                                                className="
                                                    p-2
                                                    pe-4
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                    w-full
                                                "
                                            >

                                                {/* =========================
                                                   Product
                                                ========================== */}

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        min-w-0
                                                        flex-1
                                                    "
                                                >

                                                    {/* Image */}

                                                    <Card
                                                        className="
                                                            flex
                                                            items-center
                                                            justify-center
                                                            bg-accent/50
                                                            h-[70px]
                                                            w-[90px]
                                                            shadow-none
                                                            shrink-0

                                                            max-sm:h-[65px]
                                                            max-sm:w-[70px]
                                                        "
                                                    >
                                                        <img
                                                            src={toAbsoluteUrl(
                                                                `/media/store/client/600x600/${item.product.logo}`
                                                            )}
                                                            className="
                                                                h-[65px]
                                                                object-contain

                                                                max-sm:h-[55px]
                                                            "
                                                            alt={item.product.title}
                                                        />
                                                    </Card>


                                                    {/* Info */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col
                                                            justify-center
                                                            gap-2
                                                            min-w-0
                                                        "
                                                    >

                                                        <Link
                                                            href={`/store/product/${item.product.slug}`}
                                                            onClick={() =>
                                                                onOpenChange(false)
                                                            }
                                                            className="
                                                                text-sm
                                                                font-medium
                                                                text-mono
                                                                leading-5.5
                                                                hover:text-primary

                                                                max-sm:text-xs
                                                                max-sm:leading-5
                                                            "
                                                        >
                                                            {item.product.title}
                                                        </Link>


                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                flex-wrap
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    text-xs
                                                                    text-secondary-foreground

                                                                    max-sm:text-[10px]
                                                                "
                                                            >
                                                                SKU:{' '}

                                                                <span
                                                                    className="
                                                                        font-medium
                                                                        text-foreground
                                                                    "
                                                                >
                                                                    {item.product.sku}
                                                                </span>
                                                            </span>


                                                            {item.badge && (
                                                                <Badge
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    className="
                                                                        uppercase
                                                                        shrink-0

                                                                        max-sm:text-[10px]
                                                                    "
                                                                >
                                                                    تخفیف
                                                                </Badge>
                                                            )}

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* =========================
                                                   Actions
                                                ========================== */}

                                                <div
                                                    className="
        flex
        flex-col
        items-end
        gap-2
        shrink-0

        max-sm:absolute
        max-sm:start-4
        max-sm:end-4
        max-sm:bottom-3
        max-sm:flex-row
        max-sm:items-center
        max-sm:justify-between
    "
                                                >


                                                    {/* Quantity + Delete */}
<div className="flex items-center gap-2">
    <Select defaultValue={String(item.quantity)}>
        <SelectTrigger
            size="sm"
            className="
                w-[54px]
                max-sm:w-[52px]
                max-sm:h-9
                max-sm:text-sm
            "
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
        size="sm"
        variant="outline"
        mode="icon"
        onClick={() => onRemoveItem(item.id)}
        className="
            max-sm:size-9
        "
    >
        <TrashIcon className="max-sm:size-4" />
    </Button>
</div>


                                                    {/* Price */}

                                                    <div className="flex flex-col items-end gap-0.5">
                                                        {item.originalPrice && (
                                                            <span
                                                                className="
                text-xs
                text-secondary-foreground
                line-through
                max-sm:text-xs
            "
                                                            >
            {toPersianSplit(item.originalPrice)}&nbsp;تومان
        </span>
                                                        )}

                                                        <span
                                                            className="
            text-sm
            font-semibold
            text-mono
            max-sm:text-sm
        "
                                                        >
        {toPersianSplit(item.price)}&nbsp;تومان
    </span>
                                                    </div>

                                                </div>

                                            </CardContent>
                                        </Card>
                                    ))}

                                </div>
                            ) : (

                                /* =========================
                                   Empty Cart
                                ========================== */

                                <div
                                    className="
                                        flex
                                        h-[300px]
                                        items-center
                                        justify-center
                                    "
                                >
                                    <span className="text-sm text-muted-foreground">
                                        سبد خرید شما خالی است.
                                    </span>
                                </div>

                            )}

                        </div>

                    </ScrollArea>


                    {/* =================================================
                       Total
                    ================================================= */}

                    <div
                        className="
                            shrink-0
                            flex
                            items-center
                            justify-between
                            gap-5
                            px-1
                            pt-3
                            pb-3
                        "
                    >

                        <span
                            className="
                                text-sm
                                font-medium
                                text-muted-foreground

                                max-sm:text-xs
                            "
                        >
                            جمع کل
                        </span>

                        <div
                            className="
                                flex
                                flex-row-reverse
                                items-center
                                gap-1
                            "
                        >
                            <span
                                className="
                                    text-lg
                                    font-bold
                                    text-foreground

                                    max-sm:text-base
                                "
                            >
                                {toPersianSplit('492,000')}&nbsp;تومان
                            </span>
                        </div>


                    </div>

                </SheetBody>


                {/* =================================================
                   Footer
                ================================================= */}

                <SheetFooter
                    className="
        w-full
        shrink-0
        border-t
        border-border
        max-sm:mb-16
        flex-row
        gap-0
        p-0
    "
                >
                    <Button
                        asChild
                        className="
            h-full
            min-h-[56px]
            flex-1
            rounded-none
            justify-center
            bg-indigo-500
            px-5
            py-5
            text-white
            hover:bg-indigo-600
        "
                    >
                        <Link
                            href="/store/checkout/order-summary"
                            onClick={() => onOpenChange(false)}
                        >
                            <ShoppingCart/>
                            ادامه و پرداخت
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        className="
            h-full
            min-h-[56px]
            w-auto
            shrink-0
            rounded-none
            justify-center
            border-0
            px-4
            py-5
            shadow-none
        "
                        onClick={() => onOpenChange(false)}
                    >
                        ادامه خرید
                    </Button>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
}