'use client';

import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ShoppingBag,
    Sparkles,
    Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-background pt-28 lg:pt-32"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-10%] top-[5%] size-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-[-15%] left-[-10%] size-[500px] rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6">
                <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="order-2 text-center lg:order-1 lg:text-right"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="mb-6 flex justify-center lg:justify-start"
                        >
                            <Badge
                                variant="outline"
                                className="gap-2 rounded-full border-indigo-200 bg-indigo-50 px-4 py-2 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300"
                            >
                                <Sparkles className="size-3.5" />
                                کالکشن جدید منتشر شد
                            </Badge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl"
                        >
                            چیزی که دوستش داری،
                            <br />
                            <span className="bg-gradient-to-l from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                بپوشش.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0"
                        >
                            محصولات اختصاصی Merch با طراحی خاص،
                            کیفیت بالا و مناسب برای کسایی که می‌خوان
                            چیزی بیشتر از یک لباس معمولی داشته باشن.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
                        >
                            <Button
                                size="lg"
                                asChild
                                className="h-12 cursor-pointer gap-2 px-7"
                            >
                                <Link href="#products">
                                    مشاهده محصولات
                                    <ArrowLeft className="size-4" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="h-12 cursor-pointer gap-2 px-7"
                            >
                                <Link href="#latest">
                                    <ShoppingBag className="size-4" />
                                    جدیدترین‌ها
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Trust */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
                        >
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className="size-4 fill-current text-yellow-500"
                                    />
                                ))}
                            </div>

                            <span className="text-sm text-muted-foreground">
                                کیفیتی که مشتری‌ها دوستش دارن
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Product visual */}
                    {/* Product visual */}
<motion.div
    initial={{ opacity: 0, scale: 0.9, x: -30 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.15 }}
    className="order-1 lg:order-2"
>
    <div className="relative mx-auto max-w-[580px]">

        {/* Main image */}
        <div
            className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-accent/30 shadow-2xl"
        >
            <Image
                src="/products/1.png"
                alt="محصول Merch"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 580px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-black/50 px-4 py-3 text-white backdrop-blur-md">
                <p className="text-xs text-white/70">
                    Merch Collection
                </p>

                <p className="mt-1 font-semibold">
                    New Drop
                </p>
            </div>
        </div>

        {/* Floating card */}
        <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-background p-4 shadow-xl sm:block">
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950">
                    <ShoppingBag className="size-5" />
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        ارسال سریع
                    </p>

                    <p className="text-sm font-semibold">
                        آماده ارسال
                    </p>
                </div>
            </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-5 -top-5 -z-10 size-24 rounded-full border border-indigo-500/20 bg-indigo-500/10 blur-sm" />

    </div>
</motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;