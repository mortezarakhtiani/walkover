'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';

const categories = [
    {
        name: 'تیشرت',
        image: '/images/man.png',
        href: '/store?category=تیشرت',
    },
    {
        name: 'زنانه',
        image: '/images/woman.png',
        href: '/store?category=هودی',
    },
    {
        name: 'کفش',
        image: '/images/shoose.png',
        href: '/store?category=کلاه',
    },
    {
        name: 'ساعت',
        image: '/images/watch.png',
        href: '/store?category=ماگ',
    },
    {
        name: 'کیف',
        image: '/images/kif.png',
        href: '/store?category=اکسسوری',
    },
    {
        name: 'لوازم آرایشی',
        image: '/images/rozh.png',
        href: '/store?category=کیف',
    },
];

const PopularCategories = () => {
    return (
        <section
            id="categories"
            className="border-b border-border/50 bg-background py-0"
        >
            <div className="container mx-auto px-6 py-0">

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category, index) => {
                        return (
                            <motion.a
                                key={category.name}
                                href={category.href}
                                initial={{
                                    opacity: 0,
                                    y: 20,
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
                                viewport={{once: true}}
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
                                className="group flex cursor-pointer flex-col items-center justify-center bg-transparent p-6"
                            >
                                <div className="relative mb-4 size-32 overflow-hidden rounded-xl bg-accent">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="256px"
                                    />
                                </div>

                                <span className="text-sm font-medium">
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