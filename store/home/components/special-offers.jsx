'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight,

} from 'lucide-react';

import {Button} from '@/store/components/ui/button';
import FlipClock  from '@/components/ui/flip-clock'
import {Card1} from '@/store/home/special-offers/card1';
import {Card2} from '@/store/home/special-offers/card2';
import {ProductRevealCard} from '@/store/home/special-offers/product-card-special';
import {products} from '@/store/product/data/products';

const Digit = ({ value }) => {
    return (
        <div className="relative w-10 h-14 overflow-hidden rounded-md bg-zinc-900 text-white font-mono text-3xl font-bold flex items-center justify-center">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export function SpecialOffers({
                                  showAddButton = true,
                                  showSeeAll = true,
                                  moreButton = 'نمایش بیشتر',
                                  moreButtonHref = '/store/search-results-grid',
                              }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 12,
        minutes: 45,
        seconds: 32,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let {hours, minutes, seconds} = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }

                return {
                    hours,
                    minutes,
                    seconds,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toPersianDigits = (value) =>
        String(value).replace(
            /\d/g,
            (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]
        );

    const product103 = products.find((product) => product.id === 103);
    const product104 = products.find((product) => product.id === 104);

    return (
        <div
            className="
            mt-16
                relative
                overflow-hidden
                rounded-2xl
                px-5
                shadow-sm
            "
        >

            {/* Decorative glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    size-40
                    rounded-full
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-16
                    bottom-0
                    size-32
                    rounded-full
                    blur-3xl
                "
            />

            {/* Header */}
            <div
                className="
        relative
        mb-3
        rounded-xl
        p-3
        md:p-5
    "
            >
                <div
                    className="
            flex
            items-center
            justify-between
            gap-2
        "
                >
                    {/* Title */}
                    <Link
                        href={moreButtonHref}
                        className="
                flex
                min-w-0
                items-center
                gap-1.5
                md:pointer-events-none
                md:cursor-default
                md:gap-3
            "
                    >
                        {/* Icon */}
                        <div
                            className="
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    md:size-11
                "
                        >
                            <img
                                src="/icons/discount.png"
                                alt=""
                                className="
                        size-6
                        object-contain
                        md:size-8
                    "
                            />
                        </div>

                        {/* Title */}
                        <div className="min-w-0">
                            <div className="flex items-center">
                                <h2
                                    className="
                            truncate
                            text-sm
                            font-semibold
                            text-mono
                            md:text-lg
                        "
                                >
                                    خوش قیمت‌های امروز
                                </h2>

                                {/* فقط دسکتاپ */}
                                <span
                                    className="
                            mr-2
                            hidden
                            rounded-full
                            bg-red-500/10
                            px-2
                            py-0.5
                            text-[10px]
                            font-medium
                            text-red-600
                            md:inline-block
                            dark:text-red-400
                        "
                                >
                        تخفیف ویژه
                    </span>
                            </div>

                            <p
                                className="
                        mt-0.5
                        text-[9px]
                        text-muted-foreground
                        md:mt-1
                        md:text-xs
                    "
                            >
                                فرصت محدود برای خرید با قیمت ویژه
                            </p>
                        </div>
                    </Link>

                    {/* Timer + See All */}
                    <div
                        className="
                flex
                shrink-0
                items-center
                gap-2
                md:gap-3
            "
                    >

                        {/* Timer */}
                        <div
                            dir="ltr"
                            className="
        flex shrink-0 items-center gap-1 rounded-xl px-1 py-1
        text-primary-600 dark:bg-primary-400/10 dark:text-primary-400
        md:gap-2 md:px-3 md:py-2
    "
                        >
                            <FlipClock timeLeft={timeLeft} />


                            <span className="hidden text-[15px] font-small sm:inline">
        زمان باقی مانده
    </span>
                        </div>

                        {/* نمایش بیشتر - دسکتاپ */}
                        {showSeeAll && (
                            <Button
                                mode="link"
                                asChild
                                className="
                        hidden
                        shrink-0
                        rounded-xl
                        px-4
                        py-2
                        text-xs
                        text-indigo-500

                        md:flex
                    "
                            >
                                <Link
                                    href={moreButtonHref}
                                    className="flex items-center gap-1 text-xs"
                                >
                                    <ChevronRight className="size-4"/>
                                    <span>{moreButton}</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Products */}
            <div
                className="
                    relative
                    grid
                    gap-5
                    xl:grid-cols-2
                "
            >
                {/* Main Product */}
                <div>
                    <Card1
                        id={101}
                        showAddButton={showAddButton}
                    />
                </div>

                {/* Small Products */}
                <div>
                    <div
                        className="
            grid
            grid-cols-2
            items-stretch
            gap-3
            sm:gap-5
        "
                    >
                        {/*<Card2*/}
                        {/*    productId={product103.id}*/}
                        {/*    star={product103.rating}*/}
                        {/*    logo={product103.logo}*/}
                        {/*    title={product103.title}*/}
                        {/*    total={product103.price}*/}
                        {/*    originalPrice={product103.originalPrice}*/}
                        {/*    discount={product103.discount}*/}
                        {/*    showAddButton={showAddButton}*/}
                        {/*/>*/}

                        {/*<Card2*/}
                        {/*    productId={product104.id}*/}
                        {/*    star={product104.rating}*/}
                        {/*    logo={product104.logo}*/}
                        {/*    title={product104.title}*/}
                        {/*    total={product104.price}*/}
                        {/*    originalPrice={product104.originalPrice}*/}
                        {/*    discount={product104.discount}*/}
                        {/*    showAddButton={showAddButton}*/}
                        {/*/>*/}

                        <ProductRevealCard
                            productId={product104.id}
                            star={product104.rating}
                            logo={product104.logo}
                            title={product104.title}
                            total={product104.price}
                            originalPrice={product104.originalPrice}
                            discount={product104.discount}
                            showAddButton={showAddButton}
                        />

                        <ProductRevealCard
                            productId={product103.id}
                            star={product103.rating}
                            logo={product103.logo}
                            title={product103.title}
                            total={product103.price}
                            originalPrice={product103.originalPrice}
                            discount={product103.discount}
                            showAddButton={showAddButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}