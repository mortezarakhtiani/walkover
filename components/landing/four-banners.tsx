'use client';

import {motion, AnimatePresence} from 'framer-motion';
import {useEffect, useState} from 'react';
import {
    Cable,
    ChartNoAxesCombined,
    Cog,
} from 'lucide-react';
import {cn} from '@/lib/utils';

const FourBanners = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [activeImageSet, setActiveImageSet] = useState(0);

    // مجموعه‌های تصاویر
    const imageSets = [
        [
            '/images/mainblackhoodi.webp',
            '/images/blackhoodi2.webp',
            '/images/blackhoodi.webp',
        ],
        [
            '/images/blackhoodilangar.webp',
            '/images/blackhoodilangar2.webp',
            '/images/mainblackhoodi.webp',
        ],
    ];

    const banners = [
        {
            alt: 'هودی مشکی',
            title: 'هودی مشکی',
            descriptions: [
                'ساده، شیک و همیشه جذاب.',
                'طراحی راحت با استایل مینیمال.',
                'انتخابی مناسب برای استایل روزمره.',
            ],
            icon: Cable,
        },
        {
            alt: 'هودی مشکی',
            title: 'هودی مشکی',
            descriptions: [
                'فرم آزاد و مناسب استفاده روزمره.',
                'طراحی لانگ با ظاهر متفاوت.',
                'راحت، خاص و مناسب استایل خیابانی.',
            ],
            icon: ChartNoAxesCombined,
        },
        {
            alt: 'هودی مشکی',
            title: 'هودی مشکی',
            descriptions: [
                'پارچه نرم با طراحی ساده.',
                'گرم و راحت برای استفاده روزانه.',
                'استایلی کلاسیک و همیشه کاربردی.',
            ],
            icon: Cog,
        },
    ];

    const stepDuration = 5000;

    useEffect(() => {
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 100;
                }

                return prev + 100 / (stepDuration / 50);
            });
        }, 50);

        const stepTimeout = setTimeout(() => {
            // وقتی Progress کامل شد:
            // کل مجموعه تصاویر عوض می‌شود
            setActiveImageSet(
                (prevSet) => (prevSet + 1) % imageSets.length
            );

            // از تصویر اول مجموعه جدید شروع شود
            setActiveStep(0);

            // Progress دوباره از صفر
            setProgress(0);
        }, stepDuration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(stepTimeout);
        };
    }, [activeImageSet]);

    const activeBanner = banners[activeStep];
const activeDescription =
    activeBanner.descriptions[activeImageSet];
    const currentImages = imageSets[activeImageSet];

    return (
        <section className="w-full">
            <div
                dir="ltr"
                className="
                    grid
                    w-full
                    grid-cols-1
                    gap-6
                    lg:grid-cols-[1fr_320px]
                "
            >
                {/* =========================
                    تصاویر - سمت چپ
                ========================== */}
                <div
                    className="
                        order-1
                        grid
                        grid-cols-2
                        gap-2
                        lg:grid-cols-3
                    "
                >
                    {currentImages.map((image, index) => (
                        <motion.div
                            key={`${activeImageSet}-${index}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            onClick={() => {
                                setActiveStep(index);
                                setProgress(0);
                            }}
                            className={cn(
                                `
                                relative
                                aspect-[5/9]
                                cursor-pointer
                                overflow-hidden
                                rounded-2xl
                                border
                                bg-muted
                                transition-all
                                duration-300
                                `,
                                index === activeStep
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-border opacity-70 hover:opacity-100'
                            )}
                        >
                            <img
                                src={image}
                                alt={banners[index].alt}
                                className="
                                    block
                                    h-full
                                    w-full
                                    object-cover
                                    object-top
                                "
                            />
                        </motion.div>
                    ))}
                </div>

                {/* =========================
                    پنل اطلاعات - سمت راست
                ========================== */}
                <div
                    dir="rtl"
                    className="
                        order-2
                        flex
                        min-h-[300px]
                        flex-col
                        justify-center
                        bg-transparent
                        p-6
                    "
                >
                    {/* متن متغیر */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{
                                opacity: 0,
                                x: 20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: -20,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        >

                            {/* عنوان */}
                            <h3
                                className="
                                    mb-3
                                    text-2xl
                                    font-semibold
                                    text-foreground
                                "
                            >
                                {activeBanner.title}
                            </h3>

                            {/* توضیحات */}
                            <p
                                className="
                                    leading-7
                                    text-muted-foreground
                                "
                            >
                                {activeDescription}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* =========================
                        Progress Bar
                    ========================== */}
                    <div className="mt-8">
                        <div
                            className="
                                h-1.5
                                w-full
                                overflow-hidden
                                rounded-full
                                bg-border
                            "
                        >
                            <motion.div
                                className="
                                    h-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-indigo-500
                                    to-purple-400
                                "
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FourBanners;

