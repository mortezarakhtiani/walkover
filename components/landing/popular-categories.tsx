'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';

const categories = [
    {
        name: 'لباس',
        image: '/images/clothe.png',
        href: '/store/search-results-grid',
    },
    {
        name: 'کلاه',
        image: '/images/hat (1).png',
        href: '/store/search-results-grid',
    },
    {
        name: 'ماگ',
        image: '/images/mug (8).png',
        href: '/store/search-results-grid',
    },
    {
        name: 'ساعت',
        image: '/images/watch (1).png',
        href: '/store/search-results-grid',
    },
    {
        name: 'کیف',
        image: '/images/bag (3).png',
        href: '/store/search-results-grid',
    },
    {
        name: 'شلوار',
        image: '/images/pans (1).png',
        href: '/store/search-results-grid',
    },
];

const PopularCategories = () => {
    return (
        <section
            id="categories"
        >
            <div className="container mx-auto px-3 md:px-6 py-0">

                <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
                    {categories.map((category, index) => {
                        return (
                            <motion.a
                                key={category.name}
                                href={category.href}
                                initial={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    opacity: {
                                        duration: 0.4,
                                        delay: index * 0.08,
                                    },
                                    y: {
                                        duration: 0.4,
                                        delay: index * 0.08,
                                    },
                                }}
                                whileHover={{
                                    y: -4,
                                    transition: {
                                        duration: 0.15,
                                        ease: 'easeOut',
                                    },
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                className="
                                border
                                border-border
    group
    flex
    cursor-pointer
    flex-col
    items-center
    justify-center
    rounded-md
    bg-transparent
    p-2
    transition-colors
    duration-200
    md:rounded-md

">
                                <div
                                    className="relative mb-2 size-20 overflow-hidden rounded-md md:mb-4 md:size-32 md:rounded-md">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="128px"
                                    />
                                </div>

                                <span className="text-xs font-medium md:text-sm">
                                    {category.name}
                                </span>
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default PopularCategories;
