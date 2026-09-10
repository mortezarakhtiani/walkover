'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {
    Clock3, Tag, ArrowRight, ArrowLeft,
} from 'lucide-react';

import {Button} from '@/store/components/ui/button';
import {Card1} from '@/store/home/special-offers/card1';
import {Card2} from '@/store/home/special-offers/card2';

export function SpecialOffers({
                                  showAddButton = true,
                                  showSeeAll = true,
                                  moreButton = 'نمایش بیشتر',
                                  moreButtonHref = '/store',
                              }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 12, minutes: 45, seconds: 32,
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
                    hours, minutes, seconds,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toPersianDigits = (value) => String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]);

    return (<div
            className="
                relative overflow-hidden rounded-2xl
                p-5
                shadow-sm
            "
        >

            {/* Left Arrow */}
            <button
                type="button"
                className="
                    absolute left-3 top-1/2 z-20
                    flex size-9 -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    bg-background/80
                    text-primary
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    hover:bg-primary
                    hover:text-primary-foreground
                "
                aria-label="قبلی"
            >
                <ArrowLeft className="size-4"/>
            </button>

            {/* Right Arrow */}
            <button
                type="button"
                className="
                    absolute right-3 top-1/2 z-20
                    flex size-9 -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    bg-background/80
                    text-primary
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    hover:bg-primary
                    hover:text-primary-foreground
                "
                aria-label="بعدی"
            >
                <ArrowRight className="size-4"/>
            </button>

            {/* Decorative glow */}
            <div
                className="
                    pointer-events-none absolute
                    -right-16 -top-16 size-40
                    rounded-full
                    bg-primary/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none absolute
                    -left-16 bottom-0 size-32
                    rounded-full
                    bg-primary/5
                    blur-3xl
                "
            />

            {/* Inner Header Box */}
            <div
                className="
                    relative mb-5
                    rounded-xl
                    dark:bg-indigo-600/20
                    p-5
                "
            >

                <div
                    className="
                        flex flex-col gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Title + Discount */}
                    <div className="flex items-center gap-3">

                        {/* Discount Icon */}
                        <div
                            className="
                                flex size-11 shrink-0
                                items-center justify-center
                                rounded-xl
                                text-primary
                            "
                        >
                            <Tag className="size-5"/>
                        </div>

                        <div>

                            <div className="flex items-center gap-2">

                                <h2 className="text-lg font-semibold text-mono">
                                    خوش قیمت‌های امروز
                                </h2>

                                <span
                                    className="
                                        rounded-full
                                        bg-red-500/10
                                        px-2 py-0.5
                                        text-[10px]
                                        font-medium
                                        text-red-600
                                        dark:text-red-400
                                    "
                                >
                                    تخفیف ویژه
                                </span>

                            </div>

                            <p className="mt-1 text-xs text-muted-foreground">
                                فرصت محدود برای خرید با قیمت ویژه
                            </p>

                        </div>

                    </div>

                    {/* Timer + See All */}
                    <div className="flex items-center gap-3">

                        {/* Countdown */}
                        <div
                            className="flex items-center gap-2 rounded-xl bg-indigo-600/10 px-3 py-2 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                            <Clock3 className="size-4"/>

                            <div className="flex items-center gap-1" dir="ltr">
        <span className="min-w-[24px] text-center text-sm font-semibold">
            {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
        </span>

                                <span>:</span>

                                <span className="min-w-[24px] text-center text-sm font-semibold">
            {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
        </span>

                                <span>:</span>

                                <span className="min-w-[24px] text-center text-sm font-semibold">
            {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
        </span>
                            </div>

                            <span className="hidden text-[10px] font-medium sm:inline">
        باقی مانده
    </span>
                        </div>

                        {/* See All */}
                        {showSeeAll && (<Button mode="link" asChild>
                            <Link
                                href={moreButtonHref}
                                className="text-xs"
                            >
                                {moreButton}
                            </Link>
                        </Button>)}

                    </div>

                </div>

            </div>

        {/* Products */}
        <div
            className="
                    relative
                    grid gap-5
                    xl:grid-cols-2
                "
        >

            {/* Main Product */}
            <div>
                <Card1
                    showAddButton={showAddButton}
                />
            </div>

                {/* Small Products */}
                <div>

                    <div
                        className="
                            grid
                            items-stretch
                            gap-5
                            sm:grid-cols-2
                        "
                    >

                        <Card2
                            logo="/images/woman.png"
                            title="کفش ورزشی Nike Dunk Low"
                            total="110.00"
                            // bgColor="bg-black"
                            showAddButton={showAddButton}
                        />

                        <Card2
                            logo="/images/kif.png"
                            title="کفش ورزشی Nike Air Force 1"
                            total="96.99"
                            // bgColor="bg-black"
                            showAddButton={showAddButton}
                        />

                    </div>

                </div>

            </div>

        </div>);
}

