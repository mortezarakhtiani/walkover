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
        <div dir="ltr" className="flex items-center gap-1">
            {Array.from({length: outOf}, (_, index) => {
                const filled = index + 1 <= rating;

                return (
                    <Star
                        key={index}
                        className={`size-4 ${
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

function FAQItem({question, answer, defaultOpen = false}) {
    const [open, setOpen] = React.useState(defaultOpen);

    return (
        <div className="border-b border-border last:border-b-0">
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
                    open
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
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
    const [quantity, setQuantity] = React.useState(1);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState(null);

    if (!product) {
        return (
            <div
                dir="rtl"
                className="container max-w-6xl py-16"
            >
                <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
                        <span className="text-lg font-medium text-mono">
                            محصول پیدا نشد
                        </span>

                        <span className="text-sm text-secondary-foreground">
                            محصول موردنظر وجود ندارد یا حذف شده است.
                        </span>

                        <Button asChild variant="outline">
                            <Link href="/store">
                                بازگشت به فروشگاه
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    /*
     * فعلاً تصاویر را از همان logo می‌سازیم.
     * بعداً که API آماده شد، می‌توانیم images را مستقیماً
     * از Django دریافت کنیم.
     */
    const images = product.images?.length
        ? product.images
        : [product.logo];

    /*
     * فعلاً برای تست UI.
     * بعداً این موارد از API می‌آیند.
     */
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
        setQuantity((current) => Math.max(1, current - 1));
    };

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const addProductToCart = () => {
        handleAddToCart({
            productId: product.id,
            quantity,
            color: selectedColor,
            size: selectedSize,
        });
    };

    return (
        <div
            dir="rtl"
            className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
        >
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-xs text-secondary-foreground mb-6">
                <Link
                    href="/store"
                    className="hover:text-primary transition-colors"
                >
                    فروشگاه
                </Link>

                <ChevronLeft className="size-3.5"/>

                <span>
                    {product.category}
                </span>

                <ChevronLeft className="size-3.5"/>

                <span className="text-foreground">
                    {product.title}
                </span>
            </div>

            {/* Main Product */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Gallery */}
                <div className="flex flex-col gap-4">

                    {/* Main Image */}
                    <Card className="relative overflow-hidden bg-accent/30 border-border">
                        {product.discount > 0 && (
                            <Badge
                                size="sm"
                                variant="destructive"
                                className="absolute top-4 start-4 z-10"
                            >
                                {toPersianDigits(
                                    String(product.discount)
                                )}
                                ٪ تخفیف
                            </Badge>
                        )}

                        <button
                            type="button"
                            onClick={() => {
                                if (selectedImage > 0) {
                                    setSelectedImage(selectedImage - 1);
                                }
                            }}
                            disabled={selectedImage === 0}
                            className="absolute start-4 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-full bg-background/90 border border-border shadow-sm disabled:opacity-30"
                        >
                            <ChevronRight className="size-4"/>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (selectedImage < images.length - 1) {
                                    setSelectedImage(selectedImage + 1);
                                }
                            }}
                            disabled={selectedImage === images.length - 1}
                            className="absolute end-4 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-full bg-background/90 border border-border shadow-sm disabled:opacity-30"
                        >
                            <ChevronLeft className="size-4"/>
                        </button>

                        <div className="flex min-h-[420px] items-center justify-center p-6 sm:p-10">
                            <img
                                src={toAbsoluteUrl(
                                    `/media/store/client/600x600/${images[selectedImage]}`
                                )}
                                alt={product.title}
                                className="max-h-[400px] w-auto max-w-full object-contain"
                            />
                        </div>
                    </Card>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="flex items-center gap-3 overflow-x-auto pb-1">
                            {images.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex size-[76px] shrink-0 items-center justify-center rounded-md border bg-accent/30 overflow-hidden transition-colors ${
                                        selectedImage === index
                                            ? 'border-primary'
                                            : 'border-border hover:border-primary/50'
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

                {/* Product Info */}
                <div className="flex flex-col">

                    {/* Brand */}
                    {product.brand && (
                        <span className="text-sm text-secondary-foreground mb-2">
                            {product.brand}
                        </span>
                    )}

                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl font-semibold text-mono leading-8">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mt-3">
                        <Rating
                            rating={Math.round(product.rating ?? 0)}
                        />

                        <span className="text-sm font-medium text-mono">
                            {toPersianDigits(
                                String(product.rating ?? 0)
                            )}
                        </span>

                        <span className="text-xs text-secondary-foreground">
                            ({toPersianDigits(
                            String(product.reviewCount ?? 0)
                        )}{' '}
                            نظر)
                        </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-secondary-foreground leading-7 mt-5">
                        {product.description}
                    </p>

                    <div className="border-t border-border my-6"/>

                    {/* Price */}
                    <div className="flex items-end gap-3">
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-semibold text-mono">
                                {toPersianDigits(formattedPrice)}
                            </span>

                            <span className="text-sm font-medium text-mono">
                                تومان
                            </span>
                        </div>

                        {product.originalPrice && (
                            <span className="text-sm text-secondary-foreground line-through pb-1">
                                {toPersianDigits(
                                    formattedOriginalPrice
                                )}
                            </span>
                        )}
                    </div>

                    {/* Color */}
                    {colors.length > 0 && (
                        <div className="mt-7">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-mono">
                                    رنگ
                                </span>

                                {selectedColor && (
                                    <span className="text-xs text-secondary-foreground">
                                        {selectedColor.name}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() =>
                                            setSelectedColor(color)
                                        }
                                        title={color.name}
                                        className={`flex size-9 items-center justify-center rounded-full border-2 transition-all ${
                                            selectedColor?.name === color.name
                                                ? 'border-primary'
                                                : 'border-border'
                                        }`}
                                    >
                                        <span
                                            className="size-6 rounded-full border border-black/10"
                                            style={{
                                                backgroundColor:
                                                color.value,
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
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-mono">
                                    سایز
                                </span>

                                <button
                                    type="button"
                                    className="text-xs text-primary hover:underline"
                                >
                                    راهنمای سایز
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSize(size)
                                        }
                                        className={`min-w-[52px] rounded-md border px-4 py-2 text-sm transition-colors ${
                                            selectedSize === size
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border bg-background hover:border-primary'
                                        }`}
                                    >
                                        {toPersianDigits(size)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity + Cart */}
                    <div className="flex items-center gap-3 mt-8">
                        <div className="flex h-11 items-center rounded-md border border-border">
                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                                className="flex size-10 items-center justify-center text-secondary-foreground hover:text-foreground disabled:opacity-40"
                            >
                                <Minus className="size-4"/>
                            </button>

                            <span className="w-8 text-center text-sm font-medium text-mono">
                                {toPersianDigits(quantity)}
                            </span>

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                className="flex size-10 items-center justify-center text-secondary-foreground hover:text-foreground"
                            >
                                <Plus className="size-4"/>
                            </button>
                        </div>

                        <Button
                            onClick={addProductToCart}
                            disabled={!product.stock}
                            className="h-11 grow justify-center"
                        >
                            <ShoppingCart className="size-4"/>

                            {product.stock
                                ? 'افزودن به سبد خرید'
                                : 'ناموجود'}
                        </Button>

                        <Button
                            variant="outline"
                            mode="icon"
                            className="size-11 shrink-0"
                        >
                            <Heart className="size-4"/>
                        </Button>
                    </div>

                    {/* Shipping Info */}
                    <Card className="mt-6 bg-accent/30 border-border">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <Truck className="size-5 shrink-0 text-secondary-foreground mt-0.5"/>

                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-mono">
                                        ارسال به سراسر کشور
                                    </span>

                                    <span className="text-xs text-secondary-foreground leading-6">
                                        سفارش شما پس از آماده‌سازی
                                        برای ارسال تحویل پست یا
                                        شرکت حمل‌ونقل می‌شود.
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Code */}
                    <div className="flex items-center justify-between mt-5 text-xs">
                        <span className="text-secondary-foreground">
                            کد محصول
                        </span>

                        <span className="font-medium text-foreground">
                            {product.sku}
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Description & Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">

                {/* Description */}
                <Card className="lg:col-span-2">
                    <CardContent className="p-5 sm:p-6">
                        <h2 className="text-base font-semibold text-mono mb-4">
                            درباره محصول
                        </h2>

                        <p className="text-sm text-foreground leading-7">
                            {product.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Specifications */}
                <Card>
                    <CardContent className="p-5 sm:p-6">
                        <h2 className="text-base font-semibold text-mono mb-4">
                            مشخصات محصول
                        </h2>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-secondary-foreground">
                                    دسته‌بندی
                                </span>

                                <span className="text-xs font-medium text-foreground">
                                    {product.category}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-secondary-foreground">
                                    وضعیت
                                </span>

                                <span className="text-xs font-medium text-foreground">
                                    {product.stock
                                        ? 'موجود'
                                        : 'ناموجود'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-secondary-foreground">
                                    برند
                                </span>

                                <span className="text-xs font-medium text-foreground">
                                    {product.brand}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs text-secondary-foreground">
                                    کد محصول
                                </span>

                                <span className="text-xs font-medium text-foreground">
                                    {product.sku}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews */}
            <section className="mt-12">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-base font-semibold text-mono">
                            نظرات کاربران
                        </h2>

                        <span className="text-xs text-secondary-foreground">
                            تجربه خریداران این محصول
                        </span>
                    </div>

                    <span className="text-xs text-secondary-foreground">
                        {toPersianDigits(
                            String(product.reviewCount ?? 0)
                        )}{' '}
                        نظر
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Rating Summary */}
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[190px]">
                            <span className="text-3xl font-semibold text-mono">
                                {toPersianDigits(
                                    String(product.rating ?? 0)
                                )}
                            </span>

                            <div className="mt-2">
                                <Rating
                                    rating={Math.round(
                                        product.rating ?? 0
                                    )}
                                />
                            </div>

                            <span className="text-xs text-secondary-foreground mt-2">
                                بر اساس{' '}
                                {toPersianDigits(
                                    String(product.reviewCount ?? 0)
                                )}{' '}
                                نظر
                            </span>
                        </CardContent>
                    </Card>

                    {/* Reviews */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {reviews.map((review) => (
                            <Card key={review.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-mono">
                                                {review.name}
                                            </span>

                                            <span className="text-xs text-secondary-foreground">
                                                {review.date}
                                            </span>
                                        </div>

                                        <Rating
                                            rating={review.rating}
                                        />
                                    </div>

                                    <p className="text-sm text-foreground leading-6 mt-3">
                                        {review.text}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}

                        <Button
                            variant="outline"
                            className="w-full justify-center"
                        >
                            مشاهده همه نظرات
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
{/* FAQ */}
<section className="mt-12">
    <div className="mb-5">
        <h2 className="text-base font-semibold text-mono">
            سؤالات متداول
        </h2>

        <span className="text-xs text-secondary-foreground">
            پاسخ پرسش‌های متداول درباره این محصول
        </span>
    </div>

    <Card>
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

        </CardContent>
    </Card>
</section>

            {/* Related Products */}
            <section className="mt-12 pb-8">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-base font-semibold text-mono">
                            محصولات مشابه
                        </h2>

                        <span className="text-xs text-secondary-foreground">
                            شاید این محصولات هم مورد پسند شما باشند
                        </span>
                    </div>

                    <Link
                        href="/store"
                        className="text-xs text-primary hover:underline"
                    >
                        مشاهده همه
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

function RelatedProductCard({
                                title,
                                logo,
                                price,
                                slug,
                            }) {
    return (
        <Link
            href={`/store/product/${slug}`}
            className="group"
        >
            <Card className="overflow-hidden h-full transition-shadow hover:shadow-sm">
                <div className="flex h-[220px] items-center justify-center bg-accent/30 p-5">
                    <img
                        src={toAbsoluteUrl(
                            `/media/store/client/600x600/${logo}`
                        )}
                        alt={title}
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                    />
                </div>

                <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-mono leading-6 line-clamp-2">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1 mt-3">
                        <span className="text-sm font-semibold text-mono">
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