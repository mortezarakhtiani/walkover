
'use client';

import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';
import {Button} from '@/components/ui/button';
import {
    BookOpen,
    ShoppingBag,
    User,
} from 'lucide-react';
import {WordRotate} from '@/components/magicui/word-rotate';
import Link from 'next/link';
import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';

const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, {
        stiffness: 80,
        damping: 20,
        mass: 0.5,
    });

    const smoothY = useSpring(mouseY, {
        stiffness: 80,
        damping: 20,
        mass: 0.5,
    });

    const imageX = useTransform(smoothX, [-1, 1], [-8, 8]);
    const imageY = useTransform(smoothY, [-1, 1], [-8, 8]);

    const rotatingWords = [
        'داستان‌های واقعی',
        'پرونده‌های مرموز',
        'اتفاقات ترسناک',
        'پرونده‌های جنایی مرموز',
    ];

    const handleMouseMove = (
        e: React.MouseEvent<HTMLElement>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x =
            (e.clientX - rect.left - rect.width / 2) /
            (rect.width / 2);

        const y =
            (e.clientY - rect.top - rect.height / 2) /
            (rect.height / 2);

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-black
            "
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* =====================================================
                HERO
            ====================================================== */}

            <div
                className="
                    relative
                    h-[100svh]
                    min-h-[620px]
                    w-full
                    overflow-hidden
                "
            >

                {/* =================================================
                    BACKGROUND IMAGE
                ================================================== */}

                <div className="absolute inset-0 overflow-hidden">

                    <motion.img
                        src="/images/scaryImage.jpg"
                        alt="Walkover"
                        draggable={false}
                        style={{
                            x: imageX,
                            y: imageY,
                        }}
                        initial={{
                            scale: 1.06,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1.03,
                            opacity: 1,
                        }}
                        transition={{
                            opacity: {
                                duration: 1.2,
                                ease: 'easeOut',
                            },
                            scale: {
                                duration: 1.8,
                                ease: 'easeOut',
                            },
                        }}
                        className="
                            absolute
                            inset-[-12px]
                            h-[calc(100%+24px)]
                            w-[calc(100%+24px)]
                            object-cover
                            object-center
                        "
                    />

                    {/* Main dark overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-black/45
                        "
                    />

                    {/* Top cinematic gradient */}
                    <div
                        className="
                            absolute
                            inset-x-0
                            top-0
                            h-56
                            bg-gradient-to-b
                            from-black/80
                            via-black/35
                            to-transparent
                        "
                    />

                    {/* Bottom cinematic gradient */}
                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            h-[55%]
                            bg-gradient-to-t
                            from-black
                            via-black/65
                            to-transparent
                        "
                    />

                    {/* Subtle side vignette */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35)_100%)]
                        "
                    />

                    {/* Very subtle indigo atmosphere */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_50%_55%,rgba(79,70,229,0.08),transparent_42%)]
                        "
                    />
                </div>

                {/* =================================================
                    TOP NAVIGATION
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -18,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.25,
                        ease: 'easeOut',
                    }}
                    className="
                        absolute
                        right-4
                        top-4
                        z-30
                        flex
                        items-center
                        gap-1.5
                        sm:right-6
                        sm:top-6
                        sm:gap-2
                    "
                >

                    {/* YouTube */}

                    <a
                        href="https://www.youtube.com/channel/UCsdr6i_XXypnD_9FiL0dylg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="
                                h-9
                                cursor-pointer
                                gap-2
                                rounded-full
                                border-white/15
                                bg-black/35
                                px-3
                                text-xs
                                font-medium
                                text-white
                                shadow-xl
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-white/30
                                hover:bg-white/10
                                hover:text-white
                                sm:h-10
                                sm:px-4
                                sm:text-sm
                            "
                        >
                            <img
                                src="/icons/youtube.svg"
                                alt=""
                                className="size-4 sm:size-[18px]"
                            />

                            <span className="hidden xs:inline">
                                ویدیوهای جدید
                            </span>
                        </Button>
                    </a>

                    {/* Store */}

                    <Link href="/landing-v2">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="
                                h-9
                                cursor-pointer
                                gap-2
                                rounded-full
                                border-white/15
                                bg-black/35
                                px-3
                                text-xs
                                font-medium
                                text-white
                                shadow-xl
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-white/30
                                hover:bg-white/10
                                hover:text-white
                                sm:h-10
                                sm:px-4
                                sm:text-sm
                            "
                        >
                            <ShoppingBag className="size-4"/>

                            <span>
                                فروشگاه
                            </span>
                        </Button>
                    </Link>

                    {/* Stories */}

                    <Link href="#">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="
                                h-9
                                cursor-pointer
                                gap-2
                                rounded-full
                                border-white/15
                                bg-black/35
                                px-3
                                text-xs
                                font-medium
                                text-white
                                shadow-xl
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-white/30
                                hover:bg-white/10
                                hover:text-white
                                sm:h-10
                                sm:px-4
                                sm:text-sm
                            "
                        >
                            <BookOpen className="size-4"/>

                            <span>
                                داستان‌ها
                            </span>
                        </Button>
                    </Link>
                </motion.div>

                {/* =================================================
                    DESKTOP ACCOUNT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.45,
                    }}
                    className="
                        absolute
                        left-4
                        top-4
                        z-30
                        hidden
                        sm:block
                        sm:left-6
                        sm:top-6
                    "
                >
                    <UserDropdownMenu
                        trigger={
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="
                                    size-10
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-black/35
                                    text-white
                                    shadow-xl
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    hover:border-white/30
                                    hover:bg-white/10
                                    hover:text-white
                                "
                                aria-label="حساب کاربری"
                            >
                                <User className="size-[18px]"/>
                            </Button>
                        }
                    />
                </motion.div>

                {/* =================================================
                    MOBILE ACCOUNT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.55,
                    }}
                    className="
                        absolute
                        right-4
                        top-[68px]
                        z-30
                        sm:hidden
                    "
                >
                    <UserDropdownMenu
                        trigger={
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="
                                    size-10
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-black/35
                                    text-white
                                    shadow-xl
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    hover:border-white/30
                                    hover:bg-white/10
                                    hover:text-white
                                "
                                aria-label="حساب کاربری"
                            >
                                <User className="size-[18px]"/>
                            </Button>
                        }
                    />
                </motion.div>

                {/* =================================================
                    HERO CONTENT
                ================================================== */}

                <div
                    className="
                        relative
                        z-10
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        px-5
                        pt-12
                        sm:px-6
                    "
                >
                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-5xl
                            text-center
                            text-white
                        "
                    >

{/* Small eyebrow */}

<div
    className="
        mb-5
        flex
        items-center
        justify-center
        gap-3
        sm:mb-6
    "
>
    {/* خط سمت راست */}
    <span className="h-px w-8 shrink-0 bg-white/20 sm:w-12" />

    {/* متن */}
    <motion.span
        initial={{
            opacity: 0,
            y: 8,
            filter: 'blur(6px)',
        }}
        animate={{
            opacity: [0, 1, 0.75, 1, 0.9, 1],
            y: [8, 0, 0, 0, 0, 0],
            filter: [
                'blur(6px)',
                'blur(0px)',
                'blur(1px)',
                'blur(0px)',
                'blur(1px)',
                'blur(0px)',
            ],
        }}
        transition={{
            duration: 1.8,
            delay: 0.8,
            ease: 'easeOut',
        }}
        className="
            text-xs
            font-medium
            leading-none
            tracking-[0.15em]
            text-white/70
            sm:text-sm
        "
    >
        چراغ‌ها رو خاموش کن
    </motion.span>

    {/* خط سمت چپ */}
    <span className="h-px w-8 shrink-0 bg-white/20 sm:w-12" />
</div>


                        {/* Main title */}

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 28,
                                filter: 'blur(8px)',
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 0.9,
                                delay: 0.55,
                                ease: 'easeOut',
                            }}
                            className="
                                text-4xl
                                font-black
                                leading-[1.15]
                                tracking-tight
                                text-white
                                drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)]
                                sm:text-5xl
                                md:text-7xl
                                lg:text-[5.5rem]
                            "
                        >
                            وارد دنیای
                            <span className="text-white">
                                {' '}
                                Walkover
                            </span>
                            {' '}
                            شو
                        </motion.h1>

                        {/* Rotating words */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 22,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.8,
                            }}
                            className="
                                mt-5
                                flex
                                min-h-9
                                items-center
                                justify-center
                                sm:mt-6
                                md:min-h-11
                            "
                        >
                            <WordRotate
                                words={rotatingWords}
                                className="
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    drop-shadow-[0_4px_20px_rgba(0,0,0,0.75)]
                                    sm:text-2xl
                                    md:text-3xl
                                    lg:text-4xl
                                "
                            />
                        </motion.div>

                        {/* Description */}

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 1,
                            }}
                            className="
                                mx-auto
                                mt-6
                                max-w-2xl
                                text-sm
                                leading-8
                                text-white/70
                                drop-shadow-[0_3px_15px_rgba(0,0,0,0.8)]
                                sm:mt-7
                                sm:text-base
                                md:text-lg
                                md:leading-9
                            "
                        >
                            آماده‌ای وارد دنیایی بشی که هر داستانش می‌تونه
                            تا مدت‌ها توی ذهنت بمونه؟
                            <br className="hidden sm:block"/>
                            همراه Walkover باش و داستان‌هایی رو بشنوی که شاید
                            هیچ‌وقت فراموششون نکنی.
                        </motion.p>

                    </div>
                </div>

                {/* =================================================
                    SCROLL INDICATOR
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 1.7,
                        duration: 0.8,
                    }}
                    className="
                        absolute
                        bottom-5
                        left-1/2
                        z-20
                        -translate-x-1/2
                        sm:bottom-7
                    "
                >
                    <motion.div
                        animate={{
                            y: [0, 7, 0],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="
                            flex
                            flex-col
                            items-center
                            gap-2
                            text-white/45
                        "
                    >
                        <span
                            className="
                                text-[10px]
                                font-medium
                                tracking-wide
                                sm:text-xs
                            "
                        >
                            بیا پایین
                        </span>

                        <div
                            className="
                                flex
                                h-8
                                w-[19px]
                                items-start
                                justify-center
                                rounded-full
                                border
                                border-white/25
                                p-1
                            "
                        >
                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                    opacity: [1, 0.4, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="
                                    size-1.5
                                    rounded-full
                                    bg-white/70
                                "
                            />
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;

