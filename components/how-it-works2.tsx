
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const steps = [
        {
            id: 1,
            number: '01',
            title: 'ساعتو آوردم خونه',
            description: 'همه‌چیز از یک اتفاق ساده شروع شد...',
            image: '/screens/video1.jpg',
        },
        {
            id: 2,
            number: '02',
            title: 'این موجود عجیب چیه؟!',
            description: 'اما چیزی که دیدم اصلاً عادی نبود.',
            image: '/screens/video2.jpg',
        },
        {
            id: 3,
            number: '03',
            title: 'خیلی مراقب باشید!',
            description: 'اینجا بود که فهمیدم قضیه جدی‌تر از این حرف‌هاست.',
            image: '/screens/video3.jpg',
        },
        {
            id: 4,
            number: '04',
            title: 'سحرتبر کجاست؟',
            description: 'و حالا باید دنبال جواب این سؤال می‌گشتیم...',
            image: '/screens/video4.jpg',
        },
    ];

    const stepDuration = 5000;

    useEffect(() => {
        setProgress(0);

        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const value = Math.min(
                (elapsed / stepDuration) * 100,
                100
            );

            setProgress(value);
        }, 50);

        const timeout = setTimeout(() => {
            setActiveStep((current) => (current + 1) % steps.length);
        }, stepDuration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [activeStep, steps.length]);

    const activeItem = steps[activeStep];

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-black
                py-24
                sm:py-28
                lg:py-32
            "
        >
            {/* Background Atmosphere */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_35%,rgba(79,70,229,0.08),transparent_38%)]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-64
                    bg-gradient-to-t
                    from-black
                    to-transparent
                "
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: 'easeOut',
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    className="mx-auto mb-12 max-w-3xl text-center sm:mb-8"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="
                            relative
                            font-iransans
                            text-2xl
                            font-black
                            text-white
                            sm:text-3xl
                            md:text-4xl
                        "
                    >
                        <motion.span
                            className="relative inline-block"
                            animate={{
                                x: [0, 0, -4, 8, -1, 0, 0],
                                skewX: [0, 2, -7, 2, -3, 0, 0],
                            }}
                            transition={{
                                duration: 0.35,
                                repeat: Infinity,
                                repeatDelay: 4.5,
                                times: [0, 0.25, 0.32, 0.38, 0.44, 0.5, 1],
                                ease: 'linear',
                            }}
                        >
                            {/* Red Glitch Layer */}

                            <motion.span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 text-red-500"
                                animate={{
                                    x: [0, 0, -5, 4, -2, 0, 0],
                                    opacity: [0, 0, 0.85, 0.7, 0.4, 0, 0],
                                    clipPath: [
                                        'inset(0 0 100% 0)',
                                        'inset(0 0 100% 0)',
                                        'inset(15% 0 65% 0)',
                                        'inset(55% 0 25% 0)',
                                        'inset(30% 0 50% 0)',
                                        'inset(0 0 100% 0)',
                                        'inset(0 0 100% 0)',
                                    ],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatDelay: 4.5,
                                    ease: 'linear',
                                }}
                            >
                                جدیدترین ویدیوهای ما در یوتیوب
                            </motion.span>

                            {/* Cyan Glitch Layer */}

                            <motion.span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 text-cyan-400"
                                animate={{
                                    x: [0, 0, 5, -3, 2, 0, 0],
                                    opacity: [0, 0, 0.75, 0.5, 0.3, 0, 0],
                                    clipPath: [
                                        'inset(100% 0 0 0)',
                                        'inset(100% 0 0 0)',
                                        'inset(65% 0 15% 0)',
                                        'inset(25% 0 55% 0)',
                                        'inset(50% 0 30% 0)',
                                        'inset(100% 0 0 0)',
                                        'inset(100% 0 0 0)',
                                    ],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatDelay: 4.5,
                                    ease: 'linear',
                                }}
                            >
                                جدیدترین ویدیوهای ما در یوتیوب
                            </motion.span>

                            {/* Main Text */}

                            <span className="relative z-10">
                                جدیدترین ویدیوهای ما در یوتیوب
                            </span>
                        </motion.span>
                    </motion.h2>
                </motion.div>

                {/* Step Navigation */}

                <div
                    className="
                        mb-8
                        grid
                        grid-cols-2
                        gap-3
                        sm:mb-10
                        sm:grid-cols-4
                        sm:gap-4
                    "
                >
                    {steps.map((step, index) => {
                        const isActive = index === activeStep;

                        return (
                            <button
                                key={step.id}
                                type="button"
                                onClick={() => {
                                    setActiveStep(index);
                                    setProgress(0);
                                }}
                                aria-pressed={isActive}
                                className={`
                                    group
                                    flex
                                    min-h-[48px]
                                    min-w-0
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    px-2
                                    py-2
                                    text-center
                                    outline-none
                                    transition-all
                                    duration-300
                                    sm:min-h-[52px]
                                    sm:px-3
                                    sm:py-2

                                    ${
                                        isActive
                                            ? `
                                                border-white/20
                                                bg-white/10
                                                shadow-[0_0_20px_rgba(255,255,255,0.04)]
                                            `
                                            : `
                                                border-white/[0.06]
                                                bg-white/[0.03]
                                                hover:border-white/20
                                                hover:bg-white/[0.07]
                                            `
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        block
                                        w-full
                                        whitespace-normal
                                        break-words
                                        font-iransans
                                        text-[11px]
                                        font-semibold
                                        leading-5
                                        transition-colors
                                        duration-300
                                        sm:text-sm
                                        md:text-base
                                        ${
                                            isActive
                                                ? 'text-white'
                                                : 'text-gray-500 group-hover:text-white/70'
                                        }
                                    `}
                                >
                                    {step.title}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Visual */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-white/10
                        bg-white/[0.02]
                        shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                        sm:rounded-[32px]
                    "
                >
                    <div
                        className="
                            relative
                            h-[300px]
                            w-full
                            overflow-hidden
                            sm:h-[420px]
                            md:h-[520px]
                            lg:h-[580px]
                        "
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                transition={{
                                    duration: 0.65,
                                    ease: 'easeOut',
                                }}
                                className="absolute inset-0"
                            >
                                {/* Main Image */}

                                <motion.img
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    draggable={false}
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 5,
                                        ease: 'linear',
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        h-full
                                        w-full
                                        object-cover
                                        object-center
                                    "
                                />

                                {/* Dark Overlay */}

                                <div className="absolute inset-0 bg-black/25" />

                                {/* Cinematic Gradient */}

                                <div className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black
                                    via-black/25
                                    to-transparent
                                " />

                                {/* Vignette */}

                                <div className="
                                    absolute
                                    inset-0
                                    bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]
                                " />

                                {/* Cinematic Glitch */}

                                <motion.div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        z-20
                                        overflow-hidden
                                    "
                                    animate={{
                                        opacity: [0, 1, 0, 0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 0.65,
                                        repeat: Infinity,
                                        repeatDelay: 4,
                                        times: [0, 0.08, 0.2, 0.65, 0.75, 1],
                                        ease: 'linear',
                                    }}
                                >
                                    {/* White Signal Distortion */}

                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{
                                            clipPath: [
                                                'inset(45% 100% 45% 0)',
                                                'inset(45% 0 45% 0)',
                                                'inset(45% 0 45% 100%)',
                                            ],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 0.22,
                                            repeat: Infinity,
                                            repeatDelay: 4.43,
                                            ease: 'linear',
                                        }}
                                        style={{
                                            background: 'rgba(255,255,255,0.8)',
                                            mixBlendMode: 'screen',
                                        }}
                                    />

                                    {/* Digital Interference Blocks */}

                                    <motion.div
                                        className="
                                            absolute
                                            left-0
                                            top-[38%]
                                            h-8
                                            w-[38%]
                                            bg-white/70
                                        "
                                        animate={{
                                            x: ['-100%', '0%', '18%', '100%'],
                                            opacity: [0, 0.8, 0.6, 0],
                                            scaleY: [0.4, 1, 0.7, 0.2],
                                        }}
                                        transition={{
                                            duration: 0.28,
                                            repeat: Infinity,
                                            repeatDelay: 4.37,
                                            ease: 'linear',
                                        }}
                                    />

                                    <motion.div
                                        className="
                                            absolute
                                            right-0
                                            top-[57%]
                                            h-5
                                            w-[25%]
                                            bg-white/60
                                        "
                                        animate={{
                                            x: ['100%', '0%', '-25%', '-100%'],
                                            opacity: [0, 0.9, 0.5, 0],
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            delay: 0.08,
                                            repeat: Infinity,
                                            repeatDelay: 4.45,
                                            ease: 'linear',
                                        }}
                                    />

                                    {/* Signal Flash */}

                                    <motion.div
                                        className="absolute inset-0 bg-white"
                                        animate={{
                                            opacity: [0, 0.13, 0, 0.08, 0],
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            repeat: Infinity,
                                            repeatDelay: 4.45,
                                            ease: 'linear',
                                        }}
                                    />

                                    {/* Dark Signal Interruption */}

                                    <motion.div
                                        className="absolute inset-0 bg-black"
                                        animate={{
                                            opacity: [0, 0, 0.7, 0, 0],
                                        }}
                                        transition={{
                                            duration: 0.25,
                                            repeat: Infinity,
                                            repeatDelay: 4.4,
                                            ease: 'linear',
                                        }}
                                        style={{
                                            clipPath: 'inset(48% 0 40% 0)',
                                        }}
                                    />
                                </motion.div>

                                {/* Shadow Sweep */}

                                <motion.div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-x-0
                                        top-0
                                        z-30
                                        h-24
                                    "
                                    animate={{
                                        y: ['-100%', '650%'],
                                        opacity: [0, 0.55, 0.55, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatDelay: 2.5,
                                        ease: 'linear',
                                    }}
                                    style={{
                                        background:
                                            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.075), transparent)',
                                    }}
                                />

                                {/* Scan Lines */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        opacity-[0.13]
                                    "
                                    style={{
                                        backgroundImage:
                                            'repeating-linear-gradient(0deg,rgba(255,255,255,0.12) 0px,transparent 1px,transparent 4px)',
                                    }}
                                />

                                {/* Moving Light Sweep */}

                                <motion.div
                                    initial={{ y: '-120%' }}
                                    animate={{ y: '550%' }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-x-0
                                        top-0
                                        h-28
                                        bg-gradient-to-b
                                        from-transparent
                                        via-white/[0.07]
                                        to-transparent
                                    "
                                />

                                {/* Red Ambient Glow */}

                                <div className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-[radial-gradient(ellipse_at_50%_85%,rgba(220,38,38,0.12),transparent_55%)]
                                " />

                                {/* Simple Play Icon */}

                                <div className="
                                    absolute
                                    inset-0
                                    z-10
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.65,
                                            filter: 'blur(8px)',
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            filter: 'blur(0px)',
                                        }}
                                        transition={{
                                            duration: 0.55,
                                            delay: 0.2,
                                        }}
                                        className="
                                            relative
                                            flex
                                            size-16
                                            items-center
                                            justify-center
                                            sm:size-20
                                            md:size-24
                                        "
                                    >
                                        {/* Subtle Red Glow */}

                                        <motion.div
                                            animate={{
                                                scale: [1, 1.25, 1],
                                                opacity: [0.2, 0.45, 0.2],
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                            className="
                                                absolute
                                                inset-0
                                                rounded-full
                                                bg-red-600/30
                                                blur-2xl
                                            "
                                        />

                                        {/* Play */}

                                        {/* Simple Static Play Icon */}

<div className="absolute inset-0 z-10 flex items-center justify-center">
    <div
        className="
            flex
            size-16
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-black/30
            text-white
            shadow-[0_8px_30px_rgba(0,0,0,0.5)]
            backdrop-blur-sm
            sm:size-20
            md:size-24
        "
    >
        <Play
            className="
                ml-1
                size-7
                fill-white
                stroke-white
                sm:size-9
                md:size-11
            "
        />
    </div>
</div>
                                    </motion.div>
                                </div>

                                {/* Bottom Text */}

                                <div className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    p-5
                                    sm:p-8
                                    md:p-10
                                ">
                                    <div className="
                                        flex
                                        items-end
                                        justify-between
                                        gap-5
                                    ">
                                        <div className="max-w-xl" dir="rtl">
                                            <motion.h3
                                                initial={{
                                                    opacity: 0,
                                                    y: 25,
                                                    filter: 'blur(8px)',
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    filter: 'blur(0px)',
                                                }}
                                                transition={{
                                                    duration: 0.65,
                                                    delay: 0.2,
                                                    ease: 'easeOut',
                                                }}
                                                className="
                                                    text-xl
                                                    font-black
                                                    text-white
                                                    drop-shadow-[0_3px_20px_rgba(0,0,0,0.9)]
                                                    sm:text-2xl
                                                    md:text-4xl
                                                "
                                            >
                                                {activeItem.title}
                                            </motion.h3>

                                            <motion.p
                                                initial={{
                                                    opacity: 0,
                                                    y: 18,
                                                    filter: 'blur(6px)',
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    filter: 'blur(0px)',
                                                }}
                                                transition={{
                                                    duration: 0.65,
                                                    delay: 0.38,
                                                    ease: 'easeOut',
                                                }}
                                                className="
                                                    mt-2
                                                    font-iransans
                                                    text-xs
                                                    leading-6
                                                    text-white/65
                                                    sm:text-sm
                                                    md:text-base
                                                "
                                            >
                                                {activeItem.description}
                                            </motion.p>
                                        </div>

                                        {/* Step Indicators - All White */}

                                        <div className="
                                            hidden
                                            shrink-0
                                            items-center
                                            gap-2
                                            sm:flex
                                        ">
                                            {steps.map((_, index) => (
                                                <motion.span
                                                    key={index}
                                                    animate={{
                                                        width: index === activeStep ? 32 : 8,
                                                        opacity: index === activeStep ? 1 : 0.3,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="
                                                        h-1
                                                        rounded-full
                                                        bg-white
                                                    "
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* YouTube Button */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="mt-10 flex justify-center"
                >
                    <a
                        href="https://www.youtube.com/@YOUR_CHANNEL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            font-iransans
                            group
                            inline-flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-border
                            px-7
                            py-4
                            text-sm
                            font-bold
                            text-white
                            transition-all
                            duration-300
                            hover:bg-white/10
                        "
                    >
                        <img
                            src="/icons/youtube.svg"
                            alt=""
                            className="
                                size-5
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />
                        تماشا همه ویدیوها
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
