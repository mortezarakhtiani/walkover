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
import {toPersianDigits} from '@/lib/to-persian-digits';

export function StoreClientCartSheet({
                                         open,
                                         onOpenChange,
                                         items = [],
                                         onRemoveItem,
                                     }) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className="store-theme sm:w-[560px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5"
            >
                <SheetHeader className="border-b py-3.5 px-5 border-border">
                    <SheetTitle>سبد خرید</SheetTitle>
                </SheetHeader>

                <SheetBody className="px-5 py-0">
                    <ScrollArea className="h-[calc(100dvh-12rem)] pe-3 -me-3 space-y-5">

                        {items.map((item) => (
                            <Card className="mb-5 py-3" key={item.id}>
                                <CardContent
                                    dir="rtl"
                                    className="p-2 pe-5 flex items-center flex-wrap sm:flex-nowrap w-full justify-between gap-3.5"
                                >
                                    <div className="flex md:items-center gap-4">

                                        <Card
                                            className="flex items-center justify-center bg-accent/50 h-[70px] w-[90px] shadow-none shrink-0"
                                        >
                                            <img
                                                src={toAbsoluteUrl(
                                                    `/media/store/client/600x600/${item.product.logo}`
                                                )}
                                                className="h-[70px]"
                                                alt={item.product.title}
                                            />
                                        </Card>

                                        <div className="flex flex-col justify-center gap-2.5 -mt-1">

                                            <Link
                                                href={`/store/product/${item.product.slug}`}
                                                className="hover:text-primary text-sm font-medium text-mono leading-5.5"
                                            >
                                                {item.product.title}
                                            </Link>

                                            <div className="flex items-center gap-2">

                                                <span className="text-xs font-normal text-secondary-foreground">
                                                    SKU:{' '}
                                                    <span className="text-xs font-medium text-foreground">
                                                        {item.product.sku}
                                                    </span>
                                                </span>

                                                {item.badge && (
                                                    <Badge
                                                        size="sm"
                                                        variant="destructive"
                                                        className="uppercase shrink-0"
                                                    >
                                                        تخفیف
                                                    </Badge>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center flex-col gap-3">

                                        <div className="flex items-center sm:justify-end gap-2">

                                            <Select defaultValue={String(item.quantity)}>
                                                <SelectTrigger
                                                    className="w-[50px]"
                                                    size="sm"
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
                                                size="sm"
                                                variant="outline"
                                                mode="icon"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                <TrashIcon/>
                                            </Button>

                                        </div>

                                        <div className="flex flex-col items-end sm:justify-end gap-0.5 mt-5">

                                            {item.originalPrice && (
                                                <span
                                                    className="text-xs font-normal text-secondary-foreground line-through">
                                                    {toPersianDigits(item.originalPrice)} تومان
                                                </span>
                                            )}

                                            <span className="text-sm font-semibold text-mono">
                                                {toPersianDigits(item.price)} تومان
                                            </span>

                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <div
                            className="flex items-center justify-between border-none rounded-md bg-accent/50 gap-5 py-4 px-5 !mt-[30px]">

                            <div className="flex flex-row-reverse items-center gap-1">
                                <span className="font-semibold text-dark">
                                    {toPersianDigits('492,000')}
                                </span>

                                <span className="font-normal text-dark">
                                    تومان
                                </span>
                            </div>

                            <span className="font-medium text-mono">
                                جمع کل
                            </span>

                        </div>

                    </ScrollArea>
                </SheetBody>

                <SheetFooter className="flex-row border-t py-3.5 px-5 border-border gap-2">

                    <Button variant="primary" className="flex-2" asChild>
                        <Link
                            href="/store/checkout/order-summary"
                            onClick={() => onOpenChange(false)}
                        >
                            <ShoppingCart/>
                            ادامه و پرداخت
                        </Link>
                    </Button>

                    <Button variant="outline" className="flex-1">
                        ادامه خرید
                    </Button>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}