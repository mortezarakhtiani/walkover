'use client';

import Link from 'next/link';
import {ChevronDown} from 'lucide-react';

type BrandCategory = {
    title: string;
    image: string;
    href: string;
};

const categories: BrandCategory[] = [
    {
        title: 'تیشرت',
        image: '/images/show1.webp',
        href: '/store/search-results-grid?category=tshirt',
    },
    {
        title: 'هودی',
        image: '/images/brand/hoodie.webp',
        href: '/store/search-results-grid?category=hoodie',
    },
    {
        title: 'ماگ',
        image: '/images/brand/mug.webp',
        href: '/store/search-results-grid?category=mug',
    },
    {
        title: 'ورزش و سلامت',
        image: '/images/brand/sport.webp',
        href: '/store/search-results-grid?category=sport',
    },
    {
        title: 'اکسسوری',
        image: '/images/brand/accessory.webp',
        href: '/store/search-results-grid?category=accessory',
    },
    {
        title: 'محصولات جدید',
        image: '/images/brand/new.webp',
        href: '/store/search-results-grid?category=new',
    },
];

export default function BrandPromotion() {
    return (
        <section
            className="flex flex-col gap-6 py-6 max-lg:px-6"
            dir="rtl"
        >
            {/* Section Header */}
            <div className="flex items-center justify-between gap-4">
                {/* Title */}
                {/*<Link*/}
                {/*    href="/store/search-results-grid"*/}
                {/*    className="flex items-center gap-2"*/}
                {/*>*/}
                {/*    <img*/}
                {/*        src="/images/brand/logo.webp"*/}
                {/*        alt="منتخب محصولات"*/}
                {/*        className="size-7 object-contain lg:size-9"*/}
                {/*    />*/}

                {/*    <h2 className="text-lg font-bold text-foreground lg:text-xl">*/}
                {/*        منتخب محصولات*/}
                {/*    </h2>*/}
                {/*</Link>*/}

                {/* See All */}
                <Link
                    href="/store/search-results-grid"
                    className="flex h-11 items-center justify-center gap-2 rounded-md border border-indigo-500 px-3 text-sm font-semibold text-indigo-500 transition-colors hover:bg-indigo-500 hover:text-white"
                >
                    <span>مشاهده همه</span>

                    <ChevronDown className="size-5 rotate-90"/>
                </Link>
            </div>

            {/* Main Image + Categories */}
            <div className="flex items-stretch gap-3 lg:gap-6">

                {/* Main Brand Image */}
                <Link
                    href="/store/search-results-grid"
                    className="relative hidden min-h-[360px] flex-1 overflow-hidden rounded-2xl lg:block"
                >
                    <img
                        src="/images/hoodiwomanfront.webp"
                        alt="منتخب محصولات"
                        className="absolute inset-0 size-full object-cover transition-transform "
                    />
                </Link>

                {/* Categories */}
                <div className="grid flex-[1] grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-5">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group flex flex-col gap-2"
                        >
                            {/* Category Image */}
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-accent">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="absolute inset-0 size-full object-cover "
                                />
                            </div>

                            {/* Category Title */}
                            <h3 className="text-center text-sm font-medium text-foreground transition-colors group-hover:text-indigo-500 lg:text-base">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

