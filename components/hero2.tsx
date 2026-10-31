
'use client';

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
    BookOpen,
    ShoppingBag,
    User,
    Sparkles,
    ChevronDown,
} from 'lucide-react';

import { WordRotate } from '@/components/magicui/word-rotate';
import Link from 'next/link';
import { UserDropdownMenu } from '@/store/components/ui/user-dropdown-menu';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
    const reduceMotion = useReducedMotion();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, {
        stiffness: 55,
        damping: 22,
        mass: 0.7,
    });

    const smoothY = useSpring(mouseY, {
        stiffness: 55,
        damping: 22,
        mass: 0.7,
    });

    const imageX = useTransform(smoothX, [-1, 1], [-12, 12]);
    const imageY = useTransform(smoothY, [-1, 1], [-8, 8]);

    const words = [
        'داستان‌های واقعی',
        'پرونده‌های مرموز',
        'اتفاقات ترسناک',
        'پرونده‌های جنایی مرموز',
    ];

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (reduceMotion) return;

        const rect = e.currentTarget.getBoundingClientRect();

        mouseX.set(
            (e.clientX - rect.left - rect.width / 2) /
                (rect.width / 2)
        );

        mouseY.set(
            (e.clientY - rect.top - rect.height / 2) /
                (rect.height / 2)
        );
    };

    const resetMouse = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const navClass = `
        h-9 cursor-pointer gap-2 rounded-full
        border border-red-300/20
        bg-black/35 px-3
        text-xs font-medium text-white
        shadow-[0_0_20px_rgba(79,70,229,0.06)]
        backdrop-blur-xl
        transition-all duration-300
        hover:border-red-300/50
        hover:bg-red-700/15
        hover:shadow-[0_0_24px_rgba(99,102,241,0.15)]
        sm:h-10 sm:px-4 sm:text-sm
    `;

    const accountTrigger = (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="حساب کاربری"
            className="
                size-10 rounded-full
                border border-red-300/25
                bg-black/40 text-white
                backdrop-blur-xl
                transition-all duration-300
                hover:border-red-300/60
                hover:bg-red-700/15
                hover:text-white
            "
        >
            <User className="size-[18px]" />
        </Button>
    );

    return (
        <section
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
            className="relative isolate w-full overflow-hidden bg-black text-white"
        >
            <div className="relative min-h-[680px] h-[100svh] w-full overflow-hidden">

                {/* Background image */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease }}
                    className="absolute inset-0"
                >
                    <motion.img
                        src="/images/walkover-hero.png"
                        alt="Walkover"
                        draggable={false}
                        style={{
                            x: imageX,
                            y: imageY,
                            scale: 1.045,
                        }}
                        className="
                        absolute inset-0 bg-black
                            absolute -inset-[2%]
                            h-[104%] w-[104%]
                            object-cover object-center
                            will-change-transform
                        "
                    />
                </motion.div>

                {/* Overall dark cinematic layer */}
                <div className="pointer-events-none absolute inset-0 bg-black/20" />

                {/* Top fade */}
                <div className="
                    pointer-events-none absolute inset-x-0 top-0 h-[25%]
                    bg-gradient-to-b from-black/65 via-black/20 to-transparent
                " />

                {/* Side vignette */}
                <div className="
                    pointer-events-none absolute inset-0
                    bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.65)_100%)]
                " />

                {/* Red atmospheric light */}
                <motion.div
                    aria-hidden="true"
                    animate={
                        reduceMotion
                            ? { opacity: 0.14 }
                            : {
                                  opacity: [0.08, 0.2, 0.08],
                                  x: ['-5%', '8%', '-5%'],
                              }
                    }
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="
                        pointer-events-none absolute
                        -left-[20%] top-[10%]
                        h-[65%] w-[65%] rounded-full
                        bg-red-950/50 blur-[120px]
                    "
                />

                {/* red atmospheric light */}
                <motion.div
                    aria-hidden="true"
                    animate={
                        reduceMotion
                            ? { opacity: 0.12 }
                            : {
                                  opacity: [0.08, 0.22, 0.08],
                                  scale: [1, 1.16, 1],
                              }
                    }
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="
                        pointer-events-none absolute
                        -right-[15%] top-[15%]
                        h-[60%] w-[60%] rounded-full
                        bg-red-800/35 blur-[120px]
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
        to-transparent
    "
/>

                {/* Extra smooth black fade, removes the visible image boundary */}
                <div className="
                    pointer-events-none absolute inset-x-0 bottom-0
                    h-[48%]
                    bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.18)_20%,rgba(0,0,0,0.62)_52%,#000_88%)]
                " />

                {/* Subtle bottom darkening */}


                {/* Navigation */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease }}
                    className="
                        absolute right-4 top-4 z-30
                        flex items-center gap-1.5
                        sm:right-6 sm:top-6 sm:gap-2
                    "
                >
                    <a
                        href="https://www.youtube.com/channel/UCsdr6i_XXypnD_9FiL0dylg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className={navClass}
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

                    <Link href="/landing-v2">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className={navClass}
                        >
                            <ShoppingBag className="size-4" />
                            <span>فروشگاه</span>
                        </Button>
                    </Link>

                    <Link href="#">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className={navClass}
                        >
                            <BookOpen className="size-4" />
                            <span>داستان‌ها</span>
                        </Button>
                    </Link>
                </motion.div>

                {/* Desktop account */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.4, ease }}
                    className="absolute left-4 top-4 z-30 hidden sm:left-6 sm:top-6 sm:block"
                >
                    <UserDropdownMenu trigger={accountTrigger} />
                </motion.div>

                {/* Mobile account */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.5, ease }}
                    className="absolute right-4 top-[68px] z-30 sm:hidden"
                >
                    <UserDropdownMenu trigger={accountTrigger} />
                </motion.div>

                {/* Main content */}
                <div className="
                    relative z-10 flex h-full w-full
                    items-center justify-center
                    px-5 pb-14 pt-16 sm:px-6
                ">
                    <div className="mx-auto w-full max-w-5xl text-center">

                        {/* Eyebrow with continuous flicker */}
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.9, delay: 0.5, ease }}
                            className="mb-6 flex items-center justify-center gap-3 sm:mb-8"
                        >
                            <span className="
                                h-px w-8 bg-gradient-to-l
                                from-red-300/90 to-transparent sm:w-14
                            " />

                            <motion.span
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                              opacity: [
                                                  1, 0.65, 0.9, 0.28,
                                                  1, 0.78, 0.48, 1,
                                              ],
                                              filter: [
                                                  'brightness(1.2)',
                                                  'brightness(0.75)',
                                                  'brightness(1.4)',
                                                  'brightness(0.5)',
                                                  'brightness(1.3)',
                                                  'brightness(0.85)',
                                                  'brightness(0.6)',
                                                  'brightness(1.2)',
                                              ],
                                              textShadow: [
                                                  '0 0 8px rgba(129,140,248,0.2)',
                                                  '0 0 2px rgba(129,140,248,0.05)',
                                                  '0 0 16px rgba(99,102,241,0.8)',
                                                  '0 0 0px rgba(255,255,255,0)',
                                                  '0 0 12px rgba(129,140,248,0.35)',
                                                  '0 0 4px rgba(99,102,241,0.2)',
                                                  '0 0 1px rgba(255,255,255,0.05)',
                                                  '0 0 8px rgba(129,140,248,0.2)',
                                              ],
                                          }
                                }
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    times: [0, 0.15, 0.28, 0.34, 0.48, 0.65, 0.76, 1],
                                }}
                                className="
                                    flex items-center gap-2
                                    text-xs font-semibold
                                    tracking-[0.12em] text-red-100/90
                                    sm:text-sm
                                    [font-family:var(--font-peyda),sans-serif]
                                "
                            >
                                چراغ‌ها رو خاموش کن
                            </motion.span>

                            <span className="
                                h-px w-8 bg-gradient-to-r
                                from-red-300/90 to-transparent sm:w-14
                            " />
                        </motion.div>

                        {/* Main title */}
                        <motion.h1
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                          opacity: 0,
                                          y: 30,
                                          filter: 'blur(12px)',
                                      }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: 1.1,
                                delay: 0.65,
                                ease,
                            }}
                            className="
                                text-4xl font-black leading-[1.3]
                                tracking-tight text-white
                                drop-shadow-[0_8px_35px_rgba(0,0,0,0.9)]
                                sm:text-5xl md:text-7xl lg:text-[5.5rem]
                                [font-family:var(--font-peyda),sans-serif]
                            "
                        >
                            وارد دنیای

                            <br className="sm:hidden" />

                            {' '}
                            <span className="
                                bg-gradient-to-b
                                from-red-200 via-red-400 to-red-600
                                bg-clip-text text-transparent
                                drop-shadow-[0_0_28px_rgba(99,102,241,0.3)]
                            ">
                                Walkover
                            </span>
                            {' '}
                            شو
                        </motion.h1>

                        {/* Rotating keywords */}
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.95, ease }}
                            className="
                                mx-auto mt-6 flex min-h-10
                                items-center justify-center sm:mt-7 md:min-h-12
                            "
                        >
                            <WordRotate
                                words={words}
                                className="
                                    text-xl font-extrabold tracking-tight
                                    text-red-300
                                    drop-shadow-[0_0_22px_rgba(99,102,241,0.45)]
                                    sm:text-2xl md:text-3xl lg:text-4xl
                                    [font-family:var(--font-peyda),sans-serif]
                                "
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                          opacity: 0,
                                          y: 18,
                                          filter: 'blur(6px)',
                                      }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{ duration: 0.9, delay: 1.15, ease }}
                            className="
                                mx-auto mt-6 max-w-2xl
                                text-sm leading-8 text-white/80
                                drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]
                                sm:mt-7 sm:text-base md:text-lg md:leading-9
                                [font-family:var(--font-vazirmatn),sans-serif]
                            "
                        >
                            آماده‌ای وارد دنیایی بشی که هر داستانش می‌تونه
                            تا مدت‌ها توی ذهنت بمونه؟
                            <br className="hidden sm:block" />
                            همراه{' '}
                            <span className="font-semibold text-red-300">
                                Walkover
                            </span>{' '}
                            باش و داستان‌هایی رو بشنوی که شاید هیچ‌وقت فراموششون نکنی.
                        </motion.p>

                        {/* Glowing divider */}
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 1, delay: 1.4, ease }}
                            className="
                                mx-auto mt-8 h-px w-32 origin-center
                                bg-gradient-to-r from-transparent
                                via-red-400 to-transparent
                                shadow-[0_0_18px_rgba(99,102,241,0.85)]
                            "
                        />
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="
                        absolute bottom-5 left-1/2 z-20
                        -translate-x-1/2 sm:bottom-7
                    "
                >
                    <motion.div
                        animate={reduceMotion ? {} : { y: [0, 6, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="flex flex-col items-center gap-2 text-red-200/70"
                    >
                        <span className="text-[10px] font-medium sm:text-xs">
                            بیا پایین
                        </span>

                        <div className="
                            flex h-8 w-[19px] items-start justify-center
                            rounded-full border border-red-300/40
                            bg-black/30 p-1 backdrop-blur-sm
                            shadow-[0_0_16px_rgba(99,102,241,0.12)]
                        ">
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                              y: [0, 10, 0],
                                              opacity: [1, 0.35, 1],
                                          }
                                }
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="
                                    size-1.5 rounded-full bg-red-300
                                    shadow-[0_0_8px_rgba(129,140,248,0.9)]
                                "
                            />
                        </div>

                        <motion.div
                            animate={reduceMotion ? {} : { y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <ChevronDown className="size-4" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
