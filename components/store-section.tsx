
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StoreSectionProps {
    image: string;
    imageAlt?: string;
    title: string;
    description: string;
    reverse?: boolean;
    className?: string;
}

export default function StoreSection({
    image,
    imageAlt = '',
    title,
    description,
    reverse = false,
    className = '',
}: StoreSectionProps) {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)');

        const update = () => setIsDesktop(media.matches);

        update();
        media.addEventListener('change', update);

        return () => media.removeEventListener('change', update);
    }, []);

    return (
        <section
            className={`w-full px-5 py-16 sm:px-8 lg:px-12 bg-black ${className}`}
            dir="ltr"
        >
            <div
                className={`
                    mx-auto grid max-w-7xl items-center gap-10
                    lg:grid-cols-2 lg:gap-16
                    ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}
                `}
            >
                {/* Image - Left */}
                <div className="relative overflow-hidden rounded-xl">
                    <div className="relative aspect-[4/3] w-full">
                        <Image
                            src={image}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain"
                            style={{
                                transform: 'scale(1.4)',
                            }}
                        />
                    </div>
                </div>

                {/* Text - Right */}
                <div className="flex flex-col justify-center text-right" dir="rtl">
                    <div className="mr-auto w-full max-w-xl">

                        {/* Ghost Title */}
                        <motion.h2
                            initial={{ opacity: 0, x: 35, filter: 'blur(12px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{
                                duration: 1.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-6xl"
                        >
                            {title}
                        </motion.h2>

                        {/* Haunted Ghost Description */}
                        <motion.div
                            className="relative mt-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 2 }}
                        >

                            {/* Red Ghost Trail - Desktop Only */}
                            {isDesktop && (
                                <motion.p
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 text-red-500/40 blur-[2px]"
                                    animate={{
                                        x: [0, -5, -12, -20, -12, -5, 0],
                                        opacity: [0.12, 0.3, 0.12, 0.25, 0.08, 0.2, 0.12],
                                        filter: [
                                            'blur(2px)',
                                            'blur(4px)',
                                            'blur(7px)',
                                            'blur(3px)',
                                            'blur(6px)',
                                            'blur(2px)',
                                            'blur(2px)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    {description}
                                </motion.p>
                            )}

                            {/* Cyan Ghost Trail - Desktop Only */}
                            {isDesktop && (
                                <motion.p
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 text-cyan-300/30 blur-[3px]"
                                    animate={{
                                        x: [0, -9, -17, -25, -15, -7, 0],
                                        opacity: [0.08, 0.2, 0.08, 0.22, 0.05, 0.15, 0.08],
                                        filter: [
                                            'blur(3px)',
                                            'blur(6px)',
                                            'blur(9px)',
                                            'blur(4px)',
                                            'blur(8px)',
                                            'blur(3px)',
                                            'blur(3px)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 0.8,
                                    }}
                                >
                                    {description}
                                </motion.p>
                            )}

                            {/* Main Ghost Text */}
                            <motion.p
                                className="relative z-10 font-iransans text-sm leading-9 text-white/65 sm:text-base"
                                animate={
                                    isDesktop
                                        ? {
                                            x: [0, -3, -8, -5, -11, -4, 0],
                                            opacity: [0.65, 0.55, 0.7, 0.48, 0.62, 0.5, 0.65],
                                            filter: [
                                                'blur(0px)',
                                                'blur(0.3px)',
                                                'blur(1.2px)',
                                                'blur(0.2px)',
                                                'blur(0.8px)',
                                                'blur(0px)',
                                                'blur(0px)',
                                            ],
                                        }
                                        : {
                                            x: 0,
                                            opacity: 0.65,
                                            filter: 'blur(0px)',
                                        }
                                }
                                transition={
                                    isDesktop
                                        ? {
                                            duration: 9,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }
                                        : { duration: 0 }
                                }
                            >
                                {description}
                            </motion.p>
                        </motion.div>

                        {/* Enter Button */}
                        <Link
                            href="/landing-v2"
                            className="
                                group mt-8 inline-flex w-fit items-center gap-3
                                rounded-md bg-blue-600 px-7 py-3.5
                                text-sm font-semibold text-white
                                transition-all duration-300
                                hover:bg-blue-700 active:scale-95
                            "
                        >
                            <span>ورود</span>

                            <ArrowLeft
                                size={18}
                                className="transition-transform duration-300 group-hover:-translate-x-1"
                            />
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
}
