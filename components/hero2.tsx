'use client';

import {useEffect, useRef} from 'react';

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from 'framer-motion';

import {Button} from '@/components/ui/button';

import {
    Ghost,
    ShoppingBag,
    User,
    ChevronDown,
} from 'lucide-react';

import {WordRotate} from '@/components/magicui/word-rotate';
import Link from 'next/link';
import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';
import {SCARY_EXPERIENCES_PATH} from '@/features/scary-experiences/routes';
import Image from 'next/image';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
    const reduceMotion = useReducedMotion();
    const stageRef = useRef<HTMLDivElement>(null);

    /* ── Mouse parallax ── */

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

    /* ── Flashlight ── */

    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;

        const setVars = (x: number, y: number, r: number) => {
            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);
            el.style.setProperty('--r', `${r}px`);
        };

        const getRect = () => el.getBoundingClientRect();

        let {width, height} = getRect();

        const radius = () =>
            Math.max(170, Math.min(width, height) * 0.36);

        const home = () => ({
            x: width * 0.5,
            y: height * 0.46,
        });

        if (reduceMotion) {
            const h = home();
            setVars(h.x, h.y, radius() * 1.15);
            return;
        }

        let cur = home();
        let target = {...cur};

        let pointerActive = false;
        let raf = 0;
        let t = 0;
        let onScreen = true;

        const canHover = window.matchMedia('(hover: hover)').matches;

        const onMove = (e: PointerEvent) => {
            const r = getRect();

            target = {
                x: e.clientX - r.left,
                y: e.clientY - r.top,
            };

            pointerActive = true;
        };

        const onLeave = () => {
            pointerActive = false;
        };

        const onResize = () => {
            ({width, height} = getRect());
        };

        const tick = () => {
            t += 0.006;

            if (!pointerActive || !canHover) {
                const h = home();

                target = {
                    x: h.x + Math.sin(t * 1.3) * width * 0.16,
                    y: h.y + Math.sin(t * 2.1) * height * 0.08,
                };
            }

            cur.x += (target.x - cur.x) * 0.12;
            cur.y += (target.y - cur.y) * 0.12;

            const tremor =
                1 +
                Math.sin(t * 37) * 0.012 +
                Math.sin(t * 13) * 0.01;

            setVars(cur.x, cur.y, radius() * tremor);

            raf = onScreen ? requestAnimationFrame(tick) : 0;
        };

        const observer = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;

            if (onScreen && !raf) {
                raf = requestAnimationFrame(tick);
            }
        });

        observer.observe(el);

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        window.addEventListener('resize', onResize);

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();

            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('resize', onResize);
        };
    }, [reduceMotion]);

    /* ── Rotating words ── */

    const words = [
        'داستان‌های واقعی',
        'پرونده‌های مرموز',
        'اتفاقات ترسناک',
        'فروشگاه',
    ];

    /* ── Navigation styles ── */

    const navClass = `
        h-9 cursor-pointer gap-2 rounded-full
        border border-blue-300/20
        bg-black/35 px-3
        text-xs font-medium text-white
        shadow-[0_0_20px_rgba(79,70,229,0.06)]
        backdrop-blur-xl
        transition-all duration-300
        hover:border-blue-300/50
        hover:bg-blue-700/15
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
                border border-blue-300/25
                bg-black/40 text-white
                backdrop-blur-xl
                transition-all duration-300
                hover:border-blue-300/60
                hover:bg-blue-700/15
                hover:text-white
            "
        >
            <User className="size-[18px]"/>
        </Button>
    );

    return (
        <section className="relative isolate w-full overflow-hidden bg-black text-white">
            <div
                ref={stageRef}
                className="relative min-h-[680px] h-[100svh] w-full overflow-hidden"
            >

                {/* Background plates + Flashlight */}

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {opacity: 0, scale: 1.1}
                    }
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 2, ease}}
                    className="absolute inset-0"
                >

                    {/* Dark base image */}

                    <motion.img
                        src="/images/background.jpg"
                        alt="Walkover"
                        draggable={false}
                        style={{
                            x: imageX,
                            y: imageY,
                            scale: 1.045,
                        }}
                        className="
                            absolute -inset-[2%]
                            h-[104%] w-[104%]
                            object-cover object-center
                            [filter:brightness(0.28)_saturate(0.6)]
                        "
                    />

                    {/* Flashlight illuminated image */}

                    <motion.img
                        src="/images/background.jpg"
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        style={{
                            x: imageX,
                            y: imageY,
                            scale: 1.045,
                        }}
                        className="
                            flash-lit
                            absolute -inset-[2%]
                            h-[104%] w-[104%]
                            object-cover object-center
                            [filter:brightness(1.6)_contrast(1.1)_saturate(0.9)]
                        "
                    />

                    {/* Flashlight glow */}

                    <div
                        className="flash-glow absolute inset-0"
                        aria-hidden="true"
                    />

                </motion.div>

                {/* Overall dark cinematic layer */}

                <div className="pointer-events-none absolute inset-0 bg-black/20"/>

                {/* Top fade */}

                <div
                    className="
                        pointer-events-none absolute inset-x-0 top-0 h-[25%]
                        bg-gradient-to-b from-black/65 via-black/20 to-transparent
                    "
                />

                {/* Side vignette */}

                <div
                    className="
                        pointer-events-none absolute inset-0
                        bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.65)_100%)]
                    "
                />

                {/* Blue atmospheric light - left */}

                <motion.div
                    aria-hidden="true"
                    animate={
                        reduceMotion
                            ? {opacity: 0.14}
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
                        bg-blue-950/50 blur-[120px]
                    "
                />

                {/* Blue atmospheric light - right */}

                <motion.div
                    aria-hidden="true"
                    animate={
                        reduceMotion
                            ? {opacity: 0.12}
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
                        bg-blue-800/35 blur-[120px]
                    "
                />

                {/* Bottom cinematic gradient */}

                <div
                    className="
                        pointer-events-none absolute
                        inset-x-0 bottom-0
                        h-[55%]
                        bg-gradient-to-t
                        from-black
                        to-transparent
                    "
                />

                {/* Extra smooth black fade */}

                <div
                    className="
                        pointer-events-none absolute inset-x-0 bottom-0
                        h-[48%]
                        bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.18)_20%,rgba(0,0,0,0.62)_52%,#000_88%)]
                    "
                />

                {/* Navigation */}

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {opacity: 0, y: -16}
                    }
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3, ease}}
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
                            <ShoppingBag className="size-4"/>
                            <span>فروشگاه</span>
                        </Button>
                    </Link>

                    {/*<Link*/}
                    {/*    href={SCARY_EXPERIENCES_PATH}*/}
                    {/*>*/}
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className={navClass}
                        >
                            <Ghost className="size-4"/>
                            <span>تجربیات ترسناک من</span>
                        </Button>
                    {/*</Link>*/}
                </motion.div>

                {/* Desktop account */}

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {opacity: 0, scale: 0.85}
                    }
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.65, delay: 0.4, ease}}
                    className="absolute left-4 top-4 z-30 hidden sm:left-6 sm:top-6 sm:block"
                >
                    <UserDropdownMenu trigger={accountTrigger}/>
                </motion.div>

                {/* Mobile account */}

                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {opacity: 0, scale: 0.85}
                    }
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.65, delay: 0.5, ease}}
                    className="absolute right-4 top-[68px] z-30 sm:hidden"
                >
                    <UserDropdownMenu trigger={accountTrigger}/>
                </motion.div>

                {/* Main content */}

                <div
                    className="
                        relative z-10 flex h-full w-full
                        items-center justify-center
                        px-5 pb-14 pt-16 sm:px-6
                    "
                >
                    <div className="mx-auto w-full max-w-5xl text-center">

                        {/* Eyebrow */}

                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : {opacity: 0, y: 12, filter: 'blur(8px)'}
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{duration: 0.9, delay: 0.5, ease}}
                            className="mb-6 flex items-center justify-center gap-3 sm:mb-8"
                        >
                            <span
                                className="
                                    h-px w-8 bg-gradient-to-l
                                    from-blue-300/90 to-transparent sm:w-14
                                "
                            />

                            <motion.span
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                            opacity: [1, 0.65, 0.9, 0.28, 1, 0.78, 0.48, 1],
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
                                        }
                                }
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    times: [0, 0.15, 0.28, 0.34, 0.48, 0.65, 0.76, 1],
                                }}
                                data-text="چراغ‌ها رو خاموش کن"
                                className="
        glitch-text relative inline-block
        text-xs font-semibold
        tracking-[0.12em] text-blue-100/90
        sm:text-base
        [font-family:var(--font-landing),sans-serif]
    "
                            >
                                چراغ‌ها رو خاموش کن
                            </motion.span>

                            <span
                                className="
                                    h-px w-8 bg-gradient-to-r
                                    from-blue-300/90 to-transparent sm:w-14
                                "
                            />
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
                                [font-family:var(--font-landing),sans-serif]
                            "
                        >
                            وارد دنیای

                            <br className="sm:hidden"/>

                            {' '}

                            <Image
    src="/images/WALKOVER_horror_transparent.webp"
    alt="WALKOVER"
    width={320}
    height={90}
    priority
    className="inline-block h-auto w-[180px] align-middle sm:w-[240px] md:w-[320px]"
/>

                            {' '}

                            شو
                        </motion.h1>

                        {/* Rotating keywords */}

                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : {opacity: 0, y: 20}
                            }
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.95, ease}}
                            className="
                                mx-auto mt-6 flex min-h-10
                                items-center justify-center sm:mt-7 md:min-h-12
                            "
                        >
                            <WordRotate
                                words={words}
                                className="
                                    text-xl font-extrabold tracking-tight
                                    text-blue-300
                                    drop-shadow-[0_0_22px_rgba(99,102,241,0.45)]
                                    sm:text-2xl md:text-3xl lg:text-4xl
                                    [font-family:var(--font-landing),sans-serif]
                                "
                            />
                        </motion.div>

                        {/* Description */}

                        {/*<motion.p*/}
                        {/*    initial={*/}
                        {/*        reduceMotion*/}
                        {/*            ? false*/}
                        {/*            : {*/}
                        {/*                opacity: 0,*/}
                        {/*                y: 18,*/}
                        {/*                filter: 'blur(6px)',*/}
                        {/*            }*/}
                        {/*    }*/}
                        {/*    animate={{*/}
                        {/*        opacity: 1,*/}
                        {/*        y: 0,*/}
                        {/*        filter: 'blur(0px)',*/}
                        {/*    }}*/}
                        {/*    transition={{duration: 0.9, delay: 1.15, ease}}*/}
                        {/*    className="*/}
                        {/*        mx-auto mt-6 max-w-2xl*/}
                        {/*        text-sm leading-8 text-white/80*/}
                        {/*        drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]*/}
                        {/*        sm:mt-7 sm:text-base md:text-lg md:leading-9*/}
                        {/*        [font-family:var(--font-vazirmatn),sans-serif]*/}
                        {/*    "*/}
                        {/*>*/}
                        {/*    آماده‌ای وارد دنیایی بشی که هر داستانش می‌تونه*/}
                        {/*    تا مدت‌ها توی ذهنت بمونه؟*/}

                        {/*</motion.p>*/}

                        {/* Glowing divider */}

                        {/*<motion.div*/}
                        {/*    initial={*/}
                        {/*        reduceMotion*/}
                        {/*            ? false*/}
                        {/*            : {opacity: 0, scaleX: 0}*/}
                        {/*    }*/}
                        {/*    animate={{opacity: 1, scaleX: 1}}*/}
                        {/*    transition={{duration: 1, delay: 1.4, ease}}*/}
                        {/*    className="*/}
                        {/*        mx-auto mt-8 h-px w-32 origin-center*/}
                        {/*        bg-gradient-to-r from-transparent*/}
                        {/*        via-blue-400 to-transparent*/}
                        {/*        shadow-[0_0_18px_rgba(99,102,241,0.85)]*/}
                        {/*    "*/}
                        {/*/>*/}

                    </div>
                </div>

                {/* Scroll indicator */}

                <motion.div
                    initial={reduceMotion ? false : {opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.6, duration: 0.8}}
                    className="
                        absolute bottom-5 left-1/2 z-20
                        -translate-x-1/2 sm:bottom-7
                    "
                >
                    <motion.div
                        animate={reduceMotion ? {} : {y: [0, 6, 0]}}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="flex flex-col items-center gap-2 text-blue-200/70"
                    >

                        <div
                            className="
                                flex h-8 w-[19px] items-start justify-center
                                rounded-full border
                                p-1
                                shadow-[0_0_16px_rgba(99,102,241,0.12)]
                            "
                        >
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
                                    size-1.5 rounded-full bg-foreground/30
                                "
                            />
                        </div>

                        <motion.div
                            animate={
                                reduceMotion
                                    ? {}
                                    : {
                                        y: [0, 4, 0],
                                        opacity: [0.4, 1, 0.4],
                                    }
                            }
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
