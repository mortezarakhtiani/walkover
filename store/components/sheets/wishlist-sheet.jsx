
import Link from 'next/link';
import {ShoppingCart, Star, TrashIcon} from 'lucide-react';

import {toAbsoluteUrl} from '@/lib/helpers';
import {toPersianSplit} from '@/lib/to-persian';

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


const items = [
    {
        logo: '11.png',
        title: 'Cloud Shift Lightweight Runner Pro Edition',
        total: '120000',
        star: '5.0',
        brand: 'Nike',
    },
    {
        logo: '12.png',
        title: 'Titan Edge High Impact Stability Lightweight',
        total: '99000',
        star: '3.9',
        brand: 'Puma',
    },
    {
        logo: '13.png',
        title: 'Wave Strike Dynamic Boost Sneaker',
        label: '179000',
        total: '144000',
        badge: true,
        star: '4.6',
        brand: 'Campers',
    },
    {
        logo: '15.png',
        title: 'Cloud Shift Lightweight Runner Pro Edition',
        label: '179000',
        total: '230000',
        star: '4.2',
        brand: 'Puma',
    },
];


export function StoreClientWishlistSheet({
    open,
    onOpenChange,
}) {
    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >


<SheetContent
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
```


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
                        علاقه‌مندی‌ها
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

                                    {items.map((item, index) => (

                                        <Card
                                            key={index}
                                            className="
                                                py-3
                                                shadow-none

                                                max-sm:relative
                                                max-sm:pb-[62px]
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
                                                                `/media/store/client/600x600/${item.logo}`
                                                            )}
                                                            className="
                                                                h-[65px]
                                                                object-contain

                                                                max-sm:h-[55px]
                                                            "
                                                            alt={item.title}
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
                                                            href="#"
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
                                                            {item.title}
                                                        </Link>


                                                        {/* SKU / Badge */}

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
                                                                برند:{' '}

                                                                <span
                                                                    className="
                                                                        font-medium
                                                                        text-foreground
                                                                    "
                                                                >
                                                                    {item.brand}
                                                                </span>
                                                            </span>


                                                            {item.badge && (
                                                                <Badge
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    className="
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

                                                    {/* Add + Delete */}

                                                    <div className="flex items-center gap-2">

                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {}}
                                                            className="
                                                                max-sm:h-9
                                                                max-sm:text-xs
                                                            "
                                                        >
                                                            <ShoppingCart
                                                                className="size-4"
                                                            />

                                                            افزودن به سبد
                                                        </Button>


                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            mode="icon"
                                                            className="
                                                                max-sm:size-9
                                                            "
                                                        >
                                                            <TrashIcon
                                                                className="size-4"
                                                            />
                                                        </Button>

                                                    </div>


                                                    {/* Price */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col
                                                            items-end
                                                            gap-0.5
                                                        "
                                                    >

                                                        {item.label && (
                                                            <span
                                                                className="
                                                                    text-xs
                                                                    text-secondary-foreground
                                                                    line-through

                                                                    max-sm:text-[10px]
                                                                "
                                                            >
                                                                {toPersianSplit(item.label)}
                                                                &nbsp;تومان
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
                                                            {toPersianSplit(item.total)}
                                                            &nbsp;تومان
                                                        </span>

                                                    </div>

                                                </div>

                                            </CardContent>

                                        </Card>

                                    ))}

                                </div>

                            ) : (

                                /* =========================
                                   Empty Wishlist
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
                                        لیست علاقه‌مندی‌های شما خالی است.
                                    </span>

                                </div>

                            )}

                        </div>

                    </ScrollArea>

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
                        variant="ghost"
                        className="
                            h-full
                            min-h-[56px]

                            flex-1

                            rounded-none
                            justify-center

                            border-0

                            px-5
                            py-5

                            shadow-none

                            hover:bg-muted
                        "
                        onClick={() => {}}
                    >
                        حذف همه
                    </Button>


                    <Button
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
                        onClick={() => onOpenChange(false)}
                    >
                        <ShoppingCart className="size-4" />

                        مشاهده سبد خرید
                    </Button>

                </SheetFooter>

            </SheetContent>

        </Sheet>
    );
}

