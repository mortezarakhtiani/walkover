'use client';

import {useCallback, useEffect, useRef, useState} from 'react';

const steps = [
    {
        id: 1,
        title: 'انتخاب محصول',
        desktopImage: '/images/DesmainImage1.webp',
        mobileImage: '/images/MobmainImage1.jpg',
    },
    {
        id: 2,
        title: 'انتخاب مدل',
        desktopImage: '/images/DesmainImage2.jpg',
        mobileImage: '/images/MobmainImage2.jpg',
    },
    {
        id: 3,
        title: 'ثبت سفارش',
        desktopImage: '/images/DesmainImage3.webp',
        mobileImage: '/images/MobmainImage3.jpg',
    },
    {
        id: 4,
        title: 'تحویل سفارش',
        desktopImage: '/images/DesmainImage4.webp',
        mobileImage: '/images/MobmainImage2.jpg',
    },
];

// برای Loop بدون پرش
const loopedSteps = [
    steps[steps.length - 1],
    ...steps,
    steps[0],
];

const SWIPE_THRESHOLD = 60;
const TRANSITION_DURATION = 280;

export default function HowItWorks() {
    // موقعیت فعلی اسلاید
    // 1 یعنی اولین تصویر واقعی
    const currentIndexRef = useRef(1);

    // خود المنت‌های اسلایدها
    const slidesRef = useRef<HTMLDivElement[]>([]);

    // اطلاعات لمس
    const touchStartX = useRef(0);
    const touchCurrentX = useRef(0);

    // وضعیت Drag و Animation
    const isDraggingRef = useRef(false);
    const isAnimatingRef = useRef(false);

    // برای حرکت روان هنگام Touch Move
    const animationFrameRef = useRef<number | null>(null);

    // Auto Play
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // فقط برای نمایش نقطه فعال
    const [activeDot, setActiveDot] = useState(0);

    // --------------------------------------------------
    // حرکت دادن اسلایدها
    // --------------------------------------------------

    const updateSlides = useCallback(
        (
            index: number,
            offset = 0,
            animate = true
        ) => {
            slidesRef.current.forEach(
                (slide, slideIndex) => {
                    if (!slide) return;

                    const position =
                        slideIndex - index;

                    slide.style.transition = animate
                        ? `transform ${TRANSITION_DURATION}ms ease-out`
                        : 'none';

                    slide.style.transform =
                        `translate3d(calc(${position * 100}% + ${offset}px), 0, 0)`;
                }
            );
        },
        []
    );

    // --------------------------------------------------
    // نقطه فعال
    // --------------------------------------------------

    const updateActiveDot = useCallback(
        (index: number) => {
            const dot =
                (index - 1 + steps.length) %
                steps.length;

            setActiveDot(dot);
        },
        []
    );

    // --------------------------------------------------
    // شروع Auto Play
    // --------------------------------------------------

    const startAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }

        autoPlayRef.current = setInterval(() => {
            if (
                !isDraggingRef.current &&
                !isAnimatingRef.current
            ) {
                const nextIndex =
                    currentIndexRef.current + 1;

                currentIndexRef.current =
                    nextIndex;

                updateSlides(
                    nextIndex,
                    0,
                    true
                );

                updateActiveDot(nextIndex);

                isAnimatingRef.current = true;
            }
        }, 3000);
    }, [
        updateSlides,
        updateActiveDot,
    ]);

    // --------------------------------------------------
    // توقف Auto Play
    // --------------------------------------------------

    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);

            autoPlayRef.current = null;
        }
    }, []);

    // --------------------------------------------------
    // پایان Animation
    // --------------------------------------------------

    const handleTransitionEnd = useCallback(() => {
        let index =
            currentIndexRef.current;

        isAnimatingRef.current = false;

        // Clone آخر → تصویر اول واقعی
        if (
            index ===
            loopedSteps.length - 1
        ) {
            index = 1;

            currentIndexRef.current =
                index;

            updateSlides(
                index,
                0,
                false
            );

            updateActiveDot(index);

            return;
        }

        // Clone اول → تصویر آخر واقعی
        if (index === 0) {
            index = steps.length;

            currentIndexRef.current =
                index;

            updateSlides(
                index,
                0,
                false
            );

            updateActiveDot(index);
        }
    }, [
        updateSlides,
        updateActiveDot,
    ]);

    // --------------------------------------------------
    // Touch Start
    // --------------------------------------------------

    const handleTouchStart = (
        e: React.TouchEvent<HTMLDivElement>
    ) => {
        if (isAnimatingRef.current) {
            return;
        }

        const x =
            e.touches[0].clientX;

        touchStartX.current = x;
        touchCurrentX.current = x;

        isDraggingRef.current = true;

        // هنگام لمس AutoPlay متوقف شود
        stopAutoPlay();

        // Transition هنگام Drag خاموش باشد
        slidesRef.current.forEach(
            (slide) => {
                if (slide) {
                    slide.style.transition =
                        'none';
                }
            }
        );
    };

    // --------------------------------------------------
    // Touch Move
    // --------------------------------------------------

    const handleTouchMove = (
        e: React.TouchEvent<HTMLDivElement>
    ) => {
        if (!isDraggingRef.current) {
            return;
        }

        const x =
            e.touches[0].clientX;

        touchCurrentX.current = x;

        const diff =
            x - touchStartX.current;

        // جلوگیری از اجرای چند آپدیت همزمان
        if (
            animationFrameRef.current
        ) {
            cancelAnimationFrame(
                animationFrameRef.current
            );
        }

        animationFrameRef.current =
            requestAnimationFrame(() => {
                updateSlides(
                    currentIndexRef.current,
                    diff,
                    false
                );
            });
    };

    // --------------------------------------------------
    // Touch End
    // --------------------------------------------------

    const handleTouchEnd = () => {
        if (!isDraggingRef.current) {
            return;
        }

        isDraggingRef.current = false;

        if (
            animationFrameRef.current
        ) {
            cancelAnimationFrame(
                animationFrameRef.current
            );

            animationFrameRef.current =
                null;
        }

        const diff =
            touchCurrentX.current -
            touchStartX.current;

        // Swipe Left
        if (
            diff < -SWIPE_THRESHOLD
        ) {
            isAnimatingRef.current =
                true;

            const nextIndex =
                currentIndexRef.current +
                1;

            currentIndexRef.current =
                nextIndex;

            updateSlides(
                nextIndex,
                0,
                true
            );

            updateActiveDot(
                nextIndex
            );
        }

        // Swipe Right
        else if (
            diff > SWIPE_THRESHOLD
        ) {
            isAnimatingRef.current =
                true;

            const nextIndex =
                currentIndexRef.current -
                1;

            currentIndexRef.current =
                nextIndex;

            updateSlides(
                nextIndex,
                0,
                true
            );

            updateActiveDot(
                nextIndex
            );
        }

        // حرکت کم بود → برگرد به جای اول
        else {
            updateSlides(
                currentIndexRef.current,
                0,
                true
            );

            setTimeout(() => {
                isAnimatingRef.current =
                    false;
            }, TRANSITION_DURATION);
        }

        startAutoPlay();
    };

    // --------------------------------------------------
    // Touch Cancel
    // --------------------------------------------------

    const handleTouchCancel = () => {
        if (!isDraggingRef.current) {
            return;
        }

        isDraggingRef.current = false;

        updateSlides(
            currentIndexRef.current,
            0,
            true
        );

        setTimeout(() => {
            isAnimatingRef.current =
                false;
        }, TRANSITION_DURATION);

        startAutoPlay();
    };

    // --------------------------------------------------
    // کلیک روی نقطه
    // --------------------------------------------------

    const goToSlide = (
        dotIndex: number
    ) => {
        if (
            isDraggingRef.current ||
            isAnimatingRef.current
        ) {
            return;
        }

        stopAutoPlay();

        const targetIndex =
            dotIndex + 1;

        isAnimatingRef.current =
            true;

        currentIndexRef.current =
            targetIndex;

        updateSlides(
            targetIndex,
            0,
            true
        );

        updateActiveDot(
            targetIndex
        );

        setTimeout(() => {
            isAnimatingRef.current =
                false;

            startAutoPlay();
        }, TRANSITION_DURATION);
    };

    // --------------------------------------------------
    // اتصال Transition End
    // --------------------------------------------------

    useEffect(() => {
        const slides =
            slidesRef.current;

        slides.forEach((slide) => {
            if (!slide) return;

            slide.addEventListener(
                'transitionend',
                handleTransitionEnd
            );
        });

        return () => {
            slides.forEach((slide) => {
                if (!slide) return;

                slide.removeEventListener(
                    'transitionend',
                    handleTransitionEnd
                );
            });
        };
    }, [
        handleTransitionEnd,
    ]);

    // --------------------------------------------------
    // مقداردهی اولیه
    // --------------------------------------------------

    useEffect(() => {
        updateSlides(
            1,
            0,
            false
        );

        startAutoPlay();

        return () => {
            stopAutoPlay();

            if (
                animationFrameRef.current
            ) {
                cancelAnimationFrame(
                    animationFrameRef.current
                );
            }
        };
    }, [
        updateSlides,
        startAutoPlay,
        stopAutoPlay,
    ]);

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <section className="w-full px-4 md:px-6">
            <div className="mx-auto w-full max-w-7xl">

                {/* Slider */}
                <div
                    className="relative w-full overflow-hidden rounded-2xl"
                    onTouchStart={
                        handleTouchStart
                    }
                    onTouchMove={
                        handleTouchMove
                    }
                    onTouchEnd={
                        handleTouchEnd
                    }
                    onTouchCancel={
                        handleTouchCancel
                    }
                    style={{
                        touchAction:
                            'pan-y',
                    }}
                >
                    <div className="relative aspect-[4/5] w-full md:aspect-[16/6]">

                        {loopedSteps.map(
                            (step, index) => (
                                <div
                                    key={`${step.id}-${index}`}
                                    ref={(element) => {
                                        if (
                                            element
                                        ) {
                                            slidesRef.current[
                                                index
                                            ] =
                                                element;
                                        }
                                    }}
                                    className="absolute inset-0 w-full will-change-transform"
                                >
                                    <picture className="block h-full w-full">

                                        <source
                                            media="(max-width: 767px)"
                                            srcSet={
                                                step.mobileImage
                                            }
                                        />

                                        <img
                                            src={
                                                step.desktopImage
                                            }
                                            alt={
                                                step.title
                                            }
                                            draggable={
                                                false
                                            }
                                            className="h-full w-full select-none object-cover"
                                        />

                                    </picture>
                                </div>
                            )
                        )}

                        {/* Mobile Dots */}
                        <div className="absolute bottom-4 left-0 right-0 z-20 flex flex-row-reverse items-center justify-center gap-2 md:hidden">
                            {steps.map(
                                (_, index) => (
                                    <button
                                        key={
                                            index
                                        }
                                        type="button"
                                        onClick={() =>
                                            goToSlide(
                                                index
                                            )
                                        }
                                        aria-label={`رفتن به تصویر ${index + 1}`}
                                        className={`h-2.5 w-2.5 rounded-full border border-black ${
                                            index ===
                                            activeDot
                                                ? 'bg-indigo-500'
                                                : 'bg-indigo-500/35'
                                        }`}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Dots */}
                <div className="mt-5 hidden flex-row-reverse items-center justify-center gap-2 md:flex">
                    {steps.map(
                        (_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() =>
                                    goToSlide(
                                        index
                                    )
                                }
                                aria-label={`رفتن به تصویر ${index + 1}`}
                                className={`h-2.5 w-2.5 rounded-full border border-black ${
                                    index ===
                                    activeDot
                                        ? 'bg-indigo-500'
                                        : 'bg-indigo-500/35'
                                }`}
                            />
                        )
                    )}
                </div>

            </div>
        </section>
    );
}
