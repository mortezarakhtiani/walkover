
'use client';

import { useEffect, useRef, useState } from 'react';

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from 'framer-motion';

import { Button } from '@/components/ui/button';
import { UserDropdownMenu } from '@/store/components/ui/user-dropdown-menu';
import { WordRotate } from '@/components/magicui/word-rotate';
import { User } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
    const reduceMotion = useReducedMotion();
    const stageRef = useRef<HTMLDivElement>(null);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 640px)');

        const update = () => setIsDesktop(media.matches);

        update();
        media.addEventListener('change', update);

        return () => media.removeEventListener('change', update);
    }, []);

    const motionDisabled = Boolean(reduceMotion);

    /* Desktop Parallax */

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

    /* Desktop Flashlight */

    useEffect(() => {
        const el = stageRef.current;

        if (!el || !isDesktop) return;

        const setVars = (x: number, y: number, r: number) => {
            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);
            el.style.setProperty('--r', `${r}px`);
        };

        const getRect = () => el.getBoundingClientRect();

        let { width, height } = getRect();

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
        let target = { ...cur };
        let raf = 0;
        let onScreen = true;
        let needsAnimation = false;

        const tick = () => {
            const dx = target.x - cur.x;
            const dy = target.y - cur.y;

            cur.x += dx * 0.16;
            cur.y += dy * 0.16;

            setVars(cur.x, cur.y, radius());

            if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
                raf = requestAnimationFrame(tick);
            } else {
                cur = { ...target };
                setVars(cur.x, cur.y, radius());
                raf = 0;
                needsAnimation = false;
            }
        };

        const schedule = () => {
            if (onScreen && !raf) {
                raf = requestAnimationFrame(tick);
            }
        };

        const onMove = (e: PointerEvent) => {
            const r = getRect();

            target = {
                x: e.clientX - r.left,
                y: e.clientY - r.top,
            };

            needsAnimation = true;
            schedule();
        };

        const onLeave = () => {
            target = home();
            needsAnimation = true;
            schedule();
        };

        const onResize = () => {
            ({ width, height } = getRect());
            target = home();
            needsAnimation = true;
            schedule();
        };

        const observer = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;

            if (!onScreen && raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            } else if (onScreen && needsAnimation) {
                schedule();
            }
        });

        observer.observe(el);

        el.addEventListener('pointermove', onMove, { passive: true });
        el.addEventListener('pointerleave', onLeave);
        window.addEventListener('resize', onResize, { passive: true });

        const initial = home();
        setVars(initial.x, initial.y, radius());

        return () => {
            if (raf) cancelAnimationFrame(raf);

            observer.disconnect();

            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('resize', onResize);
        };
    }, [reduceMotion, isDesktop]);

    /* Rotating Words */

    const words = [
        'خاطرات ترسناک',
        'بازی رو میزی',
        'فروشگاه',
    ];

    /* Account Trigger */

    const accountTrigger = (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="حساب کاربری"
            className="
                size-10
                rounded-full
                border border-white/15
                bg-black/40
                text-white
                backdrop-blur-xl
                transition-all duration-300
                hover:border-red-500/50
                hover:bg-red-600/15
                hover:text-white
            "
        >
            <User className="size-[18px]" />
        </Button>
    );

    return (
        <section className="relative isolate w-full overflow-hidden bg-black text-white">

            <div
                ref={stageRef}
                className="
                    relative
                    h-[100svh]
                    min-h-[600px]
                    w-full
                    overflow-hidden
                    sm:min-h-[680px]
                "
            >

                {/* Background Image */}

                <motion.div
                    initial={motionDisabled ? false : { opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: motionDisabled ? 0 : 2,
                        ease,
                    }}
                    className="absolute inset-0"
                >
                    <motion.img
                        src="/images/background4.jpg"
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        style={{
                            x: isDesktop ? imageX : 0,
                            y: isDesktop ? imageY : 0,
                            scale: isDesktop ? 1.045 : 1,
                        }}
                        className="
                            absolute inset-0
                            h-full w-full
                            object-cover
                            object-[center_45%]
                            sm:-inset-[2%]
                            sm:h-[104%] sm:w-[104%]
                            sm:object-center
                        "
                    />

                    {/* Desktop Flashlight Image */}

                    {isDesktop && (
                        <motion.img
                            src="/images/background4.jpg"
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
                    )}

                    {/* Desktop Flashlight Glow */}

                    {isDesktop && (
                        <div
                            className="flash-glow absolute inset-0"
                            aria-hidden="true"
                        />
                    )}
                </motion.div>

                {/* Cinematic Overlay */}

                <div className="pointer-events-none absolute inset-0 bg-black/20" />

                {/* Top Fade */}

                <div
                    className="
                        pointer-events-none absolute inset-x-0 top-0
                        h-[25%]
                        bg-gradient-to-b from-black/65 via-black/20 to-transparent
                    "
                />

                {/* Desktop Vignette */}

                {isDesktop && (
                    <div
                        className="
                            pointer-events-none absolute inset-0
                            bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.65)_100%)]
                        "
                    />
                )}

                {/* Desktop Atmospheric Light */}

                {isDesktop && (
                    <>
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
                            "
                        />

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
                            "
                        />
                    </>
                )}

                {/* Bottom Gradients */}

                <div
                    className="
                        pointer-events-none absolute inset-x-0 bottom-0
                        h-[55%]
                        bg-gradient-to-t from-black to-transparent
                    "
                />

                <div
                    className="
                        pointer-events-none absolute inset-x-0 bottom-0
                        h-[48%]
                        bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.18)_20%,rgba(0,0,0,0.62)_52%,#000_88%)]
                    "
                />

                {/* Desktop Account */}

                <motion.div
                    initial={motionDisabled ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: motionDisabled ? 0 : 0.65,
                        delay: motionDisabled ? 0 : 0.4,
                        ease,
                    }}
                    className="
                        absolute left-4 top-4 z-30
                        hidden sm:left-6 sm:top-6 sm:block
                    "
                >
                    <UserDropdownMenu trigger={accountTrigger} />
                </motion.div>

                {/* Mobile Account */}

                <div className="absolute right-4 top-4 z-30 sm:hidden">
                    <UserDropdownMenu trigger={accountTrigger} />
                </div>

                {/* Main Content */}

                <div
                    className="
                        relative z-10
                        flex h-full w-full
                        items-center justify-center
                        px-5 pb-14 pt-16
                        sm:mt-20 sm:px-6
                    "
                >
                    <div
                        className="mx-auto w-full max-w-5xl text-center"
                        style={{
                            transform: isDesktop ? 'translateY(0px)' : 'translateY(120px)',
                        }}
                    >

                        {/* Welcome */}

                        <motion.div
                            initial={motionDisabled ? false : { opacity: 0, y: 12 }}
                            animate={
                                motionDisabled
                                    ? { opacity: 1, y: 0 }
                                    : {
                                        opacity: [0, 0.6, 0, 0.3, 0, 1, 0.4, 1, 0.8, 1],
                                        y: 0,
                                    }
                            }
                            transition={{
                                duration: motionDisabled ? 0 : 0.9,
                                delay: motionDisabled ? 0 : 0.5,
                                ease,
                                opacity: {
                                    duration: motionDisabled ? 0 : 1.4,
                                    delay: motionDisabled ? 0 : 0.5,
                                    times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.62, 0.74, 0.86, 1],
                                    ease: 'linear',
                                },
                            }}
                            className="mb-6 flex items-center justify-center gap-3 sm:mb-8"
                        >
                            <span
                                className="
                                    h-px w-8 bg-gradient-to-l
                                    from-white/50 to-transparent sm:w-14
                                "
                            />

                            <motion.span
                                className="
                                    relative inline-block
                                    font-cinzel
                                    text-xs font-semibold
                                    tracking-[0.35em]
                                    text-white/50
                                    sm:text-[23px]
                                "
                                animate={
                                    motionDisabled
                                        ? undefined
                                        : {
                                            opacity: [1, 1, 0.3, 1, 0.15, 0.9, 1, 1, 0.55, 1, 1],
                                            x: [0, 0, 0, 0, 0, 0, 0, -2, 3, -1, 0],
                                        }
                                }
                                transition={{
                                    duration: 9.1,
                                    delay: 2.2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    opacity: {
                                        times: [0, 0.25, 0.26, 0.285, 0.3, 0.33, 0.4, 0.7, 0.71, 0.73, 1],
                                    },
                                    x: {
                                        times: [0, 0.25, 0.26, 0.285, 0.3, 0.33, 0.4, 0.7, 0.705, 0.72, 0.74],
                                    },
                                }}
                            >
                                WELCOME TO

                                {!motionDisabled && (
                                    <>
                                        <motion.span
                                            aria-hidden="true"
                                            className="
                                                pointer-events-none absolute left-0 top-0
                                                whitespace-nowrap
                                                font-cinzel text-xs font-semibold
                                                tracking-[0.35em]
                                                text-sky-300 sm:text-[23px]
                                            "
                                            style={{ filter: 'blur(3px)' }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.45, 0.1, 0.6, 0] }}
                                            transition={{
                                                duration: 5.3,
                                                delay: 2.4,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                        >
                                            WELCOME TO
                                        </motion.span>

                                        <motion.span
                                            aria-hidden="true"
                                            className="
                                                pointer-events-none absolute left-0 top-0
                                                whitespace-nowrap
                                                font-cinzel text-xs font-semibold
                                                tracking-[0.35em]
                                                text-red-500 mix-blend-screen
                                                sm:text-[23px]
                                            "
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: [0, 0, 0.9, 0.4, 0.9, 0, 0],
                                                x: [0, 0, -5, 4, -3, 0, 0],
                                            }}
                                            transition={{
                                                duration: 7.7,
                                                delay: 2.6,
                                                repeat: Infinity,
                                                times: [0, 0.7, 0.71, 0.725, 0.74, 0.76, 1],
                                                ease: 'linear',
                                            }}
                                        >
                                            WELCOME TO
                                        </motion.span>

                                        <motion.span
                                            aria-hidden="true"
                                            className="
                                                pointer-events-none absolute left-0 top-0
                                                whitespace-nowrap
                                                font-cinzel text-xs font-semibold
                                                tracking-[0.35em]
                                                text-cyan-300 mix-blend-screen
                                                sm:text-[23px]
                                            "
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: [0, 0, 0.9, 0.4, 0.9, 0, 0],
                                                x: [0, 0, 5, -4, 3, 0, 0],
                                            }}
                                            transition={{
                                                duration: 7.7,
                                                delay: 2.6,
                                                repeat: Infinity,
                                                times: [0, 0.7, 0.71, 0.725, 0.74, 0.76, 1],
                                                ease: 'linear',
                                            }}
                                        >
                                            WELCOME TO
                                        </motion.span>
                                    </>
                                )}
                            </motion.span>

                            <span
                                className="
                                    h-px w-8 bg-gradient-to-r
                                    from-white/50 to-transparent sm:w-14
                                "
                            />
                        </motion.div>

                        {/* Logo */}

                        <motion.div
                            initial={motionDisabled ? false : { y: 12 }}
                            animate={{ y: 0 }}
                            transition={{
                                duration: motionDisabled ? 0 : 0.9,
                                delay: motionDisabled ? 0 : 0.5,
                                ease,
                            }}
                            className="mb-6 flex items-center justify-center sm:mb-8"
                            style={{
                                position: 'relative',
                                isolation: 'isolate',
                            }}
                        >
                            <motion.img
                                src="/icons/walkover.svg"
                                alt="WALKOVER"
                                width={260}
                                height={65}
                                className="h-auto w-[290px] sm:w-[320px]"
                                initial={motionDisabled ? false : { opacity: 0 }}
                                animate={
                                    motionDisabled
                                        ? { opacity: 1 }
                                        : { opacity: [0, 0, 1, 0, 0.9, 0, 0.5, 0, 1, 0.6, 1] }
                                }
                                transition={{
                                    duration: motionDisabled ? 0 : 1.6,
                                    delay: motionDisabled ? 0 : 1.0,
                                    times: [0, 0.1, 0.12, 0.2, 0.26, 0.34, 0.4, 0.5, 0.56, 0.7, 1],
                                    ease: 'linear',
                                }}
                            />

                            {!motionDisabled && (
                                <div
                                    aria-hidden="true"
                                    className="
                                        pointer-events-none absolute inset-y-0 left-1/2
                                        w-[290px] -translate-x-1/2 sm:w-[320px]
                                    "
                                >
                                    <motion.div
                                        className="walkover-mask absolute inset-0"
                                        style={{
                                            background:
                                                'radial-gradient(ellipse 45% 130% at 59.6% 50%, rgba(96,165,250,0.95) 0%, rgba(59,130,246,0.5) 25%, transparent 60%)',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.6, 0.1, 0.4, 0, 0] }}
                                        transition={{
                                            duration: 5.1,
                                            delay: 2.4,
                                            repeat: Infinity,
                                            times: [0, 0.05, 0.12, 0.2, 0.34, 1],
                                            ease: 'easeOut',
                                        }}
                                    />

                                    <motion.div
                                        className="walkover-mask absolute inset-0"
                                        style={{ background: 'rgb(2,6,23)' }}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 0, 0.85, 0.1, 0.95, 0.2, 0.7, 0, 0, 0.5, 0, 0],
                                        }}
                                        transition={{
                                            duration: 14.3,
                                            delay: 4,
                                            repeat: Infinity,
                                            times: [0, 0.3, 0.31, 0.325, 0.34, 0.36, 0.38, 0.42, 0.7, 0.715, 0.74, 1],
                                            ease: 'linear',
                                        }}
                                    />

                                    <motion.div
                                        className="walkover-mask absolute inset-0"
                                        style={{
                                            background: 'rgb(147,197,253)',
                                            clipPath: 'ellipse(5.2% 21% at 59.6% 50%)',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.2, 1, 0.4, 0.85, 0.2, 0.2] }}
                                        transition={{
                                            duration: 5.1,
                                            delay: 2.4,
                                            repeat: Infinity,
                                            times: [0, 0.05, 0.12, 0.2, 0.34, 1],
                                            ease: 'easeOut',
                                        }}
                                    />

                                    <motion.div
                                        className="walkover-mask absolute inset-0"
                                        style={{
                                            background: 'rgb(96,165,250)',
                                            clipPath: 'ellipse(5.2% 21% at 59.6% 50%)',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 0, 0.85, 0.1, 0.95, 0.2, 0.7, 0, 0, 0.5, 0, 0],
                                        }}
                                        transition={{
                                            duration: 14.3,
                                            delay: 4,
                                            repeat: Infinity,
                                            times: [0, 0.3, 0.31, 0.325, 0.34, 0.36, 0.38, 0.42, 0.7, 0.715, 0.74, 1],
                                            ease: 'linear',
                                        }}
                                    />

                                    <motion.div
                                        className="walkover-mask absolute inset-0 mix-blend-screen"
                                        style={{ background: 'rgb(239,68,68)' }}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 0, 1, 0.5, 1, 0, 0],
                                            x: [0, 0, -9, 6, -5, 0, 0],
                                        }}
                                        transition={{
                                            duration: 8.3,
                                            delay: 3.2,
                                            repeat: Infinity,
                                            times: [0, 0.6, 0.61, 0.625, 0.64, 0.66, 1],
                                            ease: 'linear',
                                        }}
                                    />

                                    <motion.div
                                        className="walkover-mask absolute inset-0 mix-blend-screen"
                                        style={{ background: 'rgb(103,232,249)' }}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 0, 1, 0.5, 1, 0, 0],
                                            x: [0, 0, 9, -6, 5, 0, 0],
                                        }}
                                        transition={{
                                            duration: 8.3,
                                            delay: 3.2,
                                            repeat: Infinity,
                                            times: [0, 0.6, 0.61, 0.625, 0.64, 0.66, 1],
                                            ease: 'linear',
                                        }}
                                    />

                                    <motion.img
                                        src="/icons/walkover.svg"
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 h-full w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0, 0, 1, 1, 1, 0, 0],
                                            x: [0, 0, 16, -12, 8, 0, 0],
                                            clipPath: [
                                                'inset(30% 0 60% 0)',
                                                'inset(30% 0 60% 0)',
                                                'inset(30% 0 60% 0)',
                                                'inset(58% 0 28% 0)',
                                                'inset(12% 0 78% 0)',
                                                'inset(12% 0 78% 0)',
                                                'inset(12% 0 78% 0)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 8.3,
                                            delay: 3.2,
                                            repeat: Infinity,
                                            times: [0, 0.6, 0.61, 0.625, 0.64, 0.66, 1],
                                            ease: 'linear',
                                        }}
                                    />
                                </div>
                            )}
                        </motion.div>

                        {/* Rotating Keywords */}

                        <div
                            className="
                                mx-auto mt-6
                                flex w-full flex-col
                                items-center justify-center gap-3
                                sm:mt-7
                            "
                        >
                            <span className="block w-[220px] shrink-0 border-t border-white/20" />

                            <div className="relative flex items-center justify-center">
                                <WordRotate
                                    words={words}
                                    className="
                                        zangar-text
                                        text-xl font-extrabold tracking-tight
                                        text-white/50
                                        sm:text-2xl md:text-2xl lg:text-2xl
                                    "
                                />
                            </div>

                            <span className="block w-[300px] shrink-0 border-t border-white/20" />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Desktop Only */}

                {isDesktop && (
                    <div
                        className="
                            absolute bottom-5 left-1/2 z-20
                            -translate-x-1/2 sm:bottom-7
                        "
                    >
                        <div className="flex flex-col items-center gap-2 text-white/60">
                            <motion.div
                                animate={reduceMotion ? {} : { y: [0, 6, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="
                                    flex h-8 w-[19px]
                                    items-start justify-center
                                    rounded-full border border-white/30 p-1
                                    shadow-[0_0_16px_rgba(220,38,38,0.12)]
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
                                    className="size-1.5 rounded-full bg-white/60"
                                />
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
