
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Minus,
    Plus,
    ShoppingCart,
    Star,
    Trash2,
    Truck,
} from 'lucide-react';

import {toAbsoluteUrl} from '@/lib/helpers';
import {getProductBySlug} from '@/store/product/services/product-service';
import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Card, CardContent} from '@/store/components/ui/card';
import {useStoreClient} from '@/store/components/context';
import {toPersianDigits} from '@/lib/to-persian-digits';

const reviews = [
    {
        id: 1,
        name: 'رضا',
        rating: 5,
        date: '۲ روز پیش',
        text: 'کیفیت محصول خیلی خوب بود و دقیقاً چیزی بود که انتظار داشتم.',
    },
    {
        id: 2,
        name: 'علی',
        rating: 4,
        date: '۵ روز پیش',
        text: 'طرح خیلی قشنگیه و کیفیت چاپ هم قابل قبوله.',
    },
    {
        id: 3,
        name: 'محمد',
        rating: 5,
        date: '۱ هفته پیش',
        text: 'سایزش دقیق بود و جنس محصول هم خیلی خوبه.',
    },
];

function Rating({rating = 0, outOf = 5}) {
    return (
        <div dir="ltr" className="flex items-center gap-0.5">
            {Array.from({length: outOf}, (_, index) => {
                const filled = index + 1 <= rating;

                return (
                    <Star
                        key={index}
                        className={`size-4 ${
                            filled
                                ? 'text-yellow-400'
                                : 'text-muted-foreground/25'
                        }`}
                        fill={filled ? 'currentColor' : 'none'}
                        strokeWidth={1.8}
                    />
                );
            })}
        </div>
    );
}

function FAQItem({question, answer, defaultOpen = false}) {
    const [open, setOpen] = React.useState(defaultOpen);

    return (
        <div className="border-b border-border/60 last:border-b-0">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-right"
            >
                <span className="text-sm font-medium text-mono">
                    {question}
                </span>

                <ChevronLeft
                    className={`size-4 shrink-0 text-secondary-foreground transition-transform duration-300 ${
                        open ? '-rotate-90' : ''
                    }`}
                />
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-secondary-foreground">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ProductPage({params}) {
    const {handleAddToCart} = useStoreClient();

    const {slug} = React.use(params);
    const product = getProductBySlug(slug);

    const [selectedImage, setSelectedImage] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [isAddedToCart, setIsAddedToCart] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    if (!product) {
        return (
            <div
                dir="rtl"
                className="container mx-auto max-w-6xl px-4 py-16 sm:px-6"
            >
                <Card className="border-border/60">
                    <CardContent className="flex flex-col items-center justify-center gap-4 py-20">
                        <div className="flex size-16 items-center justify-center rounded-full bg-accent">
                            <ShoppingCart className="size-7 text-muted-foreground"/>
                        </div>

                        <span className="text-lg font-semibold text-mono">
                            محصول پیدا نشد
                        </span>

                        <span className="text-sm text-secondary-foreground">
                            محصول موردنظر وجود ندارد یا حذف شده است.
                        </span>

                        <Button
                            asChild
                            className="mt-2 bg-indigo-500 text-white hover:bg-indigo-600"
                        >
                            <Link href="/store">
                                بازگشت به فروشگاه
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const images = product.images?.length
        ? product.images
        : [product.logo];

    const colors = product.colors ?? [
        {name: 'مشکی', value: '#111111'},
        {name: 'سفید', value: '#ffffff'},
    ];

    const sizes = product.sizes ?? [
        'S',
        'M',
        'L',
        'XL',
        'XXL',
    ];

    const formattedPrice = product.price.toLocaleString('en-US');

    const formattedOriginalPrice =
        product.originalPrice?.toLocaleString('en-US');

    const decreaseQuantity = () => {
        setQuantity((current) => {
            if (current <= 1) {
                setIsAddedToCart(false);
                return 0;
            }

            return current - 1;
        });
    };

    const increaseQuantity = () => {
        if (!isAddedToCart) {
            return;
        }

        setQuantity((current) => current + 1);
    };

    const removeProductFromCart = () => {
        setQuantity(0);
        setIsAddedToCart(false);
    };

    const addProductToCart = () => {
        handleAddToCart({
            productId: product.id,
            quantity: 1,
            color: selectedColor,
            size: selectedSize,
        });

        setIsAddedToCart(true);
        setQuantity((current) => current + 1);
    };

    const goToPreviousImage = () => {
        setSelectedImage((current) =>
            current > 0 ? current - 1 : current
        );
    };

    const goToNextImage = () => {
        setSelectedImage((current) =>
            current < images.length - 1
                ? current + 1
                : current
        );
    };

    return (
        <div
            dir="rtl"
            className="container mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8"
        >
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-1.5 overflow-hidden text-xs text-secondary-foreground">
                <Link
                    href="/store"
                    className="shrink-0 transition-colors hover:text-indigo-500"
                >
                    فروشگاه
                </Link>

                <ChevronLeft className="size-3.5 shrink-0"/>

                <span className="shrink-0">
                    {product.category}
                </span>

                <ChevronLeft className="size-3.5 shrink-0"/>

                <span className="truncate text-foreground">
                    {product.title}
                </span>
            </div>

            {/* Main Product */}
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

                {/* Gallery */}
                <div className="min-w-0">
                    <div className="flex flex-col gap-4">

                        {/* Main Image */}
                        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-accent/20">
                            {product.discount > 0 && (
                                <Badge
                                    size="sm"
                                    variant="destructive"
                                    className="absolute start-5 top-5 z-20 rounded-full px-3"
                                >
                                    {toPersianDigits(
                                        String(product.discount)
                                    )}
                                    ٪ تخفیف
                                </Badge>
                            )}

                            {/* Previous */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={goToPreviousImage}
                                        disabled={selectedImage === 0}
                                        aria-label="تصویر قبلی"
                                        className="absolute start-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-20"
                                    >
                                        <ChevronRight className="size-4"/>
                                    </button>

                                    {/* Next */}
                                    <button
                                        type="button"
                                        onClick={goToNextImage}
                                        disabled={
                                            selectedImage === images.length - 1
                                        }
                                        aria-label="تصویر بعدی"
                                        className="absolute end-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-20"
                                    >
                                        <ChevronLeft className="size-4"/>
                                    </button>
                                </>
                            )}

                            {/* Image */}
                            <div className="flex min-h-[430px] items-center justify-center p-8 sm:min-h-[500px] sm:p-12">
                                <img
                                    src={toAbsoluteUrl(
                                        `/media/store/client/600x600/${images[selectedImage]}`
                                    )}
                                    alt={product.title}
                                    className="max-h-[450px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-1">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex size-[78px] shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-accent/20 p-1 transition-all ${
                                            selectedImage === index
                                                ? 'border-indigo-500 ring-2 ring-indigo-500/10'
                                                : 'border-border/60 hover:border-indigo-500/50'
                                        }`}
                                    >
                                        <img
                                            src={toAbsoluteUrl(
                                                `/media/store/client/600x600/${image}`
                                            )}
                                            alt={`${product.title} ${index + 1}`}
                                            className="size-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex min-w-0 flex-col">

                    {/* Brand */}
                    {product.brand && (
                        <span className="mb-2 text-sm font-medium text-indigo-500">
                            {product.brand}
                        </span>
                    )}

                    {/* Title */}
                    <h1 className="text-2xl font-bold leading-9 tracking-tight text-mono sm:text-3xl">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Rating
                                rating={Math.round(
                                    product.rating ?? 0
                                )}
                            />

                            <span className="text-sm font-semibold text-mono">
                                {toPersianDigits(
                                    String(product.rating ?? 0)
                                )}
                            </span>
                        </div>

                        <span className="h-4 w-px bg-border"/>

                        <span className="text-xs text-secondary-foreground">
                            {toPersianDigits(
                                String(product.reviewCount ?? 0)
                            )}{' '}
                            نظر کاربران
                        </span>
                    </div>

                    {/* Short Description */}
                    <p className="mt-5 text-sm leading-7 text-secondary-foreground">
                        {product.description}
                    </p>

                    {/* Price Box */}
                    <div className="mt-6 rounded-xl bg-accent/40 p-4">
                        <div className="flex items-end justify-between gap-4">

                            <div className="flex flex-col items-start gap-1">
                                {product.originalPrice && (
                                    <span className="text-sm text-secondary-foreground line-through">
                                        {toPersianDigits(
                                            formattedOriginalPrice
                                        )}{' '}
                                        تومان
                                    </span>
                                )}

                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-mono sm:text-3xl">
                                        {toPersianDigits(
                                            formattedPrice
                                        )}
                                    </span>

                                    <span className="text-sm font-medium text-mono">
                                        تومان
                                    </span>
                                </div>
                            </div>

                            {product.discount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="rounded-full px-3 py-1"
                                >
                                    {toPersianDigits(
                                        String(product.discount)
                                    )}
                                    ٪ تخفیف
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-7 h-px bg-border/70"/>

                    {/* Color */}
                    {colors.length > 0 && (
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-sm font-semibold text-mono">
                                    رنگ:
                                </span>

                                {selectedColor && (
                                    <span className="text-sm text-secondary-foreground">
                                        {selectedColor.name}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        title={color.name}
                                        aria-label={`انتخاب رنگ ${color.name}`}
                                        className={`flex size-10 items-center justify-center rounded-full border-2 transition-all ${
                                            selectedColor?.name === color.name
                                                ? 'border-indigo-500'
                                                : 'border-border hover:border-indigo-500/50'
                                        }`}
                                    >
                                        <span
                                            className="size-7 rounded-full border border-black/10"
                                            style={{
                                                backgroundColor: color.value,
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size */}
                    {sizes.length > 0 && (
                        <div className="mt-7">
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/icons/ruler.png"
                                        alt=""
                                        className="size-6 shrink-0 object-contain"
                                    />

                                    <span className="text-sm font-semibold text-mono">
                                        سایز
                                    </span>

                                    {selectedSize && (
                                        <span className="text-sm text-secondary-foreground">
                                            {toPersianDigits(selectedSize)}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className="text-xs font-medium text-indigo-500 transition-colors hover:text-indigo-600 hover:underline"
                                >
                                    راهنمای سایز
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[52px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                                            selectedSize === size
                                                ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                                                : 'border-border bg-background text-foreground hover:border-indigo-500 hover:text-indigo-500'
                                        }`}
                                    >
                                        {toPersianDigits(size)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity + Cart */}
                    <div className="mt-8 flex items-center gap-2 sm:gap-3">

                        {/* Quantity */}
                        <div
                            className={`flex h-12 shrink-0 items-center rounded-lg border border-border bg-background transition-opacity ${
                                !isAddedToCart ? 'opacity-50' : ''
                            }`}
                        >
                            <button
                                type="button"
                                onClick={
                                    quantity === 1
                                        ? removeProductFromCart
                                        : decreaseQuantity
                                }
                                disabled={!isAddedToCart}
                                className="flex size-11 items-center justify-center text-secondary-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label={
                                    quantity === 1
                                        ? 'حذف محصول'
                                        : 'کاهش تعداد'
                                }
                            >
                                {quantity === 1 ? (
                                    <Trash2 className="size-4 text-red-500"/>
                                ) : (
                                    <Minus className="size-4"/>
                                )}
                            </button>

                            <span className="w-8 text-center text-sm font-semibold text-mono">
                                {toPersianDigits(quantity)}
                            </span>

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={!isAddedToCart}
                                className="flex size-11 items-center justify-center text-secondary-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="افزایش تعداد"
                            >
                                <Plus className="size-4"/>
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <Button
                            onClick={addProductToCart}
                            disabled={!product.stock}
                            className="h-12 grow rounded-lg bg-indigo-500 font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-500/20"
                        >
                            <ShoppingCart className="size-4"/>
                            {product.stock
                                ? 'افزودن به سبد خرید'
                                : 'ناموجود'}
                        </Button>

                        {/* Wishlist */}
                        <Button
                            type="button"
                            variant="outline"
                            mode="icon"
                            onClick={() =>
                                setIsFavorite((current) => !current)
                            }
                            className={`size-12 shrink-0 rounded-lg transition-colors ${
                                isFavorite
                                    ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30'
                                    : ''
                            }`}
                            aria-label="افزودن به علاقه‌مندی‌ها"
                        >
                            <Heart
                                className="size-4"
                                fill={isFavorite ? 'currentColor' : 'none'}
                            />
                        </Button>
                    </div>

                    {/* Shipping */}
                    <div className="mt-6 rounded-xl border border-border/60 bg-accent/20 p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                                <img
                                    src="/icons/delivery.png"
                                    alt=""
                                    className="size-7 object-contain"
                                />
                            </div>

                            <div className="flex min-w-0 flex-col gap-1">
                                <span className="text-sm font-semibold text-mono">
                                    ارسال به سراسر کشور
                                </span>

                                <span className="text-xs leading-6 text-secondary-foreground">
                                    سفارش شما پس از آماده‌سازی برای ارسال
                                    تحویل پست یا شرکت حمل‌ونقل می‌شود.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Product Code */}
                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-5 text-xs">
                        <span className="text-secondary-foreground">
                            کد محصول
                        </span>

                        <span className="font-medium text-foreground">
                            {product.sku}
                        </span>
                    </div>
                </div>
            </section>

            {/* About + Specifications */}
            <section className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">

                {/* Description */}
                <Card className="overflow-hidden border-border/60 lg:col-span-2">
                    <CardContent className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-2">
                            <img
                                src="/icons/information.png"
                                alt=""
                                className="size-8 shrink-0 object-contain"
                            />

                            <h2 className="text-base font-semibold text-mono">
                                درباره محصول
                            </h2>
                        </div>

                        <p className="text-sm leading-8 text-foreground/90">
                            {product.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Specifications */}
                <Card className="overflow-hidden border-border/60">
                    <CardContent className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-2">
                            <img
                                src="/icons/specification.png"
                                alt=""
                                className="size-7 shrink-0 object-contain"
                            />

                            <h2 className="text-base font-semibold text-mono">
                                مشخصات محصول
                            </h2>
                        </div>

                        <div className="flex flex-col">
                            <SpecificationRow
                                label="دسته‌بندی"
                                value={product.category}
                            />

                            <SpecificationRow
                                label="وضعیت"
                                value={
                                    product.stock
                                        ? 'موجود'
                                        : 'ناموجود'
                                }
                            />

                            <SpecificationRow
                                label="برند"
                                value={product.brand}
                            />

                            <SpecificationRow
                                label="کد محصول"
                                value={product.sku}
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Reviews */}
            <section className="mt-14">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-mono">
                            نظرات کاربران
                        </h2>

                        <p className="mt-1 text-xs text-secondary-foreground">
                            تجربه خریداران این محصول
                        </p>
                    </div>

                    <span className="text-xs text-secondary-foreground">
                        {toPersianDigits(
                            String(product.reviewCount ?? 0)
                        )}{' '}
                        نظر
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">

                    {/* Rating Summary */}
                    <Card className="border-border/60">
                        <CardContent className="flex min-h-[210px] flex-col items-center justify-center p-6">
                            <span className="text-4xl font-bold text-mono">
                                {toPersianDigits(
                                    String(product.rating ?? 0)
                                )}
                            </span>

                            <div className="mt-3">
                                <Rating
                                    rating={Math.round(
                                        product.rating ?? 0
                                    )}
                                />
                            </div>

                            <span className="mt-3 text-xs text-secondary-foreground">
                                بر اساس{' '}
                                {toPersianDigits(
                                    String(product.reviewCount ?? 0)
                                )}{' '}
                                نظر
                            </span>
                        </CardContent>
                    </Card>

                    {/* Reviews */}
                    <div className="flex flex-col gap-3">
                        {reviews.map((review) => (
                            <Card
                                key={review.id}
                                className="border-border/60"
                            >
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-mono">
                                                {review.name.charAt(0)}
                                            </div>

                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-semibold text-mono">
                                                    {review.name}
                                                </span>

                                                <span className="text-xs text-secondary-foreground">
                                                    {review.date}
                                                </span>
                                            </div>
                                        </div>

                                        <Rating
                                            rating={review.rating}
                                        />
                                    </div>

                                    <p className="mt-4 text-sm leading-7 text-foreground/90">
                                        {review.text}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}

                        <Button
                            variant="outline"
                            className="mt-1 h-11 w-full justify-center"
                        >
                            مشاهده همه نظرات
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mt-14">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-mono">
                        سؤالات متداول
                    </h2>

                    <p className="mt-1 text-xs text-secondary-foreground">
                        پاسخ پرسش‌های متداول درباره این محصول
                    </p>
                </div>

                <Card className="overflow-hidden border-border/60">
                    <CardContent className="p-0">
                        <FAQItem
                            defaultOpen
                            question="آیا امکان تعویض سایز وجود دارد؟"
                            answer="بله. در صورتی که محصول استفاده نشده باشد و شرایط تعویض را داشته باشد، امکان تعویض سایز وجود دارد. برای اطلاع از شرایط دقیق تعویض می‌توانید با پشتیبانی فروشگاه تماس بگیرید."
                        />

                        <FAQItem
                            question="جنس این محصول چیست؟"
                            answer="جنس محصول بسته به نوع آن متفاوت است. مشخصات دقیق جنس، نوع پارچه و سایر ویژگی‌های محصول در بخش «مشخصات محصول» همین صفحه قرار گرفته است."
                        />

                        <FAQItem
                            question="مدت زمان ارسال سفارش چقدر است؟"
                            answer="پس از ثبت سفارش و آماده‌سازی محصول، سفارش شما برای ارسال تحویل شرکت حمل‌ونقل خواهد شد. زمان دقیق ارسال بسته به مقصد متفاوت است."
                        />
                    </CardContent>
                </Card>
            </section>

            {/* Related Products */}
            <section className="mt-14 pb-10">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-mono">
                            محصولات مشابه
                        </h2>

                        <p className="mt-1 text-xs text-secondary-foreground">
                            شاید این محصولات هم مورد پسند شما باشند
                        </p>
                    </div>

                    <Link
                        href="/store"
                        className="text-xs font-medium text-indigo-500 transition-colors hover:text-indigo-600 hover:underline"
                    >
                        مشاهده همه
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    <RelatedProductCard
                        id={101}
                        title="هودی مشکی لوگوی کانال"
                        logo="1.png"
                        price={1290000}
                        slug="nike-cloud-shift-runner"
                    />

                    <RelatedProductCard
                        id={102}
                        title="تیشرت مشکی Merch"
                        logo="2.png"
                        price={790000}
                        slug="adidas-ultra-runner"
                    />

                    <RelatedProductCard
                        id={103}
                        title="کلاه اختصاصی کانال"
                        logo="3.png"
                        price={590000}
                        slug="puma-running-pro"
                    />

                    <RelatedProductCard
                        id={104}
                        title="ماگ اختصاصی Merch"
                        logo="4.png"
                        price={490000}
                        slug="new-balance-fresh-runner"
                    />
                </div>
            </section>
        </div>
    );
}

function SpecificationRow({label, value}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-border/50 py-3 first:pt-0 last:border-b-0 last:pb-0">
            <span className="text-xs text-secondary-foreground">
                {label}
            </span>

            <span className="max-w-[60%] truncate text-left text-xs font-medium text-foreground">
                {value || '-'}
            </span>
        </div>
    );
}

function RelatedProductCard({
                                title,
                                logo,
                                price,
                                slug,
                            }) {
    return (
        <Link
            href={`/store/product/${slug}`}
            className="group block"
        >
            <Card className="h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-[210px] items-center justify-center overflow-hidden bg-accent/20 p-5 sm:h-[230px]">
                    <img
                        src={toAbsoluteUrl(
                            `/media/store/client/600x600/${logo}`
                        )}
                        alt={title}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <CardContent className="p-4">
                    <h3 className="line-clamp-2 text-sm font-medium leading-6 text-mono">
                        {title}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-sm font-bold text-mono">
                            {toPersianDigits(
                                price.toLocaleString('en-US')
                            )}
                        </span>

                        <span className="text-xs text-secondary-foreground">
                            تومان
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

