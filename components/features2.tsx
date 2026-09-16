
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

type Feature = {
    id: string;
    title: string;
    description: string;
    image: string;

    hover: string;
    shadow: string;
    gradient: string;
};

const Features = () => {
    const features: Feature[] = [
        {
            id: 'about',
            title: 'من کیم ؟!',
            description:
                'من کیم؟! پشت Walkover یک علاقه ساده به داستان‌های عجیب و ناشناخته وجود داره؛ علاقه‌ای به کشف ماجراهایی که شاید کمتر شنیده شده باشن و روایت کردنشون به شکلی که حس کنی خودت هم بخشی از اون اتفاقی. اینجا قراره با هم سراغ داستان‌ها بریم و چیزهایی رو کشف کنیم که شاید کمتر جایی درباره‌شون شنیده باشی.',
            image: '/screens/saeed.jpg',

            // بنفش
            hover: 'hover:border-purple-500/70',
            shadow: 'group-hover:shadow-purple-500/30',
            gradient: 'from-purple-500 via-purple-600 to-purple-700',
        },

        {
            id: 'stories',
            title: 'داستان های مرموز',
            description:
                'در Walkover سراغ داستان‌ها و پرونده‌هایی می‌ریم که پشت هرکدومشون سؤال‌های زیادی وجود داره؛ از اتفاقات عجیب و ناشناخته گرفته تا پرونده‌هایی که بعضی از جزئیاتشون هنوز هم محل بحثه.',
            image: '/screens/scaryStory.jpg',

            // قرمز
            hover: 'hover:border-red-500/70',
            shadow: 'group-hover:shadow-red-500/30',
            gradient: 'from-red-500 via-red-600 to-red-700',
        },

        {
            id: 'store',
            title: 'فروشگاه',
            description:
                'فروشگاه Walkover جاییه که می‌تونید بخشی از حال‌وهوای Walkover رو با خودتون همراه داشته باشید.',
            image: '/screens/store.png',

            // آبی
            hover: 'hover:border-blue-500/70',
            shadow: 'group-hover:shadow-blue-500/30',
            gradient: 'from-blue-500 via-blue-600 to-blue-700',
        },

        {
            id: 'videos',
            title: 'ویدیوها',
            description:
                'در بخش ویدیوهای Walkover می‌تونید جدیدترین محتواها و روایت‌های تصویری رو دنبال کنید.',
            image: '/screens/thumbnail.jpg',

            // قرمز
            hover: 'hover:border-red-500/70',
            shadow: 'group-hover:shadow-red-500/30',
            gradient: 'from-red-500 via-red-600 to-red-700',
        },
    ];

    return (
        <section
            id="features"
            className="relative overflow-hidden border-b border-white/[0.06] bg-black py-24 sm:py-28 lg:py-32"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/[0.035] blur-[120px]" />

                <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-purple-500/[0.025] blur-[100px]" />

                <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-500/[0.025] blur-[100px]" />
            </div>

            <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
                >
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-white/15 sm:w-12" />

                        <span className="text-xs font-medium tracking-[0.18em] text-white/45 sm:text-sm">
                            درباره WALKOVER
                        </span>

                        <span className="h-px w-8 bg-white/15 sm:w-12" />
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                        بیشتر با Walkover آشنا شو
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">
                        داستان‌ها، ویدیوها و چیزهایی که Walkover رو ساخته‌اند.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {/* =====================================
                        ABOUT
                    ===================================== */}
                    {(() => {
                        const feature = features[0];

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.65 }}
                                whileHover="hover"
                                className={`
                                    group relative overflow-hidden
                                    rounded-[28px]
                                    border border-white/[0.08]
                                    bg-white/[0.025]
                                    shadow-none
                                    transition-all duration-300
                                    md:col-span-3
                                    ${feature.hover}
                                    ${feature.shadow}
                                `}
                            >
                                {/* فقط Border رنگی */}
                                <motion.div
                                    variants={{
                                        rest: { opacity: 0 },
                                        hover: { opacity: 1 },
                                    }}
                                    initial="rest"
                                    transition={{ duration: 0.25 }}
                                    className={`
                                        pointer-events-none absolute inset-0 z-20
                                        rounded-[28px]
                                        border
                                        ${feature.hover.replace(
                                            'hover:',
                                            ''
                                        )}
                                    `}
                                />

                                {/* Glow پشت کارت */}
                                <motion.div
                                    variants={{
                                        rest: { opacity: 0 },
                                        hover: { opacity: 1 },
                                    }}
                                    initial="rest"
                                    transition={{ duration: 0.3 }}
                                    className={`
                                        pointer-events-none absolute
                                        inset-x-0 bottom-0 z-0 h-32
                                        bg-gradient-to-t
                                        ${feature.gradient}
                                        opacity-20
                                        blur-3xl
                                    `}
                                />

                                <Card className="relative z-10 overflow-hidden border-0 bg-transparent shadow-none">
                                    <CardContent className="relative p-0">

                                        <div className="grid grid-cols-1 md:grid-cols-2">

                                            {/* Image */}
                                            <div className="relative h-[280px] overflow-hidden sm:h-[360px] md:h-[380px]">

                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    className="
                                                        h-full w-full
                                                        object-cover
                                                        transition-transform
                                                        duration-700
                                                        ease-out
                                                        group-hover:scale-[1.04]
                                                    "
                                                />

                                                {/* فقط تاریکی تصویر */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/5 md:to-black/80" />
                                            </div>

                                            {/* Text */}
                                            <div className="relative flex flex-col justify-center p-7 sm:p-9 lg:p-12">

                                                <div className="mb-5 flex items-center gap-3">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

                                                    <span className="text-[11px] font-medium tracking-[0.2em] text-white/35">
                                                        ABOUT WALKOVER
                                                    </span>
                                                </div>

                                                <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                                    {feature.title}
                                                </h3>

                                                <p className="mt-5 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
                                                    {feature.description}
                                                </p>

                                                <div className="mt-8 flex items-center gap-3">
                                                    <div
                                                        className={`
                                                            h-px w-12
                                                            bg-gradient-to-r
                                                            ${feature.gradient}
                                                        `}
                                                    />

                                                    <span className="text-xs text-white/30">
                                                        Walkover
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })()}

                    {/* =====================================
                        OTHER CARDS
                    ===================================== */}
                    {features.slice(1).map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                            }}
                            whileHover="hover"
                            className={`
                                group relative overflow-hidden
                                rounded-[24px]
                                border border-white/[0.08]
                                bg-white/[0.025]
                                shadow-none
                                transition-all duration-300
                                ${feature.hover}
                                ${feature.shadow}
                            `}
                        >
                            {/* Border رنگی */}
                            <motion.div
                                variants={{
                                    rest: { opacity: 0 },
                                    hover: { opacity: 1 },
                                }}
                                initial="rest"
                                transition={{ duration: 0.25 }}
                                className={`
                                    pointer-events-none absolute inset-0 z-20
                                    rounded-[24px]
                                    border
                                    ${feature.hover.replace(
                                        'hover:',
                                        ''
                                    )}
                                `}
                            />

                            {/* Glow پشت کارت */}
                            <motion.div
                                variants={{
                                    rest: { opacity: 0 },
                                    hover: { opacity: 1 },
                                }}
                                initial="rest"
                                transition={{ duration: 0.3 }}
                                className={`
                                    pointer-events-none absolute
                                    inset-x-0 bottom-0 z-0 h-32
                                    bg-gradient-to-t
                                    ${feature.gradient}
                                    opacity-20
                                    blur-3xl
                                `}
                            />

                            <Card className="relative z-10 overflow-hidden border-0 bg-transparent shadow-none">
                                <CardContent className="relative p-0">

                                    {/* Image */}
                                    <div className="relative h-[220px] overflow-hidden sm:h-[260px]">

                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="
                                                h-full w-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                ease-out
                                                group-hover:scale-[1.05]
                                            "
                                        />

                                        {/* فقط تاریکی؛ بدون تغییر رنگ */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                    </div>

                                    {/* Title */}
                                    <div className="flex min-h-[82px] items-center px-6">
                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`
                                                    h-1.5 w-1.5
                                                    shrink-0
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    ${feature.gradient}
                                                `}
                                            />

                                            <h3 className="text-lg font-bold text-white">
                                                {feature.title}
                                            </h3>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

