'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    SlidersHorizontal,
    CreditCard,
    Truck,
} from 'lucide-react';

import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);

const steps = [
    {
        id: 1,
        title: 'محصولت رو انتخاب کن',
        description:
            'بین محصولات مختلف Merch بگرد و چیزی که بیشتر از همه دوستش داری رو پیدا کن.',
        image: '/images/image1.jpg',
        icon: ShoppingBag,
    },
    {
        id: 2,
        title: 'مدل و سایز رو انتخاب کن',
        description:
            'رنگ، سایز و مدل مناسب خودت رو انتخاب کن و جزئیات محصول رو بررسی کن.',
        image: '/images/image2.webp',
        icon: SlidersHorizontal,
    },
    {
        id: 3,
        title: 'سفارشت رو ثبت کن',
        description:
            'محصول رو به سبد خرید اضافه کن و در چند مرحله ساده سفارشت رو نهایی کن.',
        image: '/images/image1.jpg',
        icon: CreditCard,
    },
    {
        id: 4,
        title: 'سفارشت رو تحویل بگیر',
        description:
            'سفارش آماده میشه و در سریع‌ترین زمان ممکن به دستت می‌رسه.',
        image: '/images/image2.webp',
        icon: Truck,
    },
];

    const stepDuration = 5000;

    useEffect(() => {
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;

                return prev + 100 / (stepDuration / 50);
            });
        }, 50);

        const stepTimeout = setTimeout(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, stepDuration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(stepTimeout);
        };
    }, [activeStep, steps.length]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };

    return (
        <section
            id="how-it-works"
            className="border-b border-border/50 pt-15 pb-6"
        >
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col items-center gap-5 text-center"
                >
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mx-auto flex max-w-6xl flex-col gap-12"
                >

                    {/* Steps */}
                    {/*<div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">*/}
                    {/*    {steps.map((step, index) => {*/}
                    {/*        const Icon = step.icon;*/}
                    {/*        const isActive = index === activeStep;*/}

                    {/*        return (*/}
                    {/*            <button*/}
                    {/*                key={step.id}*/}
                    {/*                type="button"*/}
                    {/*                onClick={() => handleStepClick(index)}*/}
                    {/*                className={cn(*/}
                    {/*                    'group flex w-full cursor-pointer flex-col items-center overflow-hidden text-center md:w-auto md:flex-1'*/}
                    {/*                )}*/}
                    {/*            >*/}
                    {/*                /!* Icon *!/*/}
                    {/*                <div*/}
                    {/*                    className={cn(*/}
                    {/*                        'flex size-12 items-center justify-center rounded-full transition-all duration-200',*/}
                    {/*                        isActive*/}
                    {/*                            ? 'bg-indigo-100 text-indigo-600 shadow-sm dark:bg-indigo-950/70 dark:text-indigo-400'*/}
                    {/*                            : 'bg-accent text-muted-foreground group-hover:bg-indigo-100/60 group-hover:text-indigo-500 dark:group-hover:bg-indigo-950/40'*/}
                    {/*                    )}*/}
                    {/*                >*/}
                    {/*                    <Icon className="size-5" />*/}
                    {/*                </div>*/}

                    {/*                /!* Title *!/*/}
                    {/*                <h3*/}
                    {/*                    className={cn(*/}
                    {/*                        'px-3 pb-3 pt-4 text-sm font-semibold transition-colors duration-200 sm:text-base',*/}
                    {/*                        isActive*/}
                    {/*                            ? 'text-foreground'*/}
                    {/*                            : 'text-muted-foreground'*/}
                    {/*                    )}*/}
                    {/*                >*/}
                    {/*                    {step.title}*/}
                    {/*                </h3>*/}

                    {/*                /!* Progress *!/*/}
                    {/*                <div className="h-0.5 w-full overflow-hidden bg-border/60">*/}
                    {/*                    {isActive && (*/}
                    {/*                        <motion.div*/}
                    {/*                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-400"*/}
                    {/*                            style={{*/}
                    {/*                                width: `${progress}%`,*/}
                    {/*                            }}*/}
                    {/*                        />*/}
                    {/*                    )}*/}
                    {/*                </div>*/}
                    {/*            </button>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</div>*/}

                    {/* Image + Description */}
                    {/* Main Image */}
{/* Main Image */}
                    <div className="overflow-hidden">
                        <div className="relative aspect-[16/6] overflow-hidden rounded-xl bg-accent/30">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeStep}
                                    src={steps[activeStep].image}
                                    alt={steps[activeStep].title}
                                    className="h-full w-full object-cover"
                                    initial={{
                                        opacity: 0,
                                        scale: 1.03,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.98,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: 'easeOut',
                                    }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Image Indicators */}
                        <div className="mt-5 flex items-center justify-center gap-2">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep;

                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => setActiveStep(index)}
                                        aria-label={`نمایش تصویر ${index + 1}`}
                                        className="relative flex h-3 w-3 cursor-pointer items-center justify-center text-indigo-500"
                                    >
                                        <motion.span
                                            className="block rounded-full bg-current"
                                            animate={{
                                                width: isActive ? 10 : 6,
                                                height: isActive ? 10 : 6,
                                                opacity: isActive ? 1 : 0.35,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;