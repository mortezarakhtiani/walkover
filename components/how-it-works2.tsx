
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    CircleUserRound,
    Clapperboard,
    BookOpen,
    ShoppingBag,
    ArrowDown,
} from 'lucide-react';

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
                border-b
                border-white/[0.06]
                bg-black
                py-24
                sm:py-28
                lg:py-32
            "
        >
            {/* =====================================================
                BACKGROUND ATMOSPHERE
            ====================================================== */}

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

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =================================================
                    SECTION HEADER
                ================================================== */}

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
                    className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
                >


                    {/* Title */}

                    <h2
                        className="
                            text-3xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-4xl
                            md:text-5xl
                        "
                    >
                        هر داستان، یک{' '}
                        <span
                            className="
                                bg-gradient-to-r
                                from-white
                                via-white
                                to-white/50
                                bg-clip-text
                                text-transparent
                            "
                        >
                            شروع
                        </span>
                    </h2>


                </motion.div>

                {/* =================================================
                    STEP NAVIGATION
                ================================================== */}

                <div
                    className="
                        mb-8
                        grid
                        grid-cols-4
                        gap-2
                        sm:mb-10
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
            className="
                group
                min-w-0
                cursor-pointer
                text-center
                outline-none
            "
        >
            {/* Title */}

            <div
                className={`
                    mb-3
                    truncate
                    text-[10px]
                    font-semibold
                    transition-colors
                    duration-300
                    sm:text-sm
                    md:text-base
                    ${
                        isActive
                            ? 'text-white'
                            : 'text-white/35 group-hover:text-white/60'
                    }
                `}
            >
                {step.title}
            </div>

            {/* Progress line */}

            <div
                className="
                    relative
                    h-[2px]
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-white/10
                "
            >
                {isActive && (
                    <motion.div
                        className="
                            absolute
                            inset-y-0
                            right-0
                            rounded-full
                            bg-indigo-500
                            shadow-[0_0_10px_rgba(99,102,241,0.45)]
                        "
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                )}
            </div>
        </button>
    );
})}


                </div>

                {/* =================================================
                    MAIN VISUAL
                ================================================== */}

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
                                initial={{
                                    opacity: 0,
                                    scale: 1.025,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.985,
                                }}
                                transition={{
                                    duration: 0.55,
                                    ease: 'easeOut',
                                }}
                                className="absolute inset-0"
                            >
                                {/* Image */}

                                <img
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    draggable={false}
                                    className="
                                        absolute
                                        inset-0
                                        h-full
                                        w-full
                                        object-cover
                                        object-center
                                    "
                                />

                                {/* Dark overlay */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-black/20
                                    "
                                />

                                {/* Cinematic gradient */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black
                                        via-black/20
                                        to-transparent
                                    "
                                />

                                {/* Side vignette */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]
                                    "
                                />

                                {/* =================================================
                                    YOUTUBE BUTTON
                                ================================================== */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.75,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.15,
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
                                        {/* Glow */}

                                        <div
                                            className="
                                                absolute
                                                inset-1
                                                rounded-full
                                                bg-red-500/10
                                                blur-xl
                                            "
                                        />

                                        <img
                                            src="/icons/youtube.svg"
                                            alt="YouTube"
                                            className="
                                                relative
                                                size-16
                                                drop-shadow-[0_8px_25px_rgba(0,0,0,0.55)]
                                                sm:size-20
                                                md:size-24
                                            "
                                        />
                                    </motion.div>
                                </div>

                                {/* =================================================
                                    BOTTOM INFO
                                ================================================== */}

                                <div
                                    className="
                                        absolute
                                        inset-x-0
                                        bottom-0
                                        p-5
                                        sm:p-8
                                        md:p-10
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-end
                                            justify-between
                                            gap-5
                                        "
                                    >
                                        <div className="max-w-xl">



                                            <h3
                                                className="
                                                    text-xl
                                                    font-black
                                                    text-white
                                                    drop-shadow-[0_3px_15px_rgba(0,0,0,0.7)]
                                                    sm:text-2xl
                                                    md:text-4xl
                                                "
                                            >
                                                {activeItem.title}
                                            </h3>

                                            <p
                                                className="
                                                    mt-2
                                                    text-xs
                                                    leading-6
                                                    text-white/55
                                                    sm:text-sm
                                                    md:text-base
                                                "
                                            >
                                                {activeItem.description}
                                            </p>
                                        </div>

                                        {/* Step indicator */}

                                        <div
                                            className="
                                                hidden
                                                shrink-0
                                                items-center
                                                gap-2
                                                sm:flex
                                            "
                                        >
                                            {steps.map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`
                                                        h-1
                                                        rounded-full
                                                        transition-all
                                                        duration-300
                                                        ${
                                                            index === activeStep
                                                                ? 'w-8 bg-white'
                                                                : 'w-2 bg-white/25'
                                                        }
                                                    `}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* =================================================
                    BOTTOM HINT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 0.6,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="
                        mt-6
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-white/20
                    "
                >
                    <ArrowDown className="size-3" />
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;

