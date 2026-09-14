'use client';

import {
    Cable,
    ChartNoAxesCombined,
    Cog,
} from 'lucide-react';
import {cn} from '@/lib/utils';

const FourBanners = () => {
    const images = [
        '/images/mainblackhoodi.webp',
        '/images/blackhoodi2.webp',
        '/images/blackhoodi.webp',
    ];

    const banners = [
        {
            alt: 'هودی مشکی',
            title: 'هودی مشکی',
            description: 'ساده، شیک و همیشه جذاب.',
            icon: Cable,
        },
        {
            alt: 'هودی مشکی',
            title: 'هودی مشکی',
            description: 'طراحی راحت با استایل مینیمال.',
            icon: ChartNoAxesCombined,
        },
        {
            alt: 'هودی مشکی',
            title: 'هودی مشکی',
            description: 'انتخابی مناسب برای استایل روزمره.',
            icon: Cog,
        },
    ];

    return (
        <section className="w-full p-5 mt-16">
            <div
                dir="ltr"
                className="
                    flex
                    w-full
                    flex-col
                    items-center
                "
            >
                {/* =================================================
                    تصاویر کمانی
                ================================================== */}

                <div
                    className="
                        relative
                        h-[230px]
                        w-full
                        max-w-[430px]

                        sm:h-[300px]
                        sm:max-w-[520px]

                        lg:h-[400px]
                        lg:max-w-[900px]
                    "
                >
                    {images.map((image, index) => {
                        const position =
                            index === 0
                                ? `
                                    left-[6%]
        top-[20px]
        rotate-[-12deg]

        sm:left-[3%]
        sm:top-[20px]

        lg:left-[8%]
        lg:top-[20px]
                                `
                                : index === 1
                                    ? `
                                        left-1/2
                                        top-[5px]
                                        -translate-x-1/2
                                        rotate-0

                                        lg:top-[0px]
                                    `
                                    : `
                                        right-[6%]
    top-[20px]
    rotate-[12deg]

    sm:right-[3%]
    sm:top-[20px]

    lg:right-[8%]
    lg:top-[20px]
                                    `;

                        return (
                            <div
                                key={index}
                                className={cn(
    `
    absolute

    w-[40%]
    max-w-[170px]

    aspect-[5/9]

    overflow-hidden
    rounded-2xl
    border
    border-border
    bg-muted
    shadow-md

    transition-all
    duration-300

    sm:w-[30%]
    sm:max-w-[145px]

    lg:w-[30%]
    lg:max-w-[230px]

    xl:max-w-[250px]
    `,
    position
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
                            </div>
                        );
                    })}
                </div>

                {/* =================================================
                    متن زیر تصاویر
                ================================================== */}

                <div
                    dir="rtl"
                    className="
                        w-full
                        px-5
                        pt-15
                        text-center
                        lg:pt-20
                    "
                >
                    <h3
                        className="
                            mb-3
                            text-xl
                            font-semibold
                            text-foreground

                            sm:text-2xl
                        "
                    >
                        هودی مشکی
                    </h3>

                    <p
                        className="
                            mx-auto
                            max-w-[500px]
                            leading-7
                            text-muted-foreground
                        "
                    >
                        ساده، شیک و همیشه جذاب.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FourBanners;

