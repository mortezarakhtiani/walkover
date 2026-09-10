'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import {
    Sparkles,
    ShieldCheck,
    Truck,
    Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Features = () => {
    const features = [
        {
            id: 'unique-design',
            icon: Sparkles,
            title: 'طراحی خاص',
            description:
                'محصولاتی با طراحی متفاوت و جزئیاتی که قرار نیست شبیه هر چیزی باشن که هر روز می‌بینی.',
            label: 'طراحی اختصاصی',
            colors: {
                bg: 'bg-blue-100/40 dark:bg-blue-950/40',
                icon: 'text-blue-600',
                hover: 'hover:border-blue-500/60',
                gradient: 'from-blue-500 via-blue-600 to-blue-700',
            },
        },
        {
            id: 'quality',
            icon: ShieldCheck,
            title: 'کیفیت قابل اعتماد',
            description:
                'از انتخاب محصول تا جزئیات نهایی، کیفیت چیزی نیست که بخوایم سرش کوتاه بیایم.',
            label: 'کیفیت تضمین‌شده',
            colors: {
                bg: 'bg-emerald-100/40 dark:bg-emerald-950/40',
                icon: 'text-emerald-600',
                hover: 'hover:border-emerald-500/60',
                gradient: 'from-emerald-500 via-emerald-600 to-emerald-700',
            },
        },
        {
            id: 'fast-shipping',
            icon: Truck,
            title: 'ارسال سریع',
            description:
                'سفارشت رو بدون دردسر آماده می‌کنیم تا در سریع‌ترین زمان ممکن به دستت برسه.',
            label: 'ارسال سریع',
            colors: {
                bg: 'bg-purple-100/40 dark:bg-purple-950/40',
                icon: 'text-purple-600',
                hover: 'hover:border-purple-500/60',
                gradient: 'from-purple-500 via-purple-600 to-purple-700',
            },
        },
        {
            id: 'made-for-fans',
            icon: Heart,
            title: 'ساخته‌شده برای طرفدارها',
            description:
                'Merch فقط یک محصول نیست؛ چیزی برای کساییه که می‌خوان علاقه‌شون رو باهاشون همراه داشته باشن.',
            label: 'برای طرفدارها',
            colors: {
                bg: 'bg-rose-100/40 dark:bg-rose-950/40',
                icon: 'text-rose-600',
                hover: 'hover:border-rose-500/60',
                gradient: 'from-rose-500 via-rose-600 to-rose-700',
            },
        },
    ];

    return (
        <section
            id="features"
            className="border-b border-border/50 bg-background py-24"
        >
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col items-center justify-center gap-5 text-center"
                >
                    <CustomBadge>
                        چرا Merch؟
                    </CustomBadge>

                    <CustomTitle>
                        بیشتر از یک محصول
                    </CustomTitle>

                    <CustomSubtitle>
                        چیزهایی که باعث میشن تجربه‌ی Merch با یک خرید معمولی فرق داشته باشه.
                    </CustomSubtitle>
                </motion.div>

                {/* Features Grid */}
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.id}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                viewport={{once: true}}
                                whileHover={{
                                    y: -5,
                                    transition: {
                                        duration: 0.15,
                                        ease: 'easeOut',
                                    },
                                }}
                                className="group"
                            >
                                <Card
                                    className={cn(
                                        'relative h-full overflow-hidden border border-border bg-background p-7 transition-all duration-300 hover:shadow-lg',
                                        feature.colors.hover
                                    )}
                                >
                                    <CardContent className="p-0">

                                        {/* Header */}
                                        {/* Header */}
<div className="mb-6 flex items-start justify-between gap-3">
    <div
        className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110',
            feature.colors.bg
        )}
    >
        <Icon
            className={cn(
                'size-4',
                feature.colors.icon
            )}
        />
    </div>

    <div className="text-right">
        <div className="mb-1 text-sm font-semibold text-foreground">
            {feature.label}
        </div>

        <div className="text-[10px] font-medium tracking-wide text-muted-foreground">
            MERCH
        </div>
    </div>
</div>

{/* Content */}
<h3 className="mb-3 text-lg font-bold leading-tight text-foreground">
    {feature.title}
</h3>

<p className="text-sm leading-7 text-muted-foreground">
    {feature.description}
</p>

                                    </CardContent>

                                    {/* Bottom gradient */}
                                    <div
                                        className={cn(
                                            'absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100',
                                            feature.colors.gradient
                                        )}
                                    />

                                    {/* Hover overlay */}
                                    <div
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50/0 to-slate-100/0 transition-all duration-300 group-hover:from-slate-50/30 group-hover:to-slate-100/10 dark:from-slate-900/0 dark:to-slate-800/0"/>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;